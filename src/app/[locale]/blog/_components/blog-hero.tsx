import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { PostMetadata } from '@/utils/get-posts'
import { BookOpen, Tag, TrendingUp, Users } from 'lucide-react'
import { BlogSearch } from './blog-search'

interface BlogHeroProps {
  posts: PostMetadata[]
  onSearch?: (query: string) => void
  onTopicClick?: (topic: string) => void
}

export function BlogHero({ posts, onSearch }: BlogHeroProps) {
  return (
    <section className="hero-section">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="px-3 py-1">
            <BookOpen className="mr-1 h-3 w-3" />
            Blog do Galego
          </Badge>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-display">
              Insights sobre{' '}
              <span className="gradient-text">tech e carreira</span>
            </h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Artigos práticos sobre algoritmos, estruturas de dados, carreira
              internacional e tudo que aprendi em +9 anos como desenvolvedor.
              <strong> Conteúdo real, sem enrolação.</strong>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <BlogSearch
              posts={posts}
              onSearch={(query) => {
                onSearch?.(query)
                // Você pode adicionar analytics aqui se necessário
              }}
              onResultSelect={() => {
                // O componente já navega automaticamente
                // Adicione analytics se necessário
              }}
            />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-muted/10 to-muted/5 opacity-30"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
