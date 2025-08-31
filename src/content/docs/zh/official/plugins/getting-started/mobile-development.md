---
title: Mobile Development
description: 关于 Mobile Development 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 移动开发

---

了解如何为移动设备开发插件。

## 在桌面上模拟移动设备

您可以直接从开发人员工具模拟运行移动设备的Obsidian。

1. 打开开发人员工具(Shift+Ctrl+i)。
2. 选择“控制台”选项卡。
3. 输入以下内容，然后按 `Enter` 。

   ```ts
   this.app.emulateMobile(true);
   ```

要禁用移动仿真，请输入以下内容并按： `Enter`。

```ts
this.app.emulateMobile(false);
```

> Tip
> 若要来回切换移动仿真，可以使用以下 `this.app.isMobile` 标志：

```ts
this.app.emulateMobile(!this.app.isMobile);
```

## 检查实际移动设备上的 Web 视图

### Android

如果您在Android的开发人员设置中启用USB调试，则可以检查Android设备上运行的Obsidian。然后转到台式机/笔记本电脑上基于 Chromium 的浏览器并导航到 chrome://inspect/ 。如果您通过 USB 将手机/平板电脑连接到您的 PC，并且在该链接处打开浏览器，您应该会看到您的设备弹出，它会让您从那里运行通常的开发工具。

### iOS

您可以在运行 16.4 或更高版本的 iOS 设备和基于 macOS 的计算机上检查Obsidian。有关如何设置它的说明，请参阅：https://webkit.org/web-inspector/enabling-web-inspector/

## 匹配特定平台功能

要检测运行插件的平台，您可以使用 `Platform` ：

```ts
import { Platform } from 'obsidian';

if (Platform.isIosApp) {
  // ...
}

if (Platform.isAndroidApp) {
  // ...
}
```

## 在移动设备上禁用插件

如果您的插件需要 Node.js 或 Electron API，您可以阻止用户在移动设备上安装插件。

若要仅支持桌面应用，请在 [Manifest](https://docs.obsidian.md/Reference/Manifest) 中将`isDesktopOnly`设置为 `true`。

## 故障排除

本部分列出了针对移动设备进行开发时的常见问题。

### Node 和 Electron API

Node.js API 和 Electron API 在移动设备上不可用。任何对这些库的调用都会导致您的插件崩溃。

### 正则表达式中的Lookbehind

正则表达式中的后视功能仅在 iOS 16.4 及以上版本上受支持，部分 iPhone 和 iPad 用户可能仍使用早期版本。若要为 iOS 用户实现回退，请参阅 [Platform-specific features](https://docs.obsidian.md/Plugins/Getting+started/Mobile+development#Platform-specific%20features), 或使用 JavaScript 库来检测特定的浏览器版本。

有关详细信息和确切的版本统计信息，请参阅 [Can I Use](https://caniuse.com/js-regexp-lookbehind) ，查找“iOS 上的 Safari”。
