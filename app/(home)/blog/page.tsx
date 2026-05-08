import { blogSource } from '@/lib/blog-source';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import {
  ScrollReveal,
  AppleCard,
  FadeInStagger,
  FadeInStaggerItem,
} from '@/components/apple-animations';

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
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="apple-display-1 mb-6">博客</h1>
            <p className="apple-body-lg text-[var(--apple-text-secondary)] max-w-xl mx-auto">
              最新的技术分享与更新
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {sorted.map((page, index) => (
              <FadeInStaggerItem key={page.url}>
                <Link href={page.url} className="block h-full">
                  <AppleCard delay={index * 0.1} className="h-full">
                    <div className="p-8 h-full flex flex-col">
                      {/* Tags */}
                      {page.data.tags && page.data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(page.data.tags as string[]).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-[var(--apple-bg-tertiary)] text-[var(--apple-text-secondary)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="apple-headline mb-3">
                        {page.data.title}
                      </h2>

                      {/* Description */}
                      <p className="apple-body line-clamp-3 mb-6 flex-1">
                        {page.data.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 apple-caption text-[var(--apple-text-secondary)]">
                        {page.data.author && <span>{page.data.author}</span>}
                        {page.data.author && page.data.date && (
                          <span>·</span>
                        )}
                        {page.data.date && <span>{page.data.date}</span>}
                      </div>
                    </div>
                  </AppleCard>
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <Footer />
    </div>
  );
}
