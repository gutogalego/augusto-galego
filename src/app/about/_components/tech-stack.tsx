import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  Smartphone,
  Wrench,
} from 'lucide-react'

const techCategories = [
  {
    title: 'Linguagens de Programação',
    icon: Code,
    description: 'Linguagens que domino e uso no dia a dia',
    technologies: [
      {
        name: 'Python',
        level: 95,
        years: '7+ anos',
        description: 'Linguagem principal, Django, FastAPI',
      },
      {
        name: 'JavaScript/TypeScript',
        level: 90,
        years: '6+ anos',
        description: 'Frontend e backend, Node.js',
      },
      {
        name: 'Java',
        level: 75,
        years: '4+ anos',
        description: 'Projetos enterprise, Spring Boot',
      },
      {
        name: 'Go',
        level: 70,
        years: '2+ anos',
        description: 'Microserviços, performance crítica',
      },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Database,
    description: 'Frameworks e tecnologias para desenvolvimento backend',
    technologies: [
      {
        name: 'Django/DRF',
        level: 95,
        years: '6+ anos',
        description: 'Framework principal para APIs',
      },
      {
        name: 'Node.js/Express',
        level: 85,
        years: '5+ anos',
        description: 'APIs rápidas e escaláveis',
      },
      {
        name: 'Next.js',
        level: 80,
        years: '3+ anos',
        description: 'Full-stack com React',
      },
      {
        name: 'FastAPI',
        level: 75,
        years: '2+ anos',
        description: 'APIs modernas com Python',
      },
    ],
  },
  {
    title: 'Bancos de Dados',
    icon: Database,
    description: 'Sistemas de gerenciamento de dados',
    technologies: [
      {
        name: 'PostgreSQL',
        level: 90,
        years: '6+ anos',
        description: 'Banco principal, otimização avançada',
      },
      {
        name: 'MongoDB',
        level: 80,
        years: '4+ anos',
        description: 'NoSQL para dados flexíveis',
      },
      {
        name: 'Redis',
        level: 85,
        years: '5+ anos',
        description: 'Cache e sessões',
      },
      {
        name: 'MySQL',
        level: 75,
        years: '5+ anos',
        description: 'Projetos legados e específicos',
      },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Infraestrutura e deployment',
    technologies: [
      {
        name: 'AWS',
        level: 85,
        years: '4+ anos',
        description: 'EC2, RDS, S3, Lambda',
      },
      {
        name: 'Docker',
        level: 90,
        years: '5+ anos',
        description: 'Containerização completa',
      },
      {
        name: 'Kubernetes',
        level: 70,
        years: '2+ anos',
        description: 'Orquestração de containers',
      },
      {
        name: 'Vercel/Netlify',
        level: 80,
        years: '3+ anos',
        description: 'Deploy de aplicações frontend',
      },
    ],
  },
  {
    title: 'Frontend',
    icon: Smartphone,
    description: 'Tecnologias para interfaces de usuário',
    technologies: [
      {
        name: 'React',
        level: 85,
        years: '4+ anos',
        description: 'Biblioteca principal para UI',
      },
      {
        name: 'Tailwind CSS',
        level: 90,
        years: '3+ anos',
        description: 'Framework CSS preferido',
      },
      {
        name: 'HTML/CSS',
        level: 85,
        years: '8+ anos',
        description: 'Fundamentos sólidos',
      },
      {
        name: 'Vue.js',
        level: 65,
        years: '2+ anos',
        description: 'Projetos específicos',
      },
    ],
  },
  {
    title: 'Ferramentas & Produtividade',
    icon: Wrench,
    description: 'Ferramentas que uso para ser mais produtivo',
    technologies: [
      {
        name: 'Git/GitHub',
        level: 95,
        years: '8+ anos',
        description: 'Controle de versão avançado',
      },
      {
        name: 'VS Code',
        level: 90,
        years: '6+ anos',
        description: 'Editor principal',
      },
      {
        name: 'Notion',
        level: 85,
        years: '3+ anos',
        description: 'Organização e documentação',
      },
      {
        name: 'Linear/Jira',
        level: 80,
        years: '4+ anos',
        description: 'Gestão de projetos',
      },
    ],
  },
]

const specialties = [
  {
    title: 'Algoritmos & Estruturas de Dados',
    icon: BarChart3,
    description: 'Especialidade reconhecida, "Papai do LeetCode"',
    skills: [
      'Arrays & Strings',
      'Linked Lists',
      'Trees & Graphs',
      'Dynamic Programming',
      'Sorting & Searching',
    ],
  },
  {
    title: 'System Design',
    icon: Layers,
    description: 'Arquitetura de sistemas escaláveis',
    skills: [
      'Microserviços',
      'Load Balancing',
      'Caching',
      'Database Design',
      'API Design',
    ],
  },
  {
    title: 'Performance & Otimização',
    icon: Globe,
    description: 'Otimização de aplicações e consultas',
    skills: [
      'Query Optimization',
      'Caching Strategies',
      'Code Profiling',
      'Memory Management',
      'Scalability',
    ],
  },
]

export function TechStack() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-3 py-1">
            <Code className="mr-1 h-3 w-3" />
            Stack Tecnológico
          </Badge>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Tecnologias que <span className="gradient-text">domino</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            9+ anos de experiência me permitiram trabalhar com diversas
            tecnologias. Aqui estão as principais ferramentas do meu arsenal.
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {techCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="tech-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {category.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{tech.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {tech.years}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium text-primary">
                          {tech.level}%
                        </span>
                      </div>
                      <Progress value={tech.level} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Specialties */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Especialidades</h3>
            <p className="text-muted-foreground">
              Áreas onde tenho expertise reconhecida e ensino ativamente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialties.map((specialty) => {
              const Icon = specialty.icon
              return (
                <Card key={specialty.title} className="tech-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-lg">{specialty.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {specialty.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {specialty.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs mr-1 mb-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className="mt-16 text-center">
          <Card className="tech-card max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Filosofia de Aprendizado</h3>
                <p className="text-muted-foreground">
                  "Tecnologia evolui rapidamente, mas os{' '}
                  <strong>fundamentos são eternos</strong>. Foco em entender
                  profundamente algoritmos, estruturas de dados e princípios de
                  design antes de partir para frameworks específicos. Essa base
                  sólida me permite adaptar-me rapidamente a qualquer nova
                  tecnologia."
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Code className="h-4 w-4" />
                    <span>Fundamentos primeiro</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Prática constante</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>Compartilhar conhecimento</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
