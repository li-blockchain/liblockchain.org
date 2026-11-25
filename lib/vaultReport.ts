import { concat, encodeAbiParameters, isAddress, isHex, keccak256, type Hex } from 'viem'

/**
 * Lido stVaults oracle report helpers.
 *
 * The report published to IPFS is an OpenZeppelin StandardMerkleTree dump
 * ("standard-v1"): `tree` is the complete binary tree as a flat array (root at
 * index 0, children of i at 2i+1 / 2i+2) and `values[n].treeIndex` points at
 * each vault's leaf. A proof is therefore just the sibling path up the array —
 * no merkle library needed.
 *
 * Shared by the API route (extracts a vault's leaf + proof) and the client
 * (re-verifies that proof against the on-chain root before asking for a
 * signature).
 */

const LEAF_ENCODING = [
  { type: 'address' },
  { type: 'uint256' },
  { type: 'uint256' },
  { type: 'uint256' },
  { type: 'uint256' },
  { type: 'uint256' },
] as const

// Field order inside a leaf. Reports carry this as `leafIndexToData`; these are
// the names it uses.
const LEAF_FIELDS = [
  'vaultAddress',
  'totalValueWei',
  'fee',
  'liabilityShares',
  'maxLiabilityShares',
  'slashingReserve',
] as const

/** Everything LazyOracle.updateVaultData needs for one vault. Amounts are decimal strings. */
export interface VaultReportProof {
  vault: `0x${string}`
  totalValue: string
  cumulativeLidoFees: string
  liabilityShares: string
  maxLiabilityShares: string
  slashingReserve: string
  proof: Hex[]
  /** Root of the tree the proof was built from. */
  root: Hex
  refSlot: number
  timestamp: number
  cid: string
}

export class VaultReportError extends Error {
  constructor(
    message: string,
    public readonly code: 'malformed' | 'vault-not-found'
  ) {
    super(message)
    this.name = 'VaultReportError'
  }
}

// CIDv0 (base58 sha2-256) or CIDv1 (base32).
const CID_RE = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{58,100})$/

export function isValidCid(cid: string): boolean {
  return CID_RE.test(cid)
}

const UINT_RE = /^\d{1,78}$/

export function hashLeaf(
  vault: `0x${string}`,
  values: readonly [bigint, bigint, bigint, bigint, bigint]
): Hex {
  // OZ StandardMerkleTree double-hashes leaves; LazyOracle does the same.
  return keccak256(concat([keccak256(encodeAbiParameters(LEAF_ENCODING, [vault, ...values]))]))
}

function hashPair(a: Hex, b: Hex): Hex {
  // Sorted-pair hashing, as in OZ MerkleProof.
  return keccak256(a.toLowerCase() < b.toLowerCase() ? concat([a, b]) : concat([b, a]))
}

/** Walks a proof from the leaf to its root. */
export function processProof(leaf: Hex, proof: readonly Hex[]): Hex {
  return proof.reduce<Hex>((node, sibling) => hashPair(node, sibling), leaf)
}

/** Recomputes the root a VaultReportProof resolves to. Compare with LazyOracle's treeRoot. */
export function computeRoot(report: Pick<VaultReportProof, 'vault' | 'totalValue' | 'cumulativeLidoFees' | 'liabilityShares' | 'maxLiabilityShares' | 'slashingReserve' | 'proof'>): Hex {
  const leaf = hashLeaf(report.vault, [
    BigInt(report.totalValue),
    BigInt(report.cumulativeLidoFees),
    BigInt(report.liabilityShares),
    BigInt(report.maxLiabilityShares),
    BigInt(report.slashingReserve),
  ])
  return processProof(leaf, report.proof)
}

/** Arguments for LazyOracle.updateVaultData, in order. */
export function toUpdateVaultDataArgs(report: VaultReportProof) {
  return [
    report.vault,
    BigInt(report.totalValue),
    BigInt(report.cumulativeLidoFees),
    BigInt(report.liabilityShares),
    BigInt(report.maxLiabilityShares),
    BigInt(report.slashingReserve),
    report.proof,
  ] as const
}

/**
 * Pulls one vault's leaf and Merkle proof out of a raw IPFS report.
 * The input is untrusted (it comes from a public gateway): every field is
 * validated, and the proof is checked against the report's own root before
 * being returned.
 */
export function extractVaultReport(raw: unknown, vault: string, cid: string): VaultReportProof {
  const malformed = (why: string) => new VaultReportError(`Malformed oracle report: ${why}`, 'malformed')

  if (!raw || typeof raw !== 'object') throw malformed('not an object')
  const report = raw as Record<string, unknown>

  if (report.format !== 'standard-v1') throw malformed(`unsupported format ${String(report.format)}`)

  const tree = report.tree
  const values = report.values
  if (!Array.isArray(tree) || tree.length === 0 || !tree.every((n) => isHex(n) && n.length === 66)) {
    throw malformed('bad tree')
  }
  if (!Array.isArray(values)) throw malformed('bad values')

  // Resolve field positions from leafIndexToData when present ({ name: index }),
  // falling back to the canonical order.
  const positions: Record<string, number> = {}
  LEAF_FIELDS.forEach((name, i) => (positions[name] = i))
  const map = report.leafIndexToData
  if (map && typeof map === 'object') {
    for (const [key, value] of Object.entries(map as Record<string, unknown>)) {
      if (typeof value === 'number') positions[key] = value // new: { name: index }
      else if (typeof value === 'string') positions[value] = Number(key) // old: { index: name }
    }
  }

  const target = vault.toLowerCase()
  const entry = values.find((v) => {
    const first = (v as { value?: unknown[] })?.value?.[positions.vaultAddress]
    return typeof first === 'string' && first.toLowerCase() === target
  }) as { value: unknown[]; treeIndex: unknown } | undefined

  if (!entry) {
    throw new VaultReportError('Vault is not in this oracle report', 'vault-not-found')
  }

  const field = (name: (typeof LEAF_FIELDS)[number]): string => {
    const v = entry.value[positions[name]]
    const s = typeof v === 'number' || typeof v === 'bigint' ? String(v) : v
    if (typeof s !== 'string' || !UINT_RE.test(s)) throw malformed(`bad ${name}`)
    return s
  }

  const vaultAddress = entry.value[positions.vaultAddress]
  if (typeof vaultAddress !== 'string' || !isAddress(vaultAddress)) throw malformed('bad vault address')

  let index = Number(entry.treeIndex)
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= tree.length ||
    (index === 0 && tree.length > 1) // only a single-vault tree has its leaf at the root
  ) {
    throw malformed('bad treeIndex')
  }

  const result: VaultReportProof = {
    vault: vaultAddress as `0x${string}`,
    totalValue: field('totalValueWei'),
    cumulativeLidoFees: field('fee'),
    liabilityShares: field('liabilityShares'),
    maxLiabilityShares: field('maxLiabilityShares'),
    slashingReserve: field('slashingReserve'),
    proof: [],
    root: tree[0] as Hex,
    refSlot: Number(report.refSlot),
    timestamp: Number(report.timestamp),
    cid,
  }

  // Sibling path from the leaf up to (not including) the root.
  while (index > 0) {
    const sibling = index % 2 === 0 ? index - 1 : index + 1
    if (sibling >= tree.length) throw malformed('incomplete tree')
    result.proof.push(tree[sibling] as Hex)
    index = Math.floor((index - 1) / 2)
  }

  if (computeRoot(result).toLowerCase() !== result.root.toLowerCase()) {
    throw malformed('proof does not resolve to the report root')
  }

  return result
}
