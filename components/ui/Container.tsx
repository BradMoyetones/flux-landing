import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: number | string
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 1440, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 md:px-6 lg:px-8", className)}
        style={{ maxWidth, ...style }}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
