---
title: "obsidian-calendar-ui"
source: "https://liamca.in/Obsidian/Packages/obsidian-calendar-ui"
created: 2025-03-26
tags:
  - "clippings"
---
## calendar-ui

[Repo](https://github.com/liamcain/obsidian-calendar-ui)

I extracted view that powers the [Calendar](https://liamca.in/Obsidian/Plugins/Calendar) plugin into it's own package. If you need to embed a calendar widget into your plugin, you should be able to easily drop-in the calendar-ui package.

The view is build and compiled with Svelte; however, that DOES NOT mean you need to use Svelte for your plugin to use `calendar-ui`. You can instantiate the view as ifit were a plain JS class (because it is!). It can be attached to an arbitrary DOM element like so:

```ts
this.calendar = new Calendar({
  target: contentEl, // the HTML element you're attaching it to
  props: {},
});
```
