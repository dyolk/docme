import { readdirSync, readFileSync, statSync } from 'fs';
import { join, parse } from 'path';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Footer } from '@/components/footer';
import {
  ResourceBrowser,
  type ResourceData,
  type ResourceDirectory,
} from '@/components/resource-browser';
import { UsageGuideClientView } from '@/components/usage-guide-client-view';
import { getMDXComponents } from '@/components/mdx';
import { usageSource } from '@/lib/usage-source';

export const metadata: Metadata = {
  title: '资源库',
  description: 'DevSecOps 实践中的配置模板与工具脚本。',
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function scanDirectory(dirPath: string, name: string): { dir: ResourceDirectory | null; mtime: number } {
  const entries = readdirSync(dirPath, { withFileTypes: true });

  let readme = '';
  let dirLatestMtime = 0;
  const resourceFiles: ResourceDirectory['files'] = [];
  const children: ResourceDirectory[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const entryPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const child = scanDirectory(entryPath, entry.name);
      if (child.dir) {
        children.push(child.dir);
        dirLatestMtime = Math.max(dirLatestMtime, child.mtime);
      }
      continue;
    }

    if (!entry.isFile()) continue;

    const stats = statSync(entryPath);
    dirLatestMtime = Math.max(dirLatestMtime, stats.mtimeMs);

    if (entry.name.toLowerCase() === 'readme.md') {
      readme = readFileSync(entryPath, 'utf-8');
      continue;
    }

    const content = readFileSync(entryPath, 'utf-8');
    const parsed = parse(entry.name);

    resourceFiles.push({
      name: parsed.name,
      fullName: entry.name,
      size: formatSize(stats.size),
      rawSize: stats.size,
      content,
      lastUpdated: formatDate(stats.mtimeMs),
    });
  }

  if (resourceFiles.length > 0 || readme || children.length > 0) {
    return {
      dir: {
        name,
        readme,
        files: resourceFiles.sort((a, b) => a.fullName.localeCompare(b.fullName)),
        lastUpdated: formatDate(dirLatestMtime),
        children: children.length > 0 ? children.sort((a, b) => a.name.localeCompare(b.name)) : undefined,
      },
      mtime: dirLatestMtime,
    };
  }

  return { dir: null, mtime: 0 };
}

function scanResources(): Omit<ResourceData, 'usageDocs'> {
  const resourcesPath = join(process.cwd(), 'public', 'resources');
  let rootReadme = '';
  const directories: ResourceData['directories'] = [];
  let latestMtime = 0;

  try {
    try {
      rootReadme = readFileSync(join(resourcesPath, 'README.md'), 'utf-8');
      const st = statSync(join(resourcesPath, 'README.md'));
      latestMtime = Math.max(latestMtime, st.mtimeMs);
    } catch {
      // 根 README 不存在
    }

    const entries = readdirSync(resourcesPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || !entry.isDirectory()) continue;

      const dirPath = join(resourcesPath, entry.name);
      const result = scanDirectory(dirPath, entry.name);

      if (result.dir) {
        directories.push(result.dir);
        latestMtime = Math.max(latestMtime, result.mtime);
      }
    }
  } catch {
    // 目录不存在时返回空
  }

  const lastUpdated = latestMtime
    ? new Date(latestMtime).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return {
    readme: rootReadme,
    directories: directories.sort((a, b) => a.name.localeCompare(b.name)),
    lastUpdated,
  };
}

export default async function ResourcesPage() {
  const resourceData = scanResources();

  // 使用 fumadocs 编译后的 usage docs
  const usagePages = usageSource.getPages().sort((a, b) => {
    const orderA = (a.data as { order?: number }).order ?? 999;
    const orderB = (b.data as { order?: number }).order ?? 999;
    return orderA - orderB;
  });

  const guideDocs = usagePages.map((page) => ({
    slug: page.path,
    title: page.data.title,
    content: <page.data.body components={getMDXComponents()} />,
    order: (page.data as { order?: number }).order ?? 999,
  }));

  // ResourceBrowser 内部 fallback 需要字符串类型的 usageDocs
  const data: ResourceData = {
    ...resourceData,
    usageDocs: [],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-black">
      <main className="flex-1">
        <Suspense>
          <ResourceBrowser data={data} guideContent={<UsageGuideClientView docs={guideDocs} />} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
