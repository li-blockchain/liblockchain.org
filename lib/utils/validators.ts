/**
 * Validator Utilities
 *
 * Fetches validator data for a staking vault via the server-side proxy at
 * /api/beacon/validators, which sources discovery from Lido's stVaults Keys API and
 * hydrates effective balance from a beacon node.
 */

// Networks with a Lido stVaults Keys API deployment
const SUPPORTED_CHAIN_IDS = [1, 560048]

export function isSupportedChain(chainId: number): boolean {
  return SUPPORTED_CHAIN_IDS.includes(chainId)
}

// Validator status as returned by the consensus layer
export type ValidatorStatus =
  | 'pending_initialized'
  | 'pending_queued'
  | 'active_ongoing'
  | 'active_exiting'
  | 'active_slashed'
  | 'exited_unslashed'
  | 'exited_slashed'
  | 'withdrawal_possible'
  | 'withdrawal_done'

// Simplified status for UI display
export type ValidatorDisplayStatus = 'pending' | 'active' | 'exiting' | 'exited' | 'slashed' | 'withdrawn'

// Validator data structure
export interface ValidatorInfo {
  pubkey: string
  index: number
  status: ValidatorStatus
  displayStatus: ValidatorDisplayStatus
  effectiveBalance: bigint | null // in Gwei; null when hydration was unavailable
  balance: bigint // in Gwei
  activationEpoch: number | null
  exitEpoch: number | null
  withdrawableEpoch: number | null
  slashed: boolean
}

// Response from our /api/beacon/validators proxy
interface ValidatorsApiResponse {
  data: ApiValidator[]
}

interface ApiValidator {
  index: number
  pubkey: string
  status: string
  balance: string
  effectiveBalance: string | null
  activationEpoch: string | null
  exitEpoch: string | null
  withdrawableEpoch: string | null
  slashed: boolean
}

// The consensus layer uses this to mean "never" for exit/withdrawable epochs.
// It exceeds Number.MAX_SAFE_INTEGER, so it must be compared as a string or BigInt.
const FAR_FUTURE_EPOCH = '18446744073709551615'

/**
 * Maps raw validator status to a simplified display status
 */
export function mapToDisplayStatus(status: ValidatorStatus): ValidatorDisplayStatus {
  if (status.startsWith('pending')) return 'pending'
  if (status.includes('slashed')) return 'slashed'
  if (status.startsWith('active')) {
    return status === 'active_exiting' ? 'exiting' : 'active'
  }
  if (status.startsWith('exited')) return 'exited'
  if (status.startsWith('withdrawal')) return 'withdrawn'
  return 'pending'
}

/**
 * Gets the display color class for a validator status
 */
export function getStatusColor(status: ValidatorDisplayStatus): string {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'pending':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'exiting':
      return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'exited':
      return 'text-gray-600 bg-gray-50 border-gray-200'
    case 'slashed':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'withdrawn':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

/**
 * Gets a human-readable label for a validator status
 */
export function getStatusLabel(status: ValidatorDisplayStatus): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'pending':
      return 'Pending'
    case 'exiting':
      return 'Exiting'
    case 'exited':
      return 'Exited'
    case 'slashed':
      return 'Slashed'
    case 'withdrawn':
      return 'Withdrawn'
    default:
      return 'Unknown'
  }
}

/**
 * Converts a vault address to withdrawal credentials (0x02 format for staking vaults)
 * Format: 0x02 + 11 zero bytes + 20 byte address
 */
export function vaultAddressToWithdrawalCredentials(vaultAddress: string): string {
  const cleanAddress = vaultAddress.toLowerCase().replace(/^0x/, '')
  // 0x02 prefix + 22 zero hex chars (11 bytes) + 40 hex chars address (20 bytes)
  return `0x02${'0'.repeat(22)}${cleanAddress}`
}

/**
 * Formats Gwei to ETH string
 */
export function gweiToEthString(gwei: bigint): string {
  const eth = Number(gwei) / 1e9
  return eth.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

/**
 * Formats a pubkey for display (truncated)
 */
export function formatPubkeyDisplay(pubkey: string): string {
  const hex = pubkey.startsWith('0x') ? pubkey : `0x${pubkey}`
  return `${hex.slice(0, 10)}...${hex.slice(-8)}`
}

/**
 * Parses an epoch that may carry the far-future sentinel meaning "never"
 */
function parseEpoch(epoch: string | null): number | null {
  if (!epoch || epoch === FAR_FUTURE_EPOCH) return null
  const parsed = Number(epoch)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

/**
 * Fetches validators associated with a vault address
 * Uses a server-side API proxy to avoid CORS issues
 * @param vaultAddress The staking vault address
 * @param chainId The chain ID (1 for mainnet, 560048 for hoodi)
 * @returns Array of validator info, or null if the chain is unsupported
 */
export async function fetchVaultValidators(
  vaultAddress: string,
  chainId: number
): Promise<ValidatorInfo[] | null> {
  if (!isSupportedChain(chainId)) {
    console.warn(`[Validators] No validator API configured for chain ${chainId}`)
    return null
  }

  const proxyUrl = `/api/beacon/validators?chainId=${chainId}&vaultAddress=${encodeURIComponent(vaultAddress)}`
  const response = await fetch(proxyUrl)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `API error: ${response.status}`)
  }

  const data: ValidatorsApiResponse = await response.json()
  return parseValidatorsResponse(data)
}

/**
 * Parses the proxy response into a ValidatorInfo array
 */
function parseValidatorsResponse(data: ValidatorsApiResponse): ValidatorInfo[] {
  if (!data || !Array.isArray(data.data)) return []

  return data.data
    .filter((v) => v && v.pubkey)
    .map((v) => {
      const status = (v.status || 'pending_initialized') as ValidatorStatus
      const pubkey = v.pubkey.startsWith('0x') ? v.pubkey : `0x${v.pubkey}`
      return {
        pubkey,
        index: v.index ?? 0,
        status,
        displayStatus: mapToDisplayStatus(status),
        effectiveBalance: v.effectiveBalance != null ? BigInt(v.effectiveBalance) : null,
        balance: BigInt(v.balance || 0),
        activationEpoch: parseEpoch(v.activationEpoch),
        exitEpoch: parseEpoch(v.exitEpoch),
        withdrawableEpoch: parseEpoch(v.withdrawableEpoch),
        slashed: v.slashed || false,
      }
    })
}

/**
 * Checks if validators can receive top-ups (active or pending)
 */
export function canTopUp(status: ValidatorDisplayStatus): boolean {
  return status === 'active' || status === 'pending'
}

/**
 * Gets the maximum top-up amount per Pectra spec (2048 ETH - current balance)
 */
export function getMaxTopUpGwei(currentBalanceGwei: bigint): bigint {
  const maxBalanceGwei = 2048n * 1_000_000_000n // 2048 ETH in Gwei
  const remaining = maxBalanceGwei - currentBalanceGwei
  return remaining > 0n ? remaining : 0n
}
