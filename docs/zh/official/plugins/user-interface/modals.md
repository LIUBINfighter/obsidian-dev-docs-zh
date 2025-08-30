<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 模态框

---

模态框显示信息并接受用户输入。要创建一个模态框，请创建一个扩展 [Modal](https://docs.obsidian.md/Reference/TypeScript+API/Modal/Modal) 的类：

```ts
import { App, Modal } from 'obsidian';

export class ExampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.setText("Look at me, I'm a modal! 👀");
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
```

- [onOpen()](https://docs.obsidian.md/Reference/TypeScript+API/View/onOpen) 在打开模态框时调用，负责创建模态框的内容。更多信息请参阅 [HTML elements](https://docs.obsidian.md/Plugins/User+interface/HTML+elements)。
- [onClose()](https://docs.obsidian.md/Reference/TypeScript+API/Modal/onClose) 在模态框关闭时被调用，负责清理模态框使用的任何资源。

要打开模态框，请创建 `ExampleModal` 的新实例并调用 [open()](https://docs.obsidian.md/Reference/TypeScript+API/Modal/open) ：

```ts
import { Plugin } from 'obsidian';
import { ExampleModal } from './modal';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'display-modal',
      name: 'Display modal',
      callback: () => {
        new ExampleModal(this.app).open();
      },
    });
  }
}
```

## 接受用户输入

上一个示例中的模态只显示了一些文本。让我们来看一个更复杂的示例，它可以处理用户的输入。

![ttdgq](../../../../public/images/ttdgq.png)

```ts
import { App, Modal, Setting } from 'obsidian';

export class ExampleModal extends Modal {
  result: string;
  onSubmit: (result: string) => void;

  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl('h1', { text: "What's your name?" });

    new Setting(contentEl).setName('Name').addText((text) =>
      text.onChange((value) => {
        this.result = value;
      }),
    );

    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText('Submit')
        .setCta()
        .onClick(() => {
          this.close();
          this.onSubmit(this.result);
        }),
    );
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
```

结果存储在 `this.result` 中，并在用户点击提交时通过 `onSubmit` 回调返回：

```ts
new ExampleModal(this.app, (result) => {
  new Notice(`Hello, ${result}!`);
}).open();
```

## 从建议列表中选择

[SuggestModal](https://docs.obsidian.md/Reference/TypeScript+API/SuggestModal) 是一种特殊的模式，可让您向用户显示建议列表。

![4hqsi](../../../../public/images/4hqsi.gif)

```ts
import { App, Notice, SuggestModal } from 'obsidian';

interface Book {
  title: string;
  author: string;
}

const ALL_BOOKS = [
  {
    title: 'How to Take Smart Notes',
    author: 'Sönke Ahrens',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
  },
];

export class ExampleModal extends SuggestModal<Book> {
  // Returns all available suggestions.
  getSuggestions(query: string): Book[] {
    return ALL_BOOKS.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  // Renders each suggestion item.
  renderSuggestion(book: Book, el: HTMLElement) {
    el.createEl('div', { text: book.title });
    el.createEl('small', { text: book.author });
  }

  // Perform action on the selected suggestion.
  onChooseSuggestion(book: Book, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${book.title}`);
  }
}
```

除了 `SuggestModal` 之外，Obsidian API 还为建议提供了一种更为专业的模式： [FuzzySuggestModal](https://docs.obsidian.md/Reference/TypeScript+API/FuzzySuggestModal)。虽然它不能让您对每个项目的呈现方式进行相同的控制，但您可以获得开箱即用的模糊字符串搜索 [fuzzy string search](https://en.wikipedia.org/wiki/Approximate_string_matching) 。

![4wo3c](../../../../public/images/4wo3c.png)

```ts
export class ExampleModal extends FuzzySuggestModal<Book> {
  getItems(): Book[] {
    return ALL_BOOKS;
  }

  getItemText(book: Book): string {
    return book.title;
  }

  onChooseItem(book: Book, evt: MouseEvent | KeyboardEvent) {
    new Notice(`Selected ${book.title}`);
  }
}
```
