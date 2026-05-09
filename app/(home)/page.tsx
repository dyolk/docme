import Link from 'next/link';
import { Footer } from '@/components/footer';
import {
  ScrollReveal,
  HoverLiftCard,
} from '@/components/apple-animations';
import { HeroSection } from '@/components/hero-section';
import { readdirSync } from 'fs';
import { join } from 'path';

import {
  ArrowRight,
  Search,
  FileText,
  Calculator,
  GitBranch,
  GitCommit,
  Globe,
  Server,
  Terminal,
  Activity,
  Cloud,
  Bug,
  ShieldCheck,
  ListChecks,
  BookOpen,
} from 'lucide-react';
import { blogSource } from '@/lib/blog-source';

/* ── CVE Counter ─────────────────────────────── */

async function getCveCount(): Promise<number> {
  try {
    const cveDir = join(process.cwd(), 'content', 'docs', 'cve');
    const files = readdirSync(cveDir, { withFileTypes: true });
    return files.filter((f) => f.isFile() && (f.name.endsWith('.mdx') || f.name.endsWith('.md'))).length - 2;
  } catch {
    return 0;
  }
}

/* ── Checklist Counter ───────────────────────── */

async function getChecklistCount(): Promise<number> {
  try {
    const checklistDir = join(process.cwd(), 'content', 'docs', 'checklist');
    const files = readdirSync(checklistDir, { withFileTypes: true });
    return files.filter((f) => f.isFile() && (f.name.endsWith('.mdx') || f.name.endsWith('.md'))).length - 2;
  } catch {
    return 0;
  }
}

/* ── Feature Data ────────────────────────────── */

const features = [
  {
    icon: ListChecks,
    title: '安全检查清单',
    desc: '覆盖 Linux、Docker、Kubernetes 等平台的安全基线检查项，开箱即用。',
    href: '/docs',
  },
  {
    icon: Bug,
    title: 'CVE 漏洞库',
    desc: '收录常见 CVE 漏洞详情与修复方案，快速定位安全风险。',
    href: '/docs',
  },
  {
    icon: BookOpen,
    title: '最佳实践指南',
    desc: '汇集业界 DevSecOps 最佳实践，从代码到部署全链路安全。',
    href: '/docs',
  },
  {
    icon: Search,
    title: '全文搜索',
    desc: '支持中文分词的全文检索，秒级定位所需安全知识。',
    href: '/docs',
  },
  {
    icon: GitCommit,
    title: '持续更新',
    desc: '社区驱动的内容维护，紧跟最新安全威胁与防护方案。',
    href: '/docs',
  },
  {
    icon: GitBranch,
    title: '开源协作',
    desc: '基于 Git 的协作模式，欢迎贡献安全知识与经验。',
    href: '/docs',
  },
];

const categories = [
  {
    icon: Server,
    title: '服务器安全',
    desc: 'Linux 系统加固、SSH 配置、防火墙策略、日志审计。',
    href: '/docs/server-prep',
  },
  {
    icon: ShieldCheck,
    title: '容器安全',
    desc: 'Docker 镜像扫描、容器运行时防护、供应链安全。',
    href: '/docs/platform',
  },
  {
    icon: Cloud,
    title: 'Kubernetes 安全',
    desc: '集群加固、RBAC 策略、网络策略、Pod 安全标准。',
    href: '/docs/cloud-native',
  },
  {
    icon: Globe,
    title: '云原生安全',
    desc: '云平台安全配置、IAM 最佳实践、数据加密。',
    href: '/docs/cloud-native',
  },
  {
    icon: Bug,
    title: '应用安全',
    desc: 'OWASP Top 10、代码审计、依赖漏洞管理。',
    href: '/docs/cve',
  },
  {
    icon: FileText,
    title: '合规审计',
    desc: '等保 2.0、ISO 27001、SOC 2 合规要求与实施。',
    href: '/docs/checklists',
  },
];

/* ── Page ─────────────────────────────────────────── */

export default async function HomePage() {
  const cveCount = await getCveCount();
  const checklistCount = await getChecklistCount();

  // 最新博客
  const blogs = blogSource.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== FEATURE GRID ===== */}
      <section className="apple-section apple-section-alt">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="apple-section-title">DevSecOps 知识库</h2>
              <p className="apple-section-subtitle mt-4 max-w-[520px] mx-auto">
                开源安全知识沉淀，从基础设施到应用交付全链路覆盖
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <HoverLiftCard key={feature.title} delay={i * 0.08}>
                <div className="p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-[14px] bg-[var(--apple-blue)]/10 flex items-center justify-center mb-5">
                    <feature.icon className="size-6 text-[var(--apple-blue)]" />
                  </div>
                  <h3 className="apple-card-title">{feature.title}</h3>
                  <p className="apple-card-desc mt-2 flex-1">{feature.desc}</p>
                  <Link
                    href={feature.href}
                    className="apple-link mt-5 inline-flex items-center"
                  >
                    了解更多
                  </Link>
                </div>
              </HoverLiftCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEVSECOPS CATEGORIES ===== */}
      <section className="py-[120px] max-md:py-[80px] overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-6 mb-12">
          <ScrollReveal>
            <h2 className="apple-section-title text-center">覆盖 DevSecOps 全链路</h2>
            <p className="apple-section-subtitle text-center mt-4 max-w-[560px] mx-auto">
              从基础设施到应用层，全方位安全防护
            </p>
          </ScrollReveal>
        </div>

        {/* 无限滚动容器 */}
        <div className="group relative">
          <div className="flex gap-6 w-max animate-scroll-left hover:[animation-play-state:paused]">
            {/* 第一组卡片 */}
            {categories.map((cat, i) => {
              const gradientClasses = [
                'bg-gradient-to-br from-[#1a1a2e] to-[#16213e]',
                'bg-gradient-to-br from-[#0f3460] to-[#533483]',
                'bg-gradient-to-br from-[#326fa8] to-[#4834d4]',
                'bg-gradient-to-br from-[#00b4d8] to-[#0077b6]',
                'bg-gradient-to-br from-[#e63946] to-[#a8201a]',
                'bg-gradient-to-br from-[#2d6a4f] to-[#1b4332]',
              ];
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className={`flex-none w-[300px] p-8 rounded-[20px] ${gradientClasses[i]} text-white transition-transform duration-300 hover:scale-[1.02]`}
                >
                  <div className="w-14 h-14 rounded-[16px] bg-white/15 flex items-center justify-center mb-5 backdrop-blur-sm">
                    <cat.icon className="size-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{cat.desc}</p>
                </Link>
              );
            })}
            {/* 复制一组实现无缝循环 */}
            {categories.map((cat, i) => {
              const gradientClasses = [
                'bg-gradient-to-br from-[#1a1a2e] to-[#16213e]',
                'bg-gradient-to-br from-[#0f3460] to-[#533483]',
                'bg-gradient-to-br from-[#326fa8] to-[#4834d4]',
                'bg-gradient-to-br from-[#00b4d8] to-[#0077b6]',
                'bg-gradient-to-br from-[#e63946] to-[#a8201a]',
                'bg-gradient-to-br from-[#2d6a4f] to-[#1b4332]',
              ];
              return (
                <Link
                  key={`dup-${cat.title}`}
                  href={cat.href}
                  className={`flex-none w-[300px] p-8 rounded-[20px] ${gradientClasses[i]} text-white transition-transform duration-300 hover:scale-[1.02]`}
                >
                  <div className="w-14 h-14 rounded-[16px] bg-white/15 flex items-center justify-center mb-5 backdrop-blur-sm">
                    <cat.icon className="size-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{cat.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* 左右渐隐遮罩 */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ===== HIGHLIGHT ===== */}
      <section className="apple-section bg-[#1d1d1f] dark:bg-black text-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-white">
                  手册在手。
                  <br />
                  心中有谱。
                </h2>
                <p className="mt-6 text-[1.0625rem] text-[#a1a1a6] leading-relaxed max-w-[480px]">
                  不用从零摸索，不用重复踩坑。遇到问题时，打开手册，直接找到答案。每一篇文档都是真实项目沉淀，每一个清单都经过生产环境验证。
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div>
                    <div className="text-3xl font-semibold text-white">{checklistCount || '0'}</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">检查清单</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">{cveCount || '0'}</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">CVE 收录</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">6</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">核心领域</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} direction="right">
              <div className="space-y-4">
                {[
                  { icon: Server, text: '服务器准备与安全加固' },
                  { icon: Terminal, text: 'CI/CD 平台搭建与权限管控' },
                  { icon: Activity, text: '全链路监控与告警标准化' },
                  { icon: Cloud, text: '云原生集群规划与灰度发布' },
                  { icon: ShieldCheck, text: 'CVE 追踪与修复方案' },
                  { icon: BookOpen, text: '真实项目经验沉淀' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-[14px] bg-white/5 border border-white/10"
                  >
                    <item.icon className="size-5 text-[#0071e3] shrink-0" />
                    <span className="text-[1.0625rem] text-[#f5f5f7]">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOGS ===== */}
      <section className="py-[120px] max-md:py-[80px]">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="apple-section-title text-center mb-4">最新文章</h2>
            <p className="apple-section-subtitle text-center mb-12">探索我们的最新技术洞察</p>
          </ScrollReveal>

          {/* 横向滚动容器 */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
            {blogs.map((blog) => (
              <Link key={blog.url} href={blog.url} className="flex-none w-[340px] snap-start group">
                <div className="rounded-[20px] overflow-hidden bg-white dark:bg-[#1d1d1f] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-[420px] flex flex-col">
                  {/* 封面图 */}
                  <div className="h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0071E3] to-[#00C7FF]">
                    {blog.data.cover && (
                      <img src={blog.data.cover} alt={blog.data.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  {/* 内容 */}
                  <div className="p-6 flex-1 flex flex-col">
                    {blog.data.tags?.[0] && (
                      <span className="text-xs font-medium text-[#0071E3] mb-2">{blog.data.tags[0]}</span>
                    )}
                    <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-2 line-clamp-2">{blog.data.title}</h3>
                    <p className="text-sm text-[#6e6e73] flex-1 line-clamp-3">{blog.data.description}</p>
                    <span className="text-xs text-[#6e6e73] mt-4">{blog.data.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="apple-section apple-section-alt text-center">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="apple-section-title">
              准备好开始了吗？
            </h2>
            <p className="apple-section-subtitle mt-4 max-w-[520px] mx-auto">
              浏览文档，查找清单，追踪 CVE。一切尽在掌握。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/docs" className="apple-btn-primary">
                速查手册
                <ArrowRight className="size-4 ml-2" />
              </Link>
              <Link href="/blog" className="apple-btn-secondary">
                阅读博客
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
