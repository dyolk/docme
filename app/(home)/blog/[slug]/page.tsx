import { blogSource } from '@/lib/blog-source';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Clock,
} from 'lucide-react';

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Article Header */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[var(--accent)] opacity-[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            返回博客
          </Link>

          {/* Tags */}
          {page.data.tags && page.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {page.data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium"
                >
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-4">
            {page.data.title}
          </h1>

          {/* Description */}
          {page.data.description && (
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
              {page.data.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            {page.data.author && (
              <div className="flex items-center gap-1.5">
                <User className="size-4" />
                <span>{page.data.author}</span>
              </div>
            )}
            {page.data.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <span>{page.data.date}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>阅读时间约 {Math.ceil(page.data.body.toString().length / 500)} 分钟</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 sm:py-12 blog-article">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <DocsBody>
            <MDX components={getMDXComponents()} />
          </DocsBody>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors"
            >
              <ArrowLeft className="size-4" />
              返回博客列表
            </Link>
          </div>
        </div>
      </article>
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
