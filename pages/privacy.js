import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navigation from '../components/Navigation'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Long Island Blockchain</title>
        <meta name="description" content="Privacy Policy for LI Blockchain LLC mobile application and wallet services." />
        <link
          rel="canonical"
          href="https://liblockchain.xyz/privacy"
          key="canonical"
        />
      </Head>

      <Navigation></Navigation>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 mb-8">Effective Date: July 24, 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                LI Blockchain LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This Privacy Policy describes how we collect, use, and protect your information when you use our mobile application (the &ldquo;App&rdquo;), which includes a self-custody cryptocurrency wallet powered by Privy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect limited personal information necessary to provide core wallet functionality:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Wallet Address:</strong> Automatically generated and stored securely using Privy.</li>
                <li><strong>Authentication Information:</strong> If you sign in using email or social login (e.g., Google), we collect your email address or public identifier.</li>
                <li><strong>App Usage Data:</strong> We may collect anonymized diagnostic or crash data to improve performance (if enabled).</li>
              </ul>
              <p className="text-gray-700 mb-6">
                We do not collect information with advertisers or unrelated third parties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Children&rsquo;s Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our app is not intended for children under the age of 13. We do not knowingly collect personal data from children.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You can:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Disconnect your wallet at any time</li>
                <li>Request deletion of your account (if applicable)</li>
                <li>Manage permissions through your device or within the app settings</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. Any changes will be posted in the app and updated here with the new effective date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700 mb-6">
                ■ craig@liblockchain.org<br />
                LI Blockchain LLC
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://liblockchain.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <img className="w-40" alt="Long Island Blockchain Logo" src="/libc-logo.png" />
          </span>
        </a>
      </footer>
    </>
  )
}
