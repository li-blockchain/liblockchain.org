// Dashboard contract configuration and ABI
export const DASHBOARD_ABI = [
  {
    type: 'function',
    name: 'STETH',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract ILido' }],
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
    name: 'unsettledObligations',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'shareLimit',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
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
    name: 'nodeOperatorFeeRecipient',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nodeOperatorFeeRate',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nodeOperatorDisbursableFee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reserveRatioBP',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'forcedRebalanceThresholdBP',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'infraFeeBP',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'liquidityFeeBP',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'reservationFeeBP',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
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
        internalType: 'struct IDashboard.Report',
        components: [
          { name: 'totalValue', type: 'uint112', internalType: 'uint112' },
          { name: 'inOutDelta', type: 'int112', internalType: 'int112' },
          { name: 'timestamp', type: 'uint32', internalType: 'uint32' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feePeriodStartReport',
    inputs: [],
    outputs: [
      { name: 'totalValue', type: 'uint112', internalType: 'uint112' },
      { name: 'inOutDelta', type: 'int112', internalType: 'int112' },
      { name: 'timestamp', type: 'uint32', internalType: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'rewardsAdjustment',
    inputs: [],
    outputs: [
      { name: 'amount', type: 'uint128', internalType: 'uint128' },
      { name: 'latestTimestamp', type: 'uint64', internalType: 'uint64' },
    ],
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
    name: 'vaultConnection',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IDashboard.VaultConnection',
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

// Test vault addresses
export const TEST_VAULT_ADDRESS = '0xC458f9C4f58Ac647A1C4cB3Bc0DD5478B4162560' as const
export const TEST_DASHBOARD_ADDRESS = '0x9BecA1E65386f9e9AcDDE45666b860d63FD597a7' as const
