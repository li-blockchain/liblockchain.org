import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navigation from '../components/Navigation'
import VaultSidebar from '../components/VaultSidebar'
import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { DASHBOARD_ABI, basisPointsToPercent, formatEth, TEST_VAULT_ADDRESS, TEST_DASHBOARD_ADDRESS } from '../lib/contracts/dashboard'

export default function VaultStatus() {
  const router = useRouter()
  const [dashboardAddress, setDashboardAddress] = useState<string>(TEST_DASHBOARD_ADDRESS)
  const [vaultAddress, setVaultAddress] = useState<string>(TEST_VAULT_ADDRESS)

  // Load addresses from URL query parameters
  useEffect(() => {
    if (router.isReady) {
      const { vault, dashboard } = router.query
      if (vault && typeof vault === 'string') {
        setVaultAddress(vault)
      }
      if (dashboard && typeof dashboard === 'string') {
        setDashboardAddress(dashboard)
      }
    }
  }, [router.isReady, router.query])

  // Read dashboard data
  const { data: initialized } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'initialized',
  })

  const { data: totalValue } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'totalValue',
  })

  const { data: withdrawableValue } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'withdrawableValue',
  })

  const { data: locked } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'locked',
  })

  const { data: liabilityShares } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'liabilityShares',
  })

  const { data: shareLimit } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'shareLimit',
  })

  const { data: totalMintingCapacity } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'totalMintingCapacityShares',
  })

  const { data: remainingMintingCapacity } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'remainingMintingCapacityShares',
    args: [0n],
  })

  const { data: nodeOperatorFeeRate } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'nodeOperatorFeeRate',
  })

  const { data: nodeOperatorFeeRecipient } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'nodeOperatorFeeRecipient',
  })

  const { data: nodeOperatorDisbursableFee } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'nodeOperatorDisbursableFee',
  })

  const { data: reserveRatioBP } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'reserveRatioBP',
  })

  const { data: infraFeeBP } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'infraFeeBP',
  })

  const { data: liquidityFeeBP } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'liquidityFeeBP',
  })

  const { data: reservationFeeBP } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'reservationFeeBP',
  })

  const { data: latestReport } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'latestReport',
  })

  const { data: vaultConnection } = useReadContract({
    address: dashboardAddress as `0x${string}`,
    abi: DASHBOARD_ABI,
    functionName: 'vaultConnection',
  })

  // Calculate usage percentages
  const calculateUsagePercent = (used: bigint | undefined, total: bigint | undefined): number => {
    if (!used || !total || total === 0n) return 0
    return Number((used * 100n) / total)
  }

  const capacityUsedPercent = calculateUsagePercent(
    totalMintingCapacity && remainingMintingCapacity
      ? totalMintingCapacity - remainingMintingCapacity
      : undefined,
    totalMintingCapacity
  )

  const shareUsagePercent = calculateUsagePercent(liabilityShares, shareLimit)

  return (
    <>
      <Head>
        <title>Vault Status - Long Island Blockchain</title>
        <meta name="description" content="Monitor your private vault status and performance metrics" />
      </Head>

      <Navigation />
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
                Vault Status
              </span>
            </h1>
            <p className="text-lg text-brand-slate-600 max-w-2xl">
              Monitor your private vault's performance, capacity, and configuration
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Address Input */}
          <div className="mb-12 bg-brand-slate-50 rounded-2xl p-8 border border-brand-slate-200">
            <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Vault Addresses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Vault Address
                </label>
                <input
                  type="text"
                  value={vaultAddress}
                  onChange={(e) => setVaultAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Dashboard Address
                </label>
                <input
                  type="text"
                  value={dashboardAddress}
                  onChange={(e) => setDashboardAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {initialized !== undefined && (
            <div className="mb-8 flex justify-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full font-semibold ${
                initialized
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${initialized ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                {initialized ? 'Vault Initialized' : 'Pending Initialization'}
              </div>
            </div>
          )}

          {/* Financial Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Financial Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-brand-cyan-50 to-brand-cyan-100 rounded-xl p-6 border border-brand-cyan-200">
                <div className="text-sm font-semibold text-brand-cyan-700 mb-2">Total Value</div>
                <div className="text-3xl font-bold text-brand-slate-900">
                  {totalValue ? formatEth(totalValue) : '0.0000'} ETH
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-purple-50 to-brand-purple-100 rounded-xl p-6 border border-brand-purple-200">
                <div className="text-sm font-semibold text-brand-purple-700 mb-2">Withdrawable</div>
                <div className="text-3xl font-bold text-brand-slate-900">
                  {withdrawableValue ? formatEth(withdrawableValue) : '0.0000'} ETH
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-pink-50 to-brand-pink-100 rounded-xl p-6 border border-brand-pink-200">
                <div className="text-sm font-semibold text-brand-pink-700 mb-2">Locked</div>
                <div className="text-3xl font-bold text-brand-slate-900">
                  {locked ? formatEth(locked) : '0.0000'} ETH
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-slate-50 to-brand-slate-100 rounded-xl p-6 border border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-700 mb-2">Liability Shares</div>
                <div className="text-3xl font-bold text-brand-slate-900">
                  {liabilityShares ? formatEth(liabilityShares) : '0.0000'}
                </div>
              </div>
            </div>
          </div>

          {/* Capacity & Usage */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Capacity & Usage</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Minting Capacity */}
              <div className="bg-brand-slate-50 rounded-xl p-6 border border-brand-slate-200">
                <h3 className="text-lg font-semibold text-brand-slate-900 mb-4">Minting Capacity</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-slate-600">Total Capacity</span>
                    <span className="font-mono text-brand-slate-900">
                      {totalMintingCapacity ? formatEth(totalMintingCapacity) : '0.0000'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-slate-600">Remaining</span>
                    <span className="font-mono text-brand-slate-900">
                      {remainingMintingCapacity ? formatEth(remainingMintingCapacity) : '0.0000'}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-brand-slate-200 rounded-full overflow-hidden mt-4">
                    <div
                      className="h-full bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 transition-all duration-500"
                      style={{ width: `${capacityUsedPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-brand-slate-500 mt-1">
                    {capacityUsedPercent.toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Share Usage */}
              <div className="bg-brand-slate-50 rounded-xl p-6 border border-brand-slate-200">
                <h3 className="text-lg font-semibold text-brand-slate-900 mb-4">Share Usage</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-slate-600">Share Limit</span>
                    <span className="font-mono text-brand-slate-900">
                      {shareLimit ? formatEth(shareLimit) : '0.0000'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-slate-600">Current Shares</span>
                    <span className="font-mono text-brand-slate-900">
                      {liabilityShares ? formatEth(liabilityShares) : '0.0000'}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-brand-slate-200 rounded-full overflow-hidden mt-4">
                    <div
                      className="h-full bg-gradient-to-r from-brand-purple-500 to-brand-pink-500 transition-all duration-500"
                      style={{ width: `${shareUsagePercent}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-brand-slate-500 mt-1">
                    {shareUsagePercent.toFixed(1)}% used
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Configuration */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Fee Configuration</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-600 mb-2">Node Operator Fee</div>
                <div className="text-2xl font-bold text-brand-slate-900">
                  {nodeOperatorFeeRate ? basisPointsToPercent(nodeOperatorFeeRate) : '0.00'}%
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-600 mb-2">Infrastructure Fee</div>
                <div className="text-2xl font-bold text-brand-slate-900">
                  {infraFeeBP ? basisPointsToPercent(Number(infraFeeBP)) : '0.00'}%
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-600 mb-2">Liquidity Fee</div>
                <div className="text-2xl font-bold text-brand-slate-900">
                  {liquidityFeeBP ? basisPointsToPercent(Number(liquidityFeeBP)) : '0.00'}%
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-600 mb-2">Reservation Fee</div>
                <div className="text-2xl font-bold text-brand-slate-900">
                  {reservationFeeBP ? basisPointsToPercent(Number(reservationFeeBP)) : '0.00'}%
                </div>
              </div>
            </div>

            {/* Node Operator Info */}
            {nodeOperatorFeeRecipient && (
              <div className="mt-6 bg-brand-cyan-50 rounded-xl p-6 border border-brand-cyan-200">
                <h3 className="text-lg font-semibold text-brand-slate-900 mb-4">Node Operator Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-semibold text-brand-slate-600 mb-1">Fee Recipient</div>
                    <div className="font-mono text-sm text-brand-slate-900 break-all">{nodeOperatorFeeRecipient}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-slate-600 mb-1">Disbursable Fees</div>
                    <div className="text-lg font-bold text-brand-slate-900">
                      {nodeOperatorDisbursableFee ? formatEth(nodeOperatorDisbursableFee) : '0.0000'} ETH
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Latest Report */}
          {latestReport && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Latest Report</h2>
              <div className="bg-gradient-to-br from-brand-purple-50 to-brand-pink-50 rounded-xl p-6 border border-brand-purple-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-brand-slate-600 mb-2">Total Value</div>
                    <div className="text-2xl font-bold text-brand-slate-900">
                      {formatEth(latestReport[0])} ETH
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-slate-600 mb-2">In/Out Delta</div>
                    <div className={`text-2xl font-bold ${Number(latestReport[1]) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(latestReport[1]) >= 0 ? '+' : ''}{formatEth(latestReport[1])} ETH
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-slate-600 mb-2">Timestamp</div>
                    <div className="text-lg text-brand-slate-900">
                      {new Date(Number(latestReport[2]) * 1000).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configuration */}
          <div>
            <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Vault Configuration</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                <div className="text-sm font-semibold text-brand-slate-600 mb-2">Reserve Ratio</div>
                <div className="text-2xl font-bold text-brand-slate-900">
                  {reserveRatioBP ? basisPointsToPercent(Number(reserveRatioBP)) : '0.00'}%
                </div>
              </div>

              {vaultConnection && (
                <div className="bg-white rounded-xl p-6 border-2 border-brand-slate-200">
                  <div className="text-sm font-semibold text-brand-slate-600 mb-2">Vault Owner</div>
                  <div className="font-mono text-sm text-brand-slate-900 break-all">{vaultConnection[0]}</div>
                </div>
              )}
            </div>
          </div>
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
