'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/getPosts'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SimpleArticleListProps {
  posts: PostMetadata[]
  className?: string
}

const formatDate = (date: string): string => {
  return new Date(date)
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
}

const getCategoryBadge = (post: PostMetadata): string => {
  const title = post.title.toLowerCase()
  const description = post.description?.toLowerCase() || ''

  if (
    title.includes('ai') ||
    title.includes('artificial intelligence') ||
    title.includes('machine learning') ||
    description.includes('ai')
  ) {
    return 'IA'
  }

  if (
    title.includes('product') ||
    title.includes('produtividade') ||
    title.includes('productivity') ||
    description.includes('product')
  ) {
    return 'PRODUTO'
  }

  if (
    title.includes('web') ||
    title.includes('javascript') ||
    title.includes('react') ||
    title.includes('frontend') ||
    description.includes('web')
  ) {
    return 'WEB'
  }

  return 'TECH'
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
}

export function SimpleArticleList({
  posts,
  className,
}: SimpleArticleListProps) {
  return (
    <motion.div
      className={cn('space-y-0', className)}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.div
            key={`${post.slug || post.url}-${index}`}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout={true}
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
          >
            <Link
              href={`/blog/${post.slug || post.url}`}
              className={cn(
                'group block py-6 px-6 transition-all duration-200',
                'hover:bg-muted/30 hover:shadow-sm',
                'border-b border-dotted border-border/40',
                index === 0 && 'border-t border-dotted border-border/40'
              )}
            >
              <article className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date} className="font-medium">
                      {formatDate(post.date)}
                    </time>

                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-1 font-medium"
                    >
                      {getCategoryBadge(post)}
                    </Badge>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
