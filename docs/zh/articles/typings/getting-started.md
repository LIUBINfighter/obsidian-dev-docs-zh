---
title: 入门指南
description: 了解如何在 Obsidian 插件中使用 Obsidian Typings。
---

> 原文地址: [Getting Started](https://fevol.github.io/obsidian-typings/getting-started/).

# Obsidian Typings 入门指南

Obsidian Typings 是一个 TypeScript 库，为 Obsidian API 的私有部分提供类型定义。
本项目与 [Obsidian](https://obsidian.md/) 没有官方关联。

> **警告**
> 
> 在使用此包之前，请务必阅读[**免责声明**](https://fevol.github.io/obsidian-typings/disclaimer/)，
> 以了解使用这些类型定义相关的风险，
> 并了解此包适用的对象和项目类型。

## 前提条件

你需要有一个已设置好包管理器和 TypeScript 的插件模板。
如果你还没有，请参照 Obsidian 官方文档中的["构建插件"](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)指南来创建一个。

## 安装

1. **安装**
   
   Obsidian Typings 是一个 [NPM 包](https://www.npmjs.com/package/obsidian-typings)，你可以使用你喜欢的包管理器安装：

   ```bash
   # 使用 npm
   npm install -D obsidian-typings

   # 使用 yarn
   yarn add -D obsidian-typings

   # 使用 pnpm
   pnpm add -D obsidian-typings

   # 使用 bun
   bun add -D obsidian-typings
   ```

2. **在 `tsconfig.json` 中添加 `obsidian-typings` 到 `types`**（_推荐_）
   
   通过 `tsconfig.json` 文件将 `obsidian-typings` 的类型注册到你的项目中。

   ```diff
   // tsconfig.json
   {
       "compilerOptions": {
           "...": "...",
   +       "types": [
   +           "obsidian-typings"
   +       ]
       }
   }
   ```

   > **注意**
   > 
   > 如果你在 `tsconfig.json` 中添加了 `types` 字段，而 `@types/some-package-name` 不再被识别，你可能需要将它重新添加到 `types` 中：
   > ```diff
   > // tsconfig.json
   > {
   >     "compilerOptions": {
   >         "...": "...",
   >         "types": [
   >             "obsidian-typings",
   > +           "some-package-name"
   >         ]
   >     }
   > }
   > ```

3. **显式类型导入**
   
   如果你不想将 `obsidian-typings` 添加到你的 `types` 中，你也可以在任何项目文件中添加 `import 'obsidian-typings';`。

4. **使用 `obsidian-typings/implementations`**
   
   根据你的项目设置，`import { X } from 'obsidian-typings/implementations';` 可能无法直接使用，例如，如果你在 `tsconfig.json` 中设置了 `"moduleResolution": "node"` 或 `"node10"`。

   要解决这个问题，你可以在 `tsconfig.json` 中添加以下内容：

   ```diff
   // tsconfig.json
   {
       "compilerOptions": {
           "...": "...",
           "paths": {
   +           "obsidian-typings/implementations": [
   +               "./node_modules/obsidian-typings/dist/implementations.d.ts",
   +               "./node_modules/obsidian-typings/dist/implementations.cjs"
   +           ]
           }
       }
   }
   ```

就是这样！现在类型定义应该可以在你的项目中访问了。