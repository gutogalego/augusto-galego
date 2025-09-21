import { getPosts } from '@/utils/get-posts'
import { BlogLayout } from './_components'

interface BlogPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const currentLang = (locale as 'en' | 'pt') || 'pt'
  const posts = getPosts(currentLang)

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <BlogLayout posts={posts} locale={currentLang} />
}
