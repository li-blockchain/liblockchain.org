// LazyOracle + VaultHub configuration for vault report freshness.
//
// Lido's oracle publishes one Merkle root covering every stVault (daily), but
// the report is NOT applied to each vault automatically. Someone has to call
// LazyOracle.updateVaultData(vault, ...leaf, proof) per vault — it is
// permissionless. Until then VaultHub.isReportFresh(vault) is false and
// withdraw / mint / rebalance (and anything built on them) revert with
// VaultReportStale.

// LazyOracle proxy addresses per network (from Lido's deployed-*.json).
export const LAZY_ORACLE_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0x5DB427080200c235F2Ae8Cd17A7be87921f7AD6c', // Mainnet
  560048: '0xf41491C79C30e8f4862d3F4A5b790171adB8e04A', // Hoodi testnet
}

export const LAZY_ORACLE_ABI = [
  {
    inputs: [],
    name: 'latestReportData',
    outputs: [
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'refSlot', type: 'uint256' },
      { internalType: 'bytes32', name: 'treeRoot', type: 'bytes32' },
      { internalType: 'string', name: 'reportCid', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_vault', type: 'address' },
      { internalType: 'uint256', name: '_totalValue', type: 'uint256' },
      { internalType: 'uint256', name: '_cumulativeLidoFees', type: 'uint256' },
      { internalType: 'uint256', name: '_liabilityShares', type: 'uint256' },
      { internalType: 'uint256', name: '_maxLiabilityShares', type: 'uint256' },
      { internalType: 'uint256', name: '_slashingReserve', type: 'uint256' },
      { internalType: 'bytes32[]', name: '_proof', type: 'bytes32[]' },
    ],
    name: 'updateVaultData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Errors updateVaultData can raise, so viem can decode them by name.
  { inputs: [], name: 'InvalidProof', type: 'error' },
  { inputs: [], name: 'VaultReportIsFreshEnough', type: 'error' },
  { inputs: [], name: 'CumulativeLidoFeesTooLow', type: 'error' },
  { inputs: [], name: 'CumulativeLidoFeesTooLarge', type: 'error' },
  { inputs: [], name: 'InvalidMaxLiabilityShares', type: 'error' },
  { inputs: [], name: 'TotalValueTooLarge', type: 'error' },
  { inputs: [], name: 'UnderflowInTotalValueCalculation', type: 'error' },
] as const

// The VaultHub address is read from the Dashboard (VAULT_HUB()), so only the
// ABI lives here.
export const VAULT_HUB_REPORT_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_vault', type: 'address' }],
    name: 'isReportFresh',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_vault', type: 'address' }],
    name: 'isVaultConnected',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
    name: 'VaultReportStale',
    type: 'error',
  },
] as const

// VaultHub.REPORT_FRESHNESS_DELTA: if the oracle itself has not published for
// this long, no vault can be made fresh.
export const REPORT_FRESHNESS_DELTA_SECONDS = 2 * 24 * 60 * 60
