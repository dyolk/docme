import { Button } from '@heroui/react';
import { Card } from '@heroui/react';
import { Badge } from '@heroui/react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import {
  BookOpen,
  Github,
  Zap,
  Layout,
  Search,
  ArrowRight,
  Layers,
  Compass,
  Terminal,
  ChevronRight,
  FileText,
  Code2,
  Sparkles,
  Rocket,
  Shield,
  Star,
  Cpu,
  Eye,
  Heart,
} from 'lucide-react';

/* ── Bento Components ─────────────────────────────── */

function BentoCard({
  children,
  className = '',
  gradient = false,
  gradientClass = '',
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  gradientClass?: string;
}) {
  return (
    <div
      className={`bento-card ${gradient ? gradientClass : ''} ${className}`}
    >
      {children}
    </div>
  );
}

function VersionBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold border border-[var(--accent)]/20">
      <Sparkles className="size-3" />
      v1.0 现已发布
    </div>
  );
}

function TerminalBento() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-[10px] text-[var(--muted)] font-mono">bash</span>
      </div>
      <div className="flex-1 p-4 font-mono text-xs space-y-1.5 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <span className="text-green-500">➜</span>
          <span className="text-[var(--accent)]">~</span>
          <span className="text-[var(--foreground)]">pnpm create fumadocs-app</span>
        </div>
        <div className="text-[var(--muted)] pl-4 leading-relaxed">
          ◇ Project name<br />
          │ my-app<br />
          ◆ Choose a framework<br />
          │ ● Next.js<br />
          │ ○ Waku<br />
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-green-500">➜</span>
          <span className="text-[var(--accent)]">~</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-5 h-full flex flex-col justify-between">
      <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function FeatureBento({
  icon,
  title,
  description,
  size = 'normal',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  size?: 'normal' | 'large';
}) {
  return (
    <div className="p-5 sm:p-6 h-full flex flex-col">
      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className={`font-semibold text-[var(--foreground)] mb-2 ${size === 'large' ? 'text-lg' : 'text-base'}`}>
        {title}
      </h3>
      <p className={`text-[var(--muted)] leading-relaxed ${size === 'large' ? 'text-sm' : 'text-sm'}`}>
        {description}
      </p>
    </div>
  );
}

function QuoteBento({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="p-5 sm:p-6 h-full flex flex-col justify-between">
      <div>
        <Star className="size-4 text-[var(--accent)]/60 mb-3" />
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-[var(--border)]">
        <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
          <span className="text-[var(--accent)] text-[10px] font-bold">{author[0]}</span>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--foreground)]">{author}</p>
          <p className="text-[10px] text-[var(--muted)]">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO: Bento Grid ===== */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[var(--accent)] opacity-[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bento Hero Grid */}
          <div
            className="bento-grid"
            style={{
              gridTemplateColumns: 'repeat(1, 1fr)',
            }}
          >
            {/* Mobile: stack everything */}
            {/* Desktop: 3-column grid with spans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* 1. Main Hero Card — spans 2 columns on desktop */}
              <BentoCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center min-h-[280px] sm:min-h-[320px]">
                <VersionBadge />
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
                  你钟爱的{' '}
                  <span className="text-[var(--accent)]">React.js</span>
                  <br className="hidden sm:block" />
                  {' '}文档框架
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[var(--muted)] max-w-lg leading-relaxed">
                  打造出色的文档站点，你的风格。为开发者设计的现代化文档平台，
                  让技术文档变得赏心悦目。
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href="/docs">
                    <Button variant="primary" size="lg">
                      <BookOpen className="size-4" />
                      开始使用
                      <ChevronRight className="size-4" />
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/fuma-nama/fumadocs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg">
                      <Github className="size-4" />
                      GitHub
                    </Button>
                  </Link>
                </div>
              </BentoCard>

              {/* 2. Version Card — top right bento */}
              <BentoCard
                className="p-5 sm:p-6 flex flex-col justify-between min-h-[180px]"
                gradient
                gradientClass="bento-gradient-purple"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-4">
                    <Rocket className="size-5 text-[var(--accent)]" />
                  </div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold mb-1">
                    最新版本
                  </p>
                  <p className="text-3xl font-bold text-[var(--foreground)]">v1.0</p>
                </div>
                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    已发布
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">包含全新 Bento 首页设计</p>
                </div>
              </BentoCard>

              {/* 3. Stats Row — 3 small cards */}
              <BentoCard className="md:col-span-1">
                <StatCard icon={<Star className="size-4 text-[var(--accent)]" />} label="GitHub Stars" value="2.8k+" />
              </BentoCard>
              <BentoCard className="md:col-span-1">
                <StatCard icon={<Zap className="size-4 text-[var(--accent)]" />} label="Downloads" value="120k+" />
              </BentoCard>
              <BentoCard className="md:col-span-1">
                <StatCard icon={<Heart className="size-4 text-[var(--accent)]" />} label="Contributors" value="28+" />
              </BentoCard>

              {/* 4. Terminal Card */}
              <BentoCard className="md:col-span-2 min-h-[200px]">
                <TerminalBento />
              </BentoCard>

              {/* 5. Framework Badge Card */}
              <BentoCard
                className="p-5 sm:p-6 flex flex-col justify-center"
                gradient
                gradientClass="bento-gradient-blue"
              >
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold mb-4">
                  深受喜爱的框架
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Code2 className="size-4" />, name: 'Next.js' },
                    { icon: <Zap className="size-4" />, name: 'Turbopack' },
                    { icon: <Terminal className="size-4" />, name: 'TypeScript' },
                    { icon: <Layers className="size-4" />, name: 'Tailwind' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--surface-secondary)]/60 text-[var(--foreground)] text-xs font-medium"
                    >
                      {item.icon}
                      {item.name}
                    </div>
                  ))}
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES: Bento Grid ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              核心特性
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
              极简美学，极致可定制
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Feature 1 — large card spanning 2 columns on desktop */}
            <BentoCard className="sm:col-span-2 lg:col-span-2" gradient gradientClass="bento-gradient-blue">
              <div className="p-5 sm:p-6 h-full flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <Zap className="size-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    极速构建体验
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    基于 Next.js App Router 与 Turbopack，开发体验丝般顺滑。
                    增量编译、快速刷新，让开发效率提升数倍。
                  </p>
                </div>
                <div className="sm:w-[220px] flex-shrink-0">
                  <div className="h-full min-h-[120px] rounded-xl bg-[var(--surface-secondary)]/60 border border-[var(--border)] p-4 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[var(--accent)]">10x</p>
                      <p className="text-xs text-[var(--muted)] mt-1">更快的构建速度</p>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Feature 2 */}
            <BentoCard>
              <FeatureBento
                icon={<Layout className="size-5 text-[var(--accent)]" />}
                title="优雅布局"
                description="内置多种文档布局，侧边栏导航、全屏展示、首页模板，满足各类场景。"
              />
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard>
              <FeatureBento
                icon={<Search className="size-5 text-[var(--accent)]" />}
                title="全文搜索"
                description="集成 Orama 全文搜索引擎，让内容检索变得快速而精准。"
              />
            </BentoCard>

            {/* Feature 4 */}
            <BentoCard>
              <FeatureBento
                icon={<FileText className="size-5 text-[var(--accent)]" />}
                title="MDX 支持"
                description="原生支持 MDX，在文档中直接使用 React 组件，创作更灵活。"
              />
            </BentoCard>

            {/* Feature 5 */}
            <BentoCard>
              <FeatureBento
                icon={<Compass className="size-5 text-[var(--accent)]" />}
                title="类型安全"
                description="完全基于 TypeScript，提供完整的类型支持，开发更安心。"
              />
            </BentoCard>

            {/* Feature 6 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-3" gradient gradientClass="bento-gradient-green">
              <div className="p-5 sm:p-6 h-full flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <Shield className="size-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    企业级可靠
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    持续维护、活跃社区、完全开源。已被 Vercel、Unkey、Orama 等众多团队采用。
                  </p>
                </div>
                <div className="sm:w-[200px] flex-shrink-0 flex flex-wrap content-center gap-2">
                  {['Vercel', 'Unkey', 'Orama', 'Million'].map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1.5 rounded-lg bg-[var(--surface-secondary)]/60 text-[var(--foreground)] text-xs font-medium border border-[var(--border)]"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS: Bento Grid ===== */}
      <section className="py-12 sm:py-16 bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              社区推荐
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              深受开发者喜爱
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <BentoCard>
              <QuoteBento
                quote="Fumadocs 是目前最好的 Next.js 文档框架，它让构建文档站点变得前所未有的简单。"
                author="Aiden Bai"
                role="Million.js 作者"
              />
            </BentoCard>
            <BentoCard>
              <QuoteBento
                quote="如果没有 Fumadocs，我绝对无法把文档做得这么好看。强烈推荐给每一个开发者。"
                author="David Blass"
                role="ArkType 作者"
              />
            </BentoCard>
            <BentoCard>
              <QuoteBento
                quote="一套完美的文档构建方案，既美观又实用。Fuma 做了一件了不起的工作。"
                author="shadcn"
                role="Shadcn UI 作者"
              />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE: Bento Grid ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              架构设计
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3">
              真正的可组合框架
            </p>
            <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto">
              内容 → 核心 → UI 的分离架构，像搭积木一样构建文档站点
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <FileText className="size-5 text-[var(--accent)]" />,
                title: 'fumadocs-mdx',
                desc: '在 React 框架中优雅地使用 MDX',
                gradient: 'bento-gradient-blue',
              },
              {
                icon: <Cpu className="size-5 text-[var(--accent)]" />,
                title: 'fumadocs-core',
                desc: '构建文档和处理内容的无头库',
                gradient: 'bento-gradient-purple',
              },
              {
                icon: <Layout className="size-5 text-[var(--accent)]" />,
                title: 'fumadocs-ui',
                desc: '用于构建文档的 UI 组件库',
                gradient: 'bento-gradient-green',
              },
              {
                icon: <Eye className="size-5 text-[var(--accent)]" />,
                title: 'fumadocs-openapi',
                desc: '扩展渲染 OpenAPI 文档',
                gradient: 'bento-gradient-orange',
              },
            ].map((item) => (
              <BentoCard key={item.title} gradient gradientClass={item.gradient}>
                <div className="p-5 sm:p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BentoCard className="p-8 sm:p-12" gradient gradientClass="bento-gradient-purple">
            <div className="flex flex-col sm:flex-row items-center gap-8 h-full">
              {/* Left: text content fills entire width when no right content */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
                  构建你的文档
                </h2>
                <p className="text-base sm:text-lg text-[var(--muted)] mb-8 max-w-xl sm:max-w-none">
                  轻盈而美丽，就像月光一样。秒级初始化，即刻开始。
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <Link href="/docs">
                    <Button variant="primary" size="lg">
                      <BookOpen className="size-4" />
                      阅读文档
                      <ChevronRight className="size-4" />
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/fuma-nama/fumadocs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg">
                      <Github className="size-4" />
                      打开 GitHub
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: decorative visual block aligned with Enterprise card */}
              <div className="hidden sm:flex items-center justify-center w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
                <Rocket className="size-20 lg:size-24 text-white/20" />
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
