/*
 * @Author: renjie.yin
 * @Date: 2022-10-25 20:26:20
 * @LastEditors: renjie.yin
 * @LastEditTime: 2022-10-26 10:55:37
 * @Description:
 */
import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
  exportTableAsExcel,
} from 'react-base-table-extends';
import { Button } from 'antd';
import XLSX_NS from 'xlsx';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  columns[0].getCellSpan = () => {
    return { span: 0 };
  };
  columns[0].frozen = 'left';
  columns[4].frozen = 'right';
  columns[9].frozen = 'right';

  const pipeline = useTablePipeline().input({ data, columns: columns });
  // .use(features.autoRowSpan())
  // .use(features.autoCellSpan());
  const props = pipeline.getProps();

  console.log('props.columns', props.columns);
  return (
    <>
      <Button
        onClick={() => {
          exportTableAsExcel(XLSX_NS, props.data, props.columns, '111.xlsx');
        }}
      >
        导出
      </Button>
      <BaseTable
        fixed={true}
        border
        {...props}
        width={1000}
        height={400}
        // sticky={false}
      />
    </>
  );
}
