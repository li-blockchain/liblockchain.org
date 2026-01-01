'use client'

import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from '../lib/wagmi'
import { useState, type ReactNode } from 'react'

// Custom RainbowKit theme to match brand styling
const customTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#0891b2', // brand-cyan-600
    accentColorForeground: '#ffffff',
    actionButtonBorder: 'transparent',
    actionButtonBorderMobile: 'transparent',
    actionButtonSecondaryBackground: 'rgba(8, 145, 178, 0.1)',
    closeButton: '#64748b',
    closeButtonBackground: 'rgba(100, 116, 139, 0.1)',
    connectButtonBackground: '#0891b2', // brand-cyan-600
    connectButtonBackgroundError: '#ef4444',
    connectButtonInnerBackground: '#0e7490', // brand-cyan-700
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#22c55e',
    downloadBottomCardBackground: 'linear-gradient(126deg, #f8fafc 0%, #f1f5f9 100%)',
    downloadTopCardBackground: 'linear-gradient(126deg, #0891b2 0%, #0e7490 100%)',
    error: '#ef4444',
    generalBorder: '#e2e8f0',
    generalBorderDim: 'rgba(226, 232, 240, 0.5)',
    menuItemBackground: 'rgba(8, 145, 178, 0.1)',
    modalBackdrop: 'rgba(15, 23, 42, 0.5)',
    modalBackground: '#ffffff',
    modalBorder: '#e2e8f0',
    modalText: '#0f172a',
    modalTextDim: '#64748b',
    modalTextSecondary: '#475569',
    profileAction: 'rgba(8, 145, 178, 0.1)',
    profileActionHover: 'rgba(8, 145, 178, 0.2)',
    profileForeground: '#f8fafc',
    selectedOptionBorder: '#0891b2',
    standby: '#f59e0b',
  },
  fonts: {
    body: 'Inter, system-ui, -apple-system, sans-serif',
  },
  radii: {
    actionButton: '0.375rem', // rounded-md (6px)
    connectButton: '0.375rem', // rounded-md (6px)
    menuButton: '0.375rem',
    modal: '0.5rem', // rounded-lg (8px)
    modalMobile: '0.5rem',
  },
  shadows: {
    connectButton: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    dialog: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    profileDetailsAction: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    selectedOption: '0 0 0 2px #0891b2',
    selectedWallet: '0 0 0 2px #0891b2',
    walletLogo: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
}

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // Create QueryClient inside component to avoid sharing state between requests
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
