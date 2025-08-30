import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSidebar(dir) {
  const files = fs.readdirSync(dir);
  const sidebar = {};

  files.forEach((file) => {
    if (file.startsWith('obsidian-typings.')) {
      const parts = file.replace('.md', '').split('.');
      // obsidian-typings.App.md -> App
      // obsidian-typings.App.commands.md -> App
      const mainKey = parts[1];

      // obsidian-typings.App.md -> App
      // obsidian-typings.App.commands.md -> commands
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
        link: `/zh/reference/typescript-api/${file}`,
      });
    }
  });

  // Sort items within each group
  for (const key in sidebar) {
    sidebar[key].items.sort((a, b) => a.text.localeCompare(b.text));
  }

  return Object.values(sidebar).sort((a, b) => a.text.localeCompare(b.text));
}

const apiSidebar = generateSidebar(
  path.resolve(__dirname, '../../docs/zh/reference/typescript-api'),
);

// console.log(JSON.stringify(apiSidebar, null, 2));

export const apiReferenceSidebar = apiSidebar;
