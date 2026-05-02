import { Button } from '@heroui/react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

import {
  BookOpen,
  Github,
  ArrowRight,
  Layers,
  ChevronRight,
  FileText,
  Code2,
  Search,
  Zap,
  Lightbulb,
  Terminal,
  Compass,
  Rocket,
  GraduationCap,
  Library,
  Cpu,
  Globe,
  Hash,
} from 'lucide-react';

/* ── Bento Components ─────────────────────────────── */

function BentoCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bento-card ${className}`}>
      {children}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen glass-page-bg">
      {/* ===== HERO: Bento Grid ===== */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">

            {/* 1. Hero Card — 2x2 */}
            <BentoCard className="md:col-span-2 row-span-2 p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="glass-badge text-slate-700 dark:text-slate-300 w-fit mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  持续更新
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-extrabold tracking-tighter text-slate-900 dark:text-slate-100 leading-[1.05]">
                  <span className="text-blue-600 dark:text-blue-500">安全。</span>
                  <br className="hidden sm:block" />
                  生来如此。
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-md leading-relaxed font-light">
                  从代码提交到生产部署，防护贯穿每一个环节。不是事后补救，而是与生俱来的安全。
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/docs">
                  <Button variant="primary" size="lg" className="glass-button text-slate-900 dark:text-white px-6">
                    <BookOpen className="size-4" />
                    开始学习
                    <ChevronRight className="size-4" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/fuma-nama/fumadocs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="glass-button text-slate-700 dark:text-slate-300">
                    <Github className="size-4" />
                    GitHub
                  </Button>
                </Link>
              </div>
            </BentoCard>

            {/* 2. Main Stats — 1x1 */}
            <BentoCard className="md:col-span-1 p-6 sm:p-8 flex flex-col justify-between min-h-[180px]">
              <Library className="size-5 text-slate-300 dark:text-slate-600" />
              <div>
                <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">8<span className="text-blue-600 dark:text-blue-500">大</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-semibold uppercase tracking-wider">阶段全覆盖</p>
              </div>
            </BentoCard>

            {/* 3. Stats Grid — 2x2 inside 1 column */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">6<span className="text-blue-600 dark:text-blue-500">类</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">扫描无死角</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">12<span className="text-blue-600 dark:text-blue-500">+</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">实战即战力</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">4<span className="text-blue-600 dark:text-blue-500">大</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">合规零门槛</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">100<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">完全开放</p>
              </BentoCard>
            </div>

            {/* 4. Tech Stack — 2x1 */}
            <BentoCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">工具生态</h3>
                <Zap className="size-4 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'SonarQube',
                  'Trivy',
                  'Snyk',
                  'Vault',
                  'Falco',
                  'OPA',
                  'Prometheus',
                  'Grafana',
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </BentoCard>

          </div>
        </div>
      </section>

      {/* ===== FEATURES: Bento Grid ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.25em] mb-3">
              核心教程
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              全生命周期。零死角。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Feature 1 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-2">
              <div className="p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="glass-icon mb-4">
                    <GraduationCap className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    全流程。零死角。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    从 Plan 到 Monitor，八个阶段完整覆盖。每一个环节都有详尽教程与可落地的实践方案。
                  </p>
                </div>
                <div className="sm:w-[160px] flex-shrink-0 text-center">
                  <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">8<span className="text-blue-600 dark:text-blue-500">阶段</span></p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold uppercase tracking-wider">Plan 到 Monitor</p>
                </div>
              </div>
            </BentoCard>

            {/* Feature 2 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="glass-icon mb-4">
                  <Terminal className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    流水线。固若金汤。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Jenkins、GitLab CI、GitHub Actions，SonarQube、Trivy、Snyk 无缝嵌入。门禁自动拦截，问题代码无处遁形。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="glass-icon mb-4">
                  <Search className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    代码。滴水不漏。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    SAST、SCA、密钥检测、镜像扫描。层层过滤，漏洞在提交前即被消灭。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 4 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="glass-icon mb-4">
                  <Lightbulb className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    合规。自动发生。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    OPA、Checkov 将策略变成代码。零人工审计，每次变更自动合规。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 5 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="glass-icon mb-4">
                  <Globe className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    运行。万无一失。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Falco 实时捕捉异常，RASP 贴身守护，容器策略锁定运行时行为。最后一道防线，坚不可摧。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 6 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-3">
              <div className="p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="glass-icon mb-4">
                    <Rocket className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    看见一切。掌控全局。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Prometheus + Grafana 洞察指标，ELK 留存审计日志，SkyWalking 追踪请求链路。从告警到响应，清晰可掌控。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:w-[280px] sm:justify-end">
                  {['Prometheus', 'Grafana', 'Falco', 'Vault', 'OPA', 'Trivy'].map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1 rounded-lg bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-12 sm:py-16 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.25em] mb-3">
              读者反馈
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              他们这样说。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                quote: '一套流水线，从漏洞百出到滴水不漏。只用了三天。',
                author: '李明',
                role: 'DevOps 工程师',
              },
              {
                quote: '两周前还不知道 OPA 是什么。现在，生产环境每一次变更都自带合规验证。',
                author: '王芳',
                role: '安全工程师',
              },
              {
                quote: '从一头雾水到心中有谱。终于知道安全应该放在哪里，以及为什么。',
                author: '张伟',
                role: '技术负责人',
              },
            ].map((item) => (
              <BentoCard key={item.author}>
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-serif text-blue-100 dark:text-blue-900 leading-none block mb-2">"</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {item.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">{item.author[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.author}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOPICS ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.25em] mb-3">
              知识专题
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
              从 Plan 到 Monitor。一览无遗。
            </p>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              八大阶段，八大专题。每一步都有详尽的教程与可落地的实践方案。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <Code2 className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '编码即安全',
                desc: 'SAST、SCA、密钥检测，漏洞在提交前消灭',
              },
              {
                icon: <Cpu className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '流水线即防线',
                desc: '门禁自动拦截，问题代码无处遁形',
              },
              {
                icon: <Layers className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '基础设施即信任',
                desc: 'IaC 合规、容器安全，每次变更自动验证',
              },
              {
                icon: <Compass className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '运营即洞察',
                desc: '全链路可观测，告警到响应一气呵成',
              },
            ].map((item) => (
              <BentoCard key={item.title}>
                <div className="p-6 h-full">
                  <div className="glass-icon mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <BentoCard className="relative overflow-hidden">
            <div className="relative z-10 p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
                    开始你的安全进化。
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl sm:max-w-none">
                    漏洞不会等你准备好。现在就开始，让安全成为本能。
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link href="/docs">
                      <Button variant="primary" size="lg" className="glass-button text-slate-900 dark:text-white px-6">
                        <BookOpen className="size-4" />
                        开始学习
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                    <Link
                      href="https://github.com/fuma-nama/fumadocs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="glass-button text-slate-700 dark:text-slate-300">
                        <Github className="size-4" />
                        GitHub
                      </Button>
                    </Link>
                  </div>
                </div>
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
