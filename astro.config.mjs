// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			// 已移除自定义 sidebar；可选：若想强制整个根目录自动生成，取消下行注释：
			// sidebar: [{ label: '全部文档', autogenerate: { directory: '.' } }],
		}),
	],
});
