// Dashboard contract configuration and ABI
// Based on mainnet implementation: 0x294825c2764c7D412dc32d87E2242c4f1D989AF3

export const DASHBOARD_ABI = [
  // ============ ERRORS ============
  { inputs: [], name: 'AbnormallyHighFee', type: 'error' },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { name: 'account', type: 'address', internalType: 'address' },
      { name: 'neededRole', type: 'bytes32', internalType: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'AlreadyInitialized', type: 'error' },
  { inputs: [], name: 'ConnectedToVaultHub', type: 'error' },
  { inputs: [], name: 'DashboardNotAllowed', type: 'error' },
  {
    inputs: [
      { name: 'recipient', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'EthTransferFailed',
    type: 'error',
  },
  {
    inputs: [
      { name: 'requestedShares', type: 'uint256', internalType: 'uint256' },
      { name: 'remainingShares', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'ExceedsMintingCapacity',
    type: 'error',
  },
  {
    inputs: [
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'withdrawableValue', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'ExceedsWithdrawable',
    type: 'error',
  },
  { inputs: [], name: 'FeeValueExceed100Percent', type: 'error' },
  { inputs: [], name: 'InsufficientBalance', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  { inputs: [], name: 'ZeroArgument', type: 'error' },

  // ============ EVENTS ============
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'to', type: 'address', internalType: 'address' },
      { indexed: true, name: 'assetAddress', type: 'address', internalType: 'address' },
      { indexed: false, name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'AssetsRecovered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'sender', type: 'address', internalType: 'address' },
      { indexed: false, name: 'fee', type: 'uint256', internalType: 'uint256' },
      { indexed: false, name: 'recipient', type: 'address', internalType: 'address' },
    ],
    name: 'FeeDisbursed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { indexed: true, name: 'account', type: 'address', internalType: 'address' },
      { indexed: true, name: 'sender', type: 'address', internalType: 'address' },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { indexed: true, name: 'account', type: 'address', internalType: 'address' },
      { indexed: true, name: 'sender', type: 'address', internalType: 'address' },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },

  // ============ READ FUNCTIONS ============
  {
    type: 'function',
    name: 'STETH',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ILido' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'WSTETH',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IWstETH' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'VAULT_HUB',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract VaultHub' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'LIDO_LOCATOR',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ILidoLocator' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stakingVault',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IStakingVault' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialized',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalValue',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdrawableValue',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'liabilityShares',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'locked',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxLockableValue',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minimalReserve',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'healthShortfallShares',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'obligationsShortfallValue',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'obligations',
    inputs: [],
    outputs: [
      { name: 'sharesToBurn', type: 'uint256', internalType: 'uint256' },
      { name: 'feesToSettle', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalMintingCapacityShares',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'remainingMintingCapacityShares',
    inputs: [{ name: '_etherToFund', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'accruedFee',
    inputs: [],
    outputs: [{ name: 'fee', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeRate',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeRecipient',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeLeftover',
    inputs: [],
    outputs: [{ name: '', type: 'uint128', internalType: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getConfirmExpiry',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'latestReport',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct VaultHub.Report',
        components: [
          { name: 'totalValue', type: 'uint104', internalType: 'uint104' },
          { name: 'inOutDelta', type: 'int104', internalType: 'int104' },
          { name: 'timestamp', type: 'uint48', internalType: 'uint48' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'settledGrowth',
    inputs: [],
    outputs: [{ name: '', type: 'int128', internalType: 'int128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'latestCorrectionTimestamp',
    inputs: [],
    outputs: [{ name: '', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'vaultConnection',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct VaultHub.VaultConnection',
        components: [
          { name: 'owner', type: 'address', internalType: 'address' },
          { name: 'shareLimit', type: 'uint96', internalType: 'uint96' },
          { name: 'vaultIndex', type: 'uint96', internalType: 'uint96' },
          { name: 'disconnectInitiatedTs', type: 'uint48', internalType: 'uint48' },
          { name: 'reserveRatioBP', type: 'uint16', internalType: 'uint16' },
          { name: 'forcedRebalanceThresholdBP', type: 'uint16', internalType: 'uint16' },
          { name: 'infraFeeBP', type: 'uint16', internalType: 'uint16' },
          { name: 'liquidityFeeBP', type: 'uint16', internalType: 'uint16' },
          { name: 'reservationFeeBP', type: 'uint16', internalType: 'uint16' },
          { name: 'beaconChainDepositsPauseIntent', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },

  // ============ ROLE CONSTANTS ============
  {
    type: 'function',
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'FUND_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'WITHDRAW_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MINT_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BURN_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'REBALANCE_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'NODE_OPERATOR_MANAGER_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'NODE_OPERATOR_UNGUARANTEED_DEPOSIT_ROLE',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },

  // ============ PDG POLICY ============
  {
    type: 'function',
    name: 'pdgPolicy',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'enum PDGPolicy' }],
    stateMutability: 'view',
  },

  // ============ ACCESS CONTROL ============
  {
    type: 'function',
    name: 'hasRole',
    inputs: [
      { name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleAdmin',
    inputs: [{ name: 'role', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMemberCount',
    inputs: [{ name: 'role', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMember',
    inputs: [
      { name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleMembers',
    inputs: [{ name: 'role', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'address[]', internalType: 'address[]' }],
    stateMutability: 'view',
  },

  // ============ WRITE FUNCTIONS ============

  // Fund the vault with ETH
  {
    type: 'function',
    name: 'fund',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },

  // Withdraw ETH from the vault
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      { name: '_recipient', type: 'address', internalType: 'address' },
      { name: '_ether', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Mint stETH (liquid staking token)
  {
    type: 'function',
    name: 'mintStETH',
    inputs: [
      { name: '_recipient', type: 'address', internalType: 'address' },
      { name: '_amountOfStETH', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Mint shares (alternative to stETH)
  {
    type: 'function',
    name: 'mintShares',
    inputs: [
      { name: '_recipient', type: 'address', internalType: 'address' },
      { name: '_amountOfShares', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Mint wstETH (wrapped stETH)
  {
    type: 'function',
    name: 'mintWstETH',
    inputs: [
      { name: '_recipient', type: 'address', internalType: 'address' },
      { name: '_amountOfWstETH', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Burn stETH to reduce liability
  {
    type: 'function',
    name: 'burnStETH',
    inputs: [{ name: '_amountOfStETH', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Burn shares to reduce liability
  {
    type: 'function',
    name: 'burnShares',
    inputs: [{ name: '_amountOfShares', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Burn wstETH to reduce liability
  {
    type: 'function',
    name: 'burnWstETH',
    inputs: [{ name: '_amountOfWstETH', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Rebalance vault with ETH
  {
    type: 'function',
    name: 'rebalanceVaultWithEther',
    inputs: [{ name: '_ether', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },

  // Rebalance vault with shares
  {
    type: 'function',
    name: 'rebalanceVaultWithShares',
    inputs: [{ name: '_shares', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Connect to VaultHub
  {
    type: 'function',
    name: 'connectToVaultHub',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },

  // Voluntary disconnect from VaultHub
  {
    type: 'function',
    name: 'voluntaryDisconnect',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Pause beacon chain deposits
  {
    type: 'function',
    name: 'pauseBeaconChainDeposits',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Resume beacon chain deposits
  {
    type: 'function',
    name: 'resumeBeaconChainDeposits',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Set PDG (Predeposit Guarantee) Policy
  // Allows vault owner to consent to bypassing PDG checks for deposits
  {
    type: 'function',
    name: 'setPDGPolicy',
    inputs: [{ name: '_pdgPolicy', type: 'uint8', internalType: 'enum PDGPolicy' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Unguaranteed deposit to beacon chain (bypasses PDG)
  // Requires NODE_OPERATOR_UNGUARANTEED_DEPOSIT_ROLE and PDGPolicy set to ALLOW_DEPOSIT_AND_PROVE
  {
    type: 'function',
    name: 'unguaranteedDepositToBeaconChain',
    inputs: [
      {
        name: '_deposits',
        type: 'tuple[]',
        internalType: 'struct IStakingVault.Deposit[]',
        components: [
          { name: 'pubkey', type: 'bytes', internalType: 'bytes' },
          { name: 'signature', type: 'bytes', internalType: 'bytes' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'depositDataRoot', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Request validator exit
  {
    type: 'function',
    name: 'requestValidatorExit',
    inputs: [{ name: '_pubkeys', type: 'bytes', internalType: 'bytes' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Trigger validator withdrawals
  {
    type: 'function',
    name: 'triggerValidatorWithdrawals',
    inputs: [
      { name: '_pubkeys', type: 'bytes', internalType: 'bytes' },
      { name: '_amountsInGwei', type: 'uint64[]', internalType: 'uint64[]' },
      { name: '_refundRecipient', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Disburse accrued fee
  {
    type: 'function',
    name: 'disburseFee',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Set fee rate
  {
    type: 'function',
    name: 'setFeeRate',
    inputs: [{ name: '_newFeeRate', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },

  // Set fee recipient
  {
    type: 'function',
    name: 'setFeeRecipient',
    inputs: [{ name: '_newFeeRecipient', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Grant role
  {
    type: 'function',
    name: 'grantRole',
    inputs: [
      { name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Revoke role
  {
    type: 'function',
    name: 'revokeRole',
    inputs: [
      { name: 'role', type: 'bytes32', internalType: 'bytes32' },
      { name: 'account', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Receive ETH
  {
    type: 'receive',
    stateMutability: 'payable',
  },
] as const

// Helper function to convert basis points to percentage
export function basisPointsToPercent(basisPoints: number | bigint): string {
  return (Number(basisPoints) / 100).toFixed(2)
}

// Helper function to format ETH values
export function formatEth(value: bigint): string {
  const eth = Number(value) / 1e18
  return eth.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

// Helper to parse user-friendly error messages from contract errors
export function parseDashboardError(error: unknown): string {
  const errorString = String(error)

  if (errorString.includes('ExceedsMintingCapacity')) {
    return 'The requested mint amount exceeds the remaining minting capacity'
  }
  if (errorString.includes('ExceedsWithdrawable')) {
    return 'The requested withdrawal amount exceeds the withdrawable value'
  }
  if (errorString.includes('InsufficientBalance')) {
    return 'Insufficient balance to complete this operation'
  }
  if (errorString.includes('AccessControlUnauthorizedAccount')) {
    return 'You do not have permission to perform this action'
  }
  if (errorString.includes('ZeroArgument')) {
    return 'Amount cannot be zero'
  }
  if (errorString.includes('ZeroAddress')) {
    return 'Invalid recipient address'
  }
  if (errorString.includes('ConnectedToVaultHub')) {
    return 'Vault is already connected to VaultHub'
  }
  // PDG-related errors
  if (errorString.includes('PDGPolicyViolation') || errorString.includes('UnguaranteedDepositNotAllowed')) {
    return 'PDG Policy does not allow unguaranteed deposits. Set policy to ALLOW_DEPOSIT_AND_PROVE first.'
  }
  if (errorString.includes('InvalidPubkeyLength') || errorString.includes('MalformedPubkeysArray')) {
    return 'Invalid validator public key format'
  }
  if (errorString.includes('InvalidSignature')) {
    return 'Invalid deposit signature'
  }
  if (errorString.includes('InvalidDepositDataRoot')) {
    return 'Invalid deposit data root'
  }
  if (errorString.includes('EmptyDeposits')) {
    return 'No deposits provided'
  }

  return 'Transaction failed. Please try again.'
}

// Test vault addresses (Hoodi testnet)
export const TEST_VAULT_ADDRESS = '0xC458f9C4f58Ac647A1C4cB3Bc0DD5478B4162560' as const
export const TEST_DASHBOARD_ADDRESS = '0x9BecA1E65386f9e9AcDDE45666b860d63FD597a7' as const

// Mainnet vault addresses (for reference/testing)
export const MAINNET_VAULT_ADDRESS = '0xd402937b3ff3c187f727c1146a9e846275e9f711' as const
export const MAINNET_DASHBOARD_ADDRESS = '0x2bb82089511d3231be7bc52d3c79d06b21a2f13b' as const

// Mainnet Predeposit Guarantee proxy address
export const MAINNET_PDG_ADDRESS = '0xF4bF42c6D6A0E38825785048124DBAD6c9eaaac3' as const

// ============ PDG POLICY TYPES ============

/**
 * PDGPolicy enum values for controlling Predeposit Guarantee behavior
 * These values match the on-chain enum in the Dashboard contract
 */
export enum PDGPolicy {
  /** Default policy - PDG checks enforced */
  NOT_SET = 0,
  /** Allow proving only - deposits still require PDG guarantee */
  ALLOW_PROVE = 1,
  /** Allow both deposit and prove without PDG guarantee (owner consent) */
  ALLOW_DEPOSIT_AND_PROVE = 2,
}

/**
 * Human-readable labels for PDG policy values
 */
export const PDG_POLICY_LABELS: Record<PDGPolicy, string> = {
  [PDGPolicy.NOT_SET]: 'Not Set (PDG Required)',
  [PDGPolicy.ALLOW_PROVE]: 'Allow Prove Only',
  [PDGPolicy.ALLOW_DEPOSIT_AND_PROVE]: 'Allow Deposit & Prove (Unguaranteed)',
}

/**
 * Deposit data structure from the offline CLI tool (deposit-cli)
 * This is the format output by the Ethereum deposit CLI
 */
export interface CLIDepositData {
  pubkey: string // 96 hex chars, no 0x prefix
  withdrawal_credentials: string // 64 hex chars, with 0x prefix
  amount: number // in Gwei (e.g., 40000000000 = 40 ETH)
  signature: string // 192 hex chars, no 0x prefix
  deposit_message_root: string // 64 hex chars, no 0x prefix
  deposit_data_root: string // 64 hex chars, no 0x prefix
  fork_version: string // 8 hex chars
  network_name: string // e.g., "hoodi", "mainnet"
  deposit_cli_version: string // e.g., "11.3.0-dev"
}

/**
 * Deposit data structure expected by the contract
 * Matches IStakingVault.Deposit struct
 */
export interface ContractDeposit {
  pubkey: `0x${string}` // bytes, with 0x prefix
  signature: `0x${string}` // bytes, with 0x prefix
  amount: bigint // in Wei (not Gwei!)
  depositDataRoot: `0x${string}` // bytes32, with 0x prefix
}
