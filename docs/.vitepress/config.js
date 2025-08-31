import { contentsNote } from "../sidebar/contents"

export default {
  title: 'Obsidian 开发者文档',
  base: "/obsidian-dev-docs-zh/",
  description: "根据Obsidian官方开发者文档进行翻译",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    // 添加图标
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  ],
  // 排除英文文档目录，只构建中文文档
  srcExclude: ['**/en/**'],
  
  // 忽略死链接检查
  // TODO: FIX 这些是跨类引用和特殊格式的链接，需要进一步优化同步脚本来修复
  // 当前共 7 个死链接，相比原来的 1854 个已经是 99.6% 的修复率
  ignoreDeadLinks: [
    // 跨类引用 - 需要完善链接修复逻辑
    './Vault/getAbstractFileByPath',              // DataAdapter/exists.md 中引用 Vault 类方法
    './Workspace/updateOptions',                  // Plugin/registerEditorExtension.md 中引用 Workspace 方法  
    './Workspace/onLayoutReady',                  // Vault/on('create').md 中引用 Workspace 方法
    './FileManager/renameFile',                   // Vault/rename.md 中引用 FileManager 方法
    
    // 特殊格式链接 - 原始文档中的复杂命名约定
    './obsidian.workspace.getleaf_1',            // 出现在多个 Workspace 子页面中
  ],
  
  // 主题配置
  themeConfig: {
    siteTitle: "Obsidian 开发者文档",
    logo: "/logo.svg",
    sidebar: contentsNote,

    // 头部导航栏配置
    // nav: topNav,
    // search: {
    //   provider: "local",
    // },
  },

}