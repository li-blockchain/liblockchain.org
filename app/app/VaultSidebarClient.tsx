'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Plus, Lock, HelpCircle } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export default function VaultSidebarClient() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '?')
  }

  const navItems = [
    { name: 'My Vaults', href: '/app/my-vaults', icon: Box },
    { name: 'Create Vault', href: '/app/create-vault', icon: Plus },
  ]

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cyan-500">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-bold">Vault Manager</span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.name}
                      className={
                        active
                          ? 'bg-brand-cyan-500 text-white hover:bg-brand-cyan-600 hover:text-white'
                          : ''
                      }
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / Help */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-gradient-to-br from-brand-cyan-50 to-brand-purple-50 p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan-600" />
            <div>
              <p className="mb-1 text-xs font-semibold">Need Help?</p>
              <p className="text-xs text-muted-foreground">
                Visit our{' '}
                <a
                  href="/insights"
                  className="font-medium text-brand-cyan-600 hover:text-brand-cyan-700 hover:underline"
                >
                  Insights
                </a>
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
