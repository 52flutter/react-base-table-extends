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
  margin: 0;
  width: 100%;
  height: 100%;
`;

export function status({ loading }: { loading: boolean }) {
  return function setup(pipeline: TablePipeline) {
    const EmptyComponent =
      pipeline.ctx.components.Empty || (() => <Empty>Table is empty</Empty>);
    pipeline.appendTableProps('emptyRenderer', () => {
      if (loading) {
        return null;
      }
      return <EmptyComponent />;
    });

    const LoadingComponent = pipeline.ctx.components.loading
      ? pipeline.ctx.components.loading
      : () => {
          return (
            <LoadingLayer>
              <Loader />
            </LoadingLayer>
          );
        };

    const renderOverlay = () => {
      if (loading) {
        return <LoadingComponent />;
      }
      return null;
    };

    pipeline.appendTableProps('overlayRenderer', renderOverlay);

    return pipeline;
  };
}
