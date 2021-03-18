import cx from 'classnames';
import React from 'react';

import { ArtColumn } from '../interfaces';
import { ExpansionCell, icons, InlineFlexCell } from '../utils/common-view';
import { TablePipeline } from '../pipeline';
import {
  flatMap,
  isLeafNode,
  mergeCellProps,
  safeHeaderRender,
  safeRender,
} from '../utils/utils';

const groupingMetaSymbol = Symbol('row-grouping-meta');

function attachGroupingMeta(row: any) {
  return { [groupingMetaSymbol]: { expandable: !isLeafNode(row) }, ...row };
}

function getGroupingMeta(
  row: any,
): { isGroupHeader: boolean; expandable: boolean } {
  if (row[groupingMetaSymbol] == null) {
    return { isGroupHeader: false, expandable: false };
  }
  return {
    isGroupHeader: true,
    expandable: row[groupingMetaSymbol].expandable,
  };
}

function rowGroupingRowPropsGetter(row: any) {
  if (getGroupingMeta(row).isGroupHeader) {
    return { className: 'alternative' };
  }
  return null;
}

export interface RowGroupingFeatureOptions {
  /** 非受控用法：是否默认展开所有分组 */
  defaultOpenAll?: boolean;

  /** 非受控用法：默认展开的 keys */
  defaultOpenKeys?: string[];

  /** 受控用法：当前展开的 keys */
  openKeys?: string[];

  /** 受控用法：当前展开 keys 改变回调 */
  onChangeOpenKeys?(
    nextKeys: string[],
    key: string,
    action: 'expand' | 'collapse',
  ): void;

  /** 是否对触发 onChangeOpenKeys 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
  /** 分组头显示的内容 默认第一列 */
  groupTitleColKey?: string;
}

export function rowGrouping(opts: RowGroupingFeatureOptions = {}) {
  return (pipeline: TablePipeline) => {
    const stateKey = 'rowGrouping';
    const indents = pipeline.ctx.indents;
    const textOffset = indents.iconIndent + indents.iconWidth + indents.iconGap;

    const primaryKey = pipeline.ensurePrimaryKey('rowGrouping') as string;
    if (typeof primaryKey !== 'string') {
      throw new Error('rowGrouping 仅支持字符串作为 primaryKey');
    }
    const openKeys: string[] =
      opts.openKeys ??
      pipeline.getStateAtKey(stateKey) ??
      (opts.defaultOpenAll
        ? pipeline.getDataSource().map(row => row[primaryKey])
        : opts.defaultOpenKeys) ??
      [];
    const openKeySet = new Set(openKeys);

    const onChangeOpenKeys: RowGroupingFeatureOptions['onChangeOpenKeys'] = (
      nextKeys,
      key,
      action,
    ) => {
      opts.onChangeOpenKeys?.(nextKeys, key, action);
      pipeline.setStateAtKey(stateKey, nextKeys, { key, action });
    };

    return pipeline
      .mapDataSource(processDataSource)
      .mapColumns(processColumns)
      .appendRowPropsGetter(rowGroupingRowPropsGetter);

    function processDataSource(input: any[]) {
      return flatMap(input, row => {
        let result = [attachGroupingMeta(row)];

        const expanded = openKeySet.has(row[primaryKey]);
        if (expanded) {
          if (Array.isArray(row.children)) {
            result = result.concat(row.children);
          }
        }

        return result;
      });
    }

    function processColumns(columns: ArtColumn[]) {
      if (columns.length === 0) {
        return columns;
      }
      // const columnFlatCount = collectNodes(columns, 'leaf-only').length;
      const [firstCol, ...others] = columns;
      const colKey = opts.groupTitleColKey || firstCol.key;

      const column = columns.find(p => p.key === colKey);
      if (!column) {
        return columns;
      }
      const cellRenderer = (args: {
        cellData: any;
        columns: ArtColumn[];
        column: ArtColumn;
        columnIndex: number;
        rowData: any;
        rowIndex: number;
        container: any;
        isScrolling?: boolean;
      }) => {
        const { rowData: row } = args;
        const content = safeRender(column, args);
        const meta = getGroupingMeta(row);
        if (!meta.isGroupHeader || !meta.expandable) {
          const marginLeft =
            textOffset + (meta.isGroupHeader ? 0 : indents.indentSize);
          return (
            <InlineFlexCell style={{ marginLeft }}>
              {meta.isGroupHeader ? row.groupTitle ?? content : content}
            </InlineFlexCell>
          );
        }

        const expanded = openKeySet.has(row[primaryKey]);
        const expandCls = expanded ? 'expanded' : 'collapsed';
        return (
          <ExpansionCell className={cx('expansion-cell', expandCls)}>
            <icons.CaretRight
              className={cx('expansion-icon', expandCls)}
              style={{
                marginLeft: indents.iconIndent,
                marginRight: indents.iconGap,
              }}
            />
            {row.groupTitle ?? content}
          </ExpansionCell>
        );
      };

      pipeline.appendTableProps('rowRenderer', args => {
        const { rowData, cells, columns } = args;
        if (getGroupingMeta(rowData).isGroupHeader) {
          let colIndex = columns.findIndex(p => p.key === colKey);
          if (colIndex < 0) {
            return cells;
          }
          if (columns[colIndex]['__placeholder__']) {
            colIndex = 0;
          }
          console.log('rowRenderer', columns, args);
          let totalWidth = 0;
          cells.forEach((c: any, index) => {
            if (index >= colIndex) {
              let width = c?.props?.style?.width || 0;
              totalWidth += width;
            }
          });
          const style = {
            ...(cells[0] as any)?.props?.style,
            width: totalWidth,
          };
          cells[colIndex] = React.cloneElement(cells[colIndex] as any, {
            style: style,
          });
          return cells.splice(0, colIndex + 1);
          // return cellRenderer(args as any);
        }
        return cells;
      });

      pipeline.appendTableProps('cellProps', args => {
        if (args.column.key === colKey) {
          const row = args.rowData;
          const meta = getGroupingMeta(row);
          if (!meta.isGroupHeader) {
            return null;
          }

          const { expandable } = meta;

          const rowKey = row[primaryKey];
          const expanded = openKeySet.has(rowKey);

          let onClick: any;
          if (expandable) {
            onClick = (e: React.MouseEvent) => {
              if (opts.stopClickEventPropagation) {
                e.stopPropagation();
              }

              if (onChangeOpenKeys) {
                if (expanded) {
                  onChangeOpenKeys(
                    openKeys.filter(key => key !== rowKey),
                    rowKey,
                    'collapse',
                  );
                } else {
                  onChangeOpenKeys([...openKeys, rowKey], rowKey, 'expand');
                }
              }
            };
          }

          return {
            onClick,
            style: { cursor: expandable ? 'pointer' : undefined },
          };
        }
        return null;
      });
      const _columns = [...columns];
      return _columns.map(item => {
        if (item.key === colKey) {
          return {
            ...item,
            cellRenderer,
            headerRenderer: (args: any) => {
              return (
                <div
                  style={{ display: 'inline-block', marginLeft: textOffset }}
                >
                  {safeHeaderRender(column, args)}
                </div>
              );
            },
          };
        }
        return item;
      });

      // return [
      //   {
      //     ...firstCol,
      //     headerRenderer: (args: any) => {
      //       return <div style={{ display: 'inline-block', marginLeft: textOffset }}>{safeHeaderRender(firstCol, args)}</div>;
      //     },
      //     cellRenderer,

      //     // getSpanRect(value: any, row: any, rowIndex: number) {
      //     //   if (getGroupingMeta(row).isGroupHeader) {
      //     //     return { top: rowIndex, bottom: rowIndex + 1, left: 0, right: columnFlatCount };
      //     //   }
      //     // },
      //   },
      //   ...others,
      // ];
    }
  };
}
