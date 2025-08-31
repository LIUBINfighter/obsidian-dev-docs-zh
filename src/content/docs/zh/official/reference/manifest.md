---
title: Manifest
description: 关于 Manifest 的文档
---
# manifest.json 配置说明

本页面描述了 `manifest.json` 的配置模式。

## 属性

以下属性适用于插件和主题。

| 属性            | 类型                                                                           | 是否必需 | 描述                                           |
| --------------- | ------------------------------------------------------------------------------ | -------- | ---------------------------------------------- |
| `author`        | `string`                                                                       | **是**   | 作者名称                                       |
| `minAppVersion` | `string`                                                                       | **是**   | 所需的最低 Obsidian 版本                       |
| `name`          | `string`                                                                       | **是**   | 显示名称                                       |
| `version`       | `string`                                                                       | **是**   | 版本号，使用 [语义化版本](https://semver.org/) |
| `authorUrl`     | `string`                                                                       | 否       | 作者网站的 URL                                 |
| `fundingUrl`    | `string` 或 [`object`](https://docs.obsidian.md/Reference/Manifest#fundingurl) | 否       | 用户可以打钱支持作者的项目的单个或多个 URL     |

## 插件特有属性

以下属性仅适用于插件。

| 属性            | 类型      | 是否必需 | 描述                                 |
| --------------- | --------- | -------- | ------------------------------------ |
| `description`   | `string`  | **是**   | 插件描述                             |
| `id`            | `string`  | **是**   | 插件的 ID                            |
| `isDesktopOnly` | `boolean` | **是**   | 插件是否使用 NodeJS 或 Electron APIs |

::: warning 注意
在本地开发时，`id` 应该与插件的文件夹名称匹配；否则某些方法（如 `onExternalSettingsChange`）将不会被调用。
:::

## fundingUrl

`fundingUrl` 可以是包含单个 URL 的字符串，也可以是包含多个 URL 的对象。

**单个 URL**：

```json
{
  "fundingUrl": "https://buymeacoffee.com"
}
```

**多个 URLs**：

```json
{
  "fundingUrl": {
    "Buy Me a Coffee": "https://buymeacoffee.com",
    "GitHub Sponsor": "https://github.com/sponsors",
    "Patreon": "https://www.patreon.com/"
  }
}
```
