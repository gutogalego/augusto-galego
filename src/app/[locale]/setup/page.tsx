import type { Metadata } from 'next'
import { ProductivityTips } from './_components/productivity-tips'
import { SetupHero } from './_components/setup-hero'
import { SetupShowcase } from './_components/setup-showcase'

export const metadata: Metadata = {
  title: 'Setup & Produtividade',
  description:
    'Conheça o setup de trabalho e dicas de produtividade de Augusto Galego. Ferramentas, configurações e metodologias para ser mais eficiente.',
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
