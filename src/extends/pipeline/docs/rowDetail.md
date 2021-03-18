---
id: row-detail
title: 行详情
---

### 示例

<code
src="../../../../demos/rowDetails.tsx"
/>

### 使用方式

- 启用行多选功能之前，pipeline 必须已经设置了 primaryKey，且 primaryKey 只能为字符串。

```ts
pipeline.use(features.rowDetail(options));
```

options 结构如下：

```ts
export interface RowDetailFeatureOptions {
  /** 非受控用法：是否默认展开所有详情单元格 */
  defaultOpenAll?: boolean;

  /** 非受控用法：默认展开的 keys */
  defaultOpenKeys?: string[];

  /** 受控用法：当前展开的 keys */
  openKeys?: string[];

  /** 受控用法：openKeys 改变的回调 */
  onChangeOpenKeys?(
    nextKeys: string[],
    key: string,
    action: 'expand' | 'collapse',
  ): void;

  /** 详情单元格的渲染方法 */
  renderDetail?(row: any, rowIndex: number): ReactNode;

  /** 是否包含详情单元格 */
  hasDetail?(row: any, rowIndex: number): ReactNode;

  /** 获取详情单元格所在行的 key，默认为 `(row) => row[primaryKey] + '_detail'` */
  getDetailKey?(row: any, rowIndex: number): string;

  /** 详情单元格 td 的额外样式 */
  detailCellStyle?: React.CSSProperties;

  /** 点击事件的响应区域 */
  clickArea?: 'cell' | 'content' | 'icon';

  /** 是否对触发展开/收拢的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;

  /** 指定表格每一行元信息的记录字段 */
  rowDetailMetaKey?: string | symbol;
}
```

### 表格嵌套

通过 `options.renderDetail` 渲染 BaseTable 可以实现表格嵌套。

```ts
function 表格嵌套() {
  const dataSource = assets.biz.dataSource1.slice(0, 3);
  const columns = assets.biz.columns1.slice(0, 4);
  const pipeline = useTablePipeline({ components: fusion })
    .input({ dataSource, columns })
    .primaryKey('id')
    .use(
      features.rowDetail({
        defaultOpenKeys: ['2'],
        renderDetail() {
          return <BaseTable data={dataSource} columns={columns} />;
        },
      }),
    );

  return <BaseTable {...pipeline.getProps()} />;
}
```

### 已知问题

<Alert type="error">
  不能与 autoRowSpan 一起使用
</Alert>
