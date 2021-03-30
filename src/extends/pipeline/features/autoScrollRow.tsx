import React, { useEffect, useMemo, useRef, useState } from 'react';

import { TablePipeline } from '../pipeline';
import { scrollTopAnimation, useDeepEqualEffect } from '../utils/utils';

export function useTableAutoScroll({
  data = [],
  rowHeight,

  interval,
  open,
  rowKey,
}: {
  data: any;
  rowHeight: number;

  interval: number;
  open?: boolean;
  rowKey: string;
}) {
  const tableRef = useRef<any>();

  const timerRef = useRef<any>();
  const [tableData, setTableData] = useState(data.concat([]));

  useDeepEqualEffect(() => {
    timerRef.current && clearTimeout(timerRef.current);
    setTableData(data);
  }, [data]);

  useEffect(() => {
    timerRef.current && clearTimeout(timerRef.current);
    setTableData(data);

    setTimeout(() => {
      (tableRef.current as any)?.scrollToTop(0);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const func = () => {
      timerRef.current && clearTimeout(timerRef.current);

      if (open !== true) {
        timerRef.current && clearTimeout(timerRef.current);
        return;
      }
      timerRef.current = setTimeout(() => {
        if (tableRef.current) {
          const scrollTop = (tableRef.current as any)?._scroll?.scrollTop || 0;
          const index = Math.floor(scrollTop / rowHeight);
          const targetTop = rowHeight * index + rowHeight;
          const clientHeight =
            tableRef.current?.table?.bodyRef?._outerRef?.parentElement
              ?.offsetHeight;
          const scrollHeight =
            tableRef.current?.table?.bodyRef?._outerRef?.scrollHeight;
          if (scrollHeight > clientHeight) {
            if (clientHeight !== undefined && scrollHeight !== undefined) {
              if (scrollHeight - scrollTop <= clientHeight) {
                // 滚动到最后的时候 从当前位置截取数据 把当前的数据作为第一条 其他数据按顺序追加上去
                setTableData((pre: any[]) => {
                  let newData = pre.concat([]);
                  const sourceIndex =
                    data.findIndex(
                      (p: any) =>
                        p[rowKey] === newData[newData.length - 1][rowKey],
                    ) + 1;
                  const localIndex = index;
                  const appendData: any[] = [];
                  for (let i = sourceIndex; i < sourceIndex + localIndex; i++) {
                    appendData.push({ ...data[i % data.length] });
                  }
                  newData = newData.slice(localIndex);
                  return newData.concat(appendData);
                });
                setTimeout(() => {
                  (tableRef.current as any)?.scrollToTop(0);
                  scrollTopAnimation(tableRef.current, rowHeight, true, () => {
                    func();
                  });
                }, 0);
              } else {
                scrollTopAnimation(tableRef.current, targetTop, true, () => {
                  func();
                });
              }
            } else {
              func();
            }
          }
        }
      }, interval);
    };
    func();
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [data, interval, open, rowHeight, rowKey]);
  return {
    tableRef,
    tableData,
    className: open !== false ? 'BaseTable__table__hidden__scrollbar' : '',
  };
}

export function autoScrollRow({
  interval,
  data,
  open,
}: {
  /** 滚动间隔 */
  interval: number;
  /** 原始数据 */
  data: Array<any>;
  /** 开启滚动 */
  open?: boolean;
}) {
  return function setup(pipeline: TablePipeline) {
    const rowHeight = pipeline.getRowHeight();
    const rowKey = pipeline.ensurePrimaryKey('autoScroll');
    const { tableData, tableRef, className } = useTableAutoScroll({
      rowHeight: rowHeight,
      rowKey: rowKey.toString(),
      interval,
      data,
      open,
    });
    pipeline.appendTableProps('ref', tableRef);
    pipeline.data(tableData);
    pipeline.appendTableProps('className', className);
    return pipeline;
  };
}
