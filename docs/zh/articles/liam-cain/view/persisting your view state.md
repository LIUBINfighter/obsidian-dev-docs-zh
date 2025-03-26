---
title: "persisting your view state"
source: "https://liamca.in/Obsidian/API+FAQ/views/persisting+your+view+state"
created: 2025-03-26
tags:
  - "clippings"
---
## Why you should be persisting your view's state to the workspace

*February 26, 2023*

I've reviewed [a lot of plugins](https://github.com/obsidianmd/obsidian-releases/pulls?q=is%3Apr+is%3Amerged+-label%3Atheme) and to my knowledge only a small handful are using properly persisting the the state of their plugin views. I think the problem is its not very well documented in the API, so no one really knows the right way.

If your plugin creates a custom view, there's a good chance it has a *state* associated with it. State could be anything: whether a toggle is on or off, a search query, or an associated file. More often that not, we choose to make that state [ephemeral](https://liamca.in/ephemeral+state) —we keep it as instance variables on our view, then when Obsidian gets restarted, that state is lost. *What's the alternative?* Well, the only option a plugin really has to persist data is using `saveData` and `loadData`. Or I guess there's localStorage, you might be thinking.

There is another option: `View.getState` and `View.setState`.

These methods allows you to keep the data *that describes the state of your view* serialized into the user's workspace.

## Advantages

It has some notable advantages over keeping view data in your plugin's data.json file.

### 1\. The data is view-specific

Keeping the data in the View instead of saving it to the Plugin means you could enable multiple copies of your view to be open without any extra messy data management on your end.

Why would I want multiple copies of my view to be created?

It might not always be desirable, but for views like Backlinks or Outline, it can be really powerful to have multiple copies of the view. Users might choose to pin the outline of a particular file for quick access.

### 2\. It's automatically serialized to the workspace.json file

The `workspace.json` file is the canonical representation of your current Obsidian layout. It describes what views are open, what's in the sidebar, what tabs and tab groups you have open, if you have any stacked tabs, etc.

It's also what gets used by the **Workspaces** core plugin. This means that automatically, your plugin's state will be stored and restored when the user switches between their different workspaces.

### 3\. The data lives only as long as the tab

Sometimes it's really nice to restore to a fresh state. Let's say you have a plugin view with lots of fancy toggles and filters. Users will likely expect closing the tab and opening a new one to get them back to square one. Keeping that information in the view means that as soon as that tab is closed, *poof*. That state is gone.

## When not to use View.getState and View.setState

These functions has a specific purpose. It shouldn't be used for any important user data. It shouldn't store anything that can't be deserialized. It shouldn't be used for any data that a user wouldn't want to lose by closing a tab.

An easy rule of thumb: if you restart Obsidian with your view already active, does your view have everything you need to pick up where you left off?

## Okay, enough talk, how do I use it?

All we need to implement is two functions our View subclass:

- `getState`
- `setState`

Here's an example of how we might use getState and setState for a calendar view.

```ts
interface ICalendarPersistedState {
  displayedMonth: string;
  selectedFilters: string[];
}

export default class CalendarView extends ItemView implements ICalendarPersistedState {
  // Persisted State
  displayedMonth: string;
  selectedFilters: string[];

  constructor(
    readonly leaf: WorkspaceLeaf,
    readonly plugin: CalendarPlugin
  ) {
    super(leaf);

    // Initialize persisted state
    this.selectedFilters = [];
    this.displayedMonth = window.moment().format();
  }

  // setState is called to pass data from the WorkspaceLeaf to the view.
  // When the workspace layout is getting deserialized, the flow is:
  // - Go through the serialized workspace and when you encounter a leaf, create a new leaf.
  // - Call setViewState on the new leaf with the serialized data
  // - The leaf determines its "type" based on the \`type\` serialized in the data. If the leaf doesn't have a view matching that type, create a new View.
  // - The leaf then calls setState on the view.
  async setState(state: ICalendarPersistedState, result: ViewStateResult): Promise<void> {
    // The \`state\` coming in 
    if (state.displayedMonth) {
      this.displayedMonth = state.displayedMonth;
    }

    if (state.selectedFilters) {
      this.selectedFilters = state.selectedFilters;
    }

    return super.setState(state, result);
  }

  // getState is called whenever the leaf is requesting data from the view.
  // Whenever Obsidian makes a change to its layout, it requests that the layout get serialized to workspace.json. See: <Workspace.requestSaveLayout>
  // When serializing the layout, the flow is:
  // - workspace serializes each split, which serializes each split, then each leaf.
  // - The leaf requests serialized data from the View using getState.
  // - That data gets saved to workspace.json.
  getState(): ICalendarPersistedState {
    return {
      displayedMonth: this.displayedMonth,
      selectedFilters: this.selectedFilters,
    };
  }

  setDisplayedMonth(date: Moment) {
    this.displayedMonth = date.format();
    // When you make changes to your view's state, that won't
    // get saved to the layout until you manually request the
    // layout get saved.
    this.app.workspace.requestSaveLayout();
  }
}
```
