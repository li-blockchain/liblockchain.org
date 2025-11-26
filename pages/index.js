import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import ContractForm from '../components/ContactForm'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import StatsSection from '../components/StatsSection'
import NetworksGrid from '../components/NetworksGrid'
import TrustIndicators from '../components/TrustIndicators'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Long Island Blockchain - White Label Ethereum Validators</title>
        <meta name="description" content="Enterprise Ethereum validator infrastructure for institutions. $100M+ staked, top 5% performance. Supporting Lido, Rocketpool, and native staking from our SOC-2 datacenter since 2016." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz"
          key="canonical"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <Navigation></Navigation>

      {/* Hero Component - Staking Focused */}
      <div id="staking" className="relative bg-brand-slate-900 overflow-hidden">
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
              $100M+ Staked • Top 5% Performance • SOC-2 Compliant
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl text-white font-bold tracking-tight mb-6">
              We make blocks.
              <span className="block text-transparent bg-clip-text bg-purple-gradient">
                Not Ice Tea.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-brand-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Powering liquid staking protocols and institutional validators with enterprise-grade infrastructure. From our SOC-2 datacenter to your optimized DeFi strategies.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-glow-lg transform hover:scale-105"
              >
                Get in Touch
              </button>
            </div>

            {/* Trust Signals */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-brand-slate-300">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-brand-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Lido • Rocketpool • Native Staking</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-brand-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Own Hardware • Own Datacenter</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-brand-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Protocol Agnostic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Why Choose Us - The LIBC Difference */}
      <div id="why-libc" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              The LIBC Difference
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Why leading institutions trust us with their Ethereum staking infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Own Infrastructure */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Own Hardware & Datacenter</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Complete infrastructure ownership in our SOC-2 compliant datacenter. No cloud dependencies, no third-party risk. Enterprise connectivity and proven 99.9%+ uptime.
              </p>
            </div>

            {/* Top Performance */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Top 5% Performance</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Ranked in the top 5% of all validators on rated.network. Optimized attestation effectiveness, minimal missed duties, and maximized rewards for your stake.
              </p>
            </div>

            {/* Protocol Agnostic */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-pink-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Protocol Agnostic</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Support for Lido, Rocketpool, native staking, and emerging protocols. One infrastructure partner for all your Ethereum staking strategies.
              </p>
            </div>

            {/* Rapid Deployment */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Days, Not Months</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                From initial consultation to production validators in days. No bureaucracy, no delays. Move at the speed of opportunity in the evolving DeFi landscape.
              </p>
            </div>

            {/* DeFi Strategy Expertise */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">DeFi Strategy Optimization</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                We don&apos;t just run validators—we help design optimal yield strategies across liquid staking, restaking, and emerging DeFi opportunities.
              </p>
            </div>

            {/* Institutional Grade */}
            <div className="p-8 rounded-2xl border border-brand-slate-200 hover:border-brand-pink-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Institutional Standards</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                SOC-2 compliance, comprehensive reporting, and transparent SLAs. Built for family offices, DAOs, and institutions managing significant ETH holdings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Networks Grid */}
      <div id="networks">
        <NetworksGrid />
      </div>

      {/* How It Works Section */}
      <div className="bg-brand-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Built for Speed and Flexibility
            </h2>
            <p className="text-lg text-brand-slate-300 max-w-2xl mx-auto">
              From consultation to production validators in days, not months
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-full mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategy Consultation</h3>
              <p className="text-brand-slate-400">
                We work with your team to design optimal staking strategies across the DeFi ecosystem, maximizing yield while managing risk
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-full mb-6 group-hover:shadow-glow-purple transition-shadow duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Deploy Validators</h3>
              <p className="text-brand-slate-400">
                Launch white label validators on our SOC-2 compliant infrastructure with enterprise connectivity and proven uptime
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-full mb-6 group-hover:shadow-glow-purple transition-shadow duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Optimize & Scale</h3>
              <p className="text-brand-slate-400">
                Monitor top 5% performance metrics and adapt quickly to evolving opportunities in the Ethereum staking landscape
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate-900 mb-6">
              The Ethereum Staking Partner for Institutions
            </h2>
            <p className="text-lg text-brand-slate-600 leading-relaxed mb-8">
              Since 2016, we&apos;ve been powering validators for family offices, DAOs, and institutions with over $100M in stake. Our white label infrastructure supports the protocols you trust—Lido, Rocketpool, and native Ethereum staking—all running on hardware we own and operate in our SOC-2 compliant datacenter.
            </p>
            <p className="text-lg text-brand-slate-600 leading-relaxed">
              What sets us apart is our ability to move fast in a rapidly evolving landscape. We don&apos;t just run validators—we help you craft optimized DeFi strategies that maximize your yield. With top 5% performance according to rated.network, enterprise-grade connectivity, and a proven track record of exceptional uptime, we&apos;re the ideal partner for Ethereum staking at scale.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-brand-slate-900 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Power Your Ethereum Yield?
            </h2>
            <p className="text-lg text-brand-slate-300">
              Connect with our team to discuss white label validators and optimized DeFi strategies
            </p>
          </div>
          <ContractForm></ContractForm>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <img className="w-40 mb-4" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
              <p className="text-brand-slate-600 max-w-md">
                White label Ethereum validators for institutions. $100M+ staked, top 5% performance, SOC-2 compliant infrastructure since 2016.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-brand-slate-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/#staking" className="text-brand-slate-600 hover:text-brand-cyan-600 transition-colors">Staking</a></li>
                <li><a href="/#networks" className="text-brand-slate-600 hover:text-brand-purple-600 transition-colors">Networks</a></li>
                <li><a href="/#about" className="text-brand-slate-600 hover:text-brand-cyan-600 transition-colors">About</a></li>
                <li><a href="/#contact" className="text-brand-slate-600 hover:text-brand-purple-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-brand-slate-900 font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="https://mirror.xyz/0x372051ff945eD07b8073872C7B77C9E84e000e06" target="_blank" rel="noopener noreferrer" className="text-brand-slate-600 hover:text-brand-cyan-600 transition-colors">Blog</a></li>
                <li><a href="https://www.youtube.com/c/LongIslandBlockchain" target="_blank" rel="noopener noreferrer" className="text-brand-slate-600 hover:text-brand-purple-600 transition-colors">Learn</a></li>
                <li><a href="/privacy" className="text-brand-slate-600 hover:text-brand-cyan-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-brand-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-brand-slate-500 text-sm">
              © {new Date().getFullYear()} Long Island Blockchain. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-brand-slate-400 hover:text-brand-cyan-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-brand-slate-400 hover:text-brand-purple-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
