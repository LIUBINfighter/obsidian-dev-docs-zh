import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 选择性同步核心页面到 Astro 站点，使用 MDX 格式
 * 只同步一些关键页面用于演示迁移
 */

async function syncCorePagesAsMDX() {
  console.log('🔄 开始同步核心页面到 Astro 站点 (MDX格式)...');
  
  const sourceDocsDir = path.resolve(__dirname, '../../docs/zh');
  const targetPagesDir = path.resolve(__dirname, '../src/pages/zh');
  
  // 要同步的核心页面
  const corePages = [
    'about.md',
    'home.md'
  ];
  
  console.log('📁 源目录:', sourceDocsDir);
  console.log('📁 目标目录:', targetPagesDir);
  
  try {
    // 确保目标目录存在
    if (fs.existsSync(targetPagesDir)) {
      console.log('🗑️ 清理现有目标目录...');
      fs.rmSync(targetPagesDir, { recursive: true });
    }
    
    fs.mkdirSync(targetPagesDir, { recursive: true });
    
    // 同步每个核心页面
    for (const pageFile of corePages) {
      const srcPath = path.join(sourceDocsDir, pageFile);
      const destDir = path.dirname(path.join(targetPagesDir, pageFile));
      
      if (fs.existsSync(srcPath)) {
        // 确保目标目录存在
        fs.mkdirSync(destDir, { recursive: true });
        
        // 转换并复制文件
        const content = fs.readFileSync(srcPath, 'utf8');
        const mdxContent = convertMarkdownToMDX(content, path.basename(pageFile), srcPath, sourceDocsDir);
        
        const mdxFileName = path.basename(pageFile).replace('.md', '.mdx');
        const mdxPath = path.join(destDir, mdxFileName);
        
        fs.writeFileSync(mdxPath, mdxContent, 'utf8');
        
        console.log(`📄 转换: ${pageFile} -> ${mdxPath.replace(targetPagesDir, '')}`);
      } else {
        console.warn(`⚠️ 源文件不存在: ${pageFile}`);
      }
    }
    
    console.log('✅ 核心页面同步完成！');
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    throw error;
  }
}

/**
 * 计算相对路径深度来确定导入路径
 * @param {string} filePath - 文件路径
 * @param {string} baseDir - 基础目录
 * @returns {string} 相对导入路径前缀
 */
function getRelativeImportPath(filePath, baseDir) {
  const relativePath = path.relative(baseDir, path.dirname(filePath));
  const depth = relativePath === '' ? 0 : relativePath.split(path.sep).length;
  return '../'.repeat(depth + 2); // +2 因为从 pages/zh 到 src
}

/**
 * 将 Markdown 内容转换为 MDX 格式
 * @param {string} content - 原始 Markdown 内容  
 * @param {string} fileName - 文件名
 * @param {string} filePath - 完整文件路径
 * @param {string} baseDir - 基础目录路径
 * @returns {string} 转换后的 MDX 内容
 */
function convertMarkdownToMDX(content, fileName, filePath, baseDir) {
  // 提取标题作为页面标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/`/g, '') : fileName.replace('.md', '');
  
  // 计算相对导入路径
  const importPrefix = getRelativeImportPath(filePath, baseDir);
  
  // 移除 VitePress 特有的前置内容（如果有）
  let cleanContent = content;
  
  // 移除注释块
  cleanContent = cleanContent.replace(/^<!--[\s\S]*?-->\n\n?/m, '');
  
  // 转换 VitePress 特有的语法到标准HTML div
  cleanContent = cleanContent.replace(/::: warning([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div className="warning">$2</div>');
  cleanContent = cleanContent.replace(/::: tip([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div className="tip">$2</div>');
  cleanContent = cleanContent.replace(/::: info([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div className="info">$2</div>');
  
  return `---
layout: ${importPrefix}layouts/DocumentationLayout.astro
title: "${title}"
---

import Sidebar from '${importPrefix}components/Sidebar.astro';
import { getFullSidebar } from '${importPrefix}utils/sidebar.ts';

export const sidebarItems = getFullSidebar();

<Sidebar slot="sidebar" items={sidebarItems} />

${cleanContent}`;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  syncCorePagesAsMDX();
}

export default syncCorePagesAsMDX;