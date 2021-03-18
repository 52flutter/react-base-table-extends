import { TablePipeline } from '../pipeline';
export interface SpanRect {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare function autoRowSpan(): (pipeline: TablePipeline) => TablePipeline;
