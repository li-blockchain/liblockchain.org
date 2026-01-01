'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useAccount, usePublicClient, useChainId, useReadContracts } from 'wagmi'
import { getVaultFactoryAddress, VAULT_FACTORY_ADDRESSES } from '../../../lib/contracts/vaultFactory'
import { DASHBOARD_ABI } from '../../../lib/contracts/dashboard'

// Role function names to check - user needs ANY of these roles to see a vault
const ROLE_FUNCTION_NAMES = [
  'DEFAULT_ADMIN_ROLE',
  'FUND_ROLE',
  'WITHDRAW_ROLE',
  'MINT_ROLE',
  'BURN_ROLE',
  'REBALANCE_ROLE',
  'NODE_OPERATOR_MANAGER_ROLE',
] as const

type RoleFunctionName = typeof ROLE_FUNCTION_NAMES[number]

// shadcn components
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Icons
import { AlertTriangle, AlertCircle, Wallet, Box, Plus, ArrowRight, Shield } from 'lucide-react'

interface VaultInfo {
  vaultAddress: string
  dashboardAddress: string
  blockNumber: bigint
}

// Helper to format role name for display
const formatRoleName = (role: string): string => {
  return role
    .replace('_ROLE', '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function MyVaultsClient() {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const chainId = useChainId()
  const [error, setError] = useState<string | null>(null)

  // Get the vault factory address for the current chain
  const vaultFactoryAddress = getVaultFactoryAddress(chainId)
  const isSupportedNetwork = !!vaultFactoryAddress

  // Get network name for display
  const getNetworkName = (id: number) => {
    switch (id) {
      case 1: return 'Ethereum Mainnet'
      case 560048: return 'Hoodi Testnet'
      default: return `Chain ${id}`
    }
  }

  // Known vaults on Hoodi testnet
  // TODO: Replace with proper vault discovery (subgraph, backend API, or user storage)
  const KNOWN_VAULTS: Record<number, VaultInfo[]> = {
    560048: [ // Hoodi Testnet
      {
        vaultAddress: '0x338edBcd4DC5F19458F4e62022475145162B7eD7',
        dashboardAddress: '0x8d982d7172f3EA6D87dc11A738d0E51782Cdb662',
        blockNumber: 0n,
      },
      {
        vaultAddress: '0x24Fa1B2679ea27f0978E16B57c09145b605dB577',
        dashboardAddress: '0x58244335598E3DCa62291d07140440613069AB18',
        blockNumber: 0n,
      },
      {
        vaultAddress: '0x89B990dB93391807449a4e07212550455dF4EC2e',
        dashboardAddress: '0x5ffAf8235f00E601b785a60CD1A3adD1E0c9476D',
        blockNumber: 0n,
      },
    ],
  }

  // Get known vaults for current chain
  const knownVaults = KNOWN_VAULTS[chainId] || []
  const firstDashboard = knownVaults[0]?.dashboardAddress as `0x${string}` | undefined

  // Phase 1: Fetch role constants from first dashboard (same across all dashboards)
  const roleConstantContracts = useMemo(
    () =>
      firstDashboard
        ? ROLE_FUNCTION_NAMES.map((fn) => ({
            address: firstDashboard,
            abi: DASHBOARD_ABI,
            functionName: fn,
          }))
        : [],
    [firstDashboard]
  )

  const { data: roleConstantsData, isLoading: roleConstantsLoading } = useReadContracts({
    contracts: roleConstantContracts,
    query: { enabled: !!firstDashboard && isConnected },
  })

  // Transform role constants to a map
  const roleConstants = useMemo(() => {
    if (!roleConstantsData) return undefined
    return ROLE_FUNCTION_NAMES.reduce((acc, name, i) => {
      const result = roleConstantsData[i]
      if (result?.status === 'success') {
        acc[name] = result.result as `0x${string}`
      }
      return acc
    }, {} as Record<RoleFunctionName, `0x${string}`>)
  }, [roleConstantsData])

  // Phase 2: Check all roles for all vaults
  const hasAllRoleConstants = roleConstants && Object.keys(roleConstants).length === ROLE_FUNCTION_NAMES.length

  const roleCheckContracts = useMemo(() => {
    if (!hasAllRoleConstants || !address || knownVaults.length === 0) return []

    return knownVaults.flatMap((vault) =>
      ROLE_FUNCTION_NAMES.map((roleName) => ({
        address: vault.dashboardAddress as `0x${string}`,
        abi: DASHBOARD_ABI,
        functionName: 'hasRole' as const,
        args: [roleConstants![roleName], address],
      }))
    )
  }, [hasAllRoleConstants, address, knownVaults, roleConstants])

  const { data: roleCheckData, isLoading: roleCheckLoading } = useReadContracts({
    contracts: roleCheckContracts,
    query: {
      enabled: roleCheckContracts.length > 0,
    },
  })

  // Filter vaults based on role checks - user must have at least one role
  const { filteredVaults, vaultRoles } = useMemo(() => {
    if (!roleCheckData || knownVaults.length === 0) {
      return { filteredVaults: [], vaultRoles: {} as Record<string, string[]> }
    }

    const roles: Record<string, string[]> = {}
    const filtered = knownVaults.filter((vault, vaultIndex) => {
      const startIdx = vaultIndex * ROLE_FUNCTION_NAMES.length
      const userRoles: string[] = []

      ROLE_FUNCTION_NAMES.forEach((roleName, roleIdx) => {
        const result = roleCheckData[startIdx + roleIdx]
        if (result?.status === 'success' && result.result === true) {
          userRoles.push(roleName)
        }
      })

      if (userRoles.length > 0) {
        roles[vault.dashboardAddress] = userRoles
        return true
      }
      return false
    })

    return { filteredVaults: filtered, vaultRoles: roles }
  }, [roleCheckData, knownVaults])

  // Combined loading state
  const isLoading = (roleConstantsLoading || roleCheckLoading) && isConnected && isSupportedNetwork

  // Loading message
  const getLoadingMessage = () => {
    if (roleConstantsLoading) return 'Loading role definitions...'
    if (roleCheckLoading) return 'Checking your permissions...'
    return 'Loading...'
  }

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-gray-200 pb-16 mb-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Vaults
            </h1>
            <p className="text-gray-500 mt-1 mb-4 lg:mb-0">
              View and manage all your private staking vaults
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white">
              <Link href="/app/create-vault">
                <Plus className="w-4 h-4 mr-2" />
                Create New Vault
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vaults List Section */}
      <div className="space-y-12">

          {/* Not Connected State */}
          {!isConnected && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
                <Wallet className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Please connect your wallet to view your vaults
              </p>
            </div>
          )}

          {/* Unsupported Network State */}
          {isConnected && !isSupportedNetwork && (
            <div className="max-w-2xl mx-auto">
              <Alert className="border-yellow-300 bg-yellow-50">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <AlertTitle className="text-yellow-800 text-lg font-bold">Unsupported Network</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  <p className="mb-2">
                    You&apos;re currently connected to <strong>{getNetworkName(chainId)}</strong>, which is not supported.
                  </p>
                  <p className="mb-3">
                    Supported Networks: <strong>Ethereum Mainnet</strong> or <strong>Hoodi Testnet</strong>
                  </p>
                  <p className="text-sm text-yellow-600">
                    Please switch your wallet to a supported network to view your vaults.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Loading State with Skeletons */}
          {isConnected && isSupportedNetwork && isLoading && (
            <div className="space-y-8">
              <div className="text-center text-muted-foreground mb-4">
                {getLoadingMessage()}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-24 w-full" />
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                      <Skeleton className="h-12 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {isConnected && isSupportedNetwork && error && (
            <div className="max-w-2xl mx-auto">
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-lg font-bold">Error Loading Vaults</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Empty State - User has no roles in any vault */}
          {isConnected && isSupportedNetwork && !isLoading && !error && filteredVaults.length === 0 && (
            <Card className="max-w-md mx-auto text-center py-12">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                  <Shield className="w-10 h-10 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl mb-4">No Vault Access</CardTitle>
                <CardDescription className="text-lg mb-8">
                  You don&apos;t have any roles assigned in the available vaults.
                  Contact a vault administrator to request access.
                </CardDescription>
                <Button asChild size="lg" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white">
                  <Link href="/app/create-vault">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your Own Vault
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Vaults Grid */}
          {isConnected && isSupportedNetwork && !isLoading && !error && filteredVaults.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVaults.map((vault, index) => (
                  <Card
                    key={vault.vaultAddress}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      "hover:border-primary hover:shadow-xl group"
                    )}
                  >
                    <CardHeader className="bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gray-900 text-lg">
                          Vault #{filteredVaults.length - index}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                          Active
                        </Badge>
                      </div>
                      {/* Show user's roles in this vault */}
                      {vaultRoles[vault.dashboardAddress] && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {vaultRoles[vault.dashboardAddress].map((role) => (
                            <Badge
                              key={role}
                              variant="secondary"
                              className="text-xs bg-brand-cyan-50 text-brand-cyan-700 border-brand-cyan-200"
                            >
                              {formatRoleName(role)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground mb-1">
                            Vault Address
                          </div>
                          <div className="font-mono text-xs text-foreground break-all bg-muted p-2 rounded-md">
                            {vault.vaultAddress}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-muted-foreground mb-1">
                            Dashboard Address
                          </div>
                          <div className="font-mono text-xs text-foreground break-all bg-muted p-2 rounded-md">
                            {vault.dashboardAddress}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t pt-6">
                      <Button
                        asChild
                        className="w-full bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white transition-colors"
                      >
                        <Link href={`/app/vault-status?vault=${vault.vaultAddress}&dashboard=${vault.dashboardAddress}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
      </div>
    </>
  )
}
