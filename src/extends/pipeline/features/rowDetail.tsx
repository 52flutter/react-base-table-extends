import cx from 'classnames';
import React, { ReactNode } from 'react';
import { ExpansionCell, icons, InlineFlexCell } from '../utils/common-view';
import { ArtColumn } from '../interfaces';
import { TablePipeline } from '../pipeline';
import {
  always,
  collectNodes,
  flatMap,
  safeHeaderRender,
  safeRender,
} from '../utils/utils';

export interface RowDetailFeatureOptions {
  /** 非受控用法：是否默认展开所有详情单元格 */
  defaultOpenAll?: boolean;

  /** 非受控用法：默认展开的 keys */
  defaultOpenKeys?: string[];

  /** 受控用法：当前展开的 keys */
  openKeys?: string[];

  /** 受控用法：openKeys 改变的回调 */
  onChangeOpenKeys?(
    nextKeys: string[],
    key: string,
    action: 'expand' | 'collapse',
  ): void;

  /** 详情单元格的渲染方法 */
  renderDetail?(row: any, rowIndex: number): ReactNode;

  /** 是否包含详情单元格 */
  hasDetail?(row: any, rowIndex: number): ReactNode;

  /** 获取详情单元格所在行的 key，默认为 `(row) => row[primaryKey] + '_detail'` */
  getDetailKey?(row: any, rowIndex: number): string;

  /** 详情单元格 td 的额外样式 */
  detailCellStyle?: React.CSSProperties;

  /** 点击事件的响应区域 */
  clickArea?: 'cell' | 'content' | 'icon';

  /** 是否对触发展开/收拢的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;

  /** 指定表格每一行元信息的记录字段 */
  rowDetailMetaKey?: string | symbol;
}

const rowDetailSymbol = Symbol('row-detail');

const fallbackRenderDetail = () => (
  <div style={{ margin: '8px 24px' }}>
    <b style={{ color: 'indianred' }}>
      设置 <code>rowDetail.renderDetail</code> 来自定义详情内容
    </b>
  </div>
);

/** rowDetail 不能使用 frozen */
export function rowDetail(opts: RowDetailFeatureOptions = {}) {
  return function rowDetailStep(pipeline: TablePipeline) {
    const stateKey = 'rowDetail';

    const primaryKey = pipeline.ensurePrimaryKey('rowDetail') as string;
    if (typeof primaryKey !== 'string') {
      throw new Error('rowDetail 仅支持字符串作为 primaryKey');
    }

    const rowDetailMetaKey = opts.rowDetailMetaKey ?? rowDetailSymbol;
    const indents = pipeline.ctx.indents;
    const textOffset = indents.iconIndent + indents.iconWidth + indents.iconGap;
    const clickArea = opts.clickArea ?? 'icon';

    const getDetailKey =
      opts.getDetailKey ?? ((row) => row[primaryKey] + '_detail');
    const renderDetail = opts.renderDetail ?? fallbackRenderDetail;
    const hasDetail = opts.hasDetail ?? always(true);

    const openKeys: string[] =
      opts.openKeys ??
      pipeline.getStateAtKey(stateKey) ??
      (opts.defaultOpenAll
        ? pipeline
            .getDataSource()
            .filter(hasDetail)
            .map((row) => row[primaryKey])
        : opts.defaultOpenKeys) ??
      [];
    const onChangeOpenKeys: RowDetailFeatureOptions['onChangeOpenKeys'] = (
      nextKeys,
      key,
      action,
    ) => {
      opts.onChangeOpenKeys?.(nextKeys, key, action);
      pipeline.setStateAtKey(stateKey, nextKeys, { key, action });
    };

    const openKeySet = new Set(openKeys);

    const toggle = (rowKey: string) => {
      const expanded = openKeySet.has(rowKey);
      if (expanded) {
        onChangeOpenKeys(
          openKeys.filter((key) => key !== rowKey),
          rowKey,
          'collapse',
        );
      } else {
        onChangeOpenKeys([...openKeys, rowKey], rowKey, 'expand');
      }
    };
    pipeline.appendTableProps('estimatedRowHeight', pipeline.getRowHeight());
    pipeline.appendTableProps('virtual', true);
    return pipeline
      .data(
        flatMap(pipeline.getDataSource(), (row, rowIndex) => {
          if (openKeySet.has(row[primaryKey])) {
            return [
              row,
              {
                [rowDetailMetaKey]: true,
                ...row,
                [primaryKey]: getDetailKey(row, rowIndex),
              },
            ];
          } else {
            return [row];
          }
        }),
      )
      .columns(processColumns(pipeline.getColumns()));

    function processColumns(columns: ArtColumn[]) {
      if (columns.length === 0) {
        return columns;
      }
      // 将frozen置空
      columns.forEach((p) => (p.frozen = undefined));
      const [firstCol, ...others] = columns;

      if (clickArea === 'cell') {
        pipeline.appendTableProps('cellProps', (args) => {
          if (args.column.key === firstCol.key) {
            return {
              onClick(e: any) {
                if (opts.stopClickEventPropagation) {
                  e.stopPropagation();
                }
                toggle(args.rowData[primaryKey]);
              },
              style: { cursor: 'pointer' },
            };
          }
          return {};
        });
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
        const { rowData: row, rowIndex } = args;
        if (row[rowDetailMetaKey]) {
          return renderDetail(row, rowIndex);
        }

        const content = safeRender(firstCol, args);

        if (!hasDetail(row, rowIndex)) {
          return (
            <InlineFlexCell style={{ marginLeft: textOffset }}>
              {content}
            </InlineFlexCell>
          );
        }

        const rowKey = row[primaryKey];
        const expanded = openKeySet.has(rowKey);
        const onClick = (e: React.MouseEvent) => {
          if (opts.stopClickEventPropagation) {
            e.stopPropagation();
          }
          toggle(rowKey);
        };

        const expandCls = expanded ? 'expanded' : 'collapsed';
        return (
          <ExpansionCell
            className={cx('expansion-cell', expandCls)}
            style={{
              cursor: clickArea === 'content' ? 'pointer' : undefined,
              height: pipeline.getRowHeight(),
            }}
            onClick={clickArea === 'content' ? onClick : undefined}
          >
            <icons.CaretRight
              style={{
                cursor: clickArea === 'icon' ? 'pointer' : undefined,
                marginLeft: indents.iconIndent,
                marginRight: indents.iconGap,
              }}
              className={cx('expansion-icon', expandCls)}
              onClick={clickArea === 'icon' ? onClick : undefined}
            />
            {content}
          </ExpansionCell>
        );
      };
      pipeline.appendTableProps('rowRenderer', (args) => {
        const { rowData, cells, columns } = args;
        if (rowData[rowDetailMetaKey]) {
          return cellRenderer(args as any);
        }
        return cells;
        // return <div style={{ height: pipeline.getRowHeight(), display: 'flex' }}>{cells}</div>;
      });

      return [
        {
          ...firstCol,
          headerRenderer: (args: any) => {
            return (
              <div style={{ display: 'inline-block', marginLeft: textOffset }}>
                {safeHeaderRender(firstCol, args)}
              </div>
            );
          },
          cellRenderer: cellRenderer,
        },
        ...others,
      ];
    }
  };
}
