import Head from 'next/head'
import Navigation from '../components/Navigation'
import ContactForm from '../components/ContactForm'

export default function InstitutionalStaking() {
  return (
    <>
      <Head>
        <title>Institutional Staking Services - Long Island Blockchain</title>
        <meta name="description" content="Enterprise-grade Ethereum staking solutions for institutions. Secure, compliant, and optimized for institutional requirements." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/institutional-staking"
          key="canonical"
        />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <div className="hero flex flex-col items-center justify-center h-auto bg-[url('/sky.jpg')] bg-cover mx-auto py-20">
        <div className="flex flex-col items-center justify-center max-w-6xl px-6">
          <h1 className="text-4xl lg:text-6xl text-white text-center tracking-tight font-extrabold mb-6">
            Institutional Ethereum Staking
          </h1>
          <h2 className="lg:text-2xl text-xl tracking-tight text-gray-200 text-center mb-8 max-w-4xl">
            Enterprise-grade staking infrastructure designed for institutions. Maximize your Ethereum returns while maintaining the highest standards of security, compliance, and operational excellence.
          </h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200">
              Get Started
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-lg transition duration-200">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">7+</div>
              <div className="text-gray-600">Years in Blockchain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6">Why Institutions Choose Us</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for institutional requirements with enterprise-grade security, compliance, and support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Enterprise Security</h4>
              <p className="text-gray-600">Multi-signature custody, hardware security modules, and institutional-grade infrastructure protection.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Regulatory Compliance</h4>
              <p className="text-gray-600">Full compliance with regulatory requirements, comprehensive reporting, and audit-ready documentation.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Optimized Returns</h4>
              <p className="text-gray-600">Advanced MEV protection, optimal validator performance, and competitive fee structures.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Dedicated Support</h4>
              <p className="text-gray-600">24/7 technical support, dedicated account management, and priority incident response.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9L12 2 4.5 2 2 4.5v15L4.5 22h15l2.5-2.5v-15L19.5 2z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Transparent Reporting</h4>
              <p className="text-gray-600">Real-time dashboards, detailed performance analytics, and comprehensive audit trails.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Risk Management</h4>
              <p className="text-gray-600">Advanced slashing protection, diversified validator operations, and comprehensive insurance coverage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive staking solutions tailored to your institution's specific requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">White-Label Staking</h4>
              <p className="text-gray-600 mb-6">
                Fully branded staking infrastructure that integrates seamlessly with your existing systems and maintains your customer relationships.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Custom branding and UI
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  API integration support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Revenue sharing models
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Custody Integration</h4>
              <p className="text-gray-600 mb-6">
                Seamless integration with leading institutional custody providers while maintaining your existing security protocols.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Multi-custody support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Non-custodial options
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Institutional-grade security
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Portfolio Management</h4>
              <p className="text-gray-600 mb-6">
                Comprehensive portfolio management tools with real-time monitoring, performance analytics, and risk assessment.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Real-time dashboard
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Performance analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Risk monitoring
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Consulting & Advisory</h4>
              <p className="text-gray-600 mb-6">
                Strategic guidance on staking operations, regulatory compliance, and blockchain infrastructure optimization.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Strategic planning
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Compliance guidance
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Technical optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Client Types Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6">Who We Serve</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading financial institutions, corporations, and investment firms worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Asset Managers</h4>
              <p className="text-gray-600 text-sm">Investment firms and fund managers seeking yield optimization</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Banks</h4>
              <p className="text-gray-600 text-sm">Traditional financial institutions entering digital assets</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Family Offices</h4>
              <p className="text-gray-600 text-sm">High-net-worth individuals and family investment offices</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Corporations</h4>
              <p className="text-gray-600 text-sm">Enterprises with treasury management and yield requirements</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Start Staking?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join leading institutions who trust Long Island Blockchain for their Ethereum staking needs.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200">
              Schedule Consultation
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-6">Get in Touch</h3>
            <p className="text-xl text-gray-600">
              Speak with our institutional team about your staking requirements.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <img className="w-40 mx-auto mb-4" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
          <p className="text-gray-400">Trusted blockchain infrastructure since 2016</p>
        </div>
      </footer>
    </>
  )
}