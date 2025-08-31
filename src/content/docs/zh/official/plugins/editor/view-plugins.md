---
title: View Plugins
description: 关于 View Plugins 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 视图插件

---

视图插件是一个[编辑器扩展](./editor-extensions.md)，可让您访问编辑器视窗。

> [!NOTE]
>
> 本节旨在为Obsidian插件开发人员提炼 CodeMirror 6 的官方文档。有关状态管理的更多信息，请参阅[Affecting the View](https://codemirror.net/docs/guide/#affecting-the-view)。

## 先决条件

- 基本了解[视窗](./viewport.md)。

## 创建视图插件

View plugins are editor extensions that run *after* the viewport has been recomputed. While this means that they can access the viewport, it also means that a view plugin can't make any changes that would impact the viewport. For example, by inserting blocks or line breaks into the document.  
视图插件是在重新计算视窗后执行的编辑器扩展。视图插件可以访问视窗，但不能对视窗执行产生影响的更改。例如，通过在文档中插入块或换行符。

> [!NOTE]
>
> 如果要进行影响编辑器垂直布局的更改（例如插入块和换行符），则需要使用[状态字段](./state-fields.md)。

要创建视图插件，请创建一个实现 PluginValue 的类，并将其传递给 [ViewPlugin.fromClass()](https://codemirror.net/docs/ref/#view.ViewPlugin%5EfromClass)  函数。

```ts
import {
  ViewUpdate,
  PluginValue,
  EditorView,
  ViewPlugin,
} from '@codemirror/view';

class ExamplePlugin implements PluginValue {
  constructor(view: EditorView) {
    // ...
  }

  update(update: ViewUpdate) {
    // ...
  }

  destroy() {
    // ...
  }
}

export const examplePlugin = ViewPlugin.fromClass(ExamplePlugin);
```

视图插件有三种方法控制其生命周期：

- `constructor()` 初始化插件。
- `update()` 当某些内容发生变化时，例如当用户输入或选择某些文本时，会更新您的插件。
- `destroy()` 插件卸载时的清理。

虽然示例中的视图插件有效，但它并没有做太多事情。如果您想更好地了解导致插件更新的原因，可以在方法中 `update()` 添加 `console.log(update);` 以将所有更新打印到控制台。

## 下一步

从您的视图插件提供[装饰](./decorations.md)以更改文档的显示方式。
