"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type * as PageTree from "fumadocs-core/page-tree"

interface DocsSidebarProps {
  tree: PageTree.Root
}

function SidebarItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname()
  const isActive = pathname === item.url

  return (
    <Link
      href={item.url}
      className={cn(
        "flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm transition-colors hover:bg-muted/50 hover:text-foreground",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground"
      )}
    >
      {item.name}
    </Link>
  )
}

function SidebarFolder({ folder }: { folder: PageTree.Folder }) {
  const pathname = usePathname()
  const isIndexActive = folder.index?.url === pathname

  return (
    <div className="flex flex-col gap-1 pb-2">
      <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
        {folder.index ? (
          <Link
            href={folder.index.url}
            className={cn(
              "hover:text-foreground",
              isIndexActive ? "text-foreground" : "text-foreground"
            )}
          >
            {folder.name}
          </Link>
        ) : (
          folder.name
        )}
      </h4>
      <div className="flex flex-col gap-1 pr-2">
        {folder.children.map((child, i) => (
          <SidebarNode key={i} node={child} />
        ))}
      </div>
    </div>
  )
}

function SidebarNode({ node }: { node: PageTree.Node }) {
  if (node.type === "page") {
    return <SidebarItem item={node} />
  }
  if (node.type === "folder") {
    return <SidebarFolder folder={node} />
  }
  return null
}

export function DocsSidebar({ tree }: DocsSidebarProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {tree.children.map((child, i) => (
          <SidebarNode key={i} node={child} />
        ))}
      </div>
    </div>
  )
}
