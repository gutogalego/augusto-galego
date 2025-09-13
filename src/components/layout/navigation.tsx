'use client'

import { Button } from '@/components/ui/button'
import { Github, Linkedin, Menu, Twitter, X, Youtube } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigationItems = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Cursos', href: '/courses' },
  { name: 'Setup', href: '/setup' },
  { name: 'Contato', href: '/contact' },
]

const socialLinks = [
  {
    name: 'YouTube Principal',
    href: 'https://www.youtube.com/@GutoGalego',
    icon: Youtube,
  },
  {
    name: 'YouTube Monólogos',
    href: 'https://www.youtube.com/@GutoMonologos',
    icon: Youtube,
  },
  { name: 'Twitter', href: 'https://x.com/RealGalego', icon: Twitter },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/augusto-galego-60a0b1160/',
    icon: Linkedin,
  },
  { name: 'GitHub', href: 'https://github.com/gutogalego', icon: Github },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full ui-surface">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            G
          </div>
          <span className="hidden font-bold sm:inline-block">
            Augusto Galego
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary ${
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center space-x-2">
          {socialLinks.slice(0, 3).map((link) => {
            const Icon = link.icon
            return (
              <Button key={link.href} variant="ghost" size="sm" asChild={true}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="border-t bg-background px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Social Links */}
            <div className="mt-6 flex items-center space-x-4 border-t pt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
