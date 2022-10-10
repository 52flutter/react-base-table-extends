import { BaseTableProps } from '../../base';
import React, { useState } from 'react';

import { ArtColumn, Transform, TableProps } from './interfaces';
import { mergeCellProps } from './utils/utils';

// import { mergeCellProps } from '../utils';

type PrimaryKey = React.Key;

type RowPropsGetter = TableProps['rowProps'];

interface PipelineSnapshot {
  data: any[];
  columns: ArtColumn[];
  rowPropsGetters: RowPropsGetter[];
}

export interface TablePipelineIndentsConfig {
  iconIndent: number;
  iconWidth: 16;
  iconGap: number;
  indentSize: number;
}

export interface TablePipelineCtx {
  primaryKey?: PrimaryKey;
  components: { [name: string]: any };
  indents: TablePipelineIndentsConfig;

  [key: string]: any;
}

/**
 * 表格数据处理流水线。TablePipeline 提供了表格数据处理过程中的一些上下方与工具方法，包括……
 *
 * 1. ctx：上下文环境对象，step（流水线上的一步）可以对 ctx 中的字段进行读写。
 * ctx 中部分字段名称有特定的含义（例如 primaryKey 表示行的主键），使用自定义的上下文信息时注意避开这些名称。
 *
 * 2. rowPropsGetters：getRowProps 回调队列，step 可以通过 pipeline.appendRowPropsGetter 向队列中追加回调函数，
 *   在调用 pipeline.props() 队列中的所有函数会组合形成最终的 getRowProps
 *
 * 3. 当前流水线的状态，包括 data, columns, rowPropsGetters 三个部分
 *
 * 4. snapshots，调用 pipeline.snapshot(name) 可以记录当前的状态，后续可以通过 name 来读取保存的状态
 * */
export class TablePipeline {
  private readonly _snapshots: { [key: string]: PipelineSnapshot } = {};
  private readonly _rowPropsGetters: Array<RowPropsGetter> = [];
  // @ts-ignore
  private _data: any[] = null;
  // @ts-ignore
  private _columns: any[] = null;

  static defaultIndents: TablePipelineIndentsConfig = {
    iconIndent: 0,
    iconWidth: 16,
    iconGap: 0,
    indentSize: 16,
  };

  readonly ctx: TablePipelineCtx = {
    components: {},
    indents: TablePipeline.defaultIndents,
  };

  private readonly state: any;
  private readonly setState: (
    fn: (prevState: any) => any,
    stateKey: string,
    partialState: any,
    extraInfo?: any,
  ) => any;

  constructor({
    state,
    setState,
    ctx,
  }: {
    state: any;
    setState: TablePipeline['setState'];
    ctx?: Partial<TablePipelineCtx>;
  }) {
    this.state = state;
    this.setState = setState;
    Object.assign(this.ctx, ctx);
  }

  appendRowPropsGetter(getter: RowPropsGetter) {
    this._rowPropsGetters.push(getter);
    return this;
  }

  getDataSource(name?: string) {
    if (name == null) {
      return this._data;
    } else {
      return this._snapshots[name].data;
    }
  }

  getColumns(name?: string) {
    if (name == null) {
      return this._columns;
    } else {
      return this._snapshots[name].columns;
    }
  }

  getStateAtKey<T = any>(stateKey: string, defaultValue?: T): T {
    return this.state[stateKey] ?? defaultValue;
  }

  /** 将 stateKey 对应的状态设置为 partialState  */
  setStateAtKey(stateKey: string, partialState: any, extraInfo?: any) {
    this.setState(
      (prev: any) => ({ ...prev, [stateKey]: partialState }),
      stateKey,
      partialState,
      extraInfo,
    );
  }

  /** 确保 primaryKey 已被设置，并返回 primaryKey  */
  ensurePrimaryKey(hint?: string): PrimaryKey {
    if (this.ctx.primaryKey == null) {
      throw new Error(
        hint
          ? `使用 ${hint} 之前必须先设置 primaryKey`
          : '必须先设置 primaryKey',
      );
    }
    return this.ctx.primaryKey;
  }

  private _otherProps: TableProps | undefined;

  getRowHeight() {
    return this._otherProps?.rowHeight || 30;
  }

  getHeaderHeight() {
    return this._otherProps?.headerHeight || 40;
  }

  getFixed() {
    return this._otherProps?.fixed || false;
  }
  /** 设置流水线的输入数据 */
  input(input: { data: any[]; columns: ArtColumn[] }, otherProps?: TableProps) {
    if (this._data != null || this._columns != null) {
      throw new Error('input不能调用两次');
    }

    this._data = input.data;
    this._columns = input.columns;
    this._otherProps = otherProps;
    if (this._otherProps?.rowEventHandlers) {
      Object.keys(this._otherProps?.rowEventHandlers ?? {}).forEach((p) => {
        this.appendRowEventHandlers(
          p,
          this._otherProps!.rowEventHandlers![p] as any,
        );
      });
    }

    this.snapshot('input');

    return this;
  }

  /** 设置 data */
  data(rows: any[]) {
    this._data = rows;
    return this;
  }

  /** 设置 columns */
  columns(cols: ArtColumn[]) {
    this._columns = cols;
    return this;
  }

  /** 设置主键 */
  primaryKey(key: PrimaryKey) {
    this.ctx.primaryKey = key;
    return this;
  }

  /** 保存快照 */
  snapshot(name: string) {
    this._snapshots[name] = {
      data: this._data,
      columns: this._columns,
      rowPropsGetters: this._rowPropsGetters.slice(),
    };
    return this;
  }

  /** 使用 pipeline 功能拓展 */
  use(step: (pipeline: this) => this) {
    return step(this);
  }

  /** 转换 data */
  mapDataSource(mapper: Transform<any[]>) {
    return this.data(mapper(this.getDataSource()));
  }

  /** 转换 columns */
  mapColumns(mapper: Transform<ArtColumn[]>) {
    return this.columns(mapper(this.getColumns()));
  }

  /** 获取 BaseTable 的 props，结果中包含 data/columns/primaryKey/getRowProps 四个字段 */
  getProps() {
    const result: TableProps = {
      data: this._data,
      columns: this._columns,
      ignoreFunctionInColumnCompare: false,
      rowHeight: this.getRowHeight(),
      headerHeight: this.getHeaderHeight(),
    };

    if (this.ctx.primaryKey) {
      result.rowKey = this.ctx.primaryKey;
    }

    if (this._rowPropsGetters.length > 0) {
      result.rowProps = ({ columns, rowData, rowIndex }: any) => {
        return this._rowPropsGetters.reduce<any>((res, get: any) => {
          return mergeCellProps(
            res,
            get({ columns, rowData, rowIndex }) as any,
          );
        }, {});
      };
    }

    if (this._rowEventHandlers && Object.keys(this._rowEventHandlers)?.length) {
      result.rowEventHandlers = this._rowEventHandlers;
    }
    Object.keys(this._tableProps || {}).map((key) => {
      if (this._tableProps[key]?.length) {
        const first = this._tableProps[key][0];
        // 如果是方法 需要合并 否则取最后一个
        if (typeof first === 'function') {
          // if (key === 'footerRenderer') {
          //   result[key] = first;
          // } else {
          result[key] = (...args: any[]) => {
            // rowClassName 需要合并返回值
            if (key === 'rowClassName') {
              let classNames: string[] = this._tableProps[key]
                ?.map((item: any, index) => {
                  return item(...args);
                })
                .filter((p) => p) as string[];
              return classNames.join(' ');
            }
            if (key === 'rowRenderer') {
              let cells = args[0].cells;
              this._tableProps[key]?.map((item: any) => {
                cells = item({ ...args[0], cells });
              });
              return cells;
            }

            const resData = this._tableProps[key].reduce<any>(
              (res, get: any) => {
                return mergeCellProps(res, get(...args));
              },
              null,
            );
            // key === 'cellProps' && console.log('res111', key, resData, args);
            return resData;
            // };
          };
        } else {
          result[key] = this._tableProps[key][this._tableProps[key].length - 1];
        }
      }
    });

    return result;
  }

  private readonly _rowEventHandlers: {
    [key: string]: (args: {
      rowData: any;
      rowIndex: number;
      rowKey: React.Key;
      event: React.SyntheticEvent;
    }) => void;
  } = {};

  appendRowEventHandlers(
    eventName: string,
    func: (args: {
      rowData: any;
      rowIndex: number;
      rowKey: React.Key;
      event: React.SyntheticEvent;
    }) => void,
  ) {
    if (!this._rowEventHandlers[eventName]) {
      this._rowEventHandlers[eventName] = func;
    } else {
      let oldFunc = this._rowEventHandlers[eventName];
      this._rowEventHandlers[eventName] = (args) => {
        oldFunc(args);
        func(args);
      };
    }
  }

  private _tableProps: { [p in keyof TableProps]: TableProps[p][] } = {};

  public appendTableProps<K extends keyof BaseTableProps>(
    name: K,
    value: BaseTableProps[K],
  ) {
    if (this._tableProps[name]) {
      this._tableProps[name].push(value);
    } else {
      this._tableProps[name] = [value];
    }
  }
}

export function useTablePipeline(ctx?: Partial<TablePipelineCtx>) {
  const [state, setState] = useState<any>({});
  return new TablePipeline({ state, setState, ctx });
}
