import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { CoursesHero } from './_components/courses-hero'
import { CoursesTestimonials } from './_components/courses-testimonials'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'courses')
}

export default function CoursesPage() {
  return (
    <>
      <CoursesHero />
      <CoursesTestimonials />
    </>
  )
}
