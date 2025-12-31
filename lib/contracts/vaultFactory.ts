// VaultFactory contract configuration and ABI

// Chain-specific vault factory addresses
export const VAULT_FACTORY_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0x02Ca7772FF14a9F6c1a08aF385aA96bb1b34175A',      // Ethereum Mainnet
  560048: '0x67Fc99587B4Cd6FA16E26FF4782711f79055d7ad', // Hoodi Testnet
} as const;

// Chain-specific deployment blocks for event queries
// Using these avoids querying from genesis which exceeds RPC limits
export const VAULT_FACTORY_DEPLOYMENT_BLOCKS: Record<number, bigint> = {
  1: 21000000n,      // Ethereum Mainnet - approximate deployment block
  560048: 0n,        // Hoodi Testnet
} as const;

// Helper to get deployment block for a chain
export function getVaultFactoryDeploymentBlock(chainId: number): bigint {
  return VAULT_FACTORY_DEPLOYMENT_BLOCKS[chainId] ?? 0n;
}

// Helper to get vault factory address for a chain
export function getVaultFactoryAddress(chainId: number): `0x${string}` | undefined {
  return VAULT_FACTORY_ADDRESSES[chainId];
}

// Default export for backwards compatibility (Hoodi testnet)
export const VAULT_FACTORY_ADDRESS = '0x67Fc99587B4Cd6FA16E26FF4782711f79055d7ad' as const;

export const VAULT_FACTORY_ABI = [
  // Constructor
  {
    inputs: [
      { internalType: 'address', name: '_lidoLocator', type: 'address' },
      { internalType: 'address', name: '_beacon', type: 'address' },
      { internalType: 'address', name: '_dashboardImpl', type: 'address' },
      { internalType: 'address', name: '_previousFactory', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  // Errors
  { inputs: [], name: 'CloneArgumentsTooLong', type: 'error' },
  { inputs: [], name: 'FailedDeployment', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'needed', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
    type: 'error',
  },
  { inputs: [], name: 'InsufficientFunds', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'argument', type: 'string' }],
    name: 'ZeroArgument',
    type: 'error',
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'dashboard', type: 'address' },
      { indexed: true, internalType: 'address', name: 'vault', type: 'address' },
      { indexed: true, internalType: 'address', name: 'admin', type: 'address' },
    ],
    name: 'DashboardCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'vault', type: 'address' },
    ],
    name: 'VaultCreated',
    type: 'event',
  },
  // View functions
  {
    inputs: [],
    name: 'BEACON',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DASHBOARD_IMPL',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LIDO_LOCATOR',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PREVIOUS_FACTORY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Main functions
  {
    inputs: [
      { internalType: 'address', name: '_defaultAdmin', type: 'address' },
      { internalType: 'address', name: '_nodeOperator', type: 'address' },
      { internalType: 'address', name: '_nodeOperatorManager', type: 'address' },
      { internalType: 'uint256', name: '_nodeOperatorFeeBP', type: 'uint256' },
      { internalType: 'uint256', name: '_confirmExpiry', type: 'uint256' },
      {
        components: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
        ],
        internalType: 'struct Permissions.RoleAssignment[]',
        name: '_roleAssignments',
        type: 'tuple[]',
      },
    ],
    name: 'createVaultWithDashboard',
    outputs: [
      { internalType: 'contract IStakingVault', name: 'vault', type: 'address' },
      { internalType: 'contract Dashboard', name: 'dashboard', type: 'address' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_defaultAdmin', type: 'address' },
      { internalType: 'address', name: '_nodeOperator', type: 'address' },
      { internalType: 'address', name: '_nodeOperatorManager', type: 'address' },
      { internalType: 'uint256', name: '_nodeOperatorFeeBP', type: 'uint256' },
      { internalType: 'uint256', name: '_confirmExpiry', type: 'uint256' },
      {
        components: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
        ],
        internalType: 'struct Permissions.RoleAssignment[]',
        name: '_roleAssignments',
        type: 'tuple[]',
      },
    ],
    name: 'createVaultWithDashboardWithoutConnectingToVaultHub',
    outputs: [
      { internalType: 'contract IStakingVault', name: 'vault', type: 'address' },
      { internalType: 'contract Dashboard', name: 'dashboard', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_vault', type: 'address' }],
    name: 'deployedVaults',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Helper function to calculate basis points
export function percentToBasisPoints(percent: number): bigint {
  return BigInt(Math.floor(percent * 100));
}

// Helper function to parse basis points to percent
export function basisPointsToPercent(basisPoints: bigint): number {
  return Number(basisPoints) / 100;
}

// Default values
export const DEFAULT_CONFIRM_EXPIRY = BigInt(86400); // 24 hours in seconds
export const DEFAULT_NODE_OPERATOR_FEE_BP = BigInt(500); // 5%
