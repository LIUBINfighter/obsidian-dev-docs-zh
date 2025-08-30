import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* eslint-disable no-console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 修复 Markdown 文件中的相对链接
 * @param {string} content - 文件内容
 * @param {string} currentFileDir - 当前文件所在目录
 * @param {string} baseDir - API 文档根目录
 * @returns {string} 修复后的内容
 */
function fixMarkdownLinks(content, currentFileDir, baseDir) {
  // 检查是否在子目录中
  const isInSubDir = currentFileDir !== baseDir;
  
  console.log(`  🔍 检查文件目录: ${currentFileDir} (子目录: ${isInSubDir})`);
  
  if (!isInSubDir) {
    return content; // 根目录文件不需要修复
  }
  
  let fixedContent = content;
  let hasChanges = false;
  const currentDirName = path.basename(currentFileDir);
  
  // 1. 修复 ./ClassName 格式的链接 (指向父级类)
  // 例如：./Workspace -> ../Workspace
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(\.\/([A-Z][a-zA-Z0-9]*)\)/g,
    (match, text, className) => {
      // 检查目标文件是否存在于父目录
      const parentFile = path.join(baseDir, `${className}.md`);
      if (fs.existsSync(parentFile)) {
        console.log(`    🔧 修复链接: ${match} -> [${text}](../${className})`);
        hasChanges = true;
        return `[${text}](../${className})`;
      }
      return match;
    }
  );
  
  // 2. 修复 ./ClassName/methodName 格式的链接 (指向同级方法)
  // 例如：./Workspace/activeEditor -> ./activeEditor
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(\.\/([A-Z][a-zA-Z0-9]*)\/([a-zA-Z0-9_'().-]+)\)/g,
    (match, text, className, methodName) => {
      // 如果类名与当前目录名匹配，修复为相对路径
      if (className === currentDirName) {
        console.log(`    🔧 修复链接: ${match} -> [${text}](./${methodName})`);
        hasChanges = true;
        return `[${text}](./${methodName})`;
      }
      return match;
    }
  );
  
  // 3. 修复无前缀的 ClassName 格式链接 (指向父级类)
  // 例如：[`Workspace`](Workspace) -> [`Workspace`](../Workspace)
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(([A-Z][a-zA-Z0-9]*)\)(?!\))/g, 
    (match, text, link) => {
      // 跳过已经有路径前缀的链接
      if (link.includes('/') || link.startsWith('./') || link.startsWith('../')) {
        return match;
      }
      
      // 检查目标文件是否存在于父目录
      const parentFile = path.join(baseDir, `${link}.md`);
      if (fs.existsSync(parentFile)) {
        console.log(`    🔧 修复链接: ${match} -> [${text}](../${link})`);
        hasChanges = true;
        return `[${text}](../${link})`;
      }
      return match;
    }
  );
  
  // 4. 修复 ClassName/methodName 格式的链接 (指向同级方法)
  // 例如：[`activeEditor`](Workspace/activeEditor) -> [`activeEditor`](./activeEditor)
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(([A-Z][a-zA-Z0-9]*)\/([a-zA-Z0-9_'().-]+)\)/g,
    (match, text, className, methodName) => {
      // 如果类名与当前目录名匹配，修复为相对路径
      if (className === currentDirName) {
        console.log(`    🔧 修复链接: ${match} -> [${text}](./${methodName})`);
        hasChanges = true;
        return `[${text}](./${methodName})`;
      }
      return match;
    }
  );
  
  // 5. 修复全局函数链接 (如 normalizePath, addIcon 等)
  // 例在子目录中：[normalizePath()](normalizePath) -> [normalizePath()](../normalizePath)
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(([a-z][a-zA-Z0-9]*)\)/g,
    (match, text, functionName) => {
      // 跳过已经有路径前缀的链接
      if (functionName.includes('/') || functionName.startsWith('./') || functionName.startsWith('../')) {
        return match;
      }
      
      // 检查目标文件是否存在于父目录（全局函数）
      const parentFile = path.join(baseDir, `${functionName}.md`);
      if (fs.existsSync(parentFile)) {
        console.log(`    🔧 修复全局函数链接: ${match} -> [${text}](../${functionName})`);
        hasChanges = true;
        return `[${text}](../${functionName})`;
      }
      return match;
    }
  );
  
  // 6. 修复跨类引用链接
  // 例如：./Vault/getAbstractFileByPath -> ../Vault/getAbstractFileByPath
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(\.\/([A-Z][a-zA-Z0-9]*)\/([a-zA-Z0-9_'().-]+)\)/g,
    (match, text, className, methodName) => {
      // 如果类名与当前目录名不匹配，这是跨类引用
      if (className !== currentDirName) {
        // 检查目标类是否存在于父目录
        const parentClassFile = path.join(baseDir, `${className}.md`);
        if (fs.existsSync(parentClassFile)) {
          console.log(`    🔧 修复跨类引用链接: ${match} -> [${text}](../${className}/${methodName})`);
          hasChanges = true;
          return `[${text}](../${className}/${methodName})`;
        }
      }
      return match;
    }
  );
  
  if (hasChanges) {
    console.log(`  ✅ 文件链接已修复`);
  }
  
  return fixedContent;
}

async function syncOfficialApiDocs() {
  const sourceDir = path.resolve(
    __dirname,
    '../docs/en/official-develop-docs/en/Reference/TypeScript API',
  );
  const targetDir = path.resolve(
    __dirname,
    '../docs/zh/official/reference/typescript-api',
  );

  console.log('🔄 开始同步官方API文档...');
  console.log('📁 源目录:', sourceDir);
  console.log('📁 目标目录:', targetDir);
  console.log('🔍 检查源目录是否存在...');

  try {
    if (!fs.existsSync(sourceDir)) {
      console.error('❌ 源目录不存在:', sourceDir);
      console.error('🔍 请检查子模块是否正确初始化');
      return;
    }
    
    console.log('✅ 源目录存在');
    console.log('🔍 检查目标目录...');

    if (fs.existsSync(targetDir)) {
      console.log('🗑️  删除现有目标目录...');
      fs.rmSync(targetDir, { recursive: true });
    }
    
    console.log('📁 创建目标目录...');
    fs.mkdirSync(targetDir, { recursive: true });

    console.log('📋 开始复制和修复文件...');
    const copiedCount = { count: 0 };
    const fixedCount = { count: 0 };
    await copyMdFiles(sourceDir, targetDir, sourceDir, copiedCount, fixedCount);

    console.log(`✅ 同步完成！`);
    console.log(`📄 共复制 ${copiedCount.count} 个文件`);
    console.log(`🔧 共修复 ${fixedCount.count} 个文件的链接`);
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    console.error(error.stack);
  }
}

async function copyMdFiles(currentSrc, currentDest, baseSrc, copiedCount, fixedCount) {
  const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(currentSrc, entry.name);
    const destPath = path.join(currentDest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      await copyMdFiles(srcPath, destPath, baseSrc, copiedCount, fixedCount);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 读取源文件内容
      const content = fs.readFileSync(srcPath, 'utf8');
      
      // 修复链接，传递文件所在的目录路径
      const fixedContent = fixMarkdownLinks(content, currentSrc, baseSrc);
      
      // 检查是否有修复
      if (content !== fixedContent) {
        fixedCount.count++;
      }
      
      // 写入目标文件
      fs.writeFileSync(destPath, fixedContent, 'utf8');
      
      copiedCount.count++;

      const relativePath = path.relative(baseSrc, srcPath);
      console.log(`📄 ${relativePath}`);
    }
  }
}

// 直接执行或通过命令行调用时运行
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('syncOfficialApiDocs-simple.js')) {
  console.log('🚀 脚本开始执行...');
  syncOfficialApiDocs().then(() => {
    console.log('🎉 脚本执行完成');
  }).catch((error) => {
    console.error('💥 脚本执行失败:', error);
  });
}

export default syncOfficialApiDocs;
