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
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const currentLocale = locale as 'pt' | 'en'

  const handleLocaleChange = (newLocale: 'pt' | 'en') => {
    // Skip if already on the same locale or transitioning
    if (newLocale === currentLocale || isPending) {
      return
    }

    startTransition(() => {
      // Use next-intl's router which handles locale switching automatically
      router.replace(pathname, { locale: newLocale })
    })
  }

  const isPortuguese = currentLocale === 'pt'
  const isEnglish = currentLocale === 'en'

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <button
          type="button"
          onClick={() => handleLocaleChange('pt')}
          disabled={isPending}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isPortuguese
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            isPending && 'opacity-50 cursor-not-allowed'
          )}
        >
          PT
        </button>
        <span className="text-muted-foreground/50">|</span>
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isPending}
          className={cn(
            'px-2 py-1 text-xs font-medium rounded transition-all duration-200',
            isEnglish
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            isPending && 'opacity-50 cursor-not-allowed'
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
          disabled={isPending}
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isPortuguese
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
            isPending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="text-base">🇧🇷</span>
          <span>PT</span>
        </button>

        {/* English Button */}
        <button
          type="button"
          onClick={() => handleLocaleChange('en')}
          disabled={isPending}
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 min-w-[80px] justify-center',
            isEnglish
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
            isPending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="text-base">🇺🇸</span>
          <span>EN</span>
        </button>
      </div>
    </div>
  )
}
