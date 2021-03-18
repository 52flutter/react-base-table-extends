import { ArtColumn } from '../interfaces';
import { TablePipeline } from '../pipeline';
declare type ITreeItem = ArtColumn;
export declare class TreeUtils {
    static deepChild(node: ITreeItem, deep?: number, callBack?: (item: ITreeItem, level: number) => void): void;
    static getTreeNodeLevel<T extends ITreeItem>(root: T[], item: T): number;
    static getTreeMaxLevel<T extends ITreeItem>(root: T[]): number;
    static getTreeNodeByLevel<T extends ITreeItem>(root: T[], level: number): T[];
}
export declare function groupHeader(opts: {
    headHeight?: number;
    cellPadding?: number;
}): (pipeline: TablePipeline) => TablePipeline;
export {};
