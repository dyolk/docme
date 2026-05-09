import { blogSource } from '@/lib/blog-source';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);

  if (!page) notFound();

  const MDX = page.data.body;
  const readingTime = Math.ceil(page.data.body.toString().length / 500);

  // 获取推荐文章
  const allPosts = blogSource.getPages();
  const relatedPosts = allPosts
    .filter((p) => p.url !== page.url)
    .sort((a, b) => {
      // 优先相同 tag
      const aMatch = a.data.tags?.some((t: string) => page.data.tags?.includes(t)) ? 1 : 0;
      const bMatch = b.data.tags?.some((t: string) => page.data.tags?.includes(t)) ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      // 否则按日期
      return new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime();
    })
    .slice(0, 3);

  return (
    <div className="py-20 px-6">
      <div className="max-w-[720px] mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-[var(--apple-blue)] text-base inline-flex items-center gap-1 mb-8 hover:underline transition-colors"
        >
          <ArrowLeft size={16} />
          返回博客
        </Link>

        {/* Hero Cover */}
        {page.data.cover && (
          <div className="relative w-full h-[360px] mb-12 rounded-2xl overflow-hidden">
            <img
              src={page.data.cover}
              alt={page.data.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Header */}
        <header className="text-center mb-12">
          {/* Tags */}
          {page.data.tags && page.data.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {page.data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-medium"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="apple-display-1 mb-5">
            {page.data.title}
          </h1>

          {/* Meta */}
          <p className="apple-caption">
            {[
              page.data.author,
              page.data.date,
              `阅读时间约 ${readingTime} 分钟`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </header>

        {/* Article Content */}
        <article className="leading-[1.75]">
          <DocsBody>
            <MDX components={getMDXComponents()} />
          </DocsBody>
        </article>

        {/* 相关推荐 */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#d2d2d7] dark:border-[#424245]">
            <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-8">
              更多文章。
            </h2>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {relatedPosts.map((post) => (
                <Link key={post.url} href={post.url} className="group">
                  <div className="bg-white dark:bg-[#1d1d1f] rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {post.data.cover && (
                      <div className="h-[160px] overflow-hidden">
                        <img
                          src={post.data.cover}
                          alt={post.data.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mb-2 line-clamp-2">
                        {post.data.title}
                      </h3>
                      <p className="text-sm text-[#6e6e73] line-clamp-2 mb-3">
                        {post.data.description}
                      </p>
                      <span className="text-xs text-[#6e6e73]">{post.data.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Link */}
        <div className="mt-16 pt-8 border-t border-[var(--apple-border)] text-center">
          <Link
            href="/blog"
            className="text-[var(--apple-blue)] text-base inline-flex items-center gap-1 hover:underline transition-colors"
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
