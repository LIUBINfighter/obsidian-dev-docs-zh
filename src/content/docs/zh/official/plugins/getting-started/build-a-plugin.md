---
title: Build A Plugin
description: 关于 Build A Plugin 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 构建一个插件

---

插件可让您使用自己的功能扩展 Obsidian，以创建自定义笔记体验。
在本教程中，您将从源代码编译示例插件并将其加载到 Obsidian 中。

## 学习内容

完成本教程后，您将能够：

- 配置开发 Obsidian 插件的环境。
- 从源代码编译插件。
- 对插件进行更改后重新加载插件。

## 先决条件

若要完成本教程，需要：

- Git 已安装在本地计算机上。
- 具备Node.js 本地开发环境。
- 代码编辑器，例如 Visual Studio Code。

## 准备工作

在开发插件时，一个错误可能会导致您的Obsidian库发生意外更改。为防止数据丢失，您永远不应该在主库中开发插件，应始终使用专用于插件开发的单独库。

[创建一个空的保管库](https://help.obsidian.md/Getting+started/Create+a+vault#Create+empty+vault)。

## 第 1 步：下载示例插件

在此步骤中，您需要将示例插件模板下载到保管库的 `.obsidian` 目录中的 `plugins` 目录，以便 Obsidian 可以找到它。

您将在本教程中使用的示例插件位于 [GitHub 存储库](https://github.com/obsidianmd/obsidian-sample-plugin)中。

1. 打开终端窗口，将项目目录更改为该 `plugins` 目录。

```shell
cd path/to/vault
mkdir .obsidian/plugins
cd .obsidian/plugins
```

2. 使用 Git 克隆示例插件模板。

```shell
git clone https://github.com/obsidianmd/obsidian-sample-plugin.git
```

> GitHub 模板存储库
>
> 示例插件的存储库是 GitHub 模板存储库，这意味着您可以从示例插件创建自己的存储库。要了解如何操作，请参阅从[模板创建存储库](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)。
>
> 请记住在克隆示例插件时使用您自己的存储库的 URL。

## 第 2 步：构建插件

在此步骤中，您将编译示例插件，以便 Obsidian 可以加载它。

1. 导航到插件目录。
   ```bash
   cd obsidian-sample-plugin
   ```
1. 安装依赖项。
   ```bash
   npm install
   ```
1. 编译源代码。以下命令在终端中保持运行，并在您修改源代码时重新构建插件。
   ```bash
   npm run dev
   ```

请注意，插件目录现在多了一个 `main.js` 文件，其中包含插件的编译版本。

## 第 3 步：启用插件

要在 Obsidian 中加载插件，您首先需要启用它。

1. 在黑曜石中，打开设置。
2. 在侧边菜单中，选择社区插件。
3. 选择启用社区插件。
4. 在“已安装的插件”下，通过选择旁边的切换按钮来启用示例插件。

您现在可以在 Obsidian 中使用该插件了。接下来，我们将对插件进行一些更改。

## 第 4 步：更新插件清单

在此步骤中，您将通过更新插件清单 来 `manifest.json` 重命名插件。清单包含有关插件的信息，例如其名称和描述。

1. 在代码编辑器中打开 `manifest.json` 。
2. 更改 `id` 唯一标识符，例如 `"hello-world"` .
3. 更改 `name` 名称，例如 `"Hello world"` .
4. 重新启动 Obsidian 以加载对插件清单的新更改。

返回到已安装的插件，请注意插件的名称已更新，以反映您所做的更改。

请记住，每当您对`manifest.json`进行更改时，请重新启动  Obsidian。

## 第 5 步：更新源代码

要让用户与您的插件交互，请添加一个功能区图标，在用户选择它时向用户弹出消息。

1. 在代码编辑器中打开 `main.ts` 。
2. 将类名从 `MyPlugin` 重命名 `HelloWorldPlugin` 。
3. 导入`obsidian`包 中的依赖组件。

   ```ts
   import { Notice, Plugin } from 'obsidian';
   ```

4. 在 `onload()`方法中 ，添加以下代码：

   ```ts
   this.addRibbonIcon('dice', 'Greet', () => {
     new Notice('Hello, world!');
   });
   ```

5. 在Obsidian“命令”面板中，选择“重新加载Obsidian而不保存当前编辑内容”以重新加载插件。

您现在可以在Obsidian窗口左侧的功能区中看到一个骰子图标。选择它以在右上角显示一条消息。

请记住，您需要在更改源代码后重新加载插件，方法是禁用它，然后在社区插件面板中再次启用它，或者使用命令面板，如本步骤的第 5 部分所述。

> 热重载
>
> 安装 [Hot-Reload](https://github.com/pjeby/hot-reload) 插件以在开发时自动重新加载插件。

## 结论

在本教程中，你已使用 TypeScript API 构建了第一个 Obsidian 插件。您已经修改了插件并重新加载了它，以让 Obsidian 更改生效。
