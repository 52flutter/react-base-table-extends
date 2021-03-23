import React from 'react';
import { TablePipeline } from '../pipeline';
import { isLeafNode, makeRecursiveMapper, safeGetValue } from '../utils/utils';
import cx from 'classnames';

function isIdentity(x: any, y: any) {
  return x === y;
}

export interface SpanRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  isEmpty?: boolean;
}

export function autoRowSpan() {
  return function autoRowSpanStep(pipeline: TablePipeline) {
    const dataSource = pipeline.getDataSource();
    let maxRowSpan = 0;
    pipeline.mapColumns(
      makeRecursiveMapper((col, { startIndex, endIndex }) => {
        if (!col.features?.autoRowSpan) {
          return col;
        }

        if (!isLeafNode(col)) {
          return col;
        }

        const isFunc = typeof col.features.autoRowSpan === 'function';
        const shouldMergeCell = isFunc ? col.features.autoRowSpan : isIdentity;

        const spanRects: SpanRect[] = [];
        let lastBottom = 0;
        let prevValue: any = null;
        let prevRow: any = null;

        for (let rowIndex = 0; rowIndex < dataSource.length; rowIndex++) {
          const row = dataSource[rowIndex];
          const value = safeGetValue(col, row, rowIndex);

          if (
            rowIndex === 0 ||
            !shouldMergeCell(prevValue, value, prevRow, row)
          ) {
            const spanRect: SpanRect = {
              top: lastBottom,
              bottom: rowIndex,
              left: startIndex,
              right: endIndex,
            };
            let j = 0;
            for (let i = lastBottom; i < rowIndex; i++) {
              if (lastBottom === i) {
                spanRects.push(spanRect);
              } else {
                spanRects.push({
                  ...spanRect,
                  top: lastBottom + j,
                  bottom: lastBottom + 1 + j,
                  isEmpty: true,
                });
              }
              j++;
            }
            lastBottom = rowIndex;
          }
          prevValue = value;
          prevRow = row;
        }

        for (let i = lastBottom; i < dataSource.length; i++) {
          spanRects.push({
            top: lastBottom,
            bottom: dataSource.length,
            left: startIndex,
            right: endIndex,
          });
        }
        spanRects.forEach(p => {
          if (p.bottom - p.top > maxRowSpan) {
            maxRowSpan = p.bottom - p.top;
          }
        });
        // console.log('spanRects', spanRects);
        return {
          ...col,
          getSpanRect(rowIndex: number) {
            return spanRects[rowIndex];
          },
        };
      }),
    );

    if (maxRowSpan) {
      // pipeline.appendTableProps('overscanCount', maxRowSpan);
      pipeline.appendTableProps('overscanRowCount', maxRowSpan);
      // overscanRowAlways
      pipeline.appendTableProps('overscanRowAlways', true);
    }

    // pipeline.appendTableProps('virtual', false);
    pipeline.appendTableProps(
      'rowRenderer',
      ({ rowData, rowIndex, cells, columns }) => {
        columns.map((col, spanIndex) => {
          if (col?.getSpanRect) {
            const { top = 0, bottom = 0, isEmpty } =
              col.getSpanRect(rowIndex) || {};
            // const colSpan = right - left;
            // if (colSpan > 1 && cells[spanIndex]) {
            //   let width = cells[spanIndex].props.style.width;
            //   for (let i = 1; i < colSpan; i++) {
            //     width += cells[spanIndex + i].props.style.width;
            //     cells[spanIndex + i] = null;
            //   }
            //   const style = {
            //     ...cells[spanIndex].props.style,
            //     width,
            //   };
            //   cells[spanIndex] = React.cloneElement(cells[spanIndex], { style, className: cx(cells[spanIndex].props?.className, 'table-span-cell') });
            // }
            // if (isEmpty) {
            //   const cell: any = cells[spanIndex];
            //   const style = {
            //     ...cell?.props?.style,
            //     height: pipeline.getRowHeight(),

            //     // background: 'red',
            //     border: 'none',
            //   };
            //   cells[spanIndex] = React.cloneElement(cell, {
            //     style,
            //     children: <div></div>,
            //     className: cx(cell?.props?.className, 'table-span-cell'),
            //   });
            // }
            const rowSpan = bottom - top;
            if (rowSpan > 1 && cells[spanIndex]) {
              const cell: any = cells[spanIndex];
              const style = {
                ...cell?.props?.style,
                height: rowSpan * pipeline.getRowHeight() - 1,
                // height: 30,
                alignSelf: 'flex-start',
                zIndex: 1,
              };
              cells[spanIndex] = React.cloneElement(cell, {
                style,
                className: cx(cell?.props?.className, 'table-span-cell'),
              });
            }
          }
        });
        return cells;
      },
    );
    return pipeline;
  };
}
