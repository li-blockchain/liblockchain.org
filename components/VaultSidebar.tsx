import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface VaultSidebarProps {
  className?: string
}

export default function VaultSidebar({ className = '' }: VaultSidebarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/my-vaults') {
      return router.pathname === '/my-vaults'
    }
    if (path === '/create-vault') {
      return router.pathname === '/create-vault'
    }
    if (path === '/vault-status') {
      return router.pathname === '/vault-status'
    }
    return false
  }

  const navItems = [
    {
      name: 'My Vaults',
      href: '/my-vaults',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: 'Create Vault',
      href: '/create-vault',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-brand-slate-200 hover:bg-brand-slate-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6 text-brand-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white border-r border-brand-slate-200 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-brand-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-brand-slate-900">Vault Manager</h2>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      active
                        ? 'bg-brand-cyan-500 text-white shadow-md'
                        : 'text-brand-slate-600 hover:bg-brand-slate-50 hover:text-brand-cyan-600'
                    }
                  `}
                >
                  <span className={active ? 'text-white' : ''}>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-brand-slate-200">
            <div className="bg-gradient-to-br from-brand-cyan-50 to-brand-purple-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-brand-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-brand-slate-900 mb-1">Need Help?</p>
                  <p className="text-xs text-brand-slate-600">
                    Visit our{' '}
                    <a
                      href="https://mirror.xyz/0x372051ff945eD07b8073872C7B77C9E84e000e06"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-cyan-600 hover:text-brand-cyan-700 font-medium"
                    >
                      documentation
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
