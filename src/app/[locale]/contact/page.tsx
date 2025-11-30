import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ContactForm } from './_components/contact-form'
import { ContactHero } from './_components/contact-hero'
import { ContactInfo } from './_components/contact-info'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'contact')
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  )
}
