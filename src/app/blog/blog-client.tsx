'use client'

import type { PostMetadata } from '@/utils/getPosts'
import { useState } from 'react'
import { AnimatedBlogGrid, BlogHero } from './_components'

interface BlogClientProps {
  posts: PostMetadata[]
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Limpar tópico selecionado quando uma nova busca é feita
    if (query.trim()) {
      setSelectedTopic('')
    }
  }

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic)
    // Limpar busca quando um tópico é selecionado
    setSearchQuery('')
  }

  return (
    <>
      <BlogHero
        posts={posts}
        onSearch={handleSearch}
        onTopicClick={handleTopicClick}
      />
      <AnimatedBlogGrid
        posts={posts}
        searchQuery={searchQuery}
        selectedTopic={selectedTopic}
      />
    </>
  )
}
