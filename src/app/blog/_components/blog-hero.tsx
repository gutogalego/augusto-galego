import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  BookOpen,
  Calendar,
  Filter,
  Search,
  Tag,
  TrendingUp,
  Users,
} from 'lucide-react'

const blogStats = [
  { label: 'Artigos Publicados', value: '50+', icon: BookOpen },
  { label: 'Leitores Mensais', value: '25K+', icon: Users },
  { label: 'Tópicos Cobertos', value: '12', icon: Tag },
]

const popularTopics = [
  'Algoritmos',
  'Estruturas de Dados',
  'LeetCode',
  'Carreira Tech',
  'Trabalho Remoto',
  'System Design',
  'Produtividade',
  'Europa/EUA',
]

export function BlogHero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="px-3 py-1">
            <BookOpen className="mr-1 h-3 w-3" />
            Blog do Galego
          </Badge>

          {/* Main Heading */}
          <div className="space-y-6">
            <div className="text-subtitle">Blog</div>
            <h1 className="text-display">
              Insights sobre{' '}
              <span className="gradient-text">tech e carreira</span>
            </h1>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
              Artigos práticos sobre algoritmos, estruturas de dados, carreira
              internacional e tudo que aprendi em 9+ anos como desenvolvedor.
              <strong> Conteúdo real, sem enrolação.</strong>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar artigos..." className="pl-10 h-12" />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Tópicos populares:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {blogStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="tech-card">
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Newsletter CTA */}
          <Card className="tech-card max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold mb-1">
                    Não perca nenhum artigo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Receba os novos posts direto no seu email
                  </p>
                </div>
                <Button className="group">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Inscrever-se
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary/10 to-accent/10 opacity-30"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
