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
import { useCardStackAnimation } from '@/hooks/use-card-stack-animation'
import type { PostMetadata } from '@/utils/getPosts'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Star,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

interface AnimatedBlogGridProps {
  posts: PostMetadata[]
  searchQuery?: string
  selectedTopic?: string
}

// Função para categorizar posts baseado no título/conteúdo
const categorizePost = (post: PostMetadata): string => {
  const title = post.title.toLowerCase()

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
    title.includes('architecture') ||
    title.includes('load balancer') ||
    title.includes('dns')
  ) {
    return 'System Design'
  }
  if (
    title.includes('remote') ||
    title.includes('europa') ||
    title.includes('italy') ||
    title.includes('internacional') ||
    title.includes('naples')
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

// Função para estimar tempo de leitura
const estimateReadTime = (post: PostMetadata): string => {
  const wordCount = `${post.title} ${post.description}`.split(' ').length
  const readTime = Math.max(3, Math.ceil((wordCount / 200) * 10))
  return `${readTime} min`
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

// Posts em destaque
const featuredPostTitles = [
  'Como ser um EXCELENTE programador?',
  'LeetCode vai te fazer melhorar como dev?',
  'De Júnior no Brasil a Senior na Europa',
]

const isFeaturedPost = (post: PostMetadata): boolean => {
  return featuredPostTitles.some((title) =>
    post.title.toLowerCase().includes(title.toLowerCase().split(' ')[0] ?? '')
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
}

export function AnimatedBlogGrid({
  posts,
  searchQuery,
  selectedTopic,
}: AnimatedBlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Enriquecer posts com dados adicionais
  const enrichedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        category: post.category || categorizePost(post),
        readTime: post.readTime || estimateReadTime(post),
        featured: post.featured || isFeaturedPost(post),
      })),
    [posts]
  )

  // Filtrar e ordenar posts
  const sortedPosts = useMemo(() => {
    let filtered = [...enrichedPosts]

    // Filtrar por query de busca
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    // Filtrar por tópico selecionado
    if (selectedTopic?.trim()) {
      const topic = selectedTopic.toLowerCase().trim()
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(topic) ||
          post.description.toLowerCase().includes(topic) ||
          post.category.toLowerCase().includes(topic) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(topic))
        )
      })
    }

    // Ordenar: featured primeiro, depois por data
    const sorted = filtered.sort((a, b) => {
      // Featured posts first
      if (a.featured && !b.featured) {
        return -1
      }
      if (!a.featured && b.featured) {
        return 1
      }

      // Then by date (newest  first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    // When a category is selected, move those posts to the top
    if (selectedCategory !== 'all') {
      const categoryPosts = sorted.filter(
        (post) => post.category === selectedCategory
      )
      const otherPosts = sorted.filter(
        (post) => post.category !== selectedCategory
      )
      return [...categoryPosts, ...otherPosts]
    }

    return sorted
  }, [enrichedPosts, selectedCategory, searchQuery, selectedTopic])

  // Obter categorias únicas
  const categories = useMemo(
    () => [
      'all',
      ...Array.from(new Set(enrichedPosts.map((post) => post.category))),
    ],
    [enrichedPosts]
  )

  // Card stack animation hook
  const { highlightCategory, isHighlighting, getCardProps } =
    useCardStackAnimation({
      stackOffset: 12,
      stackScale: 0.97,
      animationDuration: 0.8,
      staggerDelay: 0.08,
    })

  const handleCategorySelect = useCallback(
    (category: string) => {
      if (category === selectedCategory || isHighlighting) {
        return
      }

      setSelectedCategory(category)

      if (category !== 'all') {
        // Trigger card stack animation for the selected category
        // Filter posts to only include those with valid URLs
        const postsWithUrls = enrichedPosts.filter(
          (post) => post.url
        ) as Array<{ category: string; url: string }>
        highlightCategory(category, postsWithUrls)
      }
    },
    [selectedCategory, isHighlighting, highlightCategory, enrichedPosts]
  )

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Category Sidebar */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category
              const categoryPosts = enrichedPosts.filter(
                (post) => category === 'all' || post.category === category
              )

              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategorySelect(category)}
                    disabled={isHighlighting}
                    className={`
                      relative text-sm transition-all duration-300
                      ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'hover:bg-muted hover:border-primary/50'
                      }
                      ${isHighlighting && !isSelected ? 'opacity-50' : ''}
                    `}
                  >
                    <span className="relative z-10">
                      {category === 'all' ? 'Todos' : category}
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs bg-background/20"
                    >
                      {categoryPosts.length}
                    </Badge>

                    {/* Connection line indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 w-1 h-1 bg-primary rounded-full"
                        initial={{ scale: 0, x: '-50%' }}
                        animate={{ scale: 1, x: '-50%' }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Section Title with Animation */}
          <motion.div variants={cardVariants} className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'all'
                ? 'Todos os Artigos'
                : `Artigos sobre ${selectedCategory}`}
            </h2>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>
                {sortedPosts.length} artigo{sortedPosts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {sortedPosts.map((post) => {
                const cardProps = getCardProps(post.url || '', post.category)

                return (
                  <motion.div
                    key={post.url}
                    variants={cardVariants}
                    layout={true}
                    layoutId={post.url}
                    className={`relative ${cardProps.className}`}
                    style={cardProps.style}
                    whileHover={{
                      y: -8,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                  >
                    <Card className="tech-card group h-full transition-all duration-300 hover:shadow-xl">
                      <CardHeader>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                selectedCategory === post.category &&
                                selectedCategory !== 'all'
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : ''
                              }`}
                            >
                              {post.category}
                            </Badge>
                            {post.featured && (
                              <Badge variant="default" className="text-xs">
                                <Star className="mr-1 h-3 w-3 fill-current" />
                                Destaque
                              </Badge>
                            )}
                          </div>

                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>

                          <CardDescription className="line-clamp-3">
                            {post.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
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
                      </CardContent>

                      {/* Connection node */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Load More Section */}
          {sortedPosts.length > 9 && (
            <motion.div variants={cardVariants} className="text-center pt-8">
              <Button variant="outline" size="lg" className="group">
                Carregar mais artigos
                <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
