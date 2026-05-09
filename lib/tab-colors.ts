import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(process.cwd(), 'content', 'docs');

/**
 * 扫描 content/docs 下的所有子目录，读取 meta.json 中的 color 字段
 * 返回 { 目录名: color值 } 的映射对象
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
            colors[entry.name] = meta.color;
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
