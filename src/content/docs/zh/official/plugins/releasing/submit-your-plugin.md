<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 提交您的插件

---

如果你想与Obsidian社区分享你的插件，最好的方法是将其提交到插件的[官方列表](https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugins.json)中。一旦我们审核并发布了您的插件，用户就可以直接从 Obsidian 中安装它。它还将出现在 Obsidian 网站的[插件目录](https://obsidian.md/plugins)中。

您只需要提交插件的初始版本。插件发布后，用户可以直接在 Obsidian 中，从 GitHub 下载新版本。

## 先决条件

要完成本指南，您需要：

- 一个 GitHub 帐户。

## 准备工作

在提交插件之前，请确保存库的根文件夹中有以下文件：

- `README.md`，描述插件的用途以及如何使用它。
- `LICENSE`，确定如何允许其他人使用插件及其源代码。如果您需要帮助来为您的插件[添加许可证](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)，请参阅[选择许可证](https://choosealicense.com/)。
- `manifest.json`,描述您的插件。有关详细信息，请参阅[Manifest](https://docs.obsidian.md/Reference/Manifest) 。

## 第 1 步：将插件发布到 GitHub

> [!NOTE] 模板存储库
>
> 如果您通过我们的模板存储库创建了插件，可以跳过此步骤。

要查看您的插件，我们需要访问 GitHub 上的源代码。如果您不熟悉 GitHub，请参阅 GitHub 文档，了解如何[创建新存储库](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)。

## 第 2 步：创建Release

在此步骤中，您将为插件准备一个可供提交的版本。

1. 在 中 `manifest.json` ，根据 [Semantic Versioning](https://semver.org/) 版本规范更新 `version` ，例如：初始版本为`1.0.0` 。版本号只能使用数字和句点 （ `.` ）。
2. [创建 GitHub 版本](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release)。发行版的“Tag版本”必须与 `manifest.json`一致。
3. 输入版本的名称，并在描述字段中对其进行说明。Obsidian对这部分没有要求，因此请随意命名。
4. 将以下插件资产作为二进制附件上传到版本：
   - `main.js`
   - `manifest.json`
   - `styles.css` (optional)  `styles.css` （可选）

## 第 3 步：提交插件以供审核

在此步骤中，您将插件提交给Obsidian团队进行审核。

1. 在 [community-plugins.json](https://github.com/obsidianmd/obsidian-releases/edit/master/community-plugins.json) 中，在 JSON 数组的末尾添加一个新条目。

   ```json
   {
     "id": "doggo-dictation",
     "name": "Doggo Dictation",
     "author": "John Dolittle",
     "description": "Transcribes dog speech into notes.",
     "repo": "drdolittle/doggo-dictation"
   }
   ```

   - `id` `author` 、 `name` ，并 `description` 确定插件对用户的显示方式，并且应与 [Manifest](https://docs.obsidian.md/Reference/Manifest)中的相应属性匹配。
   - `id` 对于您的插件来说是独一无二的。搜索 `community-plugins.json` 以确认没有具有相同 ID 的现有插件。 `id` 不能包含 `obsidian` .
   - `repo` 是 GitHub 存储库的路径。例如，如果 GitHub 存储库位于 https://github.com/your-username/your-repo-name ，则路径为 `your-username/your-repo-name` .

   请记住在上一个条目的右大括号 后 `}` 添加一个逗号。

2. 选择 **Commit changes...** 在右上角。
3. 选择 **Propose changes** 。
4. 选择 **Create pull request**。
5. 选择 **Preview**, 然后选择 **Community Plugin**。
6. 点击 **Create pull request**。
7. 在拉取请求的名称中，输入 "Add [...] plugin", 其中 [...] 是插件的名称 。
8. 在拉取请求说明中填写详细信息。对于复选框，在方括号中增加 `x` 将其标记为完成。
9. 点击 **Create pull request** (for the last time 🤞)。

您现在已将插件提交到Obsidian插件目录。坐下来等待我们友好的机器人进行初步验证。可能需要几分钟时间才能准备好结果。

- 如果你在 PR 上看到“准备评审”标签，则表示你的提交已通过自动验证。
- 如果在 PR 上看到“验证失败”标签，则需要解决所有列出的问题，直到机器人分配“准备查看”标签。

提交内容进入审核后，您可以坐下来等待Obsidian团队进行审核。

审核我的插件需要多长时间？

审核提交所需的时间取决于Obsidian团队的当前工作量。团队仍然很小，所以在等待插件审查时请耐心等待。我们目前无法估计何时能够审核您的提交。

## 第 4 步：处理审阅意见

一旦审阅者审查了你的插件，他们就会在你的拉取请求中添加一条评论，其中包含审查结果。审稿人可能会要求您更新插件，或者他们就如何改进提供建议。

解决任何必需的更改，并更新 GitHub 版本。在 PR 上发表评论，让我们知道你已解决反馈。不要打开新的 PR。

一旦我们验证了所有必需的更改都已得到解决，我们将立即发布插件。

> [!NOTE]
> 虽然只有Obsidian团队成员可以发布您的插件，但其他社区成员也可能在此期间提出审查您的提交。

## 下一步

一旦我们审核并发布了您的插件，就需要向社区宣布它：

- 在论坛的 [Share & showcase](https://forum.obsidian.md/c/share-showcase/9) 中宣布。
- 在 [Discord](https://discord.gg/veuWUTm) 的 `#updates`频道中宣布。您需要通过 [`developer` role](https://discord.com/channels/686053708261228577/702717892533157999/830492034807758859) 发布到 `#updates`频道。
