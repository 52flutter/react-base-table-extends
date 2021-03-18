import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TablePipeline } from '../pipeline';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  border-radius: 100%;
  margin: 2px;
  border: 2px solid #0696d7;
  border-bottom-color: transparent;
  margin: 2px;
  width: ${(props: any) => (props.small ? 12 : 22)}px;
  height: ${(props: any) => (props.small ? 12 : 22)}px;
  animation: ${rotate} 0.75s linear infinite;
`;

const LoadingLayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0;
  width: 100%;
  height: 100%;
`;

export function loading({ loading }: { loading: boolean }) {
  return function setup(pipeline: TablePipeline) {
    const renderOverlay = () => {
      if (loading) {
        if (pipeline.ctx.components.loading) {
          return pipeline.ctx.components.loading;
        }
        return (
          <LoadingLayer>
            <Loader />
          </LoadingLayer>
        );
      }
      return null;
    };
    pipeline.appendTableProps('overlayRenderer', renderOverlay);
    return pipeline;
  };
}
