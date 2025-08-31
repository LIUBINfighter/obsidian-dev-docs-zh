# 为什么你需要持久化你的视图到工作区？

原文链接：[Why you should be persisting your view's state to the workspace ](https://liamca.in/Obsidian/API+FAQ/views/persisting+your+view+state)

作者：[Liam Cain](https://github.com/liamcain) _February 26, 2023_

> Jay: 作为译者会以这种形式加上自己的想法和批注，帮助大家理解。
>
> 原博客的内部链接改为本文档的内部链接（即译文），并在后附上原文链接。

---

我审查过[很多插件](https://github.com/obsidianmd/obsidian-releases/pulls?q=is%3Apr+is%3Amerged+-label%3Atheme)，据我所知，只有少数几个插件正确地持久化了它们的插件视图状态。我认为问题在于 API 文档中对此描述不够充分，所以没有人真正知道正确的方法。

如果你的插件创建了自定义视图，那么它很可能会有一个相关的*状态*。状态可以是任何东西：一个开关是打开还是关闭、搜索查询或关联的文件。更多时候，我们选择将该状态设为[临时的](https://liamca.in/ephemeral+state) —— 我们将其作为视图的实例变量保存，当 Obsidian 重启时，这些状态就会丢失。*有什么替代方案吗？*好吧，插件真正能持久化数据的选项就是使用 `saveData` 和 `loadData`。或者你可能会想到使用 localStorage。

> "临时的"指向的文章链接失效。目前没有找到对应的文章。

还有另一个选项：`View.getState` 和 `View.setState`。

这些方法允许你将*描述视图状态的数据*序列化到用户的工作区中。

## 优势

相比于将视图数据保存在插件的 data.json 文件中，这种方式有一些显著的优势。

### 1\. 数据是视图特定的

将数据保存在 View 中而不是保存到 Plugin 中意味着你可以启用多个视图副本，而无需在你这边进行任何额外的数据管理。

为什么我会想要创建多个视图副本？

这可能并不总是理想的选择，但对于反向链接或大纲这样的视图来说，拥有多个视图副本可能非常有用。用户可能会选择固定某个特定文件的大纲以便快速访问。

### 2\. 数据会自动序列化到 `workspace.json` 文件

`workspace.json` 文件是你当前 Obsidian 布局的规范表示。它描述了哪些视图是打开的，侧边栏中有什么，你打开了哪些标签页和标签组，是否有任何堆叠的标签页等。

它也被**工作区**核心插件所使用。这意味着当用户在不同的工作区之间切换时，你的插件状态会自动存储和恢复。

### 3\. 数据仅在标签页存在期间保留

有时恢复到初始状态是很好的。假设你有一个带有很多花哨开关和过滤器的插件视图。用户可能会期望关闭标签页并打开一个新的标签页时能回到初始状态。将信息保存在视图中意味着一旦该标签页关闭，嘭！这些状态就消失了。

## 什么时候不该使用 `View.getState` 和 `View.setState`

这些函数有其特定用途。它们不应该用于存储任何重要的用户数据。不应该存储任何无法反序列化的内容。不应该用于存储用户不希望在关闭标签页时丢失的任何数据。

一个简单的经验法则是：如果你在视图处于活动状态时重启 Obsidian，你的视图是否拥有继续工作所需的一切？

## 闲话少说，如何Copy?

我们只需要在 View 子类中实现两个函数：

- `getState`
- `setState`

下面是一个如何在日历视图中使用 getState 和 setState 的示例。

```ts
interface ICalendarPersistedState {
  displayedMonth: string;
  selectedFilters: string[];
}

export default class CalendarView
  extends ItemView
  implements ICalendarPersistedState
{
  // 持久化状态
  displayedMonth: string;
  selectedFilters: string[];

  constructor(
    readonly leaf: WorkspaceLeaf,
    readonly plugin: CalendarPlugin,
  ) {
    super(leaf);

    // 初始化持久化状态
    this.selectedFilters = [];
    this.displayedMonth = window.moment().format();
  }

  // setState 用于将数据从 WorkspaceLeaf 传递到视图。
  // 当工作区布局被反序列化时，流程是：
  // - 遍历序列化的工作区，当遇到叶子节点时，创建一个新的叶子节点。
  // - 使用序列化的数据调用 setViewState
  // - 叶子节点根据数据中序列化的 `type` 确定其"类型"。如果叶子节点没有匹配该类型的视图，则创建一个新的视图。
  // - 然后叶子节点在视图上调用 setState。
  async setState(
    state: ICalendarPersistedState,
    result: ViewStateResult,
  ): Promise<void> {
    // 传入的 `state`
    if (state.displayedMonth) {
      this.displayedMonth = state.displayedMonth;
    }

    if (state.selectedFilters) {
      this.selectedFilters = state.selectedFilters;
    }

    return super.setState(state, result);
  }

  // 当叶子节点从视图请求数据时调用 getState。
  // 每当 Obsidian 对其布局进行更改时，它都会请求将布局序列化到 workspace.json。参见：<Workspace.requestSaveLayout>
  // 在序列化布局时，流程是：
  // - 工作区序列化每个拆分，每个拆分再序列化每个叶子节点。
  // - 叶子节点使用 getState 从视图请求序列化数据。
  // - 该数据被保存到 workspace.json。
  getState(): ICalendarPersistedState {
    return {
      displayedMonth: this.displayedMonth,
      selectedFilters: this.selectedFilters,
    };
  }

  setDisplayedMonth(date: Moment) {
    this.displayedMonth = date.format();
    // 当你对视图的状态进行更改时，在你手动请求
    // 保存布局之前，这些更改不会被保存到布局中。
    this.app.workspace.requestSaveLayout();
  }
}
```
