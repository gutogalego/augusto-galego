import { Badge } from '@/components/ui/badge'
import type { PostMetadata } from '@/utils/get-posts'
import { BookOpen } from 'lucide-react'
import { useLocale } from 'next-intl'
import { BlogSearch } from './blog-search'

interface BlogHeroProps {
  posts: PostMetadata[]
  onSearch?: (query: string) => void
  onTopicClick?: (topic: string) => void
}

export function BlogHero({ posts, onSearch }: BlogHeroProps) {
  const locale = useLocale() as 'en' | 'pt'
  return (
    <div className="border-b border-dotted border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-8 py-12 border-x-2 border-dotted border-border/40">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">
            {locale === 'pt' ? 'Blog' : 'Blog'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {locale === 'pt'
              ? 'Artigos sobre algoritmos, estruturas de dados e carreira em tech'
              : 'Articles about algorithms, data structures and tech career'}
          </p>

          <div className="max-w-md mx-auto">
            <BlogSearch
              posts={posts}
              onSearch={(query) => {
                onSearch?.(query)
              }}
              onResultSelect={() => {
                // O componente já navega automaticamente
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
