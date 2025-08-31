---
title: 将光标聚焦到笔记标题
source: 'https://liamca.in/Obsidian/API+FAQ/views/focus+the+note+title+with+the+cursor'
created: 2025-03-26T00:00:00.000Z
tags:
  - clippings
description: 关于 将光标聚焦到笔记标题 的文档
---

# 是否有简单的方法可以将光标聚焦到笔记标题？

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## 示例代码

```ts
// 打开文件并将光标聚焦到笔记标题
leaf.openFile(file, {
  state: { mode: 'source' },
  eState: { rename: 'end' }, // 'start' | 'end'
});
```
