<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 装饰

---

装饰可以让你控制[编辑器扩展](./editor-extensions.md)中内容的绘制或样式。如果你想通过添加、替换编辑器中的元素或为其设计样式来改变编辑器的外观和观感，那么你很可能需要使用装饰。

在本节结束时，您将能够：

- 了解如何使用装饰来改变编辑器外观。
- 了解使用状态字段和视图插件提供装饰的区别。

> [!NOTE]
>
> 本页旨在为Obsidian 插件开发人员提炼 CodeMirror 6 官方文档。有关状态字段的详细信息，请参阅 [Decorating the Document](https://codemirror.net/docs/guide/#decorating-the-document) 。

## 先决条件

- 对[状态字段](./state-fields.md)有基本了解。
- 对[视图插件](./view-plugins.md)有基本了解。

## 概述

如果没有装饰，文档将显示为纯文本，这有些没趣。使用装饰，你可以改变文档的显示方式，例如通过高亮显示文本或添加自定义 HTML 元素。

您可以使用以下类型的装饰：

- 使用[Mark decorations](https://codemirror.net/docs/ref/#view.Decoration%5Emark) 改变现有元素样式。
- 使用[Widget decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ewidget) 在文档中插入小部件元素。
- 使用[Replace decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ereplace) 隐藏可使用其它元素替换文档的部分内容。
- 使用[Line decorations](https://codemirror.net/docs/ref/#view.Decoration%5Eline) 为线条添加样式。

要使用装饰，需要在编辑器扩展中创建装饰，并由扩展将其提供给编辑器。向编辑器提供装饰有两种方式，一种是直接使用[状态字段](./state-fields.md)，另一种是间接使用[视图插件](./view-plugins.md)。

## 应该使用视图插件还是状态字段？

视图插件和状态字段都可以为编辑器提供装饰，但两者有一些区别。

- 如果可以根据[视窗](./viewport.md)中的内容确定装饰，则使用视图插件。
- 如果需要管理视窗以外的装饰，请使用状态字段。
- 如果要更改视窗的内容，例如添加换行符，请使用状态字段。

如果您可以使用这两种方法实现扩展，那么视图插件通常会带来更好的性能。例如，假设你想实现一个编辑器扩展，用于检查文档的拼写。

一种方法是将整个文档传递给外部拼写检查器，然后返回拼写错误列表。在这种情况下，您需要将每个错误映射到一个装饰，并使用一个状态字段来管理装饰，而不管当前视窗中有什么。

另一种方法是只对视窗中可见的内容进行拼写检查。扩展程序需要在用户滚动文档时持续运行拼写检查，但你可以对数百万行文本的文档进行拼写检查。

![State field vs. view plugin](../../../public/images/decorations.svg)

## 提供装饰

想象一下，您想创建一个编辑器扩展，用表情符号替换列表项。您可以使用视图插件或状态字段来实现这一功能，但两者之间存在一些差异。在本节中，你将看到如何使用这两种扩展来实现这一功能。

两种实现方式的核心逻辑相同：

1. 使用 [syntaxTree](https://codemirror.net/docs/ref/#language.syntaxTree)  查找列表项。
2. 对于每个列表项，用一个小部件替换前导连字符 `-` 。

### Widgets

Widget是可以添加到编辑器中的自定义 HTML 元素。您可以在文档的特定位置插入 Widget，也可以用 Widget 替换某个内容。

下面的示例定义了一个返回 HTML 元素 `<span>👉</span>` 的 widget。稍后您将使用该 widget。

```ts
import { EditorView, WidgetType } from '@codemirror/view';

export class EmojiWidget extends WidgetType {
  toDOM(view: EditorView): HTMLElement {
    const div = document.createElement('span');

    div.innerText = '👉';

    return div;
  }
}
```

要使用表情符号部件替换文档中的一系列内容，请使用 [replace decoration](https://codemirror.net/docs/ref/#view.Decoration%5Ereplace) 。

```ts
const decoration = Decoration.replace({
  widget: new EmojiWidget(),
});
```

### 状态字段

从状态栏中提供装饰：

1. 使用 `DecorationSet` 类型定义[状态字段](./state-fields.md)。
2. 为状态字段添加 `provide` 属性。

   ```ts
   provide(field: StateField<DecorationSet>): Extension {
     return EditorView.decorations.from(field);
   },
   ```

```ts
import { syntaxTree } from '@codemirror/language';
import {
  Extension,
  RangeSetBuilder,
  StateField,
  Transaction,
} from '@codemirror/state';
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from '@codemirror/view';
import { EmojiWidget } from 'emoji';

export const emojiListField = StateField.define<DecorationSet>({
  create(state): DecorationSet {
    return Decoration.none;
  },
  update(oldState: DecorationSet, transaction: Transaction): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    syntaxTree(transaction.state).iterate({
      enter(node) {
        if (node.type.name.startsWith('list')) {
          // Position of the '-' or the '*'.
          const listCharFrom = node.from - 2;

          builder.add(
            listCharFrom,
            listCharFrom + 1,
            Decoration.replace({
              widget: new EmojiWidget(),
            }),
          );
        }
      },
    });

    return builder.finish();
  },
  provide(field: StateField<DecorationSet>): Extension {
    return EditorView.decorations.from(field);
  },
});
```

### 视图插件

使用视图插件管理装饰：

1. 创建视图插件。
2. 为插件添加 `DecorationSet` 成员属性。
3. 初始化 `constructor()` 中的装饰。
4. 在 `update()` 中重建装饰。

并非所有更新都需要重建装饰。下面的示例只在底层文档或视窗发生变化时重建装饰。

```ts
import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder } from '@codemirror/state';
import {
  Decoration,
  DecorationSet,
  EditorView,
  PluginSpec,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@codemirror/view';
import { EmojiWidget } from 'emoji';

class EmojiListPlugin implements PluginValue {
  decorations: DecorationSet;

  constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  destroy() {}

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    for (let { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter(node) {
          if (node.type.name.startsWith('list')) {
            // Position of the '-' or the '*'.
            const listCharFrom = node.from - 2;

            builder.add(
              listCharFrom,
              listCharFrom + 1,
              Decoration.replace({
                widget: new EmojiWidget(),
              }),
            );
          }
        },
      });
    }

    return builder.finish();
  }
}

const pluginSpec: PluginSpec<EmojiListPlugin> = {
  decorations: (value: EmojiListPlugin) => value.decorations,
};

export const emojiListPlugin = ViewPlugin.fromClass(
  EmojiListPlugin,
  pluginSpec,
);
```

`buildDecorations()` 是一个辅助方法，可根据编辑器视图创建一套完整的装饰。

请注意 `ViewPlugin.fromClass()` 函数的第二个参数。 `PluginSpec` 中的 `decorations` 属性指定了视图插件向编辑器提供装饰的方式。

由于视图插件知道用户可以看到什么，因此可以使用 `view.visibleRanges` 来限制访问语法树的哪些部分。
