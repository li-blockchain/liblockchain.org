'use client'

import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { BaseError, ContractFunctionRevertedError, isAddress } from 'viem'
import { useAccount, useChainId, usePublicClient, useReadContract, useWriteContract } from 'wagmi'

import { DASHBOARD_ABI } from '@/lib/contracts/dashboard'
import {
  LAZY_ORACLE_ABI,
  LAZY_ORACLE_ADDRESSES,
  REPORT_FRESHNESS_DELTA_SECONDS,
  VAULT_HUB_REPORT_ABI,
} from '@/lib/contracts/lazyOracle'
import { computeRoot, toUpdateVaultDataArgs, type VaultReportProof } from '@/lib/vaultReport'

/**
 * Keeps a vault's oracle report fresh before an operation.
 *
 * Lido publishes a report for all vaults daily, but it only takes effect for a
 * given vault once someone submits that vault's leaf to LazyOracle. Until then
 * withdraw / mint / rebalance revert, and every figure the Dashboard returns
 * (total value, withdrawable, mint capacity) is from the previous report.
 *
 * `ensureFresh()` is the entry point: call it at the top of a submit handler.
 * If the report is stale it sends the update transaction and waits for it, so
 * the operation that follows is transaction 2 of 2.
 */

export type ReportUpdateStatus =
  | 'idle'
  | 'checking' // reading freshness on-chain
  | 'fetching' // pulling the report + proof
  | 'signing' // waiting on the wallet
  | 'confirming' // waiting on the receipt
  | 'done'
  | 'error'

const POLL_MS = 60_000

function isUserRejection(error: unknown): boolean {
  if (error instanceof BaseError) {
    if (error.walk((e) => (e as Error).name === 'UserRejectedRequestError')) return true
  }
  const message = error instanceof Error ? error.message : String(error)
  return /user rejected|user denied|rejected the request/i.test(message)
}

function revertName(error: unknown): string | undefined {
  if (!(error instanceof BaseError)) return undefined
  const revert = error.walk((e) => e instanceof ContractFunctionRevertedError)
  return revert instanceof ContractFunctionRevertedError ? revert.data?.errorName : undefined
}

function describeFailure(error: unknown): string {
  if (isUserRejection(error)) return 'You cancelled the oracle report update.'

  switch (revertName(error)) {
    case 'InvalidProof':
      return 'The oracle report changed while preparing the update. Please try again.'
    case 'CumulativeLidoFeesTooLow':
    case 'CumulativeLidoFeesTooLarge':
    case 'InvalidMaxLiabilityShares':
    case 'TotalValueTooLarge':
    case 'UnderflowInTotalValueCalculation':
      return 'Lido rejected the latest report for this vault (sanity check failed). The next report should resolve it.'
  }

  if (error instanceof Error && error.message) return error.message
  return 'Could not update the oracle report.'
}

export function useFreshReport(dashboardAddress: string | undefined) {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const { address: account } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const [status, setStatus] = useState<ReportUpdateStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [hash, setHash] = useState<`0x${string}` | undefined>()

  const dashboard = dashboardAddress && isAddress(dashboardAddress) ? dashboardAddress : undefined
  const lazyOracle = LAZY_ORACLE_ADDRESSES[chainId]

  // Hub and vault never change for a dashboard.
  const { data: vaultHub } = useReadContract({
    address: dashboard,
    abi: DASHBOARD_ABI,
    functionName: 'VAULT_HUB',
    query: { enabled: !!dashboard, staleTime: Infinity },
  })
  const { data: vault } = useReadContract({
    address: dashboard,
    abi: DASHBOARD_ABI,
    functionName: 'stakingVault',
    query: { enabled: !!dashboard, staleTime: Infinity },
  })

  const hub = vaultHub as `0x${string}` | undefined
  const vaultAddress = vault as `0x${string}` | undefined
  const canRead = !!hub && !!vaultAddress

  const { data: isConnectedToHub } = useReadContract({
    address: hub,
    abi: VAULT_HUB_REPORT_ABI,
    functionName: 'isVaultConnected',
    args: vaultAddress ? [vaultAddress] : undefined,
    query: { enabled: canRead },
  })
  const { data: isFresh, isLoading: freshLoading } = useReadContract({
    address: hub,
    abi: VAULT_HUB_REPORT_ABI,
    functionName: 'isReportFresh',
    args: vaultAddress ? [vaultAddress] : undefined,
    query: { enabled: canRead, refetchInterval: POLL_MS },
  })
  const { data: latestReportData } = useReadContract({
    address: lazyOracle,
    abi: LAZY_ORACLE_ABI,
    functionName: 'latestReportData',
    query: { enabled: !!lazyOracle, refetchInterval: POLL_MS },
  })

  const latestReportTimestamp = latestReportData ? Number(latestReportData[0]) : undefined
  // A disconnected vault has no hub accounting, so there is nothing to refresh.
  const isStale = isConnectedToHub === true && isFresh === false
  const isUpdating =
    status === 'checking' || status === 'fetching' || status === 'signing' || status === 'confirming'

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    setNotice(null)
    setHash(undefined)
  }, [])

  /**
   * Resolves true once the vault's report is fresh (sending the update
   * transaction if needed), false if it could not be made fresh.
   *
   * `required: false` is for operations the contracts allow on a stale report
   * (fund, burn). They still refresh when they can, but a report that cannot be
   * fetched must not block them — funding is how an unhealthy vault is rescued.
   * A user rejecting the update always stops the operation.
   */
  const ensureFresh = useCallback(
    async ({ required = true }: { required?: boolean } = {}): Promise<boolean> => {
      setError(null)
      setNotice(null)
      setHash(undefined)

      const fail = (reason: unknown): boolean => {
        const message = describeFailure(reason)
        if (!required && !isUserRejection(reason)) {
          console.warn('[report] continuing without a fresh report:', reason)
          setNotice(`${message} Continuing — this operation does not require a fresh report.`)
          setStatus('idle')
          return true
        }
        setError(message)
        setStatus('error')
        return false
      }

      if (!publicClient || !hub || !vaultAddress) {
        return fail(new Error('Vault report status is still loading. Please try again in a moment.'))
      }

      try {
        setStatus('checking')

        const readFresh = () =>
          publicClient.readContract({
            address: hub,
            abi: VAULT_HUB_REPORT_ABI,
            functionName: 'isReportFresh',
            args: [vaultAddress],
          })

        const connected = await publicClient.readContract({
          address: hub,
          abi: VAULT_HUB_REPORT_ABI,
          functionName: 'isVaultConnected',
          args: [vaultAddress],
        })
        if (!connected || (await readFresh())) {
          setStatus('idle')
          return true
        }

        if (!lazyOracle) {
          return fail(new Error('Oracle reports are not available on this network.'))
        }

        setStatus('fetching')
        const [timestamp, , treeRoot, cid] = await publicClient.readContract({
          address: lazyOracle,
          abi: LAZY_ORACLE_ABI,
          functionName: 'latestReportData',
        })

        if (Date.now() / 1000 - Number(timestamp) >= REPORT_FRESHNESS_DELTA_SECONDS) {
          return fail(
            new Error(
              "Lido's oracle has not published a report in over 2 days, so this vault cannot be made fresh right now."
            )
          )
        }

        const response = await fetch(
          `/api/vault-report?cid=${encodeURIComponent(cid)}&root=${treeRoot}&vault=${vaultAddress}`
        )
        const body = await response.json().catch(() => null)
        if (!response.ok || !body?.data) {
          if (body?.code === 'vault-not-found') {
            return fail(
              new Error(
                'This vault is not in the latest oracle report yet. New vaults are included from the next daily report.'
              )
            )
          }
          return fail(new Error(body?.error || 'Could not fetch the oracle report.'))
        }

        const report = body.data as VaultReportProof

        // Our API is a convenience, not an authority: only sign for a proof that
        // resolves to the root LazyOracle actually holds, for this vault.
        if (
          report.vault.toLowerCase() !== vaultAddress.toLowerCase() ||
          computeRoot(report).toLowerCase() !== treeRoot.toLowerCase()
        ) {
          return fail(new Error('The oracle report did not match the on-chain root. Please try again.'))
        }

        const args = toUpdateVaultDataArgs(report)

        // Simulate first: catches a report someone else just applied, and
        // sanity-check reverts, before the wallet is opened.
        try {
          await publicClient.simulateContract({
            address: lazyOracle,
            abi: LAZY_ORACLE_ABI,
            functionName: 'updateVaultData',
            args,
            account,
          })
        } catch (simulationError) {
          if (revertName(simulationError) === 'VaultReportIsFreshEnough') {
            await queryClient.invalidateQueries()
            setStatus('idle')
            return true
          }
          throw simulationError
        }

        setStatus('signing')
        const txHash = await writeContractAsync({
          address: lazyOracle,
          abi: LAZY_ORACLE_ABI,
          functionName: 'updateVaultData',
          args,
          // The LazyOracle address is per-network: make the wallet be on the
          // network it was resolved for rather than sending this elsewhere.
          chainId,
        })
        setHash(txHash)

        setStatus('confirming')
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

        // Whatever happened to our transaction, what matters is the resulting
        // state — someone else may have applied the same report first.
        if (!(await readFresh())) {
          return fail(
            new Error(
              receipt.status === 'success'
                ? 'A newer oracle report was published while updating. Please try again.'
                : 'The oracle report update transaction failed.'
            )
          )
        }

        // Every Dashboard figure is derived from the report; re-read them all.
        await queryClient.invalidateQueries()
        setStatus('done')
        return true
      } catch (caught) {
        return fail(caught)
      }
    },
    [account, chainId, hub, lazyOracle, publicClient, queryClient, vaultAddress, writeContractAsync]
  )

  return {
    /** True when the connected vault's applied report is behind the latest published one. */
    isStale,
    isFresh: isFresh === true,
    isLoading: !canRead || freshLoading,
    isConnectedToHub: isConnectedToHub === true,
    /** Unix seconds of the latest report Lido published (not necessarily applied to this vault). */
    latestReportTimestamp,
    status,
    isUpdating,
    error,
    /** Non-blocking message, set when a non-required refresh was skipped. */
    notice,
    hash,
    ensureFresh,
    reset,
  }
}

export type FreshReport = ReturnType<typeof useFreshReport>
