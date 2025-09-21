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
import Link from 'next/link'

const featuredCourse = {
  title: 'Estruturas de Dados e Algoritmos + LeetCode',
  description:
    'Curso completo com 68 aulas, explicações visuais e desenhos na tela. Aprenda os fundamentos que todo desenvolvedor precisa saber.',
  price: 'R$ 120-150',
  lessons: 68,
  students: '1000+',
  rating: 4.9,
  highlights: ['Explicações visuais', 'Desenhos na tela', 'Python', 'LeetCode'],
  href: '/courses/algoritmos-estruturas-dados',
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

const quickStats = [
  { label: 'Alunos impactados', value: '5K+', icon: Users },
  { label: 'Horas de conteúdo', value: '100+', icon: Clock },
  { label: 'Avaliação média', value: '4.9', icon: Star },
]

export function FeaturedContent() {
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
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
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
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {featuredCourse.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preço promocional
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {featuredCourse.lessons}
                    </div>
                    <div className="text-sm text-muted-foreground">Aulas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {featuredCourse.students}
                    </div>
                    <div className="text-sm text-muted-foreground">Alunos</div>
                  </div>
                  <div className="text-center flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-foreground fill-foreground" />
                    <div className="text-2xl font-bold">
                      {featuredCourse.rating}
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
                <FancyButton.Root
                  size="lg"
                  className="w-full group"
                  asChild={true}
                >
                  <Link href={featuredCourse.href}>
                    Ver Curso Completo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </FancyButton.Root>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Impacto Real</h3>
            {quickStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="tech-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Featured Blog Posts */}
        <div className="space-y-6">
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
            {featuredPosts.map((post) => (
              <Card key={post.title} className="tech-card group transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
