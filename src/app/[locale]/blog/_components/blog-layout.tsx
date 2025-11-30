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
          {/* Hero Skeleton - estrutura exata do BlogHero */}
          <div className="bg-background">
            <div
              className="max-w-6xl mx-auto px-8 py-24 border-x-2 border-dotted border-border/40"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, hsl(var(--background)) 0%, transparent 70%),
                  linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 60px 60px, 60px 60px',
              }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Header skeleton */}
                <div className="space-y-4 mb-8">
                  {/* Badge skeleton */}
                  <div className="inline-block">
                    <div className="h-4 bg-muted rounded w-40" />
                  </div>

                  {/* Title skeleton */}
                  <div className="h-12 lg:h-14 bg-muted rounded w-80" />

                  {/* Subtitle skeleton */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="h-5 bg-muted rounded w-full" />
                    <div className="h-5 bg-muted rounded w-4/5" />
                  </div>
                </div>

                {/* Search skeleton */}
                <div className="max-w-lg">
                  <div className="h-12 bg-muted rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton - mesma estrutura do layout real */}
          <div className="max-w-6xl mx-auto border-2 border-b-0 border-dotted border-border/40">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
              {/* Sidebar Skeleton - mesma estrutura do BlogSidebar */}
              <div className="px-8 py-12 bg-muted/20 border-r-2 border-dotted border-border/40">
                <div className="sticky top-8 space-y-8">
                  {/* Categories skeleton */}
                  <div className="space-y-4">
                    <div className="h-5 bg-muted rounded w-24" />
                    <div className="space-y-2">
                      <div className="h-8 bg-muted rounded" />
                      <div className="h-8 bg-muted rounded w-4/5" />
                      <div className="h-8 bg-muted rounded w-3/5" />
                      <div className="h-8 bg-muted rounded w-2/3" />
                    </div>
                  </div>

                  {/* Stats skeleton */}
                  <div className="space-y-4">
                    <div className="h-5 bg-muted rounded w-20" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles Skeleton - mesma estrutura dos ArticleCards */}
              <div>
                {/* Article cards skeleton */}
                <div className="border-t-2 border-dashed border-border/40">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={`article-skeleton-${i}`}
                      className="border-b-2 border-dashed border-border/40"
                    >
                      <div className="flex items-start justify-between gap-4 py-6 px-8">
                        <div className="flex-1 space-y-2">
                          {/* Date and arrow skeleton */}
                          <div className="flex items-center justify-between">
                            <div className="h-4 bg-muted rounded w-24" />
                            <div className="h-4 w-4 bg-muted rounded" />
                          </div>

                          {/* Title skeleton */}
                          <div className="h-6 bg-muted rounded w-4/5" />

                          {/* Description skeleton */}
                          <div className="space-y-1">
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-3/4" />
                          </div>

                          {/* Tags skeleton */}
                          <div className="flex gap-1 pt-1">
                            <div className="h-6 bg-muted rounded w-16" />
                            <div className="h-6 bg-muted rounded w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
