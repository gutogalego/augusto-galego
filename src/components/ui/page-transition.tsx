'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'slide' | 'scale'
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

// Configurações de animação baseadas em física natural
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
}

const EASING = [0.25, 0.46, 0.45, 0.94] as const

export function PageTransition({
  children,
  className = '',
  variant = 'fade',
}: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  // Variantes de animação adaptáveis
  const variants = {
    fade: {
      initial: {
        opacity: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.3 },
      },
      animate: {
        opacity: 1,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { ...SPRING_CONFIG, duration: 0.4 },
      },
      exit: {
        opacity: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: EASING },
      },
    },
    slide: {
      initial: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
        transition: { duration: prefersReducedMotion ? 0 : 0.3 },
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { ...SPRING_CONFIG, duration: 0.5 },
      },
      exit: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -10,
        transition: { duration: prefersReducedMotion ? 0 : 0.3, ease: EASING },
      },
    },
    scale: {
      initial: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.96,
        transition: { duration: prefersReducedMotion ? 0 : 0.3 },
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { ...SPRING_CONFIG, duration: 0.4 },
      },
      exit: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.02,
        transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: EASING },
      },
    },
  }

  return (
    <motion.div
      className={`min-h-screen ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  )
}
