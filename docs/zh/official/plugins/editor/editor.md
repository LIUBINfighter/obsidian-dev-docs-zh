<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 编辑器

---

编辑器类提供了在编辑模式下读取和操作活动 Markdown 文档的操作。

如果要在命令中访问编辑器，请使用 [editorCallback](https://docs.obsidian.md/Plugins/User+interface/Commands#Editor%20commands)。

如果您想在其他地方使用编辑器，可以从活动视图中访问它：

```ts
const view = this.app.workspace.getActiveViewOfType(MarkdownView);

// Make sure the user is editing a Markdown file.
if (view) {
  const cursor = view.editor.getCursor();

  // ...
}
```

> [!tip]
>
> Obsidian使用 [CodeMirror](https://codemirror.net/) (CM) 作为底层的文本编辑器。并且将CodeMirror作为API的一部分开放出来。 `Editor` 作为一个抽象层，在 CM6 和 CM5（传统编辑器，仅在桌面上可用）间进行了桥接。通过使用 `Editor` 而不是直接访问 CodeMirror 实例，可以确保您的插件在两个平台上都能运行。

## 在光标位置插入文本

 [replaceRange()](https://docs.obsidian.md/Reference/TypeScript+API/Editor/replaceRange) 方法会替换两个光标位置之间的文本。如果只给它一个位置，它会在该位置插入新文本。

以下例子将会在光标位置插入今天的日期：

```ts
import { Editor, moment, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'insert-todays-date',
      name: "Insert today's date",
      editorCallback: (editor: Editor) => {
        editor.replaceRange(moment().format('YYYY-MM-DD'), editor.getCursor());
      },
    });
  }
}
```

![dl1hw](../../../public/images/dl1hw.gif)

## 替换当前选择

如果要修改选中的文本，请使用  [replaceSelection()](https://docs.obsidian.md/Reference/TypeScript+API/Editor/replaceRange) 将当前选中的文本替换为新文本。

下面的例子将读取当前的选区并将其转换为大写：

```ts
import { Editor, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'convert-to-uppercase',
      name: 'Convert to uppercase',
      editorCallback: (editor: Editor) => {
        const selection = editor.getSelection();
        editor.replaceSelection(selection.toUpperCase());
      },
    });
  }
}
```

![5xtta](../../../public/images/5xtta.gif)
