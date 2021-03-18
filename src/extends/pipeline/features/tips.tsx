import React from 'react';
import { TablePipeline } from '../pipeline';
import styled from 'styled-components';
import { icons } from '../utils/common-view';
import {
  makeRecursiveMapper,
  safeHeaderRender,
  safeRender,
} from '../utils/utils';

const HeaderCellWithTips = styled.div`
  display: flex;
  align-items: center;

  .tip-icon-wrapper {
    margin-left: 2px;
    margin-right: 1px;
  }

  .tip-icon {
    display: flex;
    fill: currentColor;
  }
`;

export function tips() {
  return function tipsSetup(pipeline: TablePipeline) {
    return pipeline.mapColumns(
      makeRecursiveMapper(col => {
        if (!col.features?.tips) {
          return col;
        }
        // const Balloon = pipeline.ctx.components.Balloon;
        const Tooltip = pipeline.ctx.components.Tooltip;

        if (Tooltip == null) {
          throw new Error(
            '使用 tips 之前需要通过 pipeline context 设置 components.Tooltip',
          );
        }
        const justifyContent =
          col.align === 'right'
            ? 'flex-end'
            : col.align === 'center'
            ? 'center'
            : 'flex-start';

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
            return <Tooltip>{safeRender(col, args)}</Tooltip>;
          },
        };
      }),
    );
  };
}
