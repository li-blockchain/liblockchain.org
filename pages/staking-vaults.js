import Head from 'next/head'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import ContactForm from '../components/ContactForm'
import Link from 'next/link'

export default function StakingVaults() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Liquidity-Enabled Staking Vaults - Long Island Blockchain</title>
        <meta name="description" content="Expert deployment and operation of Lido v3 stVault infrastructure. Unlock liquidity while staking with institutional-grade vault management and top 5% validator performance." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/staking-vaults"
          key="canonical"
        />
      </Head>

      <Navigation onContactClick={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <div className="relative bg-brand-slate-900 overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-hero-mesh"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-cyan-500/10 border border-brand-cyan-500/30 text-brand-cyan-400 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Lido v3 stVault Infrastructure
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl text-white font-bold tracking-tight mb-6">
              Liquidity-Enabled
              <span className="block text-transparent bg-clip-text bg-cyan-gradient">
                Staking Vaults
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-brand-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Deploy and operate custom staking vaults that unlock liquidity through Lido&apos;s v3 stVault system. Institutional-grade infrastructure, top 5% performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-glow transform hover:scale-105"
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-brand-cyan-600 mb-2">$100M+</div>
              <div className="text-brand-slate-600 font-medium">Staked Across Infrastructure</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-brand-purple-600 mb-2">Top 5%</div>
              <div className="text-brand-slate-600 font-medium">Validator Performance</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-brand-pink-600 mb-2">24/7</div>
              <div className="text-brand-slate-600 font-medium">SOC-2 Datacenter Operations</div>
            </div>
          </div>
        </div>
      </div>

      {/* What are stVaults Section */}
      <div className="bg-brand-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-6">
              What are stVaults?
            </h2>
            <p className="text-lg text-brand-slate-600 leading-relaxed">
              Lido v3&apos;s stVault system represents the next evolution in Ethereum staking. Unlike traditional staking where your ETH is locked, stVaults enable you to stake ETH, receive liquid stETH tokens, and deploy that liquidity across DeFi while earning staking rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <div className="w-12 h-12 bg-brand-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Unlock Liquidity</h3>
              <p className="text-brand-slate-600">
                Stake your ETH and receive stETH - a liquid token that maintains your staking position while allowing you to use it in lending protocols, liquidity pools, and other DeFi applications.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <div className="w-12 h-12 bg-brand-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Maintain Control</h3>
              <p className="text-brand-slate-600">
                Your vault runs on dedicated validator infrastructure that you control. Custom policies, withdrawal credentials, and validator keys specific to your organization.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <div className="w-12 h-12 bg-brand-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-brand-slate-600">
                Validators run in our SOC-2 compliant datacenter with redundant infrastructure, 24/7 monitoring, and battle-tested security practices honed since 2016.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <div className="w-12 h-12 bg-brand-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Top Performance</h3>
              <p className="text-brand-slate-600">
                Ranked in the top 5% of all Ethereum validators on rated.network with optimized attestation effectiveness and minimal missed duties to maximize your rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Capabilities Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Full-Service Vault Operations
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              From deployment to daily operations, we handle every aspect of your staking vault infrastructure
            </p>
          </div>

          <div className="space-y-12">
            {/* Deployment */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-cyan-100 rounded-xl mb-4">
                  <span className="text-2xl font-bold text-brand-cyan-600">1</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900 mb-3">Vault Deployment</h3>
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-3 text-brand-slate-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-cyan-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Smart contract deployment and configuration of your custom stVault on Ethereum mainnet</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-cyan-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Integration with Lido v3 protocol for stETH minting and liquidity access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-cyan-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom withdrawal credentials and vault policies tailored to your organization&apos;s requirements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-cyan-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive security audits and testing before going live</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Validator Operations */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-purple-100 rounded-xl mb-4">
                  <span className="text-2xl font-bold text-brand-purple-600">2</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900 mb-3">Validator Operations</h3>
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-3 text-brand-slate-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated validator infrastructure running in our SOC-2 compliant datacenter</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 monitoring, alerting, and rapid response to any validator issues</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automatic validator key rotation and secure key management practices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Redundant systems and failover infrastructure to ensure maximum uptime</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ongoing Management */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-pink-100 rounded-xl mb-4">
                  <span className="text-2xl font-bold text-brand-pink-600">3</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900 mb-3">Ongoing Management</h3>
              </div>
              <div className="lg:w-2/3">
                <ul className="space-y-3 text-brand-slate-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time performance dashboards showing validator effectiveness, rewards, and vault status</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed rewards reporting and analytics for accounting and compliance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Protocol upgrades and maintenance handled seamlessly without service interruption</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-brand-pink-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated support and consultation from our team of Ethereum staking experts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-brand-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Who Benefits from stVaults?
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Organizations that want both staking rewards and DeFi flexibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">DAOs & Treasuries</h3>
              <p className="text-brand-slate-600 mb-4">
                Stake treasury ETH to earn rewards while maintaining liquidity for governance proposals, grants, and operational expenses through stETH.
              </p>
              <ul className="space-y-2 text-sm text-brand-slate-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Earn while staying liquid</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom governance controls</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transparent reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Family Offices</h3>
              <p className="text-brand-slate-600 mb-4">
                Institutional-grade staking infrastructure with the flexibility to deploy stETH across yield-generating DeFi strategies for optimized returns.
              </p>
              <ul className="space-y-2 text-sm text-brand-slate-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>SOC-2 compliance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Enhanced yield strategies</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>White-glove service</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">DeFi Protocols</h3>
              <p className="text-brand-slate-600 mb-4">
                Build liquidity-enabled staking products on top of custom vaults. Offer users staking rewards plus DeFi composability through stETH integration.
              </p>
              <ul className="space-y-2 text-sm text-brand-slate-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Battle-tested infrastructure</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API integration support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-brand-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom branding options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why LIBC Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Why Choose LIBC for Your Vaults?
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Deep expertise in both Ethereum staking and the Lido ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-slate-900 mb-2">Proven Track Record</h3>
                <p className="text-brand-slate-600">
                  Since 2016, we&apos;ve operated validators for Lido, Rocketpool, and native staking with over $100M staked and top 5% performance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-slate-900 mb-2">Lido Ecosystem Expertise</h3>
                <p className="text-brand-slate-600">
                  Deep understanding of Lido&apos;s architecture, stETH mechanics, and integration patterns from years of running Lido validators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-slate-900 mb-2">Enterprise Security</h3>
                <p className="text-brand-slate-600">
                  SOC-2 compliant datacenter with owned hardware, redundant systems, and battle-tested security practices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-slate-900 mb-2">End-to-End Support</h3>
                <p className="text-brand-slate-600">
                  From initial deployment through daily operations and future upgrades, we&apos;re with you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-cyan-600 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Staking Vault?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Let&apos;s discuss how our Lido v3 stVault infrastructure can unlock liquidity for your staked ETH while maintaining institutional-grade security and performance.
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-white text-brand-cyan-600 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-brand-slate-600">
              Let&apos;s discuss your staking vault requirements
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} defaultServices="Liquidity-Enabled Staking Vaults" />}
    </>
  )
}

function ContactModal({ onClose, defaultServices = '' }) {
  const [email, setEmail] = useState('');
  const [services, setServices] = useState(defaultServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/post-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            properties: {
              'Email': { email },
              'Services interested in': {
                multi_select: [{ name: services }]
              }
            }
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setServices('');
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light"
        >
          ✕
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-brand-slate-900">Let&apos;s connect</h2>
          <p className="text-sm text-brand-slate-600 mt-1">A member of our team will be in contact within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-brand-slate-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              className={`w-full p-3 border rounded-lg ${emailError ? 'border-red-500' : 'border-brand-slate-300'} focus:outline-none focus:ring-2 focus:ring-brand-cyan-500`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-brand-slate-700 font-medium mb-2">Services Interested In</label>
            <textarea
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full p-3 border border-brand-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-brand-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {submitStatus === 'success' && (
            <p className="text-green-600 text-center mt-3 font-medium">Thanks! We will be in contact shortly.</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center mt-3">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
