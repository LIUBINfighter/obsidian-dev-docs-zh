---
title: State Fields
description: 关于 State Fields 的文档
---
<!--
 * @Author: Raistlind johnd0712@gmail.com
 * @Date: 2024-01-18 10:18:00
 * @LastEditors: Raistlind
 * @LastEditTime: 2024-01-18 10:18:00
 * @Description:
-->

# 状态字段

---

状态字段是一种[编辑器扩展](./editor-extensions.md)，可用于管理自定义编辑器状态。本页将引导你通过实现计算器扩展来构建状态字段。

计算器应能从当前状态中加减一个数字，并在您想重新开始时重置状态。

在本节结束时，您将了解构建状态字段的基本概念。

> [!NOTE]
>
> 本页旨在为Obsidian 插件开发人员提炼 CodeMirror 6 官方文档。有关状态字段的详细信息，请参阅[State Fields](https://codemirror.net/docs/guide/#state-fields) 。

## 先决条件

- 对[状态管理](./state-management.md)有基本了解。

## 定义状态效果

状态效果描述的是你想要进行的状态改变。您可以将它们视为类的方法。

在计算器示例中，您将为计算器的每个操作定义一个状态效果：

```ts
const addEffect = StateEffect.define<number>();
const subtractEffect = StateEffect.define<number>();
const resetEffect = StateEffect.define();
```

角括号 `<>` 内的类型定义了效果的输入类型。例如，要加减的数字。重置效果不需要任何输入，因此可以省略。

## 定义状态字段

与人们的想象相反，状态字段实际上并不存储状态。它们管理状态。状态字段接收当前状态，应用任何状态效果，并返回新状态。

状态字段包含计算器逻辑，用于根据事务中的效果应用数学运算。由于一个事务可能包含多个运算结果，例如两个加法运算结果，因此状态字段需要一个接一个地应用所有运算结果。

```ts
export const calculatorField = StateField.define<number>({
  create(state: EditorState): number {
    return 0;
  },
  update(oldState: number, transaction: Transaction): number {
    let newState = oldState;

    for (let effect of transaction.effects) {
      if (effect.is(addEffect)) {
        newState += effect.value;
      } else if (effect.is(subtractEffect)) {
        newState -= effect.value;
      } else if (effect.is(resetEffect)) {
        newState = 0;
      }
    }

    return newState;
  },
});
```

- `create` 返回计算器的起始值。
- `update` 包含应用效果的逻辑。
- `effect.is()` 可让您在应用特效前检查其类型。

## 发送状态效果

要对状态字段应用状态效果，需要将其作为事务的一部分发送到编辑器视图。

```ts
view.dispatch({
  effects: [addEffect.of(num)],
});
```

您甚至可以定义一组辅助函数，提供更易懂的应用程序接口：

```ts
export function add(view: EditorView, num: number) {
  view.dispatch({
    effects: [addEffect.of(num)],
  });
}

export function subtract(view: EditorView, num: number) {
  view.dispatch({
    effects: [subtractEffect.of(num)],
  });
}

export function reset(view: EditorView) {
  view.dispatch({
    effects: [resetEffect.of(null)],
  });
}
```

## 下一步

Provide [Decorations](https://docs.obsidian.md/Plugins/Editor/Decorations) from your state fields to change how to display the document.  
在您状态字段中提供装饰，以更改文档的显示方式。
