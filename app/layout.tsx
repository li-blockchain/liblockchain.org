import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Long Island Blockchain',
    template: '%s | Long Island Blockchain',
  },
  description: 'Long Island Blockchain - Web3 Development, Education, and Blockchain Services since 2016',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          id="gtags"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZNEWL0M5SB"
        />
        <Script id="ganalytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNEWL0M5SB', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
