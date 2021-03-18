---
group:
  title: 扩展功能
id: sort
title: 列排序
---

对表格数据行进行排序，支持单列排序、多列排序、树形数据排序、自定义比较函数等功能。

### 基本示例

<code
src="../../../../demos/sort.tsx"
/>

### 用法

```ts
pipeline.use(features.sort(options));
```

注意事项：

- 默认情况下，列都是不可排序的，需要设置 `column.features.sortable` 才能开启相应列的排序功能
  - 设置 `features.sortable=true` 表示启用默认的比较函数（字符串使用字典序，数字使用自然序）
  - 设置 `features.sortable=function` 表示针对该列使用自定义的比较函数
- sort 支持以下排序行为：
  - （默认行为）`options.mode=multiple` 多字段排序，数据先按字段 1 排序，然后按字段 2 排序，依次类推
  - 设置 `options.mode=single` 可以使用单列排序
    - 注意无论是多列排序还是单列排序，**options.sorts 始终为一个数组**
  - 设置 `options.keepDataSource=true` 可以「保持 dataSource 不变」
    - 即 sort 不会再对 dataSource 进行处理，适用于「后端已返回排好序的数据」的场景

options 结构如下：

```typescript
export interface SortFeatureOptions {
  /** 排序字段列表 */
  sorts: SortItem[];

  /** 更新排序字段列表的回调函数 */
  onChangeSorts(nextSorts: SortItem[]): void;

  /** 排序切换顺序 */
  orders?: SortOrder[];

  /** 排序模式。单选 single，多选 multiple，默认为多选 */
  mode?: 'single' | 'multiple';

  /** 自定义排序表头 */
  SortHeaderCell?: React.ComponentType<SortHeaderCellProps>;

  /** 是否保持 dataSource 不变 */
  keepDataSource?: boolean;

  /** 排序激活时 是否高亮这一列的单元格 */
  highlightColumnWhenActive?: boolean;

  // todo 排序点击触发位置 clickArea

  /** 是否对触发 onChangeOpenKeys 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
}

export type SortOrder = 'desc' | 'asc' | 'none';

export type SortItem = { code: string; order: SortOrder };
```

## 多列排序

## 树形数据排序

features.sort 会自动识别数据中的 children 字段，默认支持提供树形数据排序。

树形数据排序：对于树中的某一个父节点，对其子节点进行排序。

:::note
树形数据排序时要注意 sort 的使用顺序（一般要在 treeMode 之前使用）。
:::

## 自定义比较函数

当为某一列设置 `column.features.sortable = true` 时，该列默认会按照自然序（对于数字）或字典序（对于字符串）进行排序。
我们可以为 `column.features.sortable` 设置一个函数来自定义某一列的比较规则，该函数将被作为 `Array#sort` 的参数。

如果只想使用 sort 提供的交互与 UI，但不想让 sort 改变 dataSource，可以设置 `options.keepDataSource = true`。

## 自定义切换顺序

`SortFeatureOptions#orders` 可以用来指定排序切换顺序。该选项的默认值为 `['desc', 'asc', 'none']`，即连续点击某一列的表头时，先按降序排序，然后按升序排序，最后取消排序；传入自定义的 orders 可以覆盖默认的切换顺序。

## 自定义列表头

`SortFeatureOptions#SortHeaderCell` 可用于自定义排序表头的内容和样式，组件接口如下：

```typescript
interface SortHeaderCellProps {
  /** 调用 features.sort(...) 时的参数 */
  sortOptions: object;

  /** 在添加排序相关的内容之前 表头原有的渲染内容 */
  children: ReactNode;

  /** 当前排序 */
  sortOrder: SortOrder;

  /** 多列排序下，sortIndex 指明了当前排序字段起作用的顺序. 当 sortOrder 为 none 时，sortIndex 为 -1 */
  sortIndex: number;

  /** 当前列的配置 */
  column: ArtColumn;

  /** 切换排序的回调 */
  onToggle(): void;
}
```
