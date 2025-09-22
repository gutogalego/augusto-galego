'use client'

import { usePathname } from '@/lib/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface BlogTransitionProps {
  children: ReactNode
  className?: string
}

// Hook para detectar prefers-reduced-motion
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Configurações de animação otimizadas para blog
const BLOG_SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const NATURAL_EASING = [0.25, 0.46, 0.45, 0.94] as const

export function BlogTransition({
  children,
  className = '',
}: BlogTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // Detecta se é página do blog ou post específico
  const isPostPage =
    pathname.includes('/blog/') && pathname.split('/blog/')[1]?.includes('/')

  // Variantes específicas para transições blog <-> post
  const blogVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            ...BLOG_SPRING_CONFIG,
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      scale: prefersReducedMotion ? 1 : 1.02,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: NATURAL_EASING,
      },
    },
  }

  const postVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            ...BLOG_SPRING_CONFIG,
            staggerChildren: 0.08,
            delayChildren: 0.15,
          },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -30,
      scale: prefersReducedMotion ? 1 : 1.01,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: NATURAL_EASING,
      },
    },
  }

  // Seleciona variantes baseado no tipo de página
  const variants = isPostPage ? postVariants : blogVariants

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={`min-h-screen ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Componente para animar elementos filhos individualmente
export function BlogTransitionItem({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  const itemVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: 'spring' as const,
            stiffness: 400,
            damping: 25,
            delay,
          },
    },
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
