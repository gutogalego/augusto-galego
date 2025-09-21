import type { Metadata } from 'next'
import { CoursesCatalog } from './_components/courses-catalog'
import { CoursesHero } from './_components/courses-hero'
import { CoursesTestimonials } from './_components/courses-testimonials'

export const metadata: Metadata = {
  title: 'Cursos',
  description:
    'Cursos práticos sobre algoritmos, estruturas de dados e carreira em tech. Aprenda com quem saiu do Brasil e chegou ao topo na Europa e EUA.',
}

export default function CoursesPage() {
  return (
    <>
      <CoursesHero />
      <CoursesCatalog />
      <CoursesTestimonials />
    </>
  )
}
