'use client'

import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'
import * as FancyButton from './fancy-button'

// Hook para detectar preferência de movimento reduzido
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

interface AnimatedTabsProps {
  tabs: string[]
  defaultTab?: string
  onTabChange?: (tab: string) => void
  className?: string
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onTabChange,
  className,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])
  const prefersReducedMotion = useReducedMotion()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="mx-2 flex max-w-full items-center">
      <div
        className={cn(
          'mx-auto flex w-fit gap-2 bg-card/80 border border-border/30 backdrop-blur-sm shadow-sm px-3 py-2',
          className
        )}
        style={{ borderRadius: '20px' }}
        role="tablist"
        aria-label="Animated tabs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab

          return (
            <div
              key={tab}
              className={cn(
                'relative inline-flex items-center justify-center h-10 rounded-lg group',
                prefersReducedMotion
                  ? 'transition-none'
                  : 'transition-all duration-500 ease-out',
                isActive ? 'w-auto' : 'w-auto'
              )}
            >
              {isActive ? (
                <FancyButton.Root size="sm" asChild={true}>
                  <button
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className="flex items-center gap-2 px-4 py-2"
                    role="tab"
                    aria-selected="true"
                    tabIndex={0}
                  >
                    <span className="text-sm font-medium whitespace-nowrap">
                      {tab}
                    </span>
                  </button>
                </FancyButton.Root>
              ) : (
                <button
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={cn(
                    'flex h-full items-center justify-center rounded-lg text-muted-foreground hover:text-foreground px-4 py-2',
                    prefersReducedMotion
                      ? 'transition-none'
                      : 'transition-colors duration-300'
                  )}
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <span className="text-sm font-medium whitespace-nowrap">
                    {tab}
                  </span>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
