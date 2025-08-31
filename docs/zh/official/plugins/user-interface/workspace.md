<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 工作区

---

Obsidian 让你可以随时配置哪些内容对你可见。在不需要文件浏览器时将其隐藏，并排显示多个文档，或者在处理文档时显示文档大纲。应用程序窗口中可见内容的配置称为工作区。

工作区是以 [树形数据结构](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) 的形式实现的，其上的每个节点都被称为 [工作区项](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceItem)。工作区项有两种类型： [父节点](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceParent) 和 [叶子节点](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceLeaf)。主要区别在于父节点可以包含子节点或其他父节点，而叶子节点则不能包含任何其它节点。

父节点分为两种类型，即 [splits](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceSplit) 和 [tabs](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceTabs)，它们决定了如何向用户展示子项：
![](../../../../public/images/split和tabs.png)

- split会沿垂直或水平方向逐个排列其子项。
- tabs每次只显示一个子项目，并隐藏其他项目。

工作区下有三个特殊的split：left、right和root。下图是一个典型工作区的示例：

![](../../../../public/images/特殊split.png)

叶子是一个窗口，可以以不同方式显示内容。叶子的类型决定显示内容的方式，并与特定视图相对应。例如，类型为 `graph` 的叶子对应显示[graph view](https://help.obsidian.md/Plugins/Graph+view)。

## Splits

默认情况下，root split 的排列方向为垂直方向。为其创建新叶子节点时，Obsidian 会在用户界面中创建一个新列。拆分叶子节点时，拆出的叶子节点会添加到新的split中。虽然根分隔项下可创建的层级数量没有明确限制，但实际上每多一个层级，其实用性就会减弱。
![](../../../../public/images/root_split.png)

left和right splits的工作方式略有不同。在侧边栏中拆分叶子时，Obsidian 会生成一个新的tabs，并将新叶子添加到它下面。实际上，这意味着它们在任何时候都只能有三层工作区项，而且直接子项必须是tabs。
![](../../../../public/images/left_right.png)

## 检查工作区

您可以通过 [App](https://docs.obsidian.md/Reference/TypeScript+API/App) 对象访问工作区。下面的示例将打印工作区中每个叶的类型：

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('dice', 'Print leaf types', () => {
      this.app.workspace.iterateAllLeaves((leaf) => {
        console.log(leaf.getViewState().type);
      });
    });
  }
}
```

## Leaf 生命周期

插件可以向工作区添加任何类型的叶子节点，也可以通过自定义[视图](./views.md)定义新的叶子节点类型。以下是向工作区添加叶子节点的几种方法。有关更多方法，请参阅工作区。

- 如果要在root split中添加新叶，请使用 [getLeaf(true)](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/getLeaf)。
- 如果要在任何侧边栏中添加新的叶子节点，请使用 [getLeftLeaf()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/getLeftLeaf) 和 [getRightLeaf()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/getRightLeaf)。这两种方法都可以让你决定是否将叶子添加到新的split中。

您也可以使用 [createLeafInParent()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/createLeafInParent) 将叶子明确添加到您选择的split中。

除非明确移除，否则插件添加到工作区的叶子节点即使在插件禁用后也会保留。插件有责任删除它们添加到工作区的叶子节点。

要从工作区移除叶子节点，请在要移除的叶子节点上调用 [detach()](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceLeaf/detach)。您也可以使用  [detachLeavesOfType()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/detachLeavesOfType) 移除某一类型的所有叶子节点。

## Leaf 组

您可以使用 [setGroup()](https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceLeaf/setGroup) 将多个叶子分配给同一个组，从而创建[linked panes](https://help.obsidian.md/User+interface/Workspace/Panes/Linked+pane) 。

```ts
leaves.forEach((leaf) => leaf.setGroup("group1");
```
