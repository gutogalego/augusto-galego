import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || 'pt'

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  }
})
