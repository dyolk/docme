'use client';

import { usePathname } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';

interface DocsThemeWrapperProps {
  children: ReactNode;
  colors: Record<string, string>;
}

export function DocsThemeWrapper({ children, colors }: DocsThemeWrapperProps) {
  const pathname = usePathname();
  const section = pathname?.match(/^\/docs\/([^/]+)/)?.[1] ?? '(start)';
  const primaryColor = colors[section];

  const style: CSSProperties | undefined = primaryColor
    ? {
        '--color-fd-primary': primaryColor,
        '--color-fd-accent': `color-mix(in srgb, ${primaryColor} 12%, transparent)`,
        '--color-fd-accent-foreground': primaryColor,
      } as CSSProperties
    : undefined;

  return (
    <div data-section={section} className="contents" style={style}>
      {children}
    </div>
  );
}
