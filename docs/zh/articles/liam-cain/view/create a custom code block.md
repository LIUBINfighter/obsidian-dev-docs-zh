---
title: "create a custom code block"
source: "https://liamca.in/Obsidian/API+FAQ/views/create+a+custom+code+block"
created: 2025-03-26
tags:
  - "clippings"
---
## How to create a custom code fence

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## Sample Code

```ts
export default class MyPlugin extends Plugin {
  async onload(): Promise<void> {
    // The first argument here is the "language." It's the keyword that appears
	// after the \`\`\` backticks. 
    this.registerMarkdownCodeBlockHandler('myCodeFence', this.myCodeFenceProcessor);
  }
  
  registerMarkdownCodeBlockHandler(
    source: string, 
	el: HTMLElement, 
	ctx: MarkdownPostProcessorContext
  ): void {
    // step 1: process the \`source\`
	// step 2: attach whatever DOM elements you want to \`el\`
  }
}
```
