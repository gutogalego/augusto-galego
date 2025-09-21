import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  Plane,
  TrendingUp,
} from 'lucide-react'

const timelineEvents = [
  {
    year: '2014',
    title: 'Formatura na UFSC',
    description:
      'Bacharel em Sistemas de Informação pela Universidade Federal de Santa Catarina.',
    icon: GraduationCap,
    type: 'education',
    location: 'Florianópolis, Brasil',
    details: [
      'Foco em desenvolvimento de software',
      'Projetos acadêmicos em Java e C++',
      'Primeiro contato com algoritmos',
    ],
  },
  {
    year: '2014-2017',
    title: 'Desenvolvedor Júnior no Brasil',
    description:
      'Início da carreira profissional como desenvolvedor júnior, aprendendo os fundamentos.',
    icon: Briefcase,
    type: 'career',
    location: 'Brasil',
    details: [
      'Desenvolvimento web com PHP e JavaScript',
      'Aprendizado de boas práticas',
      'Primeiros projetos comerciais',
    ],
  },
  {
    year: '2017-2018',
    title: 'Trabalho Remoto Internacional',
    description:
      'Transição para trabalho remoto com empresa australiana através de fábrica de software.',
    icon: TrendingUp,
    type: 'career',
    location: 'Brasil (Remoto)',
    details: [
      'Primeira experiência internacional',
      'Melhoria significativa no inglês',
      'Exposição a metodologias ágeis',
    ],
  },
  {
    year: '2018',
    title: 'Mudança para a Itália',
    description:
      'Mudança para a Europa via mestrado da namorada, início da jornada internacional.',
    icon: Plane,
    type: 'life',
    location: 'Pádua, Itália',
    details: [
      'Adaptação cultural e linguística',
      'Trabalho em empresa B2B de moda',
      'Crescimento acelerado como desenvolvedor',
    ],
  },
  {
    year: '2018-2021',
    title: 'Senior Developer na Europa',
    description:
      'Evolução rápida para nível senior, trabalhando com tecnologias modernas.',
    icon: Award,
    type: 'career',
    location: 'Itália',
    details: [
      'Especialização em backend (Python/Django)',
      'Liderança técnica em projetos',
      'Mentoria de desenvolvedores júnior',
    ],
  },
  {
    year: '2020',
    title: 'Início do Canal no YouTube',
    description:
      'Criação do canal @GutoGalego para compartilhar conhecimento sobre algoritmos.',
    icon: Award,
    type: 'content',
    location: 'Itália',
    details: [
      'Primeiros vídeos sobre LeetCode',
      'Crescimento orgânico da audiência',
      'Desenvolvimento da marca "Papai do LeetCode"',
    ],
  },
  {
    year: '2021-2024',
    title: 'Educador e Criador de Conteúdo',
    description:
      'Consolidação como educador, lançamento de cursos e crescimento do canal.',
    icon: GraduationCap,
    type: 'content',
    location: 'Itália',
    details: [
      'Curso "Estruturas de Dados e Algoritmos"',
      'Crescimento para 100K+ inscritos',
      'Workshops e mentorias',
    ],
  },
  {
    year: '2025',
    title: 'CTO em Startup Americana',
    description:
      'Promoção para CTO, liderando tecnologia em startup com foco no mercado americano.',
    icon: Award,
    type: 'career',
    location: 'Itália (Remoto para EUA)',
    details: [
      'Liderança de equipe técnica',
      'Arquitetura de sistemas escaláveis',
      'Decisões estratégicas de tecnologia',
    ],
  },
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'education':
      return 'bg-muted text-foreground border-border'
    case 'career':
      return 'bg-secondary text-foreground border-border'
    case 'content':
      return 'bg-accent text-foreground border-border'
    case 'life':
      return 'bg-muted/50 text-foreground border-border'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'education':
      return 'Educação'
    case 'career':
      return 'Carreira'
    case 'content':
      return 'Conteúdo'
    case 'life':
      return 'Vida Pessoal'
    default:
      return 'Outros'
  }
}

export function Timeline() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-3 py-1">
            <Calendar className="mr-1 h-3 w-3" />
            Jornada Profissional
          </Badge>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Uma década de <span className="gradient-text">evolução</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De estudante universitário a CTO internacional: os marcos mais
            importantes da minha trajetória em tecnologia.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-px" />

          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={event.title}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center md:transform md:-translate-x-4 z-10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 ${
                      isEven ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <Card className="tech-card">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getTypeColor(event.type)}`}
                                >
                                  {getTypeLabel(event.type)}
                                </Badge>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                              </div>
                              <h3 className="text-xl font-bold">
                                {event.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {event.description}
                              </p>
                            </div>
                            <div className="text-2xl font-bold text-primary flex-shrink-0 ml-4">
                              {event.year}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-muted-foreground">
                              Principais conquistas:
                            </div>
                            <ul className="space-y-1">
                              {event.details.map((detail) => (
                                <li
                                  key={detail}
                                  className="flex items-start space-x-2 text-sm"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">11</div>
            <div className="text-sm text-muted-foreground">
              Anos desde formatura
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground">
              Países trabalhados
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5+</div>
            <div className="text-sm text-muted-foreground">
              Empresas diferentes
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">100K+</div>
            <div className="text-sm text-muted-foreground">
              Pessoas impactadas
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
