import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Navigation from '../../components/Navigation'
import { getArticle, getArticleSlugs, Article, SITE_URL } from '../../lib/insights'

interface ArticlePageProps {
  post: Article
}

export default function ArticlePage({ post }: ArticlePageProps) {
  const postUrl = `${SITE_URL}/insights/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: postUrl,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Long Island Blockchain',
      url: SITE_URL,
    },
  }

  return (
    <>
      <Head>
        <title>{`${post.title} - Long Island Blockchain`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={postUrl} key="canonical" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="article:published_time" content={post.date} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-brand-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-hero-mesh"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/insights"
            className="inline-flex items-center text-brand-slate-400 hover:text-brand-cyan-400 text-sm font-medium mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Insights
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-brand-cyan-500/10 border border-brand-cyan-500/30 text-brand-cyan-400 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl text-white font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="text-brand-slate-300">
            {post.author} · {post.formattedDate} · {post.readingTime}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-slate lg:prose-lg max-w-none prose-headings:text-brand-slate-900 prose-a:text-brand-cyan-600 hover:prose-a:text-brand-cyan-700 prose-strong:text-brand-slate-900"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-slate-900 py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Put Our Infrastructure to Work
          </h2>
          <p className="text-xl text-brand-slate-300 mb-8 leading-relaxed">
            $100M+ staked, top 5% validator performance, and SOC-2 datacenter operations since 2016.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-brand-cyan-500 hover:bg-brand-cyan-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-glow"
            >
              Schedule a Consultation
            </Link>
            {post.cta && (
              <Link
                href={post.cta.href}
                className="px-8 py-4 border border-brand-slate-600 hover:border-brand-cyan-400 text-white text-lg font-semibold rounded-lg transition-all duration-300"
              >
                {post.cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  return { props: { post: getArticle(params!.slug as string) } }
}
