import { team } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const teamSource = loader({
  baseUrl: '/team',
  source: team.toFumadocsSource(),
});
