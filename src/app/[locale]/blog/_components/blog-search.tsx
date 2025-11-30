'use client'

import { AdaptiveSearch } from '@/components/ui/adaptive-search'
import type { SearchResult } from '@/components/ui/search'
import {
  categorizePost,
  generatePostTags,
  getLocalizedText,
} from '@/lib/blog-utils'
import type { PostMetadata } from '@/utils/get-posts'
import { useLocale } from 'next-intl'
import { CategoryIcon } from './category-icon'

const postsToSearchResults = (
  posts: PostMetadata[],
  locale: 'en' | 'pt' = 'pt'
): SearchResult[] => {
  return posts.map((post) => {
    const category = categorizePost(post, locale)
    const tags = generatePostTags(post, locale)
    const title = getLocalizedText(post.title, locale)
    const description = getLocalizedText(post.description, locale)

    return {
      id: post.url || title,
      title,
      description,
      category,
      tags,
      url: `/blog/${post.url}`,
      icon: <CategoryIcon category={category} />,
    }
  })
}

interface BlogSearchProps {
  posts: PostMetadata[]
  onSearch?: (query: string, results: SearchResult[]) => void
  onResultSelect?: (result: SearchResult) => void
  onFilterByCategory?: (category: string) => void
  className?: string
  locale?: 'en' | 'pt'
}

export function BlogSearch({
  posts,
  onSearch,
  onResultSelect,
  className,
  locale: propLocale,
}: BlogSearchProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale
  const searchData = postsToSearchResults(posts, locale)

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect?.(result)

    // Navegar para o post
    if (result.url) {
      window.location.href = result.url
    }
  }

  const handleSearch = (query: string, results: SearchResult[]) => {
    onSearch?.(query, results)
  }

  const placeholder =
    locale === 'pt'
      ? 'Buscar artigos sobre algoritmos, carreira, tech...'
      : 'Search articles about algorithms, career, tech...'

  return (
    <AdaptiveSearch
      data={searchData}
      placeholder={placeholder}
      maxResults={8}
      searchDelay={250}
      onSearch={handleSearch}
      onResultSelect={handleResultSelect}
      enableFuzzySearch={true}
      className={className}
    />
  )
}

export { categorizePost, generatePostTags }
