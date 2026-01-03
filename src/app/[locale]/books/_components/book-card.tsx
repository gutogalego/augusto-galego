'use client'

import { Card } from '@/components/ui/card'
import * as FancyButton from '@/components/ui/fancy-button'
import { ExternalLink, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'

interface BookCardProps {
  title: string
  author: string
  description: string
  imageUrl: string
  amazonUrl: string
  ctaText: string
  stars?: number
  recommendation?: string
}

export function BookCard({
  title,
  author,
  description,
  imageUrl,
  amazonUrl,
  ctaText,
  stars,
  recommendation,
}: BookCardProps) {
  const handleOpenAmazon = () => window.open(amazonUrl, '_blank')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpenAmazon()
    }
  }

  const renderStars = () => {
    if (!stars) {
      return null
    }
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const starKey = `star-${index}`
          const isFull = index < Math.floor(stars)
          const isHalf = !isFull && index < stars

          if (isHalf) {
            return (
              <StarHalf
                key={starKey}
                className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
              />
            )
          }

          return (
            <Star
              key={starKey}
              className={`h-3.5 w-3.5 ${
                isFull
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-muted text-muted'
              }`}
            />
          )
        })}
      </div>
    )
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-transparent group h-full">
      {/* Image Section - Clickable */}
      <button
        type="button"
        className="relative w-32 h-48 mx-auto bg-muted cursor-pointer p-0 border-0 text-left rounded-md overflow-hidden shrink-0"
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
      <div className="flex flex-1 flex-col p-3 min-w-0">
        <div className="space-y-2 mb-3">
          <div className="space-y-1.5">
            <h3 className="font-bold text-base leading-tight line-clamp-2">
              {title}
            </h3>
            {renderStars()}
          </div>
          <p className="text-xs text-muted-foreground font-medium">{author}</p>
          {recommendation && (
            <p className="text-xs text-foreground leading-relaxed line-clamp-2 italic">
              &quot;{recommendation}&quot;
            </p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <FancyButton.Root
            className="w-full justify-center h-9 px-3 text-xs"
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
