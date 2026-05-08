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
