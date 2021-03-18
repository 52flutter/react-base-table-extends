import React from 'react';

import { ArtColumn } from '../interfaces';
import { TablePipeline } from '../pipeline';
import { always, safeGetRowKey } from '../utils/utils';

export interface SingleSelectFeatureOptions {
  /** 是否高亮被选中的行 */
  highlightRowWhenSelected?: boolean;

  /** 非受控用法：默认选中的值 */
  defaultValue?: React.Key;

  /** 受控用法：当前选中的值 */
  value?: React.Key;

  /** 受控用法：选中值改变回调 */
  onChange?: (next: React.Key) => void;

  /** 判断一行是否禁用 */
  isDisabled?(row: any, rowIndex: number): boolean;

  /** 点击事件的响应区域 */
  clickArea?: 'radio' | 'cell' | 'row';

  /** 单选框所在列的 column 配置，可指定 width，lock 等属性 */
  radioColumn?: Partial<ArtColumn>;

  /** 单选框所在列的位置 */
  radioPlacement?: 'start' | 'end';

  /** 是否对触发 onChange 的 click 事件调用 event.stopPropagation() */
  stopClickEventPropagation?: boolean;
}

export function singleSelect(opts: SingleSelectFeatureOptions = {}) {
  return function singleSelectStep(pipeline: TablePipeline) {
    const Radio = pipeline.ctx.components.Radio;
    if (Radio == null) {
      throw new Error(
        '使用 singleSelect 之前需要通过 pipeline context 设置 components.Radio',
      );
    }

    const stateKey = 'singleSelect';
    const clickArea = opts.clickArea ?? 'radio';
    const isDisabled = opts.isDisabled ?? always(false);

    const primaryKey = pipeline.ensurePrimaryKey('singleSelect');
    const value =
      opts.value ?? pipeline.getStateAtKey(stateKey) ?? opts.defaultValue;
    const onChange = (rowKey: React.Key) => {
      opts.onChange?.(rowKey);
      pipeline.setStateAtKey(stateKey, rowKey);
    };

    const radioColumn: ArtColumn = {
      name: '',
      width: 50,
      key: '__singleSelectKey__',
      // maxWidth: 50,
      minWidth: 50,
      resizable: true,
      align: 'center',
      ...opts.radioColumn,

      cellRenderer: ({
        rowData,
        rowIndex,
      }: {
        cellData: any;
        rowData: any;
        rowIndex: number;
      }) => {
        const rowKey = safeGetRowKey(primaryKey, rowData, rowIndex);
        return (
          <Radio
            checked={value === rowKey}
            disabled={isDisabled(rowData, rowIndex)}
            onChange={
              clickArea === 'radio'
                ? (arg1: any, arg2: any) => {
                    const nativeEvent: MouseEvent =
                      arg2?.nativeEvent ?? arg1?.nativeEvent;
                    if (nativeEvent && opts.stopClickEventPropagation) {
                      nativeEvent.stopPropagation();
                    }
                    onChange(rowKey);
                  }
                : undefined
            }
          />
        );
      },
    };

    const nextColumns = pipeline.getColumns().slice();

    const radioPlacement = opts.radioPlacement ?? 'start';
    if (radioPlacement === 'start') {
      nextColumns.unshift(radioColumn);
    } else {
      nextColumns.push(radioColumn);
    }

    pipeline.columns(nextColumns);
    if (opts.highlightRowWhenSelected) {
      pipeline.appendTableProps(
        'rowClassName',
        (args: { columns: ArtColumn[]; rowData: any; rowIndex: number }) => {
          const rowKey = safeGetRowKey(primaryKey, args.rowData, args.rowIndex);
          if (value === rowKey) {
            return 'highlight';
          }
          return '';
        },
      );
    }
    if (clickArea === 'cell') {
      pipeline.appendTableProps(
        'cellProps',
        ({ rowData, rowIndex, column }) => {
          if (column.key === radioColumn.key) {
            const rowKey = safeGetRowKey(primaryKey, rowData, rowIndex);
            const disabled = isDisabled(rowData, rowIndex);
            return {
              style: { cursor: disabled ? 'not-allowed' : 'pointer' },
              onClick: disabled
                ? undefined
                : (e: any) => {
                    if (opts.stopClickEventPropagation) {
                      e.stopPropagation();
                    }
                    onChange(rowKey);
                  },
            };
          }
          return null;
        },
      );
    }

    if (clickArea === 'row') {
      pipeline.appendRowEventHandlers(
        'onClick',
        ({ rowData, rowIndex, event }) => {
          const rowKey = safeGetRowKey(primaryKey, rowData, rowIndex);
          if (opts.stopClickEventPropagation) {
            event.stopPropagation();
          }
          if (!isDisabled(rowData, rowIndex)) {
          }
          onChange(rowKey);
        },
      );
    }

    return pipeline;
  };
}
