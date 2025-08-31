---
title: 添加新的类型定义
description: 学习如何查找、发现和添加新的类型定义。
---

# 添加新的类型定义

> [Adding New Typings | Obsidian Typings (fevol.github.io)](https://fevol.github.io/obsidian-typings/guides/adding-new-typings/)

### 查找/发现新的类型定义

添加新类型定义的第一步是在 Obsidian 应用程序中找到你想要添加类型定义的对象/接口/模块。
最简单的方法是打开 Obsidian DevTools 控制台（`Ctrl + Shift + I`），然后从 `app.` 对象开始搜索你想要定义类型的接口。

例如，如果你想为 `InternalPlugins` 对象添加类型定义，你可以在控制台中输入 `app.internalPlugins`，
这将产生以下输出：

![控制台中打印的类原型示例](https://fevol.github.io/obsidian-typings/_astro/prototype-reference.B6SwVAg__Z191fpR.webp)

注意 internalPlugins 对象包含多个原型：`InternalPlugins` 接口本身，以及
`Events` 类和 `Object` 字面量（不需要定义类型）。这可以通过查看（非）官方 API 中的其他定义来确定，
并检查两个对象是否定义了相同的属性。

因此，要定义 `InternalPlugin`，你可以从向 `InternalPlugins` 接口添加每个方法和属性开始：

```ts
interface InternalPlugins extends Events {
  // 变量
  app: App;
  config: Record<unknown, unknown>;
  migration: unknown;
  plugins: Record<unknown, unknown>;

  // 方法
  requestSaveConfig(): unknown;
  enable(): unknown;
  getEnabledPluginById(var1: unknown): unknown;
  getEnabledPlugins(): unknown;
  // ...
}
```

为了保持简单，我们首先为每个变量和方法添加 `unknown` 类型 -- 除非类型是显而易见的
（例如，`app` 总是 `App` 的实例）。

接下来是添加类型定义最繁琐的部分：为每个方法和变量找到正确的类型。

### `generateTypes` 辅助工具

我们构建了一个辅助工具来简化发现过程。生成的类型包含了可以从提供的对象访问到的所有属性和函数。

大多数类型，特别是函数参数会被标记为 `unknown`，所以你仍然需要通过反向工程逻辑来将 `unknown` 替换为有意义的类型，但这是一个很好的起点。

使用这个辅助工具的步骤：

1. 安装 [Fix Require Modules](https://obsidian.md/plugins?id=fix-require-modules) 插件。这是为了能够在 Obsidian DevTools 控制台中运行 `require('obsidian')`。
2. 从 [generateTypes.js](https://github.com/Fevol/obsidian-typings/blob/main/tools/generateTypes.js) 复制代码。
3. 打开 Obsidian DevTools 控制台（`Ctrl + Shift + I`）。
4. 将复制的代码粘贴到 Obsidian DevTools 控制台中。
5. 调用函数，例如 `generateTypes(app.internalPlugins)`。

这个辅助工具会尝试检测所有已知的 `obsidian` 类型，所以在输出中你会看到像 `App123` 这样的类型，这意味着它很可能可以直接替换为 `App`（来自 `obsidian` 类型），但辅助工具会保持推断这些类型以确保类型定义的完整性。

默认情况下，生成器深度为 `1`，但你可以通过 `generateTypes(app.internalPlugins, depth)` 来更改它，如果使用 `depth = 0` 则表示 `无限制`。

### 定义变量类型

最简单的开始方式是先处理变量。例如，在控制台输出中，你可以看到 `config`
将字符串映射到 `true`。在这种情况下，可以安全地假设 `config` 的类型是 `Record<string, boolean>`。

```ts
interface InternalPlugins extends Events {
  // ...
  config: Record<string, boolean>;
  // ...
}
```

然而，你还可以更进一步，考虑到每个字符串本质上是一个不同的插件 ID。
在这种情况下，我们可以定义一个包含所有插件 ID 的新类型，并将其用作 `config` 对象的键：

```ts
type InternalPluginName =
  | 'audio-recorder'
  | 'backlink'
  | 'bookmarks'
  | 'canvas' /*| ... */;
interface InternalPlugins extends Events {
  // ...
  config: Record<InternalPluginName, boolean>;
  // ...
}
```

类似地，你可以将 `plugins` 变量定义为 `Record<InternalPluginName, unknown>`。

进一步，可以安全地假设 `Plugins` 中的每个元素都是 `InternalPlugin` 类的某个实例，所以我们
还需要为此添加一个新的接口：

```ts
interface InternalPlugin {
  app: App;
  commands: unknown;
  // 等等（重复相同的过程）
}

interface InternalPlugins extends Events {
  // ...
  plugins: Record<InternalPluginName, InternalPlugin>;
  // ...
}
```

确保也要为每个变量添加简短的描述（使用 [TSDoc](https://tsdoc.org/)）。对于你不完全确定的变量，使用 `@internal` 标记。
可以从之前的类型定义或官方 API 中复制描述。

### 定义方法类型

定义方法类型会更困难一些，因为除了需要知道方法的功能外，还需要知道预期的输入和输出是什么。

你可以从那些不带参数且返回类型简单的方法开始。例如，`requestSaveConfig` 方法。
从名称上，我们可以假设这个方法可能*不会*返回任何内容，因为它只是告诉
应用程序应该保存配置，因此该方法*很可能*是 `void` 类型。

然而，为了确保这个假设是否正确，你**_应该_**检查源代码（参见下一节）。
如果可能的话，你也可以在控制台中运行该方法，看看会发生什么（在这种情况下，什么都没发生，所以很可能就是 `void`）。

和之前一样，如果你不确定返回类型或函数的一般工作方式，
在方法描述中添加 `@internal` 标记，和/或将返回类型标记为 `unknown`。

```ts
interface InternalPlugins extends Events {
  // ...
  /**
   * @internal 请求保存插件配置
   */
  requestSaveConfig(): unknown;
  // ...
}
```

接下来是带参数的方法。例如，`getEnabledPluginById` 方法接受一个参数。
这个参数很可能就是 `InternalPluginName` 类型，但同样，你可以通过
在控制台中运行该方法来轻松验证这一点（例如 `app.internalPlugins.getEnabledPluginById('audio-recorder')` 和 `app.internalPlugins.getEnabledPluginById('wrong-id')`）。

```ts
interface InternalPlugins extends Events {
  // ...
  /**
   * 通过 ID 获取内部插件
   * @param id - 要获取的插件 ID
   * @returns 插件实例
   */
  getEnabledPluginById(id: InternalPluginName): InternalPlugin;
  // ...
}
```
