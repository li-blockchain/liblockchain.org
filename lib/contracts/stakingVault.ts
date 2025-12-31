// StakingVault contract configuration and ABI
// Based on mainnet implementation: 0x06A56487494aa080deC7Bf69128EdA9225784553

export const STAKING_VAULT_ABI = [
  // ============ ERRORS ============
  { inputs: [], name: 'AlreadyOssified', type: 'error' },
  { inputs: [], name: 'BeaconChainDepositsAlreadyPaused', type: 'error' },
  { inputs: [], name: 'BeaconChainDepositsAlreadyResumed', type: 'error' },
  { inputs: [], name: 'BeaconChainDepositsOnPause', type: 'error' },
  { inputs: [], name: 'EthCollectionNotAllowed', type: 'error' },
  {
    inputs: [
      { name: '_balance', type: 'uint256', internalType: 'uint256' },
      { name: '_required', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'InsufficientBalance',
    type: 'error',
  },
  {
    inputs: [
      { name: '_staged', type: 'uint256', internalType: 'uint256' },
      { name: '_requested', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'InsufficientStaged',
    type: 'error',
  },
  {
    inputs: [
      { name: '_passed', type: 'uint256', internalType: 'uint256' },
      { name: '_required', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'InsufficientValidatorWithdrawalFee',
    type: 'error',
  },
  { inputs: [], name: 'InvalidInitialization', type: 'error' },
  { inputs: [], name: 'InvalidPubkeysLength', type: 'error' },
  { inputs: [], name: 'MalformedPubkeysArray', type: 'error' },
  {
    inputs: [
      { name: 'keysCount', type: 'uint256', internalType: 'uint256' },
      { name: 'amountsCount', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'MismatchedArrayLengths',
    type: 'error',
  },
  { inputs: [], name: 'NewDepositorSameAsPrevious', type: 'error' },
  { inputs: [], name: 'NoWithdrawalRequests', type: 'error' },
  { inputs: [], name: 'NotInitializing', type: 'error' },
  {
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'RenouncementNotAllowed', type: 'error' },
  {
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  { inputs: [], name: 'SenderNotDepositor', type: 'error' },
  { inputs: [], name: 'SenderNotNodeOperator', type: 'error' },
  {
    inputs: [
      { name: 'recipient', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'TransferFailed',
    type: 'error',
  },
  { inputs: [], name: 'WithdrawalFeeInvalidData', type: 'error' },
  { inputs: [], name: 'WithdrawalFeeReadFailed', type: 'error' },
  {
    inputs: [{ name: 'callData', type: 'bytes', internalType: 'bytes' }],
    name: 'WithdrawalRequestAdditionFailed',
    type: 'error',
  },
  {
    inputs: [{ name: 'name', type: 'string', internalType: 'string' }],
    name: 'ZeroArgument',
    type: 'error',
  },

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
    inputs: [],
    name: 'BeaconChainDepositsPaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'BeaconChainDepositsResumed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousDepositor', type: 'address', internalType: 'address' },
      { indexed: true, name: 'newDepositor', type: 'address', internalType: 'address' },
    ],
    name: 'DepositorSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'amount', type: 'uint256', internalType: 'uint256' }],
    name: 'EtherFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'amount', type: 'uint256', internalType: 'uint256' }],
    name: 'EtherStaged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'amount', type: 'uint256', internalType: 'uint256' }],
    name: 'EtherUnstaged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'recipient', type: 'address', internalType: 'address' },
      { indexed: false, name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'EtherWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'version', type: 'uint64', internalType: 'uint64' }],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'nodeOperator', type: 'address', internalType: 'address' }],
    name: 'NodeOperatorSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousOwner', type: 'address', internalType: 'address' },
      { indexed: true, name: 'newOwner', type: 'address', internalType: 'address' },
    ],
    name: 'OwnershipTransferStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousOwner', type: 'address', internalType: 'address' },
      { indexed: true, name: 'newOwner', type: 'address', internalType: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'implementation', type: 'address', internalType: 'address' }],
    name: 'PinnedImplementationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'pubkeys', type: 'bytes', internalType: 'bytes' },
      { indexed: false, name: 'excess', type: 'uint256', internalType: 'uint256' },
      { indexed: true, name: 'refundRecipient', type: 'address', internalType: 'address' },
    ],
    name: 'ValidatorEjectionsTriggered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'pubkey', type: 'bytes', internalType: 'bytes' },
      { indexed: false, name: 'pubkeyRaw', type: 'bytes', internalType: 'bytes' },
    ],
    name: 'ValidatorExitRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'pubkeys', type: 'bytes', internalType: 'bytes' },
      { indexed: false, name: 'amountsInGwei', type: 'uint64[]', internalType: 'uint64[]' },
      { indexed: false, name: 'excess', type: 'uint256', internalType: 'uint256' },
      { indexed: true, name: 'refundRecipient', type: 'address', internalType: 'address' },
    ],
    name: 'ValidatorWithdrawalsTriggered',
    type: 'event',
  },

  // ============ READ FUNCTIONS ============
  {
    type: 'function',
    name: 'DEPOSIT_CONTRACT',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IDepositContract' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nodeOperator',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'depositor',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'availableBalance',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stagedBalance',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'beaconChainDepositsPaused',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdrawalCredentials',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'version',
    inputs: [],
    outputs: [{ name: '', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getInitializedVersion',
    inputs: [],
    outputs: [{ name: '', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'calculateValidatorWithdrawalFee',
    inputs: [{ name: '_numberOfKeys', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },

  // ============ WRITE FUNCTIONS ============

  // Initialize the vault
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_nodeOperator', type: 'address', internalType: 'address' },
      { name: '_depositor', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

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

  // Stage ETH for validator deposits
  {
    type: 'function',
    name: 'stage',
    inputs: [{ name: '_ether', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Unstage ETH from validator deposits
  {
    type: 'function',
    name: 'unstage',
    inputs: [{ name: '_ether', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Deposit to beacon chain (single validator)
  {
    type: 'function',
    name: 'depositToBeaconChain',
    inputs: [
      {
        name: '_deposit',
        type: 'tuple',
        internalType: 'struct IStakingVault.Deposit',
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

  // Deposit from staged balance
  {
    type: 'function',
    name: 'depositFromStaged',
    inputs: [
      {
        name: '_deposit',
        type: 'tuple',
        internalType: 'struct IStakingVault.Deposit',
        components: [
          { name: 'pubkey', type: 'bytes', internalType: 'bytes' },
          { name: 'signature', type: 'bytes', internalType: 'bytes' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'depositDataRoot', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
      { name: '_additionalAmount', type: 'uint256', internalType: 'uint256' },
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
      { name: '_excessRefundRecipient', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Eject validators
  {
    type: 'function',
    name: 'ejectValidators',
    inputs: [
      { name: '_pubkeys', type: 'bytes', internalType: 'bytes' },
      { name: '_refundRecipient', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },

  // Set depositor address
  {
    type: 'function',
    name: 'setDepositor',
    inputs: [{ name: '_depositor', type: 'address', internalType: 'address' }],
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

  // Ossify the vault (make immutable)
  {
    type: 'function',
    name: 'ossify',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Collect ERC20 tokens from vault
  {
    type: 'function',
    name: 'collectERC20',
    inputs: [
      { name: '_token', type: 'address', internalType: 'address' },
      { name: '_recipient', type: 'address', internalType: 'address' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Transfer ownership
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: '_newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Accept ownership
  {
    type: 'function',
    name: 'acceptOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // Renounce ownership (disabled - view only)
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'view',
  },

  // Receive ETH
  {
    type: 'receive',
    stateMutability: 'payable',
  },
] as const

// Deposit data structure for beacon chain deposits
export interface ValidatorDeposit {
  pubkey: `0x${string}`
  signature: `0x${string}`
  amount: bigint
  depositDataRoot: `0x${string}`
}

// Helper to parse user-friendly error messages from vault contract errors
export function parseVaultError(error: unknown): string {
  const errorString = String(error)

  if (errorString.includes('InsufficientBalance')) {
    return 'Insufficient balance in the vault'
  }
  if (errorString.includes('InsufficientStaged')) {
    return 'Insufficient staged balance for this operation'
  }
  if (errorString.includes('InsufficientValidatorWithdrawalFee')) {
    return 'Insufficient fee provided for validator withdrawal'
  }
  if (errorString.includes('BeaconChainDepositsOnPause')) {
    return 'Beacon chain deposits are currently paused'
  }
  if (errorString.includes('BeaconChainDepositsAlreadyPaused')) {
    return 'Beacon chain deposits are already paused'
  }
  if (errorString.includes('BeaconChainDepositsAlreadyResumed')) {
    return 'Beacon chain deposits are already resumed'
  }
  if (errorString.includes('SenderNotDepositor')) {
    return 'Only the depositor can perform this action'
  }
  if (errorString.includes('SenderNotNodeOperator')) {
    return 'Only the node operator can perform this action'
  }
  if (errorString.includes('OwnableUnauthorizedAccount')) {
    return 'Only the owner can perform this action'
  }
  if (errorString.includes('InvalidPubkeysLength')) {
    return 'Invalid validator public key length'
  }
  if (errorString.includes('MalformedPubkeysArray')) {
    return 'Malformed validator public keys array'
  }
  if (errorString.includes('ZeroArgument')) {
    return 'Amount cannot be zero'
  }
  if (errorString.includes('TransferFailed')) {
    return 'ETH transfer failed'
  }

  return 'Transaction failed. Please try again.'
}

// Helper function to format validator pubkey for display
export function formatPubkey(pubkey: string): string {
  if (pubkey.length < 20) return pubkey
  return `${pubkey.slice(0, 10)}...${pubkey.slice(-8)}`
}
