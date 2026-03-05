/**
 * Beacon Chain API Utilities
 *
 * Fetches validator data from beacon chain explorers/nodes based on withdrawal credentials.
 * Supports mainnet (via beaconcha.in) and Hoodi testnet (via configurable endpoint).
 */

// Beacon chain API configuration per network
function getBeaconApiConfig(chainId: number): { baseUrl: string; type: 'beaconchain' | 'beacon_node' } | null {
  switch (chainId) {
    case 1:
      // Mainnet - beaconcha.in
      return {
        baseUrl: 'https://beaconcha.in',
        type: 'beaconchain',
      }
    case 560048:
      // Hoodi testnet
      return {
        baseUrl: process.env.NEXT_PUBLIC_HOODI_BEACON_API_URL || 'https://hoodi.beaconcha.in',
        type: 'beaconchain',
      }
    default:
      return null
  }
}

// Validator status as returned by beacon chain
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
  effectiveBalance: bigint // in Gwei
  balance: bigint // in Gwei
  activationEpoch: number | null
  exitEpoch: number | null
  withdrawableEpoch: number | null
  slashed: boolean
}

// Response from beaconcha.in API
interface BeaconchainValidatorResponse {
  status: string
  data: BeaconchainValidator | BeaconchainValidator[]
}

interface BeaconchainValidator {
  pubkey?: string
  publickey?: string // API sometimes returns this instead of pubkey
  validatorindex: number
  status?: string
  effectivebalance?: number
  balance?: number
  activationepoch?: number
  exitepoch?: number
  withdrawableepoch?: number
  slashed?: boolean
}

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
 * Fetches validators associated with a vault address from the beacon chain
 * Uses a server-side API proxy to avoid CORS issues
 * @param vaultAddress The staking vault address
 * @param chainId The chain ID (1 for mainnet, 560048 for hoodi)
 * @returns Array of validator info or null if fetch fails
 */
export async function fetchVaultValidators(
  vaultAddress: string,
  chainId: number
): Promise<ValidatorInfo[] | null> {
  console.log(`[BeaconChain] Fetching validators for vault ${vaultAddress} on chain ${chainId}`)

  // Validate chain is supported
  const config = getBeaconApiConfig(chainId)
  if (!config) {
    console.warn(`[BeaconChain] No beacon API configured for chain ${chainId}`)
    return null
  }

  const withdrawalCredentials = vaultAddressToWithdrawalCredentials(vaultAddress)
  console.log(`[BeaconChain] Withdrawal credentials: ${withdrawalCredentials}`)

  try {
    // Use our API proxy to avoid CORS issues
    const proxyUrl = `/api/beacon/validators?chainId=${chainId}&withdrawalCredentials=${encodeURIComponent(withdrawalCredentials)}`
    console.log(`[BeaconChain] Calling proxy: ${proxyUrl}`)

    const response = await fetch(proxyUrl)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    const data: BeaconchainValidatorResponse = await response.json()
    return parseBeaconchainResponse(data)
  } catch (error) {
    console.error('[BeaconChain] Failed to fetch validators:', error)
    throw error
  }
}

/**
 * Parses the beaconcha.in API response into ValidatorInfo array
 */
function parseBeaconchainResponse(data: BeaconchainValidatorResponse): ValidatorInfo[] {
  console.log('[BeaconChain] Parsing response:', JSON.stringify(data, null, 2))

  if (!data || data.status !== 'OK' || !data.data) {
    console.log('[BeaconChain] No valid data in response')
    return []
  }

  // API returns single object or array
  const validators = Array.isArray(data.data) ? data.data : [data.data]
  console.log(`[BeaconChain] Found ${validators.length} validators`)

  return validators
    .filter((v) => v && (v.pubkey || v.publickey)) // Filter out invalid entries
    .map((v) => {
      const status = (v.status || 'pending_initialized') as ValidatorStatus
      // Handle both 'pubkey' and 'publickey' field names
      const pubkeyRaw = v.pubkey || v.publickey || ''
      const pubkey = pubkeyRaw.startsWith('0x') ? pubkeyRaw : `0x${pubkeyRaw}`
      return {
        pubkey,
        index: v.validatorindex || 0,
        status,
        displayStatus: mapToDisplayStatus(status),
        effectiveBalance: BigInt(v.effectivebalance || 0),
        balance: BigInt(v.balance || 0),
        activationEpoch: v.activationepoch && v.activationepoch > 0 ? v.activationepoch : null,
        exitEpoch: v.exitepoch && v.exitepoch < 18446744073709551615 ? v.exitepoch : null,
        withdrawableEpoch: v.withdrawableepoch && v.withdrawableepoch < 18446744073709551615 ? v.withdrawableepoch : null,
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
