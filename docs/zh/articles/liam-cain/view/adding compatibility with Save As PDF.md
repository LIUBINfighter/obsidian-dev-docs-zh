---
title: "为PDF导出添加兼容性"
source: "https://liamca.in/Obsidian/API+FAQ/views/adding+compatibility+with+Save+As+PDF"
created: 2025-03-26
tags:
  - "clippings"
---
# 如何确保自定义代码块在导出的PDF中显示？

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

> PDF导出会等待一些异步任务执行。如果插件作者没有正确返回异步任务，我们就不会等待它们渲染其部分内容，因此什么都不会显示。特别是对于todoist插件，他们应该将此函数标记为async并等待查询执行，这样我们才能正确渲染PDF
