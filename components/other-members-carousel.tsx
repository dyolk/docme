'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

interface OtherMembersCarouselProps {
  members: TeamMember[];
}

export function OtherMembersCarousel({ members }: OtherMembersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  if (members.length === 0) return null;

  return (
    <div>
      {/* 横向滚动卡片容器 */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {members.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="shrink-0 w-[300px] sm:w-[320px] relative p-8 sm:p-10 h-[280px] flex flex-col bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] transition-colors hover:bg-[#ebebf0] dark:hover:bg-[#2c2c2e]"
            >
              {/* Avatar - 替代 feature-carousel 中的图标区域 */}
              <div className="size-10 rounded-full overflow-hidden bg-[#e8e8ed] dark:bg-[#3a3a3c] mb-5">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[16px] font-bold text-[#86868b]">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name - 对应 feature-carousel 的标题 */}
              <h3 className="text-[20px] sm:text-[24px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                {member.name}
              </h3>

              {/* Role - 对应 feature-carousel 的描述 */}
              <p className="text-[14px] sm:text-[15px] text-[#86868b] dark:text-[#a1a1a6] mt-3 leading-relaxed">
                {member.role}
              </p>

              {/* "+" 按钮 - 与 feature-carousel 完全一致的加号按钮 */}
              <div
                className="absolute bottom-7 right-7 w-9 h-9 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="size-5 text-white dark:text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 左右箭头按钮 - 与 feature-carousel 一致 */}
        {members.length >= 3 && (
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors cursor-pointer"
            >
              <ChevronRight className="size-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
