import { Footer } from '@/components/footer';
import {
  CheckCircle2,
  CircleDot,
  Circle,
  Rocket,
  Palette,
  Search,
  Globe,
  GitBranch,
  Zap,
  Layout,
  Terminal,
  Sparkles,
  ArrowRight,
  Calendar,
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

/* ── Roadmap Data (reverse chronological) ─────────────────────────────── */

interface RoadmapItem {
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ReactNode;
  features: string[];
}

const roadmapData: RoadmapItem[] = [
  {
    title: '开发者工具链',
    date: '2025-Q4',
    description: '更完善的 CLI 工具与生态集成。',
    status: 'planned',
    icon: <Terminal className="size-5" />,
    features: ['DocME CLI 工具', 'VS Code 扩展插件', '自动化部署集成', '性能监控与分析'],
  },
  {
    title: '协作与版本管理',
    date: '2025-Q4',
    description: '团队协作文档与版本控制。',
    status: 'planned',
    icon: <GitBranch className="size-5" />,
    features: ['多人实时协作编辑', '文档版本历史', '审阅与批注系统', '内容发布工作流'],
  },
  {
    title: '主题与定制系统',
    date: '2025-Q3',
    description: '更灵活的主题配置和深度定制能力。',
    status: 'planned',
    icon: <Palette className="size-5" />,
    features: ['可视化主题编辑器', '更多内置主题预设', 'CSS 变量级定制', '插件化主题扩展'],
  },
  {
    title: '高级搜索与 AI',
    date: '2025-Q3',
    description: '更智能的文档检索与 AI 辅助阅读。',
    status: 'planned',
    icon: <Search className="size-5" />,
    features: ['AI 智能问答助手', '语义搜索（向量检索）', '搜索建议与自动补全', '搜索结果高亮与预览'],
  },
  {
    title: '国际化支持',
    date: '2025-Q2',
    description: '让文档触达全球更多开发者。',
    status: 'in-progress',
    icon: <Globe className="size-5" />,
    features: ['多语言文档支持（i18n）', '自动语言检测与切换', 'RTL 布局适配', '本地化搜索'],
  },
  {
    title: 'DocME 2.0 正式发布',
    date: '2024-12-15',
    description: '全新设计，更强大的功能和更好的体验。',
    status: 'completed',
    icon: <Sparkles className="size-5" />,
    features: ['全新 Bento Grid 风格首页', '集成 HeroUI v3 组件库', '新增全文搜索功能（Orama）', '支持暗黑模式自动切换', '新增更新日志页面'],
  },
  {
    title: '性能大幅提升',
    date: '2024-11-01',
    description: '专注于构建性能和开发体验的优化。',
    status: 'completed',
    icon: <Zap className="size-5" />,
    features: ['Turbopack 构建速度提升 40%', 'MDX 编译缓存优化', '新增图片自动优化功能'],
  },
  {
    title: '组件库全面升级',
    date: '2024-09-20',
    description: '引入更多实用组件，提升文档编写体验。',
    status: 'completed',
    icon: <Layout className="size-5" />,
    features: ['新增 Cards、Callout、Tabs 等文档组件', '支持自定义 MDX 组件', '代码块新增行号显示和复制功能'],
  },
  {
    title: 'DocME 1.0 正式发布',
    date: '2024-08-01',
    description: '项目首次发布，提供基础的文档站点构建能力。',
    status: 'completed',
    icon: <Rocket className="size-5" />,
    features: ['基于 Next.js App Router 的文档框架', '内置 MDX 支持', '自动生成目录导航', '支持 Open Graph 图片生成'],
  },
];

/* ── Status Config ─────────────────────────────── */

const STATUS_META = {
  completed: {
    label: '已完成',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.10)',
    border: 'rgba(16,185,129,0.30)',
    glow: '0 0 20px rgba(16,185,129,0.15)',
  },
  'in-progress': {
    label: '进行中',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.10)',
    border: 'rgba(59,130,246,0.30)',
    glow: '0 0 20px rgba(59,130,246,0.15)',
  },
  planned: {
    label: '计划中',
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.25)',
    glow: '0 0 20px rgba(148,163,184,0.10)',
  },
} as const;

/* ── Components ─────────────────────────────── */

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const meta = STATUS_META[item.status];

  return (
    <div
      className="group rounded-xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        borderColor: meta.border,
        boxShadow: `${meta.glow}, 0 1px 3px rgba(0,0,0,0.04)`,
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: meta.bg, color: meta.color }}
          >
            {item.icon}
          </div>
          <h3 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h3>
        </div>
        <span
          className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
          style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
        >
          {item.status === 'completed' && <CheckCircle2 className="size-3" />}
          {item.status === 'in-progress' && <CircleDot className="size-3" />}
          {item.status === 'planned' && <Circle className="size-3" />}
          {meta.label}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] mb-2">
        <Calendar className="size-3" />
        {item.date}
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">{item.description}</p>

      {/* Features */}
      <ul className="space-y-1">
        {item.features.map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--foreground)]">
            <ArrowRight className="size-3 mt-0.5 shrink-0 text-[var(--accent)]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Desktop Alternating Timeline ─────────────────────────────── */

function DesktopTimeline() {
  return (
    <div className="hidden lg:block relative">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <div className="w-full h-full bg-gradient-to-b from-[var(--accent)]/40 via-[var(--border)] to-[var(--border)]" />
      </div>

      {/* Items */}
      <div className="relative space-y-12">
        {roadmapData.map((item, index) => {
          const meta = STATUS_META[item.status];
          const isRight = index % 2 === 0;

          return (
            <div key={item.title} className="relative grid grid-cols-2 gap-8 items-start">
              {/* Left side */}
              <div className={`${isRight ? 'col-start-2 pl-8' : 'pr-8 text-right'}`}>
                <div className={isRight ? '' : 'ml-auto'}>
                  <RoadmapCard item={item} />
                </div>
              </div>

              {/* Node on center line */}
              <div
                className={`absolute top-6 z-10 ${
                  isRight ? 'left-1/2' : 'left-1/2'
                } -translate-x-1/2`}
              >
                <div
                  className="w-4 h-4 rounded-full ring-4 ring-[var(--surface)]"
                  style={{
                    background: meta.color,
                    boxShadow: meta.glow,
                  }}
                />
              </div>

              {/* Connector line from node to card */}
              <div
                className="absolute top-7 h-px bg-[var(--border)]"
                style={{
                  width: 32,
                  left: isRight ? 'calc(50% + 8px)' : 'auto',
                  right: isRight ? 'auto' : 'calc(50% + 8px)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Mobile Timeline ─────────────────────────────── */

function MobileTimeline() {
  return (
    <div className="lg:hidden relative">
      {/* Left line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--border)] to-[var(--border)]" />

      {/* Items */}
      <div className="space-y-6">
        {roadmapData.map((item, index) => {
          const meta = STATUS_META[item.status];
          const isLast = index === roadmapData.length - 1;

          return (
            <div key={item.title} className="relative flex gap-4">
              {/* Node */}
              <div className="relative z-10 shrink-0">
                <div
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center ring-4 ring-[var(--surface)]"
                  style={{
                    background: meta.color,
                    boxShadow: meta.glow,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <RoadmapCard item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function RoadmapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Page Title */}
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold border border-[var(--accent)]/20 mb-4">
              <Sparkles className="size-3.5" />
              持续迭代中
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4">
              产品路线图
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
              从未来愿景到已实现的功能，见证 <DILogo className="w-5 h-5 text-[10px]" /> DocME 的每一步成长。
            </p>

            {/* Legend */}
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ color: STATUS_META['in-progress'].color, background: STATUS_META['in-progress'].bg, borderColor: STATUS_META['in-progress'].border }}
              >
                <CircleDot className="size-3.5" />
                进行中
              </div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ color: STATUS_META.completed.color, background: STATUS_META.completed.bg, borderColor: STATUS_META.completed.border }}
              >
                <CheckCircle2 className="size-3.5" />
                已完成
              </div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ color: STATUS_META.planned.color, background: STATUS_META.planned.bg, borderColor: STATUS_META.planned.border }}
              >
                <Circle className="size-3.5" />
                计划中
              </div>
            </div>
          </div>

          {/* Desktop */}
          <DesktopTimeline />

          {/* Mobile */}
          <MobileTimeline />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
