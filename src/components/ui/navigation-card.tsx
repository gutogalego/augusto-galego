import { Link } from '@/lib/navigation'
import { cn } from '@/lib/shadcn'
import type * as React from 'react'

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
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-2',
        'min-h-[80px] p-4 rounded-2xl border transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
        isActive
          ? [
              'bg-card border-border/40 shadow-sm',
              'after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-primary/5 after:to-transparent after:pointer-events-none',
            ]
          : [
              'bg-card/50 border-border/20 hover:border-border/40',
              'hover:bg-card hover:shadow-sm',
            ],
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground/80 group-hover:text-foreground group-hover:bg-muted/50'
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Label */}
      <span
        className={cn(
          'text-xs font-medium transition-colors duration-200 text-center',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {label}
      </span>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-card" />
      )}

      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </Link>
  )
}
