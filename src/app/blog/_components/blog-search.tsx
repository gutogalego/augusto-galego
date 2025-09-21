'use client'

import { AdaptiveSearch } from '@/components/ui/adaptive-search'
import type { SearchResult } from '@/components/ui/search'
import type { PostMetadata } from '@/utils/getPosts'
import {
  RiBookOpenLine,
  RiBriefcaseLine,
  RiCodeLine,
  RiFlashlightLine,
  RiFocus3Line,
  RiGlobalLine,
  RiHeartLine,
} from 'react-icons/ri'

const categorizePost = (post: PostMetadata): string => {
  const title = post.title.toLowerCase()
  const description = post.description?.toLowerCase() || ''

  if (
    title.includes('leetcode') ||
    title.includes('algorithm') ||
    title.includes('big o') ||
    title.includes('estruturas de dados') ||
    description.includes('algoritmo')
  ) {
    return 'Algoritmos'
  }
  if (
    title.includes('career') ||
    title.includes('job') ||
    title.includes('emprego') ||
    title.includes('carreira') ||
    description.includes('carreira')
  ) {
    return 'Carreira'
  }
  if (
    title.includes('remote') ||
    title.includes('remoto') ||
    title.includes('europa') ||
    title.includes('internacional') ||
    description.includes('remoto')
  ) {
    return 'Trabalho Remoto'
  }
  if (
    title.includes('system') ||
    title.includes('design') ||
    title.includes('architecture') ||
    title.includes('dns') ||
    title.includes('load balancer')
  ) {
    return 'System Design'
  }
  if (
    title.includes('productivity') ||
    title.includes('produtividade') ||
    title.includes('setup') ||
    description.includes('produtividade')
  ) {
    return 'Produtividade'
  }

  return 'Reflexões'
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Algoritmos':
      return <RiCodeLine className="h-4 w-4" />
    case 'Carreira':
      return <RiBriefcaseLine className="h-4 w-4" />
    case 'Trabalho Remoto':
      return <RiGlobalLine className="h-4 w-4" />
    case 'System Design':
      return <RiFlashlightLine className="h-4 w-4" />
    case 'Produtividade':
      return <RiFocus3Line className="h-4 w-4" />
    case 'Reflexões':
      return <RiHeartLine className="h-4 w-4" />
    default:
      return <RiBookOpenLine className="h-4 w-4" />
  }
}

const generateTags = (post: PostMetadata): string[] => {
  const tags: string[] = []
  const title = post.title.toLowerCase()

  if (title.includes('big o')) {
    tags.push('Big O', 'Complexidade')
  }
  if (title.includes('dns')) {
    tags.push('DNS', 'Networking')
  }
  if (title.includes('load balancer')) {
    tags.push('Load Balancer', 'Infraestrutura')
  }
  if (title.includes('sequencer')) {
    tags.push('Sequencer', 'Blockchain')
  }
  if (title.includes('hater')) {
    tags.push('Mindset', 'Crítica')
  }
  if (title.includes('radical')) {
    tags.push('Mindset', 'Filosofia')
  }
  if (title.includes('envy')) {
    tags.push('Psicologia', 'Desenvolvimento Pessoal')
  }
  if (title.includes('steve')) {
    tags.push('Steve Jobs', 'Liderança')
  }
  if (title.includes('naples')) {
    tags.push('Viagem', 'Cultura')
  }
  if (title.includes('creators')) {
    tags.push('Content Creation', 'Criatividade')
  }
  if (title.includes('starting')) {
    tags.push('Empreendedorismo', 'Começar')
  }
  if (title.includes('problems')) {
    tags.push('Problem Solving', 'Filosofia')
  }
  if (post.featured) {
    tags.push('Destaque')
  }
  if (post.readTime) {
    tags.push(`${post.readTime} min`)
  }

  return tags
}

const postsToSearchResults = (posts: PostMetadata[]): SearchResult[] => {
  return posts.map((post) => {
    const category = categorizePost(post)
    const tags = generateTags(post)

    return {
      id: post.url || post.title,
      title: post.title,
      description: post.description,
      category,
      tags,
      url: `/blog/${post.url}`,
      icon: getCategoryIcon(category),
    }
  })
}

interface BlogSearchProps {
  posts: PostMetadata[]
  onSearch?: (query: string, results: SearchResult[]) => void
  onResultSelect?: (result: SearchResult) => void
  onFilterByCategory?: (category: string) => void
  className?: string
}

export function BlogSearch({
  posts,
  onSearch,
  onResultSelect,
  className,
}: BlogSearchProps) {
  const searchData = postsToSearchResults(posts)

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

  return (
    <AdaptiveSearch
      data={searchData}
      placeholder="Buscar artigos sobre algoritmos, carreira, tech..."
      maxResults={8}
      searchDelay={250}
      onSearch={handleSearch}
      onResultSelect={handleResultSelect}
      enableHistory={true}
      enableFuzzySearch={true}
      className={className}
    />
  )
}

export { categorizePost, getCategoryIcon, generateTags }
