'use client'

import { Badge } from '@/components/ui/badge'
import * as FancyButton from '@/components/ui/fancy-button'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Map as MapIcon,
  Sparkles,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'

interface CourseCardProps {
  title: string
  subtitle: string
  description: string
  bulletPoints: string[]
  icon: React.ReactNode
  stats: { label: string; value: string }[]
  ctaText: string
  href: string
  badge?: string
  accentColor: string
}

function CourseCard({
  title,
  subtitle,
  description,
  bulletPoints,
  icon,
  stats,
  ctaText,
  badge,
  accentColor,
}: CourseCardProps) {
  return (
    <div className="group relative h-full flex flex-col p-8 lg:p-12">
      <div className="flex-1 space-y-5">
        {badge && (
          <Badge
            variant="outline"
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            <Sparkles className="mr-1 h-3 w-3" />
            {badge}
          </Badge>
        )}

        <div className="space-y-3">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <div style={{ color: accentColor }}>{icon}</div>
          </div>

          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {subtitle}
          </p>

          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>

          {bulletPoints.length > 0 && (
            <ul className="space-y-2 pt-2">
              {bulletPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-6 pt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <FancyButton.Root
          size="default"
          className="group/btn w-full justify-center"
          style={
            {
              '--fancy-button-bg': accentColor,
            } as React.CSSProperties
          }
        >
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </FancyButton.Root>
      </div>
    </div>
  )
}

export function CoursesHero() {
  const locale = useLocale()
  const isPt = locale === 'pt'

  const courses = {
    algorithms: {
      title: isPt
        ? 'Aprenda algoritmos na prática'
        : 'Learn algorithms hands-on',
      subtitle: isPt ? 'Curso Principal' : 'Main Course',
      description: isPt
        ? 'Domine estruturas de dados e algoritmos com explicações visuais e exercícios práticos do LeetCode.'
        : 'Master data structures and algorithms with visual explanations and practical LeetCode exercises.',
      bulletPoints: isPt
        ? [
            'Arrays, Strings, Hash Tables, Trees, Graphs',
            'Sliding Window, Two Pointers, BFS/DFS',
            '150+ exercícios resolvidos do LeetCode',
            'Explicações visuais e animadas',
          ]
        : [
            'Arrays, Strings, Hash Tables, Trees, Graphs',
            'Sliding Window, Two Pointers, BFS/DFS',
            '150+ solved LeetCode exercises',
            'Visual and animated explanations',
          ],
      icon: <BookOpen className="h-7 w-7" />,
      stats: [
        { label: isPt ? 'Alunos' : 'Students', value: '5K+' },
        { label: isPt ? 'Aulas' : 'Lessons', value: '150+' },
        { label: isPt ? 'Avaliação' : 'Rating', value: '4.9' },
      ],
      ctaText: isPt ? 'Começar Agora' : 'Start Now',
      href: '#',
      badge: isPt ? 'Mais Popular' : 'Most Popular',
      accentColor: '#6366f1',
    },
    roadmap: {
      title: isPt
        ? 'Roadmap pro seu próximo emprego'
        : 'Roadmap to your next job',
      subtitle: isPt ? 'Guia de Carreira' : 'Career Guide',
      description: isPt
        ? 'Plano passo a passo para conseguir seu emprego dos sonhos em tech.'
        : 'Step-by-step plan to land your dream tech job.',
      bulletPoints: isPt
        ? [
            'Currículo que passa pelo ATS',
            'LinkedIn otimizado para recrutadores',
            'Preparação para entrevistas técnicas',
            'Negociação salarial e ofertas',
          ]
        : [
            'ATS-friendly resume templates',
            'LinkedIn optimized for recruiters',
            'Technical interview preparation',
            'Salary negotiation strategies',
          ],
      icon: <MapIcon className="h-7 w-7" />,
      stats: [
        { label: isPt ? 'Módulos' : 'Modules', value: '12' },
        { label: isPt ? 'Templates' : 'Templates', value: '25+' },
        { label: isPt ? 'Horas' : 'Hours', value: '20+' },
      ],
      ctaText: isPt ? 'Ver Roadmap' : 'View Roadmap',
      href: '#',
      badge: isPt ? 'Novo' : 'New',
      accentColor: '#10b981',
    },
    comingSoon: {
      title: isPt ? 'System Design na Prática' : 'System Design in Practice',
      subtitle: isPt ? 'Em Breve' : 'Coming Soon',
      description: isPt
        ? 'Aprenda a projetar sistemas escaláveis como os usados por Netflix, Uber e Google.'
        : 'Learn to design scalable systems like those used by Netflix, Uber, and Google.',
      bulletPoints: isPt
        ? [
            'Arquitetura de microserviços',
            'Escalabilidade e performance',
            'Casos reais: Netflix, Uber, Twitter',
            'Entrevistas de System Design',
          ]
        : [
            'Microservices architecture',
            'Scalability and performance',
            'Real cases: Netflix, Uber, Twitter',
            'System Design interviews',
          ],
      icon: <Briefcase className="h-7 w-7" />,
      stats: [
        { label: isPt ? 'Projetos' : 'Projects', value: '8' },
        { label: isPt ? 'Casos' : 'Cases', value: '15+' },
        { label: isPt ? 'Horas' : 'Hours', value: '30+' },
      ],
      ctaText: isPt ? 'Lista de Espera' : 'Join Waitlist',
      href: '#',
      accentColor: '#f59e0b',
    },
  }

  return (
    <section className="min-h-screen">
      <div className="w-full px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 lg:mb-12">
            <div className="relative">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden ring-2 ring-border/20 ring-offset-2 ring-offset-background">
                <Image
                  src="/galego-picture-clean.png"
                  alt="Augusto Galego"
                  width={80}
                  height={80}
                  className="object-cover object-top w-full h-full"
                  priority={true}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">
                {isPt ? 'Cursos do' : 'Courses by'}
              </p>
              <p className="text-xl lg:text-2xl font-bold tracking-tight">
                Augusto Galego
              </p>
              <p className="text-xs text-muted-foreground">
                {isPt ? 'CTO • 10+ anos em tech' : 'CTO • 10+ years in tech'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[500px]">
                <CourseCard {...courses.algorithms} />
                <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px bg-border/40" />
              </div>

              <div className="relative min-h-[500px]">
                <div className="lg:hidden w-full h-px bg-border/40" />
                <CourseCard {...courses.roadmap} />
              </div>
            </div>

            <div
              className="w-full h-px bg-border/40 mx-8"
              style={{ width: 'calc(100% - 4rem)' }}
            />

            <div className="relative min-h-[400px]">
              <CourseCard {...courses.comingSoon} />
            </div>
          </div>

          <div className="mt-16 lg:mt-24">
            <div className="w-full h-px bg-border/40 mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
                <Image
                  src="/tower.jpg"
                  alt="Augusto Galego"
                  fill={true}
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {isPt ? 'Sobre o Instrutor' : 'About the Instructor'}
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                    {isPt ? 'Quem é o Galego?' : 'Who is Galego?'}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {(isPt
                    ? [
                        'CTO de startup americana, liderando equipe de engenharia',
                        '10+ anos de experiência',
                        'Trabalhei em Berlim, remoto para Austrália, e agora EUA',
                        'Na área de tech desde 2014',
                        'Criei serviços do zero que atenderam dezenas de milhares de usuários',
                        'Mantive sistemas B2B com centenas de milhares de usuários e milhões de transações mensais',
                        'Implementei sistemas RAG do zero e trabalhei com observabilidade de sistemas de IA distribuídos',
                        'Stack: Python, Node, React, Django, AWS, Serverless, GraphQL, Next.js, TypeScript, Postgres, DynamoDB',
                      ]
                    : [
                        'CTO of American startup, leading engineering team',
                        '10+years of experience as a Backend Engineer',
                        'Worked in Berlin, remote for Australia, and now USA',
                        'In tech since 2014',
                        'Built services from scratch serving tens of thousands of users',
                        'Maintained B2B systems with hundreds of thousands of users and millions of monthly transactions',
                        'Implemented RAG systems from scratch and worked on observability of distributed AI systems',
                        'Optimized Python backends reducing response times by up to 80%',
                        'Stack: Python, Node, React, Django, AWS, Serverless, GraphQL, Next.js, TypeScript, Postgres, DynamoDB',
                      ]
                  ).map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base text-muted-foreground"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
