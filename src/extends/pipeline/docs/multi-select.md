---
group:
  title: 扩展功能
id: multi-select
title: 行多选
---

行多选：在每一行的左侧或右侧 渲染一个复选框，表示当前行是否被选中。

:::tip 批量选择
点击复选框时，按住 shift 键可以进行批量选择/反选。
:::

### 示例

<code
src="../../../../demos/multiSelect.tsx"
/>

### 使用方式

- 启用行多选功能之前，pipeline 必须已经设置了 primaryKey
- 行多选依赖复选框组件，使用之前需要先设置 `pipeline.ctx.components.Checkbox`

```ts
pipeline.use(features.multiSelect(options));
```

options 结构如下：

```ts
export interface MultiSelectFeatureOptions {
  /** 非受控用法：默认选中的值 */
  defaultValue?: string[];

  /** 非受控用法：默认 lastKey */
  defaultLastKey?: string;

  /** 受控用法：当前选中的 keys */
  value?: string[];

  /** 受控用法：上一次操作对应的 rowKey */
  lastKey?: string;

  /** 受控用法：状态改变回调  */
  onChange?: (
    nextValue: string[],
    key: string,
    keys: string[],
    action: 'check' | 'uncheck' | 'check-all' | 'uncheck-all',
  ) => void;

  /** 复选框所在列的位置 */
  checkboxPlacement?: 'start' | 'end';

  /** 复选框所在列的 column 配置，可指定 width，lock, title, align, features 等属性 */
  checkboxColumn?: Partial<ArtColumnStaticPart>;

  /** 是否高亮被选中的行 */
  highlightRowWhenSelected?: boolean;

  /** 判断一行中的 checkbox 是否要禁用 */
  isDisabled?(row: any, rowIndex: number): boolean;

  /** 点击事件的响应区域 */
  clickArea?: 'checkbox' | 'cell' | 'row';

  /** 是否对触发 onChange 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
}
```

受控用法下， 状态改变回调 onChange 会接受 4 个参数：

- `nextValue` 即将被选中的 keys 数组
- `key` 触发本次状态改变的表格行的 key
- `keys` 本次状态改变相关的 keys 数组。
  - 一般情况下该数组长度为 1
  - 多选（按住 shift 键）或全选的情况下，该数组长度可能超过 1
- `action` 交互行为
  - `'check'` 选中一个或多个
  - `'uncheck'` 取消选中一个或多个
  - `'check-all'` 选择全部
  - `'uncheck-all'` 反选全部

### 受控用法

受控用法下可以对状态进行更多的控制，实现自定义的多选交互。

覆盖 `checkboxColumn.title` 可以实现自定义的多选列表头，方便实现一些自定义的交互。

此外设置 `options.clickArea='row'` 可以将点击事件的回调放在表格行上，让多选交互更易用。
