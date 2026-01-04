'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId, useChains } from 'wagmi'
import { parseEther } from 'viem'
import { getVaultFactoryAddress, VAULT_FACTORY_ABI, percentToBasisPoints } from '../../../lib/contracts/vaultFactory'
import Link from 'next/link'

// shadcn components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

// Icons
import { AlertCircle, CheckCircle2, X, Loader2, Vault, Users, Clock, Coins, ArrowRight, ArrowLeft, Wallet, Check, Info } from 'lucide-react'

// Validation helpers
function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

function validateOperatorFee(fee: string): string | null {
  const num = parseFloat(fee)
  if (isNaN(num)) return 'Please enter a valid number'
  if (num < 0) return 'Fee cannot be negative'
  if (num > 100) return 'Fee cannot exceed 100%'
  return null
}

function validateConfirmationWindow(hours: string): string | null {
  const num = parseInt(hours)
  if (isNaN(num)) return 'Please enter a valid number'
  if (num < 1) return 'Minimum 1 hour required'
  if (num > 720) return 'Maximum 30 days (720 hours)'
  return null
}

function validateDeposit(amount: string): string | null {
  if (!amount) return 'Connection deposit is required'
  const num = parseFloat(amount)
  if (isNaN(num)) return 'Please enter a valid number'
  if (num < 1) return 'Minimum deposit is 1 ETH'
  return null
}

// Get explorer URL for a given chain
function getExplorerUrl(chainId: number, chains: readonly any[]): string {
  const chain = chains.find(c => c.id === chainId)
  if (chain?.blockExplorers?.default?.url) {
    return chain.blockExplorers.default.url
  }
  // Fallback to etherscan for mainnet
  if (chainId === 1) return 'https://etherscan.io'
  // Default fallback
  return 'https://etherscan.io'
}

// Get explorer name for display
function getExplorerName(chainId: number, chains: readonly any[]): string {
  const chain = chains.find(c => c.id === chainId)
  if (chain?.blockExplorers?.default?.name) {
    return chain.blockExplorers.default.name
  }
  return 'Explorer'
}

// Helper function to parse errors into user-friendly messages
function parseErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred'

  if (error.message?.includes('User rejected') ||
      error.message?.includes('user rejected') ||
      error.name === 'UserRejectedRequestError') {
    return 'You cancelled the transaction'
  }

  if (error.message?.includes('insufficient funds') ||
      error.message?.includes('exceeds balance')) {
    return 'Insufficient funds in your wallet to complete this transaction'
  }

  if (error.message?.includes('network') ||
      error.message?.includes('connection') ||
      error.message?.includes('fetch')) {
    return 'Network error. Please check your connection and try again'
  }

  if (error.message?.includes('invalid') && error.message?.includes('address')) {
    return 'One of the addresses you entered is invalid. Please check and try again'
  }

  if (error.message?.includes('execution reverted')) {
    const revertReason = error.message.match(/reverted with reason string '([^']+)'/)?.[1]
    if (revertReason) {
      return `Transaction failed: ${revertReason}`
    }
    return 'Transaction failed. The contract rejected your transaction'
  }

  if (error.message?.includes('gas required exceeds allowance') ||
      error.message?.includes('gas estimation failed')) {
    return 'Unable to estimate gas. Please check your parameters and wallet balance'
  }

  const shortMessage = error.shortMessage || error.message || error.toString()
  const cleanMessage = shortMessage
    .replace(/0x[a-fA-F0-9]+/g, '[address]')
    .replace(/\(.*?\)/g, '')
    .trim()

  if (cleanMessage.length > 150) {
    return 'Transaction failed. Please check your parameters and try again'
  }

  return cleanMessage
}

// Step indicator component
function StepIndicator({ currentStep, steps }: { currentStep: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
                style={{
                  backgroundColor: isCompleted ? '#7c3aed' : isCurrent ? '#0099cc' : '#e5e7eb',
                  color: isCompleted || isCurrent ? 'white' : '#6b7280',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(0, 153, 204, 0.2)' : 'none'
                }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                index <= currentStep ? 'text-brand-slate-900' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className="w-16 md:w-24 h-1 mx-2 rounded"
                style={{
                  backgroundColor: isCompleted ? '#7c3aed' : '#e5e7eb'
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Form field with validation
function FormField({
  label,
  required,
  error,
  hint,
  children,
  tooltip,
}: {
  label: string
  required?: boolean
  error?: string | null
  hint?: string
  children: React.ReactNode
  tooltip?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {tooltip && (
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 text-center z-10">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>
      {children}
      {error ? (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export default function CreateVaultClient() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const chains = useChains()
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const vaultFactoryAddress = getVaultFactoryAddress(chainId)

  // Get explorer URL for the current chain
  const explorerUrl = getExplorerUrl(chainId, chains)
  const explorerName = getExplorerName(chainId, chains)
  const currentChain = chains.find(c => c.id === chainId)
  const chainName = currentChain?.name || 'Unknown Network'

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Operator', 'Settings', 'Review']

  // Form state
  const [formData, setFormData] = useState({
    nodeOperator: '',
    nodeOperatorManager: '',
    nodeOperatorFeePercent: '5.0',
    confirmExpiryHours: '24',
    depositAmount: '1',
  })

  // Validation state
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [createdVaultAddress, setCreatedVaultAddress] = useState<string | null>(null)
  const [createdDashboardAddress, setCreatedDashboardAddress] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  // Real-time validation
  useEffect(() => {
    const newErrors: Record<string, string | null> = {}

    if (touched.nodeOperator && formData.nodeOperator) {
      newErrors.nodeOperator = isValidAddress(formData.nodeOperator) ? null : 'Invalid Ethereum address'
    }
    if (touched.nodeOperatorManager && formData.nodeOperatorManager) {
      newErrors.nodeOperatorManager = isValidAddress(formData.nodeOperatorManager) ? null : 'Invalid Ethereum address'
    }
    if (touched.nodeOperatorFeePercent) {
      newErrors.nodeOperatorFeePercent = validateOperatorFee(formData.nodeOperatorFeePercent)
    }
    if (touched.confirmExpiryHours) {
      newErrors.confirmExpiryHours = validateConfirmationWindow(formData.confirmExpiryHours)
    }
    if (touched.depositAmount) {
      newErrors.depositAmount = validateDeposit(formData.depositAmount)
    }

    setErrors(newErrors)
  }, [formData, touched])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (localError) setLocalError(null)
  }

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const fillWithMyAddress = (field: 'nodeOperator' | 'nodeOperatorManager') => {
    if (address) {
      setFormData(prev => ({ ...prev, [field]: address }))
      setTouched(prev => ({ ...prev, [field]: true }))
    }
  }

  // Step validation
  const isStep1Valid = () => {
    return (
      isValidAddress(formData.nodeOperator) &&
      isValidAddress(formData.nodeOperatorManager) &&
      !validateOperatorFee(formData.nodeOperatorFeePercent)
    )
  }

  const isStep2Valid = () => {
    return (
      !validateConfirmationWindow(formData.confirmExpiryHours) &&
      !validateDeposit(formData.depositAmount)
    )
  }

  const canProceed = () => {
    if (currentStep === 0) return isStep1Valid()
    if (currentStep === 1) return isStep2Valid()
    return true
  }

  const nextStep = () => {
    // Mark all fields in current step as touched
    if (currentStep === 0) {
      setTouched(prev => ({
        ...prev,
        nodeOperator: true,
        nodeOperatorManager: true,
        nodeOperatorFeePercent: true,
      }))
    } else if (currentStep === 1) {
      setTouched(prev => ({
        ...prev,
        confirmExpiryHours: true,
        depositAmount: true,
      }))
    }

    if (canProceed()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    setLocalError(null)

    if (!isConnected || !address) {
      setLocalError('Please connect your wallet first')
      return
    }

    if (!vaultFactoryAddress) {
      setLocalError('Vault creation is not supported on this network. Please switch to Ethereum Mainnet or Hoodi Testnet.')
      return
    }

    try {
      const nodeOperatorFeeBP = percentToBasisPoints(parseFloat(formData.nodeOperatorFeePercent))
      const confirmExpiry = BigInt(parseInt(formData.confirmExpiryHours) * 3600)
      const depositValue = parseEther(formData.depositAmount || '0')

      await writeContract({
        address: vaultFactoryAddress,
        abi: VAULT_FACTORY_ABI,
        functionName: 'createVaultWithDashboard',
        args: [
          address,
          formData.nodeOperator as `0x${string}`,
          formData.nodeOperatorManager as `0x${string}`,
          nodeOperatorFeeBP,
          confirmExpiry,
          [],
        ],
        value: depositValue,
      })

    } catch (err: any) {
      console.error('Error creating vault:', err)
      setLocalError(parseErrorMessage(err))
    }
  }

  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  // Success state
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Vault Created Successfully!</h2>
            <p className="text-green-700 mb-6">Your private staking vault has been deployed on {chainName}.</p>

            {hash && (
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
                <a
                  href={`${explorerUrl}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan-600 hover:text-brand-cyan-700 underline font-mono text-sm break-all"
                >
                  {hash}
                </a>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/app/my-vaults">View My Vaults</Link>
              </Button>
              <Button variant="outline" onClick={() => {
                setCurrentStep(0)
                setFormData({
                  nodeOperator: '',
                  nodeOperatorManager: '',
                  nodeOperatorFeePercent: '5.0',
                  confirmExpiryHours: '24',
                  depositAmount: '1',
                })
                setTouched({})
              }}>
                Create Another Vault
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-brand-cyan-100 mb-3">
          <Vault className="h-8 w-8 text-brand-cyan-600" />
        </div>
        <h1 className="text-2xl font-bold text-brand-slate-900">Create Private Vault</h1>
        <p className="text-brand-slate-500 mt-1">Deploy a new staking vault with custom configuration</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} steps={steps} />

      {/* Error Message */}
      {displayError && (
        <Alert variant="destructive" className="mb-6 relative">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Transaction Failed</AlertTitle>
          <AlertDescription>{displayError}</AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => setLocalError(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      {/* Step 1: Operator Configuration */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-cyan-500" />
              <CardTitle>Node Operator Configuration</CardTitle>
            </div>
            <CardDescription>
              Configure who will operate validators for this vault
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Operator Address */}
            <FormField
              label="Operator Address"
              required
              error={touched.nodeOperator ? errors.nodeOperator : null}
              hint="The address that will run validators for this vault"
              tooltip="This address will have permission to register validators and perform operator duties"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="nodeOperator"
                  value={formData.nodeOperator}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('nodeOperator')}
                  placeholder="0x..."
                  className={`font-mono text-sm flex-1 ${
                    touched.nodeOperator && errors.nodeOperator ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillWithMyAddress('nodeOperator')}
                  disabled={!isConnected}
                  className="whitespace-nowrap"
                >
                  <Wallet className="w-4 h-4 mr-1" />
                  Use Mine
                </Button>
              </div>
            </FormField>

            {/* Manager Address */}
            <FormField
              label="Manager Address"
              required
              error={touched.nodeOperatorManager ? errors.nodeOperatorManager : null}
              hint="The address that manages operator permissions"
              tooltip="This address can update operator settings and manage permissions"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="nodeOperatorManager"
                  value={formData.nodeOperatorManager}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('nodeOperatorManager')}
                  placeholder="0x..."
                  className={`font-mono text-sm flex-1 ${
                    touched.nodeOperatorManager && errors.nodeOperatorManager ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillWithMyAddress('nodeOperatorManager')}
                  disabled={!isConnected}
                  className="whitespace-nowrap"
                >
                  <Wallet className="w-4 h-4 mr-1" />
                  Use Mine
                </Button>
              </div>
            </FormField>

            {/* Operator Fee */}
            <FormField
              label="Operator Fee"
              required
              error={touched.nodeOperatorFeePercent ? errors.nodeOperatorFeePercent : null}
              hint="Percentage of staking rewards paid to the operator"
              tooltip="Industry standard is typically 5-15%. This fee compensates the operator for running validators."
            >
              <div className="relative w-full md:w-48">
                <Input
                  type="number"
                  name="nodeOperatorFeePercent"
                  value={formData.nodeOperatorFeePercent}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('nodeOperatorFeePercent')}
                  min="0"
                  max="100"
                  step="0.01"
                  className={`pr-8 ${
                    touched.nodeOperatorFeePercent && errors.nodeOperatorFeePercent ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </FormField>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Vault Settings */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-cyan-500" />
              <CardTitle>Vault Settings</CardTitle>
            </div>
            <CardDescription>
              Configure vault parameters and optional initial funding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Confirmation Window */}
            <FormField
              label="Confirmation Window"
              required
              error={touched.confirmExpiryHours ? errors.confirmExpiryHours : null}
              hint="Time window to confirm validator deposits before they expire"
              tooltip="After a validator deposit is initiated, it must be confirmed within this time window. 24 hours is recommended for most use cases."
            >
              <div className="relative w-full md:w-48">
                <Input
                  type="number"
                  name="confirmExpiryHours"
                  value={formData.confirmExpiryHours}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('confirmExpiryHours')}
                  min="1"
                  max="720"
                  step="1"
                  className={`pr-14 ${
                    touched.confirmExpiryHours && errors.confirmExpiryHours ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">hours</span>
              </div>
            </FormField>

            {/* Connection Deposit */}
            <FormField
              label="Connection Deposit"
              required
              error={touched.depositAmount ? errors.depositAmount : null}
              hint="Mandatory 1 ETH minimum. This deposit remains locked while connected to VaultHub."
              tooltip="The connection deposit serves as an anti-sybil mechanism to prevent spam vault creation. This deposit is locked for the duration of the vault's connection to VaultHub and can be reclaimed when the vault is disconnected."
            >
              <div className="relative w-full md:w-48">
                <Input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('depositAmount')}
                  min="1"
                  step="0.01"
                  className={`pr-12 ${
                    touched.depositAmount && errors.depositAmount ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">ETH</span>
              </div>
            </FormField>

            {/* Connection Deposit Lockup Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                About Connection Deposit
              </h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• This 1 ETH deposit remains locked for the entire duration of your vault's connection to VaultHub</li>
                <li>• The locked deposit cannot be used to mint stETH</li>
                <li>• You can reclaim this deposit when you disconnect your vault from VaultHub</li>
              </ul>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                What happens next?
              </h4>
              <ol className="space-y-1 text-sm text-blue-800">
                <li>1. Vault contract deploys on-chain</li>
                <li>2. Dashboard created for monitoring</li>
                <li>3. Fund vault & create validators</li>
                <li>4. Start earning staking rewards</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-cyan-500" />
              <CardTitle>Review & Deploy</CardTitle>
            </div>
            <CardDescription>
              Confirm your vault configuration before deploying
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vault Owner */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Vault Owner</div>
              <div className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">{address}</div>
            </div>

            {/* Operator Config */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-cyan-500" />
                Operator Configuration
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Operator Address</div>
                  <div className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">{formData.nodeOperator}</div>
                </div>
                <div>
                  <div className="text-gray-500">Manager Address</div>
                  <div className="font-mono text-xs break-all bg-white px-2 py-1 rounded border">{formData.nodeOperatorManager}</div>
                </div>
                <div>
                  <div className="text-gray-500">Operator Fee</div>
                  <div className="font-semibold">{formData.nodeOperatorFeePercent}%</div>
                </div>
              </div>
            </div>

            {/* Vault Settings */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-cyan-500" />
                Vault Settings
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Confirmation Window</div>
                  <div className="font-semibold">{formData.confirmExpiryHours} hours</div>
                </div>
                <div>
                  <div className="text-gray-500">Connection Deposit</div>
                  <div className="font-semibold">{formData.depositAmount} ETH</div>
                </div>
              </div>
            </div>

            {/* Network Info */}
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-800">Deploying to {chainName}</span>
            </div>

            {/* Gas Warning */}
            {parseFloat(formData.depositAmount) > 0 && (
              <Alert>
                <Coins className="h-4 w-4" />
                <AlertDescription>
                  This transaction will transfer {formData.depositAmount} ETH to your vault plus gas fees.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'invisible' : ''}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={!canProceed()}
            className="bg-brand-cyan-500 hover:bg-brand-cyan-600"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isConnected || isPending || isConfirming}
            className="bg-brand-cyan-500 hover:bg-brand-cyan-600 min-w-[160px]"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isPending ? 'Confirm in Wallet...' : 'Creating...'}
              </>
            ) : (
              <>
                <Vault className="mr-2 h-4 w-4" />
                Deploy Vault
              </>
            )}
          </Button>
        )}
      </div>

      {/* Transaction Hash */}
      {hash && !isSuccess && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Transaction:{' '}
          <a
            href={`${explorerUrl}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan-600 hover:text-brand-cyan-700 underline"
          >
            {hash.slice(0, 10)}...{hash.slice(-8)}
          </a>
        </p>
      )}
    </div>
  )
}
