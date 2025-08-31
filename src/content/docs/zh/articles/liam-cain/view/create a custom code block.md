---
title: '创建自定义代码块'
source: 'https://liamca.in/Obsidian/API+FAQ/views/create+a+custom+code+block'
created: 2025-03-26
tags:
  - 'clippings'
---

# 如何创建自定义代码围栏

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## 示例代码

```ts
export default class MyPlugin extends Plugin {
  async onload(): Promise<void> {
    // 第一个参数是"语言"标识，它会出现在\`\`\`反引号后面
    this.registerMarkdownCodeBlockHandler(
      'myCodeFence',
      this.myCodeFenceProcessor,
    );
  }

  registerMarkdownCodeBlockHandler(
    source: string,
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext,
  ): void {
    // 第一步：处理\`source\`
    // 第二步：将你想要的DOM元素附加到\`el\`上
  }
}
```
