'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as FancyButton from '@/components/ui/fancy-button'
import { FreeLessonModal } from '@/components/ui/free-lesson-modal'
import { Link } from '@/lib/navigation'
import {
  ArrowRight,
  BookOpen,
  Clock,
  Code2,
  GraduationCap,
  Play,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState } from 'react'

const featuredCourse = {
  title: 'Estruturas de Dados e Algoritmos + LeetCode',
  description:
    'Curso completo com 68 aulas, explicações visuais e desenhos na tela. Aprenda os fundamentos que todo desenvolvedor precisa saber.',
  students: '5k+',
  lessons: 68,
  hours: '8h',
  highlights: ['Explicações visuais', 'Desenhos na tela', 'Python', 'LeetCode'],
  href: 'https://pay.hub.la/L8wi9vio7WPnWbmF8ZIO?coupon=SITEGALEGO',
}

const featuredPosts = [
  {
    title: 'Como ser um EXCELENTE programador?',
    description:
      'Dicas práticas para evoluir na carreira e se destacar no mercado de tecnologia.',
    readTime: '8 min',
    views: '52K',
    category: 'Carreira',
    href: '/blog/como-ser-excelente-programador',
  },
  {
    title: 'LeetCode vai te fazer melhorar como dev?',
    description:
      'Análise crítica sobre o uso de LeetCode e quando realmente vale a pena estudar algoritmos.',
    readTime: '12 min',
    views: '108K',
    category: 'Algoritmos',
    href: '/blog/leetcode-melhorar-dev',
  },
  {
    title: 'De Júnior no Brasil a Senior na Europa',
    description:
      'Minha jornada completa: estratégias, desafios e lições aprendidas na transição internacional.',
    readTime: '15 min',
    views: '85K',
    category: 'Carreira',
    href: '/blog/junior-brasil-senior-europa',
  },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  carreira: {
    bg: 'bg-purple-100 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-300',
  },
  algoritmos: {
    bg: 'bg-blue-100 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-300',
  },
  systemDesign: {
    bg: 'bg-green-100 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-300',
  },
}

const otherCourses = [
  {
    title: 'Roadmap pro seu próximo emprego',
    description:
      'Tudo o que você precisa saber para achar vagas no Brasil e na gringa, melhorar seu LinkedIn e ser aprovado nas entrevistas técnicas',
    status: 'available' as const,
    href: 'https://pay.hub.la/hrZKmxeXzeLN8AvObjVJ?coupon=SITEGALEGO',
    external: true,
  },
  {
    title: 'Workshop: 10 LeetCodes para Entrevistas',
    description:
      'Aprenda a resolver os 10 problemas mais cobrados em entrevistas técnicas com explicações detalhadas e estratégias de resolução',
    status: 'available' as const,
    href: 'https://pay.hub.la/RGfq0dk8iqDeL5IC5yog?coupon=SITEGALEGO2',
    external: true,
  },
  {
    title: 'Workshop: System Design para Entrevistas',
    description:
      'Domine os fundamentos de System Design e aprenda a projetar sistemas escaláveis para passar em entrevistas de grandes empresas',
    status: 'available' as const,
    href: 'https://pay.hub.la/ASHOugkp5yQfI4pdLNHx?coupon=SITEGALEGO',
    external: true,
  },
]

export function FeaturedContent() {
  const [isFreeLessonOpen, setIsFreeLessonOpen] = useState(false)

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-3 py-1">
            <TrendingUp className="mr-1 h-3 w-3" />
            Conteúdo em Destaque
          </Badge>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Aprenda com quem <span className="gradient-text">chegou lá</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cursos práticos, artigos detalhados e insights reais de quem saiu do
            Brasil e construiu uma carreira internacional em tech.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Course - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="tech-card h-full">
              <CardHeader>
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-fit">
                    <GraduationCap className="mr-1 h-3 w-3" />
                    Curso Principal
                  </Badge>
                  <CardTitle className="text-2xl">
                    {featuredCourse.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {featuredCourse.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Course Stats - Horizontal Layout */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-3xl font-bold">
                      {featuredCourse.students}
                    </div>
                    <div className="text-sm text-muted-foreground">alunos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {featuredCourse.lessons}
                    </div>
                    <div className="text-sm text-muted-foreground">aulas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {featuredCourse.hours}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      de conteúdo
                    </div>
                  </div>
                </div>

                {/* Course Highlights */}
                <div className="flex flex-wrap gap-2">
                  {featuredCourse.highlights.map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="outline"
                      className="text-xs"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsFreeLessonOpen(true)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Assista a primeira aula grátis
                  </Button>

                  <FancyButton.Root
                    size="lg"
                    className="w-full group"
                    asChild={true}
                  >
                    <a
                      href={featuredCourse.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Conheça a estrutura completa do curso e se inscreva
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </FancyButton.Root>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Mais cursos</h3>
            </div>
            {otherCourses.map((course) => (
              <Card key={course.title} className="tech-card group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild={true}
                    className="group/btn p-0 h-auto font-normal"
                  >
                    {course.external ? (
                      <a
                        href={course.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Saiba mais
                        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Link href={course.href}>
                        Saiba mais
                        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Lesson Modal */}
        <FreeLessonModal
          isOpen={isFreeLessonOpen}
          onClose={() => setIsFreeLessonOpen(false)}
          courseTitle="Estruturas de Dados e Algoritmos + LeetCode"
          videoId="g-hIXvdDeZk"
        />

        {/* Featured Blog Posts */}
        <div className="space-y-6 mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Artigos Populares</h3>
            <Button variant="outline" asChild={true}>
              <Link href="/blog">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => {
              const categoryKey = post.category
                .toLowerCase()
                .replace(/\s+/g, '')
              const colors = categoryColors[categoryKey] ?? {
                bg: 'bg-gray-100 dark:bg-gray-950',
                text: 'text-gray-700 dark:text-gray-300',
              }
              return (
                <Card
                  key={post.title}
                  className="tech-card group transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs border-0 ${colors.bg} ${colors.text}`}
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Play className="h-3 w-3" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} de leitura</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild={true}
                        className="group/btn"
                      >
                        <Link href={post.href}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Ler
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
