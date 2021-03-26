import React, { useState, useEffect } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import 'antd/dist/antd.compact.css';
import { Button, Spin } from 'antd';
import { generateColumns, generateData } from './utils';
// import { useEffect } from '@umijs/renderer-react/node_modules/@types/react';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline({
    primaryKey: 'id',
    // components: { loading: Spin },
  })
    .input({ data: [], columns: columns })
    .use(features.status({ loading: loading }));

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
