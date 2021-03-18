import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox } from 'antd';

import { generateColumns, generateData, getTreeData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = getTreeData(columns);

  const pipeline = useTablePipeline({
    primaryKey: 'id',
    components: {
      Checkbox,
    },
  })
    .input({ data, columns: columns })
    .use(features.treeMode())

    .use(
      features.treeSelect({
        tree: data,
        rootKey: 'root',
        highlightRowWhenSelected: true,
        clickArea: 'checkbox',
        checkboxColumn: { align: 'left', frozen: 'left' },
      }),
    );

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
