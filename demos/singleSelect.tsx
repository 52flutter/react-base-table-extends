import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox, Radio } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline({
    components: { Radio: Radio },
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(
      features.singleSelect({
        highlightRowWhenSelected: true,
        clickArea: 'row',
      }),
    );

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
