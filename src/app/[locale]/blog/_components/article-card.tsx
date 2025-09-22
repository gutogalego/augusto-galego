'use client'

import { Badge } from '@/components/ui/badge'
import {
  formatPostDate,
  generatePostTags,
  getLocalizedText,
} from '@/lib/blog-utils'
import { cn } from '@/lib/shadcn'
import type { PostMetadata } from '@/utils/get-posts'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'

interface ArticleCardProps {
  post: PostMetadata
  index?: number
  className?: string
  variant?: 'default' | 'compact' | 'featured'
  isLast?: boolean
  locale?: 'en' | 'pt'
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

export function ArticleCard({
  post,
  index = 0,
  className,
  variant = 'default',
  isLast = false,
  locale: propLocale,
}: ArticleCardProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale

  const title = getLocalizedText(post.title, locale)
  const description = getLocalizedText(post.description, locale)
  const tags = generatePostTags(post, locale)
  const formattedDate = formatPostDate(post.date, locale)

  const baseClasses = cn(
    'group block transition-all duration-200',
    'hover:bg-muted/30',
    !isLast && 'border-dashed-wide',
    className
  )

  const contentClasses = cn(
    'flex items-start justify-between gap-4 py-6 px-8',
    variant === 'compact' && 'py-4 px-6',
    variant === 'featured' && 'py-8 px-8'
  )

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
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
          baseClasses,
          'hover:bg-muted/30',
          index === 0 && 'border-t-2 border-dashed-wide'
        )}
      >
        <article className={contentClasses}>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <time
                dateTime={post.date}
                className="text-sm text-muted-foreground font-medium"
              >
                {formattedDate}
              </time>
              <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
            </div>

            <h2
              className={cn(
                'font-semibold text-foreground group-hover:text-primary transition-colors',
                variant === 'featured' ? 'text-xl' : 'text-lg'
              )}
            >
              {title}
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {description}
            </p>

            <div className="flex gap-1 pt-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
