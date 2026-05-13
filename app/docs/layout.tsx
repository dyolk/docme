import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { DocsThemeWrapper } from '@/components/docs-theme-wrapper';
import { getSectionColors } from '@/lib/tab-colors';

// 根据 tab URL 路径获取对应的颜色分组
function getTabSection(url: string | undefined): string {
  if (!url) return '(start)';
  const match = url.match(/^\/docs\/([^/]+)/);
  return match ? match[1] : '(start)';
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const sectionColors = getSectionColors();

  return (
    <DocsThemeWrapper colors={sectionColors}>
      <div className="min-h-screen bg-white dark:bg-black">
        <DocsLayout
          tree={source.getPageTree()}
          {...docsOptions()}
          sidebar={{
            collapsible: true,
            defaultOpenLevel: 1,
          }}
          tabs={{
            transform(option, node) {
              const section = getTabSection(option.url);
              const color = sectionColors[section] ?? 'var(--color-fd-foreground)';

              return {
                ...option,
                icon: (
                  <div
                    className="flex items-center justify-center rounded-md p-1 [&_svg]:size-5"
                    style={{ color } as React.CSSProperties}
                  >
                    {node.icon}
                  </div>
                ),
              };
            },
          }}
        >
          {children}
        </DocsLayout>
      </div>
    </DocsThemeWrapper>
  );
}
