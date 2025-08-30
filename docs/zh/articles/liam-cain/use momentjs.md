---
title: '使用momentjs'
source: 'https://liamca.in/Obsidian/API+FAQ/third-party/use+momentjs'
created: 2025-03-26
tags:
  - 'clippings'
---

## 如何在不引起Typescript报错的情况下使用window.moment?

[#obsidian/api/faq](https://liamca.in/Obsidian/API+FAQ/third-party/#obsidian/api/faq)

## 设置

你可以通过在你的插件主文件中添加以下代码来[`声明`](https://github.com/liamcain/obsidian-calendar-ui/blob/76febf71efc19f80496de9e9d3341220954c83a7/src/index.ts#L10):

```ts
import type moment from 'moment';

declare global {
  interface Window {
    moment: typeof moment;
  }
}
```

你还需要在`package.json`文件的`devDependencies`中添加`@types/moment`。

```bash
// npm
npm install --save --save-exact @types/moment
npm install

// yarn
yarn add --exact @types/moment
yarn
```

不用担心，这些类型仅在编译时使用，不会实际将`moment`添加到你的打包文件中！

## 使用方法

完成上述设置后，你应该可以通过`window.moment`访问moment.js。

### 一个小问题

使用`import type`导入默认导出会触发警告，除非你在tsconfig.json中设置`allowSyntheticDefaultImports: true`。

#### 使用sample-plugin的tsconfig示例

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true, // <-- 添加这一行
    "baseUrl": ".",
    "inlineSourceMap": true,
    "inlineSources": true,
    "module": "ESNext",
    "target": "es6",
    "allowJs": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "lib": ["dom", "es5", "scripthost", "es2015"]
  },
  "include": ["**/*.ts"]
}
```
