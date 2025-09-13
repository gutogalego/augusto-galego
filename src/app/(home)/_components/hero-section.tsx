import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Briefcase,
  Code,
  Globe,
  GraduationCap,
  MapPin,
  Play,
  Star,
  Users,
  Youtube,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { label: 'Inscritos YouTube', value: '103K+', icon: Users },
  { label: 'Anos de Experiência', value: '9+', icon: Briefcase },
  { label: 'Aulas no Curso Principal', value: '68', icon: GraduationCap },
  { label: 'Países Trabalhados', value: '3', icon: Globe },
]

const highlights = [
  'CTO em startup americana',
  'Especialista em LeetCode',
  'Educador com 103K+ seguidores',
  'Trajetória Brasil → Itália → EUA',
]

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="px-3 py-1">
                <MapPin className="mr-1 h-3 w-3" />
                Pádua, Itália
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Briefcase className="mr-1 h-3 w-3" />
                CTO
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="text-subtitle">Desenvolvedor & Educador</div>
              <h1 className="text-display">
                Augusto <span className="gradient-text">Galego</span>
              </h1>
              <div className="text-headline text-muted-foreground">
                Papai do{' '}
                <span className="font-semibold text-primary">LeetCode</span>
              </div>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                CTO, Backend Engineer e Educador. Especialista em algoritmos,
                estruturas de dados e carreira em tech.{' '}
                <strong>De júnior no Brasil a CTO nos EUA</strong> em 9+ anos.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild={true} className="group">
                <Link href="/courses">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Ver Cursos
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild={true}
                className="group"
              >
                <Link href="/blog">
                  <Code className="mr-2 h-4 w-4" />
                  Ler Blog
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* YouTube Channels */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Canais no YouTube:
              </p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild={true}
                  className="justify-start"
                >
                  <Link
                    href="https://www.youtube.com/@GutoGalego"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="mr-2 h-4 w-4 text-red-500" />
                    @GutoGalego (103K+)
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  asChild={true}
                  className="justify-start"
                >
                  <Link
                    href="https://www.youtube.com/@GutoMonologos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="mr-2 h-4 w-4 text-red-500" />
                    @GutoMonólogos
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Novo
                    </Badge>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl font-bold text-primary/20">AG</div>
                </div>
                {/* When you have the actual image, replace the div above with: */}
                {/* <Image
                  src="/augusto-galego-profile.jpg"
                  alt="Augusto Galego - CTO e Educador"
                  fill
                  className="object-cover"
                  priority
                /> */}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4">
                <Card className="shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium">
                        Disponível para mentorias
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
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
                          <div className="text-xs text-muted-foreground">
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
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary/20 to-accent/20 opacity-20"
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
