import { Footer } from '@/components/footer';
import {
  GitPullRequest,
  Bug,
  MessageSquare,
  Code2,
  FileText,
  Heart,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata = {
  title: '贡献指南',
};

const contributingSections: { icon: LucideIcon; title: string; content: string }[] = [
  {
    icon: Heart,
    title: '欢迎贡献',
    content:
      '感谢您对 DocME 的兴趣！无论是修复错别字、改进文档、报告问题，还是提交新功能，每一份贡献都让这个项目变得更好。在参与之前，请花几分钟阅读本指南，以确保协作顺畅。',
  },
  {
    icon: Bug,
    title: '提交 Issue',
    content:
      '发现 Bug 或有新功能建议？请先搜索现有 Issue 列表，确认没有重复。提交时，请使用对应的 Issue 模板，详细描述问题复现步骤、期望行为与实际行为，并附上相关环境信息（操作系统、Node.js 版本、浏览器等）。',
  },
  {
    icon: GitPullRequest,
    title: 'Pull Request 流程',
    content:
      '1. Fork 本仓库并创建特性分支（git checkout -b feature/amazing-feature）。\n2. 提交代码变更，遵循提交信息规范（Conventional Commits）。\n3. 确保本地测试通过（pnpm test && pnpm lint）。\n4. 向 main 分支发起 PR，填写模板中的各项说明。\n5. 维护者将尽快审阅并与您沟通修改意见。',
  },
  {
    icon: Code2,
    title: '代码规范',
    content:
      '本项目使用 TypeScript 与 Tailwind CSS。请确保代码通过 ESLint 和 Prettier 检查。组件命名使用 PascalCase， hooks 使用 camelCase 并以 use 开头。CSS 类名按布局 > 盒模型 > 排版 > 外观 > 动画的顺序排列。',
  },
  {
    icon: FileText,
    title: '文档贡献',
    content:
      '文档与代码同等重要。发现文档有误或不够清晰？直接点击页面底部的「在 GitHub 上编辑」进行修改。新增文档页面时，请同步更新侧边栏导航与相关链接，确保内容符合中文技术写作规范。',
  },
  {
    icon: MessageSquare,
    title: '社区交流',
    content:
      '除了 GitHub，您还可以通过 Discord 或 Twitter 与我们交流。讨论前请先阅读行为准则：保持友善、尊重不同观点、避免人身攻击。我们致力于维护一个开放、包容的社区环境。',
  },
];

const checklist = [
  '已阅读并同意行为准则',
  'Issue / PR 描述清晰、无重复',
  '代码通过 lint 与 type-check',
  '文档同步更新（如需要）',
  '提交信息符合 Conventional Commits',
];

export default function ContributingPage() {
  return (
    <>
      <main className="bg-white dark:bg-black min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-20">
          <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            贡献指南。
          </h1>
          <p className="text-[15px] text-[#86868b] leading-relaxed mb-16">
            感谢每一位贡献者。您的参与让 DocME 变得更好。
          </p>

          <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-8 sm:p-12 space-y-12">
            {contributingSections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.title}>
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="size-8 stroke-[1.5] text-[#424245] dark:text-[#a1a1a6]" />
                    <h2 className="text-[22px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-[15px] text-[#86868b] leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              );
            })}

            <section>
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="size-8 stroke-[1.5] text-[#424245] dark:text-[#a1a1a6]" />
                <h2 className="text-[22px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  提交前检查清单
                </h2>
              </div>
              <ul className="space-y-3">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[#86868b] leading-relaxed">
                    <ArrowRight className="size-4 mt-1 shrink-0 text-[#424245] dark:text-[#a1a1a6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-6">
              <p className="text-[15px] text-[#86868b] leading-relaxed text-center">
                准备好开始了吗？前往
                <a
                  href="https://github.com/fuma-nama/fumadocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066cc] dark:text-[#2997ff] hover:underline mx-1"
                >
                  GitHub
                </a>
                查看仓库并提交您的第一个 Issue 或 PR。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
