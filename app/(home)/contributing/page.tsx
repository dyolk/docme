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

export const metadata = {
  title: '贡献指南',
};

const contributingSections = [
  {
    icon: <Heart className="size-5 text-[var(--accent)]" />,
    title: '欢迎贡献',
    content:
      '感谢您对 DocME 的兴趣！无论是修复错别字、改进文档、报告问题，还是提交新功能，每一份贡献都让这个项目变得更好。在参与之前，请花几分钟阅读本指南，以确保协作顺畅。',
  },
  {
    icon: <Bug className="size-5 text-[var(--accent)]" />,
    title: '提交 Issue',
    content:
      '发现 Bug 或有新功能建议？请先搜索现有 Issue 列表，确认没有重复。提交时，请使用对应的 Issue 模板，详细描述问题复现步骤、期望行为与实际行为，并附上相关环境信息（操作系统、Node.js 版本、浏览器等）。',
  },
  {
    icon: <GitPullRequest className="size-5 text-[var(--accent)]" />,
    title: 'Pull Request 流程',
    content:
      '1. Fork 本仓库并创建特性分支（git checkout -b feature/amazing-feature）。\n2. 提交代码变更，遵循提交信息规范（Conventional Commits）。\n3. 确保本地测试通过（pnpm test && pnpm lint）。\n4. 向 main 分支发起 PR，填写模板中的各项说明。\n5. 维护者将尽快审阅并与您沟通修改意见。',
  },
  {
    icon: <Code2 className="size-5 text-[var(--accent)]" />,
    title: '代码规范',
    content:
      '本项目使用 TypeScript 与 Tailwind CSS。请确保代码通过 ESLint 和 Prettier 检查。组件命名使用 PascalCase， hooks 使用 camelCase 并以 use 开头。CSS 类名按布局 > 盒模型 > 排版 > 外观 > 动画的顺序排列。',
  },
  {
    icon: <FileText className="size-5 text-[var(--accent)]" />,
    title: '文档贡献',
    content:
      '文档与代码同等重要。发现文档有误或不够清晰？直接点击页面底部的「在 GitHub 上编辑」进行修改。新增文档页面时，请同步更新侧边栏导航与相关链接，确保内容符合中文技术写作规范。',
  },
  {
    icon: <MessageSquare className="size-5 text-[var(--accent)]" />,
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
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.04] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4">
            贡献指南
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            感谢每一位贡献者。您的参与让 DocME 变得更好。
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {contributingSections.map((section) => (
              <div key={section.title} className="bento-card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Checklist Card */}
            <div className="bento-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="size-5 text-[var(--accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4">
                    提交前检查清单
                  </h2>
                  <ul className="space-y-2.5">
                    {checklist.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--foreground)]"
                      >
                        <ArrowRight className="size-4 mt-0.5 shrink-0 text-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub CTA */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 text-center">
            <p className="text-sm text-[var(--muted)]">
              准备好开始了吗？前往
              <a
                href="https://github.com/fuma-nama/fumadocs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline mx-1"
              >
                GitHub
              </a>
              查看仓库并提交您的第一个 Issue 或 PR。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
