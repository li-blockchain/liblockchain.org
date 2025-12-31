import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Use dynamic import with ssr: false to prevent server-side rendering
// This is required because RainbowKit/wagmi uses browser-only APIs (indexedDB)
const CreateVaultClient = dynamic(() => import('./CreateVaultClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-brand-cyan-500 mb-4"></div>
        <p className="text-brand-slate-600">Loading...</p>
      </div>
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'Create Your Private Vault',
  description: 'Deploy custom staking strategies with your private vault, powered by LIBC\'s institutional-grade infrastructure',
}

export default function CreateVaultPage() {
  return <CreateVaultClient />
}
