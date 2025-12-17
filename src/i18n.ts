import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  return {
    locale: 'pt',
    messages: (await import('../messages/pt.json')).default,
  }
})
