import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import type { GetStaticProps } from 'next'
import Navigation from '../../components/Navigation'
import VideoEmbed from '../../components/VideoEmbed'
import { getAllEntries, EntryMeta, SITE_URL } from '../../lib/insights'

type Filter = 'all' | 'article' | 'video'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'article', label: 'Articles' },
  { key: 'video', label: 'Videos' },
]

function EntryChips({ entry }: { entry: EntryMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span
        className={`px-3 py-1 rounded-full font-medium ${
          entry.type === 'video'
            ? 'bg-brand-purple-50 border border-brand-purple-200 text-brand-purple-700'
            : 'bg-brand-slate-100 border border-brand-slate-200 text-brand-slate-700'
        }`}
      >
        {entry.type === 'video' ? 'Video' : 'Article'}
      </span>
      {entry.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full bg-brand-cyan-50 border border-brand-cyan-200 text-brand-cyan-700 font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// Dark branded title panel so article cards hold the same visual weight
// as video thumbnails in the grid.
function ArticlePanel({ entry }: { entry: EntryMeta }) {
  return (
    <Link
      href={`/insights/${entry.slug}`}
      className="group relative block aspect-video rounded-lg overflow-hidden bg-brand-slate-900"
    >
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-hero-mesh"></div>
      <div className="relative h-full flex flex-col justify-between p-6">
        <span className="text-brand-cyan-400 text-xs font-semibold uppercase tracking-wider">
          {entry.tags[0] ?? 'Article'}
        </span>
        <h3 className="text-white text-xl lg:text-2xl font-bold leading-snug group-hover:text-brand-cyan-300 transition-colors">
          {entry.title}
        </h3>
      </div>
    </Link>
  )
}

function FeaturedCard({ entry }: { entry: EntryMeta }) {
  return (
    <article className="bg-white rounded-xl p-8 border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {entry.type === 'video' && entry.youtubeId ? (
          <VideoEmbed youtubeId={entry.youtubeId} title={entry.title} duration={entry.duration} />
        ) : (
          <ArticlePanel entry={entry} />
        )}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-brand-cyan-500 text-white font-semibold">
              Latest
            </span>
            <EntryChips entry={entry} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-slate-900 mb-3">
            {entry.type === 'article' ? (
              <Link
                href={`/insights/${entry.slug}`}
                className="hover:text-brand-cyan-600 transition-colors"
              >
                {entry.title}
              </Link>
            ) : (
              entry.title
            )}
          </h2>
          <p className="text-brand-slate-600 leading-relaxed mb-4">{entry.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-slate-500">
              {entry.formattedDate}
              {entry.readingTime ? ` · ${entry.readingTime}` : ''}
            </span>
            {entry.type === 'article' && (
              <Link
                href={`/insights/${entry.slug}`}
                className="inline-flex items-center text-brand-cyan-600 hover:text-brand-cyan-700 font-semibold transition-colors"
              >
                Read more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function GridCard({ entry }: { entry: EntryMeta }) {
  return (
    <article className="flex flex-col bg-white rounded-xl p-6 border border-brand-slate-200 hover:border-brand-cyan-300 hover:shadow-lg transition-all duration-300">
      <div className="mb-5">
        {entry.type === 'video' && entry.youtubeId ? (
          <VideoEmbed youtubeId={entry.youtubeId} title={entry.title} duration={entry.duration} />
        ) : (
          <ArticlePanel entry={entry} />
        )}
      </div>

      <div className="mb-3">
        <EntryChips entry={entry} />
      </div>

      <h2 className="text-xl font-bold text-brand-slate-900 mb-2">
        {entry.type === 'article' ? (
          <Link
            href={`/insights/${entry.slug}`}
            className="hover:text-brand-cyan-600 transition-colors"
          >
            {entry.title}
          </Link>
        ) : (
          entry.title
        )}
      </h2>

      <p className="text-brand-slate-600 leading-relaxed mb-4 flex-grow">{entry.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm text-brand-slate-500">
          {entry.formattedDate}
          {entry.readingTime ? ` · ${entry.readingTime}` : ''}
        </span>
        {entry.type === 'article' && (
          <Link
            href={`/insights/${entry.slug}`}
            className="inline-flex items-center text-brand-cyan-600 hover:text-brand-cyan-700 font-semibold text-sm transition-colors"
          >
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  )
}

interface InsightsIndexProps {
  entries: EntryMeta[]
}

export default function InsightsIndex({ entries }: InsightsIndexProps) {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = entries.filter((entry) => filter === 'all' || entry.type === filter)
  const [featured, ...rest] = visible

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: entries
      .filter((entry) => entry.type === 'video' && entry.youtubeId)
      .map((entry, index) => ({
        '@type': 'VideoObject',
        position: index + 1,
        name: entry.title,
        description: entry.description,
        uploadDate: entry.date,
        thumbnailUrl: `https://i.ytimg.com/vi/${entry.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${entry.youtubeId}`,
      })),
  }

  return (
    <>
      <Head>
        <title>Insights - Long Island Blockchain</title>
        <meta
          name="description"
          content="Articles and videos on Ethereum staking, Lido v3 stVaults, validator operations, and crypto custody from the Long Island Blockchain team."
        />
        <link rel="canonical" href={`${SITE_URL}/insights`} key="canonical" />
        <meta property="og:title" content="Insights - Long Island Blockchain" />
        <meta
          property="og:description"
          content="Articles and videos on Ethereum staking, Lido v3 stVaults, validator operations, and crypto custody."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/insights`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-brand-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-hero-mesh"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-cyan-500/10 border border-brand-cyan-500/30 text-brand-cyan-400 text-sm font-medium mb-8">
              Articles, Videos &amp; Engineering Notes
            </div>

            <h1 className="text-5xl lg:text-6xl text-white font-bold tracking-tight mb-6">
              LIBC <span className="text-brand-cyan-400">Insights</span>
            </h1>

            <p className="text-xl text-brand-slate-300 leading-relaxed">
              Field notes from building on blockchain since 2016 — stVaults and Lido v3,
              validator operations, custody, and the evolving Ethereum protocol.
            </p>
          </div>
        </div>
      </div>

      {/* Entries */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-10">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  filter === key
                    ? 'bg-brand-cyan-500 text-white'
                    : 'bg-brand-slate-100 text-brand-slate-600 hover:bg-brand-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {featured && (
            <div className="mb-8">
              <FeaturedCard entry={featured} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rest.map((entry) => (
              <GridCard key={entry.slug} entry={entry} />
            ))}
          </div>

          {/* Channel link */}
          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/c/LongIslandBlockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand-slate-600 hover:text-brand-cyan-600 font-medium transition-colors"
            >
              More videos on our YouTube channel
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Have Questions About Staking?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Our team has been operating Ethereum validators since 2020. Let&apos;s talk about your
            staking strategy.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-brand-cyan-600 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<InsightsIndexProps> = async () => {
  return { props: { entries: getAllEntries() } }
}
