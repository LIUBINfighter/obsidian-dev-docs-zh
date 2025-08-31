---
title: Use Svelte In Your Plugin
description: 关于 Use Svelte In Your Plugin 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 使用Svelte

---

本指南介绍如何配置您的插件以使用 [Svelte](https://svelte.dev/) ，这是一种轻量级替代传统框架（如React和Vue）的方法。

Svelte是围绕一个编译器构建的，它预处理您的代码并输出纯JavaScript，这意味着它在运行时不需要加载任何库。这也意味着它不需要虚拟DOM来跟踪状态变化，这使得您的插件可以以最小的开销运行。

如果你想了解更多关于Svelte以及如何使用它的信息，请参考 [tutorial](https://svelte.dev/tutorial/basics) 和 [documentation](https://svelte.dev/docs) 。

这个指南假设你已经完成了[构建一个插件](../../plugins/getting-started/build-a-plugin.md)。

> Visual Studio Code
>
> Svelte有一个 [official Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) ，可以在Svelte组件中实现语法高亮和丰富的智能感知。

## 配置您的插件

构建Svelte应用程序，您需要安装依赖项并配置插件以编译使用Svelte编写的代码。

1. 将Svelte添加到您的插件依赖项中：

   ```bash
   npm install --save-dev svelte svelte-preprocess @tsconfig/svelte esbuild-svelte
   ```

2. 扩展 `tsconfig.json` 以对常见的Svelte问题进行额外的类型检查。`types` 属性对于TypeScript 识别 `.svelte` 文件很重要。

   ```json
   {
     "extends": "@tsconfig/svelte/tsconfig.json",
     "compilerOptions": {
       "types": ["svelte", "node"]

       // ...
     }
   }
   ```

3. 从您的 `tsconfig.json` 中删除以下行，因为它与Svelte配置冲突。

   ```json
   "inlineSourceMap": true,
   ```

4. 在文件的顶部添加以下导入：

   ```js
   import esbuildSvelte from 'esbuild-svelte';
   import sveltePreprocess from 'svelte-preprocess';
   ```

5. 将Svelte添加到插件列表中。

   ```js
   esbuild
     .build({
       plugins: [
         esbuildSvelte({
           compilerOptions: { css: true },
           preprocess: sveltePreprocess(),
         }),
       ],
       // ...
     })
     .catch(() => process.exit(1));
   ```

## 创建一个Svelte组件

在插件的根目录中，创建一个名为 `Component.svelte` 的新文件：

```tsx
<script lang="ts">
  export let variable: number;
</script>

<div class="number">
  <span>My number is {variable}!</span>
</div>

<style>
  .number {
    color: red;
  }
</style>
```

## 安装Svelte组件

要使用Svelte组件，需要将其挂载在现有的 [HTML element](https://docs.obsidian.md/Plugins/User+interface/HTML+elements) 上。例如，你要在Obsidian的自定义 [ItemView](https://docs.obsidian.md/Reference/TypeScript+API/ItemView) 上进行挂载：

```ts
import { ItemView, WorkspaceLeaf } from 'obsidian';

import Component from './Component.svelte';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
  component: Component;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    this.component = new Component({
      target: this.contentEl,
      props: {
        variable: 1,
      },
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}
```

> 信息
>
> Svelte要求至少使用TypeScript 4.5。如果在构建插件时出现以下错误，请升级到更高版本的TypeScript。

```plain
error TS5023: Unknown compiler option 'preserveValueImports'.
```

要修复错误，请在终端中运行以下命令：

```bash
npm update typescript@~4.5.0
```

## 创建一个Svelte存储

按照以下步骤，为您的插件创建一个存储并从通用的Svelte组件中访问它，而不是将插件作为属性传递：

1. 创建一个名为 `store.ts` 的文件

   ```jsx
   import { writable } from "svelte/store";
   import type ExamplePlugin from "./main";

   const plugin = writable<ExamplePlugin>();
   export default { plugin };
   ```

2. 配置存储

   ```ts
   import { ItemView, WorkspaceLeaf } from 'obsidian';
   import type ExamplePlugin from './main';
   import store from './store';
   import Component from './Component.svelte';

   const VIEW_TYPE_EXAMPLE = 'example-view';

   class ExampleView extends ItemView {
     // ...

     async onOpen() {
       store.plugin.set(this.plugin);

       this.component = new Component({
         target: this.contentEl,
         props: {
           variable: 1,
         },
       });
     }
   }
   ```

3. 在你的组件中使用该存储

   ```jsx
   <script lang='ts'>
     import type MyPlugin from "./main"; let plugin: MyPlugin;
     store.plugin.subscribe((p) => (plugin = p));
   </script>
   ```
