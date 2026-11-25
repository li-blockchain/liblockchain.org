import type { Metadata } from 'next'
import MyVaultsLoader from './MyVaultsLoader'

export const metadata: Metadata = {
  title: 'My Vaults',
  description: 'View and manage your private staking vaults',
}

export default function MyVaultsPage() {
  return <MyVaultsLoader />
}
