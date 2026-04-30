import Link from 'next/link';
import Image from 'next/image';
import {
  Github,
  Globe,
  MessageSquare,
} from 'lucide-react';

function DILogo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-[var(--accent)] text-white font-bold select-none ${className}`}
      style={{ fontSize: '0.6em', lineHeight: 1 }}
    >
      DI
    </span>
  );
}

export function Footer() {
  const linkGroups = [
    {
      title: '产品',
      links: [
        { label: '文档', href: '/docs' },
        { label: '组件', href: '/docs/components' },
        { label: '主题', href: '/docs/themes' },
        { label: 'CLI 工具', href: '/docs/cli' },
      ],
    },
    {
      title: '资源',
      links: [
        { label: '博客', href: '#' },
        { label: '展示案例', href: '#' },
        { label: '更新日志', href: '/changelog' },
        { label: '路线图', href: '/roadmap' },
      ],
    },
    {
      title: '社区',
      links: [
        { label: 'GitHub', href: 'https://github.com/fuma-nama/fumadocs', external: true },
        { label: 'Discord', href: '#', external: true },
        { label: 'X / Twitter', href: '#', external: true },
        { label: '贡献指南', href: '/contributing' },
      ],
    },
    {
      title: '法律',
      links: [
        { label: '隐私政策', href: '/privacy' },
        { label: '服务条款', href: '/terms' },
        { label: '开源协议', href: '/license' },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/50">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo & description - takes 2 columns on desktop */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <DILogo className="w-8 h-8 text-lg" />
              <span className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">DocME</span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs mb-6">
              为开发者打造的现代化文档框架，
              让构建精美文档站点变得前所未有的简单。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/fuma-nama/fumadocs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                <Github className="size-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                <Globe className="size-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                <MessageSquare className="size-4" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar with ICP placeholder */}
      <div className="bg-[var(--surface-secondary)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted)]">
            <p>© {new Date().getFullYear()} dyolk. co,ltd. All rights reserved.</p>
            {/* ICP placeholder - themed for both light and dark mode */}
            <div className="flex items-center gap-4">
              <span>京ICP备XXXXXXXX号-1</span>
              <span className="text-[var(--border)]">|</span>
              <span className="inline-flex items-center gap-1">
                <Image src="/images/beian.png" alt="备案" width={14} height={14} className="opacity-70" />
                京公网安备XXXXXXXXXXX号
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
