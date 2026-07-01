import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsHeader } from '@/components/docs/DocsHeader';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Container } from '@/components/ui/Container';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-outfit">
      <DocsHeader />
      <Container className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <DocsSidebar tree={source.pageTree} />
          </div>
        </aside>
        {children}
      </Container>
    </div>
  );
}
