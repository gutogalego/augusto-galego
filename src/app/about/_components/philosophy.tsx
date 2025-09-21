import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  BookOpen,
  Heart,
  Lightbulb,
  Mail,
  MessageCircle,
  Quote,
  Target,
  Users,
} from 'lucide-react'
import Link from 'next/link'

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Fundamentos Primeiro',
    description:
      'Acredito que entender profundamente algoritmos e estruturas de dados é mais importante que decorar sintaxe de frameworks.',
    quote: '"Frameworks mudam, fundamentos permanecem."',
  },
  {
    icon: Users,
    title: 'Educação Acessível',
    description:
      'Conhecimento deve ser democrático. Uso explicações visuais e linguagem simples para tornar conceitos complexos acessíveis.',
    quote: '"Se não consegue explicar de forma simples, não entendeu bem."',
  },
  {
    icon: Target,
    title: 'Prática Deliberada',
    description:
      'Crescimento vem da prática consistente e focada. LeetCode é uma ferramenta, não um fim em si mesmo.',
    quote: '"Pratique com propósito, não por obrigação."',
  },
  {
    icon: Heart,
    title: 'Impacto Real',
    description:
      'Meu objetivo é ajudar desenvolvedores a crescerem em suas carreiras e alcançarem seus sonhos profissionais.',
    quote: '"Sucesso é ver meus alunos superando seus próprios limites."',
  },
]

const teachingPrinciples = [
  'Explicações visuais com desenhos na tela',
  'Exemplos práticos e aplicáveis',
  'Progressão gradual de dificuldade',
  'Foco na compreensão, não memorização',
  'Conexão entre teoria e prática',
  'Feedback constante e suporte',
]

const personalInsights = [
  {
    title: 'Sobre LeetCode',
    content:
      'LeetCode é uma excelente ferramenta para praticar algoritmos, mas não deve ser o único foco. Use-o para fortalecer fundamentos, não para decorar soluções.',
    category: 'Técnico',
  },
  {
    title: 'Carreira Internacional',
    content:
      'Sair do Brasil foi desafiador, mas possível. O segredo está em construir um portfólio sólido, melhorar o inglês e ser persistente.',
    category: 'Carreira',
  },
  {
    title: 'Educação Online',
    content:
      'Ensinar online me permitiu impactar milhares de pessoas. A chave é ser autêntico e focar genuinamente em ajudar os alunos.',
    category: 'Educação',
  },
  {
    title: 'Produtividade',
    content:
      'Organização é fundamental. Uso Notion para tudo: projetos, ideias, planejamento. Um sistema bem estruturado liberta a mente para criar.',
    category: 'Produtividade',
  },
]

export function Philosophy() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-3 py-1">
            <Heart className="mr-1 h-3 w-3" />
            Filosofia & Valores
          </Badge>
          <h2 className="text-3xl font-bold lg:text-4xl">
            O que me <span className="gradient-text">motiva</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minha abordagem para ensino, desenvolvimento e vida profissional é
            guiada por alguns princípios fundamentais que desenvolvi ao longo
            dos anos.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coreValues.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title} className="tech-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{value.title}</h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary/20 pl-4 bg-primary/5 p-3 rounded-r-lg">
                    <div className="flex items-start space-x-2">
                      <Quote className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm italic text-muted-foreground">
                        {value.quote}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Teaching Approach */}
        <div className="mb-16">
          <Card className="tech-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      Minha Abordagem de Ensino
                    </h3>
                    <p className="text-muted-foreground">
                      Desenvolvi uma metodologia única baseada em anos de
                      experiência tanto como desenvolvedor quanto como educador.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {teachingPrinciples.map((principle) => (
                      <div
                        key={principle}
                        className="flex items-center space-x-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm">{principle}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild={true} className="group">
                    <Link href="/courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Ver Meus Cursos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                <div className="relative">
                  <div className="aspect-square w-full max-w-sm mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted">
                    {/* Placeholder for teaching image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">🎓</div>
                    </div>
                    {/* When you have the actual image, replace with: */}
                    {/* <Image
                      src="/augusto-teaching.jpg"
                      alt="Augusto Galego ensinando"
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Insights */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Insights Pessoais</h3>
            <p className="text-muted-foreground">
              Algumas reflexões que compartilho frequentemente com minha
              audiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalInsights.map((insight) => (
              <Card key={insight.title} className="tech-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{insight.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {insight.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {insight.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="tech-card">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Vamos Conversar?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Estou sempre aberto a discussões sobre tecnologia, carreira e
                  educação. Se você tem dúvidas ou quer compartilhar sua
                  jornada, entre em contato!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild={true} className="group">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Entrar em Contato
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button variant="outline" asChild={true}>
                  <Link
                    href="https://twitter.com/RealGalego"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Seguir no Twitter
                  </Link>
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                💡 <strong>Dica:</strong> Me siga nas redes sociais para
                acompanhar reflexões diárias sobre carreira em tech e
                desenvolvimento pessoal.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
