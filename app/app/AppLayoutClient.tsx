'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Vault, PlusCircle, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/app/my-vaults', label: 'My Vaults', icon: Vault },
  { href: '/app/create-vault', label: 'Create Vault', icon: PlusCircle },
]

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* App Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & App Name */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <img alt="LIBC" className="h-8 w-auto" src="/libc-logo.png" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-cyan-50 text-brand-cyan-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right side - Wallet */}
            <div className="flex items-center gap-4">
              {/* Desktop wallet */}
              <div className="hidden md:block">
                <ConnectButton
                  showBalance={{ smallScreen: false, largeScreen: true }}
                  accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                />
              </div>

              {/* Mobile menu button - only visible on mobile */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-cyan-50 text-brand-cyan-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-3 pb-1">
                <ConnectButton
                  showBalance={{ smallScreen: true, largeScreen: true }}
                  accountStatus={{ smallScreen: 'full', largeScreen: 'full' }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img alt="LIBC" className="h-8 w-auto" src="/libc-logo.png" />
                <span className="font-semibold text-lg text-gray-900">Long Island Blockchain</span>
              </div>
              <p className="text-gray-500 text-sm">
                Building trust in blockchain technology since 2016.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                &copy; {new Date().getFullYear()} Long Island Blockchain. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/app/my-vaults" className="hover:text-brand-cyan-600 transition-colors">
                    My Vaults
                  </Link>
                </li>
                <li>
                  <Link href="/app/create-vault" className="hover:text-brand-cyan-600 transition-colors">
                    Create Vault
                  </Link>
                </li>
                <li>
                  <Link href="/staking-vaults" className="hover:text-brand-cyan-600 transition-colors">
                    Learn More
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-brand-cyan-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-brand-cyan-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@liblockchain.org" className="hover:text-brand-cyan-600 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
