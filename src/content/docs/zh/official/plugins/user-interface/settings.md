---
title: Settings
description: 关于 Settings 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 设置

---

如果想让用户自己配置插件的某些部分，可以将它们作为设置公开。

在本指南中，您将学习如何创建这样的设置页面 👇

![07pi6](../../../../public/images/07pi6.png)

在插件中添加设置的主要目的是存储配置，即使用户退出Obsidian 后，这些配置也会持续存在。下面的示例演示了如何从磁盘保存和加载设置：

```ts
import { Plugin } from 'obsidian';
import { ExampleSettingTab } from './settings';

interface ExamplePluginSettings {
  dateFormat: string;
}

const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  dateFormat: 'YYYY-MM-DD',
};

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new ExampleSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

> [!warning] 设置中的嵌套属性
>
> `Object.assign()` 仅复制嵌套属性的引用（浅拷贝）。如果设置对象包含嵌套属性，则需要递归复制每个嵌套属性（深拷贝）。否则，对嵌套属性的任何更改都将应用于所有使用 `Object.assign()`复制的对象。

这里发生了很多事情🤯，让我们仔细看看每个部分。

## 创建设置定义

首先，您需要创建一个 `ExamplePluginSettings` 定义，说明您希望用户能够配置哪些设置。启用插件后，您可以通过 `settings` 成员变量访问设置。

```ts
interface ExamplePluginSettings {
  dateFormat: string;
}

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  // ...
}
```

## 保存和加载设置对象

[loadData()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/loadData) 和 [saveData()](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/saveData) 提供了一种从磁盘存储和加载数据的简便方法。该示例还引入了两个辅助方法，使 `loadData()` 和 `saveData()` 更容易被插件的其他部分使用。

```ts
export default class ExamplePlugin extends Plugin {
  // ...

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

最后，确保在插件加载时加载设置：

```ts
async onload() {
  await this.loadSettings();

  // ...
}
```

## 提供默认值

当用户首次启用插件时，所有设置都尚未配置。上例为所有缺失的设置提供了默认值。

要了解其工作原理，让我们看看下面的代码：

```ts
Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
```

`Object.assign()` 是一个 JavaScript 函数，可将一个对象的所有属性复制到另一个对象中。所有通过 `loadData()` 返回的属性都会覆盖 `DEFAULT_SETTINGS` 中的属性。

```ts
const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  dateFormat: 'YYYY-MM-DD',
};
```

> [!tip]
>
> `Partial<Type>` 是一个 TypeScript 工具，它返回一个类型，其中 `Type`的所有属性都为可选。它启用了类型检查，同时可定义需要提供默认值的属性。

## 注册设置选项卡

插件现在可以保存和加载插件配置，但用户还没有办法更改设置。通过添加设置选项卡，您可以为用户提供一个易于使用的界面来更新他们的插件设置：

```ts
this.addSettingTab(new ExampleSettingTab(this.app, this));
```

在这里， `ExampleSettingTab` 是一个继承自 [PluginSettingTab](https://docs.obsidian.md/Reference/TypeScript+API/PluginSettingTab) 的类：

```ts
import ExamplePlugin from './main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class ExampleSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Date format')
      .setDesc('Default date format')
      .addText((text) =>
        text
          .setPlaceholder('MMMM dd, yyyy')
          .setValue(this.plugin.settings.dateFormat)
          .onChange(async (value) => {
            this.plugin.settings.dateFormat = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
```

在`display()` 中可以为设置选项卡创建内容。更多信息请参阅[HTML 元素](./html-elements.md)。

`new Setting(containerEl)` 会将设置附加到容器中。本示例通过`addText()`使用文本字段，但还有其他几种设置类型可供选择。 

只要文本字段的值发生变化，就会更新设置对象，然后保存到磁盘：

```ts
.onChange(async (value) => {
  this.plugin.settings.dateFormat = value;
  await this.plugin.saveSettings();
})
```

干得漂亮！💪 您的用户将感谢您为他们提供了自定义插件的方法。在开始下一个指南前，请尝试使用您所学到的知识，添加其它的设置。
