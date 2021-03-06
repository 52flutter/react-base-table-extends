## 列范围高亮

鼠标悬停在表格上时，高亮单元格所在的列与相应的表头。

### 示例

<code
src="../../../../demos/columnRangeHover.tsx"
/>

### 使用方式

```ts
pipeline.use(features.columnRangeHover(options));
```

options 结构如下：

```ts
export interface ColumnRangeHoverFeatureOptions {
  /** 鼠标悬停时单元格的背景色，默认为 'var(--hover-bgcolor)' */
  hoverColor?: string;

  /** 鼠标悬停时表头的背景色，默认为 'var(--header-hover-bgcolor)' */
  headerHoverColor?: string;

  /** 非受控用法：默认的悬停范围 */
  defaultHoverRange?: HoverRange;

  /** 受控用法：当前悬停范围 */
  hoverRange?: HoverRange;

  /** 受控用法：悬停渲染改变的回调 */
  onChangeHoverRange?(nextColIndexRange: HoverRange): void;
}

export type HoverRange = {
  start: number;
  end: number;
};
```
