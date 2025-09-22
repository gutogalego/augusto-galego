'use client'

import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/ui/language-selector'
import { NavigationCard } from '@/components/ui/navigation-card'
import { NavigationDock } from '@/components/ui/navigation-dock'
import { SocialButton } from '@/components/ui/social-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

const getNavigationItems = (t: (key: string) => string) => [
  { name: t('navigation.home'), href: '/', icon: RiHomeLine },
  { name: t('navigation.about'), href: '/about', icon: RiUserLine },
  { name: t('navigation.blog'), href: '/blog', icon: RiArticleLine },
  { name: t('navigation.courses'), href: '/courses', icon: RiBookLine },
  { name: t('navigation.setup'), href: '/setup', icon: RiComputerLine },
  { name: t('navigation.contact'), href: '/contact', icon: RiMailLine },
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
  const t = useTranslations()

  const navigationItems = getNavigationItems(t)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Prepare navigation items for NavigationDock component
  const navigationData = navigationItems.map((item) => ({
    name: item.name,
    href: item.href,
    icon: item.icon,
    isActive: isActive(item.href),
  }))

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b-2 py-1 border-dotted border-border/40">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <LogoHorizontal />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <NavigationDock items={navigationData} />
        </nav>
        {/* Desktop Language Selector */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-3 ml-6">
            {/* Vertical divider */}
            <div className="w-px h-8 bg-border/40 mr-2" />
            <LanguageSelector />
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
        <div className="md:hidden border-t-2 border-border/40 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-6">
            <nav className="grid grid-cols-3 gap-3">
              {navigationItems.map((item) => (
                <NavigationCard
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.name}
                  isActive={isActive(item.href)}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </nav>

            {/* Mobile Language Selector */}
            <div className="mt-8 pt-6 border-t-2 border-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                {t('common.language')}
              </p>
              <div className="flex items-center justify-center">
                <LanguageSelector />
              </div>
            </div>

            {/* Mobile Social Links */}
            <div className="mt-6 pt-6 border-t-2 border-border/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                {t('navigation.socialMedia')}
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
