'use client'

import { cn } from '@/lib/shadcn'
import { HighlightText, enhancedSearch } from '@/utils/text-highlight'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCommandLine,
  RiCornerDownLeftLine,
  RiSearchLine,
  RiStarLine,
} from 'react-icons/ri'
import { Badge } from './badge'
import { Button } from './button'
import * as CommandMenu from './command-menu'
import type { SearchResult } from './search'

export interface AdaptiveSearchProps {
  data?: SearchResult[]
  placeholder?: string
  onSearch?: (query: string, results: SearchResult[]) => void
  onResultSelect?: (result: SearchResult) => void
  maxResults?: number
  searchDelay?: number
  className?: string
  triggerClassName?: string
  enableFuzzySearch?: boolean
}

const AdaptiveSearch = React.forwardRef<HTMLDivElement, AdaptiveSearchProps>(
  (
    {
      data = [],
      placeholder,
      onSearch,
      onResultSelect,
      maxResults = 8,
      searchDelay = 300,
      className,
      triggerClassName,
      enableFuzzySearch = true,
    },
    ref
  ) => {
    const t = useTranslations('search')
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    const searchTimeoutRef = React.useRef<NodeJS.Timeout>()

    // Enhanced search function
    const performSearch = React.useCallback(
      (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([])
          setIsLoading(false)
          return
        }

        setIsLoading(true)

        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }

        searchTimeoutRef.current = setTimeout(() => {
          let filteredResults: SearchResult[]

          if (enableFuzzySearch) {
            filteredResults = enhancedSearch(data, searchQuery, {
              maxResults,
              minScore: 5,
              fuzzyThreshold: 0.6,
            })
          } else {
            filteredResults = data
              .filter((item) => {
                const searchLower = searchQuery.toLowerCase()
                return (
                  item.title.toLowerCase().includes(searchLower) ||
                  item.description?.toLowerCase().includes(searchLower) ||
                  item.category?.toLowerCase().includes(searchLower) ||
                  item.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchLower)
                  )
                )
              })
              .slice(0, maxResults)
          }

          setResults(filteredResults)
          setIsLoading(false)
          onSearch?.(searchQuery, filteredResults)
        }, searchDelay)
      },
      [data, maxResults, searchDelay, onSearch, enableFuzzySearch]
    )

    // Handle result selection
    const handleResultSelect = React.useCallback(
      (result: SearchResult) => {
        onResultSelect?.(result)
        setIsOpen(false)
        setQuery('')
        setResults([])

        if (result.url) {
          window.location.href = result.url
        }
      },
      [onResultSelect]
    )

    // Global shortcut to open search
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault()
          setIsOpen(true)
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Block body scroll when modal is open
    React.useEffect(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow
        const originalPaddingRight = document.body.style.paddingRight

        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`

        return () => {
          document.body.style.overflow = originalOverflow
          document.body.style.paddingRight = originalPaddingRight
        }
      }
    }, [isOpen])

    // Cleanup timeout
    React.useEffect(() => {
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
      }
    }, [])

    // Trigger button
    const SearchTrigger = () => (
      <Button
        variant="outline"
        className={cn(
          'flex items-center justify-between w-full',
          'h-12 px-4 text-sm text-muted-foreground',
          'bg-background/50 backdrop-blur-sm',
          'border-input hover:border-ring/50 hover:bg-background/60',
          'transition-all duration-200 ease-out',
          'focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring',
          triggerClassName
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          <RiSearchLine className="h-4 w-4" />
          <span className="font-normal">{t('triggerText')}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-xs font-medium">
          <RiCommandLine className="h-3 w-3" />
          <span>{t('shortcutHint')}</span>
        </div>
      </Button>
    )

    return (
      <div ref={ref} className={cn('relative', className)}>
        {/* Trigger */}
        <SearchTrigger />

        {/* Command Menu */}
        <CommandMenu.Dialog open={isOpen} onOpenChange={setIsOpen}>
          {/* Input wrapper */}
          <div className="group/cmd-input bg-background flex h-14 w-full items-center gap-4 px-6 border-b border-border/50">
            <RiSearchLine
              className={cn(
                'text-muted-foreground/60 size-5 shrink-0',
                'transition duration-200 ease-out',
                // focus within
                'group-focus-within/cmd-input:text-muted-foreground'
              )}
            />
            <CommandMenu.Input
              placeholder={placeholder || t('placeholder')}
              value={query}
              onValueChange={(value) => {
                setQuery(value)
                performSearch(value)
              }}
              className="text-base placeholder:text-muted-foreground/50"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <CommandMenu.List>
            {/* Loading state */}
            {isLoading && query && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground font-medium">
                  {t('searching')}
                </p>
              </div>
            )}

            {/* No results */}
            {!isLoading && query && results.length === 0 && (
              <div className="p-8 text-center">
                <RiSearchLine className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2 text-foreground">
                  {t('noResults')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('noResultsDescription')}
                </p>
              </div>
            )}

            {/* Featured Articles - when no search query */}
            {!query && (
              <CommandMenu.Group heading={t('featuredArticles')}>
                {data.slice(0, 6).map((item) => (
                  <CommandMenu.Item
                    key={item.id}
                    onSelect={() => handleResultSelect(item)}
                  >
                    <div className="flex items-center w-full gap-4">
                      {/* Icon Square */}
                      <div className="size-10 shrink-0 rounded-xl bg-muted/20 border border-border/40 flex items-center justify-center">
                        {item.icon ? (
                          <div className="size-4 text-muted-foreground/80">
                            {item.icon}
                          </div>
                        ) : (
                          <RiStarLine className="size-4 text-muted-foreground/80" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-foreground line-clamp-1 mb-1">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {item.description}
                          </p>
                        )}
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground/60 font-medium">
                          {item.category && (
                            <>
                              <span>{item.category}</span>
                              {item.tags && item.tags.length > 0 && (
                                <>
                                  <span className="text-muted-foreground/40">
                                    /
                                  </span>
                                  <span>{item.tags[0]}</span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CommandMenu.Item>
                ))}
              </CommandMenu.Group>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <CommandMenu.Group
                heading={`${t('searchResults')} (${results.length})`}
              >
                {results.map((result) => (
                  <CommandMenu.Item
                    key={result.id}
                    onSelect={() => handleResultSelect(result)}
                  >
                    <div className="flex items-center w-full gap-4">
                      <div className="size-10 shrink-0 rounded-xl bg-muted/20 border border-border/40 flex items-center justify-center">
                        {result.icon ? (
                          <div className="size-4 text-muted-foreground/80">
                            {result.icon}
                          </div>
                        ) : (
                          <RiSearchLine className="size-4 text-muted-foreground/80" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-medium text-foreground line-clamp-1 mb-1">
                          <HighlightText
                            text={result.title}
                            query={query}
                            className="text-foreground"
                            highlightClassName="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground"
                          />
                        </h4>
                        {result.description && (
                          <p className="text-[13px] text-muted-foreground/70 line-clamp-2 mb-2 leading-relaxed">
                            <HighlightText
                              text={result.description}
                              query={query}
                              highlightClassName="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground"
                            />
                          </p>
                        )}
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60 font-medium">
                          {result.category && (
                            <>
                              <HighlightText
                                text={result.category}
                                query={query}
                                highlightClassName="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground"
                              />
                              {result.tags && result.tags.length > 0 && (
                                <>
                                  <span className="text-muted-foreground/40">
                                    /
                                  </span>
                                  <HighlightText
                                    text={result.tags[0] || ''}
                                    query={query}
                                    highlightClassName="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground"
                                  />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CommandMenu.Item>
                ))}
              </CommandMenu.Group>
            )}
          </CommandMenu.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-border/50 bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="px-1.5 py-0.5 rounded bg-background border border-border/60 text-[10px] font-medium text-muted-foreground/80">
                    ↑
                  </div>
                  <div className="px-1.5 py-0.5 rounded bg-background border border-border/60 text-[10px] font-medium text-muted-foreground/80">
                    ↓
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground/70">
                  {t('navigate')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-1.5 py-0.5 rounded bg-background border border-border/60 text-[10px] font-medium text-muted-foreground/80">
                  ↵
                </div>
                <span className="text-[11px] text-muted-foreground/70">
                  {t('select')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground/70">
                {t('close')}
              </span>
              <div className="px-1.5 py-0.5 rounded bg-background border border-border/60 text-[10px] font-medium text-muted-foreground/80">
                esc
              </div>
            </div>
          </div>
        </CommandMenu.Dialog>
      </div>
    )
  }
)

AdaptiveSearch.displayName = 'AdaptiveSearch'

export { AdaptiveSearch }
