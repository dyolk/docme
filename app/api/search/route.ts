import { createSearchAPI } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { buildSearchIndexes } from '@/lib/search-index';

export const revalidate = false;

export const { staticGET: GET } = createSearchAPI('advanced', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indexes: buildSearchIndexes as any,
  components: {
    tokenizer: createTokenizer(),
  },
});
