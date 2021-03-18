import React from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Checkbox, Radio } from 'antd';
import { generateColumns, generateData } from './utils';

export default function Index() {
  const columns2 = [
    {
      title: 'Name',
      dataKey: 'name',
      key: 'name',
      // align: 'center',
      resizable: true,
      width: 200,
      fixed: 'left',
      minWidth: 50,
      frozen: 'left',
    },
    {
      title: 'Other',
      width: 100,
      key: 'Other1',
      resizable: true,
      children: [
        {
          title: 'Age',
          dataKey: 'age',
          key: 'age',
          resizable: true,
          width: 150,
          // frozen: Column.FrozenDirection.LEFT,
        },
        {
          key: 'street1',
          title: 'Address',
          resizable: true,

          children: [
            {
              title: 'Street',
              dataKey: 'street',
              key: 'street',
              width: 150,
              hidden: true,
              resizable: true,
              maxWidth: 100,
            },
            {
              key: 'Block22',
              resizable: true,
              title: 'Block',
              dataKey: 'Block22',
              width: 100,
              children: [
                {
                  title: 'Building',
                  dataKey: 'building',
                  key: 'building',
                  resizable: true,
                  width: 100,
                },
                {
                  title: 'Door No.',
                  dataKey: 'number',
                  resizable: true,
                  key: 'number',
                  width: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'street2',
      title: 'Company',
      resizable: true,
      width: 100,

      children: [
        {
          title: 'Company Address',
          dataKey: 'companyAddress',
          resizable: true,
          key: 'companyAddress',
          width: 200,
        },
        {
          hidden: true,
          title: 'Company Name',
          dataKey: 'companyName',
          key: 'companyName',
          resizable: true,
          width: 200,
        },
      ],
    },

    {
      title: 'Gender',
      dataKey: 'gender',
      resizable: true,
      key: 'gender',
      width: 80,
      fixed: 'right',
    },
  ];

  const data1: any[] = [];
  for (let i = 0; i < 2; i++) {
    data1.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
      children: [],
    });
  }
  for (let i = 0; i < 2; i++) {
    data1[0].children.push({
      key: `children-` + i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
      // parentKey: data1[0].key,
    } as any);
  }
  const rowKey = 'key';

  const pipeline = useTablePipeline({
    components: { Radio: Radio },
    primaryKey: 'id',
  })
    .input({ data: data1, columns: columns2 })
    .use(features.groupHeader());

  return <BaseTable {...pipeline.getProps()} width={1000} height={400} />;
}
