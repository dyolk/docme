import { readFileSync } from 'fs';
import { join } from 'path';

export const appName = 'DocME';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'dyolk',
  repo: 'docme',
  branch: 'main',
};

/** 格式化博客日期时间 */
export function formatBlogDate(dateString: string | undefined): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
}

/** 计算文章阅读时间（分钟） */
export function calculateReadingTime(filePath: string): number {
  try {
    const content = readFileSync(filePath, 'utf-8');
    // 移除 frontmatter
    const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    // 统计中文字符
    const chineseChars = (body.match(/[\u4e00-\u9fa5]/g) || []).length;
    // 统计英文单词
    const englishWords = (body.match(/[a-zA-Z]+/g) || []).length;
    // 中文约 400 字/分钟，英文约 200 词/分钟
    const minutes = chineseChars / 400 + englishWords / 200;
    return Math.max(1, Math.ceil(minutes));
  } catch {
    return 2;
  }
}
