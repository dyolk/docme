import { source } from '@/lib/source';
import { blogSource } from '@/lib/blog-source';
import { readdirSync, readFileSync } from 'fs';
import { join, parse } from 'path';

interface StructuredData {
  headings: { id: string; content: string }[];
  contents: { heading: string | undefined; content: string }[];
}

interface SearchIndexEntry {
  id: string;
  title: string;
  description?: string;
  url: string;
  tag?: string;
  structuredData: StructuredData;
  breadcrumbs?: string[];
}

/**
 * Get structured data from a fumadocs page
 */
async function getStructuredData(page: any): Promise<StructuredData | undefined> {
  if ('structuredData' in page.data) {
    return typeof page.data.structuredData === 'function'
      ? await page.data.structuredData()
      : page.data.structuredData;
  }
  if ('load' in page.data && typeof page.data.load === 'function') {
    return (await page.data.load()).structuredData;
  }
  return undefined;
}

/**
 * Strip YAML frontmatter from MDX content
 */
function stripFrontmatter(content: string): string {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  return match ? match[2] : content;
}

/**
 * Parse MDX content into structured data for search indexing
 */
function parseMdxContent(content: string): StructuredData {
  const headings: { id: string; content: string }[] = [];
  const contents: { heading: string | undefined; content: string }[] = [];

  const lines = content.split('\n');
  let currentHeading: string | undefined;
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      // Save previous content block
      if (currentContent.length > 0) {
        const text = currentContent.join('\n').trim();
        if (text) {
          contents.push({ heading: currentHeading, content: text });
        }
        currentContent = [];
      }
      const headingText = headingMatch[2].trim();
      const headingId = headingText
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id: headingId, content: headingText });
      currentHeading = headingText;
    } else {
      currentContent.push(line);
    }
  }

  // Save last content block
  if (currentContent.length > 0) {
    const text = currentContent.join('\n').trim();
    if (text) {
      contents.push({ heading: currentHeading, content: text });
    }
  }

  return { headings, contents };
}

/**
 * Deduplicate structured data to prevent duplicate search results.
 * Removes duplicate headings (by id+content) and contents (by heading+content).
 */
function deduplicateStructuredData(data: StructuredData): StructuredData {
  const seenHeadings = new Set<string>();
  const seenContents = new Set<string>();

  return {
    headings: data.headings.filter((h) => {
      const key = `${h.id}::${h.content}`;
      if (seenHeadings.has(key)) return false;
      seenHeadings.add(key);
      return true;
    }),
    contents: data.contents.filter((c) => {
      const key = `${c.heading ?? ''}::${c.content}`;
      if (seenContents.has(key)) return false;
      seenContents.add(key);
      return true;
    }),
  };
}

/**
 * Build search indexes for docs pages
 */
async function buildDocsIndexes(): Promise<SearchIndexEntry[]> {
  const indexes: SearchIndexEntry[] = [];
  for (const page of source.getPages()) {
    let structuredData = await getStructuredData(page);
    if (!structuredData) continue;
    structuredData = deduplicateStructuredData(structuredData);
    indexes.push({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData,
      tag: '文档',
    });
  }
  return indexes;
}

/**
 * Build search indexes for blog pages
 */
async function buildBlogIndexes(): Promise<SearchIndexEntry[]> {
  const indexes: SearchIndexEntry[] = [];
  for (const page of blogSource.getPages()) {
    let structuredData = await getStructuredData(page);
    if (!structuredData) continue;
    structuredData = deduplicateStructuredData(structuredData);
    indexes.push({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData,
      tag: '博客',
    });
  }
  return indexes;
}

/**
 * Build search indexes for release tracking content
 */
function buildReleaseIndexes(): SearchIndexEntry[] {
  const indexes: SearchIndexEntry[] = [];
  const releasesPath = join(process.cwd(), 'content', 'releases');

  try {
    const entries = readdirSync(releasesPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const projectPath = join(releasesPath, entry.name);
      const projectName = entry.name;

      // Read project meta.json for title and description
      let projectTitle = projectName;
      let projectDescription = '';
      try {
        const metaContent = readFileSync(join(projectPath, 'meta.json'), 'utf-8');
        const meta = JSON.parse(metaContent);
        projectTitle = meta.title || projectName;
        projectDescription = meta.description || '';
      } catch {
        // meta.json not found, use defaults
      }

      // Index project index.mdx (overview page)
      const indexFile = join(projectPath, 'index.mdx');
      try {
        const content = readFileSync(indexFile, 'utf-8');
        const body = stripFrontmatter(content);
        const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);

        indexes.push({
          id: `/releases?project=${projectName}`,
          title: titleMatch?.[1] ?? projectTitle,
          description: projectDescription,
          url: `/releases?project=${projectName}`,
          structuredData: parseMdxContent(body),
          tag: '版本追踪',
          breadcrumbs: [projectTitle],
        });
      } catch {
        // index.mdx not found
      }

      // Index version-specific MDX files
      const versionsPath = join(projectPath, 'versions');
      try {
        const versionFiles = readdirSync(versionsPath, { withFileTypes: true });
        for (const file of versionFiles) {
          if (!file.isFile() || !file.name.endsWith('.mdx')) continue;

          const filePath = join(versionsPath, file.name);
          const content = readFileSync(filePath, 'utf-8');
          const body = stripFrontmatter(content);
          const versionSlug = parse(file.name).name;

          const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
          const descMatch = content.match(/^description:\s*["']?(.+?)["']?\s*$/m);

          indexes.push({
            id: `/releases?project=${projectName}&doc=${versionSlug}`,
            title: titleMatch?.[1] ?? `${projectTitle} ${versionSlug}`,
            description: descMatch?.[1] ?? `${projectTitle} 版本更新内容`,
            url: `/releases?project=${projectName}&doc=${versionSlug}`,
            structuredData: parseMdxContent(body),
            tag: '版本追踪',
            breadcrumbs: [projectTitle, titleMatch?.[1] ?? versionSlug],
          });
        }
      } catch {
        // versions/ directory not found
      }
    }
  } catch {
    // releases directory not found
  }

  return indexes;
}

/**
 * Build search indexes for resources (useful websites + usage docs)
 */
function buildResourceIndexes(): SearchIndexEntry[] {
  const indexes: SearchIndexEntry[] = [];

  // Index useful websites from JSON
  try {
    const websitesPath = join(process.cwd(), 'content', 'useful-websites.json');
    const websitesContent = readFileSync(websitesPath, 'utf-8');
    const websites = JSON.parse(websitesContent);

    for (const website of websites) {
      indexes.push({
        id: `/resources#website-${encodeURIComponent(website.name)}`,
        title: website.name,
        description: website.description,
        url: '/resources',
        structuredData: {
          headings: [],
          contents: [{ heading: undefined, content: `${website.name}: ${website.description}` }],
        },
        tag: '资源库',
      });
    }
  } catch {
    // useful-websites.json not found
  }

  // Index usage docs from content/usage/
  try {
    const usagePath = join(process.cwd(), 'content', 'usage');
    const entries = readdirSync(usagePath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;

      const filePath = join(usagePath, entry.name);
      const content = readFileSync(filePath, 'utf-8');
      const body = stripFrontmatter(content);
      const slug = parse(entry.name).name;

      const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);

      indexes.push({
        id: `/resources#usage-${slug}`,
        title: titleMatch?.[1] ?? slug,
        url: '/resources',
        structuredData: parseMdxContent(body),
        tag: '资源库',
      });
    }
  } catch {
    // usage directory not found
  }

  return indexes;
}

/**
 * Build all search indexes from all sources
 */
export async function buildSearchIndexes(): Promise<SearchIndexEntry[]> {
  const [docsIndexes, blogIndexes] = await Promise.all([
    buildDocsIndexes(),
    buildBlogIndexes(),
  ]);

  return [
    ...docsIndexes,
    ...blogIndexes,
    ...buildReleaseIndexes(),
    ...buildResourceIndexes(),
  ];
}
