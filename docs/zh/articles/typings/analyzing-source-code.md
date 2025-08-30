---
title: 分析压缩后的源代码
description: 学习如何分析压缩后的源代码以理解未文档化函数的行为。
---

# 分析压缩后的源代码

> [Analyzing minified source code | Obsidian Typings (fevol.github.io)](https://fevol.github.io/obsidian-typings/guides/analyzing-source-code/)

## 遍历和分析源代码

有时仅仅查看函数名称并不足以理解它的功能，这就是为什么查看压缩源代码中的实际函数定义会很有帮助。

首先打开控制台，然后进入 `Sources` 标签页。在这里你会找到定义了所有内部方法的 `app.js` 文件。

1. 进入 `Sources` 标签页
2. 选择 `app.js` 文件
3. `格式化代码`（可选）
4. 将代码复制到你选择的 IDE 中（可选，但推荐）

![展示如何访问 `main.js`](https://fevol.github.io/obsidian-typings/_astro/accessing-main.D0s46UhZ_Qm9EM.webp)

有了压缩代码的访问权限后，你就可以开始搜索并找到你想要查看的方法的定义。

对于任何方法 "XYZ"，首先直接搜索 "XYZ"。通常，方法的定义方式有以下几种：

- `t.XYZ = ...`（静态方法）
- `t.prototype.XYZ = ...`（原型方法）
- `function XYZ(`（内部/压缩方法）

在这个阶段，你可能会很幸运地找到单一的定义，或者可能会找到多个方法定义。
在后一种情况下，
你需要尝试查看代码上下文来确定该方法属于哪个接口/类。
找到正确定义的主要技巧是，查看在原型上定义的其他方法，
并检查这些方法是否与你的对象的其他方法匹配。

找到正确的定义行后，你就可以开始分析代码来确定输入/输出类型
及其行为。

例如，`requestSaveConfig` 方法（前面提到过）的定义如下：

```js
n.requestSaveConfig = at(n.saveConfig.bind(n), 1e3, !0),
```

在这里，我们发现了以下三点：

- `at` 是一个接受三个参数的压缩函数，其返回值就是该方法的返回值
- `1e3` 是 `1000` 的简写表示法
- `!0` 是 `true` 的简写表示法

（在压缩代码中，你需要习惯很多这样的简写和结构变化）

由于我们不知道 `at` 的作用，我们需要再次搜索代码。确保启用大小写敏感和全字匹配搜索，因为 `at` 是一个很常见的词。
开始搜索 `function at` 或 `.prototype.at`。如果幸运的话，这会带你找到以下定义：

```js
function at(e, t, n) {
  (void 0 === t && (t = 0), void 0 === n && (n = !1));
  var i,
    r = null,
    o = null,
    a = null,
    s = 0,
    l = function () {
      var t = o,
        n = a;
      /*   ...    */
    };
}
```

你可能想要通过你喜欢的 LLM 或反压缩工具来处理代码，使其至少变得稍微可以理解。
根据你是否成功解密了代码，你现在可以明确定义该方法的行为和/或类型。

### 异步函数

逆向工程异步函数更具挑战性。

在 `app.js` 中，你不会看到很多 `async` 函数。大多数都被转换成了等效的状态机代码。

- 如果你的函数包含 `v(this, void 0,`，那它就是一个异步函数。
- 如果你的函数包含 `return [2]`，你的函数不返回任何内容，函数的返回类型将是 `Promise<void>`。
- 如果你的函数包含 `return [2, someValue]`，你的函数返回 `someValue`，函数的返回类型将是 `Promise<TypeOfSomeValue>`。
- 如果你的函数包含 `return [4, someValue]`，它对应于 `await someValue`，稍后通过 `n.sent()` 获取等待的值。

关于它具体如何工作的更多细节，请参见 [The `__generator` helper](https://github.com/microsoft/tslib/blob/main/docs/generator.md) 文档。
