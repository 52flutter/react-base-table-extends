import React from 'react';
import { ArtColumn } from '../interfaces';
export interface AbstractTreeNode {
    children?: AbstractTreeNode[];
}
declare type CellProps = any;
/** 合并两个 cellProps（单元格属性）对象，返回一个合并后的全新对象。
 *
 * mergeCellProps 会按照以下规则来合并两个对象：
 * * 对于 数字、字符串、布尔值类型的字段，extra 中的字段值将直接覆盖 base 中的字段值（className 是个特例，会进行字符串拼接）
 * * 对于函数/方法类型的字段（对应单元格的事件回调函数），mergeCellProps 将生成一个新的函数，新函数将按序调用 base 和 extra 中的方法
 * * 对于普通对象类型的字段（对应单元格的样式），mergeCellProps 将合并两个对象
 * */
export declare function mergeCellProps(base: CellProps, extra: CellProps): CellProps;
export declare function isLeafNode(node: AbstractTreeNode): boolean;
/** 遍历所有节点，并将节点收集到一个数组中.
 * order 参数可用于指定遍历规则：
 * * `pre` 前序遍历 （默认）
 * * `post` 后续遍历
 * * `leaf-only` 忽略内部节点，只收集叶子节点
 * */
export declare function collectNodes<T extends AbstractTreeNode>(nodes: T[], order?: 'pre' | 'post' | 'leaf-only'): T[];
/** 对树状结构的数据进行排序.
 * layeredSort 是一个递归的过程，针对树上的每一个父节点，该函数都会重新对其子节点数组（children) 进行排序.
 * */
export declare function layeredSort<T extends AbstractTreeNode>(array: T[], compare: (x: T, y: T) => number): T[];
/** 比较函数，支持字符串、数字、数组和 null。
 * * 对于字符串将比较两者的字典序；
 * * 对数字将比较两者大小；
 * * null 值在比较时总是小于另一个值；
 * * 对于数组来说，将逐个比较数组中的元素，第一个不相等的比较结果将作为整个数组的比较结果
 *
 * 数组的比较可参考 python 中的元祖比较：
 * https://stackoverflow.com/questions/5292303/how-does-tuple-comparison-work-in-python */
export declare function smartCompare(x: any, y: any): number;
export declare type RecursiveFlatMapInfo<T> = {
    startIndex: number;
    endIndex: number;
    path: T[];
    isLeaf: boolean;
};
export declare function makeRecursiveMapper<T extends AbstractTreeNode>(fn: (node: T, info: RecursiveFlatMapInfo<T>) => null | T | T[]): (tree: T[]) => T[];
export declare function always<T>(value: T): (...args: any[]) => T;
export declare function safeGetRowKey(primaryKey: React.Key | ((record: any) => string), record: any, rowIndex: number): string;
export declare const arrayUtils: {
    readonly diff: (arr1: string[], arr2: Iterable<string>) => string[];
    readonly merge: (arr1: string[], arr2: string[]) => string[];
};
export declare function safeGetValue(column: ArtColumn, record: any, rowIndex: number): any;
export declare function flatMap<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U[]): U[];
export declare function safeRender(column: ArtColumn, args: {
    cellData: any;
    columns: ArtColumn[];
    column: ArtColumn;
    columnIndex: number;
    rowData: any;
    rowIndex: number;
    container: any;
    isScrolling?: boolean;
}): any;
export declare function safeHeaderRender(column: ArtColumn, args: {
    columns: ArtColumn[];
    column: ArtColumn;
    columnIndex: number;
    headerIndex: number;
    container: any;
}): any;
export {};
