import { NewsletterSection } from '@/components/common'
import type { Metadata } from 'next'
import { FeaturedContent, HeroSection, YouTubeChannels } from './_components'

export const metadata: Metadata = {
  title: 'Augusto Galego',
  description:
    'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech. De júnior no Brasil a CTO nos EUA em 9+ anos.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedContent />
      <YouTubeChannels />
      <NewsletterSection />
    </>
  )
}
