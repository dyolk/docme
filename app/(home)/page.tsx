import Link from 'next/link';
import { Footer } from '@/components/footer';
import {
  ScrollReveal,
  HeroStagger,
  HeroStaggerItem,
  HoverLiftCard,
} from '@/components/apple-animations';
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
    icon: Search,
    title: '文档搜索',
    desc: '基于 Orama 的全文检索引擎，毫秒级响应，支持模糊匹配与高亮展示。',
    href: '/docs',
  },
  {
    icon: FileText,
    title: 'MDX 渲染',
    desc: 'Fumadocs 原生 MDX 支持，组件化内容编写，交互式代码块与实时预览。',
    href: '/docs',
  },
  {
    icon: Calculator,
    title: '数学公式',
    desc: '集成 KaTeX，支持行内与块级 LaTeX 公式渲染，排版精确、加载迅速。',
    href: '/docs',
  },
  {
    icon: GitBranch,
    title: '流程图',
    desc: '内置 Mermaid 支持，直接在文档中绘制流程图、时序图与状态图。',
    href: '/docs',
  },
  {
    icon: GitCommit,
    title: '版本管理',
    desc: 'Git 驱动的内容版本控制，每次变更可追溯，支持多分支文档策略。',
    href: '/docs',
  },
  {
    icon: Globe,
    title: '多语言支持',
    desc: '内置国际化框架，轻松扩展多语言文档，适配全球化团队协作需求。',
    href: '/docs',
  },
];

const categories = [
  {
    icon: Server,
    title: '服务器准备',
    desc: '操作系统选型、内核调优、安全加固、基线检查。',
    href: '/docs/server-prep',
  },
  {
    icon: Terminal,
    title: '平台构建',
    desc: 'GitLab、Jenkins、Harbor、Nexus 从零搭建。',
    href: '/docs/platform',
  },
  {
    icon: Activity,
    title: '监控构建',
    desc: 'Prometheus + Grafana + ELK，指标、日志、告警标准化。',
    href: '/docs/monitoring',
  },
  {
    icon: Cloud,
    title: '云原生实现',
    desc: 'Docker、Kubernetes、Helm、Istio 生产级实践。',
    href: '/docs/cloud-native',
  },
  {
    icon: Bug,
    title: 'CVE 收录',
    desc: '影响版本、修复方案、验证步骤、回滚预案，直接查，直接修。',
    href: '/docs/cve',
  },
  {
    icon: ListChecks,
    title: '详细清单',
    desc: '服务器检查、部署验收、安全审计、故障排查、上线确认。',
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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#f5f5f7_70%)] dark:bg-[radial-gradient(ellipse_at_center,_#000000_0%,_#1d1d1f_70%)]" />
        <div className="relative z-10 max-w-[1120px] mx-auto">
          <HeroStagger>
            <HeroStaggerItem>
              <h1 className="apple-hero-title">
                DevSecOps
                <br />
                查询手册
              </h1>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <p className="apple-hero-subtitle mt-6 max-w-[640px] mx-auto">
                服务器、平台、监控、云原生、CVE、清单。
                <br className="hidden md:block" />
                一本手册，全部覆盖。
              </p>
            </HeroStaggerItem>
            <HeroStaggerItem>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/docs/getting-started/installation" className="apple-btn-primary">
                  开始阅读
                </Link>
                <Link href="/docs" className="apple-btn-secondary">
                  了解更多
                </Link>
              </div>
            </HeroStaggerItem>
          </HeroStagger>
        </div>
      </section>

      {/* ===== FEATURE GRID ===== */}
      <section className="apple-section apple-section-alt">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="apple-section-title">为开发者设计</h2>
              <p className="apple-section-subtitle mt-4 max-w-[520px] mx-auto">
                现代化的文档体验，让知识触手可及
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
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </div>
              </HoverLiftCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEVSECOPS CATEGORIES ===== */}
      <section className="apple-section">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="apple-section-title">覆盖 DevSecOps 全链路</h2>
              <p className="apple-section-subtitle mt-4 max-w-[560px] mx-auto">
                从基础设施到应用交付，每个环节都有标准可循
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <HoverLiftCard key={cat.title} delay={i * 0.08}>
                <div className="p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-[14px] bg-[var(--apple-blue)]/10 flex items-center justify-center mb-5">
                    <cat.icon className="size-6 text-[var(--apple-blue)]" />
                  </div>
                  <h3 className="apple-card-title">{cat.title}</h3>
                  <p className="apple-card-desc mt-2 flex-1">{cat.desc}</p>
                  <Link
                    href={cat.href}
                    className="apple-link mt-5 inline-flex items-center"
                  >
                    查看详情
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </div>
              </HoverLiftCard>
            ))}
          </div>
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
