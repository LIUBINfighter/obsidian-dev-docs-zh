---
title: UnloadCommand
description: 关于 UnloadCommand 的文档
---
# 是否可以卸载一条命令？

原文链接：[Is it possible to unload a Command?](https://liamca.in/Obsidian/API+FAQ/commands/unload+a+Command)

从 0.11.2 开始，API 中没有公开任何内容来卸载命令。但是，有一种解决方法。

## 示例代码

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(this.app as any).commands.removeCommand(commandId`<plugin_id>:my-command`);
```

> Jay: 如果想要在SettingTab设置界面让用户自定义添加和减少命令并且在可以呼出的菜单中呈现，可参考 [Local GPT](https://github.com/pfrankov/obsidian-local-gpt)的实现。
