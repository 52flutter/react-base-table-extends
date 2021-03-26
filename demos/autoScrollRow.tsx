import React, { useState } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { Button } from 'antd';

import { generateColumns, generateData } from './utils';

function FilterIcon({ size = 32, style, className, filter }: any) {
  return (
    <svg
      style={style}
      className={className}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      width={size}
      height={size}
      viewBox="64 64 896 896"
      aria-hidden="true"
    >
      <path
        fill={filter ? '#23A3FF' : '#bfbfbf'}
        transform="translate(0, 4)"
        d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"
      />
    </svg>
  );
}

export default function Index() {
  const columns = generateColumns(10);
  const data = generateData(columns, 200);
  const [open, setOpen] = useState(false);
  const pipeline = useTablePipeline({ primaryKey: 'id' })
    .input({ data, columns: columns })
    .use(features.autoScrollRow({ data, interval: 3 * 1000, open }));

  return (
    <>
      <FilterIcon />
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
