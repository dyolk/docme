'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

// Apple 标准缓动曲线
const appleEase = [0.16, 1, 0.3, 1] as const;
// 更优雅的弹性缓动
const appleEaseOut = [0.25, 0.1, 0.25, 1] as const;

/**
 * TextRevealByWord - 逐字弹入动画
 */
export function TextRevealByWord({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.05,
            duration: 0.4,
            ease: appleEaseOut,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * GradientFlowText - 渐变流动文字（呼吸感节奏）
 */
export function GradientFlowText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-[#0071E3] via-[#00C7FF] to-[#0071E3] bg-clip-text text-transparent ${className}`}
      style={{ backgroundSize: '200% auto' }}
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}

/**
 * ScrollReveal - 滚动淡入组件
 * 当元素进入视口时从下方淡入，使用更优雅的弹性缓动
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: appleEaseOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLift - 悬停浮起组件
 * hover 时 translateY + shadow 增强
 */
export function HoverLift({
  children,
  className = '',
  y = -8,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      whileHover={{ y, transition: { duration: 0.3, ease: appleEaseOut } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLiftCard - 带滚动淡入 + hover 浮起的卡片
 * hover 时 translateY(-8px) + box-shadow 增强
 */
export function HoverLiftCard({
  children,
  className = '',
  delay = 0,
  y = -8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        y,
        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3, ease: appleEaseOut },
      }}
      transition={{ duration: 0.6, delay, ease: appleEaseOut }}
      className={`apple-card-hover ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * AppleCard - Apple 风格卡片，带 hover 抬起效果和滚动淡入
 */
export function AppleCard({
  children,
  className = '',
  delay = 0,
  hoverLift = -8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverLift?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        y: hoverLift,
        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3, ease: appleEaseOut },
      }}
      transition={{ duration: 0.6, delay, ease: appleEaseOut }}
      className={`apple-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroStagger - 首屏 stagger 淡入
 * 标题和副标题按顺序淡入
 */
export function HeroStagger({
  children,
  className = '',
  staggerDelay = 0.12,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroStaggerItem - HeroStagger 的子项
 */
export function HeroStaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: appleEaseOut } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection - 视差滚动效果区域
 */
export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * FadeInStagger - 子元素依次淡入
 */
export function FadeInStagger({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInStaggerItem - FadeInStagger 的子项
 */
export function FadeInStaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: appleEaseOut } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
