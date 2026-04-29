import { FileText, Shield, UserCheck, BookOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata = {
  title: '服务条款',
};

const sections = [
  {
    icon: <FileText className="size-5 text-[var(--accent)]" />,
    title: '服务条款概述',
    content: `欢迎使用我们的文档平台服务。本服务条款（以下简称"条款"）适用于您访问和使用本网站及相关服务（以下简称"服务"）。通过访问或使用我们的服务，即表示您同意受本条款的约束。如果您不同意本条款的任何部分，请立即停止使用我们的服务。`,
  },
  {
    icon: <BookOpen className="size-5 text-[var(--accent)]" />,
    title: '使用服务',
    content: `您可以使用我们的服务浏览、阅读和分享文档内容。我们致力于提供准确、及时的技术文档资源。您同意仅以合法目的使用本服务，并遵守所有适用的法律法规。我们保留随时修改、暂停或终止服务的权利，而无需事先通知。`,
  },
  {
    icon: <UserCheck className="size-5 text-[var(--accent)]" />,
    title: '用户责任',
    content: `作为用户，您有责任维护自己账户信息的安全性和保密性。您同意不从事以下行为：上传或传播任何非法、有害、威胁、辱骂、骚扰、诽谤、 vulgar、淫秽或其他令人反感的内容；干扰或破坏服务的正常运行；尝试未经授权访问我们的系统或网络；利用服务进行任何商业活动而未经我们书面同意。`,
  },
  {
    icon: <Shield className="size-5 text-[var(--accent)]" />,
    title: '知识产权',
    content: `本网站上所有内容，包括但不限于文本、图形、标识、图标、图像、音频剪辑、数字下载、数据编辑和软件，均为我们或我们的内容提供商的财产，受中国和国际版权法保护。未经我们明确书面许可，您不得以任何方式复制、修改、分发、展示或创建基于本网站内容的衍生作品。`,
  },
  {
    icon: <AlertTriangle className="size-5 text-[var(--accent)]" />,
    title: '免责声明',
    content: `本服务按"现状"和"可用性"提供。在法律允许的最大范围内，我们不承担任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权的暗示保证。我们不对因使用或无法使用本服务而产生的任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任，即使我们已被告知此类损害的可能性。`,
  },
  {
    icon: <RefreshCw className="size-5 text-[var(--accent)]" />,
    title: '条款变更',
    content: `我们保留随时修改本服务条款的权利。任何变更将在发布到本网站时立即生效。您在任何变更发布后继续使用服务，即表示您接受修改后的条款。我们建议您定期查看本页面以了解最新条款。如有重大变更，我们将尽力通过网站公告或其他适当方式通知您。`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.04] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4">
            服务条款
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            请仔细阅读以下条款，它们规范了您对我们服务的使用。
          </p>
          <p className="text-xs text-[var(--muted)] mt-4">
            最后更新日期：2025年4月29日
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="bento-card p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 text-center">
            <p className="text-sm text-[var(--muted)]">
              如果您对本服务条款有任何疑问，请通过我们的
              <a
                href="https://github.com/fuma-nama/fumadocs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline mx-1"
              >
                GitHub
              </a>
              联系我们。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
