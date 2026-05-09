import Link from 'next/link';
import Image from 'next/image';

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
        { label: '博客', href: '/blog' },
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

  const legalLinks = [
    { label: '隐私政策', href: '/privacy' },
    { label: '服务条款', href: '/terms' },
    { label: '开源协议', href: '/license' },
  ];

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#1d1d1f]">
      <div className="max-w-[980px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[var(--apple-border)] justify-items-center">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-[var(--apple-text)] mb-3 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-xs text-[var(--apple-text-secondary)] hover:text-[var(--apple-text)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-xs text-[var(--apple-text-secondary)]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="inline-flex items-center gap-x-3">
                <Link
                  href={link.href}
                  className="hover:text-[var(--apple-text)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-[var(--apple-border)]">|</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} dyolk. co,ltd. All rights reserved.</span>
            <span className="hidden sm:inline text-[var(--apple-border)]">|</span>
            <span>京ICP备XXXXXXXX号-1</span>
            <span className="hidden sm:inline text-[var(--apple-border)]">|</span>
            <span className="inline-flex items-center gap-1">
              <Image src="/images/beian.png" alt="备案" width={14} height={14} className="opacity-70" />
              京公网安备XXXXXXXXXXX号
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
