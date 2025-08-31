<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 关于Publish主题

---

Obsidian的“Publish”为您提供了多个选项来自定义网站的外观。

Obsidian Publish允许您使用 CSS 自定义网站的外观。

可以在发布网站设置中打开或关闭以下元素并影响网站的布局。

#### 阅读体验

- **Readable line length** 设置笔记的最大宽度，并使内容在宽屏幕上居中。
- **Theme toggle**显示明暗模式的切换。
- **Stacked notes**使笔记能够在单击链接时堆叠和水平滚动，类似于 Obsidian 应用中的[Tab stacks](https://help.obsidian.md/User+interface/Use+tabs+in+Obsidian#Stack+tab+groups) 。

#### 组件

- **Navigation**添加了一个类似于文件夹和文件列表的左侧边栏。
- **Search**显示搜索输入字段，它可能位于左侧边栏、右侧边栏或顶部导航中，具体取决于哪些 UI 元素处于活动状态。
- 反向链接在页面底部显示反向链接列表。
- 图表在右侧边栏中显示本地图表。
- 目录在右侧边栏中显示当前页面中的标题大纲。

## CSS 变量

使用 CSS 变量使 Obsidian 发布的主题变得简单。[了解有关 CSS 变量以及如何使用它们的更多信息](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)。

可用于自定义的 [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) 列表分为两组：

- App变量继承自 Obsidian 应用主题。这些主要控制内容的颜色和样式。
- **Publish-specific variables** 控制特定于 Obsidian Publish的元素。
