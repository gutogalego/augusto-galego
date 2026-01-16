import { LogoHorizontal } from '@/components/common'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/lib/navigation'
import {
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
  Twitter,
  Youtube,
} from 'lucide-react'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Conteúdo',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Sobre', href: '/about' },
      { name: 'Setup', href: '/setup' },
      { name: 'Contato', href: '/contact' },
    ],
  },
  {
    title: 'Aprendizado',
    links: [
      { name: 'Cursos', href: '/courses' },
      { name: 'Algoritmos', href: '/blog?category=Algoritmos' },
      { name: 'System Design', href: '/blog?category=System Design' },
      { name: 'Carreira', href: '/blog?category=Carreira' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Newsletter', href: '#newsletter' },
      {
        name: 'Roadmap',
        href: 'https://pay.hub.la/hrZKmxeXzeLN8AvObjVJ?coupon=SITEGALEGO',
        external: true,
      },
      { name: 'Dicas de Produtividade', href: '/blog?category=Produtividade' },
    ],
  },
  {
    title: 'Comunidade',
    links: [
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@GutoGalego',
        external: true,
      },
      { name: 'GitHub', href: 'https://github.com/gutogalego', external: true },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/augusto-galego-60a0b1160/',
        external: true,
      },
      { name: 'Twitter', href: 'https://x.com/RealGalego', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-dotted border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand Section - Takes more space on larger screens */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <LogoHorizontal />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              CTO em startup americana. Especialista em algoritmos, estruturas
              de dados e carreira tech internacional.
            </p>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>Pádua, Itália</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.youtube.com/@GutoGalego"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/gutogalego"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/augusto-galego-60a0b1160/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/RealGalego"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 border-dotted border-border/40" />

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between space-y-6 lg:flex-row lg:items-center lg:space-y-0">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Augusto Galego. Todos os direitos
              reservados.
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
