---
group:
  title: 扩展功能
id: auto-scroll-row
title: 逐行滚动显示
---

自动行滚动

### 示例

<code
src="../../../../demos/autoScrollRow.tsx"
/>

### 使用方式

```ts
features.autoScrollRow({ data, interval: 3 * 1000, open });
```

```ts
{
  /** 滚动间隔 */
  interval: number;
  /** 原始数据 */
  data: Array<any>;
  /** 开启滚动 */
  open?: boolean;
}
```

暂时只支持等高的表格, 开启滚动后不支持鼠标滚动，关闭后会重置滚动到第一行
无限行滚动需要追加数据会导致滚动和数据和滚动条和原始不一样 所以开始时禁用鼠标滚动。
