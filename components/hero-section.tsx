'use client';

import { Button, Chip } from '@heroui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextRevealByWord, GradientFlowText } from '@/components/apple-animations';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-radial-hero-light" />

      <div className="relative z-10 text-center max-w-[900px] mx-auto px-6">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Chip color="accent" variant="soft" className="mb-6">
            <span className="flex items-center gap-1.5">
              <span className="hero-pulse-dot" />
              开源 · 免费 · 共建
            </span>
          </Chip>
        </motion.div>

        {/* 主标题 - 逐字动画 + 渐变 */}
        <h1 className="apple-hero-title mb-6 dark:text-[#f5f5f7]">
          <TextRevealByWord text="DevSecOps" className="block" />
          <GradientFlowText className="block mt-2">
            查询手册
          </GradientFlowText>
        </h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="apple-hero-subtitle max-w-[640px] mx-auto"
        >
          安全知识，一册尽览。
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex gap-4 justify-center mt-10"
        >
          <Link href="/docs" className="inline-flex">
            <Button variant="primary" size="lg" className="rounded-full hero-btn-tech">
              开始探索
            </Button>
          </Link>
          <a
            href="https://github.com/dyolk/docme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline" size="lg" className="rounded-full dark:border-white/80 dark:text-white dark:hover:bg-white/10">
              GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
