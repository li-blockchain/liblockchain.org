import Hamburger from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface NavigationProps {
    showConnectWallet?: boolean;
    onContactClick?: () => void;
}

export default function Navigation({ showConnectWallet = false, onContactClick }: NavigationProps) {
    const [isOpen, setOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    return (
        <>
        <style jsx global>{`
            /* Custom styling for RainbowKit Connect Button to match brand */
            /* Not connected state - solid background */
            .connect-wallet-custom button[data-testid="rk-connect-button"]:not([data-testid*="account"]) {
                background: linear-gradient(to right, #0099cc, #0099cc) !important;
                background-color: #0099cc !important;
                color: white !important;
                font-weight: 600 !important;
                padding: 0.625rem 1.5rem !important;
                border-radius: 0.5rem !important;
                transition: all 0.3s ease !important;
                box-shadow: none !important;
                border: none !important;
            }
            .connect-wallet-custom button[data-testid="rk-connect-button"]:not([data-testid*="account"]):hover {
                background: linear-gradient(to right, #0088bb, #0088bb) !important;
                background-color: #0088bb !important;
                box-shadow: 0 0 20px rgba(0, 153, 204, 0.4) !important;
            }

            /* Connected state - no background, no border */
            .connect-wallet-custom button[data-testid="rk-account-button"],
            .connect-wallet-custom div[data-testid="rk-account-button"] button {
                background: transparent !important;
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
                color: #1e293b !important;
                font-weight: 600 !important;
                padding: 0.625rem 1rem !important;
            }
            .connect-wallet-custom button[data-testid="rk-account-button"]:hover,
            .connect-wallet-custom div[data-testid="rk-account-button"] button:hover {
                background: transparent !important;
                opacity: 0.8 !important;
            }
        `}</style>
        {/* Navigation Component - New Staking Brand */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-0">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img alt="Long Island Blockchain Logo" className="w-36 lg:w-40" src="/libc-logo.png"/>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {/* Products Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsProductsOpen(true)}
                            onMouseLeave={() => setIsProductsOpen(false)}
                        >
                            <button className="px-4 py-2 text-brand-slate-600 hover:text-brand-cyan-600 font-medium transition-colors flex items-center gap-1">
                                Products
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProductsOpen && (
                                <div className="absolute top-full left-0 pt-2 w-80 z-50">
                                <div className="bg-white rounded-lg shadow-xl border border-brand-slate-200 py-2">
                                    <Link href="/staking-vaults" className="block px-6 py-3 hover:bg-brand-slate-50 transition-colors group">
                                        <div className="font-semibold text-brand-slate-900 group-hover:text-brand-cyan-600 transition-colors">
                                            ETH Staking Vaults
                                        </div>
                                        <div className="text-sm text-brand-slate-600 mt-1">
                                            Stake ETH, mint stETH, flexible DeFi strategies
                                        </div>
                                    </Link>
                                    <Link href="/institutional-staking" className="block px-6 py-3 hover:bg-brand-slate-50 transition-colors group">
                                        <div className="font-semibold text-brand-slate-900 group-hover:text-brand-cyan-600 transition-colors">
                                            Whitelabel Validators
                                        </div>
                                        <div className="text-sm text-brand-slate-600 mt-1">
                                            Custom branded staking infrastructure
                                        </div>
                                    </Link>
                                    <Link href="/institutional-staking#rewards" className="block px-6 py-3 hover:bg-brand-slate-50 transition-colors group">
                                        <div className="font-semibold text-brand-slate-900 group-hover:text-brand-cyan-600 transition-colors">
                                            Rewards Reporting
                                        </div>
                                        <div className="text-sm text-brand-slate-600 mt-1">
                                            Comprehensive staking analytics and tracking
                                        </div>
                                    </Link>
                                    <Link href="/community-wifi" className="block px-6 py-3 hover:bg-brand-slate-50 transition-colors group">
                                        <div className="font-semibold text-brand-slate-900 group-hover:text-brand-cyan-600 transition-colors">
                                            DePIN Infrastructure
                                        </div>
                                        <div className="text-sm text-brand-slate-600 mt-1">
                                            Decentralized physical infrastructure networks
                                        </div>
                                    </Link>
                                </div>
                                </div>
                            )}
                        </div>

                        <Link href="/#why-libc" className="px-4 py-2 text-brand-slate-600 hover:text-brand-purple-600 font-medium transition-colors">
                            Why LIBC
                        </Link>
                        <Link href="/#about" className="px-4 py-2 text-brand-slate-600 hover:text-brand-cyan-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link href="/insights" className="px-4 py-2 text-brand-slate-600 hover:text-brand-purple-600 font-medium transition-colors">
                            Insights
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {showConnectWallet ? (
                            <div className="connect-wallet-custom">
                                <ConnectButton />
                            </div>
                        ) : onContactClick ? (
                            <button onClick={onContactClick} className="px-6 py-2.5 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow">
                                Get in Touch
                            </button>
                        ) : (
                            <Link href="/#contact" className="px-6 py-2.5 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow">
                                Get in Touch
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpen} size={24} color="#0099cc" />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-brand-slate-200">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {/* Mobile Products Dropdown */}
                        <div>
                            <button
                                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors"
                            >
                                <span className="font-medium">Products</span>
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isMobileProductsOpen && (
                                <div className="ml-4 mt-1 space-y-1">
                                    <Link href="/staking-vaults" className="block px-4 py-3 text-sm text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                                        <div className="font-medium">ETH Staking Vaults</div>
                                        <div className="text-xs text-brand-slate-500 mt-0.5">Stake ETH, mint stETH, flexible DeFi strategies</div>
                                    </Link>
                                    <Link href="/institutional-staking" className="block px-4 py-3 text-sm text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                                        <div className="font-medium">Whitelabel Validators</div>
                                        <div className="text-xs text-brand-slate-500 mt-0.5">Custom branded staking infrastructure</div>
                                    </Link>
                                    <Link href="/institutional-staking#rewards" className="block px-4 py-3 text-sm text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                                        <div className="font-medium">Rewards Reporting</div>
                                        <div className="text-xs text-brand-slate-500 mt-0.5">Comprehensive staking analytics</div>
                                    </Link>
                                    <Link href="/community-wifi" className="block px-4 py-3 text-sm text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                                        <div className="font-medium">DePIN Infrastructure</div>
                                        <div className="text-xs text-brand-slate-500 mt-0.5">Decentralized physical networks</div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link href="/#why-libc" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-purple-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Why LIBC
                        </Link>
                        <Link href="/#about" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            About
                        </Link>
                        <Link href="/insights" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-purple-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Insights
                        </Link>
                        <div className="pt-4">
                            {showConnectWallet ? (
                                <div className="flex justify-center connect-wallet-custom">
                                    <ConnectButton />
                                </div>
                            ) : onContactClick ? (
                                <button onClick={() => { onContactClick(); setOpen(false); }} className="block w-full px-6 py-3 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-center font-semibold rounded-lg transition-colors">
                                    Get in Touch
                                </button>
                            ) : (
                                <Link href="/#contact" className="block w-full px-6 py-3 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-center font-semibold rounded-lg transition-colors">
                                    Get in Touch
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
        {/* Spacer to prevent content from going under fixed nav */}
        <div className="h-20"></div>
        </>
    );
}
