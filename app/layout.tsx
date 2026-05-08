import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://doc.dyolk.com'),
  title: { default: 'DocME', template: '%s | DocME' },
  description: 'DevSecOps 查询手册',
  openGraph: {
    siteName: 'DocME',
    url: 'https://doc.dyolk.com',
    type: 'website',
  },
  alternates: {
    types: { 'application/rss+xml': [{ title: 'DocME Blog', url: '/rss.xml' }] },
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif' }}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
