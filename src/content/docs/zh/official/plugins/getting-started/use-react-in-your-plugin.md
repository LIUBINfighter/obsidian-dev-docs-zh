<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 使用React

---

在本指南中，您将配置插件以使用 React。它假设你已经有一个带有 [custom view](https://docs.obsidian.md/Plugins/User+interface/Views) 的插件，你想通过它来使用 React。

虽然你不需要使用单独的框架来构建插件，但有几个原因可能导致你想使用 React：

- 你已经有 React 的经验，并希望使用熟悉的技术。
- 你有现成的 React 组件，你想在你的插件中重用。
- 您的插件需要复杂的状态管理或其他功能，使用常规 [HTML elements](https://docs.obsidian.md/Plugins/User+interface/HTML+elements) 实现这些功能可能很麻烦。

## 配置插件

1. 将 React 添加到插件依赖项中：

   ```bash
   npm install react react-dom
   ```

2. 为 React 添加类型定义：

   ```bash
   npm install --save-dev @types/react @types/react-dom
   ```

3. 在 `tsconfig.json` 中 ，对 `compilerOptions` 对象启用 JSX 支持：

   ```ts
   {
     "compilerOptions": {
       "jsx": "preserve"
     }
   }
   ```

## 创建 React 组件

创建一个在插件根目录中调用 `ReactView.tsx` 的新文件，其中包含以下内容：

```tsx
export const ReactView = () => {
  return <h4>Hello, React!</h4>;
};
```

## 挂载 React 组件

要使用 React 组件，需要将其挂载在 [HTML elements](https://docs.obsidian.md/Plugins/User+interface/HTML+elements). 上。以下示例将 `ReactView` 组件装载到元素 `this.containerEl.children[1]` 上：

```tsx
import { StrictMode } from 'react';
import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import { ReactView } from './ReactView';

const VIEW_TYPE_EXAMPLE = 'example-view';

class ExampleView extends ItemView {
  root: Root | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <StrictMode>
        <ReactView />,
      </StrictMode>,
    );
  }

  async onClose() {
    this.root?.unmount();
  }
}
```

有关 `createRoot` 和 `unmount()` 的更多信息，请参阅[ReactDOM](https://react.dev/reference/react-dom/client/createRoot#root-render) 上的文档。

你可以将你的 React 组件挂载到任何 `HTMLElement` ，例如：状态栏 [status bar items](https://docs.obsidian.md/Plugins/User+interface/Status+bar) ，只需确保在完成后调用 `this.root.unmount()` 正确清理即可。

## 创建应用上下文

如果你想从你的一个 React 组件访问 [App](https://docs.obsidian.md/Reference/TypeScript+API/App/App)  对象，你需要将它作为依赖项传递。随着插件的增长，即使你只在少数几个地方使用该 `App` 对象，你也需要通过整个组件树传递它。
另一种选择是为应用创建一个 React 上下文，使其对 React 视图中的所有组件全局可用。

1. 用 `createContext()` 创建新的应用上下文。

   ```tsx
   import { createContext } from 'react';
   import { App } from 'obsidian';

   export const AppContext = createContext<App | undefined>(undefined);
   ```

2. 使用上下文程序包装，将 `ReactView` 应用作为值传递。

   ```tsx
   this.root = createRoot(this.containerEl.children[1]);
   this.root.render(
     <AppContext.Provider value={this.app}>
       <ReactView />
     </AppContext.Provider>,
   );
   ```

3. 创建自定义钩子，以便更轻松地在组件中使用上下文。

   ```tsx
   import { useContext } from 'react';
   import { AppContext } from './context';

   export const useApp = (): App | undefined => {
     return useContext(AppContext);
   };
   ```

4. 使用任何 `ReactView` React 组件中的钩子来访问应用程序。

   ```tsx
   import { useApp } from './hooks';

   export const ReactView = () => {
     const { vault } = useApp();

     return <h4>{vault.getName()}</h4>;
   };
   ```

有关更多信息，请参阅 React 文档 [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) and [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) 。
