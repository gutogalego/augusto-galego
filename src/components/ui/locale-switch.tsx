'use client'

import { cn } from '@/lib/shadcn'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface LocaleSwitchProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function LocaleSwitch({
  className,
  variant = 'default',
}: LocaleSwitchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Detect current locale from URL
  const getCurrentLocaleFromUrl = (): 'pt' | 'en' => {
    // Check if URL starts with /en or /pt
    if (pathname.startsWith('/en')) {
      return 'en'
    }
    if (pathname.startsWith('/pt')) {
      return 'pt'
    }
    // Default to Portuguese if no locale prefix found
    return 'pt'
  }

  const currentLocale = getCurrentLocaleFromUrl()

  const handleLocaleChange = async (newLocale: 'pt' | 'en') => {
    // Skip if already on the same locale or transitioning
    if (newLocale === currentLocale || isTransitioning) {
      return
    }

    setIsTransitioning(true)

    try {
      let newPath: string

      if (currentLocale === 'pt' && pathname === '/') {
        // From root Portuguese to English
        newPath = '/en'
      } else if (currentLocale === 'pt') {
        // From Portuguese path to English
        newPath = `/en${pathname}`
      } else if (currentLocale === 'en' && pathname === '/en') {
        // From English root to Portuguese root
        newPath = '/'
      } else if (currentLocale === 'en') {
        // From English path to Portuguese
        const pathWithoutLocale = pathname.slice('/en'.length) || '/'
        newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale
      } else {
        // Fallback case
        newPath = newLocale === 'pt' ? pathname : `/en${pathname}`
      }

      router.push(newPath)
    } catch (error) {
      console.error('Error changing locale:', error)
    } finally {
      // Reset transition state after a delay
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const isPortuguese = currentLocale === 'pt'
  const isEnglish = currentLocale === 'en'

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <button
          type="button"
          onClick={() => handleLocaleChange('pt')}
          disabled={isTransitioning}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isPortuguese
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            isTransitioning && 'opacity-50 cursor-not-allowed'
          )}
        >
          PT
        </button>
        <span className="text-muted-foreground/50">|</span>
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isTransitioning}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isEnglish
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            isTransitioning && 'opacity-50 cursor-not-allowed'
          )}
        >
          EN
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      {/* Switch Container */}
      <div className="relative flex items-center bg-muted/50 rounded-full p-1 border border-border/30">
        {/* Background Slider */}
        <div
          className={cn(
            'absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-full shadow-sm transition-all duration-300 ease-out border border-border/20',
            isEnglish ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
          )}
        />

        {/* Portuguese Button */}
        <button
          type="button"
          onClick={() => handleLocaleChange('pt')}
          disabled={isTransitioning}
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isPortuguese
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
            isTransitioning && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="text-base">🇧🇷</span>
          <span>PT</span>
        </button>

        {/* English Button */}
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isTransitioning}
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isEnglish
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
            isTransitioning && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="text-base">🇺🇸</span>
          <span>EN</span>
        </button>
      </div>
    </div>
  )
}
