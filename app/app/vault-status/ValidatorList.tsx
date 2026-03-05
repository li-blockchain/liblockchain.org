'use client'

import { useState, useEffect } from 'react'
import { useChainId, useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import {
  fetchVaultValidators,
  formatPubkeyDisplay,
  gweiToEthString,
  getStatusColor,
  getStatusLabel,
  canTopUp,
  type ValidatorInfo,
} from '../../../lib/utils/beaconchain'
import { PDG_ABI, getPDGAddress, parsePDGError, ValidatorStage, VALIDATOR_STAGE_LABELS } from '../../../lib/contracts/pdg'

// shadcn components
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Icons
import {
  Server,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Info,
  ArrowUpFromLine,
  Loader2,
  AlertTriangle,
} from 'lucide-react'

interface ValidatorListProps {
  vaultAddress: string
  dashboardAddress: string
  isLoading?: boolean
}

// TopUp Dialog Component
function TopUpValidatorDialog({
  validator,
  chainId,
  onSuccess,
}: {
  validator: ValidatorInfo
  chainId: number
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const { address: userAddress } = useAccount()
  const pdgAddress = getPDGAddress(chainId)

  // Check validator status in PDG
  const { data: pdgValidatorStatus, isLoading: isLoadingPdgStatus } = useReadContract({
    address: pdgAddress,
    abi: PDG_ABI,
    functionName: 'validatorStatus',
    args: [validator.pubkey as `0x${string}`],
    query: { enabled: open && !!pdgAddress },
  })

  const { writeContract, data: hash, isPending, error: writeError, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Parse PDG validator status
  const pdgStage = pdgValidatorStatus ? Number((pdgValidatorStatus as { stage: number }).stage) : null
  const pdgStageName = pdgStage !== null ? VALIDATOR_STAGE_LABELS[pdgStage as ValidatorStage] : null
  const isActivatedInPdg = pdgStage === ValidatorStage.ACTIVATED

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

  const handleTopUp = () => {
    setLocalError(null)

    if (!pdgAddress) {
      setLocalError('PDG contract not available on this network')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount')
      return
    }

    // Check if validator is activated in PDG
    if (!isActivatedInPdg) {
      setLocalError(`Validator must be ACTIVATED in PDG to top up. Current stage: ${pdgStageName || 'Unknown'}`)
      return
    }

    const amountWei = parseEther(amount)
    const minAmount = parseEther('1') // 1 ETH minimum
    const maxAmount = parseEther('2048') // 2048 ETH maximum per Pectra

    if (amountWei < minAmount) {
      setLocalError('Minimum top-up amount is 1 ETH')
      return
    }

    if (amountWei > maxAmount) {
      setLocalError('Maximum top-up amount is 2048 ETH')
      return
    }

    // Call topUpExistingValidators with the validator pubkey and amount
    // Funds are pulled from the staking vault, not PDG balance
    writeContract({
      address: pdgAddress,
      abi: PDG_ABI,
      functionName: 'topUpExistingValidators',
      args: [[{ pubkey: validator.pubkey as `0x${string}`, amount: amountWei }]],
    })
  }

  const displayError = localError || (writeError ? parsePDGError(writeError) : null)
  const currentBalanceEth = Number(validator.effectiveBalance) / 1e9
  const newBalanceEth = amount ? currentBalanceEth + parseFloat(amount) : currentBalanceEth

  // Get explorer URL for transaction
  const getExplorerTxUrl = () => {
    if (!hash) return null
    if (chainId === 1) return `https://etherscan.io/tx/${hash}`
    if (chainId === 560048) return `https://hoodi.etherscan.io/tx/${hash}`
    return null
  }

  if (!canTopUp(validator.displayStatus)) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs border-brand-cyan-200 text-brand-cyan-700 hover:bg-brand-cyan-50"
        >
          <ArrowUpFromLine className="w-3 h-3 mr-1" />
          Top Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpFromLine className="w-5 h-5" />
            Top Up Validator
          </DialogTitle>
          <DialogDescription>
            Add additional ETH to validator #{validator.index}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6">
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Top-Up Submitted!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {amount} ETH top-up for validator #{validator.index} has been submitted.
              </p>
              {hash && getExplorerTxUrl() && (
                <a
                  href={getExplorerTxUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-cyan-600 hover:underline flex items-center justify-center gap-1"
                >
                  View transaction <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={() => setOpen(false)} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {/* Validator Info */}
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Validator</span>
                  <span className="font-mono">#{validator.index}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pubkey</span>
                  <code className="text-xs font-mono">{formatPubkeyDisplay(validator.pubkey)}</code>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-medium">{currentBalanceEth.toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">PDG Stage</span>
                  {isLoadingPdgStatus ? (
                    <span className="text-muted-foreground">Loading...</span>
                  ) : (
                    <span className={cn(
                      'font-medium',
                      isActivatedInPdg ? 'text-green-600' : 'text-amber-600'
                    )}>
                      {pdgStageName || 'Not in PDG'}
                    </span>
                  )}
                </div>
              </div>

              {/* Info note */}
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700">
                  Top-up funds are withdrawn from the staking vault balance.
                </p>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="topup-amount">Top-Up Amount (ETH)</Label>
                <Input
                  id="topup-amount"
                  type="number"
                  step="0.01"
                  min="1"
                  max="2048"
                  placeholder="Enter amount (1-2048 ETH)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isPending || isConfirming}
                />
                <p className="text-xs text-muted-foreground">
                  Min: 1 ETH, Max: 2048 ETH (Pectra limit)
                </p>
              </div>

              {/* Estimated New Balance */}
              {amount && parseFloat(amount) > 0 && (
                <div className="p-3 rounded-lg bg-brand-cyan-50 border border-brand-cyan-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-cyan-700">Estimated New Balance</span>
                    <span className="font-medium text-brand-cyan-800">
                      {newBalanceEth.toFixed(4)} ETH
                    </span>
                  </div>
                </div>
              )}

              {/* Warnings */}
              {!isLoadingPdgStatus && !isActivatedInPdg && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    This validator is not ACTIVATED in PDG (current stage: {pdgStageName || 'Unknown'}).
                    Only validators that went through the PDG predeposit flow can be topped up here.
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Display */}
              {displayError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{displayError}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending || isConfirming}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTopUp}
                disabled={isPending || isConfirming || !amount || parseFloat(amount) <= 0 || !isActivatedInPdg || isLoadingPdgStatus}
                className="bg-brand-cyan-600 hover:bg-brand-cyan-700"
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <ArrowUpFromLine className="w-4 h-4 mr-2" />
                    Top Up {amount ? `${amount} ETH` : ''}
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

function ValidatorRow({
  validator,
  chainId,
  onTopUpSuccess,
}: {
  validator: ValidatorInfo
  chainId: number
  onTopUpSuccess?: () => void
}) {
  const [copied, setCopied] = useState(false)

  const copyPubkey = () => {
    navigator.clipboard.writeText(validator.pubkey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get explorer URL for validator
  const getValidatorUrl = () => {
    if (chainId === 1) {
      return `https://beaconcha.in/validator/${validator.index}`
    }
    if (chainId === 560048) {
      return `https://hoodi.beaconcha.in/validator/${validator.index}`
    }
    return null
  }

  const explorerUrl = getValidatorUrl()

  return (
    <div className="flex items-center justify-between py-4 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
      {/* Left side: Index + Pubkey */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Validator Index */}
        <span className="text-sm font-semibold text-gray-900 w-14 flex-shrink-0">#{validator.index}</span>

        {/* Pubkey */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <code className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors">
                  {formatPubkeyDisplay(validator.pubkey)}
                </code>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-md">
                <p className="font-mono text-xs break-all">{validator.pubkey}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button
            onClick={copyPubkey}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-100"
            title="Copy pubkey"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-brand-cyan-600 transition-colors rounded hover:bg-gray-100"
              title="View on explorer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Right side: Status, Balance, Action */}
      <div className="flex items-center gap-8 flex-shrink-0 ml-6">
        {/* Status Badge */}
        <Badge
          variant="outline"
          className={cn('text-xs font-medium', getStatusColor(validator.displayStatus))}
        >
          {getStatusLabel(validator.displayStatus)}
        </Badge>

        {/* Balance */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-right min-w-[90px]">
                <p className="text-sm font-medium text-gray-900">
                  {gweiToEthString(validator.effectiveBalance)} ETH
                </p>
                <p className="text-xs text-gray-500">Effective</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Balance: {gweiToEthString(validator.balance)} ETH
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Top Up Button */}
        {canTopUp(validator.displayStatus) ? (
          <TopUpValidatorDialog
            validator={validator}
            chainId={chainId}
            onSuccess={onTopUpSuccess}
          />
        ) : (
          <div className="w-16" />
        )}
      </div>
    </div>
  )
}

function ValidatorListSkeleton() {
  return (
    <div className="space-y-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between py-4 px-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-8">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ValidatorList({ vaultAddress, dashboardAddress, isLoading: parentLoading }: ValidatorListProps) {
  const chainId = useChainId()
  const [validators, setValidators] = useState<ValidatorInfo[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchValidators = async (showRefreshing = false) => {
    if (!vaultAddress) {
      setIsLoading(false)
      return
    }

    if (showRefreshing) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      const result = await fetchVaultValidators(vaultAddress, chainId)
      if (result === null) {
        setError(`Beacon chain API not configured for chain ID ${chainId}`)
      } else {
        setValidators(result)
      }
    } catch (err) {
      console.error('[ValidatorList] Fetch error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch validators'
      setError(`API error: ${errorMessage}`)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultAddress, chainId])

  const handleTopUpSuccess = () => {
    // Refresh validators after successful top-up
    fetchValidators(true)
  }

  const activeCount = validators?.filter((v) => v.displayStatus === 'active').length ?? 0
  const pendingCount = validators?.filter((v) => v.displayStatus === 'pending').length ?? 0
  const totalCount = validators?.length ?? 0

  if (parentLoading) {
    return (
      <Card className="border border-gray-200">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <ValidatorListSkeleton />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Vault Validators</CardTitle>
            {!isLoading && validators && validators.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalCount} total
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchValidators(true)}
              disabled={isLoading || isRefreshing}
              className="h-8 px-2"
            >
              <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 px-2"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <CardDescription>
          Validators deposited using this vault&apos;s withdrawal credentials
        </CardDescription>
        {!isLoading && validators && validators.length > 0 && (
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-green-600">
              {activeCount} active
            </span>
            {pendingCount > 0 && (
              <span className="text-yellow-600">
                {pendingCount} pending
              </span>
            )}
          </div>
        )}
      </CardHeader>

      {isOpen && (
        <CardContent className="pt-0">
          {isLoading ? (
            <ValidatorListSkeleton />
          ) : error ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Failed to load validators</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          ) : validators && validators.length === 0 ? (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Info className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">No validators found</p>
                <p className="text-sm text-gray-500">
                  No validators have been deposited with this vault&apos;s withdrawal credentials yet.
                </p>
              </div>
            </div>
          ) : validators ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-4">
                  <span className="w-14">Index</span>
                  <span>Public Key</span>
                </div>
                <div className="flex items-center gap-8 ml-6">
                  <span>Status</span>
                  <span className="min-w-[90px] text-right">Balance</span>
                  <span className="w-16 text-center">Action</span>
                </div>
              </div>
              {/* Validator rows */}
              {validators.map((validator) => (
                <ValidatorRow
                  key={validator.pubkey}
                  validator={validator}
                  chainId={chainId}
                  onTopUpSuccess={handleTopUpSuccess}
                />
              ))}
            </div>
          ) : null}
        </CardContent>
      )}
    </Card>
  )
}
