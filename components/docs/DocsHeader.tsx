import Link from "next/link"
import { Container } from "@/components/ui/Container"
import LogoComponent from "../logo-component"
import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { GITHUB_CONFIG } from "@/lib/config"
import { Search } from "lucide-react"
import { Kbd } from "../ui/kbd"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container className="flex py-3 items-center">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2">
          <LogoComponent />
          Flux
        </Link>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant={"outline"} size={"lg"} className="text-muted-foreground max-w-xl w-full justify-baseline">
            <Search />
            <span>Search</span>
            <Kbd className="font-bold ml-auto">Ctrl + K</Kbd>
          </Button>
          <Link
            href={GITHUB_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"outline"} size={"icon-lg"}>
              <Icons.GitHub />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
