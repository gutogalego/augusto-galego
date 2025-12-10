'use client'

import { Card } from '@/components/ui/card'
import * as FancyButton from '@/components/ui/fancy-button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface BookCardProps {
  title: string
  author: string
  description: string
  imageUrl: string
  amazonUrl: string
  ctaText: string
}

export function BookCard({
  title,
  author,
  description,
  imageUrl,
  amazonUrl,
  ctaText,
}: BookCardProps) {
  const handleOpenAmazon = () => window.open(amazonUrl, '_blank')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpenAmazon()
    }
  }

  return (
    <Card className="flex flex-row overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm group min-h-[10rem] md:h-44">
      {/* Image Section - Clickable */}
      <button
        type="button"
        className="relative w-28 md:w-36 shrink-0 bg-muted cursor-pointer p-0 border-0 text-left"
        onClick={handleOpenAmazon}
        onKeyDown={handleKeyDown}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill={true}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-3 md:p-4 min-w-0 justify-between">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-lg md:text-xl leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
            {author}
          </p>
          <p className="hidden md:block text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 mt-1.5">
            {description}
          </p>
        </div>

        {/* Footer/Action Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2 pt-1">
          <p className="md:hidden text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
          <FancyButton.Root
            className="w-full sm:w-auto justify-center h-8 px-3 text-xs whitespace-nowrap shrink-0"
            onClick={handleOpenAmazon}
          >
            {ctaText}
            <ExternalLink className="ml-2 h-3 w-3" />
          </FancyButton.Root>
        </div>
      </div>
    </Card>
  )
}
