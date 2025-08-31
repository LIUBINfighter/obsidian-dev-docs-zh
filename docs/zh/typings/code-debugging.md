---
title: 调试你的代码
description: 学习如何调试你的 Obsidian 插件代码。
---

# Debug!

> [Debugging your code | Obsidian Typings (fevol.github.io)](https://fevol.github.io/obsidian-typings/guides/code-debugging/)

## 调试你的代码

### 展开代码跟踪

有时你想要弄清楚代码在执行时的路径。这对于调查函数调用之间的不一致行为或在打包/压缩的代码中找到你的函数的确切位置很有帮助。

```ts
// 记录当前代码的堆栈跟踪，同时记录任何提供的参数

/*
 * 在此处放置你的代码
 */
console.trace(var1, var2);
```

### 断点

像 IDE 一样，Chrome DevTools 提供了在特定代码行暂停的方法。以下是具体步骤：

1. 打开开发者工具（`Ctrl + Shift + I`）
2. 转到 `Sources` 标签页
3. 显示左侧栏（如果被隐藏）
4. 在 `top > obsidian.md > plugin:XXX` 下选择你的插件代码
5. 如果代码都在一行，点击 `Pretty format` 格式化
6. 点击行号设置断点
7. 运行代码启动调试器

![打开 DevTools 并设置断点](https://fevol.github.io/obsidian-typings/_astro/devtools-breakpoint.BG7iqnjX_vProE.webp)

注意：从控制台中的任何 `console.log`/`console.trace` 输出，你都可以直接跳转到转译文件中的对应位置

另外，你也可以通过代码添加断点：

```ts
function yourFunction() {
  // 在此处放置你的代码
  debugger; // 作为断点
}
```

### 调试

如果你设置了断点并且代码被执行，调试器通常会暂停。在这种状态下，你可以做以下事情：

1. 跳转到下一行（`F10`）
2. 步入函数（`F11`）或跳出函数（`Shift + F11`）
3. 继续执行代码直到下一个断点（`F8`）
4. 查看当前 `Scope` 中定义的值和参数
5. 查看当前 `Call Stack`
6. 转到 `Console` 标签页，你可以测试和操作当前作用域中的值

![断点暂停时的可用选项](https://fevol.github.io/obsidian-typings/_astro/devtools-breakpoint.BG7iqnjX_vProE.webp)

## 调查代码性能

### 计时你的代码

假设你想看看代码运行需要多长时间，不用麻烦地使用 `Date.now()` 然后记录它，你可以使用 [`console API`](https://developer.mozilla.org/en-US/docs/Web/API/console) 的内置命令：

```ts
// 测量代码执行时间并记录到控制台

console.time('label');
/*
 * 在此处放置你的耗时代码
 */
console.timeEnd('label');
```

### 火焰图（🔥📈）

如果你想要*更多*关于代码的信息，可以尝试生成火焰图。它显示所有触发的事件、执行的函数，并可视化程序的堆栈跟踪（包括由 web-workers 持有的单独线程）。

生成和显示火焰图：

1. 打开开发者工具（`Ctrl + Shift + I`）
2. 转到 `Performance` 标签页（可能隐藏在箭头后面）
3. 按下 `Record` 按钮或 `Ctrl + E`（devtools 标签页下最左边的按钮）
4. 执行你的代码（可以是命令、渲染等）
   _（如果你的代码只在应用/插件启动时运行，你可以运行 `Reload app without saving` 命令而不停止捕获 - 为了方便可以为此操作创建快捷方式）_
5. 用同样的按钮或 `Ctrl + E` 停止记录
6. 等待图表渲染
   ![打开 Performance 标签页并捕获火焰图](https://fevol.github.io/obsidian-typings/_astro/flame-chart-open.C6XSFKfo_ZRkEzM.webp)

### 使用火焰图

`Performance` 捕获中包含大量信息，以下是一些重要元素：

1. 如果启用了 `Screenshots` 选项（见顶部栏），你可以悬停在图片上查看应用在那个时刻的确切外观
2. 在 `Main` 下，你可以看到随时间在主线程上执行的所有函数。
   a) 高峰表示大量函数调用（深度嵌套）
   b) 宽块表示**长执行时间**
3. 放大图表以缩小时间间隔
4. 点击图表中的块
5. ...查看它是如何执行的信息
   ![带有块信息的火焰图](https://fevol.github.io/obsidian-typings/_astro/flame-chart-analyze.0uJbqCiZ_Z16YB3H.webp)

### 向火焰图添加标记

火焰图是很棒的工具，但要找到代码在何时何地执行可能会很棘手 - 特别是当有几十个其他插件同时运行代码时。

幸运的是，[`performance API`](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Performance_data) 提供了一些方法，可以在 `Timings` 下向图表添加标记

```ts
// 测量代码执行时间并在 Performance 火焰图的 'Timings' 下标记

performance.mark('start');
// 在此处放置你的耗时代码
performance.mark('end');
const code_perf = performance.measure('label', 'start', 'end');
// 可用于计算平均值并记录
```

![带有特定代码块标记的火焰图](https://fevol.github.io/obsidian-typings/_astro/flame-chart-markings.uxD3krqH_M8flY.webp)

### 解读你的火焰图

如前所述，**宽**块是性能不佳的根本原因。在我展示的示例中（我的插件），执行一个渲染函数需要 20ms（如 `Summary` 中给出的 `Total Time` 所示）。

通过图表，你可以轻松地向下滚动火焰图（或查看 `Call Tree`）来确切地看到为什么函数性能不佳。在我的例子中，我注意到大量时间都花在运行 `MarkdownRenderer.render` 函数上。

最后，在检测到性能瓶颈后，你可以采取措施减少其使用并确保尽可能少地调用它，或者编写一个更高效的函数。

### 额外提示

当你有一个 `Performance Snapshot` 时，你可以转到 `Sources` 标签页，它现在会在（某些）代码行旁边显示毫秒级的持续时间，这可以指示执行特定行/函数需要多长时间

（注意：这个持续时间具体代表什么在任何地方都没有明确记录）

![Sources 标签页中的性能指标](https://fevol.github.io/obsidian-typings/_astro/flame-chart-snapshot.CPxOEuaT_1lwlKI.webp)
