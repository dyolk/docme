import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, formatBlogDate, gitConfig } from './shared';
import { BookOpen, Compass, FileSearch, Newspaper, Package } from 'lucide-react';

/** 从 content/blog/ 目录动态生成最新博客菜单项 */
function getBlogMenuItems(): { text: string; url: string; description: string; icon?: React.ReactNode }[] {
  const blogPath = join(process.cwd(), 'content', 'blog');
  const items: { text: string; url: string; description: string; date: string }[] = [];

  try {
    const files = readdirSync(blogPath).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = join(blogPath, file);
      const content = readFileSync(filePath, 'utf-8');

      // 解析 frontmatter（支持 \n 和 \r\n 换行）
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) continue;

      const fm = fmMatch[1];
      const titleMatch = fm.match(/^title:\s*['"']?(.*?)['"']?\s*$/m);
      const dateMatch = fm.match(/^date:\s*['"']?(.*?)['"']?\s*$/m);
      const idMatch = fm.match(/^id:\s*['"']?(.*?)['"']?\s*$/m);

      const title = titleMatch?.[1]?.trim() || file.replace('.mdx', '');
      const date = dateMatch?.[1]?.trim() || '';
      // slug 来自 frontmatter 的 id 字段，与 blog-source.ts 的 slugsPlugin 一致
      const slug = idMatch?.[1]?.trim() || file.replace('.mdx', '');

      if (!date) continue; // 无日期的文章跳过

      items.push({
        text: title,
        url: `/blog/${slug}`,
        description: formatBlogDate(date),
        date,
      });
    }
  } catch {
    // blog 目录不存在则返回空
  }

  // 按日期降序排列（日期字符串 YYYY-MM-DD 可直接比较）
  items.sort((a, b) => {
    const cmp = b.date.localeCompare(a.date);
    if (cmp !== 0) return cmp;
    return a.text.localeCompare(b.text);
  });

  // 取最新 3 篇 + 末尾 "全部文章" 链接
  const latest = items.slice(0, 3).map(({ text, url, description }) => ({ text, url, description, icon: <BookOpen className="size-4" /> }));
  latest.push({ text: '全部文章', url: '/blog', description: '查看所有博客文章', icon: <Newspaper className="size-4" /> });

  return latest;
}

/** 从 content/releases/ 目录动态生成版本追踪菜单项 */
function getReleaseMenuItems(): { text: string; url: string; description: string; icon?: React.ReactNode }[] {
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
  return items.map(({ text, url, description }) => ({ text, url, description, icon: <Package className="size-4" /> }));
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      {
        type: 'menu',
        text: '文档',
        url: '/docs',
        on: 'nav',
        items: [
          { text: '快速开始', url: '/docs', description: '入门指南与基础概念', icon: <Compass className="size-4" /> },
        ],
      },
      {
        type: 'main',
        text: '文档',
        url: '/docs',
        on: 'menu',
        description: '快速开始',
      },
      {
        type: 'menu',
        text: '博客',
        url: '/blog',
        on: 'nav',
        items: getBlogMenuItems(),
      },
      {
        type: 'main',
        text: '博客',
        url: '/blog',
        on: 'menu',
        description: '查看所有文章',
      },
      {
        type: 'menu',
        text: '资源',
        url: '/resources',
        on: 'nav',
        items: [
          { text: '文件浏览', url: '/resources?tab=files', description: '运维脚本与配置文件', icon: <FileSearch className="size-4" /> },
          { text: '使用指南', url: '/resources?tab=guide', description: '快速入门与使用说明', icon: <BookOpen className="size-4" /> }
        ],
      },
      {
        type: 'main',
        text: '资源',
        url: '/resources',
        on: 'menu',
        description: '文件浏览与使用指南',
      },
      {
        type: 'menu',
        text: '版本追踪',
        url: '/releases',
        on: 'nav',
        items: getReleaseMenuItems(),
      },
      {
        type: 'main',
        text: '版本追踪',
        url: '/releases',
        on: 'menu',
        description: '版本更新记录',
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
