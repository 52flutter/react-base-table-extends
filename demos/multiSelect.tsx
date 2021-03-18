import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline({
    components: { Checkbox: Checkbox },
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(features.multiSelect());

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
