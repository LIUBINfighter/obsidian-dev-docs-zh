import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Astro 版本的 API 文档同步和生成脚本
 * 复制和适配现有的官方 API 同步逻辑
 */

/**
 * 修复 Markdown 文件中的相对链接 (Astro版本)
 * @param {string} content - 文件内容
 * @param {string} currentFileDir - 当前文件所在目录
 * @param {string} baseDir - API 文档根目录
 * @returns {string} 修复后的内容
 */
function fixMarkdownLinksForAstro(content, currentFileDir, baseDir) {
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
  // 在 Astro 中需要调整路径以适应新的结构
  fixedContent = fixedContent.replace(
    /\[([^\]]+)\]\(\.\/([A-Z][a-zA-Z0-9]*)\)/g,
    (match, text, className) => {
      // 检查目标文件是否存在于父目录
      const parentFile = path.join(baseDir, `${className}.md`);
      if (fs.existsSync(parentFile)) {
        console.log(`    🔧 修复链接 (Astro): ${match} -> [${text}](../${className})`);
        hasChanges = true;
        return `[${text}](../${className})`;
      }
      return match;
    },
  );

  // 其他链接修复逻辑...
  // (保持与原脚本相同的逻辑，但针对 Astro 结构进行调整)

  if (hasChanges) {
    console.log(`  ✅ 文件链接已修复 (Astro版本)`);
  }

  return fixedContent;
}

async function syncOfficialApiDocsForAstro() {
  const sourceDir = path.resolve(
    __dirname,
    '../../docs/en/official-develop-docs/en/Reference/TypeScript API',
  );
  const targetDir = path.resolve(
    __dirname,
    '../src/pages/zh/official/reference/typescript-api',
  );

  console.log('🔄 开始同步官方API文档到 Astro...');
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
    await copyMdFilesForAstro(sourceDir, targetDir, sourceDir, copiedCount, fixedCount);

    console.log(`✅ Astro API 文档同步完成！`);
    console.log(`📄 共复制 ${copiedCount.count} 个文件`);
    console.log(`🔧 共修复 ${fixedCount.count} 个文件的链接`);
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    console.error(error.stack);
  }
}

async function copyMdFilesForAstro(
  currentSrc,
  currentDest,
  baseSrc,
  copiedCount,
  fixedCount,
) {
  const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(currentSrc, entry.name);
    const destPath = path.join(currentDest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      await copyMdFilesForAstro(srcPath, destPath, baseSrc, copiedCount, fixedCount);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 读取源文件内容
      const content = fs.readFileSync(srcPath, 'utf8');

      // 修复链接，传递文件所在的目录路径
      const fixedContent = fixMarkdownLinksForAstro(content, currentSrc, baseSrc);

      // 转换为 Astro MDX 格式
      const astroMdxContent = convertToAstroMDX(fixedContent, entry.name);

      // 检查是否有修复
      if (content !== fixedContent) {
        fixedCount.count++;
      }

      // 保存为 .mdx 文件以便 Astro 处理
      const mdxPath = destPath.replace('.md', '.mdx');
      fs.writeFileSync(mdxPath, astroMdxContent, 'utf8');

      copiedCount.count++;

      const relativePath = path.relative(baseSrc, srcPath);
      console.log(`📄 ${relativePath} -> MDX`);
    }
  }
}

/**
 * 将 Markdown 转换为 Astro MDX 格式
 * @param {string} content - Markdown 内容
 * @param {string} fileName - 文件名
 * @returns {string} MDX 内容
 */
function convertToAstroMDX(content, fileName) {
  // 提取标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/`/g, '') : fileName.replace('.md', '');

  // 添加 MDX 前置内容
  const frontmatter = `---
layout: ../../../../../layouts/DocumentationLayout.astro
title: "${title}"
---

import Sidebar from '../../../../../components/Sidebar.astro';
import { getFullSidebar } from '../../../../../utils/sidebar.ts';

<Sidebar slot="sidebar" items={getFullSidebar()} />

`;

  return frontmatter + content;
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Astro API 同步脚本开始执行...');
  syncOfficialApiDocsForAstro()
    .then(() => {
      console.log('🎉 Astro API 同步脚本执行完成');
    })
    .catch((error) => {
      console.error('💥 Astro API 同步脚本执行失败:', error);
    });
}

export default syncOfficialApiDocsForAstro;