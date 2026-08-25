import { NextRequest, NextResponse } from 'next/server'

/**
 * Validator data proxy for staking vaults.
 *
 * Discovery comes from Lido's stVaults Keys API, which is keyed directly by vault
 * address — a beacon node cannot do this lookup, since the Beacon API has no
 * withdrawal-credentials filter and the full validator set is far too large to fetch.
 *
 * Effective balance is not part of that API, so it is hydrated from a beacon node in a
 * second step. That step also returns withdrawal_credentials, which we use to verify the
 * validators really do belong to this vault.
 */

// Lido stVaults Keys API, per network
const KEYS_API_URLS: Record<number, string> = {
  1: 'https://stvaults-keys-api.lido.fi',
  560048: 'https://stvaults-keys-api-hoodi.testnet.fi',
}

// Beacon node used only to hydrate effective balance and verify withdrawal credentials
const BEACON_NODE_URLS: Record<number, string> = {
  1: process.env.BEACON_NODE_URL_MAINNET || 'https://ethereum-beacon-api.publicnode.com',
  560048: process.env.BEACON_NODE_URL_HOODI || 'https://beacon.hoodi.ethpandaops.io',
}

// The Keys API rejects anything above 50
const PAGE_LIMIT = 50

interface KeysApiValidator {
  index: number
  pubkey: string
  balance: string
  status: string
  activatedAt: string | null
  exitedAt: string | null
}

interface BeaconValidator {
  index: string
  balance: string
  status: string
  validator: {
    pubkey: string
    withdrawal_credentials: string
    effective_balance: string
    slashed: boolean
    activation_epoch: string
    exit_epoch: string
    withdrawable_epoch: string
  }
}

/**
 * Converts a vault address to its 0x02 withdrawal credentials.
 * Format: 0x02 + 11 zero bytes + 20 byte address
 */
function vaultAddressToWithdrawalCredentials(vaultAddress: string): string {
  const cleanAddress = vaultAddress.toLowerCase().replace(/^0x/, '')
  return `0x02${'0'.repeat(22)}${cleanAddress}`
}

/**
 * Fetches every validator for a vault, following pagination.
 */
async function fetchAllValidators(baseUrl: string, vaultAddress: string): Promise<KeysApiValidator[]> {
  const collected: KeysApiValidator[] = []
  let offset = 0

  // Bounded by the reported total; the guard is just belt-and-braces against a bad page
  for (let page = 0; page < 200; page++) {
    const url = `${baseUrl}/v1/vaults/${vaultAddress}/validators?limit=${PAGE_LIMIT}&offset=${offset}&orderBy=index&direction=ASC`
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error(`Keys API error: ${response.status} ${response.statusText}`)
    }

    const body = await response.json()
    const data: KeysApiValidator[] = Array.isArray(body?.data) ? body.data : []
    collected.push(...data)

    if (!body?.pagination?.hasNextPage || data.length === 0) break
    offset = body.pagination.nextOffset ?? offset + PAGE_LIMIT
  }

  return collected
}

/**
 * Hydrates effective balance and withdrawal credentials from a beacon node.
 * The POST form accepts an unbounded id list, so one request covers every validator.
 */
async function fetchBeaconDetails(
  beaconUrl: string,
  indices: number[]
): Promise<Map<number, BeaconValidator>> {
  const response = await fetch(`${beaconUrl}/eth/v1/beacon/states/head/validators`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ids: indices.map(String) }),
    next: { revalidate: 30 },
  })

  if (!response.ok) {
    throw new Error(`Beacon node error: ${response.status} ${response.statusText}`)
  }

  const body = await response.json()
  const data: BeaconValidator[] = Array.isArray(body?.data) ? body.data : []
  return new Map(data.map((v) => [parseInt(v.index, 10), v]))
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const chainId = searchParams.get('chainId')
  const vaultAddress = searchParams.get('vaultAddress')

  if (!chainId || !vaultAddress) {
    return NextResponse.json(
      { error: 'Missing required parameters: chainId and vaultAddress' },
      { status: 400 }
    )
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(vaultAddress)) {
    return NextResponse.json({ error: 'Invalid vault address' }, { status: 400 })
  }

  const chainIdNum = parseInt(chainId, 10)
  const keysApiUrl = KEYS_API_URLS[chainIdNum]

  if (!keysApiUrl) {
    return NextResponse.json({ error: `Unsupported chain ID: ${chainId}` }, { status: 400 })
  }

  // The Keys API rejects checksummed addresses
  const vault = vaultAddress.toLowerCase()

  try {
    const validators = await fetchAllValidators(keysApiUrl, vault)

    if (validators.length === 0) {
      return NextResponse.json({ data: [] })
    }

    // Hydrate effective balance. If this fails we still return the validators —
    // the actual balance is the more important number.
    let beaconDetails = new Map<number, BeaconValidator>()
    const beaconUrl = BEACON_NODE_URLS[chainIdNum]
    if (beaconUrl) {
      try {
        beaconDetails = await fetchBeaconDetails(
          beaconUrl,
          validators.map((v) => v.index)
        )
      } catch (error) {
        console.error('[Validators] Effective balance hydration failed:', error)
      }
    }

    const expectedCredentials = vaultAddressToWithdrawalCredentials(vault)

    const data = validators
      .filter((v) => {
        // Only drop a validator when the beacon node actively contradicts the Keys API.
        // A missing entry means hydration failed, not that the validator is wrong.
        const details = beaconDetails.get(v.index)
        if (!details) return true
        const matches =
          details.validator.withdrawal_credentials.toLowerCase() === expectedCredentials
        if (!matches) {
          console.warn(
            `[Validators] Dropping validator ${v.index}: withdrawal credentials do not match vault ${vault}`
          )
        }
        return matches
      })
      .map((v) => {
        const details = beaconDetails.get(v.index)
        return {
          index: v.index,
          pubkey: v.pubkey,
          status: details?.status || v.status,
          balance: v.balance,
          effectiveBalance: details?.validator.effective_balance ?? null,
          activationEpoch: details?.validator.activation_epoch ?? null,
          exitEpoch: details?.validator.exit_epoch ?? null,
          withdrawableEpoch: details?.validator.withdrawable_epoch ?? null,
          slashed: details?.validator.slashed ?? false,
        }
      })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[Validators] Fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch validators' },
      { status: 500 }
    )
  }
}
