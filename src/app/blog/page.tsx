import { getPosts } from '@/utils/getPosts'
import type { Metadata } from 'next'
import { BlogGrid, BlogHero } from './_components'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artigos sobre algoritmos, estruturas de dados, carreira em tech e trabalho remoto internacional. Insights de quem saiu do Brasil e chegou ao topo na Europa.',
}

export default function BlogPage() {
  const posts = getPosts()

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  )
}
