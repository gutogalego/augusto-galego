import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import * as FancyButton from '@/components/ui/fancy-button'
import {
  ArrowRight,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'

export function CoursesHero() {
  return (
    <section className="hero-section">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="px-3 py-1">
            <GraduationCap className="mr-1 h-3 w-3" />
            Cursos do Galego
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Aprenda <span className="gradient-text">algoritmos</span> na
              prática
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cursos práticos e diretos ao ponto. Sem enrolação, só o que
              realmente importa para sua carreira em tech.{' '}
              <strong>Explicações visuais que funcionam.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="tech-card">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm text-muted-foreground">Alunos</div>
              </CardContent>
            </Card>
            <Card className="tech-card">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-muted-foreground">Avaliação</div>
              </CardContent>
            </Card>
            <Card className="tech-card">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Horas</div>
              </CardContent>
            </Card>
          </div>

          <FancyButton.Root size="lg" className="group">
            Ver Todos os Cursos
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </FancyButton.Root>
        </div>
      </div>
    </section>
  )
}
