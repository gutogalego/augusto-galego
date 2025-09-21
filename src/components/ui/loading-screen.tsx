'use client'

import { LogoIcon } from '@/components/common'
import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isLoading: boolean
  className?: string
}

export function LoadingScreen({ isLoading, className }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showScreen, setShowScreen] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowScreen(true)
      setProgress(0)

      // Simula progresso de carregamento
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          // Progresso mais rápido no início, mais lento no final
          const increment =
            prev < 50 ? Math.random() * 20 + 10 : Math.random() * 5 + 2
          return Math.min(prev + increment, 100)
        })
      }, 150)

      return () => clearInterval(interval)
    }

    // Quando parar de carregar, completa rapidamente e depois esconde
    setProgress(100)
    const timeout = setTimeout(() => {
      setShowScreen(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [isLoading])

  if (!showScreen) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background',
        'transition-opacity duration-300',
        isLoading || progress < 100 ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Icon */}
        <div className="mb-4">
          <LogoIcon className="h-12 w-12 text-foreground" />
        </div>

        {/* Loading text */}
        <div className="flex items-center space-x-2 font-mono text-sm text-muted-foreground">
          <span>»</span>
          <span>LOADING</span>
          <span>-</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
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
