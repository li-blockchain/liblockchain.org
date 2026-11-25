import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Vault Status',
  description: 'Monitor your private vault status and performance metrics',
}

function VaultStatusLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <section className="border-b border-gray-200 pb-16 mb-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {/* Metrics Skeleton */}
        <section>
          <div className="border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                  <div className="h-10 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Health & APR Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse" />
        </section>

        {/* Minting Capacity Skeleton */}
        <section>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

// Use dynamic import with ssr: false to prevent server-side rendering
// This is required because RainbowKit/wagmi uses browser-only APIs (indexedDB)
const VaultStatusClient = dynamic(() => import('./VaultStatusClient'), {
  ssr: false,
  loading: () => <VaultStatusLoading />,
})

export default function VaultStatusPage() {
  return <VaultStatusClient />
}
