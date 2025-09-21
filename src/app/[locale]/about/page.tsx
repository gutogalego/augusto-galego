import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { AboutHero, Philosophy } from './_components'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'about')
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Philosophy />
    </>
  )
}
