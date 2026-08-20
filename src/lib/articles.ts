import React, { type ReactNode } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const articlesDirectory = path.join(process.cwd(), 'src/content/articles')
const articleExtension = '.mdx'

export interface ArticleMetadata {
  title: string
  description: string
  canonical: string
  date: string
  dateModified?: string
  emoji: string
  tags: string[]
  excerpt: string
  slug: string
  faq?: Array<{ q: string; a: string }>
  wordCount: number
}

export interface Article extends ArticleMetadata {
  content: ReactNode
  rawContent?: string
}

function normalizeFaq(value: unknown): Array<{ q: string; a: string }> | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const faq = value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null
      }

      const q = 'q' in item && typeof item.q === 'string' ? item.q.trim() : ''
      const a = 'a' in item && typeof item.a === 'string' ? item.a.trim() : ''
      return q && a ? { q, a } : null
    })
    .filter((item): item is { q: string; a: string } => item !== null)

  return faq.length > 0 ? faq : undefined
}

function estimateWordCount(markdown: string): number {
  const plainText = markdown
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-\n\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plainText) {
    return 0
  }

  const cjkCount = (plainText.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length
  const latinWordCount = plainText
    .replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length

  return cjkCount + latinWordCount
}

function getArticlePath(slug: string): string {
  return path.join(articlesDirectory, `${slug}${articleExtension}`)
}

export function hasArticleSourceFile(slug: string): boolean {
  try {
    return fs.existsSync(getArticlePath(slug))
  } catch {
    return false
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = getArticlePath(slug)
    if (!hasArticleSourceFile(slug)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
      components: {
        a: (props: React.ComponentPropsWithoutRef<'a'>) => {
          const href = props?.href || ''
          const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')
          if (isExternal) {
            return React.createElement('a', {
              ...props,
              target: '_blank',
              rel: 'noopener noreferrer',
            })
          }
          return React.createElement('a', props)
        },
      },
    })

    return {
      slug,
      title: data.title,
      description: data.description,
      canonical: data.canonical,
      date: data.date,
      dateModified: data.dateModified || data.date,
      emoji: data.emoji,
      tags: data.tags || [],
      excerpt: data.excerpt,
      faq: normalizeFaq(data.faq),
      wordCount: estimateWordCount(content),
      content: mdxContent,
      rawContent: content,
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return null
    }
    console.error(`Error loading article ${slug}:`, error)
    return null
  }
}

export function getAllArticleSlugs(): string[] {
  try {
    // Check if directory exists first
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }
    const files = fs.readdirSync(articlesDirectory)
    return files
      .filter((file) => file.endsWith(articleExtension))
      .map((file) => file.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading articles directory:', error)
    return []
  }
}

export async function getAllArticles(): Promise<ArticleMetadata[]> {
  const slugs = getAllArticleSlugs()
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        canonical: data.canonical,
        date: data.date,
        dateModified: data.dateModified || data.date,
        emoji: data.emoji,
        tags: data.tags || [],
        excerpt: data.excerpt,
        faq: normalizeFaq(data.faq),
        wordCount: estimateWordCount(content),
      }
    })
  )

  return articles.sort((a, b) => b.date.localeCompare(a.date))
}
