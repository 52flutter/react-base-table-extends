import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox, Radio } from 'antd';
import { generateColumns, generateData, getTreeData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = getTreeData(columns);

  const pipeline = useTablePipeline({
    components: { Radio: Radio },
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(features.rowGrouping());

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
