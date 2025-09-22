'use client'

import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'

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

type DockProps = {
  children: React.ReactNode
  className?: string
}

type DockItemProps = {
  className?: string
  children: React.ReactNode
}

type DockLabelProps = {
  className?: string
  children: React.ReactNode
}

type DockIconProps = {
  className?: string
  children: React.ReactNode
}

function Dock({ children, className }: DockProps) {
  return (
    <div className="mx-2 flex max-w-full items-center">
      <div
        className={cn(
          'mx-auto flex w-fit gap-3 bg-card/80 border border-border/30 backdrop-blur-sm shadow-sm px-3 py-2',
          className
        )}
        style={{ borderRadius: '20px' }}
        role="toolbar"
        aria-label="Application dock"
      >
        {children}
      </div>
    </div>
  )
}

function DockItem({ children, className }: DockItemProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center h-10 rounded-lg hover:bg-muted/50 group',
        prefersReducedMotion
          ? 'transition-none'
          : 'transition-all duration-500 ease-out',
        className
      )}
    >
      {children}
    </div>
  )
}

function DockLabel({ children, className }: DockLabelProps) {
  return (
    <div
      className={cn(
        'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover border border-border px-2 py-1 text-xs text-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
        className
      )}
      role="tooltip"
    >
      {children}
    </div>
  )
}

function DockIcon({ children, className }: DockIconProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {children}
    </div>
  )
}

export { Dock, DockIcon, DockItem, DockLabel }
