import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkSteps } from 'fumadocs-core/mdx-plugins/remark-steps';

// 扩展博客文章的 schema
const blogPageSchema = pageSchema.extend({
  id: z.string(),
  author: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
});

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
const docsPageSchema = pageSchema.extend({
  lastModified: z.date().optional(),
});

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: blogPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const team = defineDocs({
  dir: 'content/team',
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const usage = defineDocs({
  dir: 'content/usage',
  docs: {
    schema: pageSchema.extend({
      order: z.number().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkSteps],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
