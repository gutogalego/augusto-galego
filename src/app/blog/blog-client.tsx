'use client'

import type { PostMetadata } from '@/utils/getPosts'
import { SimpleBlogLayout } from './_components'

interface BlogClientProps {
  posts: PostMetadata[]
}

export function BlogClient({ posts }: BlogClientProps) {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return <SimpleBlogLayout posts={sortedPosts} />
}
