'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface RouteTransitionProps {
  children: ReactNode
  className?: string
}

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

// Configurações de animação naturais
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export function RouteTransition({
  children,
  className = '',
}: RouteTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // Detecta o tipo de página para animações específicas
  const isHomePage = pathname === '/' || pathname === '/en'
  const isBlogRoute = pathname.includes('/blog') && !pathname.split('/blog/')[1]
  const isPostRoute =
    pathname.includes('/blog/') &&
    (pathname.split('/blog/')[1]?.length ?? 0) > 0
  const isAboutPage = pathname.includes('/about')
  const isContactPage = pathname.includes('/contact')
  const isCoursesPage = pathname.includes('/courses')
  const isSetupPage = pathname.includes('/setup')

  // Função para determinar a configuração da animação baseada na página
  const getAnimationConfig = () => {
    if (prefersReducedMotion) {
      return { duration: 0, y: 0, scale: 1 }
    }

    if (isHomePage) {
      return { duration: 0.6, y: 25, scale: 0.97 }
    }

    if (isPostRoute) {
      return { duration: 0.7, y: 35, scale: 0.96 }
    }

    if (isBlogRoute) {
      return { duration: 0.6, y: 30, scale: 0.97 }
    }

    if (isAboutPage || isContactPage || isCoursesPage || isSetupPage) {
      return { duration: 0.5, y: 20, scale: 0.98 }
    }

    // Default para outras páginas
    return { duration: 0.5, y: 20, scale: 0.98 }
  }

  const config = getAnimationConfig()

  // Variantes específicas para diferentes tipos de transição
  const pageVariants = {
    initial: {
      opacity: 0,
      y: config.y,
      scale: config.scale,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            ...SPRING_CONFIG,
            duration: config.duration,
          },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -Math.abs(config.y) * 0.6,
      scale: prefersReducedMotion ? 1 : 1.01,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: EASING,
      },
    },
  }

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={pathname}
        className={className}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        onAnimationComplete={() => {
          // Ensure animation completes properly
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
