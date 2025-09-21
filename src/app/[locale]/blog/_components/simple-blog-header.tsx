'use client'

import type { PostMetadata } from '@/utils/get-posts'
import { BlogSearch } from './blog-search'

interface SimpleBlogHeaderProps {
  posts: PostMetadata[]
  onSearch?: (query: string) => void
  className?: string
}

export function SimpleBlogHeader({ posts, onSearch }: SimpleBlogHeaderProps) {
  return (
    <section className="hero-section">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="text-sm font-mono text-muted-foreground/60 tracking-wider px-4 py-2 rounded-full border border-border/40">
              AUGUSTO GALEGO ENGINEERING BLOG
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <div className="text-subtitle">Blog & Insights</div>
            <h1 className="text-display">
              Últimos <span className="gradient-text">artigos</span>
            </h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Insights sobre tech, carreira e desenvolvimento.
              <strong> Conteúdo real, sem enrolação.</strong>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <BlogSearch
              posts={posts}
              onSearch={(query) => {
                onSearch?.(query)
              }}
              onResultSelect={() => {
                // Navigation handled by the component
              }}
              className="w-full"
              triggerClassName="h-14 text-lg px-6 bg-background/50 backdrop-blur-sm border-2 border-border/60 hover:border-primary/50 focus-visible:border-primary"
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
