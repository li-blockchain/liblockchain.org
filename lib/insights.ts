import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export const SITE_URL = 'https://libc.fi'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'insights')

export type EntryType = 'article' | 'video'

export interface EntryCta {
  label: string
  href: string
}

export interface EntryMeta {
  slug: string
  type: EntryType
  title: string
  description: string
  date: string
  formattedDate: string
  author: string
  tags: string[]
  readingTime: string | null
  youtubeId: string | null
  duration: string | null
  cta: EntryCta | null
}

export interface Article extends EntryMeta {
  html: string
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

function getSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

function readEntryFile(slug: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), 'utf8')
  return matter(raw)
}

function toMeta(slug: string, data: Record<string, any>, content: string): EntryMeta {
  const type: EntryType = data.type === 'video' ? 'video' : 'article'
  return {
    slug,
    type,
    title: data.title,
    description: data.description,
    date: data.date,
    formattedDate: formatDate(data.date),
    author: data.author ?? 'Long Island Blockchain',
    tags: data.tags ?? [],
    readingTime: type === 'article' ? estimateReadingTime(content) : null,
    youtubeId: data.youtubeId ?? null,
    duration: data.duration ?? null,
    cta: data.cta ?? null,
  }
}

export function getAllEntries(): EntryMeta[] {
  return getSlugs()
    .map((slug) => {
      const { data, content } = readEntryFile(slug)
      return toMeta(slug, data, content)
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleSlugs(): string[] {
  return getAllEntries()
    .filter((entry) => entry.type === 'article')
    .map((entry) => entry.slug)
}

export function getArticle(slug: string): Article {
  const { data, content } = readEntryFile(slug)
  return {
    ...toMeta(slug, data, content),
    html: marked.parse(content, { async: false }) as string,
  }
}
