---
title: Submit Your Theme
description: 关于 Submit Your Theme 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 提交您的主题

---

如果您想与 Obsidian 社区分享您的主题，最好的方法是将其提交到[官方主题列表](https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json)。我们审核并发布您的主题后，用户可以直接从 Obsidian 中安装它。它还将出现在 Obsidian 网站的[插件目录](https://obsidian.md/plugins)中。

您只需提交主题的初始版本。发布主题后，用户可以直接从 Obsidian 中自动从 GitHub 下载新版本。

## 先决条件

要完成本指南，您需要：

- 一个 [GitHub](https://github.com/signup) 帐户。

## 在你开始之前

在提交主题之前，请确保存储库的根文件夹中有以下文件：

- 描述主题的 `README.md` 。
- `LICENSE` 确定如何允许其他人使用主题及其源代码。如果您需要帮助来为您的主题选择许可证，请参阅[选择许可证](https://choosealicense.com/)。
- 要在社区主题商店中显示的主题的屏幕截图。建议的图像尺寸：512 x 288 像素。
- 描述您的主题的 `manifest.json` 。有关详细信息，请参阅 [Manifest](https://docs.obsidian.md/Reference/Manifest)。

## 第 1 步：将您的主题发布到 GitHub

> [!NOTE] 模板存储库
>
> 如果您从我们的模板存储库之一创建主题，则可以跳过此步骤。

要查看您的主题，我们需要访问 GitHub 上的源代码。如果您不熟悉 GitHub，请参阅 GitHub 文档以了解如何[创建新存储库](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)。

## 第 2 步：提交您的主题以供审核

在此步骤中，您将把主题提交给 Obsidian 团队进行审核。

1. 在[community-css-themes.json](https://github.com/obsidianmd/obsidian-releases/edit/master/community-css-themes.json) 中，在JSON 数组的末尾添加一个新条目。以下示例显示了 [Minimal](https://github.com/kepano/obsidian-minimal) 主题的条目。

   ```json
   {
     "name": "Minimal",
     "author": "kepano",
     "repo": "kepano/obsidian-minimal",
     "screenshot": "dark-simple.png",
     "modes": ["dark", "light"]
   },
   ```

   - `name` 和 `author` 确定您的插件向用户显示的方式，并且应与 [Manifest](https://docs.obsidian.md/Reference/Manifest)中的相应属性匹配。
   - `repo` 是 GitHub 存储库的路径。例如，如果您的 GitHub 存储库位于 https://github.com/your-username/your-repo-name ，则路径为 `your-username/your-repo-name` 。
   - `screenshot` 是主题屏幕截图的路径。屏幕截图的纵横比为 16:9 时效果最佳。建议的图像尺寸：512 x 288 像素。
   - `modes` 列出了您的主题支持的颜色模式。

   请记住在上一个条目的右大括号 `}` 之后添加逗号。

2. 选择右上角的**Commit changes...**。
3. 选择 **Propose changes**。
4. 选择 **Create pull request**。
5. 选择 **Preview**, 然后选择 **Community Theme**。
6. 单击 **Create pull request**。
7. 在拉取请求的名称中，输入 "Add [...] theme", 其中 [...] 是您的主题的名称。
8. 在拉取请求的描述中填写详细信息。对于复选框，在方括号之间插入 `x` ，将其标记为已完成。
9. 单击 **Create pull request** （最后一次🤞）。

您现在已将主题提交到 Obsidian 主题目录。请坐下来等待我们审核您提交的内容。

审核我的主题需要多长时间？

审核您提交的内容所需的时间取决于 Obsidian 团队当前的工作量。团队规模还很小，所以请耐心等待您的主题被审核。目前，我们无法预估何时能够审核您提交的内容。

## 第 4 步：处理审核意见

审阅者审阅您的主题后，他们会向您的拉取请求添加评论以及审阅结果。审阅者可能会要求您更新主题，或者他们可以提供有关如何改进主题的建议。

决任何所需的更改并更新 GitHub 版本。请在 PR 上发表评论，让我们知道您已处理了反馈。不要打开新的 PR。

一旦我们确认所有必需的更改均已得到解决，我们将立即发布主题。

> [!NOTE]
>
> 虽然只有 Obsidian 团队成员可以发布您的主题，但其他社区成员也可能会同时审核您提交的内容。

##  下一步

一旦我们审核并发布了您的主题，就可以向社区宣布：

- 在论坛的 [Share & showcase](https://forum.obsidian.md/c/share-showcase/9) 中宣布。
- 在 [Discord](https://discord.gg/veuWUTm) 上的 `#updates` 频道中宣布。您需要 `developer` 角色才能在 `#updates` 中发帖。
