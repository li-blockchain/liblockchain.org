// Predeposit Guarantee (PDG) contract configuration and ABI
// Used for topping up existing validators

// Contract addresses per network
export const PDG_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0xF4bF42c6D6A0E38825785048124DBAD6c9eaaac3', // Mainnet
  560048: '0xa5F55f3402beA2B14AE15Dae1b6811457D43581d', // Hoodi testnet
}

// Minimal ABI for topUpExistingValidators function
export const PDG_ABI = [
  // Read functions
  {
    inputs: [],
    name: 'MAX_TOPUP_AMOUNT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PREDEPOSIT_AMOUNT',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ACTIVATION_DEPOSIT_AMOUNT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes', name: '_validatorPubkey', type: 'bytes' }],
    name: 'validatorStatus',
    outputs: [
      {
        components: [
          { internalType: 'enum IPredepositGuarantee.ValidatorStage', name: 'stage', type: 'uint8' },
          { internalType: 'contract IStakingVault', name: 'stakingVault', type: 'address' },
          { internalType: 'address', name: 'nodeOperator', type: 'address' },
        ],
        internalType: 'struct IPredepositGuarantee.ValidatorStatus',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_nodeOperator', type: 'address' }],
    name: 'unlockedBalance',
    outputs: [{ internalType: 'uint256', name: 'unlocked', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_nodeOperator', type: 'address' }],
    name: 'nodeOperatorBalance',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'total', type: 'uint128' },
          { internalType: 'uint128', name: 'locked', type: 'uint128' },
        ],
        internalType: 'struct PredepositGuarantee.NodeOperatorBalance',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },

  // Write functions
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes', name: 'pubkey', type: 'bytes' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        internalType: 'struct PredepositGuarantee.ValidatorTopUp[]',
        name: '_topUps',
        type: 'tuple[]',
      },
    ],
    name: 'topUpExistingValidators',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_nodeOperator', type: 'address' }],
    name: 'topUpNodeOperatorBalance',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },

  // Errors
  { inputs: [], name: 'EmptyDeposits', type: 'error' },
  { inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'InvalidTopUpAmount', type: 'error' },
  {
    inputs: [
      { internalType: 'bytes', name: 'validatorPubkey', type: 'bytes' },
      { internalType: 'enum IPredepositGuarantee.ValidatorStage', name: 'stage', type: 'uint8' },
    ],
    name: 'InvalidValidatorStage',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'unlocked', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'NotEnoughUnlocked',
    type: 'error',
  },

  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'nodeOperator', type: 'address' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'BalanceToppedUp',
    type: 'event',
  },
] as const

// Validator stages in PDG
export enum ValidatorStage {
  UNKNOWN = 0,
  PREDEPOSITED = 1,
  PROVEN = 2,
  ACTIVATED = 3,
}

export const VALIDATOR_STAGE_LABELS: Record<ValidatorStage, string> = {
  [ValidatorStage.UNKNOWN]: 'Unknown',
  [ValidatorStage.PREDEPOSITED]: 'Predeposited',
  [ValidatorStage.PROVEN]: 'Proven',
  [ValidatorStage.ACTIVATED]: 'Activated',
}

/**
 * Helper to get PDG contract address for a given chain
 */
export function getPDGAddress(chainId: number): `0x${string}` | undefined {
  return PDG_ADDRESSES[chainId]
}

/**
 * Parse PDG-specific errors into human-readable messages
 */
export function parsePDGError(error: Error | unknown): string {
  const errorString = String(error)

  if (errorString.includes('EmptyDeposits')) {
    return 'No validators provided for top-up'
  }
  if (errorString.includes('InvalidTopUpAmount')) {
    return 'Invalid top-up amount. Must be between 1 ETH and 2048 ETH.'
  }
  if (errorString.includes('InvalidValidatorStage')) {
    return 'Validator is not in a valid stage for top-up. Must be activated first.'
  }
  if (errorString.includes('NotEnoughUnlocked')) {
    return 'Not enough unlocked balance in PDG. Top up node operator balance first.'
  }
  if (errorString.includes('user rejected') || errorString.includes('User denied')) {
    return 'Transaction was rejected by user'
  }

  return errorString.slice(0, 200)
}
