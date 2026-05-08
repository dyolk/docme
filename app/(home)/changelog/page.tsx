'use client';

import { Footer } from '@/components/footer';
import {
  AppleCard,
  FadeInStagger,
  FadeInStaggerItem,
  HeroStagger,
  HeroStaggerItem,
} from '@/components/apple-animations';
import {
  Calendar,
  Sparkles,
  Zap,
  Wrench,
  ArrowUpCircle,
  Tag,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────── */

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: {
    type: 'feature' | 'fix' | 'improvement';
    items: string[];
  }[];
}

/* ── Data ──────────────────────────────────────────── */

const changelogData: ChangelogEntry[] = [
  {
    version: 'v1.2.0',
    date: '2025-03-15',
    title: 'Apple 风格全站改版',
    description:
      '全新 Apple 风格设计语言，更精致的排版、更流畅的动画和更优雅的用户体验。',
    changes: [
      {
        type: 'feature',
        items: [
          'Apple 风格全站 UI 改版',
          'Layout Tabs 组件支持',
          'Mermaid 图表渲染支持',
        ],
      },
      {
        type: 'improvement',
        items: ['动画性能优化', '暗色模式色彩校准'],
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2025-02-20',
    title: '搜索与内容增强',
    description:
      '大幅提升搜索体验，新增数学公式和 RSS Feed 支持，让文档站点更加专业。',
    changes: [
      {
        type: 'feature',
        items: [
          '全文搜索中文分词支持',
          'KaTeX 数学公式渲染',
          'RSS Feed 自动生成',
        ],
      },
      {
        type: 'fix',
        items: ['修复移动端搜索框样式异常'],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-01-10',
    title: '项目正式发布',
    description:
      'DocME 正式问世。基于 Next.js 和 Fumadocs 构建的现代化文档框架，让创建精美文档站点变得前所未有的简单。',
    changes: [
      {
        type: 'feature',
        items: [
          '项目初始化与基础框架',
          'MDX 文档内容支持',
          '自动生成目录导航',
          '博客系统上线',
        ],
      },
    ],
  },
];

/* ── Type Config ───────────────────────────────────── */

const TYPE_META = {
  feature: {
    label: '新功能',
    color: '#34c759',
    bg: 'rgba(52,199,89,0.08)',
    border: 'rgba(52,199,89,0.2)',
    icon: <Sparkles className="size-3.5" />,
  },
  fix: {
    label: '修复',
    color: '#ff9500',
    bg: 'rgba(255,149,0,0.08)',
    border: 'rgba(255,149,0,0.2)',
    icon: <Wrench className="size-3.5" />,
  },
  improvement: {
    label: '改进',
    color: '#0071e3',
    bg: 'rgba(0,113,227,0.08)',
    border: 'rgba(0,113,227,0.2)',
    icon: <Zap className="size-3.5" />,
  },
} as const;

/* ── Components ────────────────────────────────────── */

function ChangeTypeBadge({ type }: { type: keyof typeof TYPE_META }) {
  const meta = TYPE_META[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border"
      style={{
        color: meta.color,
        background: meta.bg,
        borderColor: meta.border,
      }}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

function VersionCard({
  entry,
  isLatest,
  index,
}: {
  entry: ChangelogEntry;
  isLatest?: boolean;
  index: number;
}) {
  const d = new Date(entry.date);
  const formatted = d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <FadeInStaggerItem>
      <AppleCard delay={index * 0.1} className="relative overflow-hidden">
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2">
                <Tag className="size-4" style={{ color: '#0071e3' }} />
                <span
                  className="font-mono text-xl font-semibold"
                  style={{ color: '#1d1d1f' }}
                >
                  {entry.version}
                </span>
              </div>
              {isLatest && (
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    color: '#0071e3',
                    background: 'rgba(0,113,227,0.08)',
                    borderColor: 'rgba(0,113,227,0.2)',
                  }}
                >
                  <ArrowUpCircle className="size-3" />
                  最新
                </span>
              )}
            </div>
            <div
              className="inline-flex items-center gap-1.5 text-sm"
              style={{ color: '#6e6e73' }}
            >
              <Calendar className="size-3.5" />
              {formatted}
            </div>
          </div>

          {/* Title */}
          <h2 className="apple-headline mb-3">{entry.title}</h2>

          {/* Description */}
          <p
            className="leading-relaxed mb-8"
            style={{ color: '#6e6e73', fontSize: '19px', lineHeight: 1.5 }}
          >
            {entry.description}
          </p>

          {/* Change Sections */}
          <div className="space-y-6">
            {entry.changes.map((change, ci) => (
              <div key={ci}>
                <div className="flex items-center gap-2 mb-3">
                  <ChangeTypeBadge type={change.type} />
                </div>
                <ul className="space-y-2.5">
                  {change.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="flex items-start gap-3 text-base leading-relaxed"
                      style={{ color: '#1d1d1f' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: TYPE_META[change.type].color }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AppleCard>
    </FadeInStaggerItem>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#ffffff', padding: '120px 1.5rem 80px' }}
      >
        <div className="max-w-[1120px] mx-auto text-center">
          <HeroStagger>
            <HeroStaggerItem>
              <h1 className="apple-display-1 mb-6">更新日志</h1>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p
                className="apple-body-lg max-w-[680px] mx-auto"
                style={{ fontSize: '19px', lineHeight: 1.5 }}
              >
                追踪 DocME 的每一次迭代与成长。
              </p>
            </HeroStaggerItem>
          </HeroStagger>
        </div>
      </section>

      {/* Changelog Cards */}
      <section
        style={{ background: '#f5f5f7', padding: '120px 1.5rem' }}
      >
        <div className="max-w-[800px] mx-auto">
          <FadeInStagger staggerDelay={0.15} className="space-y-8">
            {changelogData.map((entry, index) => (
              <VersionCard
                key={entry.version}
                entry={entry}
                isLatest={index === 0}
                index={index}
              />
            ))}
          </FadeInStagger>
        </div>
      </section>

      <Footer />
    </>
  );
}
