import { cn } from '@/lib/shadcn'
import Image from 'next/image'

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

export function ProfileAvatar({ size = 'md', className }: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full bg-muted',
        sizeClasses[size],
        className
      )}
    >
      <Image
        src="/galego-picture-clean.png"
        alt="Augusto Galego"
        fill={true}
        className="object-cover object-center"
        sizes="(max-width: 768px) 64px, 80px"
      />
    </div>
  )
}
