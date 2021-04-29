import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import Texty from './Texty';
import { generateColumns, generateData, getTreeData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = getTreeData(columns);

  const pipeline = useTablePipeline({
    primaryKey: 'id',
    components: { Tooltip: Texty },
  })
    .input({ data, columns: columns })
    .use(features.treeMode())
    .use(features.tips());

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
