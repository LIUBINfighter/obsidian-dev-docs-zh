<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Jay Bridge
 * @LastEditTime: 2025-03-17 22:13:00
 * @Description:
-->

# Obsidian 开发者中文文档

> 2025年5月28日更新，为了适配Deepwiki我加入了原版仓库文档[en](https://github.com/obsidianmd/obsidian-developer-docs)，你现在可以在[这个](https://deepwiki.com/LIUBINfighter/obsidian-dev-docs-zh)网址直接询问仓库内的文档内容。

官方文档翻译的入口请看： [Home](/zh/home)

| Docs                                                                                                 | Github Repo                                                                                                                         |             |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [Raistlind翻译的开发者文档 (raistlind.github.io)](https://raistlind.github.io/obsidian-dev-docs-zh/) | [Raistlind/obsidian-dev-docs-zh](https://github.com/Raistlind/obsidian-dev-docs-zh)                                                 | 1 year ago  |
| [luhuafeng666翻译的插件文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)                | [luhaifeng666/obsidian-plugin-docs-zh: Obsidian 插件开发文档 (github.com)](https://github.com/luhaifeng666/obsidian-plugin-docs-zh) | 2 years ago |

## 免责申明 Disclaim

::: warning 译者免责声明
本文档不正式隶属于 Obsidian 团队，也未得到 Obsidian 团队的认可。

本 Fork 目前的维护者和[原始项目的创建者](https://github.com/Raistlind/obsidian-dev-docs-zh)目前也并无任何正式关系。

内容翻译自官方文档以及社区文档。译者的翻译也可能有错误，在开发中请自行决定是否查看英文原文或者寻求其他帮助。译者不对因为内容翻译准确性以及及时性导致的后果承担责任。

随着 Obsidian 的更新，请留意相关的API更改，以官方文档为准，在适当的时候更新代码。

如果涉及到版权相关内容，请联系我。
:::

## 前言

本项目Fork From [Raistlind/obsidian-dev-docs-zh](https://github.com/Raistlind/obsidian-dev-docs-zh)。

由[LIUBINfighter (Jay Bridge) (github.com)](https://github.com/LIUBINfighter)持续维护。

使用vitepress构建:[![npm](https://img.shields.io/npm/v/vitepress)](https://www.npmjs.com/package/vitepress)

本 README 后面的网址都是可以参考的。我也会根据我自己开发的需要逐步翻译和添加自己的内容。

Obsidian开发一般指 **Theme(主题)** 和 **Plugin(插件)** 开发。这也会是本文档关注的主要内容。

希望能成为更新快，内容丰富的中文文档。对于不能及时更新的部分，提供充足的资源整合导航。

我会按照我的想法组织内容，可能和官方文档的方式存在出入。对于 Raistlind 和 luhuafeng666 两位前辈已翻译的部分，我不会进行删改，只会进行增量式的补充和链接引用。

写作规范 [文档规范 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E5%8A%A9%E5%8A%9B+Obsidian/%E6%96%87%E6%A1%A3%E8%A7%84%E8%8C%83)

> 天哪我真的好爱写文档。

## 工作方式

我会在学习相关技术和源码的同时进行翻译和文档撰写工作。

官方文档翻译将会保持原来的结构（插件 主题 参考 三部分）。

社区文档和我的文章将会另外单列出来。同时会引用原来[luhuafeng666翻译的插件文档](https://luhaifeng666.github.io/obsidian-plugin-docs-zh/)的内容以及其他网络内容。

对于未能及时翻译的部分，请查看下面列出的网址。

## 官方文档和社区内容

网址主要有以下分类：

1.文档 2.文档Repo 3.开发Repo 4.资源聚合网站 5.论坛和新闻

为什么这么分类？如果是文档Repo的话意味着你可以本地进行RAG（我正在开发的一个插件的灵感），甚至很方便的加入 MCP 。

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

| PKMer | [Pkmer (github.com)](https://github.com/PKM-er)                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------------------- |
|       | [PKM-er/awesome-obsidian-zh: Obsidian 优秀中文插件、主题与资源 (github.com)](https://github.com/PKM-er/awesome-obsidian-zh) |

## 信息流

新闻和社区动态

| GitHub Topics | [obsidian-md · GitHub Topics](https://github.com/topics/obsidian-md)                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| GitHub Topics | [obsidian-plugin · GitHub Topics](https://github.com/topics/obsidian-plugin)                             |
|               |                                                                                                          |
| Forum         | [Latest Developers: Plugin & API topics - Obsidian Forum](https://forum.obsidian.md/c/developers-api/14) |
| Forum         | [Latest Share & showcase topics - Obsidian Forum](https://forum.obsidian.md/c/share-showcase/9)          |
| Forum-zh      | [最新开发讨论话题 - Obsidian 中文论坛](https://forum-zh.obsidian.md/c/9-category/9)                      |

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

## 贡献者

Issue和Pr都欢迎。接受网站/博客推荐，插件推荐（帮助解析一下原理），插件开发的奇思妙想都可以。

最后，让我们重温[Obsidian官方宣言](https://obsidian.md/about)，让我们的插件为Obsidian和她的用户赋能。
<VPTeamMembers align="center" size="small" :members="members" />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/raistlind.png',
    name: 'Raistlind',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/raistlind' }
    ]
  },
    {
    avatar: 'https://github.com/LIUBINfighter.png',
    name: 'Jay Bridge',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/LIUBINfighter/' }
    ]
  },
]
</script>
