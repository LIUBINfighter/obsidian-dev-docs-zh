<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 构建主题

---

In this tutorial, you'll learn how to start developing a theme for Obsidian. Themes let you customize how Obsidian looks and feels, using CSS.  
在本教程中，您将学习如何开始为Obsidian开发主题。主题允许您使用 CSS 自定义Obsidian的外观和体验。

## 学习内容

完成本教程后，您将能够：

- 配置用于开发Obsidian主题的环境。
- 使用 CSS 变量更改Obsidian的外观。
- 创建同时支持浅色和深色配色方案的主题。

## 先决条件

若要完成本教程，需要：

- [Git](https://git-scm.com/) 在本地计算机上已安装。
- 代码编辑器，例如  [Visual Studio Code](https://code.visualstudio.com/)。

## 第 1 步：下载示例主题

在此步骤中，您需要将示例主题下载到库下 `.obsidian` 目录中的 `themes` 目录，以便 Obsidian 可以找到它。

您在本教程中使用的示例主题将在 [GitHub repository](https://github.com/obsidianmd/obsidian-sample-theme)中提供。

1. 打开终端窗口，将项目目录更改为该 `themes` 目录。

   ```bash
   cd path/to/vault/.obsidian/themes
   ```

2. 用 Git 克隆示例主题。

   ```bash
   git clone https://github.com/obsidianmd/obsidian-sample-theme.git "Sample Theme"
   ```

> [!tip] 模板存储库
>
> 示例主题的存储库是 GitHub 模板存储库，这意味着您可以从示例主题创建自己的存储库。要了解如何操作，请参阅 [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)。
>
> 请记住在克隆示例主题时使用您自己的存储库的 URL。

## 第 2 步：启用主题

1. 在Obsidian中，打开设置。
2. 在侧边菜单中，选择外观。
3. 在“主题”旁边，从下拉列表中选择“**Sample Theme**”。

您已启用示例主题。接下来，我们将对其进行一些更改。

## 第 3 步：更新 manifest

在此步骤中，您将通过更新 `manifest.json` 来重命名主题。manifest包含有关主题的信息，例如其名称和说明。

1. 在代码编辑器中打开 `manifest.json` 。
2. 更改 `name` 名称，例如 `"Disco Lights"` .
3. 将themes目录下的主题目录重命名为相同的名称。主题目录的名称必须与 `name` 中的 `manifest.json` 属性完全匹配。

   ```bash
   mv "Sample Theme" "Disco Lights"
   ```

4. 重新启动Obsidian以加载对清单的新更改。

返回到“设置”→“外观”→“主题”，发现主题的名称已更改。

请记住，每当您对 `manifest.json` 进行更改后，请重新启动 Obsidian。

## 第 4 步：更改字体

Obsidian使用 [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 来设置用户界面的样式。在此步骤中，您将使用 CSS 变量来更改编辑器中的字体。

1. 创建一个新笔记，例如“主题开发”。
2. 在笔记中输入以下文本：

   ```md
   Themes let you make [Obsidian](https://obsidian.md) look the way **you** want it.
   ```

3. 在 `theme.css` 中，添加以下内容：

   ```css
   body {
     --font-text-theme: Georgia, serif;
   }
   ```

编辑器将使用您定义的字体显示笔记。

## 第 5 步：更改背景颜色

主题可以支持浅色和深色配色方案。在 `.theme-light` 或 `.theme-dark`下 定义 CSS 变量。

1. 在  `theme.css` 中，添加以下内容：

   ```css
   .theme-dark {
     --background-primary: #18004f;
     --background-secondary: #220070;
   }

   .theme-light {
     --background-primary: #ece4ff;
     --background-secondary: #d9c9ff;
   }
   ```

2. 在Obsidian中，打开设置。
3. 在“外观”下，在“浅色”和“深色”之间切换基本配色方案。

您将看到Obsidian根据您选择的配色方案呈现颜色。尝试将颜色更改为 `red` 、 `green` 或 `blue` 进行更强烈的更改。

## 第 6 步：更改输入悬停边框颜色

当您希望主题中的每个子元素都可以访问变量时，通常会使用 `:root` 选择器。该选择器通常保存了插件变量。

下面是一个示例来说明其用法：

> [!NOTE] 示例
> 如果想在 Obsidian 中的不同位置找到的输入字段，例如设置或文本内容。要定义针对此输入字段的样式，我们可以使用 `:root` 选择器。
>
> ```css
> :root {
>   --input-focus-border-color: Highlight;
>   --input-focus-outline: 1px solid Canvas;
>   --input-unfocused-border-color: transparent;
>   --input-disabled-border-color: transparent;
>   --input-hover-border-color: black;
>   /* Default Input Variables for Root */
> }
> ```

现在，让我们修改 CSS 中的悬停边框颜色：

```css
:root {
  --input-hover-border-color: red;
  /* Change from Black to Red */
}
```

在此更新中，当您将鼠标悬停在任何输入字段上时，边框颜色将变为亮红色。

> [!NOTE]
>
> 在定义浅色和深色主题都相同的样式时，建议使用 `body` 选择器。
>
> 仅当您希望在浅色和深色主题之间切换时更改样式时，才使用 `.theme-dark` 或 `.theme-light` 选择器。
>
> `:root` 需要谨慎使用。尽量将变量放在`body`、 `.theme-dark` 或 `.theme-light` 选择器。

## 第 7 步：发现正在使用的 CSS 变量

Obsidian公开了 400 多个不同的 CSS 变量，用于自定义用户界面的不同部分。在此步骤中，您将找到用于更改功能区背景的 CSS 变量。

1. 在 中Obsidian，按 `Ctrl`+`Shift`+`I`（MacOS 按 `Cmd`+`Option`+`I` ）打开开发人员工具。
2. 打开“**Sources** ”选项卡。
3. 在“**Page → top → obsidian.md**,”下，选择“**app.css**”。
4. 滚动到顶部 `app.css` 以查找所有可用的 CSS 变量。
5. 通过按 `Ctrl` + `F` （或macOS 上的 `Cmd`  + `F` ）并键入“ --ribbon-”来搜索与功能区相关的变量。请注意两个空格，它们返回定义而不是它们的用法。

其中一个结果是 `--ribbon-background` ，很接近我们要找的。您还可以检索 HTML 以查找特定元素使用的 CSS 变量。

1. 在开发人员工具的左上角，选择看起来像矩形顶部光标的图标。
2. 在“样式”选项卡中，在“开发人员工具”的右侧，您现在可以看到应用于所选元素的 CSS，例如 `background-color: var(--ribbon-background)` .

现在您知道 `--ribbon-background` 控制功能区背景颜色，请将以下内容添加到 `theme.css` ：

```css
body {
  --ribbon-background: magenta;
}
```

## 结论

在本教程中，你已构建了第一个Obsidian主题。您已经修改了主题并重新加载了它，并在Obsidian应用了更改。您还了解了如何找到 CSS 变量来设置用户界面特定部分的样式。
