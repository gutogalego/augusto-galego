import type { Metadata } from 'next'
import { ContactForm } from './_components/contact-form'
import { ContactHero } from './_components/contact-hero'
import { ContactInfo } from './_components/contact-info'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com Augusto Galego para mentorias, parcerias ou dúvidas sobre carreira em tech e algoritmos.',
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
