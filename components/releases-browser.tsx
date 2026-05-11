'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Plus, X } from 'lucide-react';

/* ===================== 类型定义 ===================== */

export interface ReleaseDoc {
  slug: string;         // 文件名去 .mdx
  title: string;        // frontmatter title
  order: number;        // frontmatter order
  date?: string;        // frontmatter date（可选）
  content: string;      // MDX body 内容
}

export interface ReleaseProject {
  slug: string;         // 目录名，如 "kubernetes"
  title: string;        // 来自 meta.json 的 title
  icon: string;         // 来自 meta.json 的 icon（Lucide 图标名）
  description: string;  // 来自 meta.json 的 description
  order: number;        // 排序
  logo?: string;        // Logo SVG 图片路径
  logoWhite?: string;   // 白色 Logo SVG 图片路径
  color?: string;       // 项目主题色
  latestVersion?: string;     // 最新版本号
  trackedVersions?: string[]; // 已追踪版本列表
  docs: ReleaseDoc[];   // 该项目下的所有文档
}

export interface ReleasesData {
  projects: ReleaseProject[];
}

const appleEase = [0.25, 0.1, 0.25, 1] as const;
const BASE_PATH = '/releases';

/* ===================== 辅助函数 ===================== */

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getDomainInitial(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '').charAt(0).toUpperCase();
  } catch {
    return '?';
  }
}

/* ===================== 行内渲染 ===================== */

function parseBold(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-bold-${i}`} className="text-[#1d1d1f] dark:text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-text-${i}`}>{part}</span>;
  });
}

function renderInline(text: string, onLinkClick?: (url: string) => void): React.ReactNode {
  // 1. 先分割行内代码
  const parts = text.split(/(`[^`]+`)/g);

  return parts.flatMap((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`code-${i}`}
          className="px-1.5 py-0.5 rounded-md bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#d1373a] dark:text-[#ff6b6b] text-[13px] font-mono border border-[#e5e5e5] dark:border-[#3a3a3c]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // 2. 对非代码部分，解析链接 [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let localKey = 0;

    while ((match = linkRegex.exec(part)) !== null) {
      // 链接前的文本 → 3. 解析粗体
      if (match.index > lastIndex) {
        const beforeText = part.slice(lastIndex, match.index);
        nodes.push(...parseBold(beforeText, `before-${i}-${localKey++}`));
      }

      const url = match[2];
      const isExternal = /^https?:\/\//.test(url);

      nodes.push(
        <a
          key={`link-${i}-${localKey++}`}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#0071E3] hover:underline underline-offset-2 inline-flex items-center gap-0.5"
          onClick={
            isExternal || !onLinkClick
              ? undefined
              : (e) => {
                  e.preventDefault();
                  onLinkClick(url);
                }
          }
        >
          {match[1]}
          {isExternal && <ExternalLink className="inline w-3 h-3 align-text-top opacity-70" />}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // 剩余文本 → 3. 解析粗体
    if (lastIndex < part.length) {
      nodes.push(...parseBold(part.slice(lastIndex), `after-${i}-${localKey++}`));
    }

    return nodes;
  });
}

/* ===================== 增强 SimpleMarkdown ===================== */

function SimpleMarkdown({ content, onLinkClick }: { content: string; onLinkClick?: (url: string) => void }) {
  if (!content) return null;

  // 排除 ## 参考链接 及其后面的内容
  const cleanedContent = content.replace(/##\s*参考链接\s*\n[\s\S]*?(?=\n##|\n$|$)/, '');

  const lines = cleanedContent.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={key++} className="h-3" />);
      continue;
    }

    // h1
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-4 mt-2">
          {renderInline(trimmed.replace(/^#\s*/, ''), onLinkClick)}
        </h1>
      );
      continue;
    }

    // h2
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-lg font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-3 mt-6">
          {renderInline(trimmed.replace(/^##\s*/, ''), onLinkClick)}
        </h2>
      );
      continue;
    }

    // h3
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-2 mt-5">
          {renderInline(trimmed.replace(/^###\s*/, ''), onLinkClick)}
        </h3>
      );
      continue;
    }

    // 代码块
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      const codeText = codeLines.join('\n');
      elements.push(
        <pre
          key={key++}
          className="bg-[#1d1d1f] dark:bg-[#0c0c0e] text-[#f5f5f7] rounded-xl p-4 overflow-x-auto text-[13px] font-mono leading-relaxed my-4 border border-[#3a3a3c]"
        >
          <code>{codeText}</code>
        </pre>
      );
      continue;
    }

    // 表格（连续以 | 开头的行）
    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      i--;

      const rows = tableLines.map((l) =>
        l
          .split('|')
          .map((c) => c.trim())
          .filter((c) => c !== '')
      );

      if (rows.length >= 2) {
        const headers = rows[0];
        const dataRows = rows.slice(2).filter((r) => r.length > 0 && !r.every((c) => /^[-:]+$/.test(c)));

        elements.push(
          <div key={key++} className="overflow-x-auto my-4 rounded-xl border border-[#d2d2d7] dark:border-[#3a3a3c]">
            <table className="w-full border-collapse text-[12px] sm:text-[14px]">
              <thead>
                <tr className="border-b-2 border-[#d2d2d7] dark:border-[#3a3a3c]">
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="text-left px-2 py-2 sm:px-3 sm:py-2.5 font-semibold text-[#1d1d1f] dark:text-white bg-[#f5f5f7] dark:bg-[#2c2c2e] first:rounded-tl-xl last:rounded-tr-xl"
                    >
                      {renderInline(h, onLinkClick)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`border-b border-[#e5e5e5] dark:border-[#2c2c2e] ${
                      ri % 2 === 1 ? 'bg-[#fafafa] dark:bg-[#1c1c1e]/60' : ''
                    }`}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-2 py-2 sm:px-3 sm:py-2.5 text-[#424245] dark:text-[#a1a1a6] leading-relaxed ${
                          ri === dataRows.length - 1 && ci === 0 ? 'rounded-bl-xl' : ''
                        } ${
                          ri === dataRows.length - 1 && ci === row.length - 1 ? 'rounded-br-xl' : ''
                        }`}
                      >
                        {renderInline(cell, onLinkClick)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 引用块（连续以 > 开头的行）
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      i--;

      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-[#0071E3] bg-[#f5f5f7] dark:bg-[#2c2c2e]/60 rounded-r-xl px-5 py-4 my-4"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
              {renderInline(ql, onLinkClick)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 有序列表（连续以数字. 开头的行）
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ''));
        i++;
      }
      i--;

      elements.push(
        <ol key={key++} className="list-decimal list-inside my-3 space-y-1.5">
          {items.map((item, ii) => (
            <li key={ii} className="text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed pl-1">
              {renderInline(item, onLinkClick)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Checkbox 列表项（未选中）
    if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('* [ ] ')) {
      const text = trimmed.replace(/^[-*]\s*\[\s*\]\s*/, '');
      elements.push(
        <li key={key++} className="ml-4 list-none flex items-start gap-2 text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
          <span className="mt-1 w-4 h-4 shrink-0 rounded border-2 border-[#d2d2d7] dark:border-[#48484a] inline-block" />
          <span>{renderInline(text, onLinkClick)}</span>
        </li>
      );
      continue;
    }

    // Checkbox 列表项（已选中）
    if (trimmed.startsWith('- [x] ') || trimmed.startsWith('* [x] ') || trimmed.startsWith('- [X] ') || trimmed.startsWith('* [X] ')) {
      const text = trimmed.replace(/^[-*]\s*\[[xX]\]\s*/, '');
      elements.push(
        <li key={key++} className="ml-4 list-none flex items-start gap-2 text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
          <span className="mt-1 w-4 h-4 shrink-0 rounded border-2 border-[#0071E3] bg-[#0071E3] inline-flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="line-through text-[#86868b] dark:text-[#6e6e73]">{renderInline(text, onLinkClick)}</span>
        </li>
      );
      continue;
    }

    // 无序列表项
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={key++} className="ml-4 list-disc marker:text-[#0071E3] text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
          {renderInline(trimmed.replace(/^[-*]\s*/, ''), onLinkClick)}
        </li>
      );
      continue;
    }

    // 普通段落
    elements.push(
      <p key={key++} className="text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
        {renderInline(trimmed, onLinkClick)}
      </p>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

/* ===================== 参考链接解析 ===================== */

function extractReferenceLinks(content: string): { text: string; url: string }[] {
  const refMatch = content.match(/##\s*参考链接\s*\n([\s\S]*?)(?=\n##|\n$|$)/);
  if (!refMatch) return [];
  const links: { text: string; url: string }[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = linkRegex.exec(refMatch[1])) !== null) {
    links.push({ text: m[1], url: m[2] });
  }
  return links;
}

/* ===================== URL 查询解析与同步 ===================== */

type ViewState =
  | { type: 'projects' }
  | { type: 'detail'; projectSlug: string; docSlug: string };

function parseFromURL(search: string, projects: ReleaseProject[]): ViewState {
  const params = new URLSearchParams(search);
  const projectSlug = params.get('project');
  const docSlug = params.get('doc');

  if (projectSlug) {
    const project = projects.find((p) => p.slug === projectSlug);
    if (project) {
      if (docSlug && project.docs.some((d) => d.slug === docSlug)) {
        return { type: 'detail', projectSlug, docSlug };
      }
      return { type: 'detail', projectSlug, docSlug: project.docs[0]?.slug ?? '' };
    }
  }

  return { type: 'projects' };
}

function buildQuery(projectSlug?: string, docSlug?: string): string {
  const url = new URL(BASE_PATH, window.location.origin);
  if (projectSlug) url.searchParams.set('project', projectSlug);
  if (docSlug) url.searchParams.set('doc', docSlug);
  return url.pathname + url.search;
}

/* ===================== 主组件 ===================== */

export function ReleasesBrowser({ data }: { data: ReleasesData }) {
  // 修复无限循环：使用 useMemo 缓存排序后的 projects
  const projects = useMemo(
    () => [...data.projects].sort((a, b) => a.order - b.order),
    [data.projects]
  );

  const [viewState, setViewState] = useState<ViewState>({ type: 'projects' });
  const [clickedProject, setClickedProject] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // 首次挂载时从 URL 同步状态（只运行一次）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseFromURL(window.location.search, projects);
    setViewState(parsed);
    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 监听 popstate（前进/后退按钮）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const parsed = parseFromURL(window.location.search, projects);
      setViewState(parsed);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  // 状态变化时更新 query string
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    const newUrl =
      viewState.type === 'projects'
        ? BASE_PATH
        : buildQuery(viewState.projectSlug, viewState.docSlug);
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  }, [viewState, isHydrated]);

  // 点击卡片过渡动画
  const handleCardClick = (slug: string) => {
    setClickedProject(slug);
    setTimeout(() => {
      enterProject(slug);
      setClickedProject(null);
    }, 500);
  };

  // 进入详情视图
  const enterProject = (projectSlug: string, docSlug?: string) => {
    const project = projects.find((p) => p.slug === projectSlug);
    if (!project) return;
    setViewState({
      type: 'detail',
      projectSlug,
      docSlug: docSlug ?? project.docs[0]?.slug ?? '',
    });
  };

  // 返回项目列表
  const goBack = () => {
    setViewState({ type: 'projects' });
  };

  // 切换文档
  const switchDoc = (docSlug: string) => {
    if (viewState.type !== 'detail') return;
    setViewState({ ...viewState, docSlug });
  };

  // 处理 Markdown 中的内部链接点击
  const handleLinkClick = (url: string) => {
    if (url.startsWith('/releases/')) {
      const segments = url.replace('/releases/', '').split('/');
      const projectSlug = segments[0];
      const docSlug = segments[1];
      if (projectSlug) {
        enterProject(projectSlug, docSlug);
        return;
      }
    }
    window.location.href = url;
  };

  // 当前详情数据
  const currentProject =
    viewState.type === 'detail'
      ? projects.find((p) => p.slug === viewState.projectSlug)
      : undefined;

  const currentDocs = currentProject
    ? [...currentProject.docs].sort((a, b) => a.order - b.order)
    : [];

  const currentDoc =
    viewState.type === 'detail'
      ? currentDocs.find((d) => d.slug === viewState.docSlug)
      : undefined;

  const referenceLinks = currentDoc ? extractReferenceLinks(currentDoc.content) : [];

  return (
    <div className="bg-[#f5f5f7] dark:bg-black min-h-screen pt-24 pb-16">
      {/* 点击全屏过渡层 */}
      <AnimatePresence>
        {clickedProject && (() => {
          const project = projects.find(p => p.slug === clickedProject);
          return (
            <motion.div
              key="transition-overlay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: appleEase }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ backgroundColor: project?.color ?? '#0071E3' }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: appleEase }}
              >
                {project?.logo ? (
                  <img src={project?.logoWhite || project?.logo} alt="" className="w-32 h-32 object-contain" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-white/20" />
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* ===== 头部区域 ===== */}
        <div className="mb-10">
          <h1 className="text-[24px] sm:text-[32px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-white">
            版本追踪
          </h1>
          <p className="mt-2 text-[15px] text-[#86868b] dark:text-[#a1a1a6]">
            追踪开源项目的重大版本更新与兼容性变更
          </p>
        </div>

        {/* ===== 项目卡片列表视图 ===== */}
        <AnimatePresence mode="wait" initial={false}>
          {viewState.type === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: appleEase }}
            >
              {projects.length === 0 ? (
                <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-20 text-center">
                  <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">暂无版本追踪数据</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <button
                      key={project.slug}
                      onClick={() => handleCardClick(project.slug)}
                      className="group text-left bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-[20px] cursor-pointer relative h-[360px] sm:h-[400px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      {/* 文字内容区 */}
                      <div className="relative z-10 p-8 flex flex-col">
                        {/* 小标签 */}
                        <span className="text-[12px] text-[#86868b] dark:text-[#a1a1a6] font-medium tracking-wide">
                          {project.title}
                        </span>
                        {/* 大标题 */}
                        <h3 className="text-[22px] sm:text-[26px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight mt-3">
                          {project.description}
                        </h3>
                        {/* 版本信息 */}
                        <div className="mt-4 flex flex-col gap-1">
                          {project.latestVersion && (
                            <p className="text-[14px] text-[#86868b] dark:text-[#a1a1a6]">
                              最新版本 <span className="font-mono">{project.latestVersion}</span>
                            </p>
                          )}
                          {project.trackedVersions && project.trackedVersions.length > 0 && (
                            <p className="text-[14px] text-[#86868b] dark:text-[#a1a1a6]">
                              已追踪 {project.trackedVersions.join('、')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 底部大 Logo */}
                      {project.logo && (
                        <div className="absolute bottom-0 left-0 right-0 h-[55%] flex items-end justify-center overflow-hidden rounded-b-[20px]">
                          <img
                            src={project.logo}
                            alt=""
                            className="w-[60%] max-h-[80%] object-contain opacity-[0.12]"
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      {/* 右下角 + 按钮 */}
                      <div className="absolute bottom-6 right-6 z-10 w-9 h-9 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="size-5 text-white dark:text-[#1d1d1f]" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ===== 项目详情视图 ===== */}
          {viewState.type === 'detail' && currentProject && (
            <motion.div
              key={`detail-${viewState.projectSlug}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: appleEase }}
              className="bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-xl overflow-hidden"
            >
              {/* 顶部区域：Tab + 关闭按钮 */}
              <div className="relative px-6 pt-6 pb-4">
                {/* 关闭按钮 - 右上角 */}
                <button
                  onClick={goBack}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#e8e8ed] dark:bg-[#3a3a3c] flex items-center justify-center hover:bg-[#d2d2d7] dark:hover:bg-[#48484a] transition-colors z-10"
                >
                  <X className="size-4 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                </button>

                {/* Tab 栏 - 居中 pill 风格 */}
                {currentDocs.length > 0 && (
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-0.5 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-full p-1 overflow-x-auto max-w-full scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {currentDocs.map((doc) => (
                        <button
                          key={doc.slug}
                          onClick={() => switchDoc(doc.slug)}
                          className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                            currentDoc?.slug === doc.slug
                              ? 'bg-white dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm'
                              : 'text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'
                          }`}
                        >
                          {doc.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 项目标题区 */}
              <div className="px-6 sm:px-10 pb-4 border-b border-[#f5f5f7] dark:border-[#2c2c2e]">
                <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1d1d1f] dark:text-white tracking-tight">
                  {currentProject.title}
                </h2>
                <p className="mt-1 text-[15px] text-[#86868b] dark:text-[#a1a1a6]">
                  {currentProject.description}
                </p>
              </div>

              {/* 文档内容区 */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentDoc?.slug ?? 'empty'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: appleEase }}
                  className="px-6 sm:px-10 py-8"
                >
                  {currentDoc ? (
                    <>
                      <SimpleMarkdown content={currentDoc.content} onLinkClick={handleLinkClick} />

                      {/* 参考来源 */}
                      {referenceLinks.length > 0 && (
                        <div className="mt-10 pt-7 border-t border-[#e5e5e5] dark:border-[#2c2c2e]">
                          <h3 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white mb-4">
                            参考来源
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {referenceLinks.map((link, idx) => (
                              <button
                                key={idx}
                                onClick={() => window.open(link.url, '_blank')}
                                className="group inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-[#e5e5e5] dark:border-[#3a3a3c] hover:border-[#0071E3]/30 dark:hover:border-[#0071E3]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer min-w-0"
                              >
                                {/* 域名首字母圆圈 */}
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3]/10 to-[#0071E3]/5 flex items-center justify-center shrink-0">
                                  <span className="text-[12px] font-bold text-[#0071E3]">
                                    {getDomainInitial(link.url)}
                                  </span>
                                </div>
                                <div className="text-left min-w-0">
                                  <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-white truncate">
                                    {link.text}
                                  </div>
                                  <div className="text-[11px] text-[#86868b] dark:text-[#6e6e73] truncate">
                                    {getDomain(link.url)}
                                  </div>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-[#86868b] dark:text-[#a1a1a6] group-hover:text-[#0071E3] shrink-0 ml-auto" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">请选择文档</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
