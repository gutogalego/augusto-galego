import type { Metadata } from 'next'
import { AboutHero, Philosophy, TechStack, Timeline } from './_components'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a trajetória de Augusto Galego: de desenvolvedor júnior no Brasil a CTO nos EUA. Especialista em algoritmos, estruturas de dados e educação em tech.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Timeline />
      <TechStack />
      <Philosophy />
    </>
  )
}
