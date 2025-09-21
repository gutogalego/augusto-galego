// AlignUI Input v0.0.0

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@/lib/shadcn'
import type { PolymorphicComponentProps } from '@/utils/polymorphic'
import { recursiveCloneChildren } from '@/utils/recursive-clone-children'
import { type VariantProps, tv } from '@/utils/tv'

const INPUT_ROOT_NAME = 'InputRoot'
const INPUT_WRAPPER_NAME = 'InputWrapper'
const INPUT_EL_NAME = 'InputEl'
const INPUT_ICON_NAME = 'InputIcon'
const INPUT_AFFIX_NAME = 'InputAffixButton'
const INPUT_INLINE_AFFIX_NAME = 'InputInlineAffixButton'

const inputVariants = tv({
  slots: {
    root: [
      // base
      'group relative flex w-full overflow-hidden bg-card text-foreground shadow-sm',
      'transition duration-200 ease-out',
      'divide-x divide-border/50',
      // before
      'before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-border',
      'before:pointer-events-none before:rounded-[inherit]',
      'before:transition before:duration-200 before:ease-out',
      // hover
      'hover:shadow-md hover:before:ring-border/70',
      // focus
      'has-[input:focus]:shadow-lg has-[input:focus]:before:ring-ring',
      // disabled
      'has-[input:disabled]:shadow-none has-[input:disabled]:before:ring-transparent has-[input:disabled]:opacity-50',
    ],
    wrapper: [
      // base
      'group/input-wrapper flex w-full cursor-text items-center bg-card',
      'transition duration-200 ease-out',
      // hover
      'hover:[&:not(&:has(input:focus))]:bg-accent/50',
      // disabled
      'has-[input:disabled]:pointer-events-none has-[input:disabled]:bg-muted/50',
    ],
    input: [
      // base
      'w-full bg-transparent text-sm text-foreground outline-none',
      'transition duration-200 ease-out',
      // placeholder
      'placeholder:select-none placeholder:text-muted-foreground placeholder:transition placeholder:duration-200 placeholder:ease-out',
      // hover placeholder
      'group-hover/input-wrapper:placeholder:text-muted-foreground/80',
      // focus
      'focus:outline-none',
      // focus placeholder
      'group-has-[input:focus]:placeholder:text-muted-foreground/60',
      // disabled
      'disabled:text-muted-foreground disabled:placeholder:text-muted-foreground/50',
    ],
    icon: [
      // base
      'flex size-4 shrink-0 select-none items-center justify-center',
      'transition duration-200 ease-out',
      // placeholder state
      'group-has-[:placeholder-shown]:text-muted-foreground/60',
      // filled state
      'text-muted-foreground',
      // hover
      'group-has-[:placeholder-shown]:group-hover/input-wrapper:text-muted-foreground/80',
      // focus
      'group-has-[:placeholder-shown]:group-has-[input:focus]/input-wrapper:text-foreground',
      // disabled
      'group-has-[input:disabled]/input-wrapper:text-muted-foreground/40',
    ],
    affix: [
      // base
      'shrink-0 bg-card text-sm text-muted-foreground',
      'flex items-center justify-center truncate',
      'transition duration-200 ease-out',
      // placeholder state
      'group-has-[:placeholder-shown]:text-muted-foreground/60',
      // focus state
      'group-has-[:placeholder-shown]:group-has-[input:focus]:text-foreground',
    ],
    inlineAffix: [
      // base
      'text-sm text-muted-foreground',
      // placeholder state
      'group-has-[:placeholder-shown]:text-muted-foreground/60',
      // focus state
      'group-has-[:placeholder-shown]:group-has-[input:focus]:text-foreground',
    ],
  },
  variants: {
    size: {
      default: {
        root: 'rounded-lg',
        wrapper: 'gap-2 px-3',
        input: 'h-10',
      },
      sm: {
        root: 'rounded-md',
        wrapper: 'gap-2 px-2.5',
        input: 'h-9',
      },
      lg: {
        root: 'rounded-lg',
        wrapper: 'gap-3 px-4',
        input: 'h-12',
      },
    },
    hasError: {
      true: {
        root: [
          // base
          'before:ring-destructive',
          // hover
          'hover:before:ring-destructive hover:[&:not(&:has(input:focus)):has(>:only-child)]:before:ring-destructive',
          // focus
          'has-[input:focus]:shadow-destructive/20 has-[input:focus]:before:ring-destructive',
        ],
      },
      false: {
        root: [
          // hover
          'hover:[&:not(:has(input:focus)):has(>:only-child)]:before:ring-transparent',
        ],
      },
    },
  },
  compoundVariants: [
    //#region affix
    {
      size: 'default',
      class: {
        affix: 'px-3',
      },
    },
    {
      size: ['sm', 'lg'],
      class: {
        affix: 'px-3',
      },
    },
    //#endregion
  ],
  defaultVariants: {
    size: 'default',
    hasError: false,
  },
})

type InputSharedProps = VariantProps<typeof inputVariants>

function InputRoot({
  className,
  children,
  size,
  hasError,
  asChild,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> &
  InputSharedProps & {
    asChild?: boolean
  }) {
  const uniqueId = React.useId()
  const Component = asChild ? Slot : 'div'

  const { root } = inputVariants({
    size,
    hasError,
  })

  const sharedProps: InputSharedProps = {
    size,
    hasError,
  }

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [
      INPUT_WRAPPER_NAME,
      INPUT_EL_NAME,
      INPUT_ICON_NAME,
      INPUT_AFFIX_NAME,
      INPUT_INLINE_AFFIX_NAME,
    ],
    uniqueId,
    asChild
  )

  return (
    <Component className={root({ class: className })} {...rest}>
      {extendedChildren}
    </Component>
  )
}
InputRoot.displayName = INPUT_ROOT_NAME

function InputWrapper({
  className,
  children,
  size,
  hasError,
  asChild,
  ...rest
}: React.HTMLAttributes<HTMLLabelElement> &
  InputSharedProps & {
    asChild?: boolean
  }) {
  const Component = asChild ? Slot : 'label'

  const { wrapper } = inputVariants({
    size,
    hasError,
  })

  return (
    <Component className={wrapper({ class: className })} {...rest}>
      {children}
    </Component>
  )
}
InputWrapper.displayName = INPUT_WRAPPER_NAME

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> &
    InputSharedProps & {
      asChild?: boolean
    }
>(
  (
    { className, type = 'text', size, hasError, asChild, ...rest },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'input'

    const { input } = inputVariants({
      size,
      hasError,
    })

    return (
      <Component
        type={type}
        className={input({ class: className })}
        ref={forwardedRef}
        {...rest}
      />
    )
  }
)
Input.displayName = INPUT_EL_NAME

function InputIcon<T extends React.ElementType = 'div'>({
  size,
  hasError,
  as,
  className,
  ...rest
}: PolymorphicComponentProps<T, InputSharedProps>) {
  const Component = as || 'div'
  const { icon } = inputVariants({ size, hasError })

  return <Component className={icon({ class: className })} {...rest} />
}
InputIcon.displayName = INPUT_ICON_NAME

function InputAffix({
  className,
  children,
  size,
  hasError,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & InputSharedProps) {
  const { affix } = inputVariants({
    size,
    hasError,
  })

  return (
    <div className={affix({ class: className })} {...rest}>
      {children}
    </div>
  )
}
InputAffix.displayName = INPUT_AFFIX_NAME

function InputInlineAffix({
  className,
  children,
  size,
  hasError,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & InputSharedProps) {
  const { inlineAffix } = inputVariants({
    size,
    hasError,
  })

  return (
    <span className={inlineAffix({ class: className })} {...rest}>
      {children}
    </span>
  )
}
InputInlineAffix.displayName = INPUT_INLINE_AFFIX_NAME

// Componente simples para compatibilidade com uso básico
const SimpleInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputSharedProps
>(
  (
    { className, size = 'default' as const, hasError = false, ...props },
    ref
  ) => {
    return (
      <InputRoot size={size} hasError={hasError} className={className}>
        <InputWrapper>
          <Input ref={ref} {...props} />
        </InputWrapper>
      </InputRoot>
    )
  }
)
SimpleInput.displayName = 'SimpleInput'

export {
  InputRoot as Root,
  InputWrapper as Wrapper,
  Input,
  InputIcon as Icon,
  InputAffix as Affix,
  InputInlineAffix as InlineAffix,
  SimpleInput,
  inputVariants,
}

// Export default para compatibilidade
export { SimpleInput as default }
