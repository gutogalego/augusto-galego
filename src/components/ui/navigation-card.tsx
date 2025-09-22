import { Link } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import type * as React from 'react'
import * as FancyButton from './fancy-button'

interface NavigationCardProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive?: boolean
  className?: string
  onClick?: () => void
}

export function NavigationCard({
  href,
  icon: Icon,
  label,
  isActive = false,
  className,
  onClick,
}: NavigationCardProps) {
  return (
    <FancyButton.Root
      variant={isActive ? 'basic' : 'ghost'}
      size="default"
      asChild={true}
      className={cn(
        'w-full h-full min-h-[100px] p-4 rounded-3xl transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
        className
      )}
    >
      <Link
        href={href}
        prefetch={true}
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-2 w-full h-full"
      >
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg">
          <FancyButton.Icon
            as={Icon}
            className={cn(
              'h-5 w-5 transition-colors duration-200',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          />
        </div>

        {/* Label */}
        <span
          className={cn(
            'text-xs font-medium transition-colors duration-200 text-center',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {label}
        </span>
      </Link>
    </FancyButton.Root>
  )
}
