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
  Shield,
  Box,
  Network,
  Code,
  ClipboardCheck,
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
    desc: '逐项排查，滴水不漏。',
    href: '/docs',
  },
  {
    icon: Bug,
    title: 'CVE 漏洞库',
    desc: '已知威胁，尽在掌握。',
    href: '/docs',
  },
  {
    icon: BookOpen,
    title: '最佳实践指南',
    desc: '前人铺路，后人无忧。',
    href: '/docs',
  },
  {
    icon: Search,
    title: '全文搜索',
    desc: '所想即所得。',
    href: '/docs',
  },
  {
    icon: GitCommit,
    title: '持续更新',
    desc: '与威胁赛跑，永不停歇。',
    href: '/docs',
  },
  {
    icon: GitBranch,
    title: '开源协作',
    desc: '众人拾柴，安全无界。',
    href: '/docs',
  },
];

const categories = [
  {
    icon: Shield,
    title: '服务器安全',
    description: '固若金汤，从根基开始。',
    href: '/docs/server-prep',
  },
  {
    icon: Box,
    title: '容器安全',
    description: '轻量之中，层层设防。',
    href: '/docs/platform',
  },
  {
    icon: Network,
    title: 'Kubernetes 安全',
    description: '编排有序，防护有道。',
    href: '/docs/cloud-native',
  },
  {
    icon: Cloud,
    title: '云原生安全',
    description: '上云无忧，安全随行。',
    href: '/docs/cloud-native',
  },
  {
    icon: Code,
    title: '应用安全',
    description: '每一行代码，都值得信赖。',
    href: '/docs/cve',
  },
  {
    icon: ClipboardCheck,
    title: '合规审计',
    description: '合规不是终点，是起点。',
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
              <h2 className="apple-section-title">为安全而生。</h2>
              <p className="apple-section-subtitle mt-4 max-w-[520px] mx-auto">
                沉淀知识，守护每一行代码。
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
      <section className="py-[120px] max-md:py-[80px] bg-[#f5f5f7] dark:bg-[#111111]">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="apple-section-title text-center">从代码到云端，一路护航。</h2>
            <p className="apple-section-subtitle text-center mt-4 max-w-[560px] mx-auto">
              每一环，都固若金汤。
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.08}>
                <Link
                  href={cat.href}
                  className="group block bg-white dark:bg-[#1d1d1f] rounded-[20px] p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 dark:bg-[#0071E3]/20 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    <cat.icon className="w-6 h-6 text-[#0071E3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mb-3">{cat.title}</h3>
                  <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed">{cat.description}</p>
                </Link>
              </ScrollReveal>
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
                  不止于文档。
                  <br />
                  远不止于此。
                </h2>
                <p className="mt-6 text-[1.0625rem] text-[#a1a1a6] leading-relaxed max-w-[480px]">
                  每一页，都是实战。
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div>
                    <div className="text-3xl font-semibold text-white">{checklistCount || '0'}</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">安全清单</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">{cveCount || '0'}</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">漏洞收录</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">6</div>
                    <div className="text-sm text-[#a1a1a6] mt-1">安全领域</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} direction="right">
              <div className="space-y-4">
                {[
                  { icon: Server, text: '服务器安全加固' },
                  { icon: Terminal, text: 'CI/CD 权限管控' },
                  { icon: Activity, text: '全链路监控告警' },
                  { icon: Cloud, text: '云原生集群规划' },
                  { icon: ShieldCheck, text: '漏洞追踪修复' },
                  { icon: BookOpen, text: '项目经验沉淀' },
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
            <h2 className="apple-section-title text-center mb-4">新鲜出炉。</h2>
            <p className="apple-section-subtitle text-center mb-12">最新洞察。</p>
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
              开始探索。
            </h2>
            <p className="apple-section-subtitle mt-4 max-w-[520px] mx-auto">
              一切尽在掌握。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/docs" className="apple-btn-primary">
                查阅手册
                <ArrowRight className="size-4 ml-2" />
              </Link>
              <Link href="/blog" className="apple-btn-secondary">
                浏览博客
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
