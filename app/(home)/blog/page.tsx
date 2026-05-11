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
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Page Header */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <ScrollReveal>
            <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05] mb-4">
              博客
            </h1>
            <p className="text-[17px] text-[#6e6e73] dark:text-[#a1a1a6]">
              最新的技术分享与更新
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <FadeInStagger
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            staggerDelay={0.08}
          >
            {sorted.map((page, index) => (
              <FadeInStaggerItem key={page.url}>
                <Link href={page.url} className="block h-full group">
                  <AppleCard
                    delay={index * 0.08}
                    className="h-full overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] border-0 shadow-none"
                  >
                    {page.data.cover && (
                      <div className="overflow-hidden">
                        <img
                          src={page.data.cover}
                          alt={page.data.title}
                          className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-8 flex flex-col gap-4">
                      {/* Date */}
                      {page.data.date && (
                        <span className="text-[13px] text-[#6e6e73] dark:text-[#86868b] font-medium tracking-wide">
                          {page.data.date}
                        </span>
                      )}

                      {/* Title */}
                      <h2 className="text-[22px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-snug">
                        {page.data.title}
                      </h2>

                      {/* Description */}
                      {page.data.description && (
                        <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed line-clamp-3">
                          {page.data.description}
                        </p>
                      )}

                      {/* Tags */}
                      {page.data.tags && (page.data.tags as string[]).length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {(page.data.tags as string[]).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[12px] px-3 py-1 rounded-full bg-white dark:bg-[#2c2c2e] text-[#6e6e73] dark:text-[#a1a1a6]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Author */}
                      {page.data.author && (
                        <p className="text-[13px] text-[#6e6e73] dark:text-[#86868b] pt-1">
                          {page.data.author}
                        </p>
                      )}
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
