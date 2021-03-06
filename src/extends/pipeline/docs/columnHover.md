---
id: column-hover
title: 列高亮
---

鼠标悬停在表格上时，高亮单元格所在的列。

### 示例

<code
src="../../../../demos/columnHover.tsx"
/>

### 使用方式

```ts
pipeline.use(features.columnHover(options));
```

options 结构如下：

```ts
export interface ColumnHoverFeatureOptions {
  /** 鼠标悬停的颜色，默认为 'var(--hover-bgcolor)' */
  hoverColor?: string;

  /** 非受控用法：默认的 colIndex */
  defaultHoverColIndex?: number;

  /** 受控用法：当前鼠标悬停列的下标（colIndex) */
  hoverColIndex?: number;

  /** 受控用法：colIndex 改变的回调 */
  onChangeHoverColIndex?(nextColIndex: number): void;
}
```
