import fs from 'node:fs'
import path from 'node:path'
import type { PostMetadata } from '@/utils/getPosts'
import { marked } from 'marked'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostLayout } from './_components'

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

  return {
    title: `${metadata.title} | Augusto Galego`,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
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
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </BlogPostLayout>
  )
}
