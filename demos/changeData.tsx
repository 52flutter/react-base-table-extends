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

const columns: any = generateColumns(10);
columns[columns.length - 1].frozen = 'right';
export default function Index() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(() => {
    return generateData(columns, 2000);
  });

  return (
    <>
      <Button
        onClick={() => {
          setData(generateData(columns, 10));
        }}
      >
        切换loading
      </Button>
      <BaseTable
        // virtual={true}
        fixed
        data={data}
        columns={columns}
        width={1000}
        height={400}
      />
    </>
  );
}