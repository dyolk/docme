import { ScrollText, Copyright, CheckCircle, AlertCircle } from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata = {
  title: '开源协议',
};

const licenseSections = [
  {
    icon: <ScrollText className="size-5 text-[var(--accent)]" />,
    title: '开源协议说明',
    content: '本项目采用 MIT 开源协议。MIT 协议是一种宽松的开源软件许可协议，它赋予您极大的自由度来使用、修改和分发本软件。我们致力于开源社区的发展，相信开放协作能够推动技术创新和知识共享。',
  },
  {
    icon: <CheckCircle className="size-5 text-[var(--accent)]" />,
    title: '使用许可',
    content: '根据 MIT 协议，您可以自由地：将软件用于任何目的，包括商业用途；研究软件的工作原理并对其进行修改；分发软件的副本；以及公开发布修改后的版本。这些权利的唯一条件是，您必须在所有副本或实质性部分中包含上述版权声明和本许可声明。',
  },
  {
    icon: <Copyright className="size-5 text-[var(--accent)]" />,
    title: '版权声明',
    content: '本软件及其相关文档文件的版权归原始作者所有。我们感谢每一位贡献者的辛勤付出。如果您在自己的项目中使用了本软件，我们感谢您给予适当的致谢，但这并非强制要求。所有商标和注册商标均为其各自所有者的财产。',
  },
  {
    icon: <AlertCircle className="size-5 text-[var(--accent)]" />,
    title: '免责条款',
    content: '本软件按"现状"提供，不附带任何形式的担保，无论是明示的还是暗示的，包括但不限于对适销性、特定用途适用性和非侵权性的担保。在任何情况下，作者或版权持有人均不对因本软件或本软件的使用或其他交易而产生的任何索赔、损害或其他责任承担责任，无论是在合同、侵权或其他行为中。',
  },
];

export default function LicensePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.04] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-4">
            开源协议
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            本项目基于 MIT 协议开源，您可以自由使用、修改和分发。
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {licenseSections.map((section) => (
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

            {/* MIT License Full Text Card */}
            <div className="bento-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <ScrollText className="size-5 text-[var(--accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4">
                    MIT 协议内容
                  </h2>
                  <div className="rounded-xl bg-[var(--surface-secondary)]/60 border border-[var(--border)] p-5 sm:p-6 font-mono text-xs sm:text-sm text-[var(--muted)] leading-relaxed overflow-x-auto">
                    <p className="mb-2">MIT License</p>
                    <p className="mb-4">Copyright (c) {new Date().getFullYear()} My App</p>
                    <p className="mb-4">
                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the &quot;Software&quot;), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                    </p>
                    <p className="mb-4">
                      The above copyright notice and this permission notice shall be included in all
                      copies or substantial portions of the Software.
                    </p>
                    <p>
                      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                      SOFTWARE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 text-center">
            <p className="text-sm text-[var(--muted)]">
              完整的协议文本和项目源码可在
              <a
                href="https://github.com/fuma-nama/fumadocs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline mx-1"
              >
                GitHub
              </a>
              上查看。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
