import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { holeskyWithCustomChainId } from './chains';

export const config = getDefaultConfig({
  appName: 'Long Island Blockchain - stVault Creator',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [holeskyWithCustomChainId],
  ssr: true,
});
