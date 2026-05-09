'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  Terminal,
} from 'lucide-react';

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

const appleEaseOut = [0.25, 0.1, 0.25, 1] as const;

/* ===================== README 简单渲染器 ===================== */

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

    // 标题
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1
          key={key++}
          className="text-xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-2"
        >
          {trimmed.replace(/^#\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h1>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-lg font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-2 mt-4"
        >
          {trimmed.replace(/^##\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="text-base font-semibold text-[#1d1d1f] dark:text-white tracking-tight mb-1 mt-3"
        >
          {trimmed.replace(/^###\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </h3>
      );
      continue;
    }

    // 列表项
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li
          key={key++}
          className="ml-4 list-disc marker:text-[#0071E3] text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed"
        >
          {renderInline(trimmed.replace(/^[-*]\s*/, ''))}
        </li>
      );
      continue;
    }

    // 普通段落
    elements.push(
      <p
        key={key++}
        className="text-[15px] text-[#424245] dark:text-[#a1a1a6] leading-relaxed"
      >
        {renderInline(trimmed)}
      </p>
    );
  }

  return <div>{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // 简单处理 **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[#1d1d1f] dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/* ===================== 目录树组件 ===================== */

function DirectoryTree({
  data,
  selectedFile,
  onSelectFile,
  onSelectDir,
  activeDirForReadme,
}: {
  data: ResourceData;
  selectedFile: { dirIndex: number; fileIndex: number } | null;
  onSelectFile: (dirIndex: number, fileIndex: number) => void;
  onSelectDir: (dirIndex: number) => void;
  activeDirForReadme: number | null;
}) {
  const [expanded, setExpanded] = useState<Set<number>>(() => {
    const init = new Set<number>();
    data.directories.forEach((_, i) => init.add(i));
    return init;
  });

  const toggleDir = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-1">
      {data.directories.map((dir, dirIndex) => {
        const isExpanded = expanded.has(dirIndex);
        const isDirActive = activeDirForReadme === dirIndex;

        return (
          <div key={dir.name}>
            {/* 目录行 */}
            <button
              onClick={() => {
                toggleDir(dirIndex);
                onSelectDir(dirIndex);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors duration-200 ${
                isDirActive
                  ? 'bg-[#0071E3]/10 dark:bg-[#0071E3]/20'
                  : 'hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]'
              }`}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: appleEaseOut }}
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#86868b] dark:text-[#6e6e73] shrink-0" />
              </motion.div>
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-[#0071E3] shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-[#86868b] dark:text-[#6e6e73] shrink-0" />
              )}
              <span
                className={`text-sm font-medium truncate ${
                  isDirActive
                    ? 'text-[#0071E3]'
                    : 'text-[#1d1d1f] dark:text-[#f5f5f7]'
                }`}
              >
                {dir.name}/
              </span>
            </button>

            {/* 文件列表 */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: appleEaseOut }}
                  className="overflow-hidden"
                >
                  <div className="pl-5 space-y-0.5 mt-0.5">
                    {dir.files.map((file, fileIndex) => {
                      const isSelected =
                        selectedFile?.dirIndex === dirIndex &&
                        selectedFile?.fileIndex === fileIndex;

                      return (
                        <button
                          key={file.fullName}
                          onClick={() => onSelectFile(dirIndex, fileIndex)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors duration-200 ${
                            isSelected
                              ? 'bg-[#0071E3]/10 dark:bg-[#0071E3]/20'
                              : 'hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e]'
                          }`}
                        >
                          <FileText
                            className={`w-3.5 h-3.5 shrink-0 ml-5 ${
                              isSelected
                                ? 'text-[#0071E3]'
                                : 'text-[#86868b] dark:text-[#6e6e73]'
                            }`}
                          />
                          <span
                            className={`text-sm truncate ${
                              isSelected
                                ? 'text-[#0071E3] font-medium'
                                : 'text-[#424245] dark:text-[#a1a1a6]'
                            }`}
                          >
                            {file.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== 主组件 ===================== */

export function ResourceBrowser({ data }: { data: ResourceData }) {
  const [selectedFile, setSelectedFile] = useState<{
    dirIndex: number;
    fileIndex: number;
  } | null>(null);
  const [activeDirIndex, setActiveDirIndex] = useState<number | null>(null);

  const previewFile = useMemo(() => {
    if (!selectedFile) return null;
    const dir = data.directories[selectedFile.dirIndex];
    if (!dir) return null;
    return dir.files[selectedFile.fileIndex] ?? null;
  }, [selectedFile, data.directories]);

  const activeReadme = useMemo(() => {
    if (activeDirIndex !== null) {
      const dir = data.directories[activeDirIndex];
      if (dir?.readme) return dir.readme;
    }
    return data.readme;
  }, [activeDirIndex, data]);

  const activeDirName = useMemo(() => {
    if (activeDirIndex !== null) {
      return data.directories[activeDirIndex]?.name ?? null;
    }
    return null;
  }, [activeDirIndex, data.directories]);

  const handleSelectDir = (dirIndex: number) => {
    setActiveDirIndex(dirIndex);
  };

  const handleSelectFile = (dirIndex: number, fileIndex: number) => {
    setSelectedFile({ dirIndex, fileIndex });
    setActiveDirIndex(dirIndex);
  };

  return (
    <div className="bg-[#f5f5f7] dark:bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ===== 页面标题 + 根描述 ===== */}
        <div className="mb-8">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-white">
            资源库
          </h1>
          {data.readme && (
            <div className="mt-3 max-w-[640px]">
              <SimpleMarkdown content={data.readme} />
            </div>
          )}
        </div>

        {/* ===== 主内容区域 ===== */}
        {data.directories.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ----- 左侧目录树 ----- */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 px-3">
                  <Terminal className="w-4 h-4 text-[#86868b] dark:text-[#6e6e73]" />
                  <span className="text-xs font-medium text-[#86868b] dark:text-[#6e6e73] uppercase tracking-wider">
                    文件目录
                  </span>
                </div>
                <DirectoryTree
                  data={data}
                  selectedFile={selectedFile}
                  onSelectFile={handleSelectFile}
                  onSelectDir={handleSelectDir}
                  activeDirForReadme={activeDirIndex}
                />
              </div>
            </div>

            {/* ----- 右侧内容区 ----- */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {/* 预览卡片 */}
              <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-6 shadow-sm">
                {previewFile ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e5e5e5] dark:border-[#2c2c2e]">
                      <FileText className="w-4 h-4 text-[#0071E3]" />
                      <span className="text-sm font-mono text-[#1d1d1f] dark:text-white">
                        {previewFile.fullName}
                      </span>
                      <span className="text-xs text-[#86868b] dark:text-[#6e6e73] ml-auto">
                        {previewFile.size}
                      </span>
                    </div>
                    <div className="bg-[#f5f5f7] dark:bg-[#161617] rounded-xl p-4 overflow-auto max-h-[500px]">
                      <pre className="font-mono text-sm text-[#1d1d1f] dark:text-[#f5f5f7] whitespace-pre-wrap break-all leading-relaxed">
                        {previewFile.content}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] dark:bg-[#161617] flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-[#86868b] dark:text-[#6e6e73]" />
                    </div>
                    <p className="text-[15px] text-[#86868b] dark:text-[#6e6e73]">
                      点击左侧文件查看内容预览
                    </p>
                  </div>
                )}
              </div>

              {/* 底部 README 卡片 */}
              <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e5e5e5] dark:border-[#2c2c2e]">
                  <FileText className="w-4 h-4 text-[#0071E3]" />
                  <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
                    {activeDirName ? `${activeDirName}/README.md` : 'README.md'}
                  </span>
                </div>
                {activeReadme ? (
                  <SimpleMarkdown content={activeReadme} />
                ) : (
                  <p className="text-[15px] text-[#86868b] dark:text-[#6e6e73]">
                    暂无描述信息
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#6e6e73] dark:text-[#a1a1a6] text-lg">
              暂无资源文件
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
