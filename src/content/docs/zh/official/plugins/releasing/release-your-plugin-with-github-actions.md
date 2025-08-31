<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 使用GitHub Actions发布插件

---

手动发布插件可能既耗时又容易出错。在本指南中，您将配置插件，以便在创建新标签时使用 [GitHub Actions](https://github.com/features/actions)  自动创建发布。

1. 在插件的根目录的`.github/workflows`中 创建一个名为 `release.yml` 的文件，包含以下内容：

   ```yml
   name: Release Obsidian plugin

   on:
     push:
       tags:
         - '*'

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v3

         - name: Use Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18.x'

         - name: Build plugin
           run: |
             npm install
             npm run build

         - name: Create release
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
           run: |
             tag="${GITHUB_REF#refs/tags/}"

             gh release create "$tag" \
               --title="$tag" \
               --draft \
               main.js manifest.json styles.css
   ```

2. 在终端中，提交这个发布工作流定义文件。

   ```bash
   git add .github/workflows/release.yml
   git commit -m "Add release workflow"
   git push origin main
   ```

3. 创建与 `manifest.json` 文件中的版本信息相匹配的标记。

   ```bash
   git tag -a 1.0.1 -m "1.0.1"
   git push origin 1.0.1
   ```

   - `-a` 创建带注释的[标签](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_creating_tags)。
   - `-m` 指定版本的名称。必须与Obsidian插件版本相同。

4. 浏览到 GitHub 上的存储库，然后选择“Actions”选项卡。您的工作流可能仍在运行，或者已经完成。
5. 工作流完成后，返回存储库的主页，然后在右侧边栏中选择“Releases”。该工作流已创建 GitHub 版本草稿，并将所需的资产作为二进制附件上传。
6. 选择版本名称右侧的“编辑”（铅笔图标）。
7. 添加发行说明，让用户了解此版本中发生的情况，然后选择“发布版本”。

您已将插件设置为在创建新标签时自动创建 GitHub 版本。

- 如果这是此插件的第一个版本，您现在可以提交您的插件了。
- 如果这是对已发布插件的更新，则您的用户现在可以更新到最新版本。
