// Obsidian 开发者文档左侧导航栏
export const contentsNote = [
  {
    text: '插件',
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: '开始',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '构建一个插件',
            link: '/zh/plugins/getting-started/build-a-plugin',
          },
          {
            text: '插件的生命周期',
            link: '/zh/plugins/getting-started/anatomy-of-a-plugin',
          },
          {
            text: '开发工作流程',
            link: '/zh/plugins/getting-started/development-workflow',
          },
          {
            text: '移动开发',
            link: '/zh/plugins/getting-started/mobile-development',
          },
          {
            text: '使用React',
            link: '/zh/plugins/getting-started/use-react-in-your-plugin',
          },
          {
            text: '使用Svelte',
            link: '/zh/plugins/getting-started/use-svelte-in-your-plugin',
          },
        ],
      },
      {
        text: '界面',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '关于界面',
            link: '/zh/plugins/user-interface/about-user-interface',
          },
          {
            text: '命令',
            link: '/zh/plugins/user-interface/commands',
          },
          {
            text: '上下文菜单',
            link: '/zh/plugins/user-interface/context-menus',
          },
          {
            text: 'HTML元素',
            link: '/zh/plugins/user-interface/html-elements',
          },
          {
            text: '图标',
            link: '/zh/plugins/user-interface/icons',
          },
          {
            text: '模态框',
            link: '/zh/plugins/user-interface/modals',
          },
          {
            text: '功能区',
            link: '/zh/plugins/user-interface/ribbon-actions',
          },
          {
            text: '设置',
            link: '/zh/plugins/user-interface/settings',
          },
          {
            text: '状态栏',
            link: '/zh/plugins/user-interface/status-bar',
          },
          {
            text: '视图',
            link: '/zh/plugins/user-interface/views',
          },
          {
            text: '工作区',
            link: '/zh/plugins/user-interface/workspace',
          },
        ],
      },
      {
        text: '编辑器',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '编辑器',
            link: '/zh/plugins/editor/editor',
          },
          {
            text: 'Markdown后处理',
            link: '/zh/plugins/editor/markdown-post-processing',
          },
          {
            text: '编辑器扩展',
            link: '/zh/plugins/editor/editor-extensions',
          },
          {
            text: '装饰',
            link: '/zh/plugins/editor/decorations',
          },
          {
            text: '状态字段',
            link: '/zh/plugins/editor/state-fields',
          },
          {
            text: '状态管理',
            link: '/zh/plugins/editor/state-management',
          },
          {
            text: '视图插件',
            link: '/zh/plugins/editor/view-plugins',
          },
          {
            text: '视窗',
            link: '/zh/plugins/editor/viewport',
          },
          {
            text: '编辑器扩展间通信',
            link: '/zh/plugins/editor/communicating-with-editor-extensions',
          },
        ],
      },
      {
        text: '发布',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '使用GitHub Actions发布插件',
            link: '/zh/plugins/releasing/release-your-plugin-with-github-actions',
          },
          {
            text: '提交您的插件',
            link: '/zh/plugins/releasing/submit-your-plugin',
          },
          {
            text: '插件的提交要求',
            link: '/zh/plugins/releasing/submission-requirements-for-plugins',
          },
          {
            text: '插件指南',
            link: '/zh/plugins/releasing/plugin-guidelines',
          },
          {
            text: '测试插件',
            link: '/zh/plugins/releasing/beta-testing-plugins',
          },
        ],
      },
      {
        text: '事件',
        link: '/zh/plugins/events',
      },
      {
        text: '库',
        link: '/zh/plugins/vault',
      },
    ],
  },
  {
    text: '主题',
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: 'App主题',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '构建主题',
            link: '/zh/themes/app-themes/build-a-theme',
          },
          {
            text: '嵌入字体和图像',
            link: '/zh/themes/app-themes/embed-fonts-and-images-in-your-theme',
          },
          {
            text: '使用GitHub Actions发布主题',
            link: '/zh/themes/app-themes/release-your-theme-with-github-actions',
          },
          {
            text: '提交您的主题',
            link: '/zh/themes/app-themes/submit-your-theme',
          },
          {
            text: '主题指南',
            link: '/zh/themes/app-themes/theme-guidelines',
          },
        ],
      },
      {
        text: 'Publish主题',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '关于Publish主题',
            link: '/zh/themes/obsidian-publish-themes/about-obsidian-publish-themes',
          },
          {
            text: '构建Publish主题',
            link: '/zh/themes/obsidian-publish-themes/build-a-publish-theme',
          },
          {
            text: 'Publish主题最佳实践',
            link: '/zh/themes/obsidian-publish-themes/best-pratices-for-publish-themes',
          },
        ],
      },
    ],
  },
  {
    text: '参考',
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: '参考章节翻译说明',
        link: '/zh/reference/reference',
      },
      {
        text: 'manifest.json 配置',
        link: '/zh/reference/manifest',
      },
    ],
  },
  {
    text: 'Liam Cain',
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: '视图',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '持久化视图状态到工作区',
            link: '/zh/articles/liam-cain/view/persistYourView',
          },
          {
            text: '在视图中添加上下文菜单',
            link: '/zh/articles/liam-cain/view/add a custom contextmenu',
          },
          {
            text: '为PDF导出添加兼容性',
            link: '/zh/articles/liam-cain/view/adding compatibility with Save As PDF',
          },
          {
            text: '在侧边栏附加新视图',
            link: '/zh/articles/liam-cain/view/attach a new view to the sidebar',
          },
          {
            text: '创建自定义代码块',
            link: '/zh/articles/liam-cain/view/create a custom code block',
          },
          {
            text: '聚焦笔记标题光标',
            link: '/zh/articles/liam-cain/view/focus the note title with the cursor',
          },
          {
            text: 'Obsidian日历UI',
            link: '/zh/articles/liam-cain/view/obsidian-calendar-ui',
          },
          {
            text: 'Obsidian每日笔记界面',
            link: '/zh/articles/liam-cain/view/obsidian-daily-notes-interface',
          },
        ],
      },
      {
        text: '命令',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '是否可以卸载一条命令？',
            link: '/zh/articles/liam-cain/commands/unloadCommand',
          },
        ],
      },
    ],
  },
  {
    text: 'Typings',
    collapsible: true,
    collapsed: true,
    items: [
      {
        text: '文档介绍：Obsidian 类型定义',
        link: '/zh/articles/typings/index.md',
      },
      {
        text: '快速开始',
        link: '/zh/articles/typings/getting-started',
      },
      {
        text: '导入库，扩展和使用方法',
        link: '/zh/articles/typings/usage',
      },
      {
        text: '教程：添加新的类型定义',
        link: '/zh/articles/typings/adding-new-typings',
      },
      {
        text: '教程：分析源代码',
        link: '/zh/articles/typings/analyzing-source-code',
      },
      {
        text: '教程：调试代码',
        link: '/zh/articles/typings/code-debugging',
      },
      {
        text: '社区资源：Showcase!',
        link: '/zh/articles/typings/showcase',
      },
    ],
  },
  {
    text: '关于本文档',
    link: '/zh/about',
  },
];
