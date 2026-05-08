import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <div className="glass-page-bg min-h-screen">
      <DocsLayout
        tree={source.getPageTree()}
        {...docsOptions()}
        sidebar={{
          collapsible: true,
          defaultOpenLevel: 1,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
