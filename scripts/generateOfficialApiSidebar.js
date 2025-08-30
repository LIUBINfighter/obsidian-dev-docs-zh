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
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const sidebar = {};
  const standaloneFiles = [];

  // 分类处理文件和目录
  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const dirName = entry.name;
      const mainFile = `${dirName}.md`;
      
      // 检查是否存在对应的主文档
      const hasMainFile = entries.some(e => e.isFile() && e.name === mainFile);
      
      if (hasMainFile) {
        // 这是一个API对象，有主文档和目录
        if (!sidebar[dirName]) {
          sidebar[dirName] = {
            text: dirName,
            collapsible: true,
            collapsed: true,
            items: [],
          };
        }
        
        // 添加主文档
        sidebar[dirName].items.push({
          text: `${dirName} 概述`,
          link: `/zh/official/reference/typescript-api/${mainFile}`,
        });
        
        // 添加目录下的所有文件
        const subFiles = fs.readdirSync(path.join(dir, dirName), { withFileTypes: true });
        subFiles.forEach(subFile => {
          if (subFile.isFile() && subFile.name.endsWith('.md')) {
            const fileName = subFile.name.replace('.md', '');
            sidebar[dirName].items.push({
              text: fileName,
              link: `/zh/official/reference/typescript-api/${dirName}/${subFile.name}`,
            });
          }
        });
      } else {
        // 这是一个独立的目录（如果没有对应的主文档）
        const subFiles = fs.readdirSync(path.join(dir, dirName), { withFileTypes: true });
        if (subFiles.length > 0) {
          sidebar[dirName] = {
            text: dirName,
            collapsible: true,
            collapsed: true,
            items: [],
          };
          
          subFiles.forEach(subFile => {
            if (subFile.isFile() && subFile.name.endsWith('.md')) {
              const fileName = subFile.name.replace('.md', '');
              sidebar[dirName].items.push({
                text: fileName,
                link: `/zh/official/reference/typescript-api/${dirName}/${subFile.name}`,
              });
            }
          });
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const fileName = entry.name;
      const baseName = fileName.replace('.md', '');
      
      // 跳过index文件和已经处理过的主文档
      if (fileName === 'index.md') {
        return;
      }
      
      // 检查是否有对应的目录，如果有则跳过（已在上面处理）
      const hasCorrespondingDir = entries.some(e => e.isDirectory() && e.name === baseName);
      
      if (!hasCorrespondingDir) {
        // 这是独立的文件
        standaloneFiles.push({
          text: baseName,
          link: `/zh/official/reference/typescript-api/${fileName}`,
        });
      }
    }
  });

  // 对各个分组内的项目进行排序
  for (const key in sidebar) {
    sidebar[key].items.sort((a, b) => {
      // 概述文档排在最前面
      if (a.text.includes('概述')) return -1;
      if (b.text.includes('概述')) return 1;
      return a.text.localeCompare(b.text);
    });
  }

  // 对独立文件排序
  standaloneFiles.sort((a, b) => a.text.localeCompare(b.text));

  // 构建最终结果
  const result = Object.values(sidebar).sort((a, b) => a.text.localeCompare(b.text));
  
  // 如果有独立文件，添加到最后
  if (standaloneFiles.length > 0) {
    result.push({
      text: '工具函数与类型',
      collapsible: true,
      collapsed: true,
      items: standaloneFiles,
    });
  }

  return result;
}

const officialApiSidebar = generateSidebar(
  path.resolve(__dirname, '../docs/zh/official/reference/typescript-api'),
);

export { officialApiSidebar };
