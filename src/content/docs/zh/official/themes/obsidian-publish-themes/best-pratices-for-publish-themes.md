---
title: Best Pratices For Publish Themes
description: 关于 Best Pratices For Publish Themes 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# Publish主题最佳实践

---

### Obsidian App和 Obsidian Publish是不同的上下文

Obsidian Publish 与 Obsidian App共享共同的代码和 UI 原则，但也有一些在创建主题时应考虑的重要差异。需要记住的一些经验法则：

- 避免使用复杂的选择器，而是使用可用的 [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables)。
- 避免包含特定于 Obsidian 应用程序的 CSS 选择器和规则。
- 保持 CSS 文件较小，以便访问者可以快速加载。
- 考虑跨浏览器和屏幕尺寸的兼容性。

### App专用和Publish专用的 CSS 规则

虽然 Obsidian App 和 Obsidian Publish 共享一些通用代码，但大多数 App 主题旨在针对 Publish 上下文中不存在的 CSS 类。因此，我们建议从头开始构建 Publish 主题，以最大程度地减少不必要的代码量。

### 文件大小

Obsidian App主题存储在用户设备本地，而 Obsidian Publish主题会在用户每次访问网站时加载。因此，Obsidian Publish主题应注意文件大小。

在App上下文中，可以使用 base64 编码在 CSS 文件中嵌入字体和图像。在Publish上下文中，我们建议您避免使用此方法，尤其是当它导致文件大小较大（数兆字节）时，可能会在访问者访问站点时阻止呈现。

### 浏览器兼容性

Publish 网站的访问者可能会使用与新 CSS 功能不兼容的旧版浏览器。因此，我们建议在发布上下文中对高级 CSS 功能保持保守。这与 Obsidian 应用主题形成鲜明对比，后者针对支持较新浏览器功能的渲染引擎（Chromium/Blink 的最新版本）。尝试搜索 [caniuse.com](https://caniuse.com/) ，了解哪些 CSS 功能可跨浏览器广泛使用。

### 小屏幕和移动设备

Obsidian Publish 默认有两个断点：

| 断点   | Device 设备 | Effect 影响                                                      |
| ------ | ----------- | ---------------------------------------------------------------- |
| 1000px | Tablet      | 右侧边栏被隐藏                                                   |
| 750px  | Mobile      | 左侧和右侧边栏被隐藏。如果启用，可以通过左上角的汉堡菜单访问导航 |

您可以使用 CSS 定位这些设备。 `@media` 查询之外定义的任何规则都将应用于所有设备。

```css
@media screen and (min-width: 1000px) {
  /* ... rules and variables for screens larger than tablet */
}
@media screen and (max-width: 1000px) {
  /* ... rules and variables for tablet devices and smaller */
}
@media screen and (max-width: 750px) {
  /* ... rules and variables for mobile devices and smaller */
}
```
