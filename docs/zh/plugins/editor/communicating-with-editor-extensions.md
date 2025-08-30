<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 编辑器扩展间通信

---

构建编辑器扩展后，您可能希望从编辑器外部与它进行通信。例如，通过[命令](../user-interface/commands.md)或[功能区](../user-interface/ribbon-actions.md)操作。

您可以从 [MarkdownView](https://docs.obsidian.md/Reference/TypeScript+API/MarkdownView)访问 CodeMirror 6 编辑器。 但是，由于 Obsidian API 实际上并没有公开编辑器，因此您需要使用 `@ts-expect-error` .

```ts
import { EditorView } from '@codemirror/view';

// @ts-expect-error, not typed
const editorView = view.editor.cm as EditorView;
```

## 视图插件

您可以通过 `EditorView.plugin()` 方法访问[视图插件](./view-plugins.md)实例。

```ts
this.addCommand({
  id: 'example-editor-command',
  name: 'Example editor command',
  editorCallback: (editor, view) => {
    // @ts-expect-error, not typed
    const editorView = view.editor.cm as EditorView;

    const plugin = editorView.plugin(examplePlugin);

    if (plugin) {
      plugin.addPointerToSelection(editorView);
    }
  },
});
```

## 状态字段

您可以在编辑器视图上直接更改和发送状态效果，见[状态字段](./state-fields.md)。

```ts
this.addCommand({
  id: 'example-editor-command',
  name: 'Example editor command',
  editorCallback: (editor, view) => {
    // @ts-expect-error, not typed
    const editorView = view.editor.cm as EditorView;

    editorView.dispatch({
      effects: [
        // ...
      ],
    });
  },
});
```
