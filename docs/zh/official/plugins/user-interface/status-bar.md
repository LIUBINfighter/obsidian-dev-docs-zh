<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 状态栏

---

要在状态栏中创建新块，请调用 `onload()` 方法中的 [addStatusBarItem()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/addStatusBarItem) 。`addStatusBarItem()` 方法会返回一个 [HTML elements](https://docs.obsidian.md/Plugins/User+interface/HTML+elements) ，您可以在其中添加自己的元素。

> [!warning] Obsidian 移动版
>
> Obsidian 移动版不支持自定义状态栏项目。

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    const item = this.addStatusBarItem();
    item.createEl('span', { text: 'Hello from the status bar 👋' });
  }
}
```

> [!NOTE]
>
> 有关如何使用 `createEl()` 方法的更多信息，请参阅 [HTML元素](./html-elements.md)。

您可以通过多次调用 `addStatusBarItem()` 来添加多个状态栏项。由于Obsidian 会在它们之间添加间距，因此如果需要紧凑的间距控制，可在同一状态栏项上创建多个 HTML 元素。

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    const fruits = this.addStatusBarItem();
    fruits.createEl('span', { text: '🍎' });
    fruits.createEl('span', { text: '🍌' });

    const veggies = this.addStatusBarItem();
    veggies.createEl('span', { text: '🥦' });
    veggies.createEl('span', { text: '🥬' });
  }
}
```

上述示例的状态栏如下：

![ek3px](../../../public/images/ek3px.png)
