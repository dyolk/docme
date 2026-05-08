import { blogSource } from '@/lib/blog-source';

export const revalidate = false;

export function GET() {
  const pages = blogSource.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date || '');
    const dateB = new Date(b.data.date || '');
    return dateB.getTime() - dateA.getTime();
  });

  const items = pages.map((page) => {
    const url = `https://doc.dyolk.com/blog/${page.slugs.join('/')}`;
    const date = page.data.date ? new Date(page.data.date).toUTCString() : new Date().toUTCString();
    return `    <item>
      <title>${escapeXml(page.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${date}</pubDate>
      <description>${escapeXml(page.data.description || '')}</description>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DocME Blog</title>
    <link>https://doc.dyolk.com/blog</link>
    <description>DevSecOps 查询手册 - 博客</description>
    <language>zh-CN</language>
    <atom:link href="https://doc.dyolk.com/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
