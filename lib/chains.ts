import { defineChain } from 'viem';

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
  id: 17864, // Hoodi chain ID
  name: 'Hoodi Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_HOODI_RPC_URL || 'http://libc-testnets:8545'],
    },
    public: {
      http: ['http://libc-testnets:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer-hoodi.testnet.fi' },
  },
  testnet: true,
});

// Export Hoodi testnet by default
export const holeskyWithCustomChainId = hoodi;
