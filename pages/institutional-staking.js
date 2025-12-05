import Head from 'next/head'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import ContactForm from '../components/ContactForm'
import Link from 'next/link'

export default function InstitutionalStaking() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Whitelabel Validators & Institutional Staking - Long Island Blockchain</title>
        <meta name="description" content="Enterprise Ethereum validator infrastructure for institutions. Custom branded staking solutions with SOC-2 compliance and top 5% performance." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/institutional-staking"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-purple-500/10 border border-brand-purple-500/30 text-brand-purple-400 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by Family Offices & DAOs
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl text-white font-bold tracking-tight mb-6">
              Whitelabel Validators &
              <span className="block text-transparent bg-clip-text bg-purple-gradient">
                Institutional Staking
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-brand-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Custom branded Ethereum validator infrastructure running on our SOC-2 compliant datacenter. Your brand, our proven top 5% performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-brand-purple-500 hover:bg-brand-purple-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-glow-purple transform hover:scale-105"
              >
                Schedule Consultation
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
              <div className="text-brand-slate-600 font-medium">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-brand-purple-600 mb-2">Top 5%</div>
              <div className="text-brand-slate-600 font-medium">Performance Ranking</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-brand-pink-600 mb-2">Since 2016</div>
              <div className="text-brand-slate-600 font-medium">In Blockchain Infrastructure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-brand-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Why Institutions Choose LIBC
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Purpose-built infrastructure for family offices, DAOs, and institutional validators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                SOC-2 compliant datacenter with hardware we own and operate. Multi-signature custody, HSMs, and institutional-grade protection.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Regulatory Compliance</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Full compliance support, comprehensive reporting, audit-ready documentation, and transparent SLAs for institutional requirements.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-pink-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Optimized Returns</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Top 5% performance on rated.network. Advanced MEV protection, optimal attestation effectiveness, competitive fee structures.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">24/7 Support</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Dedicated account management, priority incident response, technical support, and direct access to our infrastructure team.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow" id="rewards">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Transparent Reporting</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Real-time dashboards, detailed performance analytics, comprehensive audit trails, and automated reward tracking.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-brand-slate-200 hover:border-brand-pink-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow-purple transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-slate-900 mb-3">Risk Management</h3>
              <p className="text-brand-slate-600 leading-relaxed">
                Advanced slashing protection, diversified validator operations, comprehensive monitoring, and optional insurance coverage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Comprehensive staking solutions tailored to your institution&apos;s requirements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-brand-slate-50 to-white rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900">White-Label Validators</h3>
              </div>
              <p className="text-brand-slate-600 mb-6 leading-relaxed">
                Fully branded staking infrastructure that maintains your customer relationships and integrates seamlessly with your existing systems.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Custom branding and UI integration</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Complete API integration support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Flexible revenue sharing models</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-brand-slate-50 to-white rounded-2xl border border-brand-slate-200 hover:border-brand-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900">Custody Integration</h3>
              </div>
              <p className="text-brand-slate-600 mb-6 leading-relaxed">
                Seamless integration with leading institutional custody providers while maintaining your existing security protocols.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Multi-custody provider support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Non-custodial staking options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Institutional-grade key management</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-brand-slate-50 to-white rounded-2xl border border-brand-slate-200 hover:border-brand-pink-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900">Portfolio Management</h3>
              </div>
              <p className="text-brand-slate-600 mb-6 leading-relaxed">
                Comprehensive portfolio management tools with real-time monitoring, performance analytics, and risk assessment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-pink-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Real-time performance dashboards</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-pink-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Advanced performance analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-pink-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Automated risk monitoring</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-brand-slate-50 to-white rounded-2xl border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-slate-900">Consulting & Advisory</h3>
              </div>
              <p className="text-brand-slate-600 mb-6 leading-relaxed">
                Strategic guidance on staking operations, regulatory compliance, and blockchain infrastructure optimization.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">DeFi strategy optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Regulatory compliance guidance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-brand-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-slate-700">Infrastructure technical optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Reporting & Analysis Section */}
      <div id="rewards" className="bg-brand-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-slate-900 mb-4">
              Comprehensive Rewards Analysis
            </h2>
            <p className="text-lg text-brand-slate-600 max-w-2xl mx-auto">
              Deep insights into validator performance and staking rewards with institutional-grade analytics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <h3 className="text-2xl font-bold text-brand-slate-900 mb-6">Real-Time Performance Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-purple-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">Attestation Effectiveness</h4>
                    <p className="text-brand-slate-600 text-sm">Monitor validator attestation performance in real-time with detailed metrics on source, target, and head vote accuracy. Track inclusion distance and participation rates across all your validators.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-purple-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">Block Proposal Tracking</h4>
                    <p className="text-brand-slate-600 text-sm">Complete visibility into block proposals including successful proposals, missed opportunities, MEV rewards, and priority fees. Historical analysis of proposal patterns and optimization opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-purple-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">Comparative Benchmarking</h4>
                    <p className="text-brand-slate-600 text-sm">See how your validators perform against the entire network using rated.network data. Rankings update continuously showing your position in the top 5% of all validators with trend analysis over time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-brand-slate-200">
              <h3 className="text-2xl font-bold text-brand-slate-900 mb-6">Rewards Analytics & Reporting</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-cyan-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">Granular Reward Breakdown</h4>
                    <p className="text-brand-slate-600 text-sm">Detailed accounting of all reward streams: consensus layer rewards, execution layer tips, MEV rewards, and sync committee participation. Track every ETH earned with complete transaction-level transparency.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-cyan-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">Tax & Compliance Ready</h4>
                    <p className="text-brand-slate-600 text-sm">Export detailed reports formatted for tax preparation and regulatory compliance. Historical cost basis tracking, realized vs unrealized gains, and customizable reporting periods aligned with your fiscal calendar.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-cyan-100 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-slate-900 mb-1">APR Projections & Trends</h4>
                    <p className="text-brand-slate-600 text-sm">Forward-looking yield analysis based on historical performance, network conditions, and MEV opportunity trends. Scenario modeling for different market conditions with confidence intervals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-purple-600 to-brand-purple-700 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Custom Dashboard & API Access
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Access all your staking data through our secure web dashboard or integrate directly with your internal systems via our comprehensive API. Real-time webhooks, historical data exports, and custom alerting configured to your specifications.
                </p>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>RESTful API with comprehensive documentation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>WebSocket feeds for real-time updates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Customizable alerting thresholds and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Historical data exports in multiple formats (CSV, JSON, Parquet)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-white/80 text-sm">Dashboard Uptime</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-white/80 text-xs">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">&lt;100ms</div>
                    <div className="text-white/80 text-xs">API Latency</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Unlimited</div>
                  <div className="text-white/80 text-xs">API Requests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Types Section */}
      <div className="bg-brand-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-brand-slate-300 max-w-2xl mx-auto">
              Trusted by leading financial institutions and investment firms worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-shadow duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Family Offices</h4>
              <p className="text-brand-slate-400 text-sm">High-net-worth individuals and family investment offices</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-purple transition-shadow duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">DAOs</h4>
              <p className="text-brand-slate-400 text-sm">Decentralized organizations managing treasury assets</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-pink-500 to-brand-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-purple transition-shadow duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Asset Managers</h4>
              <p className="text-brand-slate-400 text-sm">Investment firms seeking optimized staking yield</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-shadow duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Protocols</h4>
              <p className="text-brand-slate-400 text-sm">DeFi protocols requiring validator infrastructure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="bg-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-brand-slate-600">
              Speak with our institutional team about your staking requirements
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-slate-900 border-t border-brand-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img className="w-40 mx-auto mb-4" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
          <p className="text-brand-slate-400">White label Ethereum validators • SOC-2 compliant • Since 2016</p>
        </div>
      </footer>

      {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} defaultServices="Whitelabel Validators & Institutional Staking" />}
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
              className={`w-full p-3 border rounded-lg ${emailError ? 'border-red-500' : 'border-brand-slate-300'} focus:outline-none focus:ring-2 focus:ring-brand-purple-500`}
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
              className="w-full p-3 border border-brand-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-brand-purple-600 transition-colors disabled:opacity-50"
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
