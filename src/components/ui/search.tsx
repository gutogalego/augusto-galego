'use client'

import { cn } from '@/lib/shadcn'
import {
  BookOpen,
  CreditCard,
  FileText,
  HelpCircle,
  Mail,
  Play,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import * as React from 'react'
import { SearchBar, type SearchBarProps } from './search-bar'
import { type SearchResult, SearchResults } from './search-results'

// Mock search data - replace with your actual search logic
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Introduction',
    description:
      "Welcome to Attio 101! We've designed this course as your first step in mastering Attio, ...",
    category: 'Attio 101',
    tags: ['Introduction'],
    icon: <Play className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Manage standard objects',
    description:
      'What are standard objects? Standard objects are built-in objects provided by Attio. Be...',
    category: 'Managing your data',
    tags: ['Objects', 'Manage standard objects'],
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Automations billing',
    description:
      'This guide walks through how billing works for automations, helping you manage your...',
    category: 'Automations',
    tags: ['Automations billing'],
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Email deliverability guide',
    description:
      "Email deliverability refers to the ability of an email to successfully reach a recipient's i...",
    category: 'Sequences',
    tags: ['Email deliverability guide'],
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Signing into Attio',
    description:
      'You can sign in to the Attio web app with a Google account, or with your email address...',
    category: 'Getting started',
    tags: ['Authentication', 'Login'],
    icon: <Users className="h-4 w-4" />,
  },
]

export interface SearchProps extends Omit<SearchBarProps, 'onSearch'> {
  data?: SearchResult[]
  onSearch?: (query: string, results: SearchResult[]) => void
  onResultSelect?: (result: SearchResult) => void
  maxResults?: number
  searchDelay?: number
  className?: string
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      data = mockSearchData,
      onSearch,
      onResultSelect,
      maxResults = 5,
      searchDelay = 300,
      className,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState('')
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const searchTimeoutRef = React.useRef<NodeJS.Timeout>()
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Search function
    const performSearch = React.useCallback(
      (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([])
          setIsOpen(false)
          return
        }

        setIsLoading(true)

        // Clear previous timeout
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }

        // Debounced search
        searchTimeoutRef.current = setTimeout(() => {
          const filteredResults = data
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

          setResults(filteredResults)
          setIsOpen(filteredResults.length > 0)
          setIsLoading(false)
          onSearch?.(searchQuery, filteredResults)
        }, searchDelay)
      },
      [data, maxResults, searchDelay, onSearch]
    )

    // Handle search input
    const handleSearch = (searchQuery: string) => {
      setQuery(searchQuery)
      performSearch(searchQuery)
    }

    // Handle result selection
    const handleResultClick = (result: SearchResult) => {
      setIsOpen(false)
      setQuery('')
      setResults([])
      onResultSelect?.(result)

      // If result has URL, navigate to it
      if (result.url) {
        window.location.href = result.url
      }
    }

    // Handle click outside to close
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current)
        }
      }
    }, [])

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <SearchBar ref={ref} onSearch={handleSearch} {...props} />

        <SearchResults
          results={results}
          isOpen={isOpen}
          onResultClick={handleResultClick}
          onClose={() => setIsOpen(false)}
        />

        {/* Loading indicator */}
        {isLoading && query && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2">
            <div className="rounded-lg border border-border/50 bg-popover/95 backdrop-blur-sm shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-ring border-t-transparent" />
                <span className="text-sm text-muted-foreground">
                  Searching...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* No results */}
        {!isLoading && query && results.length === 0 && isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2">
            <div className="rounded-lg border border-border/50 bg-popover/95 backdrop-blur-sm shadow-lg p-4">
              <div className="flex items-center gap-3 text-center">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  No results found for "{query}"
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

Search.displayName = 'Search'

export { Search, type SearchResult }
