---
title: Events
description: 关于 Events 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 事件

---

Obsidian中的许多接口允许您订阅整个应用程序中的事件，例如，用户对文件进行更改。

每当插件卸载时，都需要分离已注册的事件处理程序。最安全方法是使用 [registerEvent()](https://docs.obsidian.md/Reference/TypeScript+API/Component/registerEvent)  方法。

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.vault.on('create', () => {
        console.log('a new file has entered the arena');
      }),
    );
  }
}
```

## 定时事件

如果要重复调用具有固定延迟的函数，请将 [`window.setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)  函数与  [registerInterval()](https://docs.obsidian.md/Reference/TypeScript+API/Component/registerInterval)  方法一起使用。

以下示例在状态栏中显示当前时间，每秒更新一次：

```ts
import { moment, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  statusBar: HTMLElement;

  async onload() {
    this.statusBar = this.addStatusBarItem();

    this.updateStatusBar();

    this.registerInterval(
      window.setInterval(() => this.updateStatusBar(), 1000),
    );
  }

  updateStatusBar() {
    this.statusBar.setText(moment().format('H:mm:ss'));
  }
}
```

> [!tip] 日期和时间
>
> [Moment](https://momentjs.com/)  是一个流行的 JavaScript 库，用于处理日期和时间。Obsidian内部使用 Moment，因此您无需自行安装。您可以改为从 Obsidian API 导入它：

```ts
import { moment } from 'obsidian';
```
