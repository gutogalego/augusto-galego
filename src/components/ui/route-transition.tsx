'use client'

import { motion } from 'framer-motion'
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

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  mass: 1,
}

export function RouteTransition({
  children,
  className = '',
}: RouteTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 100)
    return () => clearTimeout(timer)
  }, [])

  const isPostRoute =
    pathname.includes('/blog/') &&
    (pathname.split('/blog/')[1]?.length ?? 0) > 0

  const animationConfig = {
    duration: isPostRoute ? 0.6 : 0.4,
    y: isPostRoute ? 20 : 15,
  }

  if (prefersReducedMotion || isInitialLoad) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      className={className}
      initial={{ opacity: 0, y: animationConfig.y }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          ...SPRING_CONFIG,
          duration: animationConfig.duration,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
