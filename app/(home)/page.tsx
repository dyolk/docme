import { Button } from '@heroui/react';
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
  Shield,
  Star,
  Cpu,
  Eye,
  Heart,
  Lock,
  ScanLine,
  Workflow,
  Container,
  Bug,
  Radio,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Timer,
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
          <span className="text-[var(--foreground)]">trivy image myapp:latest</span>
        </div>
        <div className="text-[var(--muted)] pl-4 leading-relaxed">
          2025-01-15T09:23:01Z&nbsp;&nbsp;&nbsp;INFO<br />
          2025-01-15T09:23:02Z&nbsp;&nbsp;&nbsp;INFO&nbsp;&nbsp;Detected OS: alpine<br />
          2025-01-15T09:23:03Z&nbsp;&nbsp;&nbsp;WARN&nbsp;&nbsp;0 vulnerability found<br />
          2025-01-15T09:23:03Z&nbsp;&nbsp;&nbsp;INFO&nbsp;&nbsp;Scan completed ✓
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
                  <span className="text-[var(--accent)]">DevSecOps</span>
                  <br className="hidden sm:block" />
                  {' '}安全文档中心
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[var(--muted)] max-w-lg leading-relaxed">
                  为安全团队打造的现代化技术文档平台。统一沉淀安全规范、
                  漏洞响应流程与合规检查清单，让安全左移真正落地。
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
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
                    <Shield className="size-5 text-[var(--accent)]" />
                  </div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold mb-1">
                    安全态势
                  </p>
                  <p className="text-3xl font-bold text-[var(--foreground)]">98.6%</p>
                </div>
                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    合规通过
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">本月安全扫描通过率</p>
                </div>
              </BentoCard>

              {/* 3. Stats Row — 3 small cards */}
              <BentoCard className="md:col-span-1">
                <StatCard icon={<ScanLine className="size-4 text-[var(--accent)]" />} label="安全扫描" value="12.5k+" />
              </BentoCard>
              <BentoCard className="md:col-span-1">
                <StatCard icon={<Timer className="size-4 text-[var(--accent)]" />} label="平均修复时间" value="4.2h" />
              </BentoCard>
              <BentoCard className="md:col-span-1">
                <StatCard icon={<CheckCircle2 className="size-4 text-[var(--accent)]" />} label="合规检查" value="100%" />
              </BentoCard>

              {/* 4. Framework Badge Card */}
              <BentoCard
                className="p-5 sm:p-6 flex flex-col justify-center"
                gradient
                gradientClass="bento-gradient-blue"
              >
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold mb-4">
                  安全工具链
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <ScanLine className="size-4" />, name: 'Trivy' },
                    { icon: <Lock className="size-4" />, name: 'Snyk' },
                    { icon: <Bug className="size-4" />, name: 'SonarQube' },
                    { icon: <Container className="size-4" />, name: 'Falco' },
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

              {/* 5. Terminal Card */}
              <BentoCard className="md:col-span-2 min-h-[200px]">
                <TerminalBento />
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
              核心能力
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
              安全左移，贯穿全生命周期
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Feature 1 — large card spanning 2 columns on desktop */}
            <BentoCard className="sm:col-span-2 lg:col-span-2" gradient gradientClass="bento-gradient-blue">
              <div className="p-5 sm:p-6 h-full flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <Shield className="size-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    安全左移实践
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    在编码阶段即引入 SAST、SCA 和密钥扫描，将安全漏洞消灭在萌芽期。
                    集成 SonarQube、Snyk、Trivy 等工具，实现自动化安全门禁。
                  </p>
                </div>
                <div className="sm:w-[220px] flex-shrink-0">
                  <div className="h-full min-h-[120px] rounded-xl bg-[var(--surface-secondary)]/60 border border-[var(--border)] p-4 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[var(--accent)]">-72%</p>
                      <p className="text-xs text-[var(--muted)] mt-1">生产环境漏洞减少</p>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Feature 2 */}
            <BentoCard>
              <FeatureBento
                icon={<Workflow className="size-5 text-[var(--accent)]" />}
                title="CI/CD 安全集成"
                description="在流水线中嵌入漏洞扫描、镜像安全检查和 IaC 合规验证，确保每次交付都符合安全标准。"
              />
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard>
              <FeatureBento
                icon={<FileText className="size-5 text-[var(--accent)]" />}
                title="合规即代码"
                description="将安全合规要求转化为可执行的策略代码，通过 Open Policy Agent 实现自动化合规检查。"
              />
            </BentoCard>

            {/* Feature 4 */}
            <BentoCard>
              <FeatureBento
                icon={<AlertTriangle className="size-5 text-[var(--accent)]" />}
                title="威胁建模"
                description="基于 STRIDE 和 MITRE ATT&CK 框架，系统性地识别和评估系统潜在威胁，输出可落地的缓解方案。"
              />
            </BentoCard>

            {/* Feature 5 */}
            <BentoCard>
              <FeatureBento
                icon={<Eye className="size-5 text-[var(--accent)]" />}
                title="运行时安全"
                description="通过 Falco 等工具实时监控容器和 Kubernetes 集群的异常行为，快速响应安全事件。"
              />
            </BentoCard>

            {/* Feature 6 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-3" gradient gradientClass="bento-gradient-green">
              <div className="p-5 sm:p-6 h-full flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <Lock className="size-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    零信任架构
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    实施最小权限原则、双向 TLS 认证和动态访问控制，构建"永不信任，始终验证"的安全基础设施。
                  </p>
                </div>
                <div className="sm:w-[200px] flex-shrink-0 flex flex-wrap content-center gap-2">
                  {['mTLS', 'RBAC', 'SSO', 'Vault'].map((name) => (
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
              团队评价
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              深受安全团队信赖
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <BentoCard>
              <QuoteBento
                quote="这份文档平台让我们的安全规范终于有了一处统一的归宿。新成员上手时间从两周缩短到三天。"
                author="李明"
                role="安全架构师"
              />
            </BentoCard>
            <BentoCard>
              <QuoteBento
                quote="将威胁建模模板和漏洞响应流程沉淀为文档后，我们的 MTTR 降低了 60%。强烈推荐！"
                author="王芳"
                role="DevSecOps 负责人"
              />
            </BentoCard>
            <BentoCard>
              <QuoteBento
                quote="CI/CD 安全门禁的文档化让开发团队和安全团队的协作变得前所未有的顺畅。"
                author="张伟"
                role="研发效能负责人"
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
              安全架构
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3">
              纵深防御，层层设防
            </p>
            <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto">
              从代码到运行时，从基础设施到应用层，构建全方位的安全防护体系
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <Code2 className="size-5 text-[var(--accent)]" />,
                title: '代码安全',
                desc: 'SAST / SCA / 密钥扫描，在编码阶段拦截漏洞',
                gradient: 'bento-gradient-blue',
              },
              {
                icon: <Container className="size-5 text-[var(--accent)]" />,
                title: '容器安全',
                desc: '镜像漏洞扫描、运行时防护、供应链安全',
                gradient: 'bento-gradient-purple',
              },
              {
                icon: <Layers className="size-5 text-[var(--accent)]" />,
                title: '基础设施',
                desc: 'IaC 合规检查、云安全态势管理、网络隔离',
                gradient: 'bento-gradient-green',
              },
              {
                icon: <Radio className="size-5 text-[var(--accent)]" />,
                title: '可观测性',
                desc: '安全事件监控、审计日志、威胁检测与响应',
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
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[1.25rem]"
            style={{
              backgroundImage: 'url(/images/bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Inner blur overlay — contained within card */}
            <div className="absolute inset-0 backdrop-blur-md bg-[var(--surface)]/60" />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Left: text content */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
                    构建你的安全文档中心
                  </h2>
                  <p className="text-base sm:text-lg text-[var(--muted)] mb-8 max-w-xl sm:max-w-none">
                    统一沉淀安全规范、漏洞响应流程与合规检查清单，
                    让安全左移真正落地到每个开发环节。
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

                {/* Right: code snippet decoration */}
                <div className="hidden sm:flex flex-col gap-2 w-[220px] lg:w-[260px] flex-shrink-0 p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/70 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-2 text-[10px] text-white/40">bash</span>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-green-400">$</span> <span className="text-white/90">npm create docme-app</span></p>
                    <p className="text-white/40 pl-4">✓ Security policies loaded</p>
                    <p className="text-white/40 pl-4">✓ Compliance checks ready</p>
                    <p><span className="text-green-400">$</span> <span className="text-white/90">cd security-docs</span></p>
                    <p><span className="text-green-400">$</span> <span className="text-white/90">npm run dev</span></p>
                    <p className="text-white/40 pl-4">Ready on http://localhost:3000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
