import { cn } from '@/lib/shadcn'
import Link from 'next/link'

interface SocialButtonProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  className?: string
}

export function SocialButton({
  href,
  icon: Icon,
  label,
  className,
}: SocialButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex h-12 w-12 items-center justify-center',
        'rounded-2xl border border-border/30 bg-card',
        'drop-shadow-sm transition-all duration-200 ease-out',
        'hover:border-transparent hover:drop-shadow-none',
        'active:scale-95',
        className
      )}
    >
      <Icon className="h-5 w-5 text-muted-foreground/70 group-hover:text-foreground transition-colors duration-200" />
      <span className="sr-only">{label}</span>
    </Link>
  )
}
