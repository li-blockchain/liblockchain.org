'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useBalance, useChainId, useChains, usePublicClient } from 'wagmi'
import { parseEther, formatEther, parseAbiItem } from 'viem'
import { DASHBOARD_ABI, basisPointsToPercent, formatEth, parseDashboardError } from '../../../lib/contracts/dashboard'
import { STAKING_VAULT_ABI } from '../../../lib/contracts/stakingVault'

// shadcn components
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

// Icons
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wallet,
  TrendingUp,
  Shield,
  Percent,
  ChevronDown,
  ChevronUp,
  Activity,
  Clock,
  Coins,
  BarChart3,
  Settings,
  ExternalLink,
  ArrowDownToLine,
  ArrowUpFromLine,
  Loader2,
  RefreshCw,
  History
} from 'lucide-react'

// Health status types
type HealthStatus = 'healthy' | 'warning' | 'critical' | 'unknown'

// Health indicator component
function HealthIndicator({
  reserveRatioBP,
  isLoading
}: {
  reserveRatioBP: number | undefined
  isLoading: boolean
}) {
  const getHealthStatus = (ratio: number | undefined): HealthStatus => {
    if (ratio === undefined) return 'unknown'
    if (ratio >= 2000) return 'healthy'    // >= 20%
    if (ratio >= 1000) return 'warning'    // >= 10%
    return 'critical'                       // < 10%
  }

  const status = getHealthStatus(reserveRatioBP)

  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      label: 'Healthy',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300',
      description: 'Your vault has a strong reserve ratio'
    },
    warning: {
      icon: AlertTriangle,
      label: 'Caution',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      description: 'Consider adding more collateral'
    },
    critical: {
      icon: XCircle,
      label: 'At Risk',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      description: 'Immediate action recommended'
    },
    unknown: {
      icon: Activity,
      label: 'Loading',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
      description: 'Fetching vault data...'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded-xl" />
  }

  return (
    <div className={cn(
      "rounded-xl border-2 p-4",
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-full", config.bgColor)}>
          <Icon className={cn("w-6 h-6", config.color)} />
        </div>
        <div>
          <p className={cn("text-lg font-bold", config.color)}>{config.label}</p>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
      </div>
    </div>
  )
}

// Large metric display for hero section
function HeroMetric({
  label,
  value,
  unit = 'ETH',
  subValue,
  isLoading,
  icon: Icon,
  accentColor = 'text-brand-cyan-600'
}: {
  label: string
  value: string | undefined
  unit?: string
  subValue?: string
  isLoading?: boolean
  icon: React.ElementType
  accentColor?: string
}) {
  return (
    <div className="text-center p-6">
      <div className={cn("inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-sm mb-4", accentColor)}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      {isLoading ? (
        <Skeleton className="h-10 w-32 mx-auto" />
      ) : (
        <>
          <p className="text-3xl lg:text-4xl font-bold text-foreground">
            {value || '0.00'}
            {unit && <span className="text-lg ml-1 text-muted-foreground">{unit}</span>}
          </p>
          {subValue && (
            <p className="text-sm text-muted-foreground mt-1">{subValue}</p>
          )}
        </>
      )}
    </div>
  )
}

// APR display component
function APRDisplay({ isLoading }: { isLoading: boolean }) {
  // TODO: Calculate actual APR from historical data
  // For now, show Lido protocol average as placeholder
  const estimatedAPR = '3.2'

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-xl" />
  }

  return (
    <Card className="border border-gray-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Estimated APR</p>
            <p className="text-3xl font-bold text-green-600">{estimatedAPR}%</p>
            <p className="text-xs text-gray-500 mt-1">Based on Lido protocol average</p>
          </div>
          <div className="p-3 rounded-full bg-green-50">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to get explorer URL for a given chain
function getExplorerUrl(chainId: number, chains: readonly any[]): string {
  const chain = chains.find(c => c.id === chainId)
  if (chain?.blockExplorers?.default?.url) {
    return chain.blockExplorers.default.url
  }
  if (chainId === 1) return 'https://etherscan.io'
  return 'https://etherscan.io'
}

// Helper function to parse errors into user-friendly messages
function parseErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred'

  // Check for dashboard-specific errors first
  const dashboardError = parseDashboardError(error)
  if (dashboardError !== 'Transaction failed. Please try again.') {
    return dashboardError
  }

  if (error.message?.includes('User rejected') ||
      error.message?.includes('user rejected') ||
      error.name === 'UserRejectedRequestError') {
    return 'You cancelled the transaction'
  }

  if (error.message?.includes('insufficient funds') ||
      error.message?.includes('exceeds balance')) {
    return 'Insufficient funds in your wallet'
  }

  if (error.message?.includes('network') ||
      error.message?.includes('connection')) {
    return 'Network error. Please check your connection'
  }

  const shortMessage = error.shortMessage || error.message || error.toString()
  if (shortMessage.length > 100) {
    return 'Transaction failed. Please try again.'
  }

  return shortMessage
}

// Fund Vault Dialog Component
function FundVaultDialog({
  dashboardAddress,
  onSuccess
}: {
  dashboardAddress: string
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const chains = useChains()
  const { data: walletBalance } = useBalance({ address })

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const explorerUrl = getExplorerUrl(chainId, chains)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setAmount('')
      setLocalError(null)
      reset()
    }
  }, [open, reset])

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
    }
  }, [isSuccess, onSuccess])

  const handleFund = async () => {
    setLocalError(null)

    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount')
      return
    }

    if (walletBalance && parseEther(amount) > walletBalance.value) {
      setLocalError('Insufficient wallet balance')
      return
    }

    try {
      await writeContract({
        address: dashboardAddress as `0x${string}`,
        abi: DASHBOARD_ABI,
        functionName: 'fund',
        value: parseEther(amount),
      })
    } catch (err) {
      setLocalError(parseErrorMessage(err))
    }
  }

  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white">
          <ArrowDownToLine className="w-4 h-4 mr-2" />
          Fund Vault
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-brand-cyan-600" />
            Fund Vault
          </DialogTitle>
          <DialogDescription>
            Deposit ETH into your vault to increase collateral and minting capacity.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Funding Successful!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your vault has been funded with {amount} ETH
            </p>
            {hash && (
              <a
                href={`${explorerUrl}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan-600 hover:underline text-sm flex items-center justify-center gap-1"
              >
                View transaction <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Button onClick={() => setOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {/* Wallet Balance */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wallet Balance</span>
                  <span className="font-mono font-medium">
                    {walletBalance ? formatEther(walletBalance.value).slice(0, 10) : '0.0000'} ETH
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="fund-amount">Amount to Deposit</Label>
                <div className="relative">
                  <Input
                    id="fund-amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="pr-16"
                    disabled={isPending || isConfirming}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ETH
                  </span>
                </div>
                {walletBalance && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-brand-cyan-600"
                    onClick={() => setAmount(formatEther(walletBalance.value))}
                    disabled={isPending || isConfirming}
                  >
                    Use Max
                  </Button>
                )}
              </div>

              {/* Error Message */}
              {displayError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{displayError}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending || isConfirming}>
                Cancel
              </Button>
              <Button
                onClick={handleFund}
                disabled={!isConnected || isPending || isConfirming || !amount}
                className="bg-brand-cyan-500 hover:bg-brand-cyan-600"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="w-4 h-4 mr-2" />
                    Fund Vault
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Mint stETH Dialog Component
function MintStETHDialog({
  dashboardAddress,
  remainingMintingCapacity,
  liabilityShares,
  onSuccess
}: {
  dashboardAddress: string
  remainingMintingCapacity: bigint | undefined
  liabilityShares: bigint | undefined
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const chains = useChains()

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const explorerUrl = getExplorerUrl(chainId, chains)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setAmount('')
      setLocalError(null)
      reset()
    }
  }, [open, reset])

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
    }
  }, [isSuccess, onSuccess])

  const handleMint = async () => {
    setLocalError(null)

    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount')
      return
    }

    if (!address) {
      setLocalError('Wallet not connected')
      return
    }

    const mintAmount = parseEther(amount)
    if (remainingMintingCapacity && mintAmount > remainingMintingCapacity) {
      setLocalError('Amount exceeds remaining minting capacity')
      return
    }

    try {
      await writeContract({
        address: dashboardAddress as `0x${string}`,
        abi: DASHBOARD_ABI,
        functionName: 'mintStETH',
        args: [address, mintAmount],
      })
    } catch (err) {
      setLocalError(parseErrorMessage(err))
    }
  }

  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  // Calculate new liability after minting
  const mintAmountBigInt = amount ? parseEther(amount) : 0n
  const newLiability = (liabilityShares || 0n) + mintAmountBigInt

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 hover:text-green-800">
          <Coins className="w-4 h-4 mr-2" />
          Mint stETH
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-green-600" />
            Mint stETH
          </DialogTitle>
          <DialogDescription>
            Mint stETH against your vault's collateral. This creates a liability that must be repaid.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Minting Successful!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {amount} stETH has been minted to your wallet
            </p>
            {hash && (
              <a
                href={`${explorerUrl}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan-600 hover:underline text-sm flex items-center justify-center gap-1"
              >
                View transaction <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Button onClick={() => setOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {/* Minting Capacity */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Available to Mint</span>
                  <span className="font-mono font-medium text-green-900">
                    {remainingMintingCapacity ? formatEth(remainingMintingCapacity) : '0.0000'} stETH
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="mint-amount">Amount to Mint</Label>
                <div className="relative">
                  <Input
                    id="mint-amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="pr-16"
                    disabled={isPending || isConfirming}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    stETH
                  </span>
                </div>
                {remainingMintingCapacity && remainingMintingCapacity > 0n && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-green-600"
                    onClick={() => setAmount(formatEther(remainingMintingCapacity))}
                    disabled={isPending || isConfirming}
                  >
                    Use Max
                  </Button>
                )}
              </div>

              {/* Preview */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">After Minting</p>
                  <div className="flex justify-between text-sm">
                    <span>New Liability</span>
                    <span className="font-mono">{formatEth(newLiability)} stETH</span>
                  </div>
                </div>
              )}

              {/* Warning */}
              {remainingMintingCapacity === 0n && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No minting capacity available. You may need to add more collateral or burn existing stETH.
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {displayError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{displayError}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending || isConfirming}>
                Cancel
              </Button>
              <Button
                onClick={handleMint}
                disabled={!isConnected || isPending || isConfirming || !amount || remainingMintingCapacity === 0n}
                className="bg-green-600 hover:bg-green-700"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 mr-2" />
                    Mint stETH
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Burn stETH Dialog Component
function BurnStETHDialog({
  dashboardAddress,
  liabilityShares,
  reserveRatioBP,
  totalValue,
  onSuccess
}: {
  dashboardAddress: string
  liabilityShares: bigint | undefined
  reserveRatioBP: number | undefined
  totalValue: bigint | undefined
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const { isConnected } = useAccount()
  const chainId = useChainId()
  const chains = useChains()

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const explorerUrl = getExplorerUrl(chainId, chains)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setAmount('')
      setLocalError(null)
      reset()
    }
  }, [open, reset])

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
    }
  }, [isSuccess, onSuccess])

  const handleBurn = async () => {
    setLocalError(null)

    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount')
      return
    }

    const burnAmount = parseEther(amount)
    if (liabilityShares && burnAmount > liabilityShares) {
      setLocalError('Amount exceeds current liability')
      return
    }

    try {
      await writeContract({
        address: dashboardAddress as `0x${string}`,
        abi: DASHBOARD_ABI,
        functionName: 'burnStETH',
        args: [burnAmount],
      })
    } catch (err) {
      setLocalError(parseErrorMessage(err))
    }
  }

  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  // Calculate new liability after burning
  const burnAmountBigInt = amount ? parseEther(amount) : 0n
  const newLiability = (liabilityShares || 0n) > burnAmountBigInt
    ? (liabilityShares || 0n) - burnAmountBigInt
    : 0n

  // Estimate new reserve ratio (simplified calculation)
  // Reserve ratio improves when liability decreases relative to total value
  const estimateNewReserveRatio = () => {
    if (!totalValue || !liabilityShares || !amount) return undefined
    const burnAmount = parseEther(amount)
    const newLiab = liabilityShares > burnAmount ? liabilityShares - burnAmount : 0n
    if (newLiab === 0n) return 10000 // 100% if no liability
    // Simplified: ratio = (totalValue - newLiability) / totalValue * 10000
    const newRatio = Number(((totalValue - newLiab) * 10000n) / totalValue)
    return Math.max(0, Math.min(10000, newRatio))
  }

  const newReserveRatio = estimateNewReserveRatio()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800">
          <XCircle className="w-4 h-4 mr-2" />
          Burn stETH
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Burn stETH
          </DialogTitle>
          <DialogDescription>
            Burn stETH to reduce your vault's liability and improve its health ratio.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Burn Successful!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {amount} stETH has been burned, reducing your liability
            </p>
            {hash && (
              <a
                href={`${explorerUrl}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan-600 hover:underline text-sm flex items-center justify-center gap-1"
              >
                View transaction <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Button onClick={() => setOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {/* Current Liability */}
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Current Liability</span>
                  <span className="font-mono font-medium text-red-900">
                    {liabilityShares ? formatEth(liabilityShares) : '0.0000'} stETH
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="burn-amount">Amount to Burn</Label>
                <div className="relative">
                  <Input
                    id="burn-amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="pr-16"
                    disabled={isPending || isConfirming}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    stETH
                  </span>
                </div>
                {liabilityShares && liabilityShares > 0n && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-600"
                    onClick={() => setAmount(formatEther(liabilityShares))}
                    disabled={isPending || isConfirming}
                  >
                    Burn All
                  </Button>
                )}
              </div>

              {/* Preview */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">After Burning</p>
                  <div className="flex justify-between text-sm">
                    <span>New Liability</span>
                    <span className="font-mono">{formatEth(newLiability)} stETH</span>
                  </div>
                  {newReserveRatio !== undefined && reserveRatioBP !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span>Reserve Ratio</span>
                      <span className={cn(
                        "font-mono",
                        newReserveRatio > reserveRatioBP ? "text-green-600" : ""
                      )}>
                        {(reserveRatioBP / 100).toFixed(1)}% → {(newReserveRatio / 100).toFixed(1)}%
                        {newReserveRatio > reserveRatioBP && " ↑"}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Warning */}
              {(!liabilityShares || liabilityShares === 0n) && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No stETH liability to burn. Your vault has no outstanding minted stETH.
                  </AlertDescription>
                </Alert>
              )}

              {/* Note about stETH balance */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You must have stETH in your wallet to burn. The stETH will be transferred from your wallet to reduce the vault's liability.
                </AlertDescription>
              </Alert>

              {/* Error Message */}
              {displayError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{displayError}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending || isConfirming}>
                Cancel
              </Button>
              <Button
                onClick={handleBurn}
                disabled={!isConnected || isPending || isConfirming || !amount || !liabilityShares || liabilityShares === 0n}
                className="bg-red-600 hover:bg-red-700"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Burn stETH
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Withdraw Dialog Component
function WithdrawDialog({
  dashboardAddress,
  withdrawableValue,
  onSuccess
}: {
  dashboardAddress: string
  withdrawableValue: bigint | undefined
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const chains = useChains()

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const explorerUrl = getExplorerUrl(chainId, chains)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setAmount('')
      setLocalError(null)
      reset()
    }
  }, [open, reset])

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      onSuccess?.()
    }
  }, [isSuccess, onSuccess])

  const handleWithdraw = async () => {
    setLocalError(null)

    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount')
      return
    }

    if (!address) {
      setLocalError('Wallet not connected')
      return
    }

    const withdrawAmount = parseEther(amount)
    if (withdrawableValue && withdrawAmount > withdrawableValue) {
      setLocalError('Amount exceeds withdrawable balance')
      return
    }

    try {
      await writeContract({
        address: dashboardAddress as `0x${string}`,
        abi: DASHBOARD_ABI,
        functionName: 'withdraw',
        args: [address, withdrawAmount],
      })
    } catch (err) {
      setLocalError(parseErrorMessage(err))
    }
  }

  const displayError = localError || (writeError ? parseErrorMessage(writeError) : null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-brand-purple-300 text-brand-purple-700 hover:bg-brand-purple-50 hover:text-brand-purple-800">
          <ArrowUpFromLine className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpFromLine className="w-5 h-5 text-brand-purple-600" />
            Withdraw ETH
          </DialogTitle>
          <DialogDescription>
            Withdraw available ETH from your vault to your wallet.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Withdrawal Successful!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {amount} ETH has been sent to your wallet
            </p>
            {hash && (
              <a
                href={`${explorerUrl}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan-600 hover:underline text-sm flex items-center justify-center gap-1"
              >
                View transaction <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <Button onClick={() => setOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {/* Withdrawable Balance */}
              <div className="bg-brand-purple-50 rounded-lg p-3 border border-brand-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-purple-700">Available to Withdraw</span>
                  <span className="font-mono font-medium text-brand-purple-900">
                    {withdrawableValue ? formatEth(withdrawableValue) : '0.0000'} ETH
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
                <div className="relative">
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    className="pr-16"
                    disabled={isPending || isConfirming}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ETH
                  </span>
                </div>
                {withdrawableValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-brand-purple-600"
                    onClick={() => setAmount(formatEther(withdrawableValue))}
                    disabled={isPending || isConfirming}
                  >
                    Use Max
                  </Button>
                )}
              </div>

              {/* Warning */}
              {withdrawableValue === 0n && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No funds are currently available for withdrawal. You may need to wait for validators to exit or burn stETH to free up collateral.
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {displayError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{displayError}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending || isConfirming}>
                Cancel
              </Button>
              <Button
                onClick={handleWithdraw}
                disabled={!isConnected || isPending || isConfirming || !amount || withdrawableValue === 0n}
                className="bg-brand-purple-500 hover:bg-brand-purple-600"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <ArrowUpFromLine className="w-4 h-4 mr-2" />
                    Withdraw
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Activity event type
interface VaultActivity {
  type: 'funded' | 'withdrawn' | 'staged' | 'unstaged'
  amount: bigint
  blockNumber: bigint
  transactionHash: string
  timestamp?: number
}

// Recent Activity Component
function RecentActivity({
  vaultAddress,
  isLoading: parentLoading
}: {
  vaultAddress: string
  isLoading?: boolean
}) {
  const [activities, setActivities] = useState<VaultActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const publicClient = usePublicClient()
  const chainId = useChainId()
  const chains = useChains()

  const explorerUrl = getExplorerUrl(chainId, chains)

  const fetchActivityLogs = async () => {
    if (!vaultAddress || !publicClient) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get current block number
      const currentBlock = await publicClient.getBlockNumber()

      // Look back ~10000 blocks (roughly 1-2 days on Ethereum)
      const fromBlock = currentBlock > 10000n ? currentBlock - 10000n : 0n

      // Define event signatures for the StakingVault
      const fundedEvent = parseAbiItem('event EtherFunded(uint256 amount)')
      const withdrawnEvent = parseAbiItem('event EtherWithdrawn(address indexed recipient, uint256 amount)')
      const stagedEvent = parseAbiItem('event EtherStaged(uint256 amount)')
      const unstagedEvent = parseAbiItem('event EtherUnstaged(uint256 amount)')

      // Fetch all event types in parallel
      const [fundedLogs, withdrawnLogs, stagedLogs, unstagedLogs] = await Promise.all([
        publicClient.getLogs({
          address: vaultAddress as `0x${string}`,
          event: fundedEvent,
          fromBlock,
          toBlock: 'latest',
        }).catch(() => []),
        publicClient.getLogs({
          address: vaultAddress as `0x${string}`,
          event: withdrawnEvent,
          fromBlock,
          toBlock: 'latest',
        }).catch(() => []),
        publicClient.getLogs({
          address: vaultAddress as `0x${string}`,
          event: stagedEvent,
          fromBlock,
          toBlock: 'latest',
        }).catch(() => []),
        publicClient.getLogs({
          address: vaultAddress as `0x${string}`,
          event: unstagedEvent,
          fromBlock,
          toBlock: 'latest',
        }).catch(() => []),
      ])

      // Parse and combine activities
      const allActivities: VaultActivity[] = []

      fundedLogs.forEach(log => {
        allActivities.push({
          type: 'funded',
          amount: (log.args as any)?.amount || 0n,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        })
      })

      withdrawnLogs.forEach(log => {
        allActivities.push({
          type: 'withdrawn',
          amount: (log.args as any)?.amount || 0n,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        })
      })

      stagedLogs.forEach(log => {
        allActivities.push({
          type: 'staged',
          amount: (log.args as any)?.amount || 0n,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        })
      })

      unstagedLogs.forEach(log => {
        allActivities.push({
          type: 'unstaged',
          amount: (log.args as any)?.amount || 0n,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        })
      })

      // Sort by block number descending and take last 20
      allActivities.sort((a, b) => Number(b.blockNumber - a.blockNumber))

      // Fetch timestamps for activities (in batches to avoid too many requests)
      const activitiesWithTimestamps = await Promise.all(
        allActivities.slice(0, 20).map(async (activity) => {
          try {
            const block = await publicClient.getBlock({ blockNumber: activity.blockNumber })
            return { ...activity, timestamp: Number(block.timestamp) }
          } catch {
            return activity
          }
        })
      )

      setActivities(activitiesWithTimestamps)
    } catch (err) {
      console.error('Error fetching activity logs:', err)
      setError('Unable to load recent activity')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch on mount and when vault address changes
  useEffect(() => {
    fetchActivityLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultAddress, publicClient])

  const getActivityConfig = (type: VaultActivity['type']) => {
    switch (type) {
      case 'funded':
        return {
          icon: ArrowDownToLine,
          label: 'Funded',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          sign: '+'
        }
      case 'withdrawn':
        return {
          icon: ArrowUpFromLine,
          label: 'Withdrawn',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          sign: '-'
        }
      case 'staged':
        return {
          icon: Shield,
          label: 'Staged',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          sign: ''
        }
      case 'unstaged':
        return {
          icon: Clock,
          label: 'Unstaged',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          sign: ''
        }
    }
  }

  const formatTimestamp = (timestamp: number | undefined) => {
    if (!timestamp) return 'Unknown'
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (parentLoading || isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={fetchActivityLogs}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Last {activities.length} vault transactions
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchActivityLogs}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <History className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1">
              Vault transactions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = getActivityConfig(activity.type)
              const Icon = config.icon

              return (
                <div
                  key={`${activity.transactionHash}-${index}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {/* Icon */}
                  <div className={cn("p-2 rounded-full", config.bgColor)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{config.label}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      <span>•</span>
                      <a
                        href={`${explorerUrl}/block/${activity.blockNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-cyan-600 transition-colors"
                      >
                        Block {activity.blockNumber.toString()}
                      </a>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={cn("font-mono font-medium text-sm", config.color)}>
                      {config.sign}{formatEth(activity.amount)} ETH
                    </p>
                    <a
                      href={`${explorerUrl}/tx/${activity.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-brand-cyan-600 transition-colors flex items-center justify-end gap-1"
                    >
                      View tx <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VaultStatusClient() {
  const searchParams = useSearchParams()
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Get addresses from URL params only
  const dashboardAddress = searchParams?.get('dashboard') || ''
  const vaultAddress = searchParams?.get('vault') || ''

  // Check if we have valid addresses
  const hasValidAddresses = dashboardAddress.startsWith('0x') && dashboardAddress.length === 42

  // Read dashboard data - only if we have valid addresses
  const { data: initialized, isLoading: initLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'initialized',
    query: { enabled: hasValidAddresses }
  })

  const { data: totalValue, isLoading: totalValueLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'totalValue',
    query: { enabled: hasValidAddresses }
  })

  const { data: withdrawableValue, isLoading: withdrawableLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'withdrawableValue',
    query: { enabled: hasValidAddresses }
  })

  const { data: liabilityShares, isLoading: liabilityLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'liabilityShares',
    query: { enabled: hasValidAddresses }
  })

  const { data: totalMintingCapacity, isLoading: mintCapLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'totalMintingCapacityShares',
    query: { enabled: hasValidAddresses }
  })

  const { data: remainingMintingCapacity, isLoading: remainingCapLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'remainingMintingCapacityShares',
    args: [0n],
    query: { enabled: hasValidAddresses }
  })

  const { data: feeRate, isLoading: feeRateLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'feeRate',
    query: { enabled: hasValidAddresses }
  })

  const { data: feeRecipient, isLoading: feeRecipientLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'feeRecipient',
    query: { enabled: hasValidAddresses }
  })

  const { data: accruedFee, isLoading: accruedFeeLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'accruedFee',
    query: { enabled: hasValidAddresses }
  })

  const { data: latestReport, isLoading: reportLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'latestReport',
    query: { enabled: hasValidAddresses }
  })

  const { data: vaultConnection, isLoading: connectionLoading } = useReadContract({
    address: hasValidAddresses ? dashboardAddress as `0x${string}` : undefined,
    abi: DASHBOARD_ABI,
    functionName: 'vaultConnection',
    query: { enabled: hasValidAddresses }
  })

  // Calculate reserve ratio percentage
  const reserveRatioBP = vaultConnection?.reserveRatioBP ? Number(vaultConnection.reserveRatioBP) : undefined
  const reserveRatioPercent = reserveRatioBP ? (reserveRatioBP / 100).toFixed(1) : '0.0'

  // Calculate minting capacity usage
  const capacityUsedPercent = totalMintingCapacity && remainingMintingCapacity
    ? Number(((totalMintingCapacity - remainingMintingCapacity) * 100n) / totalMintingCapacity)
    : 0

  // Loading states
  const isInitialLoading = initLoading || totalValueLoading || connectionLoading
  const isHeroLoading = totalValueLoading || liabilityLoading || connectionLoading
  const isCapacityLoading = mintCapLoading || remainingCapLoading

  // No addresses provided
  if (!hasValidAddresses) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-cyan-100 flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-brand-cyan-600" />
            </div>
            <CardTitle>No Vault Selected</CardTitle>
            <CardDescription>
              Please select a vault from your dashboard to view its status and manage your staking position.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" asChild>
              <a href="/app/my-vaults">
                View My Vaults
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show skeleton while initial data loads
  if (isInitialLoading) {
    return (
      <>
        {/* Header Skeleton */}
        <section className="border-b border-gray-200 pb-16 mb-12 w-full">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-64" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </section>

        <div className="space-y-12">
          {/* Metrics Skeleton */}
          <section>
            <Card className="border border-gray-200">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center p-6">
                      <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-4 w-24 mx-auto mb-2" />
                      <Skeleton className="h-10 w-32 mx-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Health & APR Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </section>

          {/* Minting Capacity Skeleton */}
          <section>
            <Card className="border border-gray-200">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-full rounded-full" />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-gray-200 pb-16 mb-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
          {/* Left side - Title and info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Vault Details
              </h1>
              {initLoading ? (
                <Skeleton className="h-7 w-24 rounded-full" />
              ) : (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-sm font-medium",
                    initialized
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  )}
                >
                  {initialized ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Active</>
                  ) : (
                    <><Clock className="w-3.5 h-3.5 mr-1.5" /> Pending</>
                  )}
                </Badge>
              )}
            </div>
            <p className="text-gray-500 mt-1 mb-4 lg:mb-0">
              {vaultAddress ? `${vaultAddress.slice(0, 6)}...${vaultAddress.slice(-4)}` : 'Loading...'}
              {latestReport?.timestamp && (
                <span className="text-gray-400 ml-3">
                  · Last updated {new Date(Number(latestReport.timestamp) * 1000).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-wrap gap-4 lg:flex-nowrap">
            <FundVaultDialog
              dashboardAddress={dashboardAddress}
              onSuccess={() => {}}
            />
            <WithdrawDialog
              dashboardAddress={dashboardAddress}
              withdrawableValue={withdrawableValue}
              onSuccess={() => {}}
            />
            <MintStETHDialog
              dashboardAddress={dashboardAddress}
              remainingMintingCapacity={remainingMintingCapacity}
              liabilityShares={liabilityShares}
              onSuccess={() => {}}
            />
            <BurnStETHDialog
              dashboardAddress={dashboardAddress}
              liabilityShares={liabilityShares}
              reserveRatioBP={reserveRatioBP}
              totalValue={totalValue}
              onSuccess={() => {}}
            />
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {/* Key Metrics */}
        <section>
          <Card className="border border-gray-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <HeroMetric
                  label="Total Value Locked"
                  value={totalValue ? formatEth(totalValue) : undefined}
                  unit="ETH"
                  isLoading={totalValueLoading}
                  icon={Wallet}
                  accentColor="text-brand-cyan-600"
                />
                <HeroMetric
                  label="stETH Minted"
                  value={liabilityShares ? formatEth(liabilityShares) : undefined}
                  unit="stETH"
                  isLoading={liabilityLoading}
                  icon={Coins}
                  accentColor="text-brand-purple-600"
                />
                <HeroMetric
                  label="Reserve Ratio"
                  value={reserveRatioPercent}
                  unit="%"
                  subValue={reserveRatioBP && reserveRatioBP >= 2000 ? 'Well Collateralized' : 'Monitor Closely'}
                  isLoading={connectionLoading}
                  icon={Shield}
                  accentColor="text-green-600"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Health & APR Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HealthIndicator
            reserveRatioBP={reserveRatioBP}
            isLoading={connectionLoading}
          />
          <APRDisplay isLoading={reportLoading} />
        </section>

        {/* Minting Capacity */}
        <section>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Minting Capacity
              </CardTitle>
              <CardDescription>
                Your available capacity to mint additional stETH
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCapacityLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-full rounded-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used</span>
                    <span className="font-medium">
                      {totalMintingCapacity && remainingMintingCapacity
                        ? formatEth(totalMintingCapacity - remainingMintingCapacity)
                        : '0.0000'
                      } / {totalMintingCapacity ? formatEth(totalMintingCapacity) : '0.0000'} stETH
                    </span>
                  </div>
                  <Progress value={capacityUsedPercent} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      {remainingMintingCapacity ? formatEth(remainingMintingCapacity) : '0.0000'} stETH available to mint
                    </span>
                    <span className="text-muted-foreground">
                      {capacityUsedPercent.toFixed(1)}% used
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Withdrawable Balance */}
        <section>
          <Card className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Available to Withdraw</p>
                  {withdrawableLoading ? (
                    <Skeleton className="h-10 w-40" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-900">
                      {withdrawableValue ? formatEth(withdrawableValue) : '0.0000'} ETH
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Funds available for immediate withdrawal
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gray-100">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        {vaultAddress && (
          <section>
            <RecentActivity
              vaultAddress={vaultAddress}
              isLoading={initLoading}
            />
          </section>
        )}

        {/* Advanced Details Toggle */}
        <section>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced Details
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          {showAdvanced && (
            <div className="mt-8 space-y-8 animate-in slide-in-from-top-2 duration-200">
              {/* Fee Configuration */}
              <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Fee Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Fee Rate</p>
                    {feeRateLoading ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      <p className="text-lg font-semibold">{feeRate ? basisPointsToPercent(feeRate) : '0.00'}%</p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Infrastructure Fee</p>
                    {connectionLoading ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      <p className="text-lg font-semibold">
                        {vaultConnection?.infraFeeBP ? basisPointsToPercent(Number(vaultConnection.infraFeeBP)) : '0.00'}%
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Liquidity Fee</p>
                    {connectionLoading ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      <p className="text-lg font-semibold">
                        {vaultConnection?.liquidityFeeBP ? basisPointsToPercent(Number(vaultConnection.liquidityFeeBP)) : '0.00'}%
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Reservation Fee</p>
                    {connectionLoading ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      <p className="text-lg font-semibold">
                        {vaultConnection?.reservationFeeBP ? basisPointsToPercent(Number(vaultConnection.reservationFeeBP)) : '0.00'}%
                      </p>
                    )}
                  </div>
                </div>

                {/* Accrued Fees */}
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Accrued Fees</p>
                      {accruedFeeLoading ? (
                        <Skeleton className="h-6 w-24" />
                      ) : (
                        <p className="text-lg font-semibold">{accruedFee ? formatEth(accruedFee) : '0.0000'} ETH</p>
                      )}
                    </div>
                    {feeRecipient && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Fee Recipient</p>
                        <p className="font-mono text-xs">{feeRecipient.slice(0, 6)}...{feeRecipient.slice(-4)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

              {/* Contract Addresses */}
              <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Contract Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Dashboard Contract</p>
                    <p className="font-mono text-sm break-all">{dashboardAddress}</p>
                  </div>
                  {vaultAddress && (
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Vault Contract</p>
                      <p className="font-mono text-sm break-all">{vaultAddress}</p>
                    </div>
                  )}
                  {vaultConnection?.owner && (
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Vault Owner</p>
                      <p className="font-mono text-sm break-all">{vaultConnection.owner}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

              {/* Latest Report Details */}
              {latestReport && (
                <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Latest Oracle Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Reported Total Value</p>
                      <p className="text-lg font-semibold">{formatEth(latestReport.totalValue)} ETH</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">In/Out Delta</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        Number(latestReport.inOutDelta) >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {Number(latestReport.inOutDelta) >= 0 ? '+' : ''}
                        {formatEth(latestReport.inOutDelta)} ETH
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Report Timestamp</p>
                      <p className="text-lg font-semibold">
                        {new Date(Number(latestReport.timestamp) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
