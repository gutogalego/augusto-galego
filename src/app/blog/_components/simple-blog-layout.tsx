'use client'

import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/getPosts'
import { useMemo, useState } from 'react'
import { BlogSidebar } from './blog-sidebar'
import { SimpleArticleList } from './simple-article-list'
import { SimpleBlogHeader } from './simple-blog-header'

interface SimpleBlogLayoutProps {
  posts: PostMetadata[]
  className?: string
}

const categorizePost = (post: PostMetadata): string => {
  const title = post.title.toLowerCase()
  const description = post.description?.toLowerCase() || ''

  if (
    title.includes('ai') ||
    title.includes('artificial intelligence') ||
    title.includes('machine learning') ||
    description.includes('ai') ||
    description.includes('artificial intelligence')
  ) {
    return 'AI'
  }

  if (
    title.includes('product') ||
    title.includes('produtividade') ||
    title.includes('productivity') ||
    description.includes('product')
  ) {
    return 'Product'
  }

  if (
    title.includes('web') ||
    title.includes('javascript') ||
    title.includes('react') ||
    title.includes('frontend') ||
    description.includes('web')
  ) {
    return 'Web'
  }

  return 'Todos os artigos'
}

export function SimpleBlogLayout({ posts, className }: SimpleBlogLayoutProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Todos os artigos')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    // Reorder by category (kanban style) - selected category comes first
    if (selectedCategory !== 'Todos os artigos') {
      const selectedCategoryPosts = filtered.filter((post) => {
        const category = categorizePost(post)
        return category === selectedCategory
      })

      const otherPosts = filtered.filter((post) => {
        const category = categorizePost(post)
        return category !== selectedCategory
      })

      // Return selected category posts first, then others
      return [...selectedCategoryPosts, ...otherPosts]
    }

    return filtered
  }, [posts, selectedCategory, searchQuery])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('') // Clear search when selecting category
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setSelectedCategory('Todos os artigos') // Reset category when searching
    }
  }

  return (
    <div className={cn('min-h-screen', className)}>
      {/* Header with search */}
      <SimpleBlogHeader posts={posts} onSearch={handleSearch} />

      {/* Main container with dotted borders */}
      <div className="max-w-6xl mx-auto border-x-2 border-dotted border-border/40">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3 border-r border-dotted border-border/40 bg-background">
            <div className="sticky top-0 p-8 lg:p-12">
              <BlogSidebar
                posts={posts}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 lg:col-span-9 bg-background">
            <SimpleArticleList posts={filteredPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}
