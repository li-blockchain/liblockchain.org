// VaultFactory contract configuration and ABI
export const VAULT_FACTORY_ADDRESS = '0x67Fc99587B4Cd6FA16E26FF4782711f79055d7ad' as const;

export const VAULT_FACTORY_ABI = [
  {
    inputs: [
      { name: '_defaultAdmin', type: 'address' },
      { name: '_nodeOperator', type: 'address' },
      { name: '_nodeOperatorManager', type: 'address' },
      { name: '_nodeOperatorFeeBP', type: 'uint256' },
      { name: '_confirmExpiry', type: 'uint256' },
      {
        name: '_roleAssignments',
        type: 'tuple[]',
        components: [
          { name: 'account', type: 'address' },
          { name: 'role', type: 'bytes32' },
        ],
      },
    ],
    name: 'createVaultWithDashboard',
    outputs: [
      { name: 'vault', type: 'address' },
      { name: 'dashboard', type: 'address' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'vault', type: 'address' },
    ],
    name: 'deployedVaults',
    outputs: [
      { name: '', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'vault', type: 'address' },
    ],
    name: 'VaultCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'dashboard', type: 'address' },
      { indexed: true, name: 'vault', type: 'address' },
      { indexed: true, name: 'admin', type: 'address' },
    ],
    name: 'DashboardCreated',
    type: 'event',
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
export const DEFAULT_CONFIRM_EXPIRY = 86400n; // 24 hours in seconds
export const DEFAULT_NODE_OPERATOR_FEE_BP = 500n; // 5%
