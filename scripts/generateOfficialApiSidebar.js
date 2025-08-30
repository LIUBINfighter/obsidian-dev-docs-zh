import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 生成官方API侧边栏配置
 * @param {string} dir - 目录路径
 * @returns {Array} 侧边栏配置数组
 */
function generateSidebar(dir) {
  const files = fs.readdirSync(dir);
  const sidebar = {};

  files.forEach((file) => {
    // 只处理以 'obsidian.' 开头的文件，并排除 'obsidian-typings.'
    if (file.startsWith('obsidian.') && !file.startsWith('obsidian-typings.')) {
      const parts = file.replace('.md', '').split('.');
      const mainKey = parts[1]; // e.g., 'app' from 'obsidian.app.md'

      if (!mainKey) {
        return;
      }

      const subKey = parts.length > 2 ? parts.slice(2).join('.') : mainKey;

      if (!sidebar[mainKey]) {
        sidebar[mainKey] = {
          text: mainKey.charAt(0).toUpperCase() + mainKey.slice(1),
          collapsible: true,
          collapsed: true,
          items: [],
        };
      }
      sidebar[mainKey].items.push({
        text: subKey,
        link: `/zh/official/reference/typescript-api/${file}`,
      });
    }
  });

  // 对每个分组内的项目进行排序
  for (const key in sidebar) {
    sidebar[key].items.sort((a, b) => a.text.localeCompare(b.text));
  }

  // 对分组自身进行排序
  return Object.values(sidebar).sort((a, b) => a.text.localeCompare(b.text));
}

const officialApiSidebar = generateSidebar(
  path.resolve(__dirname, '../docs/zh/official/reference/typescript-api'),
);

export { officialApiSidebar };
