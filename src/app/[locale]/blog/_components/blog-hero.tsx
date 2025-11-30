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
      badge: 'AUGUSTO GALEGO BLOG',
      title: 'Últimas Atualizações',
      subtitle:
        'Todos os artigos mais recentes sobre algoritmos, estruturas de dados e carreira tech, direto da fonte.',
    },
    en: {
      badge: 'AUGUSTO GALEGO BLOG',
      title: 'Latest Updates',
      subtitle:
        'All the latest articles about algorithms, data structures and tech career, straight from the source.',
    },
  }

  const content = heroContent[locale]

  return (
    <div className="bg-background">
      <div
        className="max-w-6xl mx-auto px-8 py-24 border-x-2 border-dotted border-border/40"
        style={{
          backgroundImage: `
            linear-gradient(135deg, hsl(var(--background)) 0%, transparent 70%),
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-4 mb-8">
            {/* Badge */}
            <div className="inline-block">
              <span className="text-sm font-mono font-medium text-muted-foreground uppercase tracking-widest">
                {content.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
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
