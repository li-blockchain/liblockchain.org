import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import Head from 'next/head'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from '../lib/wagmi'
import { SITE_NAME, OG_IMAGE } from '../lib/site'

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
        <title>{SITE_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:image" content={OG_IMAGE.url} key="og:image" />
        <meta property="og:image:width" content={String(OG_IMAGE.width)} key="og:image:width" />
        <meta property="og:image:height" content={String(OG_IMAGE.height)} key="og:image:height" />
        <meta property="og:image:alt" content={OG_IMAGE.alt} key="og:image:alt" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@0xlibc" />
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
