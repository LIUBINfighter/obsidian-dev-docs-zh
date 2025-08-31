---
title: Release Your Theme With Github Actions
description: 关于 Release Your Theme With Github Actions 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 使用GitHub Actions发布主题

---

手动发布主题可能非常耗时且容易出错。在本指南中，您将配置主题以使用 [GitHub Actions](https://github.com/features/actions) 在创建新标签时自动创建版本。

1. 在主题的根目录中，在 `.github/workflows` 下创建一个名为 `release.yml` 的文件，包含以下内容：

   ```yml
   name: Release Obsidian theme

   on:
     push:
       tags:
         - '*'

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v3

         - name: Create release
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
           run: |
             tag="${GITHUB_REF#refs/tags/}"

             gh release create "$tag" \
               --title="$tag" \
               --generate-notes \
               --draft \
               manifest.json theme.css
   ```

2. 在您的终端中，提交工作流程。

   ```bash
   git add .github/workflows/release.yml
   git commit -m "Add release workflow"
   git push origin main
   ```

3. 创建与 `manifest.json` 文件中的版本匹配的标记。

   ```bash
   git tag -a 1.0.1 -m "1.0.1"
   git push origin 1.0.1
   ```

   - `-a` 创建一个带注释的标签。
   - `-m` 指定您的版本的名称。必须与Obsidian插件版本相同。

4. 浏览到 GitHub 上的存储库并选择“操作”选项卡。您的工作流程可能仍在运行，或者可能已经完成。
5. 工作流程完成后，返回存储库的主页，然后在右侧边栏中选择“Releases”。该工作流程已创建草稿 GitHub 版本，并将所需的资产作为二进制附件上传。
6. 选择版本名称右侧的编辑（铅笔图标）。
7. 添加发行说明，让用户了解此版本中发生的情况，然后选择“Publish release”。

您已成功将主题设置为在创建新标签时自动创建 GitHub 版本。

- 如果这是该主题的第一个版本，您现在就可以[提交您的主题](./submit-your-theme.md)。
- 如果这是对已发布主题的更新，您的用户现在可以更新到最新版本。
