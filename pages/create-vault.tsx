import { useState } from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import VaultSidebar from '../components/VaultSidebar'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { VAULT_FACTORY_ADDRESS, VAULT_FACTORY_ABI, percentToBasisPoints, DEFAULT_CONFIRM_EXPIRY, DEFAULT_NODE_OPERATOR_FEE_BP } from '../lib/contracts/vaultFactory'

// Helper function to parse errors into user-friendly messages
function parseErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred'

  // User rejected the transaction
  if (error.message?.includes('User rejected') ||
      error.message?.includes('user rejected') ||
      error.name === 'UserRejectedRequestError') {
    return 'You cancelled the transaction'
  }

  // Insufficient funds
  if (error.message?.includes('insufficient funds') ||
      error.message?.includes('exceeds balance')) {
    return 'Insufficient funds in your wallet to complete this transaction'
  }

  // Network/connection errors
  if (error.message?.includes('network') ||
      error.message?.includes('connection') ||
      error.message?.includes('fetch')) {
    return 'Network error. Please check your connection and try again'
  }

  // Invalid parameters
  if (error.message?.includes('invalid') && error.message?.includes('address')) {
    return 'One of the addresses you entered is invalid. Please check and try again'
  }

  // Contract revert
  if (error.message?.includes('execution reverted')) {
    const revertReason = error.message.match(/reverted with reason string '([^']+)'/)?.[1]
    if (revertReason) {
      return `Transaction failed: ${revertReason}`
    }
    return 'Transaction failed. The contract rejected your transaction'
  }

  // Gas estimation failed
  if (error.message?.includes('gas required exceeds allowance') ||
      error.message?.includes('gas estimation failed')) {
    return 'Unable to estimate gas. Please check your parameters and wallet balance'
  }

  // Default: try to extract a readable message
  const shortMessage = error.shortMessage || error.message || error.toString()

  // Clean up technical jargon
  const cleanMessage = shortMessage
    .replace(/0x[a-fA-F0-9]+/g, '[address]') // Replace hex addresses
    .replace(/\(.*?\)/g, '') // Remove parenthetical technical details
    .trim()

  // If the message is too long or technical, provide a generic message
  if (cleanMessage.length > 150) {
    return 'Transaction failed. Please check your parameters and try again'
  }

  return cleanMessage
}

export default function CreateVault() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Form state
  const [formData, setFormData] = useState({
    nodeOperator: '',
    nodeOperatorManager: '',
    nodeOperatorFeePercent: '5.0', // Display as percentage
    confirmExpiryHours: '24', // Display as hours
    depositAmount: '0', // Optional initial deposit
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [createdVaultAddress, setCreatedVaultAddress] = useState<string | null>(null)
  const [createdDashboardAddress, setCreatedDashboardAddress] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (localError) setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null) // Clear any previous errors

    if (!isConnected || !address) {
      setLocalError('Please connect your wallet first')
      return
    }

    try {
      const nodeOperatorFeeBP = percentToBasisPoints(parseFloat(formData.nodeOperatorFeePercent))
      const confirmExpiry = BigInt(parseInt(formData.confirmExpiryHours) * 3600) // Convert hours to seconds
      const depositValue = parseEther(formData.depositAmount || '0')

      // Call createVaultWithDashboard
      await writeContract({
        address: VAULT_FACTORY_ADDRESS,
        abi: VAULT_FACTORY_ABI,
        functionName: 'createVaultWithDashboard',
        args: [
          address, // defaultAdmin (connected wallet)
          formData.nodeOperator as `0x${string}`,
          formData.nodeOperatorManager as `0x${string}`,
          nodeOperatorFeeBP,
          confirmExpiry,
          [], // roleAssignments (empty for now)
        ],
        value: depositValue,
      })

    } catch (err: any) {
      console.error('Error creating vault:', err)
      setLocalError(parseErrorMessage(err))
    }
  }

  // Combine errors from wagmi and local state
  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  return (
    <>
      <Head>
        <title>Create Your Private Vault - Long Island Blockchain</title>
        <meta name="description" content="Deploy custom staking strategies with your private vault, powered by LIBC's institutional-grade infrastructure" />
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
              Create Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500">
                Private Vault
              </span>
            </h1>
            <p className="text-lg text-brand-slate-600 max-w-2xl">
              Your private vault enables custom staking strategies, all powered by LIBC&apos;s reliable, battle-tested infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <h3 className="text-xl font-bold text-green-800 mb-2">Vault Created Successfully!</h3>
              <p className="text-green-700 mb-4">Your vault has been deployed on Hoodi testnet.</p>
              {createdVaultAddress && (
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-green-600">
                    <span className="font-semibold">Vault Address:</span>
                    <br />
                    <code className="bg-green-100 px-2 py-1 rounded">{createdVaultAddress}</code>
                  </p>
                  {createdDashboardAddress && (
                    <p className="text-sm text-green-600">
                      <span className="font-semibold">Dashboard Address:</span>
                      <br />
                      <code className="bg-green-100 px-2 py-1 rounded">{createdDashboardAddress}</code>
                    </p>
                  )}
                </div>
              )}
              <a
                href="/vault-status"
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                View Vault Status →
              </a>
            </div>
          )}

          {/* Error Message */}
          {displayError && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl relative">
              <button
                onClick={() => setLocalError(null)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                aria-label="Dismiss error"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-1">Transaction Failed</h3>
                  <p className="text-red-700">{displayError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-brand-slate-50 rounded-2xl p-8 border border-brand-slate-200">
              <h2 className="text-2xl font-bold text-brand-slate-900 mb-6">Vault Configuration</h2>

              {/* Admin Address (Read-only from wallet) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Default Admin
                </label>
                <input
                  type="text"
                  value={address || 'Connect wallet to see address'}
                  disabled
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg text-brand-slate-600 cursor-not-allowed"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  This will be set to your connected wallet address
                </p>
              </div>

              {/* Node Operator */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Node Operator Address *
                </label>
                <input
                  type="text"
                  name="nodeOperator"
                  value={formData.nodeOperator}
                  onChange={handleInputChange}
                  required
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  The address that will operate validators for this vault
                </p>
              </div>

              {/* Node Operator Manager */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Node Operator Manager Address *
                </label>
                <input
                  type="text"
                  name="nodeOperatorManager"
                  value={formData.nodeOperatorManager}
                  onChange={handleInputChange}
                  required
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  The address that will manage the node operator role
                </p>
              </div>

              {/* Node Operator Fee */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Node Operator Fee (%) *
                </label>
                <input
                  type="number"
                  name="nodeOperatorFeePercent"
                  value={formData.nodeOperatorFeePercent}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="5.0"
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  Fee percentage charged by the node operator (e.g., 5.0 for 5%)
                </p>
              </div>

              {/* Confirm Expiry */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Confirmation Expiry (hours) *
                </label>
                <input
                  type="number"
                  name="confirmExpiryHours"
                  value={formData.confirmExpiryHours}
                  onChange={handleInputChange}
                  required
                  min="1"
                  step="1"
                  placeholder="24"
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  Time window for confirming validator deposits (default: 24 hours)
                </p>
              </div>

              {/* Initial Deposit (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">
                  Initial Deposit (ETH) - Optional
                </label>
                <input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  className="w-full px-4 py-3 bg-white border border-brand-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent text-brand-slate-900"
                />
                <p className="mt-2 text-xs text-brand-slate-500">
                  Optional: Fund your vault with ETH during creation
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isConnected || isPending || isConfirming}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  !isConnected || isPending || isConfirming
                    ? 'bg-brand-slate-300 text-brand-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-brand-cyan-500 to-brand-purple-500 text-white hover:shadow-glow hover:scale-105'
                }`}
              >
                {isPending ? 'Confirming Transaction...' : isConfirming ? 'Creating Vault...' : 'Create Vault'}
              </button>
            </div>

            {hash && (
              <p className="text-center text-sm text-brand-slate-600">
                Transaction Hash:{' '}
                <a
                  href={`https://explorer-hoodi.testnet.fi/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan-600 hover:text-brand-cyan-700 underline"
                >
                  {hash.slice(0, 10)}...{hash.slice(-8)}
                </a>
              </p>
            )}
          </form>

          {/* Info Card */}
          <div className="mt-12 bg-gradient-to-br from-brand-cyan-50 to-brand-purple-50 rounded-2xl p-8 border border-brand-cyan-200">
            <h3 className="text-xl font-bold text-brand-slate-900 mb-4">What happens next?</h3>
            <ol className="space-y-3 text-brand-slate-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-cyan-500 text-white text-sm font-bold flex items-center justify-center mr-3">1</span>
                <span>Your vault contract will be deployed on Hoodi testnet</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-cyan-500 text-white text-sm font-bold flex items-center justify-center mr-3">2</span>
                <span>A dashboard contract will be created for monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-cyan-500 text-white text-sm font-bold flex items-center justify-center mr-3">3</span>
                <span>You can fund the vault and begin creating validators</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-cyan-500 text-white text-sm font-bold flex items-center justify-center mr-3">4</span>
                <span>Node operators can start the validator lifecycle</span>
              </li>
            </ol>
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
