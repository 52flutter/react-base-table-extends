---
id: extends
title: 实现自定义的表格拓展

order: 2
---

pipeline 内部保存了一份当前」的 data 与 columns。调用 `pipeline.getProps()` 时，「当前」的这份数据将被返回，并作为 `<BaseTable />` 的 props。

按照特定方式，对当前数据进行更新，可以改变表格的展现。例如以下代码就可以使得表格行的数量变为原来的两倍：

```js
data = data.concat(data);
```

## 处理数据的 API

在 pipeline 中需要使用以下的 API 读取或更新数据。

#### `pipeline.getData(name?: string)`

获取当前的 data。如果提供了 name 参数，则获取 name 对应的 data，即上次调用 `pipeline.snapshot(name)` 时 pipeline 中的 data）。

#### `pipeline.getColumns(name?: string)`

获取当前的 columns；如果提供了 name 参数，则获取 name 对应的 columns

#### `pipeline.Data(rows)`

设置当前 data，并返回 pipeline 对象本身

#### `pipeline.columns(cols)`

设置当前 columns，并返回 pipeline 对象本身

#### `pipeline.mapData(mapper)`

对 data 进行变换，mapper 会接受当前 data 作为参数，需要返回一份新的 data。该方法返回 pipeline 对象本身

#### `pipeline.mapColumns(mapper)`

对 columns 进行变换，mapper 会接受当前 columns 作为参数，需要返回一份新的 columns。注意 columns 不一定是简单的数组，可能存在嵌套的情况。该方法返回 pipeline 对象本身

#### `pipeline.snapshot(name: string)`

将当前的 data/columns 保存为快照，后续可以根据 name 来获取此时的 data/columns

#### `pipeline.appendTableProps(name,fn)`

name 为重写 props 的名称
考虑到一个 pipeline 上可能会有多个拓展定制了表格行的 props ，pipeline 内部维护了一个 `appendTableProps` 的数组。该数组会收集所有的 appendTableProps 回调，并在 `pipeline.getProps()` 时将这些回调合并为一个完整的 `tableProps`。

## pipeline 操作示例

在下面的例子中，我们利用上面的 API 实现了「columns 更新」和「红绿相间背景色」等效果：

```js
function 行多选() {
  const data = assets.biz.data4;
  const columns = assets.biz.columns4;

  const pipeline = useTablePipeline({ components: fusion });
  pipeline.input({ data, columns });
  pipeline.primaryKey('id'); // 每一行数据由 id 字段唯一标记

  // 自定义数据处理逻辑1: 将所有列的 lock 设置 false，并将 align 设置为 right
  const columns1 = pipeline.getColumns();
  const columns2 = columns1.map(col => ({
    ...col,
    lock: false,
    align: 'right',
  }));
  pipeline.columns(columns2);

  // 自定义数据处理逻辑2: 重复 data
  // pipeline.mapdata((arr) => arr.flatMap((d) => [d, { ...d, id: d.id + '_copy' }]))

  // 自定义数据处理逻辑3: 红绿相间的背景色
  pipeline.appendTableProps('cellProps', ({ rowIndex }) => {
    const color =
      rowIndex % 2 === 0
        ? 'rgba(253, 32, 32, 0.32)'
        : 'rgba(128, 243, 87, 0.32)';
    return {
      style: { backgroundColor: color },
    };
  });

  return <BaseTable {...pipeline.getProps()} />;
}
```

## 使用 pipeline 上下文

除了对 data/columns 的管理之外，pipeline 内部还包含了一个上下文对象（通过 `pipeline.ctx` 来获取），不同的 pipeline 操作可以通过 ctx 来共享一些信息。

`pipeline.ctx` 中的部分字段有特定的含义，具体如下：

- `pipeline.ctx.primaryKey` 表格的主键配置
  - 辅助方法 `pipeline.ensurePrimaryKey(hint?: string): PrimaryKey` 可用于确保 primaryKey 已被设置；
  - 如果尚未被设置，该方法将会根据 hint 参数生成报错信息
- `pipeline.ctx.indents` 缩进配置
- `pipeline.ctx.components` 在 pipeline 中注册的组件

## 状态管理

在实现一些较为复杂的拓展功能时，你可能需要使用一些非受控的状态，以便屏蔽一些内部实现细节，方便上层用户使用。

拓展可以使用如下方式来从 `pipeline.state` 获取一份自己的状态。

```js
function myCustomTableFeature(pipeline) {
  const stateKey = 'myCustomTableFeature';

  // 获取状态
  const value = pipeline.getStateAtKey(stateKey, defaultValue);

  // 在某个回调函数中设置状态
  const onClick = () => pipeline.setStateAtKey(stateKey, nextValue);

  // 对 data/columns 进行处理...

  return pipeline;
}
```

### 状态管理 API

#### `pipeline.getStateAtKey(stateKey: string, defaultValue?: any): any`

读取 stateKey 对应的状态

#### `pipeline.setStateAtKey(stateKey: string, partialState: any): void`

将 stateKey 对应的状态设置为 partialState

:::note
pipeline 中所有的 stateKey 共享一个命名空间，推荐为拓展设置一个与拓展名称相同的 stateKey，避免不同拓展之间发生冲突。
:::

---

所有提供的拓展都是通过上述方式来实现的，实现自定义的表格拓展时可供参考
