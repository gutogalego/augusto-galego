import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ProductivityTips } from './_components/productivity-tips'
import { SetupHero } from './_components/setup-hero'
import { SetupShowcase } from './_components/setup-showcase'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'setup')
}

export default function SetupPage() {
  return (
    <>
      <SetupHero />
      <SetupShowcase />
      <ProductivityTips />
    </>
  )
}
