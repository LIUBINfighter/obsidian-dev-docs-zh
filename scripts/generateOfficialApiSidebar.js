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
    // 处理以 'obsidian.' 开头的文件（如果有的话，保持兼容性）
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
    // 处理直接的 .md 文件（官方API文档的实际格式）
    else if (file.endsWith('.md') && !file.startsWith('obsidian') && file !== 'index.md') {
      const fileName = file.replace('.md', '');
      
      // 按首字母分组
      const firstLetter = fileName.charAt(0).toUpperCase();
      const groupKey = firstLetter;

      if (!sidebar[groupKey]) {
        sidebar[groupKey] = {
          text: `${firstLetter}`,
          collapsible: true,
          collapsed: true,
          items: [],
        };
      }
      
      sidebar[groupKey].items.push({
        text: fileName,
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
