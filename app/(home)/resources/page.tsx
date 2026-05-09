import { readdirSync, readFileSync, statSync } from 'fs';
import { join, parse } from 'path';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import {
  ResourceBrowser,
  type ResourceData,
} from '@/components/resource-browser';

export const metadata: Metadata = {
  title: '资源库',
  description: 'DevSecOps 实践中的配置模板与工具脚本。',
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function scanResources(): ResourceData {
  const resourcesPath = join(process.cwd(), 'public', 'resources');
  let rootReadme = '';
  const directories: ResourceData['directories'] = [];

  try {
    // 读取根目录 README
    try {
      rootReadme = readFileSync(join(resourcesPath, 'README.md'), 'utf-8');
    } catch {
      // 根 README 不存在
    }

    const entries = readdirSync(resourcesPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const dirPath = join(resourcesPath, entry.name);
      const files = readdirSync(dirPath, { withFileTypes: true });

      let readme = '';
      const resourceFiles: ResourceData['directories'][number]['files'] = [];

      for (const file of files) {
        if (!file.isFile()) continue;

        const filePath = join(dirPath, file.name);

        if (file.name.toLowerCase() === 'readme.md') {
          readme = readFileSync(filePath, 'utf-8');
          continue;
        }

        const stats = statSync(filePath);
        const content = readFileSync(filePath, 'utf-8');
        const parsed = parse(file.name);

        resourceFiles.push({
          name: parsed.name,
          fullName: file.name,
          size: formatSize(stats.size),
          rawSize: stats.size,
          content,
        });
      }

      if (resourceFiles.length > 0 || readme) {
        directories.push({
          name: entry.name,
          readme,
          files: resourceFiles,
        });
      }
    }
  } catch {
    // 目录不存在时返回空
  }

  return {
    readme: rootReadme,
    directories,
  };
}

export default function ResourcesPage() {
  const data = scanResources();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-black">
      <main className="flex-1">
        <ResourceBrowser data={data} />
      </main>
      <Footer />
    </div>
  );
}
