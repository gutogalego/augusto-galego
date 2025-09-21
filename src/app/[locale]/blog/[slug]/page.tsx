import fs from 'node:fs'
import path from 'node:path'
import type { MultilingualText, PostMetadata } from '@/utils/get-posts'
import { marked } from 'marked'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostLayout } from './_components'

function getLocalizedText(
  text: MultilingualText | string,
  language: 'en' | 'pt' = 'pt'
): string {
  if (typeof text === 'string') {
    return text
  }
  return text[language] || text.en || text.pt
}

function getLocalizedArray(
  arr: MultilingualText[] | string[] | undefined,
  language: 'en' | 'pt' = 'pt'
): string[] {
  if (!arr) {
    return []
  }
  return arr.map((item) => getLocalizedText(item, language))
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

function getPostContent(slug: string) {
  try {
    const postsDirectory = path.join(process.cwd(), 'data/posts')
    const postDirectory = path.join(postsDirectory, slug)

    // Check if post directory exists
    if (!fs.existsSync(postDirectory)) {
      return null
    }

    // Read metadata
    const metadataPath = path.join(postDirectory, 'metadata.json')
    if (!fs.existsSync(metadataPath)) {
      return null
    }

    const metadata: PostMetadata = JSON.parse(
      fs.readFileSync(metadataPath, 'utf8')
    )

    // Read content files
    const enPath = path.join(postDirectory, 'en.mdx')
    const ptPath = path.join(postDirectory, 'pt.mdx')

    let enContent = ''
    let ptContent = ''

    if (fs.existsSync(enPath)) {
      enContent = fs.readFileSync(enPath, 'utf8')
    }

    if (fs.existsSync(ptPath)) {
      ptContent = fs.readFileSync(ptPath, 'utf8')
    }

    return {
      metadata,
      enContent,
      ptContent,
    }
  } catch (_error) {
    return null
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const postData = await getPostContent(slug)

  if (!postData) {
    return {
      title: 'Post não encontrado',
      description: 'Este post não foi encontrado.',
    }
  }

  const { metadata } = postData
  const currentLang = metadata.language || 'pt'

  const title = getLocalizedText(metadata.title, currentLang)
  const description = getLocalizedText(metadata.description, currentLang)
  const excerpt = metadata.excerpt
    ? getLocalizedText(metadata.excerpt, currentLang)
    : undefined
  const tags = getLocalizedArray(metadata.tags, currentLang)
  const keywords = getLocalizedArray(metadata.keywords, currentLang)

  return {
    title: `${title} - Blog`,
    description: excerpt || description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: metadata.canonicalUrl,
    },
    openGraph: {
      title: title,
      description: excerpt || description,
      type: 'article',
      publishedTime: metadata.date,
      modifiedTime: metadata.lastModified || metadata.date,
      tags: tags,
      locale: currentLang === 'pt' ? 'pt-BR' : 'en-US',
      images: metadata.image ? [{ url: metadata.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt || description,
      images: metadata.image ? [metadata.image] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'data/posts')

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const postFolders = fs.readdirSync(postsDirectory)

  return postFolders
    .filter((folder) => {
      const folderPath = path.join(postsDirectory, folder)
      return fs.statSync(folderPath).isDirectory()
    })
    .map((folder) => ({
      slug: folder,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const postData = await getPostContent(slug)

  if (!postData) {
    notFound()
  }

  const { metadata, enContent, ptContent } = postData

  // Process markdown content
  const content = ptContent || enContent
  const htmlContent = marked(content)

  return (
    <BlogPostLayout metadata={metadata}>
      <article
        className="prose-elegant"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe MDX content processed by marked
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </BlogPostLayout>
  )
}
