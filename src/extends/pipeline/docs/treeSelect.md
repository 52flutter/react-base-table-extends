---
id: tree-select
title: 树形选择
---

在树状模式的基础上支持复选功能。功能可以参考 [antd 组件库中的 `<TreeSelect />` 组件](https://ant-design.gitee.io/components/tree-select-cn/)。

### 示例

<code
src="../../../../demos/treeSelect.tsx"
/>

### 使用方式

- 使用 treeSelect 之前，pipeline 必须已经设置了 primaryKey，且 primaryKey 只能为字符串。
- treeSelect 依赖复选框组件，使用之前需要先设置 `pipeline.ctx.components.Checkbox`

```ts
pipeline.use(features.treeSelect(options));
```

options 结构如下：

```ts
export interface TreeSelectFeatureOptions {
  /** 完整的树 */
  tree: any[];

  /** 虚拟的根节点值；该参数非空时，treeSelect 将会在 tree 参数之上再添加一个父节点 */
  rootKey?: string;

  /** 父子节点选中状态是否不再关联。设置为 true 之后，父节点和子节点的 value 独立管理，不再联动 */
  checkStrictly?: boolean;

  /**
   * 定义选中时回填的方式，可选值:
   * - 'all'(返回所有选中的节点)
   * - 'parent'(父子节点都选中时只返回父节点)
   * - 'child'(父子节点都选中时只返回子节点)
   */
  checkedStrategy?: 'all' | 'parent' | 'child';

  /** 复选框所在列的位置 */
  checkboxPlacement?: 'start' | 'end';

  /** 复选框所在列的 column 配置，可指定 width，lock, title, align, features 等属性 */
  checkboxColumn?: Partial<ArtColumn>;

  /** 受控用法：当前选中的值 */
  value?: string[];

  /** 非受控用法：默认选中的值 */
  defaultValue?: string[];

  /** 受控用法：状态改变回调 */
  onChange?(nextValue: string[]): void;

  /** 点击事件的响应区域 */
  clickArea?: 'checkbox' | 'cell' | 'row';

  /** 是否对触发 onChange 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;

  /** 被选中时是否高亮整行 */
  highlightRowWhenSelected?: boolean;

  /** 是否禁用该节点的交互 */
  isDisabled?(row: any): boolean;

  /** 是否让该节点对应的子树 与其父节点脱离联动 */
  idDetached?(row: any): boolean;
}
```

### checkStrictly 与 detach

默认情况下，树形选择父子节点的选中状态是关联的，即「父节点被选中」与「所有子节点被选中」这两者是等价的，此时你可以通过 `options.checkedStrategy` 来控制选中时回填的方式。

如果不想要父子节点状态关联，可以设置 `options.checkStrictly = true`。

如果你只需要让部分节点与其父节点脱离关联，可以通过 `options.isDetached` 回调函数来进行设置。
