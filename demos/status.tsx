/*
 * @Author: renjie.yin
 * @Date: 2022-04-14 11:32:30
 * @LastEditors: renjie.yin
 * @LastEditTime: 2022-06-13 12:20:06
 * @Description:
 */
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
          setLoading((pre) => {
            return !pre;
          });
        }}
      >
        切换loading
      </Button>
      <BaseTable
        fixed={false}
        {...pipeline.getProps()}
        width={1000}
        height={400}
      />
    </>
  );
}
