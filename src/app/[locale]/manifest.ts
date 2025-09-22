import type { MetadataRoute } from 'next'

export default async function manifest({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<MetadataRoute.Manifest> {
  const { locale } = await params
  const isPortuguese = locale === 'pt'

  return {
    name: isPortuguese
      ? 'Augusto Galego - CTO, Backend Engineer e Educador'
      : 'Augusto Galego - CTO, Backend Engineer and Educator',
    short_name: 'Augusto Galego',
    description: isPortuguese
      ? 'Site oficial de Augusto Galego - CTO, Backend Engineer e Educador especialista em algoritmos e estruturas de dados'
      : 'Official website of Augusto Galego - CTO, Backend Engineer and Educator specializing in algorithms and data structures',
    start_url: `/${locale}`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
