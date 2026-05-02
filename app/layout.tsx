import { Provider } from '@/components/provider';
import './global.css';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-CN" className="font-sans" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen text-foreground">
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
