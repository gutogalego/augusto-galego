'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo } from 'react'

// Generate unique keys for highlight dots
const generateHighlightDots = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: `highlight-dot-${Math.random().toString(36).substr(2, 9)}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
  }))
}

export function CanvasOverlay() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mouse movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 })

  // Generate highlight dots with stable keys
  const highlightDots = useMemo(() => generateHighlightDots(12), [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient overlay que segue o mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle,
            hsl(var(--primary) / 0.3) 0%,
            hsl(var(--primary) / 0.1) 30%,
            transparent 70%
          )`,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Efeito de vinheta nas bordas */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at center,
            transparent 20%,
            hsl(var(--background) / 0.1) 70%,
            hsl(var(--background) / 0.3) 100%
          )`,
        }}
      />

      {/* Efeito de ruído sutil */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pontos de destaque animados */}
      <div className="absolute inset-0">
        {highlightDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: dot.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
