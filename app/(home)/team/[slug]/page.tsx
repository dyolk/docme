import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/apple-animations';
import { teamSource } from '@/lib/team-source';
import { getMDXComponents } from '@/components/mdx';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import teamData from '@/content/team.json';
import { ArrowLeft } from 'lucide-react';
import { OtherMembersCarousel } from '@/components/other-members-carousel';

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

const team: TeamMember[] = teamData;

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  // 尝试加载成员的 MDX 介绍文件
  const mdxPage = teamSource.getPage([slug]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Back Link */}
      <section className="pt-28 sm:pt-36 pb-0">
        <div className="max-w-[1000px] mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors duration-300"
          >
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
        </div>
      </section>

      {/* Profile Card */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1000px] mx-auto px-6">
          <ScrollReveal>
            <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[28px] p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[#e8e8ed] dark:bg-[#3a3a3c] shrink-0">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[40px] font-bold text-[#86868b]">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05]">
                    {member.name}
                  </h1>
                  <p className="text-[17px] sm:text-[19px] text-[#6e6e73] dark:text-[#a1a1a6] mt-2">
                    {member.role}
                  </p>
                  <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] mt-4 max-w-[560px] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Markdown Introduction */}
      {mdxPage && (
        <section className="pb-16 sm:pb-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <ScrollReveal>
              <div className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[28px] p-8 sm:p-12">
                <article className="team-mdx-content">
                  <DocsBody>
                    <mdxPage.data.body components={getMDXComponents()} />
                  </DocsBody>
                </article>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Other Members */}
      {team.filter((m) => m.slug !== slug).length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8">其他成员</h2>
              <OtherMembersCarousel members={team.filter((m) => m.slug !== slug)} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
