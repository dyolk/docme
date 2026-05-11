import { readdirSync, readFileSync } from 'fs';
import { join, parse } from 'path';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import {
  ReleasesBrowser,
  type ReleasesData,
  type ReleaseProject,
  type ReleaseDoc,
} from '@/components/releases-browser';

export const metadata: Metadata = {
  title: '版本追踪',
  description: '追踪开源项目的重大版本更新与兼容性变更。',
};

async function fetchLatestVersion(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.tag_name || null;
  } catch {
    return null;
  }
}

async function scanReleases(): Promise<ReleasesData> {
  const releasesPath = join(process.cwd(), 'content', 'releases');
  const projects: ReleaseProject[] = [];

  try {
    const entries = readdirSync(releasesPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const projectPath = join(releasesPath, entry.name);

      // 读取 meta.json
      let meta = { title: entry.name, icon: 'FileText', description: '', order: 999, logo: '', logoWhite: '', color: '', repo: '', latestVersion: '', trackedVersions: [] as string[] };
      try {
        const metaContent = readFileSync(join(projectPath, 'meta.json'), 'utf-8');
        meta = { ...meta, ...JSON.parse(metaContent) };
      } catch {
        // meta.json 不存在则使用默认值
      }

      // 扫描 MDX 文件（顶层 + versions/ 子目录）
      const docs: ReleaseDoc[] = [];
      const files = readdirSync(projectPath, { withFileTypes: true });

      // 扫描顶层 MDX
      for (const file of files) {
        if (!file.isFile() || !file.name.endsWith('.mdx')) continue;

        const filePath = join(projectPath, file.name);
        const content = readFileSync(filePath, 'utf-8');
        const slug = parse(file.name).name;

        // 解析 frontmatter（简单正则）
        const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
        const frontmatter = fmMatch?.[1] ?? '';
        const body = fmMatch?.[2] ?? content;

        const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        const orderMatch = frontmatter.match(/^order:\s*(\d+)\s*$/m);
        const dateMatch = frontmatter.match(/^date:\s*["']?(.+?)["']?\s*$/m);

        docs.push({
          slug,
          title: titleMatch?.[1] ?? slug,
          order: parseInt(orderMatch?.[1] ?? '999', 10),
          date: dateMatch?.[1],
          content: body.trim(),
        });
      }

      // 扫描 versions/ 子目录
      const versionsPath = join(projectPath, 'versions');
      try {
        const versionFiles = readdirSync(versionsPath, { withFileTypes: true });
        for (const file of versionFiles) {
          if (!file.isFile() || !file.name.endsWith('.mdx')) continue;

          const filePath = join(versionsPath, file.name);
          const content = readFileSync(filePath, 'utf-8');
          const slug = parse(file.name).name;

          const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
          const frontmatter = fmMatch?.[1] ?? '';
          const body = fmMatch?.[2] ?? content;

          const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
          const orderMatch = frontmatter.match(/^order:\s*(\d+)\s*$/m);
          const dateMatch = frontmatter.match(/^date:\s*["']?(.+?)["']?\s*$/m);

          docs.push({
            slug,
            title: titleMatch?.[1] ?? slug,
            order: parseInt(orderMatch?.[1] ?? '999', 10),
            date: dateMatch?.[1],
            content: body.trim(),
          });
        }
      } catch {
        // versions/ 目录不存在则跳过
      }

      docs.sort((a, b) => a.order - b.order);

      const project: ReleaseProject = {
        slug: entry.name,
        title: meta.title,
        icon: meta.icon,
        description: meta.description,
        order: meta.order,
        logo: meta.logo,
        logoWhite: meta.logoWhite,
        color: meta.color,
        latestVersion: meta.latestVersion,
        trackedVersions: meta.trackedVersions || [],
        docs,
      };

      // 如果有 repo，尝试从 GitHub API 获取最新版本
      if (meta.repo) {
        const apiVersion = await fetchLatestVersion(meta.repo);
        if (apiVersion) {
          project.latestVersion = apiVersion;
        }
      }

      projects.push(project);
    }
  } catch {
    // 目录不存在返回空
  }

  projects.sort((a, b) => a.order - b.order);
  return { projects };
}

export default async function ReleasesPage() {
  const data = await scanReleases();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-black">
      <main className="flex-1">
        <ReleasesBrowser data={data} />
      </main>
      <Footer />
    </div>
  );
}
