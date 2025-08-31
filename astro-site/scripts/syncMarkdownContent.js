import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 简单地复制 Markdown 文件到 Astro 的 content 目录
 * 让 Astro 自然处理 markdown 文件
 */

async function syncMarkdownContent() {
  console.log('🔄 开始同步 Markdown 内容到 Astro 站点...');
  
  const sourceDocsDir = path.resolve(__dirname, '../../docs/zh');
  const targetContentDir = path.resolve(__dirname, '../src/content/docs');
  
  // 要同步的核心页面
  const corePages = [
    'about.md',
    'home.md',
  ];
  
  console.log('📁 源目录:', sourceDocsDir);
  console.log('📁 目标目录:', targetContentDir);
  
  try {
    // 确保目标目录存在
    if (fs.existsSync(targetContentDir)) {
      console.log('🗑️ 清理现有目标目录...');
      fs.rmSync(targetContentDir, { recursive: true });
    }
    
    fs.mkdirSync(targetContentDir, { recursive: true });
    
    // 同步每个核心页面
    for (const pageFile of corePages) {
      const srcPath = path.join(sourceDocsDir, pageFile);
      const destPath = path.join(targetContentDir, pageFile);
      const destDir = path.dirname(destPath);
      
      if (fs.existsSync(srcPath)) {
        // 确保目标目录存在
        fs.mkdirSync(destDir, { recursive: true });
        
        // 读取并转换内容
        const content = fs.readFileSync(srcPath, 'utf8');
        const processedContent = processMarkdownForAstro(content);
        
        fs.writeFileSync(destPath, processedContent, 'utf8');
        
        console.log(`📄 复制: ${pageFile}`);
      } else {
        console.warn(`⚠️ 源文件不存在: ${pageFile}`);
      }
    }
    
    console.log('✅ Markdown 内容同步完成！');
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    throw error;
  }
}

/**
 * 处理 Markdown 内容以适配 Astro
 * @param {string} content - 原始 Markdown 内容
 * @returns {string} 处理后的内容
 */
function processMarkdownForAstro(content) {
  let processed = content;
  
  // 移除 VitePress 注释块
  processed = processed.replace(/^<!--[\s\S]*?-->\n\n?/m, '');
  
  // 转换 VitePress 特有的容器语法
  processed = processed.replace(/::: warning([^\n]*)\n([\s\S]*?)\n:::/g, 
    '> ⚠️ **警告**\n> \n> $2');
  processed = processed.replace(/::: tip([^\n]*)\n([\s\S]*?)\n:::/g, 
    '> 💡 **提示**\n> \n> $2');
  processed = processed.replace(/::: info([^\n]*)\n([\s\S]*?)\n:::/g, 
    '> ℹ️ **信息**\n> \n> $2');
  
  return processed;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  syncMarkdownContent();
}

export default syncMarkdownContent;