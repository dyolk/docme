'use client';

import { Footer } from '@/components/footer';
import {
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
    version: 'v1.1.0',
    date: '2025-05-12',
    title: '重大更新与优化',
    description:
      'DocME 问题修复与优化',
    changes: [
      {
        type: 'fix',
        items: [
          '修复搜索功能不能完全索引'
        ],
      },
      {
        type: 'improvement',
        items: [
          '优化整体风格'
        ],
      }
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-05-09',
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
          '资源功能上线',
          '版本追踪功能上线'
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
      <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-8 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2">
              <Tag className="size-4 text-[#0071e3]" />
              <span className="font-mono text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
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
          <div className="inline-flex items-center gap-1.5 text-sm text-[#6e6e73] dark:text-[#a1a1a6]">
            <Calendar className="size-3.5" />
            {formatted}
          </div>
        </div>

        {/* Title */}
        <h2 className="apple-headline mb-3">{entry.title}</h2>

        {/* Description */}
        <p className="text-[19px] leading-[1.5] text-[#6e6e73] dark:text-[#a1a1a6] mb-8">
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
                    className="flex items-start gap-3 text-base leading-relaxed text-[#1d1d1f] dark:text-[#f5f5f7]"
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
    </FadeInStaggerItem>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function ChangelogPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Hero */}
      <section className="pt-[100px] pb-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <HeroStagger>
            <HeroStaggerItem>
              <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05] mb-5">
                更新日志。
              </h1>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p className="text-[19px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] max-w-[560px]">
                追踪 DocME 的每一次迭代与成长。
              </p>
            </HeroStaggerItem>
          </HeroStagger>
        </div>
      </section>

      {/* Changelog Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeInStagger staggerDelay={0.15} className="space-y-6">
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
    </div>
  );
}
