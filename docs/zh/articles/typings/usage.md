---
title: 导入库，扩展和使用方法
description: 了解如何在你的项目中导入和使用该库。
---

# 导入库，扩展和使用方法

> 原文链接：[Usage](https://fevol.github.io/obsidian-typings/usage/)

在本页面中，你可以找到如何在项目中导入和使用该库的相关信息。

## 访问类型

### 从 `obsidian` 导入

如果你想从 `obsidian` 模块访问类型，导入语法保持不变：

```ts
import { App } from 'obsidian';

function printInternalPlugins(app: App): void {
  console.log(app.internalPlugins);
}
```

### 从 `obsidian-typings` 导入

此包添加的额外接口（在官方 API 中没有文档记录的）可以通过以下方式导入：

```ts
import { InternalPlugins } from 'obsidian-typings';

const internalPlugins: InternalPlugins = this.app.internalPlugins;
```

### 扩展你自己的类型定义

如果你需要用自己的类型扩展此包提供的类型定义，
在你项目中的任何 `.d.ts` 文件中添加以下内容：

```ts
// 这是一个非常重要的行。
// 如果你没有其他顶级的 `import/export` 语句，
//      下面列出的类型定义将无法按预期工作。
export {};
declare module 'obsidian-typings' {
  interface PluginsPluginsRecord {
    myPlugin: MyPlugin;
  }
}
```

## 使用实现

### 通过 `obsidian-typings/implementations`

此包添加的额外辅助函数/类型/... 可以通过从 `obsidian-typings/implementations` 导入来添加：

```ts
import { InternalPluginName } from 'obsidian-typings/implementations';

this.app.internalPlugins.getEnabledPluginById(InternalPluginName.FileExplorer);
```

（所有可用实现的列表可以在 [implementations](https://github.com/Fevol/obsidian-typings/tree/main/src/implementations) 文件夹中找到。）
