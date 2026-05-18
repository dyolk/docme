import Link from 'next/link';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/apple-animations';
import { FeatureCarousel } from '@/components/feature-carousel';
import { HeroSection } from '@/components/hero-section';
import { formatBlogDate } from '@/lib/shared';
import { readdirSync } from 'fs';
import { join } from 'path';

import {
  ArrowRight,
  FileText,
  Calculator,
  Globe,
  Server,
  Terminal,
  Activity,
  Cloud,
  ShieldCheck,
  Shield,
  Box,
  Network,
  Code,
  ClipboardCheck,
  BookOpen,
} from 'lucide-react';
import { blogSource } from '@/lib/blog-source';
import teamData from '@/content/team.json';

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

const team: TeamMember[] = teamData;

/* ── CVE Counter ─────────────────────────────── */

async function getCveCount(): Promise<number> {
  try {
    const cveDir = join(process.cwd(), 'content', 'docs', 'cve');
    const files = readdirSync(cveDir, { withFileTypes: true });
    return files.filter((f) => f.isFile() && f.name.endsWith('.mdx') && f.name.toLowerCase().startsWith('cve-')).length;
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

// Features are now defined in FeatureCarousel component

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

  // 最新博客（按日期降序，相同日期按标题排序）
  const blogs = blogSource.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    if (dateB !== dateA) return dateB - dateA;
    return (a.data.title || '').localeCompare(b.data.title || '');
  }).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== FEATURE GRID ===== */}
      <section className="apple-section apple-section-alt">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] dark:text-[#f5f5f7]">
                为安全而生，<br />好处多多。
              </h2>
            </div>
          </ScrollReveal>

          <FeatureCarousel />
        </div>
      </section>

      {/* ===== DEVSECOPS CATEGORIES ===== */}
      <section className="py-[120px] max-md:py-[80px] bg-[#f5f5f7] dark:bg-[#111111]">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] dark:text-[#f5f5f7]">
                从代码到云端，<br />一路护航。
              </h2>
              <p className="mt-4 text-[1.0625rem] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed max-w-[560px]">
                每一环，都固若金汤。
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.08}>
                <Link
                  href={cat.href}
                  className="group block bg-white dark:bg-[#1d1d1f] rounded-[20px] p-8 h-full transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1d1d1f]/10 dark:bg-[#f5f5f7]/10 flex items-center justify-center mb-6">
                    <cat.icon className="w-6 h-6 text-[#1d1d1f] dark:text-[#f5f5f7]" />
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
      <section className="py-[120px] max-md:py-[80px]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] dark:text-[#f5f5f7]">
                  不止于文档。<br />远不止于此。
                </h2>
                <p className="mt-6 text-[1.0625rem] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed max-w-[480px]">
                  每一页，都是实战。
                </p>
                <div className="mt-8 flex flex-wrap gap-8">
                  <div>
                    <div className="text-3xl font-semibold text-[#1d1d1f] dark:text-white">{checklistCount || '0'}</div>
                    <div className="text-sm text-[#6e6e73] dark:text-[#a1a1a6] mt-1">安全清单</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-[#1d1d1f] dark:text-white">{cveCount || '0'}</div>
                    <div className="text-sm text-[#6e6e73] dark:text-[#a1a1a6] mt-1">漏洞收录</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-[#1d1d1f] dark:text-white">6</div>
                    <div className="text-sm text-[#6e6e73] dark:text-[#a1a1a6] mt-1">安全领域</div>
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
                    className="flex items-center gap-4 p-4 rounded-[20px] bg-[#f5f5f7] dark:bg-[#1c1c1e]"
                  >
                    <item.icon className="size-5 text-[#1d1d1f] dark:text-[#f5f5f7] shrink-0" />
                    <span className="text-[1.0625rem] text-[#1d1d1f] dark:text-[#f5f5f7]">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOGS ===== */}
      <section className="py-[120px] max-md:py-[80px] bg-[#f5f5f7] dark:bg-[#111111]">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] dark:text-[#f5f5f7]">
                新鲜出炉。
              </h2>
              <p className="mt-4 text-[1.0625rem] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed max-w-[560px]">
                最新洞察。
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <ScrollReveal key={blog.url} delay={i * 0.08}>
                <Link href={blog.url} className="group block bg-white dark:bg-[#1d1d1f] rounded-[20px] overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* 封面图 */}
                  <div className="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#0071E3] to-[#00C7FF]">
                    {blog.data.cover && (
                      <img src={blog.data.cover} alt={blog.data.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    )}
                  </div>
                  {/* 内容 */}
                  <div className="p-6 flex flex-col">
                    {blog.data.tags && blog.data.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {blog.data.tags.map((tag: string) => (
                          <span key={tag} className="text-xs font-medium text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-2 line-clamp-2">{blog.data.title}</h3>
                    <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed line-clamp-3 mb-4">{blog.data.description}</p>
                    <span className="text-[13px] text-[#86868b] dark:text-[#6e6e73] mt-auto">{formatBlogDate(blog.data.date)}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] dark:text-[#f5f5f7]">
              我们的团队
            </h2>
            <p className="text-[17px] sm:text-[19px] text-[#6e6e73] dark:text-[#a1a1a6] mt-4 max-w-[560px]">
              热爱安全，持续分享。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
            {team.map((member) => (
              <Link key={member.slug} href={`/team/${member.slug}`} className="group">
                <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-6 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-[#e8e8ed] dark:bg-[#3a3a3c]">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[24px] font-bold text-[#86868b]">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{member.name}</h3>
                  <p className="text-[13px] text-[#86868b] dark:text-[#a1a1a6] mt-1">{member.role}</p>
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
