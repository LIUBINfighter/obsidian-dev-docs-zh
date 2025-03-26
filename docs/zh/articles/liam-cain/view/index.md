---
title: "index"
source: "https://liamca.in/Obsidian/Plugin+Review+Guide/index"
created: 2025-03-26
tags:
  - "clippings"
---
## Obsidian Plugin Review Guidelines

When reviewing an Obsidian plugin, your main focus should be making sure the plugin is functional and doesn't break compatibility with the app or other plugins.

## Requirements

### Look for cases of potential data loss

Data loss is the fastest way to lose a user's trust. While users are accepting some risk by enabling community-created plugins, data loss (even caused by a plugin) hurts Obsidian's image and makes users weary to install other plugins in the future. As a result, it's especially important that plugins modifying user data are thoroughly vetted and reviewed.

#### Common Pitfalls

##### Is the plugin writing stale data to disk?

This could be caused by using `cachedRead` then writing that result back to disk. Also keep an eye out for time gaps between reading the data, modifying it, and writing it back to disk.

### Security vulnerabilities

Is the plugin sending user data to a third-party service without the user knowing?

### Look for glaring logic errors

This section is a catch-all to say: "provide a thorough code review." Is the plugin properly handling edge cases? Does the behavior look consistent with what's expected?

## Recommendations

### Avoid using private APIs

If an API is not exposed (i.e. not in the API spec), plugin authors are recommended not to use it. Keep an eye out for cases where users are casting the `app` to `any` and reaching into the innards of Obsidian.

### Prefer simplicity

If a utility already exists in the Obsidian API, point users to use that over rolling their own variant. A few common examples of that are:

- **Date formatting.** Obsidian bundles Moment.js with it so for convenience and parity, users are recommended to use that over importing a new library or trying to format date strings themselves.
- **Debounce** Obsidian provides a simple `debounce` utilty that authors can use for throttling their functions without messing with setTimeout.

### Speed

Keep an eye out for operations that could impact Obsidian's performance.

### Type-Safety

While not a requirement, Typescript is recommended for plugins over vanilla Javascript for its added type checking. Not only does it help the plugin author, but it makes reviewing the plugins easier!

### Code Clarity

There's no formal Style Guide for plugins. That said, plugins should be readable. Code Formatters can go a long way in helping that.

If a plugin's formatting is impeding your ability to review it, ask them to format it with a tool such as [Prettier](https://prettier.io/).

### Plugin Best Practices

Obsidian Plugin devs are currently compiling a list of best practices for other devs to reference. [#TODO](https://liamca.in/Obsidian/Plugin+Review+Guide/#TODO)

For now, you can reference the [API FAQ](https://liamca.in/Obsidian/API+FAQ/index) which provides some more color to the API and example snippets for reference.

## Nonissues

### Competition

It's okay if more than one plugin provides the same utility.

### Frameworks

Authors are free to use external libraries and frameworks for their plugin.

## How to write the code review

- If you are going to review the PR, react with 👀 on original post to signal that you're reviewing it.
- Keep your Code Review in the the `obsidian-releases` PR body itself.
- From the `main` branch, make sure to reference lines of code with issues using "Copy Permalink" so that the links don't go stale if a new commit is pushed to the repo.
