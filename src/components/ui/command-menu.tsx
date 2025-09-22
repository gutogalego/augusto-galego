'use client'

import type { DialogProps } from '@radix-ui/react-dialog'
import { Command } from 'cmdk'
import * as React from 'react'

import * as Dialog from '@/components/ui/dialog'
import { cn } from '@/lib/shadcn'
import type { PolymorphicComponentProps } from '@/utils/polymorphic'
import { type VariantProps, tv } from '@/utils/tv'

const CommandDialogTitle = Dialog.DialogTitle
const CommandDialogDescription = Dialog.DialogDescription

const CommandDialog = ({
  children,
  className,
  overlayClassName,
  ...rest
}: DialogProps & {
  className?: string
  overlayClassName?: string
}) => {
  return (
    <Dialog.Dialog {...rest}>
      <Dialog.DialogPortal>
        <Dialog.DialogOverlay
          className={cn(
            'justify-center items-center sm:justify-center sm:items-start sm:pt-[10vh]',
            overlayClassName
          )}
        />
        <Dialog.DialogContent
          className={cn(
            'flex max-h-[90vh] sm:max-h-[80vh] max-w-[720px] flex-col overflow-hidden rounded-2xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4',
            className
          )}
        >
          <Command
            className={cn(
              'divide-y divide-border',
              'grid min-h-0 auto-cols-auto grid-flow-row',
              '[&>[cmdk-label]+*]:!border-t-0'
            )}
          >
            {children}
          </Command>
        </Dialog.DialogContent>
      </Dialog.DialogPortal>
    </Dialog.Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof Command.Input>,
  React.ComponentPropsWithoutRef<typeof Command.Input>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.Input
      ref={forwardedRef}
      className={cn(
        // base
        'w-full bg-transparent text-lg text-foreground outline-none',
        'transition duration-200 ease-out',
        // placeholder
        'placeholder:[transition:inherit]',
        'placeholder:text-muted-foreground',
        // hover
        'group-hover/cmd-input:placeholder:text-muted-foreground/80',
        // focus
        'focus:outline-none',
        className
      )}
      {...rest}
    />
  )
})
CommandInput.displayName = 'CommandInput'

const CommandList = React.forwardRef<
  React.ComponentRef<typeof Command.List>,
  React.ComponentPropsWithoutRef<typeof Command.List>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.List
      ref={forwardedRef}
      className={cn(
        'flex max-h-min min-h-0 flex-1 flex-col',
        '[&>[cmdk-list-sizer]]:divide-y [&>[cmdk-list-sizer]]:divide-border',
        '[&>[cmdk-list-sizer]]:overflow-auto',
        className
      )}
      {...rest}
    />
  )
})
CommandList.displayName = 'CommandList'

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof Command.Group>,
  React.ComponentPropsWithoutRef<typeof Command.Group>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.Group
      ref={forwardedRef}
      className={cn(
        'relative px-2 py-3',
        // heading
        '[&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:text-muted-foreground',
        '[&>[cmdk-group-heading]]:mb-2 [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:pt-1',
        '[&>[cmdk-group-heading]]:font-semibold [&>[cmdk-group-heading]]:tracking-wide',
        '[&>[cmdk-group-heading]]:uppercase',
        className
      )}
      {...rest}
    />
  )
})
CommandGroup.displayName = 'CommandGroup'

const commandItemVariants = tv({
  base: [
    'flex items-center gap-3 rounded-lg bg-background',
    'cursor-pointer text-sm text-foreground',
    'transition duration-200 ease-out',
    // hover/selected
    'data-[selected=true]:bg-accent/50',
    'hover:bg-accent/30',
  ],
  variants: {
    size: {
      small: 'px-3 py-2.5',
      medium: 'px-3 py-3',
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

type CommandItemProps = VariantProps<typeof commandItemVariants> &
  React.ComponentPropsWithoutRef<typeof Command.Item>

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof Command.Item>,
  CommandItemProps
>(({ className, size, ...rest }, forwardedRef) => {
  return (
    <Command.Item
      ref={forwardedRef}
      className={commandItemVariants({ size, class: className })}
      {...rest}
    />
  )
})
CommandItem.displayName = 'CommandItem'

function CommandItemIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div'

  return (
    <Component
      className={cn('size-5 shrink-0 text-muted-foreground/80', className)}
      {...rest}
    />
  )
}

function CommandFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-12 items-center justify-between gap-3 px-5 border-t border-border bg-muted/5',
        className
      )}
      {...rest}
    />
  )
}

function CommandFooterKeyBox({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded bg-muted/50 text-muted-foreground ring-1 ring-inset ring-border/30 text-xs font-medium',
        className
      )}
      {...rest}
    />
  )
}

export {
  CommandDialog as Dialog,
  CommandDialogTitle as DialogTitle,
  CommandDialogDescription as DialogDescription,
  CommandInput as Input,
  CommandList as List,
  CommandGroup as Group,
  CommandItem as Item,
  CommandItemIcon as ItemIcon,
  CommandFooter as Footer,
  CommandFooterKeyBox as FooterKeyBox,
}
