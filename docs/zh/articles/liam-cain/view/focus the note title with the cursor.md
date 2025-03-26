---
title: "focus the note title with the cursor"
source: "https://liamca.in/Obsidian/API+FAQ/views/focus+the+note+title+with+the+cursor"
created: 2025-03-26
tags:
  - "clippings"
---
## Is there an easy way to focus the note title with the cursor?

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/views/#obsidian/api/faq)

## Sample Code

```ts
// open a file and focus the note title.
leaf.openFile(file, {
  state: { mode: 'source' }, 
  eState: { rename: 'end' }  // 'start' | 'end'
});
```
