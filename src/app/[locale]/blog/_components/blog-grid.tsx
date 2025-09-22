'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { MultilingualText, PostMetadata } from '@/utils/get-posts'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Search,
  Star,
  TrendingUp,
} from 'lucide-react'

import { Link } from '@/lib/navigation'
import { useState } from 'react'

// Helper function to get text in the correct language
function getLocalizedText(
  text: MultilingualText | string,
  language: 'en' | 'pt' = 'pt'
): string {
  if (typeof text === 'string') {
    return text
  }
  return text[language] || text.en || text.pt
}

interface BlogGridProps {
  posts: PostMetadata[]
}

// Função para categorizar posts baseado no título/conteúdo
const categorizePost = (post: PostMetadata): string => {
  const title = getLocalizedText(post.title, 'pt').toLowerCase()
  // const description = post.description.toLowerCase()

  if (
    title.includes('leetcode') ||
    title.includes('algorithm') ||
    title.includes('big o')
  ) {
    return 'Algoritmos'
  }
  if (
    title.includes('career') ||
    title.includes('job') ||
    title.includes('emprego') ||
    title.includes('carreira')
  ) {
    return 'Carreira'
  }
  if (
    title.includes('system') ||
    title.includes('design') ||
    title.includes('architecture')
  ) {
    return 'System Design'
  }
  if (
    title.includes('remote') ||
    title.includes('europa') ||
    title.includes('italy') ||
    title.includes('internacional')
  ) {
    return 'Trabalho Remoto'
  }
  if (
    title.includes('produtividade') ||
    title.includes('setup') ||
    title.includes('productivity')
  ) {
    return 'Produtividade'
  }
  return 'Reflexões'
}

// Função para estimar tempo de leitura baseado no título/descrição
const estimateReadTime = (post: PostMetadata): number => {
  const title = getLocalizedText(post.title, 'pt')
  const description = getLocalizedText(post.description, 'pt')
  const wordCount = `${title} ${description}`.split(' ').length
  return Math.max(3, Math.ceil(wordCount / 200)) // Estimativa baseada em 200 palavras por minuto
}

// Função para formatar data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Posts em destaque baseado no briefing
const featuredPostTitles = [
  'Como ser um EXCELENTE programador?',
  'LeetCode vai te fazer melhorar como dev?',
  'De Júnior no Brasil a Senior na Europa',
]

const isFeaturedPost = (post: PostMetadata): boolean => {
  return featuredPostTitles.some((title) =>
    getLocalizedText(post.title, 'pt')
      .toLowerCase()
      .includes(title.toLowerCase().split(' ')[0] ?? '')
  )
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Enriquecer posts com dados adicionais
  const enrichedPosts = posts.map((post) => ({
    ...post,
    category: post.category || categorizePost(post),
    readTime: post.readTime || estimateReadTime(post),
    featured: post.featured || isFeaturedPost(post),
  }))

  // Filtrar posts
  const filteredPosts = enrichedPosts.filter((post) => {
    const matchesSearch =
      getLocalizedText(post.title, 'pt')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getLocalizedText(post.description, 'pt')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Separar posts em destaque
  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  // Obter categorias únicas
  const categories = [
    'all',
    ...Array.from(new Set(enrichedPosts.map((post) => post.category))),
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category === 'all' ? 'Todos' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 text-foreground fill-foreground" />
              <h2 className="text-2xl font-bold">Artigos em Destaque</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <Card
                  key={post.url}
                  className={`tech-card group transition-all ${
                    index === 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default" className="text-xs">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Destaque
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {typeof post.category === 'string'
                              ? post.category
                              : getLocalizedText(post.category, 'pt')}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">
                          {getLocalizedText(post.title, 'pt')}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {getLocalizedText(post.description, 'pt')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min de leitura</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild={true}
                        className="group/btn"
                      >
                        <Link href={`/blog/${post.url}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Ler artigo
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all'
                ? 'Todos os Artigos'
                : `Artigos sobre ${selectedCategory}`}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} artigo
              {filteredPosts.length !== 1 ? 's' : ''} encontrado
              {filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="tech-card">
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🔍</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      Nenhum artigo encontrado
                    </h3>
                    <p className="text-muted-foreground">
                      Tente ajustar os filtros ou termo de busca
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card key={post.url} className="tech-card group transition-all">
                  <CardHeader>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs w-fit">
                        {typeof post.category === 'string'
                          ? post.category
                          : getLocalizedText(post.category, 'pt')}
                      </Badge>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {getLocalizedText(post.title, 'pt')}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {getLocalizedText(post.description, 'pt')}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild={true}
                        className="w-full group/btn justify-between"
                      >
                        <Link href={`/blog/${post.url}`}>
                          <span>Ler artigo</span>
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {filteredPosts.length > 9 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais artigos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
