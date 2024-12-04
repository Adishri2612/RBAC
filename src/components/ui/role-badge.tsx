import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        user:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        admin:
          "border-transparent bg-input text-accent-foreground",
        superadmin:
          "border-transparent bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function RoleBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { RoleBadge }
