'use client'

import { cn } from '@/lib/shadcn'
import { useEffect, useRef, useState } from 'react'

interface AnimatedTabsProps {
  tabs: Array<{
    name: string
    href: string
    isActive: boolean
    icon?: React.ComponentType<{ className?: string }>
  }>
  onTabClick: (href: string) => void
  className?: string
}

export function AnimatedTabs({
  tabs,
  onTabClick,
  className,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(
    () => tabs.find((tab) => tab.isActive)?.href || tabs[0]?.href
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  // Update active tab when props change
  useEffect(() => {
    const currentActive = tabs.find((tab) => tab.isActive)
    if (currentActive && currentActive.href !== activeTab) {
      setActiveTab(currentActive.href)
    }
  }, [tabs, activeTab])

  useEffect(() => {
    const container = containerRef.current

    if (container && activeTab) {
      const activeTabElement = activeTabRef.current

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement

        const clipLeft = offsetLeft
        const clipRight = offsetLeft + offsetWidth

        // Create a subtle underline effect
        container.style.clipPath = `inset(0% ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0% ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}%)`
      }
    }
  }, [activeTab])

  const handleTabClick = (href: string) => {
    setActiveTab(href)
    onTabClick(href)
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      {/* Animated underline indicator */}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full h-0.5 overflow-hidden [clip-path:inset(0%_75%_0%_0%)] [transition:clip-path_0.25s_ease]"
      >
        <div className="w-full h-full bg-foreground" />
      </div>

      {/* Tabs in single row */}
      {tabs.map((tab) => {
        const isActive = activeTab === tab.href
        const Icon = tab.icon

        return (
          <button
            key={tab.href}
            type="button"
            ref={isActive ? activeTabRef : null}
            onClick={() => handleTabClick(tab.href)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all duration-200',
              'hover:text-foreground relative',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4 transition-colors" />}
            <span className="hidden lg:inline">{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}
