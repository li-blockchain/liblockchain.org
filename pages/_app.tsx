import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import Head from 'next/head'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from '../lib/wagmi'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Script strategy="lazyOnload" id="gtags" src={`https://www.googletagmanager.com/gtag/js?id=G-ZNEWL0M5SB`} />

    <Script id="ganaltyics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNEWL0M5SB', {
            page_path: window.location.pathname,
            });
        `}
    </Script>
    <Head>
        <title>Welcome!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </>
  );
}
