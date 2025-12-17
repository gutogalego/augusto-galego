import type { MultilingualText, PostMetadata } from '@/utils/get-posts'

export function getCategoryColors(tag: string): {
  bg: string
  text: string
} {
  const normalizedTag = tag.toLowerCase()

  if (
    normalizedTag.includes('carreira') ||
    normalizedTag.includes('career') ||
    normalizedTag.includes('mindset') ||
    normalizedTag.includes('filosofia') ||
    normalizedTag.includes('philosophy') ||
    normalizedTag.includes('reflexões') ||
    normalizedTag.includes('reflections')
  ) {
    return {
      bg: 'bg-purple-100 dark:bg-purple-950',
      text: 'text-purple-700 dark:text-purple-300',
    }
  }

  if (
    normalizedTag.includes('algoritmo') ||
    normalizedTag.includes('algorithm') ||
    normalizedTag.includes('leetcode') ||
    normalizedTag.includes('complexidade') ||
    normalizedTag.includes('complexity') ||
    normalizedTag.includes('big o')
  ) {
    return {
      bg: 'bg-blue-100 dark:bg-blue-950',
      text: 'text-blue-700 dark:text-blue-300',
    }
  }

  if (
    normalizedTag.includes('system design') ||
    normalizedTag.includes('infraestrutura') ||
    normalizedTag.includes('infrastructure') ||
    normalizedTag.includes('networking') ||
    normalizedTag.includes('load balancer') ||
    normalizedTag.includes('dns')
  ) {
    return {
      bg: 'bg-green-100 dark:bg-green-950',
      text: 'text-green-700 dark:text-green-300',
    }
  }

  if (
    normalizedTag.includes('produtividade') ||
    normalizedTag.includes('productivity') ||
    normalizedTag.includes('setup')
  ) {
    return {
      bg: 'bg-amber-100 dark:bg-amber-950',
      text: 'text-amber-700 dark:text-amber-300',
    }
  }

  return {
    bg: 'bg-gray-100 dark:bg-gray-950',
    text: 'text-gray-700 dark:text-gray-300',
  }
}

/**
 * Utility function to get localized text from multilingual objects
 */
export function getLocalizedText(
  text: MultilingualText | string,
  language: 'en' | 'pt' = 'pt'
): string {
  if (typeof text === 'string') {
    return text
  }
  return text[language] || text.en || text.pt
}

/**
 * Utility function to get localized array from multilingual arrays
 */
export function getLocalizedArray(
  arr: MultilingualText[] | string[] | undefined,
  language: 'en' | 'pt' = 'pt'
): string[] {
  if (!arr) {
    return []
  }
  return arr.map((item) => getLocalizedText(item, language))
}

/**
 * Categorize posts based on content with i18n support
 */
export function categorizePost(
  post: PostMetadata,
  locale: 'en' | 'pt' = 'pt'
): string {
  const title = getLocalizedText(post.title, locale).toLowerCase()
  const description = getLocalizedText(post.description, locale).toLowerCase()

  // Check if there's already a category defined in metadata
  if (post.category) {
    return getLocalizedText(post.category, locale)
  }

  // Categorize based on content
  if (
    title.includes('leetcode') ||
    title.includes('algorithm') ||
    title.includes('algoritmo') ||
    title.includes('big o') ||
    title.includes('estruturas de dados') ||
    description.includes('algoritmo') ||
    description.includes('algorithm')
  ) {
    return locale === 'pt' ? 'Algoritmos' : 'Algorithms'
  }

  if (
    title.includes('career') ||
    title.includes('job') ||
    title.includes('emprego') ||
    title.includes('carreira') ||
    description.includes('carreira') ||
    description.includes('career')
  ) {
    return locale === 'pt' ? 'Carreira' : 'Career'
  }

  if (
    title.includes('remote') ||
    title.includes('remoto') ||
    title.includes('europa') ||
    title.includes('internacional') ||
    description.includes('remoto') ||
    description.includes('remote') ||
    description.includes('internacional')
  ) {
    return locale === 'pt' ? 'Trabalho Remoto' : 'Remote Work'
  }

  if (
    title.includes('system') ||
    title.includes('design') ||
    title.includes('architecture') ||
    title.includes('dns') ||
    title.includes('load balancer') ||
    title.includes('sistema') ||
    title.includes('arquitetura')
  ) {
    return 'System Design'
  }

  if (
    title.includes('productivity') ||
    title.includes('produtividade') ||
    title.includes('setup') ||
    description.includes('produtividade') ||
    description.includes('productivity')
  ) {
    return locale === 'pt' ? 'Produtividade' : 'Productivity'
  }

  return locale === 'pt' ? 'Reflexões' : 'Reflections'
}

/**
 * Generate tags for posts with i18n support
 */
export function generatePostTags(
  post: PostMetadata,
  locale: 'en' | 'pt' = 'pt'
): string[] {
  const tags: string[] = []
  const title = getLocalizedText(post.title, locale).toLowerCase()

  if (title.includes('big o')) {
    tags.push('Big O', locale === 'pt' ? 'Complexidade' : 'Complexity')
  }
  if (title.includes('dns')) {
    tags.push('DNS', 'Networking')
  }
  if (title.includes('load balancer')) {
    tags.push(
      'Load Balancer',
      locale === 'pt' ? 'Infraestrutura' : 'Infrastructure'
    )
  }
  if (title.includes('sequencer')) {
    tags.push('Sequencer', 'Blockchain')
  }
  if (title.includes('hater')) {
    tags.push('Mindset', locale === 'pt' ? 'Crítica' : 'Criticism')
  }
  if (title.includes('radical')) {
    tags.push('Mindset', locale === 'pt' ? 'Filosofia' : 'Philosophy')
  }
  if (title.includes('envy')) {
    tags.push(
      locale === 'pt' ? 'Psicologia' : 'Psychology',
      locale === 'pt' ? 'Desenvolvimento Pessoal' : 'Personal Development'
    )
  }
  if (title.includes('steve')) {
    tags.push('Steve Jobs', locale === 'pt' ? 'Liderança' : 'Leadership')
  }
  if (title.includes('naples')) {
    tags.push(
      locale === 'pt' ? 'Viagem' : 'Travel',
      locale === 'pt' ? 'Cultura' : 'Culture'
    )
  }
  if (title.includes('creators')) {
    tags.push(
      'Content Creation',
      locale === 'pt' ? 'Criatividade' : 'Creativity'
    )
  }
  if (title.includes('starting')) {
    tags.push(
      locale === 'pt' ? 'Empreendedorismo' : 'Entrepreneurship',
      locale === 'pt' ? 'Começar' : 'Getting Started'
    )
  }
  if (title.includes('problems')) {
    tags.push('Problem Solving', locale === 'pt' ? 'Filosofia' : 'Philosophy')
  }
  if (post.featured) {
    tags.push(locale === 'pt' ? 'Destaque' : 'Featured')
  }
  if (post.readTime) {
    tags.push(`${post.readTime} min`)
  }

  return tags
}

/**
 * Format date with locale support
 */
export function formatPostDate(
  dateString: string,
  locale: 'en' | 'pt' = 'pt'
): string {
  const date = new Date(dateString)
  const localeCode = locale === 'pt' ? 'pt-BR' : 'en-US'
  return date.toLocaleDateString(localeCode, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Format short date for badges
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
}

/**
 * Get category badge text (shorter version for UI)
 */
export function getCategoryBadge(
  post: PostMetadata,
  locale: 'en' | 'pt' = 'pt'
): string {
  const category = categorizePost(post, locale)

  // Return shorter versions for badges
  switch (category) {
    case 'Algoritmos':
    case 'Algorithms':
      return locale === 'pt' ? 'ALG' : 'ALG'
    case 'Carreira':
    case 'Career':
      return locale === 'pt' ? 'CAR' : 'CAR'
    case 'Trabalho Remoto':
    case 'Remote Work':
      return locale === 'pt' ? 'REM' : 'REM'
    case 'System Design':
      return 'SYS'
    case 'Produtividade':
    case 'Productivity':
      return locale === 'pt' ? 'PROD' : 'PROD'
    case 'Reflexões':
    case 'Reflections':
      return locale === 'pt' ? 'REF' : 'REF'
    default:
      return locale === 'pt' ? 'ART' : 'ART'
  }
}

/**
 * Get all categories text for i18n
 */
export function getAllCategoriesText(locale: 'en' | 'pt' = 'pt'): string {
  return locale === 'pt' ? 'Todos os artigos' : 'All articles'
}

/**
 * Filter posts by search query with i18n support
 */
export function filterPostsByQuery(
  posts: PostMetadata[],
  query: string,
  locale: 'en' | 'pt' = 'pt'
): PostMetadata[] {
  if (!query.trim()) {
    return posts
  }

  const searchQuery = query.toLowerCase().trim()

  return posts.filter((post) => {
    const title = getLocalizedText(post.title, locale).toLowerCase()
    const description = getLocalizedText(post.description, locale).toLowerCase()
    const tags = post.tags ? getLocalizedArray(post.tags, locale) : []

    return (
      title.includes(searchQuery) ||
      description.includes(searchQuery) ||
      tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    )
  })
}

/**
 * Filter posts by category with i18n support
 */
export function filterPostsByCategory(
  posts: PostMetadata[],
  category: string,
  locale: 'en' | 'pt' = 'pt'
): PostMetadata[] {
  const allCategoriesText = getAllCategoriesText(locale)

  if (category === allCategoriesText) {
    return posts
  }

  return posts.filter((post) => categorizePost(post, locale) === category)
}

/**
 * Get category counts for sidebar
 */
export function getCategoryCounts(
  posts: PostMetadata[],
  locale: 'en' | 'pt' = 'pt'
): Array<{ name: string; count: number }> {
  const categoryMap = new Map<string, number>()
  const allCategoriesText = getAllCategoriesText(locale)

  // Count all articles
  categoryMap.set(allCategoriesText, posts.length)

  // Count by category
  for (const post of posts) {
    const category = categorizePost(post, locale)
    if (category !== allCategoriesText) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    }
  }

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }))
}
