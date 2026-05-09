'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, ChevronRight, BookOpen } from 'lucide-react';

/* ===================== 类型定义 ===================== */

export interface ResourceFile {
  name: string;
  fullName: string;
  size: string;
  rawSize: number;
  content: string;
}

export interface ResourceDirectory {
  name: string;
  readme: string;
  files: ResourceFile[];
}

export interface ResourceData {
  readme: string;
  directories: ResourceDirectory[];
}

type ViewState =
  | { type: 'root' }
  | { type: 'directory'; dirIndex: number }
  | { type: 'file'; dirIndex: number; fileIndex: number };

const appleEase = [0.25, 0.1, 0.25, 1] as const;

/* ===================== README 简单渲染器 ===================== */

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[#1d1d1f] dark:text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function SimpleMarkdown({ content }: { content: string }) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-2">
          {trimmed.replace(/^#\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h1>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-lg font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-2 mt-4">
          {trimmed.replace(/^##\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-1 mt-3">
          {trimmed.replace(/^###\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={key++} className="ml-4 list-disc marker:text-[#0071E3] text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
          {renderInline(trimmed.replace(/^[-*]\s*/, ''))}
        </li>
      );
      continue;
    }
    elements.push(
      <p key={key++} className="text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  }

  return <div>{elements}</div>;
}

/* ===================== 面包屑组件 ===================== */

function Breadcrumb({
  view,
  directories,
  onNavigate,
}: {
  view: ViewState;
  directories: ResourceDirectory[];
  onNavigate: (v: ViewState) => void;
}) {
  const segments: { label: string; action: () => void; clickable: boolean }[] = [
    {
      label: 'resources',
      action: () => onNavigate({ type: 'root' }),
      clickable: view.type !== 'root',
    },
  ];

  if (view.type === 'directory' || view.type === 'file') {
    const dirName = directories[view.dirIndex]?.name ?? '';
    segments.push({
      label: dirName,
      action: () => onNavigate({ type: 'directory', dirIndex: view.dirIndex }),
      clickable: view.type === 'file',
    });
  }

  if (view.type === 'file') {
    const file = directories[view.dirIndex]?.files[view.fileIndex];
    if (file) {
      segments.push({
        label: file.fullName,
        action: () => {},
        clickable: false,
      });
    }
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-[#86868b] dark:text-[#6e6e73] text-sm select-none">/</span>
          )}
          {seg.clickable ? (
            <button
              onClick={seg.action}
              className="text-sm text-[#0071E3] hover:underline underline-offset-2 transition-colors duration-150 font-medium"
            >
              {seg.label}
            </button>
          ) : (
            <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
              {seg.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ===================== 文件列表行 ===================== */

function FileRow({
  icon,
  name,
  meta,
  rightMeta,
  onClick,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  meta?: string;
  rightMeta?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#e5e5e5] dark:border-[#2c2c2e] last:border-b-0 hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-colors duration-150 text-left group"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <span className="truncate font-medium text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071E3] dark:group-hover:text-[#0a84ff] transition-colors duration-150">
          {name}
        </span>
        {meta && (
          <span className="hidden sm:block text-[13px] text-[#86868b] dark:text-[#6e6e73] truncate">
            {meta}
          </span>
        )}
      </div>
      {rightMeta && (
        <span className="shrink-0 text-[12px] text-[#86868b] dark:text-[#6e6e73] ml-2">
          {rightMeta}
        </span>
      )}
      <ChevronRight className="w-3.5 h-3.5 text-[#c7c7cc] dark:text-[#48484a] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    </button>
  );
}

/* ===================== 根目录视图 ===================== */

function RootView({
  data,
  onNavigate,
}: {
  data: ResourceData;
  onNavigate: (v: ViewState) => void;
}) {
  return (
    <div>
      {/* 文件表格容器 */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden mb-6">
        {data.directories.map((dir, dirIndex) => (
          <FileRow
            key={dir.name}
            icon={<Folder className="w-[18px] h-[18px] text-[#0071E3]" />}
            name={dir.name}
            meta={dir.readme ? dir.readme.split('\n').find(l => l.trim() && !l.startsWith('#'))?.trim().slice(0, 60) : undefined}
            rightMeta={dir.files.length > 0 ? `${dir.files.length} files` : undefined}
            onClick={() => onNavigate({ type: 'directory', dirIndex })}
          />
        ))}
        {/* README.md 行 */}
        {data.readme && (
          <>
            <div className="border-t border-[#e5e5e5] dark:border-[#2c2c2e]" />
            <FileRow
              icon={<FileText className="w-[18px] h-[18px] text-[#86868b] dark:text-[#6e6e73]" />}
              name={
                <span>
                  README
                  <span className="text-[#86868b] dark:text-[#6e6e73] font-normal">.md</span>
                </span>
              }
              onClick={() => {}}
            />
          </>
        )}
      </div>

      {/* README 渲染区 */}
      {data.readme && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#e5e5e5] dark:border-[#2c2c2e]">
            <BookOpen className="w-4 h-4 text-[#0071E3]" />
            <span className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">README.md</span>
          </div>
          <div className="px-6 py-5">
            <SimpleMarkdown content={data.readme} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== 目录视图 ===================== */

function DirectoryView({
  dir,
  dirIndex,
  onNavigate,
}: {
  dir: ResourceDirectory;
  dirIndex: number;
  onNavigate: (v: ViewState) => void;
}) {
  return (
    <div>
      {/* 文件表格 */}
      {dir.files.length > 0 && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden mb-6">
          {/* 有 readme 时也显示 README 行 */}
          {dir.readme && (
            <FileRow
              icon={<FileText className="w-[18px] h-[18px] text-[#86868b] dark:text-[#6e6e73]" />}
              name={
                <span>
                  README
                  <span className="text-[#86868b] dark:text-[#6e6e73] font-normal">.md</span>
                </span>
              }
              onClick={() => {}}
            />
          )}
          {dir.files.map((file, fileIndex) => {
            const lastDot = file.fullName.lastIndexOf('.');
            const base = lastDot > 0 ? file.fullName.slice(0, lastDot) : file.fullName;
            const ext = lastDot > 0 ? file.fullName.slice(lastDot) : '';
            return (
              <FileRow
                key={file.fullName}
                icon={<FileText className="w-[18px] h-[18px] text-[#86868b] dark:text-[#6e6e73]" />}
                name={
                  <span>
                    {base}
                    {ext && <span className="text-[#86868b] dark:text-[#6e6e73] font-normal">{ext}</span>}
                  </span>
                }
                rightMeta={file.size}
                onClick={() => onNavigate({ type: 'file', dirIndex, fileIndex })}
              />
            );
          })}
        </div>
      )}

      {/* README 渲染区 */}
      {dir.readme && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#e5e5e5] dark:border-[#2c2c2e]">
            <BookOpen className="w-4 h-4 text-[#0071E3]" />
            <span className="text-[13px] font-medium text-[#1d1d1f] dark:text-white">README.md</span>
          </div>
          <div className="px-6 py-5">
            <SimpleMarkdown content={dir.readme} />
          </div>
        </div>
      )}

      {/* 空目录提示 */}
      {dir.files.length === 0 && !dir.readme && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-16 text-center">
          <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">此目录为空</p>
        </div>
      )}
    </div>
  );
}

/* ===================== 文件预览视图 ===================== */

function FileView({
  file,
}: {
  file: ResourceFile;
}) {
  const lines = file.content.split('\n');
  // 去除末尾空行
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  const lineCount = lines.length;

  return (
    <div>
      {/* 文件信息头 */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden">
        {/* 文件信息栏 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e5e5] dark:border-[#2c2c2e] bg-[#f5f5f7]/50 dark:bg-[#2c2c2e]/30">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-[#0071E3] shrink-0" />
            <span className="text-[13px] font-mono font-medium text-[#1d1d1f] dark:text-white truncate">
              {file.fullName}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 ml-4">
            <span className="text-[12px] text-[#86868b] dark:text-[#6e6e73]">
              {lineCount} lines
            </span>
            <span className="text-[12px] text-[#86868b] dark:text-[#6e6e73] hidden sm:block">
              {file.size}
            </span>
          </div>
        </div>

        {/* 代码区域 */}
        <div className="overflow-auto max-h-[600px] bg-[#f9f9fb] dark:bg-[#161617]">
          <table className="w-full border-collapse font-mono text-[13px] leading-[1.65]">
            <tbody>
              {lines.map((line, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#0071E3]/5 dark:hover:bg-[#0071E3]/5 transition-colors duration-100"
                >
                  <td className="select-none text-right pr-4 pl-5 py-0 text-[#86868b] dark:text-[#48484a] w-12 min-w-[3rem] align-top border-r border-[#e5e5e5] dark:border-[#2c2c2e] text-[12px]">
                    {i + 1}
                  </td>
                  <td className="pl-4 pr-5 py-0 text-[#1d1d1f] dark:text-[#e5e5e7] whitespace-pre align-top overflow-x-visible">
                    {line || ' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== 主组件 ===================== */

export function ResourceBrowser({ data }: { data: ResourceData }) {
  const [view, setView] = useState<ViewState>({ type: 'root' });
  const [prevKey, setPrevKey] = useState(0);

  const handleNavigate = (next: ViewState) => {
    setPrevKey(k => k + 1);
    setView(next);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentDir =
    view.type !== 'root' ? data.directories[view.dirIndex] : null;

  const currentFile =
    view.type === 'file' && currentDir
      ? currentDir.files[view.fileIndex]
      : null;

  // 统计信息
  const totalFiles = data.directories.reduce((sum, d) => sum + d.files.length, 0);
  const totalDirs = data.directories.length;

  return (
    <div className="bg-[#f5f5f7] dark:bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">

        {/* ===== 头部区域：标题 + 面包屑紧凑排列 ===== */}
        <div className="mb-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-white">
                资源库
              </h1>
              <p className="mt-1 text-[15px] text-[#86868b] dark:text-[#a1a1a6]">
                精选的配置模板与安全工具脚本
              </p>
            </div>
            <div className="text-[12px] text-[#86868b] dark:text-[#6e6e73] flex items-center gap-3">
              <span>{totalDirs} 个目录</span>
              <span className="w-px h-3 bg-[#d2d2d7] dark:bg-[#3a3a3c]"></span>
              <span>{totalFiles} 个文件</span>
            </div>
          </div>
        </div>

        {/* ===== 面包屑导航 ===== */}
        <div className="mb-4 flex items-center min-h-[28px] px-1">
          <Breadcrumb
            view={view}
            directories={data.directories}
            onNavigate={handleNavigate}
          />
        </div>

        {/* ===== 主内容区（带切换动画）===== */}
        {data.directories.length > 0 || data.readme ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={prevKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: appleEase }}
            >
              {view.type === 'root' && (
                <RootView data={data} onNavigate={handleNavigate} />
              )}
              {view.type === 'directory' && currentDir && (
                <DirectoryView
                  dir={currentDir}
                  dirIndex={view.dirIndex}
                  onNavigate={handleNavigate}
                />
              )}
              {view.type === 'file' && currentFile && (
                <FileView file={currentFile} />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-20 text-center">
            <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">暂无资源文件</p>
          </div>
        )}

        {/* ===== 底部信息栏 ===== */}
        <div className="mt-10 pt-8 border-t border-[#d2d2d7] dark:border-[#3a3a3c]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#86868b] dark:text-[#6e6e73] leading-relaxed">
                所有资源均经过安全审计，可直接用于生产环境。
              </p>
              <p className="text-[12px] text-[#c7c7cc] dark:text-[#48484a] mt-1">
                向 <code className="font-mono">public/resources/</code> 添加文件即可自动展示
              </p>
            </div>
            <a
              href="/docs"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0071E3] hover:underline underline-offset-2 transition-colors shrink-0"
            >
              查看文档
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
