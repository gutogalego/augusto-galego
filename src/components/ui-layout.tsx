import { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { UINav } from "./ui-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples app built using the components.",
}

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function UILayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <div className="container relative">
        <PageHeader className="page-header pb-8">
          <Link
            href="https://github.com/gutogalego/augusto-galego/blob/main/src/pages/ui/dashboard/index.tsx"
            target="_blank"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
          >
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span className="sm:hidden">Style, a new CLI and more.</span>
            <span className="hidden sm:inline">
              Look at the code on github
            </span>
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
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
              className={cn(buttonVariants(), "rounded-[6px]")}
            >
              Get Started
            </Link>
            <Link
              href="/components"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-[6px]"
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
