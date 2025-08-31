# Astro 迁移站点

这是将 VitePress 文档逐步迁移到 Astro 框架的新站点。

## 📋 迁移进度

### ✅ 已完成
- [x] 基础 Astro 站点搭建
- [x] 文档布局组件 (`DocumentationLayout.astro`)
- [x] 侧边栏组件 (`Sidebar.astro`)
- [x] 侧边栏生成工具 (`utils/sidebar.ts`)
- [x] 核心页面迁移脚本
- [x] 静态资源复制 (favicon, logo)
- [x] 基础样式和响应式设计

### 🚧 进行中
- [ ] API 文档同步脚本适配
- [ ] 更多核心页面迁移
- [ ] 链接修复逻辑适配

### 📋 待办
- [ ] 完整内容迁移
- [ ] 搜索功能实现
- [ ] 构建优化
- [ ] 部署配置

## 🏗️ 架构说明

### 文件结构
```
astro-site/
├── src/
│   ├── components/          # 组件
│   │   └── Sidebar.astro   # 侧边栏组件
│   ├── layouts/            # 布局
│   │   └── DocumentationLayout.astro
│   ├── pages/              # 页面
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   └── zh/             # 中文内容
│   └── utils/              # 工具函数
│       └── sidebar.ts      # 侧边栏生成
├── scripts/                # 构建脚本
│   ├── syncCorePages.js    # 核心页面同步
│   ├── syncMarkdownContent.js
│   └── syncOfficialApiForAstro.js
└── public/                 # 静态资源
    ├── favicon.ico
    └── logo.svg
```

### 关键特性
1. **TypeScript 支持**: 完整的 TypeScript 类型定义
2. **组件化设计**: 可复用的 Astro 组件
3. **动态侧边栏**: 基于文件系统自动生成导航
4. **响应式设计**: 移动端友好的布局
5. **内容同步**: 从现有 VitePress 内容自动迁移的脚本

### 与 VitePress 的差异
1. **文件格式**: 使用 `.astro` 和 `.mdx` 文件而不是纯 `.md`
2. **组件系统**: Astro 原生组件而不是 Vue 组件
3. **构建输出**: 静态站点生成，无客户端 JavaScript
4. **配置方式**: `astro.config.mjs` 而不是 VitePress 配置

## 🚀 使用方法

### 开发
```bash
cd astro-site
npm install
npm run dev
```

### 构建
```bash
npm run build
```

### 内容同步
```bash
# 同步核心页面
node scripts/syncCorePages.js

# 同步 API 文档 (需要子模块)
node scripts/syncOfficialApiForAstro.js
```

## 🔧 配置说明

### Astro 配置 (`astro.config.mjs`)
- **site**: 部署站点 URL
- **base**: 基础路径 `/obsidian-dev-docs-zh`
- **integrations**: MDX 支持
- **markdown**: Prism 语法高亮

### 侧边栏配置
侧边栏通过 `src/utils/sidebar.ts` 动态生成，复用了原有的文件扫描逻辑。

## 📝 迁移指南

### 页面迁移
1. 从 `docs/zh/` 复制 Markdown 文件
2. 使用 `syncCorePages.js` 脚本自动转换
3. 手动调整复杂的 VitePress 特有语法

### API 文档迁移
1. 运行 `syncOfficialApiForAstro.js` 同步官方文档
2. API 文档会自动转换为 MDX 格式
3. 链接会自动修复以适应 Astro 路由

### 样式迁移
1. 基础样式已在布局组件中定义
2. 特殊样式可以在单个页面中添加
3. 保持与 VitePress 主题的视觉一致性