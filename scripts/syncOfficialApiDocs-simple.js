import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* eslint-disable no-console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncOfficialApiDocs() {
  const sourceDir = path.resolve(__dirname, '../docs/en/official-develop-docs/en/Reference/TypeScript API');
  const targetDir = path.resolve(__dirname, '../docs/zh/official/reference/typescript-api');

  console.log('🔄 开始同步官方API文档...');
  console.log('源目录:', sourceDir);
  console.log('目标目录:', targetDir);

  try {
    if (!fs.existsSync(sourceDir)) {
      console.error('❌ 源目录不存在:', sourceDir);
      return;
    }

    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true });
    }
    fs.mkdirSync(targetDir, { recursive: true });

    const copiedCount = { count: 0 };
    await copyMdFiles(sourceDir, targetDir, sourceDir, copiedCount);
    
    console.log(`✅ 同步完成！共复制 ${copiedCount.count} 个文件`);
    
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
  }
}

async function copyMdFiles(currentSrc, currentDest, baseSrc, copiedCount) {
  const entries = fs.readdirSync(currentSrc, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(currentSrc, entry.name);
    const destPath = path.join(currentDest, entry.name);
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      await copyMdFiles(srcPath, destPath, baseSrc, copiedCount);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
      copiedCount.count++;
      
      const relativePath = path.relative(baseSrc, srcPath);
      console.log(`📄 ${relativePath}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  syncOfficialApiDocs();
}

export default syncOfficialApiDocs;
