import * as React from "react"
import Link from "next/link"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export function DocsPager({
  previous,
  next,
}: {
  previous: { name: React.ReactNode; url: string } | null
  next: { name: React.ReactNode; url: string } | null
}) {
  return (
    <div className="flex w-full items-center justify-between py-8">
      {previous ? (
        <Button variant="outline" asChild>
          <Link href={previous.url}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            {previous.name}
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button variant="outline" asChild>
          <Link href={next.url}>
            {next.name}
            <IconArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
}
