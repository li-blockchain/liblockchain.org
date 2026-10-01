// Writes public/sitemap.xml. Runs before `next build`; the output is also
// committed so the file is correct even if the build command bypasses this.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SITE_URL = 'https://libc.fi' // keep in sync with lib/site.ts

const staticPages = [
  '/',
  '/institutional-staking',
  '/staking-vaults',
  '/eth-staking',
  '/community-wifi',
  '/insights',
  '/privacy',
]

// Only articles get their own page (see getArticleSlugs in lib/insights.ts);
// videos are listed on /insights.
const contentDir = path.join(process.cwd(), 'content', 'insights')
const articles = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => ({
    slug: file.replace(/\.md$/, ''),
    data: matter(fs.readFileSync(path.join(contentDir, file), 'utf8')).data,
  }))
  .filter(({ data }) => data.type !== 'video')
  .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))

const urls = [
  ...staticPages.map((p) => ({ loc: `${SITE_URL}${p}` })),
  ...articles.map(({ slug, data }) => ({
    loc: `${SITE_URL}/insights/${slug}`,
    lastmod: data.date,
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod }) =>
    `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} URLs`)
