import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TablePipeline } from '../pipeline';

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
`;

export function empty() {
  return function setup(pipeline: TablePipeline) {
    const component = pipeline.ctx.components.Empty || (
      <Empty>Table is empty</Empty>
    );
    pipeline.appendTableProps('emptyRenderer', component);
    return pipeline;
  };
}
