import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';

import { generateColumns, generateData, getTreeData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = getTreeData(columns);

  const pipeline = useTablePipeline({
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(features.treeMode());

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
