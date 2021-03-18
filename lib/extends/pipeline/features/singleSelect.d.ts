import React from 'react';
import { ArtColumn } from '../interfaces';
import { TablePipeline } from '../pipeline';
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
export declare function singleSelect(opts?: SingleSelectFeatureOptions): (pipeline: TablePipeline) => TablePipeline;
