import { BaseTableProps, ColumnShape } from '../../base';

export interface ArtColumn<T = any> extends ColumnShape<T> {
  children?: ArtColumn[];
  /** 功能开关 */
  features?: { [key: string]: any };
  getValue?: (record: any, rowIndex: number) => any;
  // getCellProps?:;
}

export type Transform<T> = (input: T) => T;

export type TableProps = Partial<BaseTableProps>;

export type SortOrder = 'desc' | 'asc' | 'none';

export type SortItem = { key: string; order: SortOrder };

export interface HoverRange {
  start: number;
  end: number;
}
