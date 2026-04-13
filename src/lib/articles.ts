import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const articlesDirectory = path.join(process.cwd(), 'src/content/articles')

export interface ArticleMetadata {
  title: string
  description: string
  canonical: string
  date: string
  emoji: string
  tags: string[]
  excerpt: string
  slug: string
}

export interface Article extends ArticleMetadata {
  content: any
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    })

    return {
      slug,
      title: data.title,
      description: data.description,
      canonical: data.canonical,
      date: data.date,
      emoji: data.emoji,
      tags: data.tags || [],
      excerpt: data.excerpt,
      content: mdxContent,
    }
  } catch (error) {
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
      .filter((file) => file.endsWith('.mdx'))
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
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        canonical: data.canonical,
        date: data.date,
        emoji: data.emoji,
        tags: data.tags || [],
        excerpt: data.excerpt,
      }
    })
  )

  return articles.sort((a, b) => b.date.localeCompare(a.date))
}
