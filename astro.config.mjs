// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shashintha.dev',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  // One small page: inline its CSS so the first paint needs no extra request.
  build: { inlineStylesheets: 'always' },
});
