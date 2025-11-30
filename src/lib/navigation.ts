import { createNavigation } from 'next-intl/navigation'

export const locales = ['pt', 'en'] as const
export const defaultLocale = 'pt' as const

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'always',
})
