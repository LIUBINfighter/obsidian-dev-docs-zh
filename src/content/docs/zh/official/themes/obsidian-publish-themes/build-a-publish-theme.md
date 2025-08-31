---
title: Build A Publish Theme
description: 关于 Build A Publish Theme 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 构建Publish主题

---

您可以为您的[Obsidian Publish](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish)网站构建主题。 Obsidian Publish 的主题使用与 Obsidian 应用程序相同的 [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) 以及 [Publish-specific CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables#Obsidian%20Publish)。

> [!tip]
>
> 有关 `body` 、 `:root` 、 `.theme-dark` 和 `.theme-light` 选择器的更深入信息，请参阅[构建主题](../app-themes/build-a-theme.md)。

要为您的网站构建主题：

1. 将名为 `publish.css` 的文件添加到库的根文件夹中。
2. 发布 `publish.css` 以在您的实时发布网站上启用主题。

例子：

```css
:root {
  --input-unfocused-border-color: transparent;
  --input-disabled-border-color: transparent;
  --input-hover-border-color: black;

  /* ... By default, nothing is placed within :root in Publish. However, CSS variables here are considered global, and accessible to all sub-elements such as body and .theme-light. */
}

.published-container {
  --page-width: 800px;
  --page-side-padding: 48px;

  /* ... CSS variables for Publish that do not change when light or dark mode is enabled. They sometimes link to color variables in .theme-light or .theme-dark */
}
.body {
  --inline-title-color: var(--h1-color);
  --h2-color: red;

  /* ... CSS variables that do not change when light or dark mode is enabled. They sometimes link to color variables in .theme-light or .theme-dark */
}
.theme-light {
  --background-primary: #ebf2ff;
  --h1-color: #000000;

  /* ... CSS color variables for when light mode is enabled */
}
.theme-dark {
  --background-primary: #1f2a3f;
  --h1-color: #ffffff;

  /* ... CSS color variables for when dark mode is enabled */
}
```

有关如何自定义站点的更多信息，请参阅[自定义您的站点](https://help.obsidian.md/Obsidian+Publish/Customize+your+site)。
