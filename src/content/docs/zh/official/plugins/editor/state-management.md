---
title: State Management
description: 关于 State Management 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 状态管理

---

本节旨在介绍[编辑器扩展](./editor-extensions.md)的状态管理。

> [!NOTE]
>
> 本页旨在为Obsidian插件开发人员提炼 CodeMirror 6 的官方文档。有关状态管理的更多详细信息，请参阅 [State and Updates](https://codemirror.net/docs/guide/#state-and-updates)。

## 状态更改

在大多数应用程序中，通常通过为属性或变量分配新值来更新状态。然后旧值将被替代。

```ts
let note = '';
note = 'Heading';
note = '# Heading';
note = '## Heading'; // How to undo this?
```

为了支持撤消和重做对用户工作区的更改等功能，Obsidian会保留已进行的所有更改的历史记录。若要撤消更改，可以返回到进行更改之前的某个时间点。

|     | 状态字段           |
| --- | ------------------ |
| 0   |                    |
| 1   | Heading 标题       |
| 2   | # Heading # 标题   |
| 3   | ## Heading ## 标题 |

在 TypeScript 中，你会得到这样的结果：

```ts
const changes: ChangeSpec[] = [];

changes.push({ from: 0, insert: 'Heading' });
changes.push({ from: 0, insert: '# ' });
changes.push({ from: 0, insert: '#' });
```

## 事务

Imagine a feature where you select some text and press the double quote, `"` to surround the selection with quotes on both sides. One way to implement the feature would be to:  
想象一下，您选择一些文本并按下双引号， `"` 以用引号将选择的两边都括起来。实现该功能的一种方法是：

1. 在所选内容的开头插入 `"` 。
2. 在所选内容的结尾插入 `"`。

请注意，该实现由两个状态更改组成。如果将这些内容添加到撤消历史记录中，则用户需要撤消两次，每个双引号撤消一次。为了避免这种情况，如果您可以将这些更改分组，使它们显示为一个，会怎么样？

对于编辑器扩展，一起发生的一组状态更改称为事务。

如果将到目前为止所学的知识结合起来，并且允许仅包含单个状态更改的事务，则可以将状态视为事务历史记录。

将所有这些结合在一起，在编辑器扩展中实现之前的环绕特性，以下是向编辑器视图添加或分派事务的方法：

```ts
view.dispatch({
  changes: [
    { from: selectionStart, insert: `"` },
    { from: selectionEnd, insert: `"` },
  ],
});
```

## 下一步

在本节，您了解了如何将状态建模为一系列状态更改，以及如何将它们分组到事务中。

要了解如何在编辑器中管理自定义状态，请参阅[状态字段](./state-fields.md)。
