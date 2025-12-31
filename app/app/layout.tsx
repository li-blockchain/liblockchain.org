import type { Metadata } from 'next'
import AppLayoutClient from './AppLayoutClient'

export const metadata: Metadata = {
  title: {
    template: '%s | Vault Manager | Long Island Blockchain',
    default: 'Vault Manager | Long Island Blockchain',
  },
  description: 'Manage your private Ethereum staking vaults',
}

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayoutClient>{children}</AppLayoutClient>
}
