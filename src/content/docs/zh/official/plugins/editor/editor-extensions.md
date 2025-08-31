---
title: Editor Extensions
description: 关于 Editor Extensions 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 编辑器扩展

---

编辑器扩展可让您在Obsidian 中自定义编辑笔记的体验。本页解释了什么是编辑器扩展，以及何时使用。

Obsidian Markdown 编辑器底层使用的 CodeMirror 6 (CM6) 。与 Obsidian 一样，CM6 也有自己的插件，称为扩展。换句话说， Obsidian 的编辑器扩展与 CodeMirror 6 的扩展相同。

用于构建编辑器扩展的 API 有些不合常规，需要在开始之前对其架构有基本的了解。本节旨在为你提供足够的上下文信息和示例，以便你上手。如果想了解更多有关构建编辑器扩展的信息，请参阅 [CodeMirror 6 documentation](https://codemirror.net/docs/)。

## 我是否一定需要扩展编辑器？

创建编辑器扩展具有一定挑战性，因此在开始创建之前，请先考虑您是否真的需要它。

- 如果想改变阅读视图中，将 Markdown 转换为 HTML 的方式，可以考虑创建一个 [Markdown后处理](./markdown-post-processing.md)。
- 如果要更改文档在实时预览中的外观和感觉，就需要创建一个编辑器扩展。

## 注册编辑器扩展

CodeMirror 6 (CM6) is a powerful engine for editing code using web technologies. At its core, the editor itself has a minimal set of features. Any features you'd expect from a modern editor are available as *extensions* that you can pick and choose. While Obsidian comes with many of these extensions out-of-the-box, you can also register your own.  
CodeMirror 6（CM6）是一个功能强大的引擎，用于使用web技术编辑代码。其核心是编辑器的最小功能集。现代编辑器的任何功能都可以自由选择扩展来获得。Obsidian 附带许多开箱即用的扩展，您也可以注册自己的扩展。

要注册编辑器扩展，请在Obsidian 插件的 `onload` 方法中使用 [registerEditorExtension()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerEditorExtension) ：

```ts
onload() {
  this.registerEditorExtension([examplePlugin, exampleField]);
}
```

CM6 支持多种类型的扩展，其中最常见的两种是 [View plugins](https://docs.obsidian.md/Plugins/Editor/View+plugins) 和 [State fields](https://docs.obsidian.md/Plugins/Editor/State+fields) 。
