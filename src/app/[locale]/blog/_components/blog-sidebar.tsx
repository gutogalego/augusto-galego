'use client'

import { getCategoryCounts } from '@/lib/blog-utils'
import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/get-posts'
import { useLocale } from 'next-intl'
import { useMemo } from 'react'
import { CategoryIcon } from './category-icon'

interface BlogSidebarProps {
  posts: PostMetadata[]
  selectedCategory?: string
  onCategorySelect?: (category: string) => void
  className?: string
  locale?: 'en' | 'pt'
}

export function BlogSidebar({
  posts,
  selectedCategory,
  onCategorySelect,
  className,
  locale: propLocale,
}: BlogSidebarProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale

  const categories = useMemo(() => {
    return getCategoryCounts(posts, locale)
  }, [posts, locale])

  return (
    <aside className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-6">
          {locale === 'pt' ? 'Categorias' : 'Categories'}
        </h2>

        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategorySelect?.(category.name)}
              className={cn(
                'w-full flex items-center justify-between py-2 px-0 text-left transition-colors group',
                selectedCategory === category.name
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="text-base">{category.name}</span>
              <span
                className={cn(
                  'text-sm font-medium',
                  selectedCategory === category.name
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/60 group-hover:text-muted-foreground'
                )}
              >
                [{category.count}]
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
