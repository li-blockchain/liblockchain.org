import { defineChain } from 'viem';
import { mainnet } from 'viem/chains';

// Re-export mainnet for convenience
export { mainnet };

// Local Anvil fork configuration
export const localAnvil = defineChain({
  id: 560048, // Chain ID from your local Anvil fork
  name: 'Anvil Local Fork',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://127.0.0.1:8545' },
  },
  testnet: true,
});

// Hoodi testnet configuration (Lido's testnet) - for production
export const hoodi = defineChain({
  id: 560048, // Hoodi chain ID
  name: 'LIBC Hoodi Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_HOODI_RPC_URL || 'https://eth-hoodi.g.alchemy.com/v2/Sww4JwlwEIR5dWXC2k7nnZOlbJasNEPe'],
    },
    public: {
      http: ['https://eth-hoodi.g.alchemy.com/v2/Sww4JwlwEIR5dWXC2k7nnZOlbJasNEPe'],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://hoodi.etherscan.io' },
  },
  testnet: true,
});

// Export the appropriate chain based on environment
// If NEXT_PUBLIC_USE_LOCAL_ANVIL is set to 'true', use localAnvil, otherwise use hoodi
export const holeskyWithCustomChainId =
  process.env.NEXT_PUBLIC_USE_LOCAL_ANVIL === 'true'
    ? localAnvil
    : hoodi;
