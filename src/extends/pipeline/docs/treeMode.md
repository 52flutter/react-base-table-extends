---
id: tree-mode
title: 树状模式
---

让表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格。可以通过设置 indentSize 以控制每一层的缩进宽度。

### 示例

<code
src="../../../../demos/treeMode.tsx"
/>

### 用法

- 启用行多选功能之前，pipeline 必须已经设置了 primaryKey。

```ts
pipeline.use(features.treeMode(options));
```

options 结构如下：

```typescript
export interface TreeModeFeatureOptions {
  /** 非受控用法：默认展开的 keys */
  defaultOpenKeys?: string[];

  /** 受控用法：当前展开的 keys */
  openKeys?: string[];

  /** 受控用法：展开 keys 改变的回调 */
  onChangeOpenKeys?(
    nextKeys: string[],
    key: string,
    action: 'expand' | 'collapse',
  ): void;

  /** 自定义叶子节点的判定逻辑 */
  isLeafNode?(
    node: any,
    nodeMeta: { depth: number; expanded: boolean; rowKey: string },
  ): boolean;

  /** icon 的缩进值。一般为负数，此时 icon 将向左偏移，默认从 pipeline.ctx.indents 中获取 */
  iconIndent?: number;

  /** icon 与右侧文本的距离，默认从 pipeline.ctx.indents 中获取 */
  iconGap?: number;

  /** 每一级缩进产生的距离，默认从 pipeline.ctx.indents 中获取 */
  indentSize?: number;

  /** 点击事件的响应区域，默认为 cell */
  clickArea?: 'cell' | 'content' | 'icon';

  /** 是否对触发展开/收拢的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;

  /** 指定表格每一行元信息的记录字段 */
  treeMetaKey?: string | symbol;
}
```

### `features.buildTree`

用法： `pipeline.use(features.buildTree(idProp, parentIdProp))`

根据数据中的 idProp/parentIdProp，将 平铺的数据 转换为树状结构。树状结构下，父节点中的 children 字段会包含其子节点的列表。

### 异步数据加载

异步数据加载场景下，因为前端只保存了整棵树中的其中一部分数据，我们需要设置 `isLeafNode` 覆盖默认的判断方式，告诉表格哪些节点是父节点（可被展开），哪些节点是子节点（不可被展开）。

在 `onChangeOpenKeys` 中根据展开的节点判断是否需要加载更多数据，可以实现树状模式下异步数据加载功能。

#### 示例

<code
src="../../../../demos/asyncTreeMode.tsx"
/>
