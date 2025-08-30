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