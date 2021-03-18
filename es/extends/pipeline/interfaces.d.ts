import { BaseTableProps, ColumnShape } from '../../base';
export interface ArtColumn<T = any> extends ColumnShape<T> {
    children?: ArtColumn[];
    /** 功能开关 */
    features?: {
        [key: string]: any;
    };
    getValue?: (record: any, rowIndex: number) => any;
}
export declare type Transform<T> = (input: T) => T;
export declare type TableProps = Partial<BaseTableProps>;
export declare type SortOrder = 'desc' | 'asc' | 'none';
export declare type SortItem = {
    key: string;
    order: SortOrder;
};
export interface HoverRange {
    start: number;
    end: number;
}
