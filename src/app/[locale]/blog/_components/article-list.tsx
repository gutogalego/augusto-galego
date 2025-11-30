'use client'

import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/get-posts'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { ArticleCard } from './article-card'

interface ArticleListProps {
  posts: PostMetadata[]
  className?: string
  variant?: 'default' | 'compact' | 'grid'
  locale?: 'en' | 'pt'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function ArticleList({
  posts,
  className,
  variant = 'default',
  locale: propLocale,
}: ArticleListProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {locale === 'pt' ? 'Nenhum artigo encontrado.' : 'No articles found.'}
        </p>
      </div>
    )
  }

  const containerClasses = cn(
    'space-y-0',
    variant === 'grid' && 'grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0',
    className
  )

  return (
    <motion.div
      className={containerClasses}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <ArticleCard
            key={`${post.slug || post.url}-${index}`}
            post={post}
            index={index}
            variant={variant === 'grid' ? 'compact' : variant}
            isLast={index === posts.length - 1}
            locale={locale}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
