'use client';

import { useState } from 'react';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';

interface UsageDocNode {
  slug: string;
  title: string;
  content: React.ReactNode;
}

export function UsageGuideClientView({ docs }: { docs: UsageDocNode[] }) {
  const [selectedSlug, setSelectedSlug] = useState(docs[0]?.slug ?? '');
  const selectedDoc = docs.find((d) => d.slug === selectedSlug);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-start">
      {/* 左侧文档列表 */}
      <div className="w-full md:w-[240px] shrink-0 md:sticky md:top-24 md:self-start">
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden">
          {docs.map((doc) => (
            <button
              key={doc.slug}
              onClick={() => setSelectedSlug(doc.slug)}
              className={`w-full text-left px-4 py-3 text-[14px] font-medium transition-colors duration-150 relative ${
                selectedSlug === doc.slug
                  ? 'text-[#0071E3] bg-[#f5f5f7] dark:bg-[#2c2c2e]'
                  : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]'
              }`}
            >
              {selectedSlug === doc.slug && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#0071E3] rounded-r-full" />
              )}
              {doc.title}
            </button>
          ))}
          {docs.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-[13px] text-[#86868b] dark:text-[#6e6e73]">暂无使用指南</p>
            </div>
          )}
        </div>
      </div>

      {/* 右侧文档内容 */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-6 md:max-h-[calc(100vh-100px)] md:overflow-y-auto scrollbar-hide">
          {selectedDoc ? (
            <DocsBody>
              {selectedDoc.content}
            </DocsBody>
          ) : (
            <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">暂无使用指南</p>
          )}
        </div>
      </div>
    </div>
  );
}
