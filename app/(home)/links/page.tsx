import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import websitesData from '@/content/useful-websites.json';

export const metadata: Metadata = {
  title: '友链',
  description: '有用的网站和工具收藏',
};

interface Website {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

export default function LinksPage() {
  const websites: Website[] = websitesData;

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 pt-[100px] pb-16 sm:pt-[120px]">
        {/* 头部 */}
        <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05] mb-4">
          友链。
        </h1>
        <p className="text-[19px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6] mb-16 sm:mb-20">
          有用的网站和工具收藏
        </p>

        {/* 网站卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {websites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              {/* 图标 */}
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2c2c2e] flex items-center justify-center mb-4 overflow-hidden">
                {site.icon ? (
                  <img src={site.icon} alt="" className="w-7 h-7 object-contain" />
                ) : (
                  <span className="text-[16px] font-bold text-[#86868b] dark:text-[#a1a1a6]">
                    {site.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* 名称 */}
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight mb-1">
                {site.name}
              </h3>
              {/* 描述 */}
              <p className="text-[14px] text-[#86868b] dark:text-[#a1a1a6] leading-relaxed flex-1">
                {site.description}
              </p>
              {/* 外链标识 */}
              <div className="mt-4 flex items-center gap-1 text-[12px] text-[#0071E3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>访问网站</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}