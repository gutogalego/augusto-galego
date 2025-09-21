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

        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 12px)`
      }
    }
  }, [activeTab])

  const handleTabClick = (href: string) => {
    setActiveTab(href)
    onTabClick(href)
  }

  return (
    <div
      className={cn(
        'relative mx-auto flex w-fit flex-col items-center rounded-full',
        className
      )}
    >
      {/* Animated background overlay */}
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_12px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="relative flex w-full justify-center bg-foreground">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.href}
                type="button"
                onClick={() => handleTabClick(tab.href)}
                className={cn(
                  'flex h-10 items-center gap-2 rounded-full px-4 py-2 font-medium text-background text-sm transition-colors',
                  'lg:inline hidden' // Hide on mobile, show on large screens
                )}
                tabIndex={-1}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="hidden lg:inline">{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Base tabs */}
      <div className="relative flex w-full justify-center">
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
                'flex h-10 items-center gap-2 rounded-full px-4 py-2 font-medium text-sm transition-colors',
                'lg:inline hidden', // Hide on mobile, show on large screens
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {Icon && <Icon className="h-4 w-4 transition-colors" />}
              <span className="hidden lg:inline">{tab.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
