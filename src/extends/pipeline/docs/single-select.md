---
group:
  title: 扩展功能
id: single-select
title: 行单选
---

### 示例

<code
src="../../../../demos/singleSelect.tsx"
/>

### 使用方式

- 启用行单选功能之前，pipeline 必须已经设置了 primaryKey。
- 行单选依赖单选框组件，使用 singleSelect 之前需要通过 pipeline context 设置 components.Radio。

```ts
pipeline.use(features.singleSelect(options));
```

options 结构如下：

```ts
export interface SingleSelectFeatureOptions {
  /** 是否高亮被选中的行 */
  highlightRowWhenSelected?: boolean;

  /** 非受控用法：默认选中的值 */
  defaultValue?: string;

  /** 受控用法：当前选中的值 */
  value?: string;

  /** 受控用法：选中值改变回调 */
  onChange?: (next: string) => void;

  /** 判断一行是否禁用 */
  isDisabled?(row: any, rowIndex: number): boolean;

  /** 点击事件的响应区域 */
  clickArea?: 'radio' | 'cell' | 'row';

  /** 单选框所在列的 column 配置，可指定 width，lock 等属性 */
  radioColumn?: Partial<ArtColumnStaticPart>;

  /** 单选框所在列的位置 */
  radioPlacement?: 'start' | 'end';

  /** 是否对触发 onChange 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
}
```
