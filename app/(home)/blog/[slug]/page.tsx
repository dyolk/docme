import { blogSource } from '@/lib/blog-source';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { calculateReadingTime, formatBlogDate } from '@/lib/shared';
import { join } from 'path';

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);

  if (!page) notFound();

  const MDX = page.data.body;
  const readingTime = calculateReadingTime(
    join(process.cwd(), 'content', 'blog', `${page.path}`)
  );

  // 获取推荐文章（按日期降序，相同日期按标题排序）
  const allPosts = blogSource.getPages();
  const relatedPosts = allPosts
    .filter((p) => p.url !== page.url)
    .sort((a, b) => {
      // 优先相同 tag
      const aMatch = a.data.tags?.some((t: string) => page.data.tags?.includes(t)) ? 1 : 0;
      const bMatch = b.data.tags?.some((t: string) => page.data.tags?.includes(t)) ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      // 按日期降序
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      // 相同日期按标题排序，确保顺序稳定
      return (a.data.title || '').localeCompare(b.data.title || '');
    })
    .slice(0, 3);

  return (
    <div className="py-12 sm:py-20 px-6 bg-white dark:bg-black min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        {/* Main Panel */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-xl overflow-hidden">
          {/* Cover */}
          {page.data.cover && (
            <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden">
              <img
                src={page.data.cover}
                alt={page.data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 sm:p-12 lg:p-16">
            {/* Back link */}
            <Link
              href="/blog"
              className="text-[#0071e3] text-[15px] inline-flex items-center gap-1.5 mb-8 hover:underline transition-colors"
            >
              <ArrowLeft size={16} />
              返回博客
            </Link>

            {/* Article Header */}
            <header className="mb-10 sm:mb-14">
              {/* Tags */}
              {page.data.tags && page.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {page.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#6e6e73] dark:text-[#a1a1a6] text-[12px] font-medium"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] mb-6">
                {page.data.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {page.data.author && (
                  <span className="text-[13px] text-[#6e6e73] dark:text-[#86868b]">
                    {page.data.author}
                  </span>
                )}
                {page.data.date && (
                  <span className="text-[13px] text-[#6e6e73] dark:text-[#86868b]">
                    {formatBlogDate(page.data.date)}
                  </span>
                )}
                <span className="text-[13px] text-[#6e6e73] dark:text-[#86868b]">
                  阅读时间约 {readingTime} 分钟
                </span>
              </div>
            </header>

            {/* Article Content */}
            <article className="leading-[1.75]">
              <DocsBody>
                <MDX components={getMDXComponents()} />
              </DocsBody>
            </article>
          </div>
        </div>

        {/* 相关推荐 */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-8">
              更多文章。
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.url} href={post.url} className="group block h-full">
                  <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {post.data.cover && (
                      <div className="h-[180px] overflow-hidden">
                        <img
                          src={post.data.cover}
                          alt={post.data.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      {post.data.date && (
                        <span className="text-[13px] text-[#6e6e73] dark:text-[#86868b] font-medium tracking-wide block mb-2">
                          {formatBlogDate(post.data.date)}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2 line-clamp-2">
                        {post.data.title}
                      </h3>
                      <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] line-clamp-2">
                        {post.data.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Link */}
        <div className="mt-12 sm:mt-16 text-center pb-8">
          <Link
            href="/blog"
            className="text-[#0071e3] text-[15px] inline-flex items-center gap-1.5 hover:underline transition-colors"
          >
            <ArrowLeft size={16} />
            返回博客
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params = blogSource.generateParams('slug');
  return params.map((p) => ({
    slug: Array.isArray(p.slug) ? p.slug.join('/') : p.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
