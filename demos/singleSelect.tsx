/*
 * @Author: renjie.yin
 * @Date: 2021-03-18 10:04:30
 * @LastEditors: renjie.yin
 * @LastEditTime: 2023-05-17 11:25:24
 * @Description:
 */
import React, { useState } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Button, Checkbox, Radio } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);
  const [value, setValue] = useState();

  const pipeline = useTablePipeline({
    components: { Radio: Radio },
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(
      features.singleSelect({
        value: value,
        onChange: (e) => {
          setValue(e);
        },
        highlightRowWhenSelected: true,
        clickArea: 'row',
      }),
    );

  return (
    <>
      <Button
        onClick={() => {
          setValue(null);
        }}
      >
        清空
      </Button>
      <BaseTable {...pipeline.getProps()} width={1000} height={400} />
    </>
  );
}
