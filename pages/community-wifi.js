import Head from 'next/head'
import Navigation from '../components/Navigation'
import EmbeddedContactForm from '../components/EmbeddedContactForm'

export default function CommunityWifi() {
  return (
    <>
      <Head>
        <title>Community WiFi Network - Long Island Blockchain</title>
        <meta name="description" content="Join Long Island's community-driven WiFi network. Monetize your WiFi and provide better connectivity to your customers." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/community-wifi"
          key="canonical"
        />
      </Head>

      <Navigation></Navigation>

      {/* Hero Section */}
      <div className="hero flex flex-col items-center justify-center h-auto bg-[url('/sky2.jpg')] bg-cover mx-auto py-20">
        <div className="flex flex-col items-center justify-center w-4/5 lg:w-3/5">
          <h1 className="text-4xl lg:text-6xl text-white text-center tracking-tight font-extrabold lg:m-5 lg:m-2 sm:m-0 sm:pt-10">
            Transform Your WiFi Into Revenue
          </h1>
          <h2 className="lg:text-xl lg:text-md sm:text-md tracking-tight text-gray-300 text-center mt-4">
            Join Long Island&apos;s community-driven WiFi network and turn your internet connection into a business opportunity while providing superior connectivity to your customers.
          </h2>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="flex flex-col items-center justify-center text-center py-16">
        <div className="max-w-6xl mx-auto px-10">
          <h3 className="text-4xl lg:text-5xl tracking-tight font-bold mb-8">
            Why Join Our Network?
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">💰</div>
              <h4 className="text-2xl font-bold mb-4">Generate Revenue</h4>
              <p className="text-gray-600">
                Monetize your existing WiFi infrastructure by sharing bandwidth with the community. Earn passive income from your internet connection.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">📶</div>
              <h4 className="text-2xl font-bold mb-4">Better Coverage</h4>
              <p className="text-gray-600">
                Provide your customers with enhanced connectivity through our carrier-grade network infrastructure, improving their experience at your location.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-2xl font-bold mb-4">Community Driven</h4>
              <p className="text-gray-600">
                Be part of a local Long Island network that keeps revenue in our community while building stronger connections between local businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <h3 className="text-4xl lg:text-5xl tracking-tight font-bold mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#5209B2] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-xl font-bold mb-3">Simple Setup</h4>
              <p className="text-gray-600">
                We provide easy-to-install equipment that connects to your existing internet. No technical expertise required.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#5209B2] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-xl font-bold mb-3">Start Sharing</h4>
              <p className="text-gray-600">
                Your WiFi becomes part of the community network, providing enhanced coverage to customers and visitors.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#5209B2] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-xl font-bold mb-3">Earn Revenue</h4>
              <p className="text-gray-600">
                Receive monthly payments based on network usage while providing better service to your customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <h3 className="text-4xl lg:text-5xl tracking-tight font-bold mb-12">
            Perfect For Long Island Businesses
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-lg">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🍕</div>
              <span className="font-semibold">Restaurants</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">☕</div>
              <span className="font-semibold">Cafes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🛒</div>
              <span className="font-semibold">Retail Stores</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🏢</div>
              <span className="font-semibold">Service Businesses</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">💇</div>
              <span className="font-semibold">Salons & Spas</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🏥</div>
              <span className="font-semibold">Medical Offices</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🏨</div>
              <span className="font-semibold">Hotels</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3">🎪</div>
              <span className="font-semibold">Event Venues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-10">
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl tracking-tight font-bold mb-6">
              Ready to Join the Network?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Get started today and begin earning revenue from your WiFi while providing better service to your customers. 
              A member of our team will contact you within 24 hours to discuss next steps.
            </p>
          </div>
          <EmbeddedContactForm />
        </div>
      </div>

      <footer className="flex items-center justify-center p-8 bg-white border-t">
        <a
          href="https://liblockchain.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <img className="w-40" alt="Long Island Blockchain Logo" src="/libc-logo.png"/>
        </a>
      </footer>
    </>
  )
}