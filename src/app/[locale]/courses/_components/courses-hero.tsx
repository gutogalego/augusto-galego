'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import * as FancyButton from '@/components/ui/fancy-button'
import { FreeLessonModal } from '@/components/ui/free-lesson-modal'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Map as MapIcon,
  Package,
  Play,
  Sparkles,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
  external?: boolean
  freeVideoId?: string
}

function CourseCard({
  title,
  subtitle,
  description,
  bulletPoints,
  icon,
  stats,
  ctaText,
  href,
  badge,
  accentColor,
  external,
  freeVideoId,
}: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

      <div className="pt-8 space-y-3">
        {freeVideoId && (
          <Button
            variant="outline"
            size="default"
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Play className="mr-2 h-4 w-4" />
            Assista a primeira aula grátis
          </Button>
        )}

        <FancyButton.Root
          size="default"
          className="group/btn w-full justify-center"
          asChild={true}
          style={
            {
              '--fancy-button-bg': accentColor,
            } as React.CSSProperties
          }
        >
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <a href={href}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          )}
        </FancyButton.Root>
      </div>

      {freeVideoId && (
        <FreeLessonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseTitle={title}
          videoId={freeVideoId}
        />
      )}
    </div>
  )
}

export function CoursesHero() {
  const courses = {
    algorithms: {
      title: 'Estruturas de Dados e Algoritmos + LeetCode',
      subtitle: 'Curso Principal',
      description:
        'Curso completo com 68 aulas, explicações visuais e desenhos na tela. Aprenda os fundamentos que todo desenvolvedor precisa saber, incluindo as principais estruturas de dados e algoritmos mais cobrados em entrevistas técnicas.',
      bulletPoints: [
        'Arrays, Strings, Hash Tables, Trees, Graphs e muito mais',
        'Sliding Window, Two Pointers, BFS/DFS, Dynamic Programming',
        'Mais de 50 exercícios resolvidos do LeetCode',
        'Explicações visuais e desenhos animados na tela',
        'Python como linguagem principal',
      ],
      icon: <BookOpen className="h-7 w-7" />,
      stats: [
        { label: 'Alunos', value: '5K+' },
        { label: 'Aulas', value: '50+' },
        { label: 'Avaliação', value: '4.9' },
      ],
      ctaText: 'Começar Agora',
      href: 'https://pay.hub.la/L8wi9vio7WPnWbmF8ZIO?coupon=SITEGALEGO',
      badge: 'Mais Popular',
      accentColor: '#6366f1',
      freeVideoId: 'g-hIXvdDeZk',
      external: true,
    },
    roadmap: {
      title: 'Roadmap pro seu próximo emprego',
      subtitle: 'Guia de Carreira',
      description:
        'Tudo o que você precisa saber para achar vagas no Brasil e na gringa, melhorar seu LinkedIn e ser aprovado nas entrevistas técnicas. Um guia completo com estratégias práticas para conseguir o emprego dos seus sonhos.',
      bulletPoints: [
        'Como criar um currículo que passa pelo ATS',
        'LinkedIn otimizado para atrair recrutadores',
        'Estratégias para preparação de entrevistas técnicas e comportamentais',
        'Templates prontos de currículo e mensagens',
        'Dicas de networking e busca de vagas internacionais',
      ],
      icon: <MapIcon className="h-7 w-7" />,
      stats: [
        { label: 'Módulos', value: '5+' },
        { label: 'Professores', value: '5' },
        { label: 'Horas', value: '6' },
      ],
      ctaText: 'Ver Roadmap',
      href: 'https://pay.hub.la/hrZKmxeXzeLN8AvObjVJ?coupon=SITEGALEGO',
      badge: 'Novo',
      accentColor: '#10b981',
      external: true,
    },
    workshopLeetCode: {
      title: 'Workshop: 10 LeetCodes para Entrevistas',
      subtitle: 'Workshop Prático',
      description:
        'Aprenda a resolver os 10 problemas de algoritmos mais cobrados em entrevistas técnicas de empresas como Google, Meta, Amazon e outras FAANGs. Explicações detalhadas com estratégias de resolução passo a passo.',
      bulletPoints: [
        'Os 10 problemas mais cobrados em entrevistas de FAANGs',
        'Estratégias de resolução explicadas passo a passo',
        'Técnicas para otimização de complexidade de tempo e espaço',
        'Dicas para se comunicar bem durante a entrevista',
        'Preparação focada e objetiva para entrevistas',
      ],
      icon: <BookOpen className="h-7 w-7" />,
      stats: [
        { label: 'Problemas', value: '10' },
        { label: 'Nível', value: 'Médio' },
      ],
      ctaText: 'Ver Workshop',
      href: 'https://pay.hub.la/RGfq0dk8iqDeL5IC5yog?coupon=SITEGALEGO2',
      accentColor: '#3b82f6',
      external: true,
    },
    workshopSystemDesign: {
      title: 'Workshop: System Design para Entrevistas',
      subtitle: 'Workshop Prático',
      description:
        'Domine os fundamentos de System Design e aprenda a projetar sistemas escaláveis para passar em entrevistas de grandes empresas de tecnologia. Aprenda na prática como funcionam sistemas distribuídos.',
      bulletPoints: [
        'Fundamentos de arquitetura distribuída e escalabilidade',
        'Problemas práticos de System Design resolvidos',
        'Exemplos de sistemas reais: cache, load balancer, CDN',
        'Framework para resolver qualquer problema de System Design',
        'Preparação específica para entrevistas FAANG',
      ],
      icon: <Briefcase className="h-7 w-7" />,
      stats: [
        { label: 'Horas', value: '4+' },
        { label: 'Nível', value: 'Médio' },
      ],
      ctaText: 'Ver Workshop',
      href: 'https://pay.hub.la/ASHOugkp5yQfI4pdLNHx?coupon=SITEGALEGO',
      accentColor: '#10b981',
      external: true,
    },
    systemDesignFull: {
      title: 'System Design na Prática',
      subtitle: 'Em Breve',
      description:
        'Curso completo para projetar sistemas escaláveis como Netflix, Uber e Google.',
      bulletPoints: [
        'Arquitetura de microserviços',
        'Escalabilidade e performance',
        'Casos reais: Netflix, Uber, Twitter',
        'Projetos práticos completos',
      ],
      icon: <Briefcase className="h-7 w-7" />,
      stats: [
        { label: 'Projetos', value: '8' },
        { label: 'Casos', value: '15+' },
        { label: 'Horas', value: '30+' },
      ],
      ctaText: 'Lista de Espera',
      href: '#',
      accentColor: '#f59e0b',
    },
    mentoring: {
      title: 'Mentorias 1:1',
      subtitle: 'Em Breve',
      description:
        'Sessões individuais de mentoria para acelerar sua carreira em tech com orientação personalizada.',
      bulletPoints: [
        'Revisão de currículo e LinkedIn',
        'Preparação para entrevistas',
        'Planejamento de carreira',
        'Estratégias de crescimento',
      ],
      icon: <MapIcon className="h-7 w-7" />,
      stats: [
        { label: 'Sessões', value: '1:1' },
        { label: 'Duração', value: '1h' },
        { label: 'Formato', value: 'Online' },
      ],
      ctaText: 'Lista de Espera',
      href: '#',
      accentColor: '#8b5cf6',
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
              <p className="text-sm font-medium text-foreground">Cursos do</p>
              <p className="text-xl lg:text-2xl font-bold tracking-tight">
                Augusto Galego
              </p>
              <p className="text-xs text-muted-foreground">
                CTO • 10+ anos em tech
              </p>
            </div>
          </div>

          {/* Combo Banner - Featured */}
          <div className="mb-12 lg:mb-16">
            <Card className="tech-card relative overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10" />

              <div className="relative p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        variant="outline"
                        className="px-2.5 py-0.5 text-xs font-medium border-purple-500/50 text-purple-600 dark:text-purple-400"
                      >
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        Melhor Oferta
                      </Badge>
                      <Badge
                        variant="outline"
                        className="px-2.5 py-0.5 text-xs font-medium border-green-500/50 text-green-600 dark:text-green-400"
                      >
                        <Package className="mr-1 h-3 w-3" />
                        Combo Completo
                      </Badge>
                    </div>

                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                        Combo com TODOS os cursos
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        Tenha acesso completo aos 4 cursos e acelere sua
                        carreira em tech com o pacote mais completo.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        '✓ Estruturas de Dados e Algoritmos + LeetCode',
                        '✓ Roadmap pro seu próximo emprego',
                        '✓ Workshop: 10 LeetCodes para Entrevistas',
                        '✓ Workshop: System Design para Entrevistas',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm font-medium"
                        >
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-4">
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-muted-foreground mb-1">
                        Parcelado em até
                      </p>
                      <p className="text-4xl font-bold tracking-tight">
                        12x R$ 68,22
                      </p>
                    </div>

                    <FancyButton.Root
                      size="lg"
                      className="group/btn w-full lg:w-auto justify-center"
                      asChild={true}
                      style={
                        {
                          '--fancy-button-bg': '#8b5cf6',
                        } as React.CSSProperties
                      }
                    >
                      <a
                        href="https://pay.hub.la/wodh0iMlNYsqyqAj20gt?coupon=SITEGALEGO"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Garantir Acesso ao Combo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </FancyButton.Root>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
            <div className="relative">
              <Card className="tech-card h-full">
                <CourseCard {...courses.algorithms} />
              </Card>
            </div>
            <div className="relative">
              <Card className="tech-card h-full">
                <CourseCard {...courses.roadmap} />
              </Card>
            </div>
            <div className="relative">
              <Card className="tech-card h-full">
                <CourseCard {...courses.workshopLeetCode} />
              </Card>
            </div>
            <div className="relative">
              <Card className="tech-card h-full">
                <CourseCard {...courses.workshopSystemDesign} />
              </Card>
            </div>
          </div>

          <div>
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
                    Sobre o Instrutor
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                    Quem é o Galego?
                  </h2>
                </div>

                <ul className="space-y-4">
                  {[
                    'CTO de startup americana, liderando equipe de engenharia',
                    '10+ anos de experiência',
                    'Trabalhei em Berlim, remoto para Austrália, e agora EUA',
                    'Na área de tech desde 2014',
                    'Criei serviços do zero que atenderam dezenas de milhares de usuários',
                    'Mantive sistemas B2B com centenas de milhares de usuários e milhões de transações mensais',
                    'Implementei sistemas RAG do zero e trabalhei com observabilidade de sistemas de IA distribuídos',
                    'Stack: Python, Node, React, Django, AWS, Serverless, GraphQL, Next.js, TypeScript, Postgres, DynamoDB',
                  ].map((point) => (
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
