---
title: Viewport
description: 关于 Viewport 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 视窗

---

Obsidian编辑器支持数百万行的[庞大文档](https://codemirror.net/examples/million/)。之所以能够做到这一点，原因之一是因为编辑器只渲染可见的内容（略微超出）。

想象一下，您要编辑一个太大而无法完全展示在显示器上的文档。Obsidian编辑器创建一个在文档中移动的“窗口”，只呈现窗口内的内容（并忽略外部的内容）。此窗口称为编辑器的视口。
![](../../../../public/images/viewport.svg)

每当用户滚动浏览文档时，或者当文档本身发生更改时，视窗就会过期，需要重新计算。

如果要构建依赖于视窗的编辑器扩展，请参阅[视图插件](./view-plugins.md)。

> [!NOTE]
>
> 本节旨在为Obsidian插件开发人员提炼 CodeMirror 6 的官方文档。有关状态管理的更多信息，请参阅[Viewport](https://codemirror.net/docs/guide/#viewport)。
