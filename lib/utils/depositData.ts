/**
 * Deposit Data Transformer Utility
 *
 * Transforms deposit data from the Ethereum deposit CLI tool format
 * to the contract-compatible format required by unguaranteedDepositToBeaconChain
 */

import type { CLIDepositData, ContractDeposit } from '../contracts/dashboard'

// Constants for validation
const PUBKEY_HEX_LENGTH = 96 // 48 bytes = 96 hex chars
const SIGNATURE_HEX_LENGTH = 192 // 96 bytes = 192 hex chars
const DEPOSIT_DATA_ROOT_HEX_LENGTH = 64 // 32 bytes = 64 hex chars
const WITHDRAWAL_CREDENTIALS_HEX_LENGTH = 64 // 32 bytes = 64 hex chars

// Standard validator deposit amounts in Gwei
const MIN_DEPOSIT_GWEI = 1_000_000_000n // 1 ETH minimum
const STANDARD_DEPOSIT_GWEI = 32_000_000_000n // 32 ETH standard
const MAX_DEPOSIT_GWEI = 2048_000_000_000n // 2048 ETH maximum (Pectra)

/**
 * Ensures a hex string has the 0x prefix
 */
export function ensureHexPrefix(hex: string): `0x${string}` {
  const cleanHex = hex.toLowerCase().replace(/^0x/, '')
  return `0x${cleanHex}` as `0x${string}`
}

/**
 * Validates a hex string has the expected length (excluding 0x prefix)
 */
export function validateHexLength(
  hex: string,
  expectedLength: number,
  fieldName: string
): void {
  const cleanHex = hex.replace(/^0x/, '')
  if (cleanHex.length !== expectedLength) {
    throw new Error(
      `Invalid ${fieldName}: expected ${expectedLength} hex chars, got ${cleanHex.length}`
    )
  }
}

/**
 * Validates a hex string contains only valid hex characters
 */
export function validateHexChars(hex: string, fieldName: string): void {
  const cleanHex = hex.replace(/^0x/, '')
  if (!/^[0-9a-fA-F]*$/.test(cleanHex)) {
    throw new Error(`Invalid ${fieldName}: contains non-hex characters`)
  }
}

/**
 * Converts Gwei to Wei
 * @param gwei Amount in Gwei
 * @returns Amount in Wei as bigint
 */
export function gweiToWei(gwei: number | bigint): bigint {
  return BigInt(gwei) * 1_000_000_000n
}

/**
 * Converts Wei to Gwei
 * @param wei Amount in Wei
 * @returns Amount in Gwei as bigint
 */
export function weiToGwei(wei: bigint): bigint {
  return wei / 1_000_000_000n
}

/**
 * Converts Wei to ETH as a string
 * @param wei Amount in Wei
 * @returns Amount in ETH as formatted string
 */
export function weiToEthString(wei: bigint): string {
  const eth = Number(wei) / 1e18
  return eth.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

/**
 * Validates a single CLI deposit data entry
 * @throws Error if validation fails
 */
export function validateCLIDeposit(deposit: CLIDepositData): void {
  // Validate pubkey
  validateHexChars(deposit.pubkey, 'pubkey')
  validateHexLength(deposit.pubkey, PUBKEY_HEX_LENGTH, 'pubkey')

  // Validate signature
  validateHexChars(deposit.signature, 'signature')
  validateHexLength(deposit.signature, SIGNATURE_HEX_LENGTH, 'signature')

  // Validate deposit_data_root
  validateHexChars(deposit.deposit_data_root, 'deposit_data_root')
  validateHexLength(deposit.deposit_data_root, DEPOSIT_DATA_ROOT_HEX_LENGTH, 'deposit_data_root')

  // Validate withdrawal_credentials
  validateHexChars(deposit.withdrawal_credentials, 'withdrawal_credentials')
  validateHexLength(
    deposit.withdrawal_credentials,
    WITHDRAWAL_CREDENTIALS_HEX_LENGTH,
    'withdrawal_credentials'
  )

  // Validate amount is reasonable
  const amountGwei = BigInt(deposit.amount)
  if (amountGwei < MIN_DEPOSIT_GWEI) {
    throw new Error(
      `Invalid amount: ${deposit.amount} Gwei is below minimum (${MIN_DEPOSIT_GWEI} Gwei = 1 ETH)`
    )
  }
  if (amountGwei > MAX_DEPOSIT_GWEI) {
    throw new Error(
      `Invalid amount: ${deposit.amount} Gwei exceeds maximum (${MAX_DEPOSIT_GWEI} Gwei = 2048 ETH)`
    )
  }
}

/**
 * Transforms a single CLI deposit data entry to contract format
 * @param cliDeposit Deposit data from the CLI tool
 * @returns Contract-compatible deposit data
 */
export function transformCLIDeposit(cliDeposit: CLIDepositData): ContractDeposit {
  // Validate first
  validateCLIDeposit(cliDeposit)

  return {
    pubkey: ensureHexPrefix(cliDeposit.pubkey),
    signature: ensureHexPrefix(cliDeposit.signature),
    amount: gweiToWei(cliDeposit.amount),
    depositDataRoot: ensureHexPrefix(cliDeposit.deposit_data_root),
  }
}

/**
 * Transforms an array of CLI deposit data to contract format
 * @param cliDeposits Array of deposit data from the CLI tool
 * @returns Array of contract-compatible deposit data
 * @throws Error if any deposit fails validation
 */
export function transformCLIDeposits(cliDeposits: CLIDepositData[]): ContractDeposit[] {
  if (!cliDeposits || cliDeposits.length === 0) {
    throw new Error('No deposits provided')
  }

  return cliDeposits.map((deposit, index) => {
    try {
      return transformCLIDeposit(deposit)
    } catch (error) {
      throw new Error(
        `Deposit ${index + 1} validation failed: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  })
}

/**
 * Parses JSON string containing deposit data from CLI tool
 * @param jsonString JSON string containing deposit data array
 * @returns Parsed and validated CLI deposit data array
 */
export function parseCLIDepositJSON(jsonString: string): CLIDepositData[] {
  try {
    const parsed = JSON.parse(jsonString)

    if (!Array.isArray(parsed)) {
      throw new Error('Deposit data must be an array')
    }

    // Validate required fields exist
    for (let i = 0; i < parsed.length; i++) {
      const deposit = parsed[i]
      const requiredFields = [
        'pubkey',
        'withdrawal_credentials',
        'amount',
        'signature',
        'deposit_data_root',
      ]

      for (const field of requiredFields) {
        if (!(field in deposit)) {
          throw new Error(`Deposit ${i + 1} missing required field: ${field}`)
        }
      }
    }

    return parsed as CLIDepositData[]
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format')
    }
    throw error
  }
}

/**
 * Summary of deposit data for display
 */
export interface DepositSummary {
  count: number
  totalAmountWei: bigint
  totalAmountEth: string
  pubkeys: string[]
  network?: string
}

/**
 * Creates a summary of the deposit data for UI display
 * @param deposits CLI deposit data array
 * @returns Summary object with count, total amount, and pubkey list
 */
export function createDepositSummary(deposits: CLIDepositData[]): DepositSummary {
  const totalGwei = deposits.reduce((sum, d) => sum + BigInt(d.amount), 0n)
  const totalWei = gweiToWei(totalGwei)

  return {
    count: deposits.length,
    totalAmountWei: totalWei,
    totalAmountEth: weiToEthString(totalWei),
    pubkeys: deposits.map((d) => ensureHexPrefix(d.pubkey)),
    network: deposits[0]?.network_name,
  }
}

/**
 * Validates that withdrawal credentials match the expected vault address
 * @param deposits CLI deposit data array
 * @param expectedVaultAddress The vault's expected withdrawal credentials address
 * @returns true if all match, throws error if mismatch
 */
export function validateWithdrawalCredentials(
  deposits: CLIDepositData[],
  expectedVaultAddress: string
): boolean {
  const normalizedExpected = expectedVaultAddress.toLowerCase().replace(/^0x/, '')

  for (let i = 0; i < deposits.length; i++) {
    const wc = deposits[i].withdrawal_credentials.toLowerCase().replace(/^0x/, '')

    // Withdrawal credentials format: 0x02 + 11 zero bytes + 20 byte address
    // So the address is the last 40 hex chars
    const wcAddress = wc.slice(-40)

    if (wcAddress !== normalizedExpected) {
      throw new Error(
        `Deposit ${i + 1} has mismatched withdrawal credentials. ` +
          `Expected address ${normalizedExpected}, got ${wcAddress}`
      )
    }
  }

  return true
}

/**
 * Format a pubkey for display (truncated)
 */
export function formatPubkeyShort(pubkey: string): string {
  const hex = ensureHexPrefix(pubkey)
  return `${hex.slice(0, 10)}...${hex.slice(-8)}`
}
