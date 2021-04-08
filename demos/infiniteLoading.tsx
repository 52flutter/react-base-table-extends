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
  const data = generateData(columns, 20);

  const pipeline = useTablePipeline()
    .input({ data, columns: columns })
    .use(
      features.infiniteLoading({
        onLoadData: offset => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(generateData(columns, 20, 'row-', offset));
            }, 3000);
          });
        },
      }),
    );
  const props = pipeline.getProps();
  return (
    <>
      <Button
        onClick={() => {
          exportTableAsExcel(XLSX_NS, props.data, props.columns, '111.xlsx');
        }}
      >
        导出
      </Button>
      <BaseTable {...props} width={1000} height={400} />
    </>
  );
}
