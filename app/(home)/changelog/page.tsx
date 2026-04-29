import { Footer } from '@/components/footer';
import {
  ArrowRight,
  Calendar,
  Tag,
  Sparkles,
  Rocket,
  Bug,
  Zap,
  ChevronRight,
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

/* ── Changelog Data ─────────────────────────────── */

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description?: string;
  features?: string[];
  fixes?: string[];
  breaking?: string[];
  deprecated?: string[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: '2.0.0',
    date: '2024-12-15',
    title: 'DocME 2.0 正式发布',
    description:
      '经过数月的打磨，DocME 2.0 终于和大家见面了！这一版本带来了全新的 Bento 风格首页设计、完整的 HeroUI v3 集成，以及一系列性能优化。',
    features: [
      '全新 Bento Grid 风格首页，支持响应式布局',
      '集成 HeroUI v3 组件库，开箱即用',
      '新增全文搜索功能，基于 Orama 搜索引擎',
      '支持暗黑模式自动切换',
      '新增更新日志页面',
    ],
    breaking: [
      '不再支持 Next.js 14 以下版本',
      '配置文件格式从 .js 改为 .ts',
    ],
  },
  {
    version: '1.8.0',
    date: '2024-11-01',
    title: '性能大幅提升',
    description:
      '专注于构建性能和开发体验的提升。Turbopack 集成更加稳定，增量编译速度提升显著。',
    features: [
      'Turbopack 构建速度提升 40%',
      'MDX 编译缓存优化',
      '新增图片自动优化功能',
    ],
    fixes: [
      '修复了移动端侧边栏无法滚动的问题',
      '修复了搜索框在暗色模式下的样式异常',
      '修复了部分浏览器下的字体加载问题',
    ],
  },
  {
    version: '1.4.0',
    date: '2024-09-20',
    title: '组件库全面升级',
    description:
      '引入了更多实用组件，让文档编写更加得心应手。',
    features: [
      '新增 Cards、Callout、Tabs 等文档组件',
      '支持自定义 MDX 组件',
      '代码块新增行号显示和复制功能',
    ],
    fixes: [
      '修复了代码块高亮在某些语言下的显示问题',
      '优化了表格在移动端的显示效果',
    ],
  },
  {
    version: '1.0.0',
    date: '2024-08-01',
    title: 'DocME 首次发布',
    description:
      'DocME 正式问世！基于 Next.js App Router 和 Fumadocs 构建的现代化文档框架，让创建精美文档站点变得前所未有的简单。',
    features: [
      '基于 Next.js App Router 的文档框架',
      '内置 MDX 支持',
      '自动生成目录导航',
      '支持 Open Graph 图片生成',
    ],
  },
];

/* ── Components ─────────────────────────────── */

function TimelineDot() {
  return (
    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)] z-10 -translate-x-[5px]" />
  );
}

function VersionLabel({ version }: { version: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <Tag className="size-3.5 text-[var(--accent)]" />
      <span className="font-mono text-sm font-semibold text-[var(--accent)]">
        {version}
      </span>
    </div>
  );
}

function DateLabel({ date }: { date: string }) {
  const d = new Date(date);
  const formatted = d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
      <Calendar className="size-3" />
      {formatted}
    </div>
  );
}

function ChangeSection({
  icon,
  title,
  color,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-4">
      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color} mb-2`}>
        {icon}
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
            <ChevronRight className={`size-3.5 mt-0.5 shrink-0 ${color}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChangelogCard({
  entry,
  isLatest,
}: {
  entry: ChangelogEntry;
  isLatest?: boolean;
}) {
  return (
    <div className="relative pl-6 sm:pl-8">
      {/* Timeline dot */}
      <TimelineDot />

      {/* Card */}
      <div className="bento-card p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <div className="flex items-center gap-2">
            <VersionLabel version={entry.version} />
            {isLatest && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-semibold">
                <Sparkles className="size-3" />
                最新
              </span>
            )}
          </div>
          <DateLabel date={entry.date} />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          {entry.title}
        </h2>

        {/* Description */}
        {entry.description && (
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {entry.description}
          </p>
        )}

        {/* Change sections */}
        <ChangeSection
          icon={<Rocket className="size-3.5" />}
          title="新特性"
          color="text-emerald-600 dark:text-emerald-400"
          items={entry.features}
        />
        <ChangeSection
          icon={<Bug className="size-3.5" />}
          title="Bug 修复"
          color="text-amber-600 dark:text-amber-400"
          items={entry.fixes}
        />
        <ChangeSection
          icon={<Zap className="size-3.5" />}
          title="破坏性变更"
          color="text-rose-600 dark:text-rose-400"
          items={entry.breaking}
        />
        <ChangeSection
          icon={<ArrowRight className="size-3.5" />}
          title="弃用"
          color="text-slate-500 dark:text-slate-400"
          items={entry.deprecated}
        />
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Page Title */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
              更新日志
            </h1>
            <p className="text-sm text-[var(--muted)] inline-flex items-center gap-1.5 justify-center">
              追踪 <DILogo className="w-5 h-5 text-[10px]" /> DocME 的每一次迭代与成长
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5px] sm:left-[5px] top-2 bottom-2 w-px bg-[var(--border)]" />

            {/* Entries */}
            <div className="space-y-6 sm:space-y-8">
              {changelogData.map((entry, index) => (
                <ChangelogCard
                  key={entry.version}
                  entry={entry}
                  isLatest={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
