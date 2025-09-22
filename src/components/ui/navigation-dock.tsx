'use client'

import { scrollToTop } from '@/hooks/use-scroll-to-top'
import { Link } from '@/lib/navigation'
import { usePathname } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'
import type * as React from 'react'
import * as FancyButton from './fancy-button'

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

interface NavigationDockProps {
  items: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    isActive: boolean
  }>
  className?: string
}

export function NavigationDock({ items, className }: NavigationDockProps) {
  const prefersReducedMotion = useReducedMotion()
  const currentPathname = usePathname()

  const handleLinkClick = (href: string, isActive: boolean) => {
    // Se já estiver na página atual, rola para o topo
    if (isActive || currentPathname === href) {
      scrollToTop({ behavior: 'smooth' })
    }
  }

  return (
    <div className="mx-2 flex max-w-full items-center relative">
      <div
        className={cn(
          'mx-auto flex gap-2 bg-card/80 border border-border/30 backdrop-blur-sm px-3 py-2 relative',
          prefersReducedMotion
            ? 'transition-none'
            : 'transition-all duration-500 ease-out',
          className
        )}
        style={{ borderRadius: '20px' }}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.isActive

          return (
            <div
              key={item.href}
              className={cn(
                'relative flex items-center justify-center h-10 rounded-lg group flex-shrink-0',
                prefersReducedMotion
                  ? 'transition-none'
                  : 'transition-all duration-500 ease-out',
                isActive ? 'w-[120px]' : 'w-10'
              )}
            >
              <FancyButton.Root
                size="sm"
                asChild={true}
                variant={isActive ? 'basic' : 'ghost'}
                className={cn(
                  'relative overflow-hidden w-full',
                  prefersReducedMotion
                    ? 'transition-none'
                    : 'transition-all duration-500 ease-out'
                )}
              >
                <Link
                  href={item.href}
                  prefetch={true}
                  onClick={() => handleLinkClick(item.href, isActive)}
                  className={cn(
                    'flex items-center py-2 relative z-10 w-full',
                    prefersReducedMotion
                      ? 'transition-none'
                      : 'transition-all duration-500 ease-out',
                    isActive ? 'justify-center px-4' : 'justify-center px-0'
                  )}
                >
                  <FancyButton.Icon as={Icon} />
                  <span
                    className={cn(
                      'text-sm font-medium whitespace-nowrap overflow-hidden',
                      prefersReducedMotion
                        ? 'transition-none'
                        : 'transition-[max-width,margin] duration-500 ease-out',
                      isActive
                        ? 'opacity-100 max-w-[80px] ml-2 relative'
                        : 'opacity-0 max-w-0 ml-0 absolute'
                    )}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: prefersReducedMotion
                        ? 'none'
                        : 'max-width 500ms ease-out, margin 500ms ease-out',
                    }}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 -translate-x-full animate-[shine_2s_ease-in-out_infinite]" />
                  )}
                </Link>
              </FancyButton.Root>
              {!isActive && (
                <div
                  className={cn(
                    'absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover border border-border px-3 py-2 text-xs text-foreground shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none z-[100]',
                    prefersReducedMotion
                      ? 'transition-none'
                      : 'transition-opacity duration-200'
                  )}
                  role="tooltip"
                >
                  {item.name}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
