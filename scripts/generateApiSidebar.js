import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 生成侧边栏配置
 * @param {string} dir - 目录路径
 * @returns {Array} 侧边栏配置数组
 */
function generateSidebar(dir) {
  const files = fs.readdirSync(dir);
  const sidebar = {};

  files.forEach((file) => {
    if (file.startsWith('obsidian-typings.')) {
      const parts = file.replace('.md', '').split('.');
      // The first part is 'obsidian-typings', so we start from the second part
      const mainKey = parts[1];

      if (!mainKey) {
        // Handle special case for obsidian-typings.md (index file)
        if (file === 'obsidian-typings.md') {
          return; // Skip the index file
        }
        return;
      }

      // Join the rest of the parts for the subKey
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
        link: `/zh/typings/typescript-api/${file}`,
      });
    }
  });

  // Sort items within each group
  for (const key in sidebar) {
    sidebar[key].items.sort((a, b) => a.text.localeCompare(b.text));
  }

  return Object.values(sidebar).sort((a, b) => a.text.localeCompare(b.text));
}

const typingsApiSidebar = generateSidebar(
  path.resolve(__dirname, '../docs/zh/typings/typescript-api'),
);

export const apiReferenceSidebar = typingsApiSidebar;
