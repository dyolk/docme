'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';

/** Map URL prefix → tag label */
const TAG_MAP: Record<string, string> = {
  '/docs': '文档',
  '/blog': '博客',
  '/releases': '版本追踪',
  '/resources': '资源库',
};

const TAG_LIST = ['文档', '博客', '版本追踪', '资源库'];

/** Derive the source tag from a result URL */
function getTagFromUrl(url: string): string | undefined {
  for (const [prefix, tag] of Object.entries(TAG_MAP)) {
    if (url.startsWith(prefix)) return tag;
  }
  return undefined;
}

function initOrama() {
  return create({
    schema: { _: 'string' },
    // https://docs.orama.com/docs/orama-js/supported-languages
    // Must match server-side tokenizer (route.ts) for correct search results
    components: {
      tokenizer: createTokenizer(),
    },
  });
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const isDocs = pathname.startsWith('/docs');

  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale,
  });
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // On docs pages, always filter to docs only
  const activeTag = isDocs ? '文档' : selectedTag;

  // Filter, deduplicate, and enrich results
  const processedResults = useMemo(() => {
    if (query.data === 'empty' || !query.data) return query.data;

    let results = query.data;

    // Filter by active tag
    if (activeTag) {
      results = results.filter((item) => getTagFromUrl(item.url) === activeTag);
    }

    // Deduplicate by URL — if multiple results point to the same anchor, keep only the first
    const seenUrls = new Set<string>();
    results = results.filter((item) => {
      if (seenUrls.has(item.url)) return false;
      seenUrls.add(item.url);
      return true;
    });

    // In global search mode, prepend tag to breadcrumbs so users can distinguish sources.
    // In docs-only mode, skip this since all results are from the same source.
    if (!isDocs) {
      results = results.map((item) => {
        const tag = getTagFromUrl(item.url);
        if (!tag) return item;
        return {
          ...item,
          breadcrumbs: [tag, ...(item.breadcrumbs || [])] as string[],
        };
      });
    }

    return results;
  }, [query.data, activeTag, isDocs]);

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {/* Only show tag filters in global search (non-docs pages) */}
        {!isDocs && (
          <TagsList tag={selectedTag} onTagChange={setSelectedTag} allowClear className="flex gap-2 px-3 pb-2 mt-3">
            {TAG_LIST.map((tag) => (
              <TagsListItem key={tag} value={tag}>
                {tag}
              </TagsListItem>
            ))}
          </TagsList>
        )}
        <SearchDialogList items={processedResults !== 'empty' ? processedResults : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
