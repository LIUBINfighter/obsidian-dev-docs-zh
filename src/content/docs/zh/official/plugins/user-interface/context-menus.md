---
title: Context Menus
description: 关于 Context Menus 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 上下文菜单

---

如果要打开上下文菜单，请使用 [Menu](https://docs.obsidian.md/Reference/TypeScript+API/Menu)：

```ts
import { Menu, Notice, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('dice', 'Open menu', (event) => {
      const menu = new Menu();

      menu.addItem((item) =>
        item
          .setTitle('Copy')
          .setIcon('documents')
          .onClick(() => {
            new Notice('Copied');
          }),
      );

      menu.addItem((item) =>
        item
          .setTitle('Paste')
          .setIcon('paste')
          .onClick(() => {
            new Notice('Pasted');
          }),
      );

      menu.showAtMouseEvent(event);
    });
  }
}
```

[showAtMouseEvent()](https://docs.obsidian.md/Reference/TypeScript+API/Menu/showAtMouseEvent) 会打开鼠标点击处的菜单。

> [!TIP]
> 如果需要对菜单显示的位置进行更多控制，可以使用 `menu.showAtPosition({ x: 20, y: 20 })` 在Obsidian窗口左上角的相对位置打开菜单。

有关可以使用哪些图标的更多信息，请参阅 [Icons](https://docs.obsidian.md/Plugins/User+interface/Icons)。

您还可以通过订阅 `file-menu` 和 `editor-menu` 工作区事件，在文件菜单或编辑器菜单中添加项目：
![](../../../../public/images/上下文菜单.png)

```ts
import { Notice, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        menu.addItem((item) => {
          item
            .setTitle('Print file path 👈')
            .setIcon('document')
            .onClick(async () => {
              new Notice(file.path);
            });
        });
      }),
    );

    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor, view) => {
        menu.addItem((item) => {
          item
            .setTitle('Print file path 👈')
            .setIcon('document')
            .onClick(async () => {
              new Notice(view.file.path);
            });
        });
      }),
    );
  }
}
```

有关处理事件的更多信息，请参阅 [Events](https://docs.obsidian.md/Plugins/Events)事件。
