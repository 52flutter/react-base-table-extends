import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);

  const pipeline = useTablePipeline({
    components: { Checkbox: Checkbox },
    primaryKey: 'id',
  })
    .input({ data, columns: columns })
    .use(
      features.rowDetail({
        clickArea: 'content',
        // defaultOpenKeys: ['2'],
        renderDetail(row: any) {
          return (
            <div style={{ display: 'flex', minWidth: 800 }}>
              <div className="left">
                <p>最近工作：xxxx｜{row.dept}｜2009-07-01 至今</p>
                <p>工作职责：xxxx</p>
                <p>联系方式：67676767｜1212121@163.con</p>
              </div>
              <div className="right">
                <p>教育：xxx｜xxx｜2007-09-01 至 2006-06-01</p>
                <p>xx｜2004-09-01 至 2007-06-01</p>
              </div>
            </div>
          );
        },
      }),
    );

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
