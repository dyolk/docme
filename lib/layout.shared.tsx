import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

/** 从 content/blog/ 目录动态生成最新博客菜单项 */
function getBlogMenuItems(): { text: string; url: string; description: string }[] {
  const blogPath = join(process.cwd(), 'content', 'blog');
  const items: { text: string; url: string; description: string; date: string }[] = [];

  try {
    const files = readdirSync(blogPath).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = join(blogPath, file);
      const content = readFileSync(filePath, 'utf-8');

      // 解析 frontmatter（--- 之间的内容）
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) continue;

      const fm = fmMatch[1];
      const titleMatch = fm.match(/^title:\s*['"]?(.*?)['"]?\s*$/m);
      const dateMatch = fm.match(/^date:\s*['"]?(.*?)['"]?\s*$/m);
      const idMatch = fm.match(/^id:\s*['"]?(.*?)['"]?\s*$/m);

      const title = titleMatch?.[1]?.trim() || file.replace('.mdx', '');
      const date = dateMatch?.[1]?.trim() || '';
      // slug 来自 frontmatter 的 id 字段，与 blog-source.ts 的 slugsPlugin 一致
      const slug = idMatch?.[1]?.trim() || file.replace('.mdx', '');

      if (!date) continue; // 无日期的文章跳过

      items.push({
        text: title,
        url: `/blog/${slug}`,
        description: date,
        date,
      });
    }
  } catch {
    // blog 目录不存在则返回空
  }

  // 按日期降序排列（日期字符串 YYYY-MM-DD 可直接比较）
  items.sort((a, b) => b.date.localeCompare(a.date));

  // 取最新 3 篇 + 末尾 "全部文章" 链接
  const latest = items.slice(0, 3).map(({ text, url, description }) => ({ text, url, description }));
  latest.push({ text: '全部文章', url: '/blog', description: '查看所有博客文章' });

  return latest;
}

/** 从 content/releases/ 目录动态生成版本追踪菜单项 */
function getReleaseMenuItems(): { text: string; url: string; description: string }[] {
  const releasesPath = join(process.cwd(), 'content', 'releases');
  const items: { text: string; url: string; description: string; order: number }[] = [];

  try {
    const entries = readdirSync(releasesPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const metaPath = join(releasesPath, entry.name, 'meta.json');
      let title = entry.name;
      let description = '';
      let order = 999;

      try {
        const meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
        title = meta.title ?? entry.name;
        description = meta.description ?? '';
        order = meta.order ?? 999;
      } catch {
        // meta.json 不存在则使用默认值
      }

      items.push({
        text: title,
        url: `/releases?project=${entry.name}`,
        description: description || `${title} 版本更新`,
        order,
      });
    }
  } catch {
    // releases 目录不存在则返回空
  }

  items.sort((a, b) => b.order - a.order);
  return items.map(({ text, url, description }) => ({ text, url, description }));
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      {
        type: 'menu',
        text: '文档',
        url: '/docs',
        items: [
          { text: '快速开始', url: '/docs', description: '入门指南与基础概念' },
        ],
      },
      {
        type: 'menu',
        text: '博客',
        url: '/blog',
        items: getBlogMenuItems(),
      },
      {
        type: 'menu',
        text: '资源',
        url: '/resources',
        items: [
          { text: '文件浏览', url: '/resources?tab=files', description: '运维脚本与配置文件' },
          { text: '使用指南', url: '/resources?tab=guide', description: '快速入门与使用说明' }
        ],
      },
      {
        type: 'menu',
        text: '版本追踪',
        url: '/releases',
        items: getReleaseMenuItems(),
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

/** docs 子路由的 layout 选项 */
export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
