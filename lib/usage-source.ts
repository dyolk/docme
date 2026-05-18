import { usage } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const usageSource = loader({
  baseUrl: '/resources',
  source: usage.toFumadocsSource(),
});
