import React, { useState } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import 'antd/dist/antd.compact.css';
import { Button } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline({
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(features.loading({ loading: loading }));

  return (
    <>
      <Button
        onClick={() => {
          setLoading(pre => {
            return !pre;
          });
        }}
      >
        切换loading
      </Button>
      <BaseTable {...pipeline.getProps()} width={1000} height={400} />
    </>
  );
}
