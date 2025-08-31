---
title: Embed Fonts And Images In Your Theme
description: 关于 Embed Fonts And Images In Your Theme 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 嵌入字体和图像

---

本节主要讲述如何在主题中包含资源，例如字体和图像。

> [!warning] 加载远程内容
>
> 为了使 Obsidian 能够离线工作并保护用户隐私，主题[不允许](https://docs.obsidian.md/Developer+policies)通过网络加载远程内容。有关更多信息，请参阅[主题指南 > 保留资源本地化](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines#Keep%20resources%20local)

## 使用数据 URL

要在主题中包含字体、图标和图像等资源，您需要通过将[数据 URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) 传递给 [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url)  函数来将它们嵌入到 CSS 文件中。

要为您的资产创建数据 URL，请使用以下格式创建 URL：

```css
url("data:<MIME_TYPE>;base64,<BASE64_DATA>")
```

- 将 `<MIME_TYPE>` 替换为您的资产的 MIME 类型。如果您不知道，请参阅 [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)。
- 将 `<BASE64_DATA>` 替换为资产的 [Base64](https://en.wikipedia.org/wiki/Base64)  编码表示形式。

以下示例嵌入 GIF 文件作为背景图像：

```css
h1 {
  background-image: url('data:image/gif;base64,R0lGODdhAQADAPABAP////8AACwAAAAAAQADAAACAgxQADs=');
}
```

## 对您的资产进行编码

有关如何将资产编码为 Base64 的说明，请参阅将 [Encoding data into base64 format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#encoding_data_into_base64_format)。

您还可以使用众多免费在线编码工具。

对于字体：

- [Woff2Base](https://hellogreg.github.io/woff2base/) 用于 WOFF2 字体文件
- [Aspose](https://products.aspose.app/font/base64) 支持多种字体格式

对于图像：

- [WebSemantics](https://websemantics.uk/tools/image-to-data-uri-converter/) 转换 JPEG、JPG、GIF、PNG、SVG
- [Base64 Guru](https://base64.guru/converter/encode/image)  支持多种图像格式
- [Yoksel URL-encoder for SVG](https://yoksel.github.io/url-encoder/) 针对 SVG 文件进行了优化

## 考虑文件大小

嵌入资源会增加主题的文件大小，这可能会导致在以下情况下性能不佳：

- 从社区主题目录下载并更新您的主题。
- 在 Obsidian 应用程序中加载并使用您的主题。
- 在代码编辑器中编辑您的主题。考虑使用 CSS 预处理器将主题分解为多个文件（例如 [Sass](https://sass-lang.com/) 或 [Less](https://lesscss.org/)）。
