# Obsidian 开发者中文文档 - 开发指南

## 📖 项目概述

这是一个基于 [VitePress](https://vitepress.dev/) 构建的 Obsidian 开发者中文文档项目，致力于提供最新的 Obsidian 插件和主题开发中文文档。

### 🎯 项目特色

- ✅ **实时同步上游**：通过 Git 子模块跟踪 Obsidian 官方文档更新
- ✅ **严格代码质量**：集成 ESLint + Prettier 确保代码规范
- ✅ **高效构建**：智能排除英文文档，只构建中文内容
- ✅ **现代化工具链**：使用 pnpm + VitePress + TypeScript

## 🛠️ 环境要求

### 系统要求

- **Node.js**: `>= 18.0.0`
- **包管理器**: `pnpm` (推荐) 或 `npm`
- **Git**: `>= 2.30.0`

### 推荐开发环境

```bash
# 检查版本
node --version  # 应 >= 18.0.0
pnpm --version  # 应 >= 8.0.0
git --version   # 应 >= 2.30.0
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/LIUBINfighter/obsidian-dev-docs-zh.git
cd obsidian-dev-docs-zh
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 3. 初始化子模块

```bash
# 初始化所有子模块
git submodule init
git submodule update

# 或一次性完成
git submodule update --init --recursive
```

### 4. 启动开发服务器

```bash
# 完整开发工作流 (推荐)
pnpm dev

# 或仅启动开发服务器
pnpm docs-dev
```

访问 `http://localhost:5173/obsidian-dev-docs-zh/` 查看文档。

## 📁 项目结构

```
obsidian-dev-docs-zh/
├── docs/                          # 文档根目录
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.js            # 站点配置
│   │   └── cache/               # 构建缓存
│   ├── en/                       # 英文参考文档 (子模块)
│   │   ├── official-develop-docs/ # Obsidian 官方文档
│   │   └── obsidian-typings/     # 类型定义文档
│   ├── zh/                       # 中文文档
│   │   ├── home.md              # 首页
│   │   ├── about.md             # 关于页面
│   │   ├── plugins/             # 插件开发文档
│   │   ├── themes/              # 主题开发文档
│   │   └── articles/            # 社区文章和教程
│   ├── public/                   # 静态资源
│   └── index.md                 # 根索引
├── .gitmodules                   # 子模块配置
├── .prettierrc                  # Prettier 配置
├── .prettierignore              # Prettier 忽略规则
├── eslint.config.js             # ESLint 配置
├── package.json                 # 项目配置和脚本
├── pnpm-lock.yaml              # pnpm 锁定文件
└── README.md                    # 项目说明
```

## 🔧 开发工作流程

### 日常开发

```bash
# 1. 完整开发工作流 (代码检查 + 开发服务器)
pnpm dev

# 2. 仅代码检查
pnpm lint:fix

# 3. 仅格式化代码
pnpm format

# 4. 仅启动开发服务器
pnpm docs-dev
```

### 构建生产版本

```bash
# 完整构建流程 (代码检查 + 构建)
pnpm build

# 或仅构建文档
pnpm docs-build
```

### 预览构建结果

```bash
# 构建后预览
pnpm docs-serve
```

## 🛡️ 代码质量工具

### ESLint 配置

项目使用严格的 ESLint 配置，包含以下规则：

```javascript
// eslint.config.js 主要配置
{
  // TypeScript 严格规则
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/explicit-function-return-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',

  // 代码风格规则
  'prefer-const': 'error',
  'no-var': 'error',
  'semi': ['error', 'always'],
  'quotes': ['error', 'single'],
  'indent': ['error', 2],

  // 忽略规则
  ignores: [
    'dist/',
    'node_modules/',
    '.vitepress/cache/',
    'docs/en/',  // 忽略英文参考文档
  ]
}
```

### Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

### 忽略规则

**ESLint 忽略文件**: `docs/en/` (英文参考文档子模块)

**Prettier 忽略文件**:
```ignore
# .prettierignore
node_modules/
.pnpm/
dist/
.vitepress/cache/
docs/en/  # 忽略英文参考文档
```

## 🔄 子模块管理

### 子模块概述

项目使用 Git 子模块来跟踪上游文档更新：

- `docs/en/official-develop-docs`: Obsidian 官方开发者文档
- `docs/en/obsidian-typings`: Obsidian 类型定义文档

### 子模块操作

```bash
# 查看子模块状态
pnpm run submodule:status
# 或
git submodule status

# 更新所有子模块到最新版本
pnpm run submodule:update
# 或
git submodule update --remote

# 更新特定子模块
cd docs/en/official-develop-docs
git pull origin main

# 查看上游更新内容
pnpm run translate:check
# 或
git diff --name-only docs/en/official-develop-docs/
```

### 子模块最佳实践

1. **定期更新**: 每周检查上游更新
2. **查看变更**: 使用 `git diff` 查看具体变更内容
3. **谨慎提交**: 不要直接修改子模块内容
4. **分支管理**: 在功能分支上进行翻译工作

## 📝 翻译工作流程

### 1. 检查上游更新

```bash
# 查看上游文档的更新
pnpm run translate:check

# 查看具体变更内容
git diff docs/en/official-develop-docs/docs/Home.md
```

### 2. 创建翻译任务

```bash
# 创建功能分支
git checkout -b feature/translate-new-api-docs

# 复制英文文档结构到中文目录
cp docs/en/official-develop-docs/docs/NewFeature.md docs/zh/plugins/new-feature.md
```

### 3. 翻译内容

```bash
# 启动开发服务器查看翻译效果
pnpm docs-dev

# 翻译完成后检查代码质量
pnpm lint:fix
```

### 4. 提交翻译

```bash
# 添加翻译文件
git add docs/zh/plugins/new-feature.md

# 提交翻译
git commit -m "feat: 翻译新功能 API 文档

- 添加新功能介绍
- 翻译使用示例
- 更新相关链接"
```

### 5. 创建 Pull Request

```bash
# 推送分支
git push origin feature/translate-new-api-docs

# 在 GitHub 上创建 PR
```

## 📋 可用脚本命令

```json
// package.json scripts
{
  "dev": "pnpm lint:fix && pnpm docs-dev",           // 完整开发工作流
  "build": "pnpm lint:fix && pnpm docs-build",       // 完整构建流程
  "docs-dev": "vitepress dev docs",                  // 启动开发服务器
  "docs-build": "vitepress build docs",              // 构建文档
  "docs-serve": "vitepress serve docs",              // 预览构建结果
  "lint": "eslint . --ext .js,.ts,.vue --fix",       // ESLint 检查并修复
  "lint:check": "eslint . --ext .js,.ts,.vue",       // 仅检查 ESLint
  "format": "prettier --write .",                    // Prettier 格式化
  "format:check": "prettier --check .",              // 检查格式化
  "lint:fix": "pnpm lint && pnpm format",            // 代码质量检查和格式化
  "submodule:update": "git submodule update --remote docs/en/official-develop-docs",
  "submodule:pull": "cd docs/en/official-develop-docs && git pull origin main",
  "submodule:status": "git submodule status",
  "translate:check": "git diff --name-only docs/en/official-develop-docs/"
}
```

## 🔍 VitePress 配置

### 主要配置 (`docs/.vitepress/config.js`)

```javascript
export default {
  title: 'Obsidian 开发者文档',
  base: "/obsidian-dev-docs-zh/",
  description: "根据Obsidian官方开发者文档进行翻译",

  // 排除英文文档目录，只构建中文文档
  srcExclude: ['**/en/**'],

  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },

  // 主题配置
  themeConfig: {
    siteTitle: "Obsidian 开发者文档",
    logo: "/logo.svg",
    sidebar: contentsNote,
  },
}
```

### 构建优化

- **智能排除**: 只构建中文文档，排除 `docs/en/` 目录
- **增量构建**: 只重新构建变更的文件
- **缓存优化**: 利用 VitePress 缓存加速构建

## 🚀 部署和发布

### 本地构建测试

```bash
# 完整构建测试
pnpm build

# 检查构建输出
ls -la docs/.vitepress/dist/
```

### GitHub Pages 部署

项目配置了自动部署到 GitHub Pages：

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true  # 重要：拉取子模块

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## ❓ 常见问题

### Q: 子模块更新失败怎么办？

```bash
# 清理子模块缓存
git submodule deinit -f docs/en/official-develop-docs
git rm -f docs/en/official-develop-docs
rm -rf .git/modules/docs/en/official-develop-docs

# 重新添加子模块
git submodule add https://github.com/LIUBINfighter/obsidian-developer-docs.git docs/en/official-develop-docs
```

### Q: ESLint 报错太多怎么办？

```bash
# 自动修复大部分问题
pnpm lint

# 查看具体错误
pnpm lint:check

# 逐步修复
pnpm format
```

### Q: 构建时间太长怎么办？

- 检查是否意外包含了 `docs/en/` 目录
- 清理构建缓存: `rm -rf docs/.vitepress/cache/`
- 使用增量构建，只构建变更的文件

### Q: 如何查看上游文档更新？

```bash
# 查看最近更新
cd docs/en/official-develop-docs
git log --oneline -10

# 查看具体文件变更
git diff HEAD~1 -- docs/Home.md
```

## 🤝 贡献指南

### 翻译规范

1. **术语统一**: 参考现有的翻译用词
2. **代码示例**: 保持英文，添加中文注释
3. **链接更新**: 将英文链接替换为中文链接
4. **格式保持**: 遵循 Markdown 格式规范

### 提交规范

```bash
# 功能提交
git commit -m "feat: 添加新功能翻译

- 翻译功能介绍
- 添加使用示例
- 更新相关文档"

# 修复提交
git commit -m "fix: 修复翻译错误

- 修正术语翻译
- 完善代码示例"

# 文档提交
git commit -m "docs: 更新开发文档

- 添加开发指南
- 完善部署说明"
```

## 📞 获取帮助

- 📧 **邮箱**: [项目维护者邮箱]
- 💬 **Issues**: [GitHub Issues](https://github.com/LIUBINfighter/obsidian-dev-docs-zh/issues)
- 📖 **文档**: [在线文档](https://liubinfighter.github.io/obsidian-dev-docs-zh/)

## 🔗 相关链接

- [Obsidian 官方文档](https://docs.obsidian.md/)
- [Obsidian 开发者论坛](https://forum.obsidian.md/c/developers-api/14)
- [VitePress 文档](https://vitepress.dev/)
- [ESLint 规则](https://eslint.org/docs/rules/)

---

> 🎉 欢迎为 Obsidian 中文开发者社区贡献力量！
