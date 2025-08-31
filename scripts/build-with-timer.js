import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

/* eslint-disable no-console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 格式化时间显示
 * @param {number} seconds - 秒数
 * @returns {string} 格式化的时间字符串
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes > 0) {
    return `${minutes}分${remainingSeconds}秒`;
  } else {
    return `${remainingSeconds}秒`;
  }
}

/**
 * 获取当前时间戳
 * @returns {number} 时间戳（毫秒）
 */
function getCurrentTime() {
  return Date.now();
}

/**
 * 运行带时间统计的构建命令
 */
function buildWithTimer() {
  const startTime = getCurrentTime();
  const startDate = new Date(startTime);

  console.log('🚀 开始构建...');
  console.log(`⏰ 开始时间: ${startDate.toLocaleString('zh-CN')}`);
  console.log('═'.repeat(60));

  return new Promise((resolve, reject) => {
    // 使用 spawn 执行 pnpm build
    const buildProcess = spawn('pnpm', ['build'], {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit', // 继承父进程的输入输出
      shell: true, // 在 Windows 上需要 shell
    });

    buildProcess.on('close', (code) => {
      const endTime = getCurrentTime();
      const endDate = new Date(endTime);
      const duration = (endTime - startTime) / 1000; // 转换为秒

      console.log('═'.repeat(60));
      console.log(`⏰ 结束时间: ${endDate.toLocaleString('zh-CN')}`);
      console.log(`⏱️  构建耗时: ${formatTime(duration)}`);

      if (code === 0) {
        console.log('✅ 构建成功！');
        console.log(`🎉 总用时: ${formatTime(duration)}`);
        resolve(code);
      } else {
        console.log('❌ 构建失败！');
        console.log(`💥 失败用时: ${formatTime(duration)}`);
        reject(new Error(`Build process exited with code ${code}`));
      }
    });

    buildProcess.on('error', (error) => {
      const endTime = getCurrentTime();
      const duration = (endTime - startTime) / 1000;

      console.log('═'.repeat(60));
      console.log('❌ 构建过程出错！');
      console.log(`💥 错误用时: ${formatTime(duration)}`);
      console.error('错误详情:', error.message);
      reject(error);
    });
  });
}

// 如果直接运行此脚本
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1].endsWith('build-with-timer.js')
) {
  buildWithTimer()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('构建失败:', error.message);
      process.exit(1);
    });
}

export default buildWithTimer;
