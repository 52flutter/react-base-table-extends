---
group:
  title: 扩展功能
id: infiniteLoading
title: 无限加载
---

根据上下单元格的值相等 自动合并单元格。

### 示例

<code
src="../../../../demos/infiniteLoading.tsx"
/>

### 使用方式

```ts
pipeline.use(features.infiniteLoading());
```

在设置 `column.features.autoRowSpan` 之后，如果该列中相连的两个单元格的值相等，则自动合并这两个单元格。如果连续的多个单元格的值都相等，则合并这些单元格。 autoRowSpan 会覆盖原有的 `column.getSpanRect`，注意避免冲突。

`column.features.autoRowSpan` 也可以设置为一个比较函数，用来自定义「两个单元格中的值相等」的判断逻辑。其函数签名为 `(v1: any, v2: any. row1: any, row2: any) => boolean`
