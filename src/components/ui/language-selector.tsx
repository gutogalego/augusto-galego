'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { RiGlobalLine } from 'react-icons/ri'

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

export function LanguageSelector() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // Skip if already on the same locale
    if (newLocale === locale) {
      return
    }

    // Extract the path without the current locale prefix
    let pathWithoutLocale = pathname

    // Remove the current locale from the beginning of the path
    if (pathname.startsWith(`/${locale}`)) {
      pathWithoutLocale = pathname.slice(`/${locale}`.length) || '/'
    }

    // Ensure path starts with '/'
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // Navigate to the new locale (always with prefix since localePrefix is 'always')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-muted/50"
          aria-label={t('language')}
        >
          <RiGlobalLine className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-base">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
            {locale === language.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
