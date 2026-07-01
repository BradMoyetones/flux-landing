import { notFound } from "next/navigation"
import { source } from "@/lib/source"
import { DocsTableOfContents } from "@/components/docs/DocsTOC"
import { DocsPager } from "@/components/docs/DocsPager"
import { findNeighbour } from "fumadocs-core/page-tree"
import { mdxComponents } from "@/mdx-components"

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body
  const neighbours = findNeighbour(source.pageTree, page.url)

  return (
    <div className="flex w-full min-w-0">
      <main className="flex-1 min-w-0">
        <div className="w-full max-w-3xl px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {page.data.title}
            </h1>
            {page.data.description && (
              <p className="text-lg text-muted-foreground">
                {page.data.description}
              </p>
            )}
          </div>
          
          <div>
            <MDX components={mdxComponents} />
          </div>

          <DocsPager 
            previous={neighbours.previous ? { name: neighbours.previous.name, url: neighbours.previous.url } : null} 
            next={neighbours.next ? { name: neighbours.next.name, url: neighbours.next.url } : null} 
          />
        </div>
      </main>
      
      {/* TOC column */}
      <div className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pt-8">
          {page.data.toc?.length > 0 && (
            <DocsTableOfContents toc={page.data.toc} />
          )}
        </div>
      </div>
    </div>
  )
}
