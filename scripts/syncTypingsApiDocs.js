import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

/* eslint-disable no-console */

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncTypingsApiDocs() {
  const configPath = path.resolve(__dirname, '../config/api-extractor.json');
  const tempPath = path.resolve(__dirname, '../temp');
  const targetDir = path.resolve(
    __dirname,
    '../docs/zh/typings/typescript-api',
  );

  console.log('🔄 开始同步Typings API文档...');
  console.log('配置文件:', configPath);
  console.log('目标目录:', targetDir);

  try {
    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 确保temp目录存在
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }

    // 运行 api-extractor
    console.log('📦 运行 API Extractor...');
    try {
      const { stderr } = await execAsync(
        `npx api-extractor run --config "${configPath}"`,
        {
          cwd: path.resolve(__dirname, '..'),
        },
      );

      if (stderr) {
        console.warn('⚠️  API Extractor 警告:', stderr);
      }
      console.log('✅ API Extractor 完成');
    } catch (error) {
      console.warn('⚠️  API Extractor 运行时有警告，继续处理...');
      console.warn(error.stderr);
    }

    // 运行 api-documenter 生成 markdown
    console.log('📝 生成 Markdown 文档...');
    const apiJsonPath = path.join(tempPath, 'obsidian-typings.api.json');

    if (fs.existsSync(apiJsonPath)) {
      try {
        await execAsync(
          `npx api-documenter markdown --input-folder "${tempPath}" --output-folder "${targetDir}"`,
          {
            cwd: path.resolve(__dirname, '..'),
          },
        );
        console.log('✅ Markdown 文档生成完成');
      } catch (error) {
        console.warn('⚠️  API Documenter 运行时有警告，但文档可能已生成');
        console.warn(error.stderr);
      }
    } else {
      console.error('❌ API JSON 文件未找到:', apiJsonPath);
      return;
    }

    // 检查生成的文件数量
    const files = fs.readdirSync(targetDir).filter((f) => f.endsWith('.md'));
    console.log(`✅ Typings API 同步完成！共生成 ${files.length} 个文档文件`);
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  syncTypingsApiDocs();
}

export default syncTypingsApiDocs;
