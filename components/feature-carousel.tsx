'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import {
  ListChecks,
  Bug,
  BookOpen,
  Search,
  GitCommit,
  GitBranch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  href: string;
}

const features: Feature[] = [
  {
    icon: ListChecks,
    title: '安全检查清单',
    desc: '逐项排查，滴水不漏。',
    detail: '基于行业最佳实践的安全检查清单，覆盖服务器加固、容器安全、网络策略等各环节，帮助团队系统性地排查安全隐患。',
    href: '/docs',
  },
  {
    icon: Bug,
    title: 'CVE 漏洞库',
    desc: '已知威胁，尽在掌握。',
    detail: '持续更新的 CVE 漏洞数据库，包含漏洞详情、影响范围、修复方案和缓解措施，让您第一时间掌握安全态势。',
    href: '/docs/cve',
  },
  {
    icon: BookOpen,
    title: '最佳实践指南',
    desc: '前人铺路，后人无忧。',
    detail: '汇集来自安全社区和生产环境的实战经验，从配置加固到应急响应，提供可直接落地的操作指南。',
    href: '/docs',
  },
  {
    icon: Search,
    title: '全文搜索',
    desc: '所想即所得。',
    detail: '强大的全文搜索引擎，支持关键词高亮、模糊匹配和分类筛选，让您快速定位所需的安全知识。',
    href: '/docs',
  },
  {
    icon: GitCommit,
    title: '持续更新',
    desc: '与威胁赛跑，永不停歇。',
    detail: '安全态势瞬息万变，我们的知识库紧跟最新威胁情报和补丁发布，确保文档始终与时俱进。',
    href: '/docs',
  },
  {
    icon: GitBranch,
    title: '开源协作',
    desc: '众人拾柴，安全无界。',
    detail: '完全开源的协作模式，欢迎安全研究者和工程师贡献知识，共建更完善的安全知识体系。',
    href: '/docs',
  },
];

export function FeatureCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const { setOpenSearch } = useSearchContext();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 横向滚动卡片容器 */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="shrink-0 w-[300px] sm:w-[320px] relative p-8 sm:p-10 h-[280px] flex flex-col bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px]"
            >
              <feature.icon className="size-10 text-[#1d1d1f] dark:text-[#f5f5f7] stroke-[1.5] mb-5" />
              <h3 className="text-[20px] sm:text-[24px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                {feature.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#86868b] dark:text-[#a1a1a6] mt-3 leading-relaxed">
                {feature.desc}
              </p>
              {/* "+" 按钮 - 打开弹窗 */}
              <button
                onClick={() => setActiveFeature(feature)}
                className="absolute bottom-7 right-7 w-9 h-9 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <svg className="size-5 text-white dark:text-[#1d1d1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 左右箭头按钮 - 右下角 */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors"
          >
            <ChevronLeft className="size-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors"
          >
            <ChevronRight className="size-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
          </button>
        </div>
      </div>

      {/* 弹窗 Modal */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveFeature(null)}
          >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* 弹窗卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-[#1c1c1e] rounded-[20px] shadow-2xl max-w-[560px] w-full p-10 sm:p-12"
            >
              {/* 关闭按钮 */}
              <button
                onClick={() => setActiveFeature(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors"
              >
                <X className="size-4 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              </button>

              {/* 小标签 */}
              <p className="text-[13px] text-[#86868b] dark:text-[#a1a1a6] font-medium mb-4">
                {activeFeature.title}
              </p>

              {/* 大标题 */}
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight mb-5">
                {activeFeature.desc}
              </h2>

              {/* 详细描述 */}
              <p className="text-[15px] sm:text-[17px] text-[#86868b] dark:text-[#a1a1a6] leading-relaxed mb-8">
                {activeFeature.detail}
              </p>

              {/* 链接 */}
              {activeFeature.title === '全文搜索' ? (
                <button
                  onClick={() => {
                    setActiveFeature(null);
                    setOpenSearch(true);
                  }}
                  className="text-[#0071E3] text-[15px] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  立即使用搜索功能
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={activeFeature.href}
                  className="text-[#0071E3] text-[15px] font-medium hover:underline inline-flex items-center gap-1"
                >
                  进一步了解
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
