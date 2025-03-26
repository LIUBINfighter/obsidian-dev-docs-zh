---
title: "add a custom contextmenu"
source: "https://liamca.in/Obsidian/API+FAQ/views/add+a+custom+contextmenu"
created: 2025-03-26
tags:
  - "clippings"
---
## 如何为我的视图添加上下文菜单？

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## 文件感知型上下文菜单

如果你要为你的视图添加上下文菜单，你可以在 [Workspace](https://liamca.in/Obsidian/Workspace) 上触发 `file-menu` 事件。

触发 `file-menu` 意味着所有监听 `file-menu` 事件的插件都有机会在菜单通过 `.showAtPosition()` 显示之前向列表追加 `MenuItem`。默认情况下，这会添加一些文件相关的选项，比如"复制链接"、"在文件管理器中显示"等。其他插件也可以监听这个事件并添加它们自己的条目。

### 示例代码

```ts
const fileMenu = new Menu(); // Creates empty file menu

// hook for plugins to populate menu with "file-aware" menu items 
this.app.workspace.trigger(
  "file-menu", 
  fileMenu, 
  file, 
  "my-context-menu", 
  null
);

fileMenu.showAtPosition({ x: event.pageX, y: event.pageY }); // Actually open the menu
```

## 完全自定义的上下文菜单

如果你不想在上下文菜单中包含这些条目，只需不触发 `file-menu` 事件，而是添加你自己的 `MenuItem`。

### 示例代码

```ts
const myMenu = new Menu();
  myMenu.addItem((item) =>
    item
      .setTitle("My Custom Action")
      .setIcon("trash")
      .onClick(() => {
        myCustomFunction();
      })
  );
```
