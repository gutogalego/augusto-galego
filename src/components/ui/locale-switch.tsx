'use client'

import { usePathname, useRouter } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import { useLocale } from 'next-intl'
import { useRouter as useNextRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

interface LocaleSwitchProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function LocaleSwitch({
  className,
  variant = 'default',
}: LocaleSwitchProps) {
  const nextRouter = useNextRouter()
  const pathname = usePathname()
  const hookLocale = useLocale()
  const [isPending, startTransition] = useTransition()

  const detectLocaleFromPathname = useCallback((): 'pt' | 'en' => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (currentPath.startsWith('/en')) {
        return 'en'
      }
      if (currentPath.startsWith('/pt')) {
        return 'pt'
      }
    }

    if (pathname.startsWith('/en')) {
      return 'en'
    }
    if (pathname.startsWith('/pt')) {
      return 'pt'
    }
    return (hookLocale as 'pt' | 'en') || 'pt'
  }, [pathname, hookLocale])

  const [currentLocale, setCurrentLocale] = useState<'pt' | 'en'>(() =>
    detectLocaleFromPathname()
  )

  useEffect(() => {
    const newLocale = detectLocaleFromPathname()
    setCurrentLocale(newLocale)
  }, [detectLocaleFromPathname])

  const handleLocaleChange = (newLocale: 'pt' | 'en') => {
    // Skip if already on the same locale or transitioning
    if (newLocale === currentLocale || isPending) {
      return
    }

    setCurrentLocale(newLocale)

    startTransition(() => {
      // Use window.location to get the actual current path
      const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : pathname

      // Remove current locale prefix if it exists
      let pathWithoutLocale = currentPath
      if (currentPath.startsWith(`/${currentLocale}`)) {
        pathWithoutLocale = currentPath.slice(`/${currentLocale}`.length) || '/'
      }

      // Ensure path starts with '/'
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = `/${pathWithoutLocale}`
      }

      // Build new path with new locale
      const newPath = `/${newLocale}${pathWithoutLocale}`

      // Debug: uncomment for troubleshooting
      // console.log('Locale Switch:', { currentLocale, newLocale, currentPath, pathWithoutLocale, newPath })

      // Use Next.js router directly for more reliable navigation
      nextRouter.push(newPath)
    })
  }

  const getLanguageName = (locale: 'pt' | 'en') => {
    return locale === 'pt' ? 'Português' : 'English'
  }

  const getCurrentLanguageInfo = () => {
    return {
      code: currentLocale,
      name: getLanguageName(currentLocale),
      flag: currentLocale === 'pt' ? '🇧🇷' : '🇺🇸',
    }
  }

  const isPortuguese = currentLocale === 'pt'
  const isEnglish = currentLocale === 'en'

  if (variant === 'compact') {
    const currentLang = getCurrentLanguageInfo()

    return (
      <div
        className={cn('flex items-center gap-1', className)}
        title={`Idioma atual: ${currentLang.name}`}
      >
        <button
          type="button"
          onClick={() => handleLocaleChange('pt')}
          disabled={isPending || isPortuguese}
          aria-label={`Mudar para ${getLanguageName('pt')}`}
          title={
            isPortuguese
              ? `Idioma atual: ${getLanguageName('pt')}`
              : `Mudar para ${getLanguageName('pt')}`
          }
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isPortuguese
              ? 'bg-primary text-primary-foreground cursor-default'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            (isPending || isPortuguese) && 'cursor-not-allowed',
            isPending && 'opacity-50'
          )}
        >
          PT
          {isPortuguese && (
            <span className="ml-1 text-[10px]" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
        <span className="text-muted-foreground/50">|</span>
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isPending || isEnglish}
          aria-label={`Switch to ${getLanguageName('en')}`}
          title={
            isEnglish
              ? `Current language: ${getLanguageName('en')}`
              : `Switch to ${getLanguageName('en')}`
          }
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isEnglish
              ? 'bg-primary text-primary-foreground cursor-default'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            (isPending || isEnglish) && 'cursor-not-allowed',
            isPending && 'opacity-50'
          )}
        >
          EN
          {isEnglish && (
            <span className="ml-1 text-[10px]" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
      </div>
    )
  }

  const currentLang = getCurrentLanguageInfo()

  return (
    <div
      className={cn('flex items-center', className)}
      title={`Idioma atual: ${currentLang.name}`}
    >
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
          disabled={isPending || isPortuguese}
          aria-label={`Mudar para ${getLanguageName('pt')}`}
          title={
            isPortuguese
              ? `Idioma atual: ${getLanguageName('pt')}`
              : `Mudar para ${getLanguageName('pt')}`
          }
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isPortuguese
              ? 'text-foreground cursor-default'
              : 'text-muted-foreground hover:text-foreground',
            (isPending || isPortuguese) && 'cursor-not-allowed',
            isPending && 'opacity-50'
          )}
        >
          <span className="text-base">🇧🇷</span>
          <span className="flex items-center gap-1">
            PT
            {isPortuguese && (
              <span className="text-xs" aria-hidden="true">
                ✓
              </span>
            )}
          </span>
        </button>

        {/* English Button */}
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isPending || isEnglish}
          aria-label={`Switch to ${getLanguageName('en')}`}
          title={
            isEnglish
              ? `Current language: ${getLanguageName('en')}`
              : `Switch to ${getLanguageName('en')}`
          }
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isEnglish
              ? 'text-foreground cursor-default'
              : 'text-muted-foreground hover:text-foreground',
            (isPending || isEnglish) && 'cursor-not-allowed',
            isPending && 'opacity-50'
          )}
        >
          <span className="text-base">🇺🇸</span>
          <span className="flex items-center gap-1">
            EN
            {isEnglish && (
              <span className="text-xs" aria-hidden="true">
                ✓
              </span>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
