---
title: Ribbon Actions
description: 关于 Ribbon Actions 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 功能区

---

Obsidian界面左侧的边栏是功能区。除了系统操作（如打开首选项或另一个库）外，功能区还可以提供插件定义的操作。

要在功能区中添加操作，请使用 [addRibbonIcon()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/addRibbonIcon) 方法：

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('dice', 'Print to console', () => {
      console.log('Hello, you!');
    });
  }
}
```

第一个参数指定要使用的图标。有关可用图标的更多信息，以及如何添加自己的图标，请参阅 [Icons](https://docs.obsidian.md/Plugins/User+interface/Icons) 图标。
