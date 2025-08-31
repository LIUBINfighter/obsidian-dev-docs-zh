---
title: Theme Guidelines
description: 关于 Theme Guidelines 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 主题指南

---

本页列出了我们关于构建可靠且可维护的主题的建议。通过遵循这些准则，您可以最大限度地减少维护工作，以使您的主题与 Obsidian 的未来版本保持更新。

有关开发人员一般准则的更多信息，请参阅 [Developer policies](https://docs.obsidian.md/Developer+policies)。

## 使用 CSS 变量

由于 Obsidian 的大多数用户界面都使用 CSS 变量，因此您只需覆盖内置 CSS 变量即可创建高度表现力的主题。

覆盖 `body` 下的常规变量以及 `.theme-light` 或 `.theme-dark` 下的颜色。

```css
:root {
  --input-focus-border-color: Highlight;
}

body {
  --font-text-size: 18px;
}

.theme-light {
  --background-primary: white;
}

.theme-dark {
  --background-primary: black;
}
```

## 使用低特异性的选择器

避免针对特定类的过于复杂的选择器。使用 [Use CSS variables](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines#Use%20CSS%20variables) 使选择器保持简单。

维护主题时最常见的问题是由于 Obsidian 新版本导致选择器损坏，这可能会更改类名称以及元素的嵌套方式。

## 将资产保留在本地

根据[开发者政策](../../developer-policies.md)，社区主题不得加载远程资源，例如用户离线时不可用的字体和图像。即使用户可以访问互联网，加载远程资源也可能会侵犯用户隐私。

如果您希望将您的主题提交到官方社区主题目录，您的主题不得进行网络调用，因此所有资源都必须捆绑到您的主题中。请参阅我们的指南在您的主题中[嵌入字体和图像](./embed-fonts-and-images-in-your-theme.md)。

## 避免 `!important` 声明

将样式声明为 `!important` 会防止用户使用代码片段覆盖主题中的样式。
