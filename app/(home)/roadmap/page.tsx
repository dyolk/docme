'use client';

import { Footer } from '@/components/footer';
import {
  FadeInStagger,
  FadeInStaggerItem,
  HeroStagger,
  HeroStaggerItem,
} from '@/components/apple-animations';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  Check,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────── */

interface RoadmapPhase {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  features: string[];
}

/* ── Data ──────────────────────────────────────────── */

const roadmapData: RoadmapPhase[] = [
  {
    quarter: 'Q1 2025',
    title: '基础架构',
    description: '项目起步，搭建核心文档引擎与内容体系。',
    status: 'completed',
    features: ['项目初始化与工程化配置', '基础文档框架搭建', '全文搜索功能集成'],
  },
  {
    quarter: 'Q2 2025',
    title: '体验革新',
    description: '全面升级用户界面，引入更多开发者工具。',
    status: 'in-progress',
    features: ['Apple 风格全站 UI 改版', '多语言支持（i18n）', 'CVE 数据库集成'],
  },
  {
    quarter: 'Q3 2025',
    title: '智能生态',
    description: '引入 AI 能力，构建开放的社区贡献体系。',
    status: 'planned',
    features: ['AI 辅助搜索与问答', '社区贡献系统', 'API 文档自动生成'],
  },
  {
    quarter: 'Q4 2025',
    title: '协作与移动化',
    description: '优化移动端体验，支持团队协作与离线访问。',
    status: 'planned',
    features: ['移动端体验优化', '离线访问支持（PWA）', '团队协作功能'],
  },
];

/* ── Status Config ─────────────────────────────────── */

const STATUS_META = {
  completed: {
    label: '已完成',
    color: '#34c759',
    bg: 'rgba(52,199,89,0.08)',
  },
  'in-progress': {
    label: '进行中',
    color: '#0071e3',
    bg: 'rgba(0,113,227,0.08)',
  },
  planned: {
    label: '计划中',
    color: '#6e6e73',
    bg: 'rgba(110,110,115,0.06)',
  },
} as const;

/* ── Components ────────────────────────────────────── */

function StatusPill({ status }: { status: RoadmapPhase['status'] }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        color: meta.color,
        background: meta.bg,
      }}
    >
      {status === 'completed' && <CheckCircle2 className="size-3" />}
      {status === 'in-progress' && <CircleDot className="size-3" />}
      {status === 'planned' && <Circle className="size-3" />}
      {meta.label}
    </span>
  );
}

function RoadmapCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-8 sm:p-10">
      {/* Top: Quarter + Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[#6e6e73] dark:text-[#a1a1a6]">
          {phase.quarter}
        </span>
        <StatusPill status={phase.status} />
      </div>

      {/* Title */}
      <h3 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
        {phase.title}
      </h3>

      {/* Description */}
      <p className="text-base leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] mb-6">
        {phase.description}
      </p>

      {/* Features */}
      <ul className="space-y-2.5">
        {phase.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[#1d1d1f] dark:text-[#f5f5f7]">
            <Check
              className="size-4 shrink-0"
              style={{ color: STATUS_META[phase.status].color }}
            />
            <span className="text-[15px] leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function RoadmapPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Hero */}
      <section className="pt-[100px] pb-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <HeroStagger>
            <HeroStaggerItem>
              <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05] mb-5">
                路线图
              </h1>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p className="text-[19px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] max-w-[560px]">
                从未来愿景到已实现的功能，见证 DocME 的每一步成长。
              </p>
            </HeroStaggerItem>
          </HeroStagger>

          {/* Legend Pills */}
          <div className="mt-8 flex items-center gap-3">
            <StatusPill status="completed" />
            <StatusPill status="in-progress" />
            <StatusPill status="planned" />
          </div>
        </div>
      </section>

      {/* Roadmap Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeInStagger staggerDelay={0.15} className="grid gap-6">
            {roadmapData.map((phase) => (
              <FadeInStaggerItem key={phase.quarter}>
                <RoadmapCard phase={phase} />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-8 sm:p-12">
            <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-3">
              有想法？告诉我们
            </h2>
            <p className="text-base leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] mb-6 max-w-[480px]">
              我们欢迎社区反馈，你的建议可能会出现在下一个版本中。
            </p>
            <a
              href="https://github.com/dyolk/docme/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-primary"
            >
              提交功能请求
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
