<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 插件指南

---

本页列出了插件作者在提交插件时收到的常见评审意见。

虽然此页面上的指南是建议，但根据其严重程度，我们可能仍会要求您解决违规问题。

插件开发者政策

Make sure that you've read our [Developer policies](https://docs.obsidian.md/Developer+policies) as well as the [Submission requirements for plugins](https://docs.obsidian.md/Plugins/Releasing/Submission+requirements+for+plugins).  
请务必阅读我们的[开发者政策](../../developer-policies.md)以及[插件的提交要求](./submission-requirements-for-plugins.md)。

## 常规

### 避免使用全局应用实例

避免使用全局应用对象 `app` （或 `window.app` ）。请改用插件实例提供的引用  `this.app`。

全局应用对象用于调试目的，将来可能会被删除。

## UI 文本

本部分列出了在用户界面中设置文本格式的准则，例如设置、命令和按钮。

下面的“设置”→“外观”中的示例演示了用户界面中文本的准则。

![settings-headings.png](https://publish-01.obsidian.md/access/caa27d6312fe5c26ebc657cc609543be/Assets/settings-headings.png)

1. [常规设置位于顶部，没有标题](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Only%20use%20headings%20under%20settings%20if%20you%20have%20more%20than%20one%20section.)。
2. [章节标题的标题文本中没有“设置”](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Avoid%20%22settings%22%20in%20settings%20headings)。
3. [在 UI 中使用句子大小写](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Use%20Sentence%20case%20in%20UI)。

有关Obsidian编写和格式化文本的更多信息，请参阅我们的[样式指南](https://help.obsidian.md/Contributing+to+Obsidian/Style+guide)。

### 仅当有多个部分时，才使用设置下的标题。

避免在设置选项卡中添加顶级标题，例如“常规”、“设置”或插件名称。

如果设置下有多个部分，并且其中一个包含常规设置，请将它们保留在顶部，而不添加标题。

例如，查看“设置”→“外观”下的设置。

### 避免在设置标题中使用“设置”

在设置选项卡中，您可以添加标题来组织设置。避免在这些标题中包含“设置”一词。由于设置选项卡下的所有内容都是设置，因此对每个标题重复它变得多余。

- 首选“高级”而不是“高级设置”。
- 首选“模板”而不是“模板设置”。

### 在UI中使用句子大小写

UI 元素中的任何文本都应使用[句子大小写](https://en.wiktionary.org/wiki/sentence_case)而不是[标题大小写](https://en.wikipedia.org/wiki/Title_case)，其中只有句子中的第一个单词和专有名词应大写。

- 首选 "Template folder location" 而不是 "Template Folder Location"。
- 首选 "Create new note" 而不是 "Create New Note"。

## 安全

### 避免 `innerHTML` 和 `outerHTML` `insertAdjacentHTML`

从用户定义的输入构建 DOM 元素，使用 `innerHTML` 和 `outerHTML` `insertAdjacentHTML` 可能会带来安全风险。

下面的示例使用包含用户输入的字符串生成 DOM 元素 `${name}` 。 `name` 可以包含其他 DOM 元素，例如 `<script>alert()</script>` ，并可允许潜在攻击者在用户计算机上执行任意代码。

```ts
function showName(name: string) {
  let containerElement = document.querySelector('.my-container');
  // DON'T DO THIS
  containerElement.innerHTML = `<div class="my-class"><b>Your name is: </b>${name}</div>`;
}
```

请改用 DOM API 或Obsidian帮助程序函数（如 `createEl()` ） `createDiv()` `createSpan()` 以编程方式生成 DOM 元素。有关更多信息，请参阅 [HTML 元素](../user-interface/html-elements.md)。

## 资源管理

### 插件卸载时清理资源

插件创建的任何资源（例如事件侦听器）都必须在插件卸载时销毁或释放。

如果可能，请使用 [registerEvent()](https://docs.obsidian.md/Reference/TypeScript+API/Component/registerEvent) 或 [addCommand()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/addCommand) 等方法在插件卸载时自动清理资源。

```ts
export default class MyPlugin extends Plugin {
  onload() {
    this.registerEvent(this.app.vault.on('create', this.onCreate));
  }

  onCreate: (file: TAbstractFile) => {
    // ...
  };
}
```

> [!NOTE]
>
> 您无需清理在插件卸载时删除的资源。例如，如果在 DOM 元素上注册 `mouseenter` 侦听器，当该元素超出范围时，将对事件侦听器进行垃圾回收。

### 不要在`onunload`分离 leaves

当用户更新您的插件时，任何打开的叶子都将在其原始位置重新初始化，无论用户将它们移动到何处。

## 命令

### 避免为命令设置默认热键

设置默认热键可能会导致插件之间发生冲突，并可能覆盖用户已配置的热键。

选择所有操作系统上都可用的默认热键很困难。

### 对命令使用适当的回调类型

在插件中添加命令时，请使用适当的回调类型。

- 如果命令无条件运行，则使用 `callback` 。
- 如果命令仅在特定条件下运行，则使用 `checkCallback` 。

如果该命令需要打开且处于活动状态的 Markdown 编辑器，请使用 `editorCallback` 或相应的 `editorCheckCallback` .

## 工作区

### 避免直接访问 `workspace.activeLeaf`

如果要访问活动视图，请改用 [getActiveViewOfType()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/getActiveViewOfType) ：

```ts
const view = this.app.workspace.getActiveViewOfType(MarkdownView);

// getActiveViewOfType will return null if the active view is null, or if it's not a MarkdownView.
if (view) {
  // ...
}
```

如果要访问活动笔记中的编辑器，请改用 `activeEditor` ：

```ts
const editor = this.app.workspace.activeEditor;
```

### 避免管理对自定义视图的引用

管理对自定义视图的引用可能会导致内存泄漏或意外后果。

不要：

```ts
this.registerViewType(MY_VIEW_TYPE, () => (this.view = new MyCustomView()));
```

请改为执行此操作：

```ts
this.registerViewType(MY_VIEW_TYPE, () => new MyCustomView());
```

要从插件访问视图，请使用 `Workspace.getActiveLeavesOfType()` ：

```ts
for (let leaf of app.workspace.getActiveLeavesOfType(MY_VIEW_TYPE)) {
  let view = leaf.view;
  if (view instanceof MyCustomView) {
    // ...
  }
}
```

## 库

### 首选编辑器 API，而不是 `Vault.modify`

如果要编辑活动注释，请使用 [Editor](https://docs.obsidian.md/Plugins/Editor/Editor) 接口，而不是 [Vault.modify()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/modify)。

编辑器会维护有关活动笔记的信息，例如光标位置、选择和折叠内容。当您使用 [Vault.modify()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/modify) 编辑注释时，所有这些信息都会丢失，这会导致用户体验不佳。

在对笔记的某些部分进行小的更改时，编辑器也更有效率。

仅当您在后台编辑文件时，才使用 Vault.modify（）。

### 首选 Vault API 而不是适配器 API

Obsidian公开了两个用于文件操作的 API：Vault API （ `app.vault` ） 和适配器 API （ `app.vault.adapter` ）。

虽然许多开发人员通常更熟悉适配器 API 中的文件操作，但与适配器相比，Vault API 有两个主要优势。

- 性能：Vault API 具有一个缓存层，当Obsidian文件已知时，该缓存层可以加快文件读取速度。
- 安全性：Vault API 按顺序执行文件操作，以避免出现任何争用条件，例如在读取同时写入的文件时。

### 避免遍历所有文件，建议按路径查找文件

遍历文件是低效的，特别是对于大型库。请改用 [getAbstractFileByPath()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/getAbstractFileByPath) 。

不建议：

```ts
vault.getAllFiles().find((file) => file.path === filePath);
```

请改为执行此操作：

```ts
const filePath = 'folder/file.md';

const file = app.vault.getAbstractFileByPath(filePath);

// Check if it exists and is of the correct type
if (file instanceof TFile) {
  // file is automatically casted to TFile within this scope.
}
```

### 使用 `normalizePath()` 清理用户定义的路径

每当您访问库中文件或文件夹的用户定义路径时，或者当您在插件代码中构造自己的路径时，请使用  [normalizePath()](https://docs.obsidian.md/Reference/TypeScript+API/normalizePath) 。

通过`normalizePath()` 获取路径并清理它，以确保文件系统和跨平台使用的安全。此功能：

- 清理正斜杠和反斜杠的使用，例如将 1 个或多个 `\` 或 `/` 替换为单个 `/` 。
- 删除前导和后导斜杠。
- 将任何不间断空格 替换为 `\u00A0` 常规空格。
- 通过 [String.prototype.normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) 执行路径。

```ts
import { normalizePath } from 'obsidian';
const pathToPlugin = normalizePath(app.vault.configDir + '//plugins/my-plugin');
// pathToPlugin contains ".obsidian/plugins/my-plugin" not .obsidian//plugins/my-plugin
```

## 编辑器

### 更改或重新配置编辑器扩展

如果要在使用 [registerEditorExtension()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerEditorExtension), 注册后更改或重新配置[编辑器扩展](../editor/editor-extensions.md)，请使用 [updateOptions()](https://docs.obsidian.md/Reference/TypeScript+API/Workspace/updateOptions) 更新所有编辑器。

```ts
class MyPlugin extends Plugin {
  private editorExtension: Extension[] = [];

  onload() {
    //...

    this.registerEditorExtension(this.editorExtension);
  }

  updateEditorExtension() {
    // Empty the array while keeping the same reference
    // (Don't create a new array here)
    this.editorExtension.length = 0;

    // Create new editor extension
    let myNewExtension = this.createEditorExtension();
    // Add it to the array
    this.editorExtension.push(myNewExtension);

    // Flush the changes to all editors
    this.app.workspace.updateOptions();
  }
}
```

## TypeScript

### 使用 `const` 和 `let` 优于 `var`

有关更多信息，请参阅[在现代 JavaScript 中 var 被认为过时的 4 个原因](https://javascript.plainenglish.io/4-reasons-why-var-is-considered-obsolete-in-modern-javascript-a30296b5f08f)。

### 首选 async/await 而不是 Promise

最新版本的 JavaScript 和 TypeScript 支持 `async` and `await` 关键字异步运行代码，这使代码比用 Promise 更具可读性。

不建议：

```ts
function test(): Promise<string | null> {
  return requestUrl('https://example.com')
    .then(res => res.text
    .catch(e => {
      console.log(e);
      return null;
    });
}
```

请改为执行此操作：

```ts
async function AsyncTest(): Promise<string | null> {
  try {
    let res = await requestUrl('https://example.com');
    let text = await r.text;
    return text;
  } catch (e) {
    console.log(e);
    return null;
  }
}
```

### 考虑使用文件夹组织代码库

如果您的插件使用多个 `.ts` 文件，请考虑将它们组织到文件夹中，以便于查看和维护。

### 重命名占位符类名

示例插件包含常见类的占位符名称，例如 `MyPlugin` 、 `MyPluginSettings` 和 `SampleSettingTab` 。重命名这些名称以反映插件的名称。
