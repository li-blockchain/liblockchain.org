import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { holeskyWithCustomChainId } from './chains';

export const config = getDefaultConfig({
  appName: 'Long Island Blockchain - stVault Creator',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet, holeskyWithCustomChainId],
  ssr: true,
  // Use CORS-friendly RPC endpoints (Alchemy)
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_MAINNET_RPC_URL ||
      'https://eth-mainnet.g.alchemy.com/v2/demo'
    ),
    [holeskyWithCustomChainId.id]: http(
      process.env.NEXT_PUBLIC_HOODI_RPC_URL ||
      'https://eth-hoodi.g.alchemy.com/v2/Sww4JwlwEIR5dWXC2k7nnZOlbJasNEPe'
    ),
  },
});
