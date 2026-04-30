import { Button } from '@heroui/react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { DevSecOpsCycle } from '@/components/devsecops-cycle';
import {
  BookOpen,
  Github,
  ArrowRight,
  Layers,
  ChevronRight,
  FileText,
  Code2,
  Shield,
  Eye,
  Lock,
  Workflow,
  Container,
  Radio,
  AlertTriangle,
  Zap,
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
    <div className="flex flex-col min-h-screen bg-[#f8f9fc] dark:bg-[#050505]">
      {/* ===== HERO: Bento Grid ===== */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">

            {/* 1. Hero Card — 2x2 */}
            <BentoCard className="md:col-span-2 row-span-2 p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold w-fit mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  安全合规通过
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]">
                  <span className="text-blue-600 dark:text-blue-500">DevSecOps</span>
                  <br className="hidden sm:block" />
                  {' '}安全文档中心
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  为安全团队打造的现代化技术文档平台。统一沉淀安全规范、漏洞响应流程与合规检查清单，让安全左移真正落地。
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/docs">
                  <Button variant="primary" size="lg" className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl px-6">
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
                  <Button variant="outline" size="lg" className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Github className="size-4" />
                    GitHub
                  </Button>
                </Link>
              </div>
            </BentoCard>

            {/* 2. Security Stats — 1x1 */}
            <BentoCard className="md:col-span-1 p-6 sm:p-8 flex flex-col justify-between min-h-[180px]">
              <Shield className="size-5 text-slate-300 dark:text-slate-600" />
              <div>
                <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">98.6<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-semibold uppercase tracking-wider">本月安全扫描通过率</p>
              </div>
            </BentoCard>

            {/* 3. Stats Grid — 2x2 inside 1 column */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">12.5<span className="text-blue-600 dark:text-blue-500">k</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">安全扫描</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">4.2<span className="text-blue-600 dark:text-blue-500">h</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">平均修复</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">100<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">合规检查</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">-72<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">漏洞减少</p>
              </BentoCard>
            </div>

            {/* 4. Tech Stack — 2x1 */}
            <BentoCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">安全工具链</h3>
                <Zap className="size-4 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Trivy',
                  'Snyk',
                  'SonarQube',
                  'Falco',
                  'Vault',
                  'OPA',
                  'Checkov',
                  'Terrascan',
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* 5. DevSecOps Cycle Card */}
            <BentoCard className="md:col-span-2 bg-slate-900 dark:bg-[#080808] border-slate-800 dark:border-slate-800/60 p-0 overflow-hidden flex flex-col">
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">安全流水线</h3>
              </div>
              <div className="flex-1 px-4 pb-4">
                <DevSecOpsCycle />
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
              核心能力
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
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                    <Shield className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    安全左移实践
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    在编码阶段即引入 SAST、SCA 和密钥扫描，将安全漏洞消灭在萌芽期。
                    集成 SonarQube、Snyk、Trivy 等工具，实现自动化安全门禁。
                  </p>
                </div>
                <div className="sm:w-[160px] flex-shrink-0 text-center">
                  <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">-72<span className="text-blue-600 dark:text-blue-500">%</span></p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold uppercase tracking-wider">生产环境漏洞减少</p>
                </div>
              </div>
            </BentoCard>

            {/* Feature 2 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                  <Workflow className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  CI/CD 安全集成
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  在流水线中嵌入漏洞扫描、镜像安全检查和 IaC 合规验证，确保每次交付都符合安全标准。
                </p>
              </div>
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                  <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  合规即代码
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  将安全合规要求转化为可执行的策略代码，通过 Open Policy Agent 实现自动化合规检查。
                </p>
              </div>
            </BentoCard>

            {/* Feature 4 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                  <AlertTriangle className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  威胁建模
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  基于 STRIDE 和 MITRE ATT&CK 框架，系统性地识别和评估系统潜在威胁，输出可落地的缓解方案。
                </p>
              </div>
            </BentoCard>

            {/* Feature 5 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                  <Eye className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  运行时安全
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  通过 Falco 等工具实时监控容器和 Kubernetes 集群的异常行为，快速响应安全事件。
                </p>
              </div>
            </BentoCard>

            {/* Feature 6 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-3">
              <div className="p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                    <Lock className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    零信任架构
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    实施最小权限原则、双向 TLS 认证和动态访问控制，构建"永不信任，始终验证"的安全基础设施。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:w-[280px] sm:justify-end">
                  {['mTLS', 'RBAC', 'SSO', 'Vault', 'WAF', 'DLP'].map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
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
              团队评价
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              深受安全团队信赖
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                quote: '这份文档平台让我们的安全规范终于有了一处统一的归宿。新成员上手时间从两周缩短到三天。',
                author: '李明',
                role: '安全架构师',
              },
              {
                quote: '将威胁建模模板和漏洞响应流程沉淀为文档后，我们的 MTTR 降低了 60%。强烈推荐！',
                author: '王芳',
                role: 'DevSecOps 负责人',
              },
              {
                quote: 'CI/CD 安全门禁的文档化让开发团队和安全团队的协作变得前所未有的顺畅。',
                author: '张伟',
                role: '研发效能负责人',
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

      {/* ===== ARCHITECTURE ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">
              安全架构
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
              纵深防御，层层设防
            </p>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              从代码到运行时，从基础设施到应用层，构建全方位的安全防护体系
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <Code2 className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '代码安全',
                desc: 'SAST / SCA / 密钥扫描，在编码阶段拦截漏洞',
              },
              {
                icon: <Container className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '容器安全',
                desc: '镜像漏洞扫描、运行时防护、供应链安全',
              },
              {
                icon: <Layers className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '基础设施',
                desc: 'IaC 合规检查、云安全态势管理、网络隔离',
              },
              {
                icon: <Radio className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '可观测性',
                desc: '安全事件监控、审计日志、威胁检测与响应',
              },
            ].map((item) => (
              <BentoCard key={item.title}>
                <div className="p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-slate-50/60 dark:from-blue-950/20 dark:via-[#0a0a0a] dark:to-slate-900/20" />
            <div className="relative z-10 p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
                    构建你的安全文档中心
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl sm:max-w-none">
                    统一沉淀安全规范、漏洞响应流程与合规检查清单，让安全左移真正落地到每个开发环节。
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link href="/docs">
                      <Button variant="primary" size="lg" className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl px-6">
                        <BookOpen className="size-4" />
                        阅读文档
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                    <Link
                      href="https://github.com/fuma-nama/fumadocs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
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
