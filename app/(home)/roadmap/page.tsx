'use client';

import { Footer } from '@/components/footer';
import {
  AppleCard,
  HeroStagger,
  HeroStaggerItem,
} from '@/components/apple-animations';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  Calendar,
  ArrowRight,
  Rocket,
  Palette,
  Search,
  Globe,
  Zap,
  Layout,
  Sparkles,
  Smartphone,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────── */

interface RoadmapPhase {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ReactNode;
  features: string[];
}

/* ── Data ──────────────────────────────────────────── */

const roadmapData: RoadmapPhase[] = [
  {
    quarter: 'Q1 2025',
    title: '基础架构',
    description: '项目起步，搭建核心文档引擎与内容体系。',
    status: 'completed',
    icon: <Rocket className="size-5" />,
    features: ['项目初始化与工程化配置', '基础文档框架搭建', '全文搜索功能集成'],
  },
  {
    quarter: 'Q2 2025',
    title: '体验革新',
    description: '全面升级用户界面，引入更多开发者工具。',
    status: 'in-progress',
    icon: <Palette className="size-5" />,
    features: ['Apple 风格全站 UI 改版', '多语言支持（i18n）', 'CVE 数据库集成'],
  },
  {
    quarter: 'Q3 2025',
    title: '智能生态',
    description: '引入 AI 能力，构建开放的社区贡献体系。',
    status: 'planned',
    icon: <Sparkles className="size-5" />,
    features: ['AI 辅助搜索与问答', '社区贡献系统', 'API 文档自动生成'],
  },
  {
    quarter: 'Q4 2025',
    title: '协作与移动化',
    description: '优化移动端体验，支持团队协作与离线访问。',
    status: 'planned',
    icon: <Smartphone className="size-5" />,
    features: ['移动端体验优化', '离线访问支持（PWA）', '团队协作功能'],
  },
];

/* ── Status Config ─────────────────────────────────── */

const STATUS_META = {
  completed: {
    label: '已完成',
    color: '#34c759',
    bg: 'rgba(52,199,89,0.08)',
    border: 'rgba(52,199,89,0.25)',
    bar: '#34c759',
  },
  'in-progress': {
    label: '进行中',
    color: '#0071e3',
    bg: 'rgba(0,113,227,0.08)',
    border: 'rgba(0,113,227,0.25)',
    bar: '#0071e3',
  },
  planned: {
    label: '计划中',
    color: '#6e6e73',
    bg: 'rgba(110,110,115,0.06)',
    border: 'rgba(110,110,115,0.2)',
    bar: '#6e6e73',
  },
} as const;

/* ── Components ────────────────────────────────────── */

function StatusBadge({ status }: { status: RoadmapPhase['status'] }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{
        color: meta.color,
        background: meta.bg,
        borderColor: meta.border,
      }}
    >
      {status === 'completed' && <CheckCircle2 className="size-3.5" />}
      {status === 'in-progress' && <CircleDot className="size-3.5" />}
      {status === 'planned' && <Circle className="size-3.5" />}
      {meta.label}
    </span>
  );
}

function RoadmapCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const meta = STATUS_META[phase.status];

  return (
    <AppleCard delay={index * 0.12} className="relative overflow-hidden">
      {/* Status color bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: meta.bar }}
      />

      <div className="p-8 sm:p-10 pl-10 sm:pl-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: meta.bg, color: meta.color }}
            >
              {phase.icon}
            </div>
            <div>
              <h3 className="apple-headline">{phase.title}</h3>
              <div className="flex items-center gap-1.5 text-sm mt-0.5" style={{ color: '#6e6e73' }}>
                <Calendar className="size-3.5" />
                {phase.quarter}
              </div>
            </div>
          </div>
          <StatusBadge status={phase.status} />
        </div>

        {/* Description */}
        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: '#6e6e73', fontSize: '19px', lineHeight: 1.5 }}
        >
          {phase.description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {phase.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3" style={{ color: '#1d1d1f' }}>
              <ArrowRight
                className="size-4 mt-0.5 shrink-0"
                style={{ color: meta.color }}
              />
              <span className="text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppleCard>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function RoadmapPage() {
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
              <h1 className="apple-display-1 mb-6">产品路线图</h1>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p
                className="apple-body-lg max-w-[680px] mx-auto"
                style={{ fontSize: '19px', lineHeight: 1.5 }}
              >
                从未来愿景到已实现的功能，见证 DocME 的每一步成长。
              </p>
            </HeroStaggerItem>
          </HeroStagger>

          {/* Legend */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3">
            <StatusBadge status="completed" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="planned" />
          </div>
        </div>
      </section>

      {/* Roadmap Cards */}
      <section
        style={{ background: '#f5f5f7', padding: '120px 1.5rem' }}
      >
        <div className="max-w-[800px] mx-auto space-y-8">
          {roadmapData.map((phase, index) => (
            <RoadmapCard key={phase.quarter} phase={phase} index={index} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ background: '#ffffff', padding: '120px 1.5rem' }}
      >
        <div className="max-w-[1120px] mx-auto text-center">
          <HeroStagger>
            <HeroStaggerItem>
              <h2 className="apple-section-title mb-4">有想法？告诉我们</h2>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p
                className="apple-body-lg max-w-[600px] mx-auto mb-8"
                style={{ fontSize: '19px', lineHeight: 1.5 }}
              >
                我们欢迎社区反馈，你的建议可能会出现在下一个版本中。
              </p>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <a
                href="https://github.com/dyolk/docme/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-primary"
              >
                提交功能请求
              </a>
            </HeroStaggerItem>
          </HeroStagger>
        </div>
      </section>

      <Footer />
    </>
  );
}
