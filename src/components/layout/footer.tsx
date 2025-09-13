import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Github, Linkedin, Mail, MapPin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'YouTube Principal',
    href: 'https://www.youtube.com/@GutoGalego',
    icon: Youtube,
    description: '103K+ inscritos',
  },
  {
    name: 'YouTube Monólogos',
    href: 'https://www.youtube.com/@GutoMonologos',
    icon: Youtube,
    description: 'Canal secundário',
  },
  {
    name: 'Twitter',
    href: 'https://x.com/RealGalego',
    icon: Twitter,
    description: '@RealGalego',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/augusto-galego-60a0b1160/',
    icon: Linkedin,
    description: 'Perfil profissional',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/gutogalego',
    icon: Github,
    description: 'Projetos open source',
  },
]

const quickLinks = [
  { name: 'Sobre', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Cursos', href: '/courses' },
  { name: 'Setup', href: '/setup' },
  { name: 'Contato', href: '/contact' },
]

const courses = [
  {
    name: 'Estruturas de Dados e Algoritmos + LeetCode',
    href: '/courses/algoritmos-estruturas-dados',
    price: 'R$ 120-150',
  },
  {
    name: '10 LeetCodes Para Entrevistas',
    href: '/courses/leetcode-entrevistas',
    price: 'R$ 99',
  },
  {
    name: 'Roadmap pro seu Próximo Emprego',
    href: '/courses/roadmap-emprego',
    price: 'Consulte',
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                G
              </div>
              <span className="font-bold">Augusto Galego</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>CTO</strong> em startup americana, especialista em
              algoritmos e estruturas de dados. Conhecido como{' '}
              <strong>"Papai do LeetCode"</strong>.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Pádua, Itália</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Link
                href="mailto:algoritmos.galego@gmail.com"
                className="hover:text-primary transition-colors"
              >
                algoritmos.galego@gmail.com
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navegação</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="font-semibold">Cursos</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.href}>
                  <Link
                    href={course.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                  >
                    <div>{course.name}</div>
                    <div className="text-xs text-primary font-medium">
                      {course.price}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Redes Sociais</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium">{link.name}</div>
                      <div className="text-xs">{link.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Augusto Miranda Galego. Todos os
            direitos reservados.
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>9+ anos de experiência</span>
            <span>•</span>
            <span>UFSC 2014</span>
            <span>•</span>
            <span>Brasil → Itália → EUA</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            De desenvolvedor júnior no Brasil a CTO nos EUA. Especialista em
            Python, JavaScript, System Design e LeetCode.
            <br />
            Ajudando desenvolvedores a crescerem na carreira internacional.
          </p>
        </div>
      </div>
    </footer>
  )
}
