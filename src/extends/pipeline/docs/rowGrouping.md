---
id: row-grouping
title: 行分组
---

对行进行分组，点击「分组标题」展示该组下的数据。「分组标题」总是独占一行。

:::info
想要在展开的单元格内渲染自定义内容？ [行详情 可以做到](row-detail)。
:::

### 示例

<code
src="../../../../demos/rowGrouping.tsx"
/>

### 用法

- 启用行分组功能之前，pipeline 必须已经设置了 primaryKey，且 primaryKey 只能为字符串。
- 行分组会从 pipeline.ctx.indents 中读取缩进配置
- dataSource 第一层的结构需要符合以下结构：
  - `{ [primaryKey]: string, groupTitle: ReactNode, children: [...] }`

```ts
pipeline.use(features.rowGrouping(options));
```

options 结构如下：

```typescript
export interface RowGroupingFeatureOptions {
  /** 非受控用法：是否默认展开所有分组 */
  defaultOpenAll?: boolean;

  /** 非受控用法：默认展开的 keys */
  defaultOpenKeys?: string[];

  /** 受控用法：当前展开的 keys */
  openKeys?: string[];

  /** 受控用法：当前展开 keys 改变回调 */
  onChangeOpenKeys?(
    nextKeys: string[],
    key: string,
    action: 'expand' | 'collapse',
  ): void;

  /** 是否对触发 onChangeOpenKeys 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
}
```
