import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Glassmorphism background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="glass-blob glass-blob-1" />
          <div className="glass-blob glass-blob-2" />
          <div className="glass-blob glass-blob-3" />
        </div>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
