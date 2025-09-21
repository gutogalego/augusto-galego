import { NewsletterSection } from '@/components/common'
import type { Metadata } from 'next'
import { FeaturedContent, HeroSection, YouTubeChannels } from './_components'

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
