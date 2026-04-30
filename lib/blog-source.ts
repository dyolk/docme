import { blog } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { slugsFromData, slugsPlugin } from 'fumadocs-core/source/plugins/slugs';

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
  plugins: [slugsPlugin(slugsFromData('id'))],
});
