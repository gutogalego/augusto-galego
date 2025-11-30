import { cn } from '@/lib/shadcn'
import React from 'react'

export interface HighlightTextProps {
  text: string
  query: string
  className?: string
  highlightClassName?: string
  caseSensitive?: boolean
}

/**
 * Highlights search terms within text with customizable styling
 */
export function HighlightText({
  text,
  query,
  className,
  highlightClassName,
  caseSensitive = false,
}: HighlightTextProps) {
  if (!query) {
    return <span className={className}>{text}</span>
  }

  if (!text) {
    return <span className={className}>{text}</span>
  }

  const searchTerms = query
    .trim()
    .split(/\s+/)
    .filter((term) => term.length > 0)

  if (searchTerms.length === 0) {
    return <span className={className}>{text}</span>
  }

  // Create regex pattern for all search terms
  const pattern = searchTerms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')

  const regex = new RegExp(`(${pattern})`, caseSensitive ? 'g' : 'gi')

  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isHighlight = searchTerms.some((term) =>
          caseSensitive
            ? part === term
            : part.toLowerCase() === term.toLowerCase()
        )

        return isHighlight ? (
          <mark
            key={`highlight-${index}-${part}`}
            className={cn(
              'bg-yellow-200 text-yellow-900 px-0.5 py-0 rounded-sm font-medium',
              'dark:bg-yellow-400/20 dark:text-yellow-200',
              highlightClassName
            )}
          >
            {part}
          </mark>
        ) : (
          <span key={`text-${index}-${part}`}>{part}</span>
        )
      })}
    </span>
  )
}

/**
 * Calculate relevance score for search results
 */
export function calculateRelevance(
  item: {
    title: string
    description?: string
    category?: string
    tags?: string[]
  },
  query: string
): number {
  if (!query.trim()) {
    return 0
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/)
  let score = 0

  for (const term of searchTerms) {
    // Title matches get highest score
    if (item.title.toLowerCase().includes(term)) {
      score += item.title.toLowerCase() === term ? 100 : 50
    }

    // Category matches get medium-high score
    if (item.category?.toLowerCase().includes(term)) {
      score += item.category.toLowerCase() === term ? 40 : 20
    }

    // Description matches get medium score
    if (item.description?.toLowerCase().includes(term)) {
      score += 15
    }

    // Tag matches get lower score
    if (item.tags?.some((tag) => tag.toLowerCase().includes(term))) {
      score += 10
    }

    // Exact word boundary matches get bonus
    const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'i')
    if (wordBoundaryRegex.test(item.title)) {
      score += 25
    }
    if (wordBoundaryRegex.test(item.description || '')) {
      score += 10
    }
  }

  return score
}

/**
 * Enhanced search function with fuzzy matching and relevance scoring
 */
export function enhancedSearch<
  T extends {
    title: string
    description?: string
    category?: string
    tags?: string[]
  },
>(
  items: T[],
  query: string,
  options: {
    maxResults?: number
    minScore?: number
    fuzzyThreshold?: number
  } = {}
): T[] {
  const { maxResults = 10, minScore = 5, fuzzyThreshold = 0.6 } = options

  if (!query.trim()) {
    return []
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/)

  // Score and filter items
  const scoredItems = items
    .map((item) => ({
      item,
      score: calculateRelevance(item, query),
      fuzzyScore: calculateFuzzyScore(item, searchTerms, fuzzyThreshold),
    }))
    .filter(
      ({ score, fuzzyScore }) =>
        score >= minScore || fuzzyScore > fuzzyThreshold
    )
    .sort((a, b) => {
      // Primary sort by exact score
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // Secondary sort by fuzzy score
      return b.fuzzyScore - a.fuzzyScore
    })

  return scoredItems.slice(0, maxResults).map(({ item }) => item)
}

/**
 * Calculate fuzzy matching score using Levenshtein distance
 */
function calculateFuzzyScore(
  item: {
    title: string
    description?: string
    category?: string
    tags?: string[]
  },
  searchTerms: string[],
  threshold: number
): number {
  let maxScore = 0

  const allText = [
    item.title,
    item.description || '',
    item.category || '',
    ...(item.tags || []),
  ]
    .join(' ')
    .toLowerCase()

  for (const term of searchTerms) {
    const words = allText.split(/\s+/)
    for (const word of words) {
      const similarity = calculateSimilarity(term, word)
      if (similarity > threshold) {
        maxScore = Math.max(maxScore, similarity)
      }
    }
  }

  return maxScore
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length
  const len2 = str2.length

  if (len1 === 0) {
    return len2 === 0 ? 1 : 0
  }
  if (len2 === 0) {
    return 0
  }

  const matrix: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0))

  for (let i = 0; i <= len1; i++) {
    const row = matrix[i]
    if (row) {
      row[0] = i
    }
  }
  for (let j = 0; j <= len2; j++) {
    const row = matrix[0]
    if (row) {
      row[j] = j
    }
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      const currentRow = matrix[i]
      const prevRow = matrix[i - 1]

      if (currentRow && prevRow) {
        const currentCell = currentRow[j - 1] || 0
        const topCell = prevRow[j] || 0
        const diagonalCell = prevRow[j - 1] || 0

        currentRow[j] = Math.min(
          topCell + 1,
          currentCell + 1,
          diagonalCell + cost
        )
      }
    }
  }

  const maxLen = Math.max(len1, len2)
  const finalRow = matrix[len1]
  const finalCell = finalRow?.[len2] || 0
  return (maxLen - finalCell) / maxLen
}
