<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 插件的生命周期

---

Plugin 类定义了插件的生命周期，并公开所有插件可用的操作：

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    // Configure resources needed by the plugin.
  }
  async onunload() {
    // Release any resources configured by the plugin.
  }
}
```

## 插件生命周期

[onload()](https://docs.obsidian.md/Reference/TypeScript+API/FileView/onload) 每当用户开始加载 Obsidian 中的插件时就会运行。您将在此处配置插件的大部分功能。

[onunload()](https://docs.obsidian.md/Reference/TypeScript+API/Component/onunload) 在插件被禁用时运行。您的插件正在使用的任何资源都必须在此处释放，以避免在插件被禁用后影响 Obsidian 的性能。

为了更好地了解何时调用这些方法，您可以在插件加载和卸载时向控制台打印一条消息。控制台是一个有价值的工具，允许开发人员监视其代码的状态。

要查看控制台，请执行以下操作：

1. 在 Windows 和 Linux 中按 Ctrl+Shift+I 或在 macOS 上按 Cmd-Option-I 切换开发人员工具。
2. 单击“开发人员工具”窗口中的“控制台”选项卡。

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    console.log('loading plugin');
  }
  async onunload() {
    console.log('unloading plugin');
  }
}
```
