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
                  教程持续更新
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]">
                  <span className="text-blue-600 dark:text-blue-500">DevSecOps</span>
                  <br className="hidden sm:block" />
                  {' '}实践教程
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  从安全左移理念到生产环境防护，系统讲解 DevSecOps 全流程实践。涵盖流水线搭建、安全扫描、合规治理与可观测性建设。
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
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-semibold uppercase tracking-wider">DevSecOps 实践阶段</p>
              </div>
            </BentoCard>

            {/* 3. Stats Grid — 2x2 inside 1 column */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">6<span className="text-blue-600 dark:text-blue-500">类</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">安全扫描工具</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">12<span className="text-blue-600 dark:text-blue-500">+</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">流水线实战</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">4<span className="text-blue-600 dark:text-blue-500">大</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">合规框架</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">100<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">开源免费</p>
              </BentoCard>
            </div>

            {/* 4. Tech Stack — 2x1 */}
            <BentoCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">工具链覆盖</h3>
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
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">
              核心教程
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              安全左移，贯穿全生命周期
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
                    DevSecOps 全流程实践
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    从规划阶段的安全需求分析，到编码时的 SAST/SCA 扫描，再到构建、测试、部署各阶段的安全门禁配置。
                    手把手教你搭建完整的 DevSecOps 流水线。
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
                  CI/CD 安全集成
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  在 Jenkins、GitLab CI 或 GitHub Actions 中集成 SonarQube、Trivy、Snyk 等工具，实现自动化安全扫描与质量门禁。
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
                  代码安全扫描
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  深入讲解 SAST（静态分析）、SCA（依赖扫描）、密钥检测与容器镜像扫描的原理、配置与实践技巧。
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
                  合规即代码
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  使用 Open Policy Agent、Checkov 等工具将合规要求转化为可执行策略，实现基础设施与配置的自动化合规检查。
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
                  运行时安全
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Falco 异常行为检测、RASP 应用自防护、容器运行时安全策略配置，教你守护生产环境最后一公里。
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
                    可观测性与安全运营
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    构建统一的安全可观测体系：Prometheus + Grafana 监控指标、ELK 日志审计、SkyWalking 链路追踪。
                    从告警到响应，完整的安全运营闭环。
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
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">
              读者反馈
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              帮助团队落地安全实践
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                quote: '按照教程搭了一套完整的 GitLab CI + Trivy + SonarQube 流水线，团队代码质量明显提升。',
                author: '李明',
                role: 'DevOps 工程师',
              },
              {
                quote: '之前对 OPA 和策略即代码完全不了解，这里的渐进式教程让我两周内就在生产环境落地了合规检查。',
                author: '王芳',
                role: '安全工程师',
              },
              {
                quote: '从 SAST 到容器扫描，从密钥管理到运行时防护，整套知识体系帮我理清了 DevSecOps 的实施路径。',
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
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">
              知识专题
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
              覆盖 DevSecOps 全链路
            </p>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              从安全需求到运行时防护，系统覆盖 DevSecOps 八大阶段的核心知识与实践
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <Code2 className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '安全编码',
                desc: 'SAST、SCA、密钥检测与代码审计实践',
              },
              {
                icon: <Cpu className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '流水线安全',
                desc: 'CI/CD 门禁、镜像扫描与制品签名',
              },
              {
                icon: <Layers className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '基础设施安全',
                desc: 'IaC 合规、容器安全与云安全态势管理',
              },
              {
                icon: <Compass className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '安全运营',
                desc: '可观测性、日志审计与威胁响应',
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
                    构建你的 DevSecOps 能力体系
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl sm:max-w-none">
                    从安全左移理念到生产环境防护，系统化教程帮助你掌握 DevSecOps 全流程实践。
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
