'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

const zhTranslations = {
  search: '搜索',
  searchNoResult: '未找到结果',
  toc: '本页目录',
  tocNoHeadings: '无标题',
  lastUpdate: '最后更新于',
  chooseLanguage: '选择语言',
  nextPage: '下一页',
  previousPage: '上一页',
  chooseTheme: '主题',
  editOnGithub: '在 GitHub 上编辑',
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      i18n={{
        translations: zhTranslations,
      }}
    >
      {children}
    </RootProvider>
  );
}
