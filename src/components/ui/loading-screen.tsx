'use client'

import { LogoIcon } from '@/components/common'
import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isLoading: boolean
  className?: string
  debounceMs?: number // Tempo de debounce em ms (padrão: 1500ms)
}

export function LoadingScreen({
  isLoading,
  className,
  debounceMs = 1500,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showScreen, setShowScreen] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const debounceTimeout = setTimeout(() => {
        setShouldShow(true)
        setShowScreen(true)
        setProgress(0)
      }, debounceMs)

      return () => {
        clearTimeout(debounceTimeout)
        setShouldShow(false)
      }
    }

    setShouldShow(false)
    if (showScreen) {
      setProgress(100)
      const timeout = setTimeout(() => {
        setShowScreen(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, showScreen, debounceMs])

  useEffect(() => {
    if (shouldShow && showScreen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }

          const increment =
            prev < 50 ? Math.random() * 20 + 10 : Math.random() * 5 + 2
          return Math.min(prev + increment, 100)
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [shouldShow, showScreen])

  if (!showScreen) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-background',
        'transition-opacity duration-300',
        isLoading || progress < 100 ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Icon */}
        <div className="mb-4">
          <LogoIcon className="h-12 w-12 text-foreground animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="flex items-center space-x-2 font-mono text-sm text-muted-foreground">
          <span>»</span>
          <span>LOADING</span>
          <span>-</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* URL display */}
        <div className="absolute bottom-8 right-8">
          <p className="font-mono text-xs text-muted-foreground/40 tracking-wider">
            {typeof window !== 'undefined'
              ? window.location.href.toUpperCase()
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
