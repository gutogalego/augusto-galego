'use client'

import { usePathname, useRouter } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

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
  const currentLocale = useLocale() as 'pt' | 'en'
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: 'pt' | 'en') => {
    if (newLocale === currentLocale || isPending) {
      return
    }

    startTransition(() => {
      // Use next-intl router for proper locale switching
      router.replace(pathname, { locale: newLocale })
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
          <span>PT</span>
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
          <span>EN</span>
        </button>
      </div>
    </div>
  )
}
