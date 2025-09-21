'use client'

import { AnimatedTabs } from '@/components/ui/animated-tabs'
import { Button } from '@/components/ui/button'
import { SocialButton } from '@/components/ui/social-button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import {
  RiArticleLine,
  RiBookLine,
  RiCloseLine,
  RiComputerLine,
  RiHomeLine,
  RiMailLine,
  RiMenuLine,
  RiUserLine,
} from 'react-icons/ri'
import { LogoHorizontal } from '../common'

const navigationItems = [
  { name: 'Início', href: '/', icon: RiHomeLine },
  { name: 'Sobre', href: '/about', icon: RiUserLine },
  { name: 'Blog', href: '/blog', icon: RiArticleLine },
  { name: 'Cursos', href: '/courses', icon: RiBookLine },
  { name: 'Setup', href: '/setup', icon: RiComputerLine },
  { name: 'Contato', href: '/contact', icon: RiMailLine },
]

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@GutoGalego',
    icon: FaYoutube,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/augusto-galego-60a0b1160/',
    icon: FaLinkedin,
  },
  { name: 'X', href: 'https://x.com/RealGalego', icon: FaXTwitter },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleTabClick = (href: string) => {
    router.push(href)
  }

  // Prepare tabs for AnimatedTabs component
  const tabsData = navigationItems.map((item) => ({
    name: item.name,
    href: item.href,
    isActive: isActive(item.href),
    icon: item.icon,
  }))

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b-2 py-1 border-dotted border-border/40">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <LogoHorizontal />
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <AnimatedTabs tabs={tabsData} onTabClick={handleTabClick} />
        </nav>
        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-3 ml-6">
            {/* Vertical divider */}
            <div className="w-px h-8 bg-border/40 mr-2" />

            {socialLinks.map((link) => (
              <SocialButton
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.name}
              />
            ))}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-9 w-9 p-0 hover:bg-muted/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <RiCloseLine className="h-5 w-5" />
          ) : (
            <RiMenuLine className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-6">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-muted/50 text-foreground border border-border/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 transition-colors" />
                    <span>{item.name}</span>

                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Social Links */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Redes Sociais
              </p>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <SocialButton
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    label={link.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
