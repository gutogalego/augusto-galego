'use client'

import {
  filterPostsByCategory,
  filterPostsByQuery,
  getAllCategoriesText,
} from '@/lib/blog-utils'
import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/get-posts'
import { useLocale } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { ArticleList } from './article-list'
import { BlogHero } from './blog-hero'
import { BlogSidebar } from './blog-sidebar'

interface BlogLayoutProps {
  posts: PostMetadata[]
  locale?: 'en' | 'pt'
  className?: string
  variant?: 'default' | 'grid'
}

export function BlogLayout({
  posts,
  locale: propLocale,
  className,
  variant = 'default',
}: BlogLayoutProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(
    getAllCategoriesText(locale)
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query first
    if (searchQuery.trim()) {
      filtered = filterPostsByQuery(filtered, searchQuery, locale)
    }

    // Then filter by category
    filtered = filterPostsByCategory(filtered, selectedCategory, locale)

    return filtered
  }, [posts, selectedCategory, searchQuery, locale])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('') // Clear search when selecting category
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setSelectedCategory(getAllCategoriesText(locale)) // Reset to all articles when searching
    }
  }

  if (!isMounted) {
    return (
      <div className={cn('min-h-screen bg-background', className)}>
        <div className="animate-pulse">
          {/* Hero Skeleton */}
          <div className="h-64 bg-muted/20" />

          {/* Main Content Skeleton */}
          <div className="max-w-6xl mx-auto border-2 border-b-0 border-dotted border-border/40">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
              {/* Sidebar Skeleton */}
              <div className="px-8 py-12 bg-muted/20 border-r-2 border-dotted border-border/40">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>

              {/* Articles Skeleton */}
              <div className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-3/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-3/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-3/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Hero Section with Search */}
      <BlogHero posts={posts} onSearch={handleSearch} locale={locale} />

      {/* Main Content with original styling */}
      <div className="max-w-6xl mx-auto border-2 border-b-0 border-dotted border-border/40">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
          {/* Sidebar */}
          <div className="px-8 py-12 bg-muted/20 border-r-2 border-dotted border-border/40">
            <div className="sticky top-8">
              <BlogSidebar
                posts={posts}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                locale={locale}
              />
            </div>
          </div>

          {/* Articles */}
          <div>
            {searchQuery && (
              <div className="mb-8 px-8">
                <p className="text-sm text-muted-foreground">
                  {locale === 'pt'
                    ? `${filteredPosts.length} resultado(s) para "${searchQuery}"`
                    : `${filteredPosts.length} result(s) for "${searchQuery}"`}
                </p>
              </div>
            )}

            <ArticleList
              posts={filteredPosts}
              variant={variant}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
