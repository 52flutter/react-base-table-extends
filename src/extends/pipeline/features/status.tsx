/*
 * @Author: renjie.yin
 * @Date: 2022-04-14 11:32:30
 * @LastEditors: renjie.yin
 * @LastEditTime: 2022-06-14 14:01:08
 * @Description:
 */
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
    pipeline.appendTableProps('emptyRenderer', (dddd: any) => {
      if (loading) {
        return null;
      }
      return (
        <div
          style={{ width: dddd.width, overflowX: 'auto', height: '100%' }}
          onScroll={dddd.onScroll}
        >
          <div style={{ width: dddd.totalColumnsWidth, height: '100%' }}>
            <div style={{ width: dddd.width, height: '100%' }}>
              <EmptyComponent />
            </div>
          </div>
        </div>
      );
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
