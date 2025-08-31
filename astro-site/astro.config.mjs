import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://liubinfighter.github.io',
  base: '/obsidian-dev-docs-zh',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [],
    drafts: true
  },
  build: {
    assets: 'assets'
  }
});