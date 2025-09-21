import type { PostMetadata } from '@/utils/get-posts'
import { useLocale } from 'next-intl'
import { BlogSearch } from './blog-search'

interface BlogHeroProps {
  posts: PostMetadata[]
  onSearch?: (query: string) => void
  onTopicClick?: (topic: string) => void
  locale?: 'en' | 'pt'
}

export function BlogHero({
  posts,
  onSearch,
  locale: propLocale,
}: BlogHeroProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale
  const heroContent = {
    pt: {
      title: 'AUGUSTO GALEGO BLOG',
      subtitle: 'Algoritmos, estruturas de dados e carreira em tech',
    },
    en: {
      title: 'AUGUSTO GALEGO BLOG',
      subtitle: 'Algorithms, data structures and tech career',
    },
  }

  const content = heroContent[locale]

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-24 border-x-2 border-dotted border-border/40">
        <div className="max-w-4xl mx-auto">
          {/* Minimal Header */}
          <div className="space-y-6 mb-16">
            <h1 className="text-2xl font-mono font-medium text-foreground tracking-wide">
              {content.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-lg">
            <BlogSearch
              posts={posts}
              onSearch={(query) => {
                onSearch?.(query)
              }}
              onResultSelect={() => {
                // O componente já navega automaticamente
              }}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
