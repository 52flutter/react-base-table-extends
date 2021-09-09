import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';

import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline()
    .input({ data, columns: columns })
    .use(features.columnHover());

  return (
    <BaseTable
      {...pipeline.getProps()}
      // fixed={true}
      width={1000}
      height={400}
    />
  );
}
