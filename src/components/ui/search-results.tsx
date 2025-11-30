'use client'

import { cn } from '@/lib/shadcn'
import * as React from 'react'
import { Badge } from './badge'

export interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  tags?: string[]
  url?: string
  icon?: React.ReactNode
}

export interface SearchResultsProps {
  results: SearchResult[]
  isOpen: boolean
  onResultClick?: (result: SearchResult) => void
  onClose?: () => void
  className?: string
}

const SearchResults = React.forwardRef<HTMLDivElement, SearchResultsProps>(
  ({ results, isOpen, onResultClick, onClose, className }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) {
          return
        }

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            setSelectedIndex((prev) =>
              prev < results.length - 1 ? prev + 1 : 0
            )
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : results.length - 1
            )
            break
          }
          case 'Enter': {
            e.preventDefault()
            if (results[selectedIndex]) {
              onResultClick?.(results[selectedIndex])
            }
            break
          }
          case 'Escape': {
            e.preventDefault()
            onClose?.()
            break
          }
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
      }

      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, results, selectedIndex, onResultClick, onClose])

    // Reset selected index when results change
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [results])

    if (!isOpen || results.length === 0) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'absolute top-full left-0 right-0 z-50 mt-2',
          'rounded-lg border border-border/50 bg-popover/95 backdrop-blur-sm shadow-lg',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
          'max-h-96 overflow-y-auto',
          className
        )}
      >
        <div className="p-2">
          {results.map((result, index) => (
            <button
              key={result.id}
              type="button"
              className={cn(
                'flex items-start gap-3 p-3 rounded-md cursor-pointer w-full text-left',
                'transition-all duration-150 ease-out',
                'hover:bg-accent/50',
                index === selectedIndex && 'bg-accent/70',
                'group'
              )}
              onClick={() => onResultClick?.(result)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onResultClick?.(result)
                }
              }}
            >
              {/* Icon */}
              {result.icon && (
                <div className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                  {result.icon}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-accent-foreground line-clamp-1">
                    {result.title}
                  </h4>

                  {/* Category Badge */}
                  {result.category && (
                    <Badge
                      variant="secondary"
                      className="text-xs shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      {result.category}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                {result.description && (
                  <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 line-clamp-2 mt-1">
                    {result.description}
                  </p>
                )}

                {/* Tags */}
                {result.tags && result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {result.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{result.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Hint */}
              {index === selectedIndex && (
                <div className="flex-shrink-0 text-xs text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">
                  ↵
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Hints */}
        <div className="border-t-2 border-border/30 p-2 bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-muted/50 rounded text-xs">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-muted/50 rounded text-xs">↵</kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-muted/50 rounded text-xs">esc</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    )
  }
)

SearchResults.displayName = 'SearchResults'

export { SearchResults }
