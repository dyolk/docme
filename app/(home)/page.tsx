import { Button } from '@heroui/react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { readdirSync } from 'fs';
import { join } from 'path';

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

/* ── CVE Counter ─────────────────────────────── */

function getCveCount(): number {
  try {
    const cveDir = join(process.cwd(), 'content', 'docs', 'cve');
    const files = readdirSync(cveDir, { withFileTypes: true });
    return files.filter((f) => f.isFile() && (f.name.endsWith('.mdx') || f.name.endsWith('.md'))).length;
  } catch {
    return 0;
  }
}

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

export default async function HomePage() {
  const cveCount = getCveCount();

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
                  <span className="text-blue-600 dark:text-blue-500">DevSecOps。</span>
                  <br className="hidden sm:block" />
                  一查就有。
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-md leading-relaxed font-light">
                  服务器准备、平台构建、监控搭建、云原生落地、CVE 修复、经验总结、清单速查。一本就够了。
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/docs">
                  <Button variant="primary" size="lg" className="glass-button text-slate-900 dark:text-white px-6">
                    <BookOpen className="size-4" />
                    速查手册
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
                <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">7<span className="text-blue-600 dark:text-blue-500">大</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-semibold uppercase tracking-wider">核心专题板块</p>
              </div>
            </BentoCard>

            {/* 3. Stats Grid — 2x2 inside 1 column */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{cveCount}<span className="text-blue-600 dark:text-blue-500">+</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">CVE 收录</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">50<span className="text-blue-600 dark:text-blue-500">+</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">清单模板</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">30<span className="text-blue-600 dark:text-blue-500">+</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">实战经验</p>
              </BentoCard>
              <BentoCard className="flex flex-col justify-end p-5 aspect-square">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">100<span className="text-blue-600 dark:text-blue-500">%</span></p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">即查即用</p>
              </BentoCard>
            </div>

            {/* 4. Tech Stack — 2x1 */}
            <BentoCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">技术栈覆盖</h3>
                <Zap className="size-4 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Linux',
                  'Docker',
                  'Kubernetes',
                  'Jenkins',
                  'GitLab CI',
                  'Prometheus',
                  'Grafana',
                  'ELK',
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
              七大核心板块
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              从准备到修复。一步到位。
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
                    服务器准备。一步到位。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    从操作系统选型、内核调优、安全加固到基线检查，每一步都有标准化清单。照着做，不出错。
                  </p>
                </div>
                <div className="sm:w-[160px] flex-shrink-0 text-center">
                  <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">{cveCount}<span className="text-blue-600 dark:text-blue-500">+</span></p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold uppercase tracking-wider">CVE 收录</p>
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
                    平台构建。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    DevOps 平台从零搭建：GitLab、Jenkins、Harbor、Nexus。含架构设计、安装配置、集成联调与权限管控。
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
                    监控构建。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Prometheus + Grafana + ELK 完整搭建指南。指标采集、日志聚合、告警规则、大盘配置，全部标准化。
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
                    云原生实现。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Docker、Kubernetes、Helm、Istio 生产级实践。集群规划、网络方案、存储选型、灰度发布，经验总结。
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
                    工作经验总结。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    踩过的坑、绕过的路、通宵熬出来的教训。每一篇都是真实项目沉淀，读完少踩 80% 的坑。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 6 */}
            <BentoCard>
              <div className="p-6 h-full flex flex-col">
                <div className="glass-icon mb-4">
                  <Rocket className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    CVE 漏洞修复。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cveCount}+ CVE 详细收录：影响版本、修复方案、验证步骤、回滚预案。遇到漏洞，直接查，直接修。
                  </p>
              </div>
            </BentoCard>

            {/* Feature 7 — large card */}
            <BentoCard className="sm:col-span-2 lg:col-span-3">
              <div className="p-6 sm:p-8 h-full flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="glass-icon mb-4">
                    <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                    详细清单列表。拿来即用。
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    服务器检查清单、部署验收清单、安全审计清单、故障排查清单、上线前确认清单。50+ 模板，复制粘贴即可使用。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:w-[280px] sm:justify-end">
                  {['检查清单', '验收清单', '审计清单', '排查清单', '确认清单'].map((name) => (
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
                quote: '服务器准备清单太全了。照着一条一条检查，再也不会漏掉安全加固步骤。',
                author: '李明',
                role: '运维工程师',
              },
              {
                quote: 'CVE 收录非常详细。上次遇到一个漏洞，手册里直接有修复命令和验证方法，十分钟解决。',
                author: '王芳',
                role: '安全工程师',
              },
              {
                quote: 'K8s 部署踩的坑，这里都有总结。少走了很多弯路，节省了大量时间。',
                author: '张伟',
                role: '云原生工程师',
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
              七大板块。一查就有。
            </p>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              服务器准备、平台构建、监控搭建、云原生落地、经验总结、CVE 修复、清单速查。全面覆盖 DevSecOps 工作流。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: <Code2 className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '服务器准备',
                desc: '选型、调优、加固、基线检查，标准化清单',
              },
              {
                icon: <Cpu className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '平台构建',
                desc: 'GitLab、Jenkins、Harbor 从零搭建指南',
              },
              {
                icon: <Layers className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '监控构建',
                desc: 'Prometheus + Grafana + ELK 完整部署',
              },
              {
                icon: <Compass className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '云原生实现',
                desc: 'Docker、K8s、Helm 生产级实践',
              },
              {
                icon: <Lightbulb className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '经验总结',
                desc: '真实项目踩坑记录与避坑指南',
              },
              {
                icon: <Search className="size-5 text-blue-600 dark:text-blue-400" />,
                title: 'CVE 修复',
                desc: `${cveCount}+ 漏洞收录，修复方案即查即用`,
              },
              {
                icon: <FileText className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '清单速查',
                desc: '50+ 模板，复制粘贴直接使用',
              },
              {
                icon: <Rocket className="size-5 text-blue-600 dark:text-blue-400" />,
                title: '持续更新',
                desc: '新场景、新工具、新 CVE 及时补充',
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
                    手册在手。效率翻倍。
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl sm:max-w-none">
                    不用从零摸索，不用重复踩坑。遇到问题时，打开手册，直接找到答案。
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link href="/docs">
                      <Button variant="primary" size="lg" className="glass-button text-slate-900 dark:text-white px-6">
                        <BookOpen className="size-4" />
                        速查手册
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
