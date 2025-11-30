// AlignUI FancyButton v0.0.0

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import type { PolymorphicComponentProps } from '@/utils/polymorphic'
import { recursiveCloneChildren } from '@/utils/recursive-clone-children'
import { type VariantProps, tv } from '@/utils/tv'

const FANCY_BUTTON_ROOT_NAME = 'FancyButtonRoot'
const FANCY_BUTTON_ICON_NAME = 'FancyButtonIcon'

export const fancyButtonVariants = tv({
  slots: {
    root: [
      // base
      'group relative inline-flex items-center justify-center rounded-xl whitespace-nowrap text-sm font-medium outline-none',
      'transition duration-200 ease-out',
      // focus
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    icon: 'relative z-10 size-4 shrink-0',
  },
  variants: {
    variant: {
      neutral: {
        root: [
          'bg-foreground text-background',
          'shadow-sm border border-foreground/10',
        ],
      },
      primary: {
        root: [
          'bg-primary text-primary-foreground',
          'shadow-sm border border-primary/10',
        ],
      },
      destructive: {
        root: [
          'bg-destructive text-destructive-foreground',
          'shadow-sm border border-destructive/10',
        ],
      },
      basic: {
        root: [
          // base
          'bg-background text-foreground border border-border/30',
          'shadow-sm',
          // hover
          'hover:bg-accent hover:text-accent-foreground hover:border-border/50',
        ],
      },
      ghost: {
        root: [
          'text-foreground',
          'hover:bg-accent hover:text-accent-foreground',
        ],
      },
      link: {
        root: ['text-primary underline-offset-4', 'hover:underline'],
      },
    },
    size: {
      default: {
        root: 'h-10 px-4 py-2 gap-2 rounded-xl',
        icon: 'size-4',
      },
      sm: {
        root: 'h-9 px-3 gap-2 text-sm rounded-xl',
        icon: 'size-3.5',
      },
      lg: {
        root: 'h-11 px-8 gap-2 rounded-xl',
        icon: 'size-4',
      },
      icon: {
        root: 'h-10 w-10 rounded-xl',
        icon: 'size-4',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['neutral', 'primary', 'destructive'],
      class: {
        root: [
          // before - glass effect
          'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit]',
          'before:bg-gradient-to-b before:from-white/20 before:to-transparent before:p-px',
          // before mask
          'before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]',
          // after - shine effect with clip-path animation
          'after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent',
          'after:pointer-events-none after:opacity-0 after:transition-all after:duration-500 after:ease-out',
          'after:[clip-path:polygon(-100%_0,_-100%_100%,_-100%_100%,_-100%_0)]',
          // hover
          'hover:after:opacity-100 hover:after:[clip-path:polygon(-100%_0,_200%_100%,_200%_100%,_200%_0)] hover:shadow-md hover:-translate-y-0.5',
          // active
          'active:translate-y-0 active:shadow-sm',
        ],
      },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type FancyButtonSharedProps = VariantProps<typeof fancyButtonVariants>

type FancyButtonProps = VariantProps<typeof fancyButtonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }

const FancyButtonRoot = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ asChild, children, variant, size, className, ...rest }, forwardedRef) => {
    const uniqueId = React.useId()
    const Component = asChild ? Slot : 'button'
    const { root } = fancyButtonVariants({ variant, size })

    const sharedProps: FancyButtonSharedProps = {
      variant,
      size,
    }

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [FANCY_BUTTON_ICON_NAME],
      uniqueId,
      asChild
    )

    return (
      <Component
        ref={forwardedRef}
        className={root({ class: className })}
        {...rest}
      >
        {extendedChildren}
      </Component>
    )
  }
)
FancyButtonRoot.displayName = FANCY_BUTTON_ROOT_NAME

function FancyButtonIcon<T extends React.ElementType>({
  className,
  variant,
  size,
  as,
  ...rest
}: PolymorphicComponentProps<T, FancyButtonSharedProps>) {
  const Component = as || 'div'
  const { icon } = fancyButtonVariants({ variant, size })

  return <Component className={icon({ class: className })} {...rest} />
}
FancyButtonIcon.displayName = FANCY_BUTTON_ICON_NAME

export { FancyButtonRoot as Root, FancyButtonIcon as Icon }
