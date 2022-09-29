/*
 * @Author: renjie.yin
 * @Date: 2021-03-15 17:21:04
 * @LastEditors: renjie.yin
 * @LastEditTime: 2022-09-27 17:19:49
 * @Description:
 */
import React from 'react';
import { TablePipeline } from '../pipeline';

import {
  makeRecursiveMapper,
  safeHeaderRender,
  safeRender,
} from '../utils/utils';

export function tips(opts?: { all: boolean }) {
  return function tipsSetup(pipeline: TablePipeline) {
    return pipeline.mapColumns(
      makeRecursiveMapper((col) => {
        if (opts?.all && col.features?.tips === false) {
          return col;
        } else if (!col.features?.tips && opts?.all !== true) {
          return col;
        }
        // const Balloon = pipeline.ctx.components.Balloon;
        const Tooltip = pipeline.ctx.components.Tooltip;

        if (Tooltip == null) {
          throw new Error(
            '使用 tips 之前需要通过 pipeline context 设置 components.Tooltip',
          );
        }

        return {
          ...col,
          headerRenderer: (args: any) => {
            return <Tooltip>{safeHeaderRender(col, args)}</Tooltip>;
            // if (typeof col.features.tips !== 'string') {
            //   return <Tooltip>{safeHeaderRender(col, args)}</Tooltip>;
            // }
            // return (
            //   <Tooltip>
            //     <HeaderCellWithTips style={{ justifyContent }}>
            //       <>
            //         {safeHeaderRender(col, args)}
            //         <Tooltip style={{ width: 'auto' }} auto={false} tooltip={col.features.tips}>
            //           <div className="tip-icon-wrapper">
            //             <icons.Info className="tip-icon" />
            //           </div>
            //         </Tooltip>
            //       </>
            //     </HeaderCellWithTips>
            //   </Tooltip>
            // );
          },
          cellRenderer: (args: any) => {
            const res = safeRender(col, args);
            if (typeof res === 'string') {
              return <Tooltip>{safeRender(col, args)}</Tooltip>;
            }
            return res;
          },
        };
      }),
    );
  };
}
