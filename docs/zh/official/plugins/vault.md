<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 库

---

Obsidian中的每个笔记集合都称为 Vault。Vault 由一个文件夹及其中的所有子文件夹组成。

虽然您的插件可以像其他 Node.js 应用程序一样访问文件系统，但 [Vault](https://docs.obsidian.md/Reference/TypeScript+API/Vault/Vault) 模块能更轻松地处理 Vault 中的文件和文件夹。

以下示例以递归方式打印 Vault 中所有 Markdown 文件的路径：

```ts
const files = this.app.vault.getMarkdownFiles();

for (let i = 0; i < files.length; i++) {
  console.log(files[i].path);
}
```

> [!NOTE]
>
> 如果要列出所有文件，而不仅仅是 Markdown 文档，请改用 [getFiles()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/getFiles)。

## 读取文件

有两种方法可以读取文件的内容： [read()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/read) 和 [cachedRead()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/cachedRead)。

- 如果只想向用户显示内容，则使用 `cachedRead()` 以避免多次从磁盘读取文件。
- 如果要读取内容，更改内容，然后将其写回磁盘，请使用 `read()` 以避免使用过时的副本覆盖文件。

> [!NOTE]
>
> `read()` 和 `cachedRead()` 唯一区别体现在插件即将读取文件，而文件在 Obsidian 外被修改了的时候。当文件系统通知 Obsidian 文件在外部被修改， `cachedRead()` 方法就会表现得 *完全* 与 `read()` 方法一样。同样的，如果您在 Obsidian 内保存了文件，那么读取缓存也会被刷新。

以下示例读取 Vault 中所有 Markdown 文件的内容，并返回平均文档大小：

```ts
import { Notice, Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('info', 'Calculate average file length', async () => {
      const fileLength = await this.averageFileLength();
      new Notice(`The average file length is ${fileLength} characters.`);
    });
  }

  async averageFileLength(): Promise<number> {
    const { vault } = this.app;

    const fileContents: string[] = await Promise.all(
      vault.getMarkdownFiles().map((file) => vault.cachedRead(file)),
    );

    let totalLength = 0;
    fileContents.forEach((content) => {
      totalLength += content.length;
    });

    return totalLength / fileContents.length;
  }
}
```

## 修改文件

若要将文本内容写入现有文件，请使用 [Vault.modify()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/modify) 。

```ts
function writeCurrentDate(vault: Vault, file: TFile): Promise<void> {
  return vault.modify(
    file,
    `Today is ${new Intl.DateTimeFormat().format(new Date())}.`,
  );
}
```

如果要根据文件的当前内容修改文件，请改用 [Vault.process()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/process) 。第二个参数是提供当前文件内容并返回修改后的内容的回调。

```ts
// emojify replaces all occurrences of :) with 🙂.
function emojify(vault: Vault, file: TFile): Promise<string> {
  return vault.process(file, (data) => {
    return data.replace(':)', '🙂');
  });
}
```

`Vault.process()` 是 [Vault.read()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/read)  和 [Vault.modify()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/modify) 之上的抽象，可保证文件在读取当前内容和写入更新内容之间不会发生变化。始终首选 `Vault.process()`优于 `Vault.read()` / `Vault.modify()` 以避免意外丢失数据。

### 异步修改

[Vault.process()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/process)  仅支持同步修改。如果需要异步修改文件：

1. 使用 [Vault.cachedRead()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/cachedRead) 读取文件。
2. 执行异步操作。
3. 使用 [Vault.process()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/process) 更新文件。

记得检查 `process()` 回调中的数据是否与  `cachedRead()` 返回的数据相同 。如果它们不相同，则意味着文件已由不同的进程更改，您可能需要要求用户确认或重试。

## 删除文件

有两种方法可以删除文件：[delete()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/delete) 和 [trash()](https://docs.obsidian.md/Reference/TypeScript+API/Vault/trash)。您应该使用哪一个取决于您是否要允许用户改变主意。

- `delete()` 删除文件而不可恢复。
- `trash()` 将文件移至垃圾箱。

使用 `trash()` 时，您可以选择将文件移动到系统的垃圾箱，或移动到用户 Vault 根目录下的本地 `.trash` 文件夹。

## 是文件还是文件夹？

某些操作返回或接受 [TAbstractFile](https://docs.obsidian.md/Reference/TypeScript+API/TAbstractFile) 对象 ，该对象可以是文件或文件夹。使用前务必检查 `TAbstractFile` 类型。

```ts
const folderOrFile = this.app.vault.getAbstractFileByPath('folderOrFile');

if (folderOrFile instanceof TFile) {
  console.log("It's a file!");
} else if (folderOrFile instanceof TFolder) {
  console.log("It's a folder!");
}
```
