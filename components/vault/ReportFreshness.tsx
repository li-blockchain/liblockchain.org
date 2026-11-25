'use client'

import { AlertTriangle, CheckCircle2, Info, Loader2, RefreshCw } from 'lucide-react'
import { useAccount } from 'wagmi'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useFreshReport, type FreshReport, type ReportUpdateStatus } from '@/hooks/use-fresh-report'

const STEP_LABELS: Partial<Record<ReportUpdateStatus, string>> = {
  checking: 'Checking the vault’s oracle report…',
  fetching: 'Step 1 of 2 — preparing the oracle report update…',
  signing: 'Step 1 of 2 — confirm the oracle report update in your wallet.',
  confirming: 'Step 1 of 2 — waiting for the oracle report update to confirm…',
}

/**
 * Inline status for a dialog whose submit handler calls `report.ensureFresh()`.
 * Tells the user up front that a stale report means two signatures, then tracks
 * the first one.
 */
export function ReportStepNotice({ report }: { report: FreshReport }) {
  if (report.isUpdating) {
    return (
      <Alert className="border-brand-cyan-200 bg-brand-cyan-50">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>{STEP_LABELS[report.status]}</AlertDescription>
      </Alert>
    )
  }

  if (report.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{report.error}</AlertDescription>
      </Alert>
    )
  }

  if (report.status === 'done') {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          Oracle report updated. Step 2 of 2 — confirm the transaction in your wallet.
        </AlertDescription>
      </Alert>
    )
  }

  if (report.notice) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>{report.notice}</AlertDescription>
      </Alert>
    )
  }

  if (report.isStale) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This vault’s oracle report is out of date. You’ll sign two transactions: first to apply
          the latest report, then this operation.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

function formatAge(timestamp: number | undefined): string | null {
  if (!timestamp) return null
  const hours = (Date.now() / 1000 - timestamp) / 3600
  if (hours < 1) return 'less than an hour ago'
  if (hours < 48) return `${Math.round(hours)} hour${Math.round(hours) === 1 ? '' : 's'} ago`
  return `${Math.round(hours / 24)} days ago`
}

/**
 * Page-level banner: shown only while the vault's applied report is behind the
 * latest one Lido published. Lets anyone apply it without starting an operation.
 */
export function ReportStatusBanner({ dashboardAddress }: { dashboardAddress: string }) {
  const report = useFreshReport(dashboardAddress)
  const { isConnected } = useAccount()

  if (!report.isStale && !report.isUpdating && !report.error) return null

  const age = formatAge(report.latestReportTimestamp)

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-left">
            <p className="font-medium text-amber-900">Oracle report out of date</p>
            <p className="text-sm text-amber-800">
              Lido published a new report{age ? ` ${age}` : ''} that has not been applied to this
              vault. The figures below are from the previous report, and withdrawing or minting
              will apply the new one first.
            </p>
            {report.isUpdating && (
              <p className="mt-1 text-sm text-amber-900">
                {(STEP_LABELS[report.status] ?? '').replace('Step 1 of 2 — ', '')}
              </p>
            )}
            {report.error && <p className="mt-1 text-sm text-red-700">{report.error}</p>}
          </div>
        </div>
        <Button
          variant="outline"
          className="shrink-0 border-amber-300 bg-white text-amber-900 hover:bg-amber-100"
          disabled={!isConnected || report.isUpdating}
          onClick={() => report.ensureFresh()}
          title={isConnected ? undefined : 'Connect a wallet to update the report'}
        >
          {report.isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isConnected ? 'Update report' : 'Connect wallet to update'}
        </Button>
      </div>
    </div>
  )
}
