import { Footer } from '@/components/footer';
import { FileText, Eye, Database, Shield, Lock, Mail } from 'lucide-react';

export const metadata = {
  title: '隐私政策',
};

const sections = [
  {
    icon: <FileText className="size-5 text-[var(--accent)]" />,
    title: '隐私政策概述',
    content: `我们非常重视您的隐私。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。请您在使用我们的服务前仔细阅读本政策。通过使用我们的服务，即表示您同意我们按照本政策所述的方式处理您的信息。`,
  },
  {
    icon: <Eye className="size-5 text-[var(--accent)]" />,
    title: '信息收集',
    content: `我们可能会收集以下类型的信息：您在使用服务时主动提供的信息（如联系方式、反馈内容）；您的浏览器或设备自动发送的技术信息（如 IP 地址、浏览器类型、操作系统）；以及您与我们服务交互时产生的使用数据。我们仅收集提供服务所必需的最少信息。`,
  },
  {
    icon: <Database className="size-5 text-[var(--accent)]" />,
    title: '信息使用',
    content: `我们使用收集的信息来：提供、维护和改进我们的服务；回应您的询问和请求；分析使用趋势以优化用户体验；以及确保服务的安全性和稳定性。我们不会将您的个人信息出售给任何第三方，也不会在未经您同意的情况下将其用于本政策所述目的之外的其他用途。`,
  },
  {
    icon: <Shield className="size-5 text-[var(--accent)]" />,
    title: '信息保护',
    content: `我们采取合理的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或泄露。这些措施包括数据加密、访问控制、安全审计等。尽管我们尽力保护您的信息，但请注意，互联网传输无法保证绝对安全。`,
  },
  {
    icon: <Lock className="size-5 text-[var(--accent)]" />,
    title: 'Cookie 与追踪技术',
    content: `我们使用 Cookie 和类似技术来增强您的使用体验、记住您的偏好设置以及分析服务使用情况。您可以通过浏览器设置来管理或禁用 Cookie，但请注意，禁用 Cookie 可能会影响部分功能的正常使用。`,
  },
  {
    icon: <Mail className="size-5 text-[var(--accent)]" />,
    title: '联系我们',
    content: `如果您对本隐私政策有任何疑问、建议或投诉，或者希望行使您的数据权利（如访问、更正、删除您的个人信息），请通过我们的 GitHub 仓库或电子邮件与我们联系。我们将在合理的时间内回应您的请求。`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main className="apple-section">
        <div className="max-w-[720px] mx-auto">
          <h1 className="apple-display-1 text-center mb-6">隐私政策</h1>
          <p className="apple-body-lg text-center mb-4">
            我们尊重并保护您的个人隐私，本政策说明了我们如何处理您的信息。
          </p>
          <p className="apple-caption text-center mb-16">
            最后更新日期：2025年4月29日
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="apple-headline">{section.title}</h2>
                </div>
                <p className="apple-body">{section.content}</p>
              </section>
            ))}

            <section className="pt-6">
              <p className="apple-body text-center">
                如果您对本隐私政策有任何疑问，请通过我们的
                <a
                  href="https://github.com/fuma-nama/fumadocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-link mx-1"
                >
                  GitHub
                </a>
                联系我们。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
