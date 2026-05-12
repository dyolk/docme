'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { HoverLiftCard } from '@/components/apple-animations';

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
    const cardWidth = 280;
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
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {members.map((member, i) => (
            <HoverLiftCard key={member.slug} delay={i * 0.08}>
              <Link
                href={`/team/${member.slug}`}
                className="block shrink-0 w-[240px] sm:w-[260px] p-7 bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] transition-colors hover:bg-[#ebebf0] dark:hover:bg-[#2c2c2e]"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#e8e8ed] dark:bg-[#3a3a3c] mb-5">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[22px] font-bold text-[#86868b]">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-[13px] sm:text-[14px] text-[#86868b] dark:text-[#a1a1a6] mt-2 leading-relaxed">
                  {member.role}
                </p>

                {/* Arrow indicator */}
                <div className="mt-5 flex items-center text-[#0071E3] text-[13px] font-medium">
                  查看详情
                  <svg
                    className="size-3.5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            </HoverLiftCard>
          ))}
        </div>

        {/* 左右箭头按钮 - 右下角 */}
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
      </div>
    </div>
  );
}
