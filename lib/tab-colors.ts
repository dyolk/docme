import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(process.cwd(), 'content', 'docs');

/**
 * 扫描 content/docs 下的所有子目录，读取 meta.json 中的 color 字段
 * 返回 { slug: color值 } 的映射对象，包含目录名和目录下每个 page 的 slug
 */
export function getSectionColors(): Record<string, string> {
  const colors: Record<string, string> = {};

  try {
    const entries = readdirSync(DOCS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const metaPath = join(DOCS_DIR, entry.name, 'meta.json');
          const meta = JSON.parse(readFileSync(metaPath, 'utf-8'));
          if (meta.color) {
            // 为目录名本身存储颜色
            colors[entry.name] = meta.color;
            // 为目录下的每个 page slug 也存储颜色
            if (Array.isArray(meta.pages)) {
              for (const page of meta.pages) {
                // page 可能是 "index"、"test" 或嵌套路径 "guide/install"
                // 只取第一级 slug 作为键
                const slug = page.split('/')[0];
                colors[slug] = meta.color;
              }
            }
          }
        } catch {
          // 忽略读取失败的目录
        }
      }
    }
  } catch {
    // 忽略读取失败的根目录
  }

  return colors;
}
