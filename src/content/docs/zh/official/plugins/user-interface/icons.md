---
title: Icons
description: 关于 Icons 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 图标

---

Obsidian API 中的一些用户界面组件可让您配置一个附带图标。您可以选择内置图标，也可以添加自己的图标。

## B浏览可用图标

浏览 [lucide.dev](https://lucide.dev/) 查看所有可用图标及其相应名称。

请注意：目前仅支持版本 0.171.0 以下的图标。

## 使用图标

如果想在自定义界面中使用图标，可使用 [setIcon()](https://docs.obsidian.md/Reference/TypeScript+API/setIcon) 实用程序函数为 [HTML element](https://docs.obsidian.md/Plugins/User+interface/HTML+elements) 添加图标。下面的示例为状态栏添加了图标：

```ts
import { Plugin, setIcon } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    const item = this.addStatusBarItem();
    setIcon(item, 'info');
  }
}
```

要改变图标的大小，可在包含图标的元素上使用预设尺寸设置 `--icon-size` CSS 变量：

```css
div {
  --icon-size: var(--icon-size-m);
}
```

## 添加自己的图标

要为插件添加自定义图标，请使用 addIcon() ：

```ts
import { addIcon, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    addIcon('circle', `<circle cx="50" cy="50" r="50" fill="currentColor" />`);

    this.addRibbonIcon('circle', 'Click me', () => {
      console.log('Hello, you!');
    });
  }
}
```

`addIcon` 需要两个参数：

1. 唯一标识图标的名称。
2. 图标的 SVG 内容，不包括周围的 `<svg>` 标签。

请注意，您的图标必须在 `0 0 100 100` 视图框内才能正确绘制。

调用 `addIcon` 后，您可以像使用任何内置图标一样使用该图标。

### 图标设计指南

为了与Obsidian界面兼容并保持一致，您的图标应遵循 [Lucide’s guidelines](https://lucide.dev/guide/design/icon-design-guide)：

- 图标必须在 24 x 24 像素的画布上设计
- 图标必须在画布内至少有 1 个像素的填充
- 图标的笔画宽度必须为 2 像素
- 图标必须使用圆形连接
- 图标必须使用圆帽
- 图标必须使用居中的笔画
- 图标中的形状（如矩形）的边框半径必须为 2 像素
- 不同元素之间必须有 2 个像素的间距

Lucide 还为 Illustrator、Figma 和 Inkscape 等矢量编辑器提供[templates and guides](https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md) 。
