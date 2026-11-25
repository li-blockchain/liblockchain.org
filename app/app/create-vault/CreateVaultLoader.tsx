'use client'

import dynamic from 'next/dynamic'

// Use dynamic import with ssr: false to prevent server-side rendering.
// Next 15 only allows ssr: false inside a Client Component, hence this wrapper.
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

export default function CreateVaultLoader() {
  return <CreateVaultClient />
}
