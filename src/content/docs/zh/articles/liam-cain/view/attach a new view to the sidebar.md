---
title: '在侧边栏附加新视图'
source: 'https://liamca.in/Obsidian/API+FAQ/views/attach+a+new+view+to+the+sidebar'
created: 2025-03-26
tags:
  - 'clippings'
---

## 如何在侧边栏附加视图？

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

# 示例代码

```ts
// 创建一个类型为 \`my-view-type\` 的新视图并添加到右侧边栏
// (使用 \`getLeftLeaf\` 可添加到左侧边栏)
this.app.workspace.getRightLeaf(false).setViewState({
  type: 'my-view-type',
});
```
