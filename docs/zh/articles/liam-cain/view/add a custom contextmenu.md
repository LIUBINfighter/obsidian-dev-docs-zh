---
title: "添加自定义上下文菜单"
source: "https://liamca.in/Obsidian/API+FAQ/views/add+a+custom+contextmenu"
created: 2025-03-26
tags:
  - "clippings"
---
# 如何为视图添加上下文菜单？

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## 文件感知型上下文菜单

如果要为视图添加上下文菜单，可以在[Workspace](https://liamca.in/Obsidian/Workspace)上触发`file-menu`事件。

触发`file-menu`意味着所有监听该事件的插件都有机会在菜单通过`.showAtPosition()`显示前添加`MenuItem`。默认情况下，这会添加一些文件相关选项，如"复制链接"、"在文件管理器中显示"等。其他插件也可以监听此事件并添加自己的条目。

### 示例代码

```ts
const fileMenu = new Menu(); // 创建空文件菜单

// 钩子函数让插件可以添加"文件感知"菜单项
this.app.workspace.trigger(
  "file-menu", 
  fileMenu, 
  file, 
  "my-context-menu", 
  null
);

fileMenu.showAtPosition({ x: event.pageX, y: event.pageY }); // 实际打开菜单
```

## 完全自定义的上下文菜单

如果不想在上下文菜单中包含这些默认条目，可以不触发`file-menu`事件，而是直接添加自己的`MenuItem`。

### 示例代码

```ts
const myMenu = new Menu();
  myMenu.addItem((item) =>
    item
      .setTitle("我的自定义操作")
      .setIcon("trash")
      .onClick(() => {
        myCustomFunction();
      })
  );
