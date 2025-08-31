import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Astro 版本的内容同步脚本
 * 将现有的文档内容复制到 Astro 站点中，并进行必要的格式转换
 */

async function syncContentToAstro() {
  console.log('🔄 开始将内容同步到 Astro 站点...');
  
  const sourceDocsDir = path.resolve(__dirname, '../../docs/zh');
  const targetPagesDir = path.resolve(__dirname, '../src/pages/zh');
  
  console.log('📁 源目录:', sourceDocsDir);
  console.log('📁 目标目录:', targetPagesDir);
  
  try {
    // 确保目标目录存在
    if (fs.existsSync(targetPagesDir)) {
      console.log('🗑️ 清理现有目标目录...');
      fs.rmSync(targetPagesDir, { recursive: true });
    }
    
    fs.mkdirSync(targetPagesDir, { recursive: true });
    
    // 开始同步
    await copyContentRecursive(sourceDocsDir, targetPagesDir);
    
    console.log('✅ 内容同步完成！');
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    throw error;
  }
}

async function copyContentRecursive(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      await copyContentRecursive(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 读取 Markdown 文件并转换为 Astro 页面
      const content = fs.readFileSync(srcPath, 'utf8');
      const astroContent = convertMarkdownToAstro(content, entry.name, srcPath, srcDir);
      
      // 将 .md 文件转换为 .astro 文件
      const astroFileName = entry.name.replace('.md', '.astro');
      const astroPath = path.join(destDir, astroFileName);
      
      fs.writeFileSync(astroPath, astroContent, 'utf8');
      
      console.log(`📄 转换: ${entry.name} -> ${astroFileName}`);
    }
  }
}

/**
 * 计算相对路径深度来确定导入路径
 * @param {string} filePath - 文件路径
 * @param {string} baseDir - 基础目录
 * @returns {string} 相对导入路径前缀
 */
function getRelativeImportPath(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath);
  const depth = relativePath.split(path.sep).length - 1;
  return '../'.repeat(depth + 1);
}

/**
 * 将 Markdown 内容转换为 Astro 页面格式
 * @param {string} content - 原始 Markdown 内容  
 * @param {string} fileName - 文件名
 * @param {string} filePath - 完整文件路径
 * @param {string} baseDir - 基础目录路径
 * @returns {string} 转换后的 Astro 内容
 */
function convertMarkdownToAstro(content, fileName, filePath, baseDir) {
  // 提取标题作为页面标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/`/g, '') : fileName.replace('.md', '');
  
  // 计算相对导入路径
  const importPrefix = getRelativeImportPath(filePath, baseDir);
  
  // 移除 VitePress 特有的前置内容（如果有）
  let cleanContent = content;
  
  // 移除注释块
  cleanContent = cleanContent.replace(/^<!--[\s\S]*?-->\n\n?/m, '');
  
  // 转换 VitePress 特有的语法到 Astro
  cleanContent = cleanContent.replace(/::: warning([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div class="warning">$2</div>');
  cleanContent = cleanContent.replace(/::: tip([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div class="tip">$2</div>');
  cleanContent = cleanContent.replace(/::: info([^\n]*)\n([\s\S]*?)\n:::/g, 
    '<div class="info">$2</div>');
  
  // 缩进内容以适应 Astro 模板
  const indentedContent = cleanContent.split('\n').map(line => '    ' + line).join('\n');
  
  return `---
import DocumentationLayout from '${importPrefix}layouts/DocumentationLayout.astro';
import Sidebar from '${importPrefix}components/Sidebar.astro';
import { getFullSidebar } from '${importPrefix}utils/sidebar.ts';

const sidebarItems = getFullSidebar();
---

<DocumentationLayout title="${title}">
  <Sidebar slot="sidebar" items={sidebarItems} />
  
  <div class="markdown-content">
${indentedContent}
  </div>
</DocumentationLayout>

<style>
  .markdown-content {
    max-width: none;
  }
  
  .warning {
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .tip {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .info {
    background: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background-color: #f8fafc;
    font-weight: 600;
  }
  
  blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #64748b;
    font-style: italic;
  }
</style>`;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  syncContentToAstro();
}

export default syncContentToAstro;