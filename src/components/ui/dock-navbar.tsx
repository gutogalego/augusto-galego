'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  BookOpen,
  Github,
  GraduationCap,
  Home,
  type LucideIcon,
  Mail,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

interface DockItem {
  id: string
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  isExternal?: boolean
}

const dockItems: DockItem[] = [
  { id: 'home', icon: Home, label: 'Home', href: '/' },
  { id: 'about', icon: User, label: 'Sobre', href: '/about' },
  { id: 'blog', icon: BookOpen, label: 'Blog', href: '/blog' },
  { id: 'courses', icon: GraduationCap, label: 'Cursos', href: '/courses' },
  { id: 'contact', icon: Mail, label: 'Contato', href: '/contact' },
  {
    id: 'divider',
    icon: () => <div className="w-px h-8 bg-border" />,
    label: '',
    href: '',
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/augustogalego',
    isExternal: true,
  },
  {
    id: 'youtube',
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@GutoGalego',
    isExternal: true,
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/RealGalego',
    isExternal: true,
  },
]

// Hook para detectar reduced motion
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useState(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return prefersReducedMotion
}

// Componente individual do dock item
function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: DockItem
  mouseX: ReturnType<typeof useMotionValue>
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(
    distance,
    [-150, -50, 0, 50, 150],
    prefersReducedMotion ? [40, 40, 40, 40, 40] : [40, 50, 80, 50, 40]
  )

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const Icon = item.icon

  // Se for divider, renderiza apenas o separador
  if (item.id === 'divider') {
    return (
      <div className="flex items-center justify-center h-16 px-2">
        <Icon />
      </div>
    )
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`
        aspect-square rounded-xl flex items-center justify-center cursor-pointer
        transition-colors duration-200 relative group
        ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground'
        }
        border border-border/50 shadow-sm
      `}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }
      }
      whileTap={
        prefersReducedMotion
          ? {}
          : {
              scale: 0.95,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }
      }
    >
      <Icon className="w-5 h-5" />

      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2
                   bg-popover text-popover-foreground text-xs px-2 py-1
                   rounded-md shadow-md border border-border whitespace-nowrap
                   opacity-0 group-hover:opacity-100 pointer-events-none z-50"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2
                        border-4 border-transparent border-t-popover"
        />
      </motion.div>

      {/* Indicador de página ativa */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                     w-1 h-1 bg-primary rounded-full"
          layoutId="activeIndicator"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  )

  if (item.href) {
    if (item.isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={item.href} aria-label={item.label}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={item.onClick} aria-label={item.label}>
      {content}
    </button>
  )
}

// Componente principal do dock
export function DockNavbar() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.pageX)
    },
    [mouseX]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(Number.POSITIVE_INFINITY)
  }, [mouseX])

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          flex items-end gap-2 px-4 py-3
          ui-surface rounded-2xl
          transition-smooth
        "
        initial={prefersReducedMotion ? {} : { y: 100, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
        transition={
          prefersReducedMotion
            ? {}
            : {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }
        }
      >
        {dockItems.map((item) => {
          const isActive =
            item.href === pathname ||
            (item.href !== '/' && pathname.startsWith(item.href || ''))

          return (
            <DockIcon
              key={item.id}
              item={item}
              mouseX={mouseX}
              isActive={isActive}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
