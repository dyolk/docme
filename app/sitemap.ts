import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `https://doc.dyolk.com${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogs = blogSource.getPages().map((page) => ({
    url: `https://doc.dyolk.com/blog/${page.slugs.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: 'https://doc.dyolk.com', lastModified: new Date(), priority: 1.0, changeFrequency: 'daily' },
    ...docs,
    ...blogs,
  ];
}
