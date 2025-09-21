import { getPosts } from '@/utils/getPosts'
import { BlogClient } from './blog-client'

export default function BlogPage() {
  const posts = getPosts()

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <BlogClient posts={posts} />
}
