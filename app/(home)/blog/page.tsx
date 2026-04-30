import { blogSource } from '@/lib/blog-source';
import { Card } from '@heroui/react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Newspaper,
} from 'lucide-react';

function BentoCard({
  children,
  className = '',
  gradient = false,
  gradientClass = '',
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  gradientClass?: string;
}) {
  return (
    <div
      className={`bento-card ${gradient ? gradientClass : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default async function BlogPage() {
  const pages = blogSource.getPages();

  // Sort by date descending
  const sorted = [...pages].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[var(--accent)] opacity-[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="size-5 text-[var(--accent)]" />
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">
              博客
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-4">
            DocME 博客
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            探索最新产品动态、技术深度文章与设计理念分享
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {sorted.map((page) => (
              <BentoCard key={page.url} className="group">
                <Link href={page.url} className="block h-full">
                  <div className="p-5 sm:p-6 h-full flex flex-col">
                    {/* Tags */}
                    {page.data.tags && page.data.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {page.data.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-medium"
                          >
                            <Tag className="size-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {page.data.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 flex-1">
                      {page.data.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)] text-[var(--muted)]">
                      {page.data.author && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <User className="size-3.5" />
                          <span>{page.data.author}</span>
                        </div>
                      )}
                      {page.data.date && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="size-3.5" />
                          <span>{page.data.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Read more */}
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>阅读全文</span>
                      <ArrowRight className="size-3" />
                    </div>
                  </div>
                </Link>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[var(--surface-secondary)] border border-[var(--border)]">
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
                准备好开始了吗？
              </h2>
              <p className="text-base text-[var(--muted)] mb-8 max-w-xl mx-auto">
                阅读我们的文档，了解如何使用 DocME 构建你的文档站点
              </p>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <BookOpen className="size-4" />
                阅读文档
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
