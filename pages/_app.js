import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Script strategy="lazyOnload" id="gtags" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

<Script id="ganaltyics" strategy="lazyOnload">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
</Script>


<Head>
    <title>Welcome!</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
</Head>
    <Component {...pageProps} />
  </>
  );
}

export default MyApp
