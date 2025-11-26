import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import VaultSidebar from '../components/VaultSidebar'
import { useAccount, usePublicClient, useChainId } from 'wagmi'
import { VAULT_FACTORY_ADDRESS, VAULT_FACTORY_ABI } from '../lib/contracts/vaultFactory'
import { formatEther, parseAbiItem } from 'viem'
import { holeskyWithCustomChainId } from '../lib/chains'

interface VaultInfo {
  vaultAddress: string
  dashboardAddress: string
  blockNumber: bigint
}

export default function MyVaults() {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const chainId = useChainId()
  const [vaults, setVaults] = useState<VaultInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if on the correct network
  const expectedChainId = holeskyWithCustomChainId.id
  const isCorrectNetwork = chainId === expectedChainId

  useEffect(() => {
    if (!isConnected || !address || !publicClient) {
      setVaults([])
      return
    }

    // Don't fetch if not on correct network
    if (!isCorrectNetwork) {
      setVaults([])
      return
    }

    const fetchVaults = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('Fetching vaults for address:', address)
        console.log('Connected to chain ID:', chainId)
        console.log('Expected chain ID:', expectedChainId)
        console.log('VaultFactory address:', VAULT_FACTORY_ADDRESS)
        console.log('PublicClient:', publicClient)

        // Query DashboardCreated events filtered by admin (owner) address
        const logs = await publicClient.getLogs({
          address: VAULT_FACTORY_ADDRESS,
          event: parseAbiItem('event DashboardCreated(address indexed dashboard, address indexed vault, address indexed admin)'),
          args: {
            admin: address,
          },
          fromBlock: 0n,
          toBlock: 'latest',
        })

        console.log('Found logs:', logs)

        // Extract vault info from logs
        const vaultList: VaultInfo[] = logs.map((log) => ({
          vaultAddress: log.args.vault as string,
          dashboardAddress: log.args.dashboard as string,
          blockNumber: log.blockNumber,
        }))

        // Sort by block number (newest first)
        vaultList.sort((a, b) => Number(b.blockNumber - a.blockNumber))

        setVaults(vaultList)
      } catch (err: any) {
        console.error('Error fetching vaults:', err)
        const errorMessage = err.message || err.toString()
        setError(`Failed to fetch your vaults: ${errorMessage}. Please ensure you're connected to the correct network and your local Anvil node is running.`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVaults()
  }, [address, isConnected, publicClient, isCorrectNetwork, chainId, expectedChainId])

  return (
    <>
      <Head>
        <title>My Vaults - Long Island Blockchain</title>
        <meta name="description" content="View and manage your private staking vaults" />
      </Head>

      <Navigation showConnectWallet={true} />
      <VaultSidebar />

      {/* Main Content with Sidebar Offset */}
      <div className="lg:pl-64">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-slate-50 via-white to-brand-cyan-50 py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500">
                My Vaults
              </span>
            </h1>
            <p className="text-lg text-brand-slate-600 max-w-2xl">
              View and manage all your private staking vaults
            </p>
          </div>
        </div>
      </section>

      {/* Vaults List Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Not Connected State */}
          {!isConnected && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-slate-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-brand-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-brand-slate-900 mb-4">Connect Your Wallet</h2>
              <p className="text-lg text-brand-slate-600 mb-8">
                Please connect your wallet to view your vaults
              </p>
            </div>
          )}

          {/* Wrong Network State */}
          {isConnected && !isCorrectNetwork && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-800 mb-2">Wrong Network</h3>
                    <p className="text-yellow-700 mb-2">
                      You&apos;re currently connected to chain ID <strong>{chainId}</strong>, but this app requires chain ID <strong>{expectedChainId}</strong>.
                    </p>
                    <p className="text-yellow-700 mb-3">
                      Required Network: <strong>{holeskyWithCustomChainId.name}</strong>
                    </p>
                    {holeskyWithCustomChainId.id === 560048 && (
                      <div className="bg-yellow-100 rounded p-3 mb-3">
                        <p className="text-sm text-yellow-800 font-semibold mb-1">Local Development Network</p>
                        <p className="text-xs text-yellow-700">
                          RPC: {holeskyWithCustomChainId.rpcUrls.default.http[0]}
                        </p>
                        <p className="text-xs text-yellow-700 mt-2">
                          Make sure your local Anvil node is running and your wallet is configured to use this custom network.
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-yellow-600">
                      Please switch your wallet to the correct network to view your vaults.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isConnected && isCorrectNetwork && isLoading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-brand-cyan-500 mb-6"></div>
              <p className="text-lg text-brand-slate-600">Loading your vaults...</p>
            </div>
          )}

          {/* Error State */}
          {isConnected && isCorrectNetwork && error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-1">Error Loading Vaults</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {isConnected && isCorrectNetwork && !isLoading && !error && vaults.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-cyan-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-brand-slate-900 mb-4">No Vaults Found</h2>
              <p className="text-lg text-brand-slate-600 mb-8">
                You haven&apos;t created any vaults yet
              </p>
              <Link
                href="/create-vault"
                className="inline-block px-8 py-4 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-glow"
              >
                Create Your First Vault
              </Link>
            </div>
          )}

          {/* Vaults Grid */}
          {isConnected && isCorrectNetwork && !isLoading && !error && vaults.length > 0 && (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-slate-900">
                  Your Vaults ({vaults.length})
                </h2>
                <Link
                  href="/create-vault"
                  className="px-6 py-3 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-semibold rounded-lg transition-colors"
                >
                  + Create New Vault
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaults.map((vault, index) => (
                  <div
                    key={vault.vaultAddress}
                    className="bg-white rounded-xl border-2 border-brand-slate-200 hover:border-brand-cyan-500 transition-all duration-300 overflow-hidden group hover:shadow-xl"
                  >
                    <div className="bg-gradient-to-br from-brand-cyan-500 to-brand-purple-500 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold text-lg">Vault #{vaults.length - index}</h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <p className="text-brand-cyan-100 text-sm">
                        Created at block {vault.blockNumber.toString()}
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-brand-slate-500 mb-1">Vault Address</div>
                          <div className="font-mono text-xs text-brand-slate-900 break-all bg-brand-slate-50 p-2 rounded">
                            {vault.vaultAddress}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-brand-slate-500 mb-1">Dashboard Address</div>
                          <div className="font-mono text-xs text-brand-slate-900 break-all bg-brand-slate-50 p-2 rounded">
                            {vault.dashboardAddress}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-brand-slate-200">
                        <Link
                          href={`/vault-status?vault=${vault.vaultAddress}&dashboard=${vault.dashboardAddress}`}
                          className="block w-full px-4 py-3 bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 hover:from-brand-cyan-600 hover:to-brand-purple-600 text-white text-center font-semibold rounded-lg transition-all duration-300 group-hover:shadow-glow"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

        {/* Footer */}
        <footer className="bg-brand-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-brand-slate-400">
              &copy; {new Date().getFullYear()} Long Island Blockchain. Building trust since 2016.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
