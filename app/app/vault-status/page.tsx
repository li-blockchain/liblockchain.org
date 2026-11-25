import type { Metadata } from 'next'
import VaultStatusLoader from './VaultStatusLoader'

export const metadata: Metadata = {
  title: 'Vault Status',
  description: 'Monitor your private vault status and performance metrics',
}

export default function VaultStatusPage() {
  return <VaultStatusLoader />
}
