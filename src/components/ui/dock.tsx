'use client'

import { cn } from '@/lib/shadcn'
import {
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import {
  Children,
  type ReactElement,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const DOCK_HEIGHT = 80
const DEFAULT_MAGNIFICATION = 50
const DEFAULT_DISTANCE = 100
const DEFAULT_PANEL_HEIGHT = 56

type DockProps = {
  children: React.ReactNode
  className?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
}

type DockItemProps = {
  className?: string
  children: React.ReactNode
}

type DockLabelProps = {
  className?: string
  children: React.ReactNode
}

type DockIconProps = {
  className?: string
  children: React.ReactNode
}

type DockContextType = {
  mouseX: MotionValue
  spring: SpringOptions
  magnification: number
  distance: number
}

type DockProviderProps = {
  children: React.ReactNode
  value: DockContextType
}

const DockContext = createContext<DockContextType | undefined>(undefined)

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}

function useDock() {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error('useDock must be used within an DockProvider')
  }
  return context
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      style={{
        height: height,
        scrollbarWidth: 'none',
      }}
      className="mx-2 flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1)
          mouseX.set(pageX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Number.POSITIVE_INFINITY)
        }}
        className={cn(
          'mx-auto flex w-fit gap-4 rounded-2xl bg-card/50 border border-border/20 backdrop-blur-sm shadow-sm px-4',
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  )
}

function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { distance, magnification, mouseX, spring } = useDock()

  const isHovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - domRect.x - domRect.width / 2
  })

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [32, magnification, 32]
  )

  const width = useSpring(widthTransform, spring)

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      tabIndex={0}
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement, { width, isHovered })
      )}
    </motion.div>
  )
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>
  const isHovered = restProps.isHovered as MotionValue<number> | undefined
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      return
    }

    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1)
    })

    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute top-full mt-2 left-1/2 w-fit whitespace-pre rounded-md border border-border bg-popover px-2 py-1 text-xs text-foreground shadow-md',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>
  const width = restProps.width as MotionValue<number> | undefined

  const fallbackWidth = useMotionValue(32)
  const widthTransform = useTransform(width || fallbackWidth, (val) => val / 2)

  return (
    <motion.div
      style={width ? { width: widthTransform } : { width: 16 }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon, DockItem, DockLabel }
