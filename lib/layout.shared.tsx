import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      {
        text: '文档',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: '博客',
        url: '/blog',
        active: 'nested-url',
      },
      {
        text: '资源',
        url: '/resources',
        active: 'nested-url',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

/** 仅用于 docs 子路由的 layout 选项（无导航链接） */
export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
