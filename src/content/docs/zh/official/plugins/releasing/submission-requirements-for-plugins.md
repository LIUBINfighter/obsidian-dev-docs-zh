---
title: Submission Requirements For Plugins
description: 关于 Submission Requirements For Plugins 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 插件的提交要求

---

本页列出了扩展的[开发者政策](../../developer-policies.md)，包含插件特定要求，所有插件必须遵循才能发布。

## 仅使用 `fundingUrl`来链接到财务支持服务

如果你接受 [fundingUrl](https://docs.obsidian.md/Reference/Manifest#fundingUrl) 财务支持，请使用 buyme A Coffee 或 GitHub Sponsors 等服务。

如果您不接受捐款，请从清单中删除 `fundingUrl` 。

## 保持插件描述简短明了

好的插件描述可以帮助用户快速简洁地理解您的插件。好的描述通常以行动语句开头，例如：

- "Translate selected text into..."
- "Generate notes automatically from..."
- "Import notes from..."
- "Sync highlights and annotations from..."
- "Open links in..."

避免以“这是一个插件”开头，因为在社区插件目录的上下文中，用户会很明显。

您应该这样描述：

- 遵循 [Obsidian style guide](https://help.obsidian.md/Contributing+to+Obsidian/Style+guide).
- 最多 250 个字符。
- 以句点 `.` 结尾。
- 避免使用表情符号或特殊字符。
- 对首字母缩略词、专有名词和商标（如“Obsidian”、“Markdown”、“PDF”）使用正确的大写字母。如果您不确定如何将术语大写，请参阅其网站或维基百科描述。

## Node.js 和 Electron API 只允许在桌面上使用

Node.js 和 Electron API 仅在桌面版本中Obsidian可用。例如，fs 、`crypto` 和 `os` 这样的 Node.js 包仅在桌面上可用。

如果您的插件使用这些 API 中的任何一个，必须在 `manifest.json`中设置 `isDesktopOnly` 为`true` 。

> [!NOTE]
>
> 许多 Node.js 功能都有 Web API 替代方案：
>
> - 使用[`SubtleCrypto`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) 而不是 [`crypto`](https://nodejs.org/api/crypto.html)。
> - 使用`navigator.clipboard.readText()` 和 `navigator.clipboard.writeText()` 访问剪贴板内容。

## 不要在命令 ID 中包含插件 ID

Obsidian自动使用插件 ID 作为命令 ID 的前缀。您无需自己包含插件 ID。
