<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 命令

---

命令是用户可以通过 [命令面板](https://help.obsidian.md/Plugins/Command+palette) 或热键执行的操作。

![335e0](../../../public/images/335e0.png)

要为插件注册新命令，请在 `onload()` 方法中调用  [addCommand()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/addCommand) 方法：

```ts
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'print-greeting-to-console',
      name: 'Print greeting to console',
      callback: () => {
        console.log('Hey, you!');
      },
    });
  }
}
```

## 条件命令

如果您的命令只能在特定条件下运行，那么可以考虑使用 [checkCallback()](https://docs.obsidian.md/Reference/TypeScript+API/Command/checkCallback) 代替。

`checkCallback` 运行两次。首先，执行初步检查，以确定命令是否可以运行。第二步，执行操作。

由于两次运行之间可能会有时间间隔，因此需要在两次调用中都进行检查。

要确定回调是执行初步检查还是执行操作，需要向回调传递一个 `checking` 参数。

- 如果 `checking` 设置为 `true` ，请执行初步检查。
- 如果 `checking` 设置为 `false` ，则执行操作。

下面示例中的命令取决于一个必填值。在两次运行中，回调都会检查该值是否存在，但只有在 `checking` 是 `false` 时才执行操作。

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  // highlight-next-line
  checkCallback: (checking: boolean) => {
    const value = getRequiredValue();

    if (value) {
      if (!checking) {
        doCommand(value);
      }

      return true;
    }

    return false;
  },
});
```

## 编辑器命令

如果您的命令需要访问编辑器，也可以使用 [editorCallback()](https://docs.obsidian.md/Reference/TypeScript+API/Command/editorCallback),，它提供活动编辑器及其视图作为参数。

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  editorCallback: (editor: Editor, view: MarkdownView) => {
    const sel = editor.getSelection()

    console.log(`You have selected: ${sel}`);
  },
}
```

> Note 备注
>
> 编辑器命令只有在编辑器可用时才会出现在命令面板上。

如果编辑器回调只能在特定条件下运行，请考虑使用[editorCheckCallback()](https://docs.obsidian.md/Reference/TypeScript+API/Command/editorCheckCallback) 代替，更多信息请参阅[Conditional commands](https://docs.obsidian.md/Plugins/User+interface/Commands#Conditional%20commands)。

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  editorCheckCallback: (
    checking: boolean,
    editor: Editor,
    view: MarkdownView,
  ) => {
    const value = getRequiredValue();

    if (value) {
      if (!checking) {
        doCommand(value);
      }

      return true;
    }

    return false;
  },
});
```

## 热键

用户可以使用键盘快捷键或热键运行命令。用户可以自行配置，也可以提供默认热键。

> [!warning]
>
> 避免为插件设置默认热键。热键极有可能与其他插件或用户自己定义的热键发生冲突。

在本例中，用户可以同时按住 Ctrl（或 Mac 上的 Cmd）和 Shift，然后按键盘上的字母 `a` 来运行命令。

```ts
this.addCommand({
  id: 'example-command',
  name: 'Example command',
  hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'a' }],
  callback: () => {
    console.log('Hey, you!');
  },
});
```

> [!备注]
>
> Mod 键是一个特殊的修改键，在 Windows 和 Linux 系统中为 Ctrl 键，在 macOS 系统中为 Cmd 键。
