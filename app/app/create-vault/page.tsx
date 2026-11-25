import type { Metadata } from 'next'
import CreateVaultLoader from './CreateVaultLoader'

export const metadata: Metadata = {
  title: 'Create Your Private Vault',
  description: 'Deploy custom staking strategies with your private vault, powered by LIBC\'s institutional-grade infrastructure',
}

export default function CreateVaultPage() {
  return <CreateVaultLoader />
}
