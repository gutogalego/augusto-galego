'use client'

import { cn } from '@/lib/shadcn'
import { Command, Search } from 'lucide-react'
import * as React from 'react'

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
  showKeyboardShortcut?: boolean
  keyboardShortcut?: string
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      onSearch,
      showKeyboardShortcut = true,
      keyboardShortcut = '⌘ K',
      placeholder = 'Search help (e.g. integrations, importing, or billing)',
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState('')
    const [isFocused, setIsFocused] = React.useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      onSearch?.(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.currentTarget.blur()
        setQuery('')
        onSearch?.('')
      }
      props.onKeyDown?.(e)
    }

    // Global keyboard shortcut handler
    React.useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault()
          const input = document.querySelector(
            '[data-search-input]'
          ) as HTMLInputElement
          input?.focus()
        }
      }

      document.addEventListener('keydown', handleGlobalKeyDown)
      return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [])

    return (
      <div
        className={cn(
          'relative flex items-center w-full max-w-2xl mx-auto',
          className
        )}
      >
        <div className="relative flex items-center w-full">
          {/* Search Icon */}
          <Search
            className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors duration-200"
            aria-hidden={true}
          />

          {/* Input Field */}
          <input
            ref={ref}
            data-search-input={true}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              // Base styles
              'flex h-12 w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm',
              'pl-11 pr-20 py-3 text-sm font-medium',
              'placeholder:text-muted-foreground/70 placeholder:font-normal',

              // Focus styles
              'focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring',
              'focus:bg-background/80 focus:placeholder:text-muted-foreground',

              // Transitions
              'transition-all duration-200 ease-out',

              // Hover styles
              'hover:border-input/80 hover:bg-background/60',

              // Dark mode optimizations
              'dark:bg-background/30 dark:focus:bg-background/50',
              'dark:border-border/50 dark:focus:border-border'
            )}
            {...props}
          />

          {/* Keyboard Shortcut Indicator */}
          {showKeyboardShortcut && (
            <div
              className={cn(
                'absolute right-3 flex items-center gap-1 px-2 py-1',
                'rounded-md border border-border/50 bg-muted/30 backdrop-blur-sm',
                'text-xs font-medium text-muted-foreground',
                'transition-all duration-200 ease-out',
                isFocused ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              )}
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          )}
        </div>

        {/* Focus Ring Enhancement */}
        <div
          className={cn(
            'absolute inset-0 rounded-lg transition-all duration-200 ease-out pointer-events-none',
            'ring-0 ring-ring/10',
            isFocused && 'ring-4'
          )}
          aria-hidden="true"
        />
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export { SearchBar }
