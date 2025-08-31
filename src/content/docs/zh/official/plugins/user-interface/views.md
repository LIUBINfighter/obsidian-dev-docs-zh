<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 视图

---

视图决定了Obsidian 显示内容的方式。文件资源管理器、图表视图和 Markdown 视图都是视图的例子，但你也可以创建自己的自定义视图，以符合你的插件内容显示需要。

要创建自定义视图，请创建一个扩展 [ItemView](https://docs.obsidian.md/Reference/TypeScript+API/ItemView) 接口的类：

```ts
import { ItemView, WorkspaceLeaf } from 'obsidian';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl('h4', { text: 'Example view' });
  }

  async onClose() {
    // Nothing to clean up.
  }
}
```

> [!NOTE]
>
> 有关如何使用 `createEl()` 方法的更多信息，请参阅 [HTML元素](./html-elements.md)。

每个视图都由一个文本字符串进行唯一标识，有几个操作需要指定要使用的视图。将其提取为一个常量 `VIEW_TYPE_EXAMPLE` 是比较好的方式，本指南稍后将介绍这一点。

- `getViewType()` 返回视图的唯一标识符。
- `getDisplayText()` 返回视图的人性化名称。
- `onOpen()` 打开视图时被调用，它负责构建视图的内容。
- `onClose()` 在视图关闭时被调用，并负责清理视图使用的任何资源。

启用插件时需要注册自定义视图，禁用插件时需要清理自定义视图：

```ts
import { Plugin } from 'obsidian';
import { ExampleView, VIEW_TYPE_EXAMPLE } from './view';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));

    this.addRibbonIcon('dice', 'Activate view', () => {
      this.activateView();
    });
  }

  async onunload() {}

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }
}
```

[registerView()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerView) 的第二个参数是一个工厂函数，它会返回一个要注册的视图实例。

> [!warning]
>
> 切勿在插件中管理对视图引用。Obsidian 可能会多次调用视图工厂函数，为避免视图产生副作用，应该在需要访问视图实例时使用 `getLeavesOfType()` 。
>
> ```ts
> this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE).forEach((leaf) => {
>   if (leaf.view instanceof ExampleView) {
>     // Access your view instance.
>   }
> });
> ```
