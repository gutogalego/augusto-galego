"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const examples = [
  {
    name: "Dashboard",
    href: "/ui/dashboard",
  },
  {
    name: "Cards",
    href: "/ui/cards",
  },
  {
    name: "Tasks",
    href: "/ui/tasks",
  },
  {
    name: "Playground",
    href: "/ui/tasks",
  },
  {
    name: "Forms",
    href: "/ui/tasks",
  },
  {
    name: "Music",
    href: "/ui/tasks",
  },
  {
    name: "Authentication",
    href: "/ui/tasks",
  },
]


export function UINav({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center px-4",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}


