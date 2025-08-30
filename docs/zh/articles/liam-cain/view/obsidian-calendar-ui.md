---
title: 'obsidian-calendar-ui'
source: 'https://liamca.in/Obsidian/Packages/obsidian-calendar-ui'
created: 2025-03-26
tags:
  - 'clippings'
---

# calendar-ui

[Repo](https://github.com/liamcain/obsidian-calendar-ui)

我将[Calendar](https://liamca.in/Obsidian/Plugins/Calendar)插件的视图提取成了独立的包。如果你需要在插件中嵌入日历组件，可以轻松地直接使用calendar-ui包。

该视图使用Svelte构建和编译；但这并不意味着你的插件需要使用Svelte才能使用`calendar-ui`。你可以像使用普通JS类一样实例化这个视图（因为它就是！）。它可以像这样附加到任意DOM元素：

```ts
this.calendar = new Calendar({
  target: contentEl, // 你要附加到的HTML元素
  props: {},
});
```
