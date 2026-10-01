import Head from 'next/head'
import { SITE_URL, SITE_NAME } from '../lib/site'

// Title, description, canonical and social tags for a marketing page.
// `path` is the route ('' for the homepage); keys dedupe against _app defaults.
export default function PageMeta({ title, description, path = '' }) {
  const url = `${SITE_URL}${path}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={url} key="canonical" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={url} key="og:url" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
    </Head>
  )
}
