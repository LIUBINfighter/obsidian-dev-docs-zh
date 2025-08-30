<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: JayBridge huajie8848@foxmailcom
 * @LastEditTime: 2025-03-07
 * @Description:  持续更新
-->

> 一入`Obsidian`深似海，从此入坑前端+AI

> 2025年5月28日更新，为了适配Deepwiki我加入了原版仓库文档[en](https://github.com/obsidianmd/obsidian-developer-docs)，你现在可以直接点击[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/LIUBINfighter/obsidian-dev-docs-zh)询问仓库内的文档内容。

# Obsidian 开发者中文文档

| Docs                                                                                                 | Github Repo                                                                                                                         |             |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [luhaifeng666翻译的插件文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)                | [luhaifeng666/obsidian-plugin-docs-zh: Obsidian 插件开发文档 (github.com)](https://github.com/luhaifeng666/obsidian-plugin-docs-zh) | 2 years ago |
| [Raistlind翻译的开发者文档 (raistlind.github.io)](https://raistlind.github.io/obsidian-dev-docs-zh/) | [Raistlind/obsidian-dev-docs-zh](https://github.com/Raistlind/obsidian-dev-docs-zh)                                                 | 1 year ago  |

## 📚 文档导航

| 文档类型        | 链接                                                                                                       | 说明                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 📖 **开发指南** | [DEVELOPMENT.md](./DEVELOPMENT.md)                                                                         | 完整的项目开发指南，包含环境搭建、代码规范、翻译流程等 |
| 🌐 **在线文档** | [liubinfighter.github.io](https://liubinfighter.github.io/obsidian-dev-docs-zh/)                           | 构建后的在线文档站点                                   |
| 🤖 **AI 问答**  | [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/LIUBINfighter/obsidian-dev-docs-zh) | 使用 AI 询问仓库内文档内容                             |

## 前言

本项目Fork From [Raistlind/obsidian-dev-docs-zh](https://github.com/Raistlind/obsidian-dev-docs-zh).

使用vitepress构建:[![npm](https://img.shields.io/npm/v/vitepress)](https://www.npmjs.com/package/vitepress)

本 README 后面的网址都是可以参考的。我也会根据我自己开发的需要逐步翻译和添加自己的内容。

Obsidian开发一般指 **Theme(主题)** 和 **Plugin(插件)** 开发。这也会是本文档关注的主要内容。

希望能成为更新快，内容丰富的中文文档。对于不能及时更新的部分，提供充足的资源整合导航。

我会按照我的想法组织内容，可能和官方文档的方式存在出入。对于 Raistlind 和 luhaifeng666 两位前辈已翻译的部分，我不会进行删改，只会进行增量式的补充和链接引用。

写作规范 [文档规范 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E5%8A%A9%E5%8A%9B+Obsidian/%E6%96%87%E6%A1%A3%E8%A7%84%E8%8C%83)

> 天哪我真的好爱写文档。

## 工作方式

我会在学习相关技术和源码的同时进行翻译和文档撰写工作。

官方文档翻译将会保持原来的结构（插件 主题 参考 三部分）。

社区文档和我的文章将会另外单列出来。同时会引用原来[luhaifeng666翻译的插件文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)的内容以及其他网络内容。

> 2025-03-07 补充：正在致力于阅读与翻译 [liamca](https://liamca.in/hello)。作为一名经验丰富的开发者和插件审查者，他的文档非常有价值。

对于未能及时翻译的部分，请查看下面列出的网址。

## 官方文档和社区内容

网址主要有以下分类：

1.文档 2.文档Repo 3.开发Repo 4.资源聚合网站 5.论坛和新闻

为什么这么分类？如果是文档Repo的话意味着你可以本地进行RAG（我正在开发的一个插件的灵感）。

## Obsidian基础官方教程

| 官中帮助 | https://publish.obsidian.md/help-zh/            |
| -------- | ----------------------------------------------- |
| 官英帮助 | https://help.obsidian.md/                       |
| Repo     | https://github.com/obsidianmd/obsidian-help<br> |

## Obsidian开发者官方文档

| Obsidian             |                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 模板仓库，一切的开始 | [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)                                                    |
| 开发文档             | [Developer Documentation (obsidian.md)](https://docs.obsidian.md/Home)                                                            |
| 开发文档仓库(.md)    | [obsidianmd/obsidian-developer-docs](https://github.com/obsidianmd/obsidian-developer-docs)<br>                                   |
| 官方API文档          | [obsidianmd/obsidian-api: Type definitions for the latest Obsidian API. (github.com)](https://github.com/obsidianmd/obsidian-api) |
|                      |                                                                                                                                   |
| Github               | [Obsidian.md (github.com)](https://github.com/obsidianmd)                                                                         |
| Blog                 | [Obsidian Blog - Obsidian](https://obsidian.md/blog/)                                                                             |
| Roadmap              | [Obsidian Roadmap - Obsidian](https://obsidian.md/roadmap/)                                                                       |

## Obsidian Community Hub 社区导航

由社区搭建的资源聚合网站，内容丰富。

| Obsidian Community | [Obsidian Community (github.com)](https://github.com/obsidian-community)                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hub内容导航        | [00 - Start here - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/00+-+Start+here)<br>                                                                                                  |
| 插件开发起点       | [for Plugin Developers - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Plugin+Developers)<br>                                              |
| 社区拓展一览       | [🗂️ 02 - Community Expansions - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/02+-+Community+Expansions/%F0%9F%97%82%EF%B8%8F+02+-+Community+Expansions)                               |
| 社区插件分类       | [🗂️ 02.01 Plugins by Category - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/02+-+Community+Expansions/02.01+Plugins+by+Category/%F0%9F%97%82%EF%B8%8F+02.01+Plugins+by+Category)<br> |
|                    |                                                                                                                                                                                                           |

| PKMer | [Pkmer (github.com)](https://github.com/PKM-er)                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------------------- |
|       | [PKM-er/awesome-obsidian-zh: Obsidian 优秀中文插件、主题与资源 (github.com)](https://github.com/PKM-er/awesome-obsidian-zh) |

## 信息流

新闻和社区动态

| GitHub Topics | [obsidian-md · GitHub Topics](https://github.com/topics/obsidian-md)                                     |     |
| ------------- | -------------------------------------------------------------------------------------------------------- | --- |
| GitHub Topics | [obsidian-plugin · GitHub Topics](https://github.com/topics/obsidian-plugin)                             |     |
|               |                                                                                                          |     |
| Forum         | [Latest Developers: Plugin & API topics - Obsidian Forum](https://forum.obsidian.md/c/developers-api/14) |     |
| Forum         | [Latest Share & showcase topics - Obsidian Forum](https://forum.obsidian.md/c/share-showcase/9)          |     |
| Forum-zh      | [最新开发讨论话题 - Obsidian 中文论坛](https://forum-zh.obsidian.md/c/9-category/9)                      |     |
|               |                                                                                                          |     |

## 视频教程

| Youtube                                                                            | By                                                                         | Update      |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- |
| [Create Your Own Obsidian Plugin](https://www.youtube.com/watch?v=9lA-jaMNS0k)     | [Antone Heyward](https://www.youtube.com/channel/UC9w43btR2UUsfR6ZUf3AlqQ) | 4 years ago |
| [How to create a plugin for Obsidian](https://www.youtube.com/watch?v=XaES2G3PVpg) | [@phibr0](https://github.com/phibr0)                                       | 3 years ago |

## 个人开发者分享

教程，工作流。可能有重复。欢迎自荐互荐。

| Author                          | Url                                                                                | 构建工具 |
| ------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| Hananoshika Yomaru              | [Obsidian Plugin 101 - Hananoshika Yomaru](https://yomaru.dev/obsidian-plugin-101) | bun      |
| [Liam Cain](https://liamca.in/) | [Unofficial API FAQ](https://liamca.in/Obsidian/API+FAQ/index)                     |          |

## Easy Start （Sample Plugin）

只实现了简单功能的样例插件，如果只想接触一两个功能可以参考。

**[michaeljohnn/obsidian-textfileview-plugin-sample](https://github.com/michaeljohnn/obsidian-textfileview-plugin-sample)** 2years ago

一个开发自定义 Obsidian TextFileView 插件的示例，包括自定义 TextFileView、文件操作、自动保存、卸载处理、SASS 以及其他所需代码逻辑。

其余我就不在此列举了。github 搜索关键词：`obsidian-vue-starter` `obsidian-react-starter` 等。

## 开发工具

| Url                                                                                                                                           | Update      |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [Obsidian Tools](https://github.com/obsidian-tools/obsidian-tools)                                                                            | Last Week   |
| [开发者工具Obsidian 插件开发文档 (luhaifeng666.github.io)](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/zh2.0/developer-tools.html) | 2 years ago |

### 批量获取上架插件的源码仓库

- 我用过的（最新）：[konhi/obsidian-repositories-downloader](https://github.com/konhi/obsidian-repositories-downloader)
  - 📦 learn, analyze and inspire from every obsidian.md plugin!
  - 截至2025年3月7日，可供下载的插件有2258个，总大小为7.2G。
  - 下载巨慢，不推荐。另外7G的仓库过于巨大，建议另外找学习方案。
- 没用过：[luckman212/obsidian-plugin-downloader](https://github.com/luckman212/obsidian-plugin-downloader)
- 没用过：[claremacrae/obsidian-repos-downloader](https://github.com/claremacrae/obsidian-repos-downloader)

## 进阶开发选项

对于具体插件的优秀实现解析我会放到文档里。

### API 文档一览

| 官方API                         | [obsidianmd/obsidian-api: Type definitions for the latest Obsidian API. (github.com)](https://github.com/obsidianmd/obsidian-api)                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 参考文档                        | [AbstractTextComponent \| Obsidian 插件开发文档 (luhaifeng666.github.io)](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/zh2.0/reference/typescript/classes/AbstractTextComponent.html) |
| [Liam Cain](https://liamca.in/) | [Unofficial API FAQ](https://liamca.in/Obsidian/API+FAQ/index)（未汉化）                                                                                                                        |

### 社区库

[obsidian-community/obsidian-community-lib: An npm package of commonly used Obsidian plugin utilities. (github.com)](https://github.com/obsidian-community/obsidian-community-lib)

[obsidian-community-lib](https://obsidian-community.github.io/obsidian-community-lib/)

### Canvas 白板

[obsidianmd/jsoncanvas: An open file format for infinite canvas data. (github.com)](https://github.com/obsidianmd/jsoncanvas)

[JSON Canvas — An open file format for infinite canvas data.](https://jsoncanvas.org/)

### 编辑器 CodeMirror 6

- [Getting Started with CodeMirror 6](https://github.com/nothingislost/obsidian-cm6-attributes#getting-started-with-codemirror-6) by [NothingIsLost](https://github.com/nothingislost) 4 years

### 其他可能需要参考的技术栈

[贡献者 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/Obsidian/%E8%B4%A1%E7%8C%AE%E8%80%85)文中罗列了Obsidian开发相关的代码仓库。

### 在正文没有开始更新前的碎碎念

Vue开发可参考 [Vue | Obsidian 插件开发文档 (luhaifeng666.github.io)](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/zh2.0/getting-started/vue.html)。 但是！Vue开发的坑超级大，而且样式不易与obsidian兼容。总之这些虽然能修复但是太心累，参考优秀的 Kanban 插件，React 足够...

收录： [PKmer Obsidian 插件开发](https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E5%BC%80%E5%8F%91/obsidian%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/)

## 贡献

Issue和Pr都欢迎。接受网站/博客推荐，插件推荐（帮助解析一下原理），插件开发的奇思妙想都可以。

最后，让我们重温[Obsidian官方宣言](https://obsidian.md/about)，让我们的插件为Obsidian和她的用户赋能。

<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:


# Obsidian 开发者文档

本项目使用vitepress构建:

[![npm](https://img.shields.io/npm/v/vitepress)](https://www.npmjs.com/package/vitepress)


本文档翻译自[Obsidian官方开发者文档](https://docs.obsidian.md/Home)。

起初是因为受第二大脑方法论影响，在Obsidian里积累了不少文章，想通过插件自动发布到我的网站上。

学习插件开发的过程中，发现网络上的中文开发文档挺分散，比较全面的是[luhaifeng666翻译的插件文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)。但可惜的是因为原文作者停止维护（猜测可能是合入了Obsidian官方的文档中），luhaifeng666的项目目前也已归档，于是就缺少了最新的中文资料。

此间，Obsidian也正式在官网上提供了开发者文档，补充完善了许多原理性的说明和例子，于是产生了顺便翻译一下的打算。因此产生了这个项目。

此项目主要用于个人学习，同时也希望分享出来对其它同学有所帮助。由于本人能力有限，如有翻译不当之处还请谅解。方便的话可以在github上提issue告知我修正。

感谢大家的支持！

## 本项目主要参考资源

[官文文档](https://docs.obsidian.md/Home)

[luhaifeng666插件开发文档](https://github.com/luhaifeng666/obsidian-plugin-docs-zh/blob/master/README.md)（新的Obsidian官方文档中去掉了使用Vue的例子在此项目中查阅）

-->
