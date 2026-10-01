// Canonical origin. Legacy domains (liblockchain.xyz/.org) 301 here via netlify.toml.
export const SITE_URL = 'https://libc.fi'
export const SITE_NAME = 'Long Island Blockchain'

// 1200x630 link-preview card. Source: scripts/og-card.html.
export const OG_IMAGE = {
  url: `${SITE_URL}/og-card.jpg`,
  width: 1200,
  height: 630,
  alt: 'Long Island Blockchain — Ethereum validator infrastructure',
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`

// Region-level location only: no street address is published.
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: 'LIBC',
  legalName: 'LI Blockchain LLC',
  url: SITE_URL,
  logo: `${SITE_URL}/libc-logo.png`,
  image: OG_IMAGE.url,
  foundingDate: '2016',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'Place', name: 'Long Island, New York' },
  sameAs: [
    'https://www.youtube.com/c/LongIslandBlockchain',
    'https://x.com/0xlibc',
    'https://github.com/li-blockchain',
  ],
}

export function serviceJsonLd({ name, description, path, serviceType }: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
