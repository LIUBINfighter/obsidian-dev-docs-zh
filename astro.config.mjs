import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import path from 'node:path';
import ensureSidebar from './src/remark/ensureSidebar.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [
  starlight({
  title: 'Obsidian 开发文档',
  description: 'Obsidian 插件和主题开发中文文档',
  // 单语言站点：移除 locales 与 defaultLocale，避免生成 zh-cn 语言路由
  // 使用默认 favicon 处理，后续可放入 public 目录
  favicon: '/favicon.svg',
  head: [
    {
      tag: 'script',
      attrs: { 'data-theme-control': 'init', type: 'module' },
      content: `
        // Avoid FOUC: set dark theme by default, allow user override via localStorage
        try {
          const pref = localStorage.getItem('theme');
          const dark = pref ? pref === 'dark' : (window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (dark) document.documentElement.dataset.theme = 'dark';
          else document.documentElement.dataset.theme = 'light';
        } catch (e) { document.documentElement.dataset.theme = 'dark'; }
      `
    }
  ],
  // 如果某些文档缺少 frontmatter.sidebar，remark 插件会补一个空对象，避免访问 undefined.hidden 报错
  sidebar: [
        {
          label: '开始使用',
          items: [
            { label: '首页', link: '/' },
            { label: '关于', link: '/about' },
          ]
        },
        {
          label: '官方文档',
          collapsed: false,
          items: [
            { label: '开发者政策', link: '/zh/official/developer-policies' },
            {
              label: '插件开发',
              collapsed: true,
              autogenerate: { directory: 'zh/official/plugins' },
            },
            {
              label: '主题开发', 
              collapsed: true,
              autogenerate: { directory: 'zh/official/themes' },
            },
            {
              label: 'API 参考',
              collapsed: true,
              autogenerate: { directory: 'zh/official/reference' },
            }
          ]
        },
        {
          label: '类型定义',
          collapsed: true,
          items: [
            { label: '开始使用', link: '/zh/typings/getting-started' },
            { label: '使用指南', link: '/zh/typings/usage' },
            { label: '代码调试', link: '/zh/typings/code-debugging' },
            {
              label: 'TypeScript API',
              collapsed: true,
              autogenerate: { directory: 'zh/typings/typescript-api' },
            }
          ]
        }
      ],
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: 'https://github.com/LIUBINfighter/obsidian-dev-docs-zh'
        }
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      components: {
        // 可以自定义组件
      }
    }),
    tailwind({
      // 禁用默认的 base styles
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [ensureSidebar]
  },
  vite: {
    resolve: {
      alias: {
        '/images': path.resolve('./src/content/docs/public/images')
      }
    }
  }
});
