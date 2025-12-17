import { defaultLocale, locales } from '@/lib/navigation'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Never show the locale in the URL
  localePrefix: 'never',

  // Ensure proper redirect behavior
  alternateLinks: false,
})

export const config = {
  // Match only internationalized pathnames
  // This matcher ensures all routes are handled by the middleware
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
