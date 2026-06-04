'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FileText,
  BookOpen,
  FolderOpen,
} from 'lucide-react';
import { getMDXComponents } from '@/components/mdx';

/* ===================== 类型定义 ===================== */

export interface ResourceFile {
  name: string;
  fullName: string;
  size: string;
  rawSize: number;
  content: string;
  isBinary?: boolean;
  lastUpdated: string;
}

export interface ResourceDirectory {
  name: string;
  fullPath?: string;
  readme: string;
  files: ResourceFile[];
  lastUpdated: string;
  children?: ResourceDirectory[];
}

export interface UsageDoc {
  slug: string;
  title: string;
  content?: string | React.ReactNode;
  body?: React.ComponentType<any>;
  order?: number;
}

export interface ResourceData {
  readme: string;
  directories: ResourceDirectory[];
  usageDocs: UsageDoc[];
  lastUpdated: string;
}

type ViewState =
  | { type: 'root' }
  | { type: 'directory'; path: number[] }
  | { type: 'file'; path: number[]; fileIndex: number };

const appleEase = [0.25, 0.1, 0.25, 1] as const;

/* ===================== 辅助函数 ===================== */

function getDirectoryByPath(directories: ResourceDirectory[], path: number[]): ResourceDirectory | null {
  if (path.length === 0) return null;
  let current = directories[path[0]];
  for (let i = 1; i < path.length; i++) {
    if (!current?.children) return null;
    current = current.children[path[i]];
  }
  return current ?? null;
}

const BASE_PATH = '/resources';

function parseQuery(search: string, directories: ResourceDirectory[]): ViewState {
  const params = new URLSearchParams(search);
  const pathParam = params.get('path') ?? '';

  if (!pathParam) return { type: 'root' };

  const segments = pathParam.split('/').filter(Boolean);
  if (segments.length === 0) return { type: 'root' };

  let path: number[] = [];
  let currentLevel = directories;

  for (let i = 0; i < segments.length; i++) {
    const dirIndex = currentLevel.findIndex((d) => d.name === segments[i]);
    if (dirIndex === -1) {
      if (path.length === 0) return { type: 'root' };

      const dir = getDirectoryByPath(directories, path);
      if (!dir) return { type: 'root' };

      const fileIndex = dir.files.findIndex((f) => f.fullName === segments.slice(i).join('/'));
      if (fileIndex !== -1) {
        return { type: 'file', path: [...path], fileIndex };
      }
      return { type: 'root' };
    }
    path.push(dirIndex);
    currentLevel = currentLevel[dirIndex].children ?? [];
  }

  return { type: 'directory', path };
}

function viewStateToQuery(view: ViewState, directories: ResourceDirectory[]): string {
  if (view.type === 'root') return BASE_PATH;

  const names: string[] = [];
  let currentDirs = directories;
  for (let i = 0; i < view.path.length; i++) {
    const dir = currentDirs[view.path[i]];
    if (!dir) break;
    names.push(dir.name);
    currentDirs = dir.children ?? [];
  }

  let pathParam = '';
  if (view.type === 'directory') {
    pathParam = names.join('/');
  } else {
    const dir = getDirectoryByPath(directories, view.path);
    const file = dir?.files[view.fileIndex];
    pathParam = file ? [...names, file.fullName].join('/') : names.join('/');
  }

  return pathParam ? `${BASE_PATH}?path=${encodeURIComponent(pathParam)}` : BASE_PATH;
}

function viewKey(v: ViewState): string {
  if (v.type === 'root') return 'root';
  if (v.type === 'directory') return `dir-${v.path.join('-')}`;
  return `file-${v.path.join('-')}-${v.fileIndex}`;
}

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
      label: '$HOME',
      action: () => onNavigate({ type: 'root' }),
      clickable: view.type !== 'root',
    },
  ];

  if (view.type === 'directory' || view.type === 'file') {
    for (let i = 0; i < view.path.length; i++) {
      const partialPath = view.path.slice(0, i + 1);
      const dir = getDirectoryByPath(directories, partialPath);
      segments.push({
        label: dir?.name ?? '',
        action: () => onNavigate({ type: 'directory', path: partialPath }),
        clickable: view.type === 'file' || i < view.path.length - 1,
      });
    }
  }

  if (view.type === 'file') {
    const dir = getDirectoryByPath(directories, view.path);
    const file = dir?.files[view.fileIndex];
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
  rightMeta2,
  onClick,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  meta?: string;
  rightMeta?: string;
  rightMeta2?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#e5e5e5] dark:border-[#2c2c2e] last:border-b-0 hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-colors duration-150 text-left group"
    >
      {/* 左列：icon + name */}
      <div className="shrink-0 flex items-center gap-3 min-w-0 w-[160px] sm:w-[200px]">
        {icon}
        <span className="truncate font-medium text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0071E3] dark:group-hover:text-[#0a84ff] transition-colors duration-150">
          {name}
        </span>
      </div>

      {/* 中列：meta，容器居中，文字左对齐 */}
      {meta && (
        <div className="hidden sm:flex flex-1 justify-center min-w-0 px-2">
          <span className="text-left text-[13px] text-[#86868b] dark:text-[#6e6e73] truncate w-full max-w-[360px]">
            {meta}
          </span>
        </div>
      )}
      {!meta && <div className="hidden sm:block flex-1" />}

      {/* 右列：rightMeta + rightMeta2，固定宽度对齐（始终占位） */}
      <div className="shrink-0 flex items-center gap-3 w-[180px]">
        <span className="text-[12px] text-[#86868b] dark:text-[#6e6e73] text-right w-[90px]">
          {rightMeta || '\u00A0'}
        </span>
        <span className="text-[12px] text-[#86868b] dark:text-[#6e6e73] text-right w-[70px]">
          {rightMeta2 || '\u00A0'}
        </span>
      </div>
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
            meta={dir.readme ? dir.readme.split('\n').find(l => l.trim() && !l.startsWith('#'))?.trim().slice(0, 80) : undefined}
            rightMeta={dir.lastUpdated}
            onClick={() => onNavigate({ type: 'directory', path: [dirIndex] })}
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
  path,
  onNavigate,
}: {
  dir: ResourceDirectory;
  path: number[];
  onNavigate: (v: ViewState) => void;
}) {
  const hasContent = dir.files.length > 0 || (dir.children?.length ?? 0) > 0 || !!dir.readme;

  return (
    <div>
      {/* 文件表格 */}
      {hasContent && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden mb-6">
          {/* 子目录 */}
          {dir.children?.map((child, childIndex) => (
            <FileRow
              key={child.name}
              icon={<Folder className="w-[18px] h-[18px] text-[#0071E3]" />}
              name={child.name}
              meta={child.readme ? child.readme.split('\n').find((l) => l.trim() && !l.startsWith('#'))?.trim().slice(0, 80) : undefined}
              rightMeta={child.lastUpdated}
              onClick={() => onNavigate({ type: 'directory', path: [...path, childIndex] })}
            />
          ))}

          {/* 文件（包含 README，按字母排序） */}
          {(() => {
            type FileItem =
              | { kind: 'readme'; name: string }
              | { kind: 'file'; file: ResourceFile; index: number };

            const items: FileItem[] = [];
            if (dir.readme) {
              items.push({ kind: 'readme', name: 'README.md' });
            }
            dir.files.forEach((file, index) => {
              items.push({ kind: 'file', file, index });
            });
            items.sort((a, b) => {
              const nameA = a.kind === 'readme' ? a.name : a.file.fullName;
              const nameB = b.kind === 'readme' ? b.name : b.file.fullName;
              return nameA.localeCompare(nameB);
            });

            return items.map((item) => {
              if (item.kind === 'readme') {
                return (
                  <FileRow
                    key="README.md"
                    icon={<FileText className="w-[18px] h-[18px] text-[#86868b] dark:text-[#6e6e73]" />}
                    name={
                      <span>
                        README
                        <span className="text-[#86868b] dark:text-[#6e6e73] font-normal">.md</span>
                      </span>
                    }
                    onClick={() => {}}
                  />
                );
              }
              const file = item.file;
              const fileIndex = item.index;
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
                  rightMeta={file.lastUpdated}
                  rightMeta2={file.size}
                  onClick={() => {
                    if (file.isBinary && dir.fullPath) {
                      const a = document.createElement('a');
                      a.href = '/resources/' + dir.fullPath + '/' + file.fullName;
                      a.download = file.fullName;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    } else {
                      onNavigate({ type: 'file', path, fileIndex });
                    }
                  }}
                />
              );
            });
          })()}
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
      {!hasContent && (
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

/* ===================== 使用指南 Tab 内容 ===================== */

function UsageGuideView({ usageDocs }: { usageDocs: UsageDoc[] }) {
  const [selectedSlug, setSelectedSlug] = useState(usageDocs[0]?.slug ?? '');
  const selectedDoc = usageDocs.find((d) => d.slug === selectedSlug);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-start">
      {/* 左侧文档列表 */}
      <div className="w-full md:w-[240px] shrink-0 md:sticky md:top-24 md:self-start">
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] overflow-hidden">
          {usageDocs.map((doc) => (
            <button
              key={doc.slug}
              onClick={() => setSelectedSlug(doc.slug)}
              className={`w-full text-left px-4 py-3 text-[14px] font-medium transition-colors duration-150 relative ${
                selectedSlug === doc.slug
                  ? 'text-[#0071E3] bg-[#f5f5f7] dark:bg-[#2c2c2e]'
                  : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]'
              }`}
            >
              {selectedSlug === doc.slug && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#0071E3] rounded-r-full" />
              )}
              {doc.title}
            </button>
          ))}
          {usageDocs.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-[13px] text-[#86868b] dark:text-[#6e6e73]">暂无使用指南</p>
            </div>
          )}
        </div>
      </div>

      {/* 右侧文档内容 */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-6 md:max-h-[calc(100vh-100px)] md:overflow-y-auto scrollbar-hide">
          {selectedDoc ? (
            selectedDoc.body ? (
              <selectedDoc.body components={getMDXComponents()} />
            ) : typeof selectedDoc.content === 'string' ? (
              <SimpleMarkdown content={selectedDoc.content} />
            ) : (
              selectedDoc.content
            )
          ) : (
            <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">暂无使用指南</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== 主组件 ===================== */

type ActiveTab = 'files' | 'guide';

export function ResourceBrowser({ data, guideContent }: { data: ResourceData; guideContent?: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ActiveTab>('files');
  const [view, setView] = useState<ViewState>({ type: 'root' });

  // 响应 Next.js 客户端导航的 URL 参数变化
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    setActiveTab(tabParam === 'guide' ? 'guide' : 'files');
  }, [searchParams]);

  // 首次挂载时从 URL 同步状态（避免 SSR/客户端 hydration 不一致）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'guide') setActiveTab('guide');
    setView(parseQuery(window.location.search, data.directories));
  }, [data.directories]);

  // 监听 popstate（前进/后退按钮）
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      setActiveTab(tabParam === 'guide' ? 'guide' : 'files');
      setView(parseQuery(window.location.search, data.directories));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [data.directories]);

  // 状态变化时更新 query string（合并 view 和 tab 参数）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const viewUrl = viewStateToQuery(view, data.directories);
    const urlObj = new URL(viewUrl, window.location.origin);
    if (activeTab === 'guide') {
      urlObj.searchParams.set('tab', 'guide');
    } else {
      urlObj.searchParams.set('tab', 'files');
    }
    const newUrl = urlObj.pathname + urlObj.search;
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }
  }, [view, activeTab, data.directories]);

  const handleNavigate = (next: ViewState) => {
    setView(next);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentDir =
    view.type !== 'root' ? getDirectoryByPath(data.directories, view.path) : null;

  const currentFile =
    view.type === 'file' && currentDir
      ? currentDir.files[view.fileIndex]
      : null;



  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'files', label: '文件浏览', icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'guide', label: '使用指南', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#f5f5f7] dark:bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">

        {/* ===== 头部区域 ===== */}
        <div className="mb-5">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-white">
                资源库
              </h1>
              <p className="mt-1 text-[15px] text-[#86868b] dark:text-[#a1a1a6]">
                精选的配置模板与安全工具脚本
              </p>
            </div>
            <div className="text-[12px] text-[#86868b] dark:text-[#6e6e73]">
              最近更新: {data.lastUpdated}
            </div>
          </div>
        </div>

        {/* ===== Tab 栏 ===== */}
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1 bg-white dark:bg-[#1c1c1e] rounded-xl p-1 border border-[#d2d2d7] dark:border-[#3a3a3c]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#0071E3] text-white shadow-sm'
                    : 'text-[#86868b] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Tab 内容 ===== */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'files' ? (
            <div
              key="files-tab"
            >
              {/* 面包屑导航（始终显示，根目录时 $HOME 不可点击） */}
              <div className="mb-4">
                <Breadcrumb
                  view={view}
                  directories={data.directories}
                  onNavigate={handleNavigate}
                />
              </div>

              {/* 只有内容区域做动画 */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={viewKey(view)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: appleEase }}
                >
                  {data.directories.length > 0 || data.readme ? (
                    <>
                      {view.type === 'root' && (
                        <RootView data={data} onNavigate={handleNavigate} />
                      )}
                      {view.type === 'directory' && currentDir && (
                        <DirectoryView
                          dir={currentDir}
                          path={view.path}
                          onNavigate={handleNavigate}
                        />
                      )}
                      {view.type === 'file' && currentFile && (
                        <FileView file={currentFile} />
                      )}
                    </>
                  ) : (
                    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-[#d2d2d7] dark:border-[#3a3a3c] px-6 py-20 text-center">
                      <p className="text-[14px] text-[#86868b] dark:text-[#6e6e73]">暂无资源文件</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              key="guide-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: appleEase }}
            >
              {guideContent ?? <UsageGuideView usageDocs={data.usageDocs} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
