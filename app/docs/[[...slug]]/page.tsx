import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import { DocsPage } from 'fumadocs-ui/page';
import {
  DocsBody,
  DocsDescription,
  DocsTitle,
  MarkdownCopyButton,
  PageFooter,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { blogSource } from '@/lib/blog-source';
import Link from 'next/link';
import { BookOpen, FolderOpen, GitBranch, Compass, Newspaper, Link2 } from 'lucide-react';
import { CustomTOC } from '@/components/toc-custom';
import { TOCProvider } from 'fumadocs-ui/components/toc';
import { TOCPopover } from 'fumadocs-ui/layouts/docs/page/slots/toc';
import websitesData from '@/content/useful-websites.json';
import { Footer } from '@/components/footer';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : undefined}
      breadcrumb={{ includeRoot: true, includePage: true }}
      slots={{
        toc: {
          provider: TOCProvider,
          main: CustomTOC,
          popover: TOCPopover,
        },
      }}
      tableOfContent={{
        header: (
          <div className="mb-4 pb-4 border-b border-[#d2d2d7]/30 dark:border-[#3a3a3c]/50">
            <p className="flex items-center gap-1.5 text-sm text-fd-muted-foreground mb-2">
              <Compass className="size-3.5" />
              快速导航
            </p>
            <div className="flex flex-col gap-0.5">
              <Link href="/blog" className="flex items-center gap-2 py-1.5 px-2 text-sm text-fd-muted-foreground hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c1e] rounded-lg transition-colors">
                <BookOpen className="size-3.5 shrink-0" />
                <span>博客</span>
              </Link>
              <Link href="/resources" className="flex items-center gap-2 py-1.5 px-2 text-sm text-fd-muted-foreground hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c1e] rounded-lg transition-colors">
                <FolderOpen className="size-3.5 shrink-0" />
                <span>资源</span>
              </Link>
              <Link href="/releases" className="flex items-center gap-2 py-1.5 px-2 text-sm text-fd-muted-foreground hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c1e] rounded-lg transition-colors">
                <GitBranch className="size-3.5 shrink-0" />
                <span>版本追踪</span>
              </Link>
            </div>
          </div>
        ),
        footer: (() => {
          const pages = blogSource.getPages();
          const sorted = [...pages].sort((a, b) => {
            const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
            const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
            if (dateB !== dateA) return dateB - dateA;
            return (a.data.title || '').localeCompare(b.data.title || '');
          });
          const latest = sorted.slice(0, 5);
          const friendLinks = (websitesData as { name: string; url: string; description: string; icon?: string }[]).slice(0, 3);

          return (
            <>
              {/* 最新博客 */}
              <div className="mt-4 pt-4 border-t border-[#d2d2d7]/30 dark:border-[#3a3a3c]/50">
                <p className="flex items-center gap-1.5 text-sm text-fd-muted-foreground mb-2.5">
                  <Newspaper className="size-3.5" />
                  最新博客
                </p>
                <div className="flex flex-col gap-2">
                  {latest.map((post) => (
                    <Link key={post.url} href={post.url} className="text-[13px] text-[#1d1d1f] dark:text-[#f5f5f7] hover:text-[#0071E3] transition-colors leading-snug line-clamp-2">
                      {post.data.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 友链 */}
              {friendLinks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#d2d2d7]/30 dark:border-[#3a3a3c]/50">
                  <p className="flex items-center gap-1.5 text-sm text-fd-muted-foreground mb-2.5">
                    <Link2 className="size-3.5" />
                    友链
                  </p>
                  <div className="flex flex-col gap-2">
                    {friendLinks.map((site) => (
                      <a
                        key={site.url}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c1e] transition-colors"
                      >
                        {site.icon ? (
                          <img src={site.icon} alt="" className="size-4 shrink-0 rounded-sm object-contain" />
                        ) : (
                          <span className="size-4 shrink-0 rounded-sm bg-[#f5f5f7] dark:bg-[#2c2c2e] flex items-center justify-center text-[9px] font-bold text-[#86868b] dark:text-[#a1a1a6]">
                            {site.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span className="truncate leading-snug group-hover:text-[#0071E3] dark:group-hover:text-[#007aff] transition-colors">{site.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })(),
      }}
      tableOfContentPopover={{
        footer: (() => {
          const friendLinks = (websitesData as { name: string; url: string; description: string; icon?: string }[]).slice(0, 3);
          return friendLinks.length > 0 ? (
            <div className="mt-3 pt-3 border-t border-[#d2d2d7]/30 dark:border-[#3a3a3c]/50">
              <p className="flex items-center gap-1.5 text-sm text-fd-muted-foreground mb-2">
                <Link2 className="size-3.5" />
                友链
              </p>
              <div className="flex flex-col gap-1.5">
                {friendLinks.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#1d1d1f] dark:text-[#f5f5f7] hover:text-[#0071E3] transition-colors truncate"
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            </div>
          ) : undefined;
        })(),
      }}
      footer={{
        component: (
          <>
            <PageFooter />
            <Footer />
          </>
        ),
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = source.generateParams();

  // 确保包含根路径 /docs（slug 为空数组）
  return [...params, { slug: [] }];
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
