import { ArrowRightIcon } from '@radix-ui/react-icons'
import type { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from './page-header'
import { UINav } from './ui-nav'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Check out some examples app built using the components.',
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function UILayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <Link
        href="/"
        rel="nofollow"
        className="absolute left-10 top-10 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        {'<-'}
      </Link>
      <div className="container relative">
        <PageHeader className="page-header pb-8">
          <PageHeaderHeading className="hidden md:block">
            Check out some examples.
          </PageHeaderHeading>
          <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
          <PageHeaderDescription>
            Dashboard, cards, authentication. Some examples built using the
            components. Use this as a guide to build your own.
          </PageHeaderDescription>
          <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
            <Link
              href="/docs"
              className={cn(buttonVariants(), 'rounded-[6px]')}
            >
              Get Started
            </Link>
            <Link
              href="/components"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-[6px]'
              )}
            >
              Components
            </Link>
          </section>
        </PageHeader>
        <section>
          <UINav />
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            {children}
          </div>
        </section>
      </div>
    </>
  )
}
