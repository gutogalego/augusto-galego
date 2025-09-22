'use client'

import { Link } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import type * as React from 'react'
import { Dock, DockIcon, DockItem, DockLabel } from './dock'

interface NavigationDockProps {
  items: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    isActive: boolean
  }>
  className?: string
}

export function NavigationDock({ items, className }: NavigationDockProps) {
  return (
    <Dock className={cn('', className)}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = item.isActive

        return (
          <DockItem key={item.href} className="aspect-square">
            <Link
              href={item.href}
              prefetch={true}
              className={cn(
                'flex h-full w-full items-center justify-center rounded-xl transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <DockIcon>
                <Icon className="h-4 w-4" />
              </DockIcon>
            </Link>
            <DockLabel>{item.name}</DockLabel>
          </DockItem>
        )
      })}
    </Dock>
  )
}
