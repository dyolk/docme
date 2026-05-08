'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function DocsThemeWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const section = pathname?.includes('/guides') ? 'guides' : 'getting-started';

  return (
    <div data-section={section} className="contents">
      {children}
    </div>
  );
}
