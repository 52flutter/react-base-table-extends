import React, { useState } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Button } from 'antd';

import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);
  const [open, setOpen] = useState(false);
  const pipeline = useTablePipeline({ primaryKey: 'id' })
    .input({ data, columns: columns })
    .use(features.autoScrollRow({ data, interval: 3 * 1000, open }));

  return (
    <>
      <Button
        onClick={() => {
          setOpen((pre: any) => {
            return !pre;
          });
        }}
      >
        切换滚动
      </Button>
      <BaseTable {...pipeline.getProps()} width={1000} height={400} />
    </>
  );
}
