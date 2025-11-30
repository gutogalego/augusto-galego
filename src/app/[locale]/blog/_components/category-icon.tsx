import {
  RiBookOpenLine,
  RiBriefcaseLine,
  RiCodeLine,
  RiFlashlightLine,
  RiFocus3Line,
  RiGlobalLine,
  RiHeartLine,
} from 'react-icons/ri'

interface CategoryIconProps {
  category: string
  className?: string
}

export function CategoryIcon({
  category,
  className = 'h-4 w-4',
}: CategoryIconProps) {
  switch (category) {
    case 'Algoritmos':
    case 'Algorithms':
      return <RiCodeLine className={className} />
    case 'Carreira':
    case 'Career':
      return <RiBriefcaseLine className={className} />
    case 'Trabalho Remoto':
    case 'Remote Work':
      return <RiGlobalLine className={className} />
    case 'System Design':
      return <RiFlashlightLine className={className} />
    case 'Produtividade':
    case 'Productivity':
      return <RiFocus3Line className={className} />
    case 'Reflexões':
    case 'Reflections':
      return <RiHeartLine className={className} />
    default:
      return <RiBookOpenLine className={className} />
  }
}
