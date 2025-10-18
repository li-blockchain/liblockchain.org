import Hamburger from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface NavigationProps {
    showConnectWallet?: boolean;
}

export default function Navigation({ showConnectWallet = false }: NavigationProps) {
    const [isOpen, setOpen] = useState(false);

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
                        <Link href="/#staking" className="px-4 py-2 text-brand-slate-600 hover:text-brand-cyan-600 font-medium transition-colors">
                            Staking
                        </Link>
                        <Link href="/#networks" className="px-4 py-2 text-brand-slate-600 hover:text-brand-purple-600 font-medium transition-colors">
                            Networks
                        </Link>
                        <Link href="/#about" className="px-4 py-2 text-brand-slate-600 hover:text-brand-cyan-600 font-medium transition-colors">
                            About
                        </Link>
                        <a href="https://mirror.xyz/0x372051ff945eD07b8073872C7B77C9E84e000e06" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-brand-slate-600 hover:text-brand-purple-600 font-medium transition-colors">
                            Blog
                        </a>
                        <a href="https://www.youtube.com/c/LongIslandBlockchain" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-brand-slate-600 hover:text-brand-purple-600 font-medium transition-colors">
                            Learn
                        </a>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {showConnectWallet ? (
                            <div className="connect-wallet-custom">
                                <ConnectButton />
                            </div>
                        ) : (
                            <Link href="/create-vault" className="px-6 py-2.5 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow">
                                Stake Now
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
                        <Link href="/#staking" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Staking
                        </Link>
                        <Link href="/#networks" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-purple-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Networks
                        </Link>
                        <Link href="/#about" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-cyan-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            About
                        </Link>
                        <a href="https://mirror.xyz/0x372051ff945eD07b8073872C7B77C9E84e000e06" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-purple-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Blog
                        </a>
                        <a href="https://www.youtube.com/c/LongIslandBlockchain" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-brand-slate-600 hover:text-brand-purple-600 hover:bg-brand-slate-50 rounded-lg transition-colors">
                            Learn
                        </a>
                        <div className="pt-4">
                            {showConnectWallet ? (
                                <div className="flex justify-center connect-wallet-custom">
                                    <ConnectButton />
                                </div>
                            ) : (
                                <Link href="/create-vault" className="block w-full px-6 py-3 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-center font-semibold rounded-lg transition-colors">
                                    Stake Now
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
