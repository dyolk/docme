'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    cache.set(key, fn());
  }
  return cache.get(key) as Promise<T>;
}

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '-');
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      });

      try {
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setSvg(rendered);
        }
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart, resolvedTheme, id]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
