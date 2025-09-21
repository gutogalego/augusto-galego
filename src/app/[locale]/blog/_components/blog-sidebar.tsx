'use client'

import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/get-posts'
import { useMemo } from 'react'

interface BlogSidebarProps {
  posts: PostMetadata[]
  selectedCategory?: string
  onCategorySelect?: (category: string) => void
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
    return 'IA'
  }

  if (
    title.includes('product') ||
    title.includes('produtividade') ||
    title.includes('productivity') ||
    description.includes('product')
  ) {
    return 'Produto'
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

export function BlogSidebar({
  posts,
  selectedCategory,
  onCategorySelect,
  className,
}: BlogSidebarProps) {
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()

    // Count all articles
    categoryMap.set('Todos os artigos', posts.length)

    // Count by category
    for (const post of posts) {
      const category = categorizePost(post)
      if (category !== 'Todos os artigos') {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      }
    }

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }))
  }, [posts])

  return (
    <aside className={cn('space-y-1', className)}>
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        Últimos artigos
      </h2>

      <nav className="space-y-1">
        {categories.map(({ name, count }) => {
          const isSelected = selectedCategory === name
          const isAllArticles = name === 'Todos os artigos'

          // Build className based on conditions
          let buttonClass =
            'flex items-center justify-between w-full text-left transition-all duration-200 group relative '

          // Base styles
          if (isAllArticles) {
            buttonClass += 'px-0 py-3 mb-4 '
          } else {
            buttonClass += 'px-3 py-2.5 rounded-lg '
          }

          // Selected state
          if (isSelected) {
            buttonClass += 'bg-background text-foreground '
          } else {
            buttonClass +=
              'text-muted-foreground hover:text-foreground hover:bg-background '
          }

          return (
            <button
              key={name}
              type="button"
              onClick={() => onCategorySelect?.(name)}
              className={buttonClass}
            >
              <span
                className={cn(
                  'font-medium transition-colors',
                  isAllArticles ? 'text-lg' : 'text-base'
                )}
              >
                {name}
              </span>

              <span className="text-sm text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                [{count}]
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
