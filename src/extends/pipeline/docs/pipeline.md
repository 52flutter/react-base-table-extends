---
id: pipeline
title: 拓展机制介绍
slug: /pipeline/
order: 1
---

pipeline 特点：

- 按需引入表格拓展，更好地支持 tree shaking
- 默认提供 [多种拓展功能](multi-select)
  - 支持 自定义控件
  - 支持「受控用法」与「非受控用法」
  - 支持「hooks 用法」与「非 hooks 用法」
- 支持 [自定义的表格拓展](extends)

## 创建 pipeline

### hooks 用法

在函数组件中，可以引入 hooks `useTablePipeline` 来创建 pipeline。

```ts
import {
  useTablePipeline,
  features,
  BaseTable,
} from 'react-base-table-extends';
import { Checkbox } from '@alifd/next';
// or...  import { Checkbox } from 'antd'

function SomeFunctionComponent() {
  const pipeline = useTablePipeline({ components: { Checkbox } })
    .input({ data, columns })
    .primaryKey('id')
    .use(features.sort(sortOptions))
    .use(features.multiSelect(selectOptions));

  // pipeline.getProps() 将生成以下 props
  //    data, columns, primaryKey, getRowProps
  // 使用时注意不要覆盖这些 props

  return <BaseTable {...pipeline.getProps()} />;
}
```

创建 pipeline 时，要根据后续用到的表格拓展为 pipeline 提供 components。每个拓展所需求的组件可能不同，例如 [行多选](features/multi-select) 需要 Checkbox 组件，[行单选](features/single-select) 则需要 Radio 组件。

创建之后，你可以使用 react-base-table-extends 提供的 [拓展功能](features/multi-select)，或是 [实现自定义的表格拓展](extends)。

:::warning
如果你想要使用自定义的 `getRowProps`，要调用 `pipeline.appendRowPropsGetter(getRowProps)` 来将该方法添加加 pipeline 中。
:::

###

如果对打包体积要求不高，可以采用下面的写法：

```ts
// 对于 fusion 用户...
import * as fusion from '@alifd/next';
useTablePipeline({ components: fusion });

// 对于 antd 用户...
import * as antd from 'antd';
useTablePipeline({ components: antd });
```

### 非 hooks 用法

在类组件中，需要调用 `new TablePipeline(...)` 来创建 pipeline。创建时，通过 `state / setState` 为 pipeline 提供状态管理能力。

```ts
import * as fusion from '@alifd/next';
import { TablePipeline, features } from 'react-base-table-extends';

class MyComponent extends React.Component {
  state = {
    pipelineState: {}, // pipelineState 的默认值必须为一个对象
  };

  setPipelineState = updater => {
    // this.setPipelineState 被调用时，第一个参数 updater 是一个函数
    // updater 接受原来的 pipelineState，返回新的 pipelineState
    this.setState(prev => ({
      pipelineState: updater(prev.pipelineState),
    }));
  };

  render() {
    const pipeline = new TablePipeline({
      state: this.state.pipelineState,
      setState: this.setPipelineState,
      ctx: { components: fusion },
    });

    pipeline.input({ data, columns });
    pipeline.primaryKey('id');
    pipeline.use(features.autoRowSpan());
    pipeline.use(features.someOtherFeature());

    return <BaseTable {...pipeline.getProps()} />;
  }
}
```

## 使用 pipeline

:::tip
常规用法推荐直接参考 [具体拓展功能](multi-select) 中的示例。
:::

创建 pipeline 之后，一般需要先设置 input 和 primaryKey，然后可以使用各个表格拓展。

#### `pipeline.input({ data, columns })`

input 方法用于设置 pipeline 的输入，调用后 pipeline 中当前的 data/columns 将被更新。该方法会返回 pipeline 对象，方便链式调用。

#### `pipeline.primaryKey(primaryKey)`

设置 primaryKey。primaryKey 一般是一个字符串，例如 `'id'`，表示数据中的 id 字段可以唯一确定一行。很多表格拓展功会要求 `primaryKey` 预先被设置，部分拓展还要求 `primaryKey` 必须为一个字符串。该方法会返回 pipeline 对象，方便链式调用。

#### `pipeline.use(someTableFeature)`

使用指定的表格功能拓展。该方法会返回 pipeline 对象，方便链式调用。

#### `pipeline.getProps()`

获取 `<BaseTable />` 的 props，返回结果会包含重写表格很多属性这四个字段。

---

以上 4 个 API 可以满足大部分的日常使用，如果你想对 pipeline 中的数据进行加工，详见 [实现自定义的表格拓展](extends)。
