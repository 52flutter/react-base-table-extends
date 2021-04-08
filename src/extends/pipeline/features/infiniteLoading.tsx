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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface InfiniteLoadingOption<T = any> {
  onEndReachedThreshold?: number;
  onLoadData: (offset: number) => Promise<T[]>;
  footerHeight?: number;
}
export function infiniteLoading(option: InfiniteLoadingOption) {
  return function setup(pipeline: TablePipeline) {
    const stateKey = 'infiniteLoading';
    const loadingMore = pipeline.getStateAtKey(stateKey);
    const moreData = pipeline.getStateAtKey(stateKey + 'moreData');
    const renderFooter = () => {
      if (!loadingMore) return null;
      return (
        <Footer>
          <Loader />
        </Footer>
      );
    };
    const data = pipeline.getDataSource();
    const handleEndReached = async () => {
      if (loadingMore) {
        return;
      }
      pipeline.setStateAtKey(stateKey, true);

      try {
        const resData = await option.onLoadData(
          (data || []).length + (moreData || []).length,
        );

        pipeline.setStateAtKey(
          stateKey + 'moreData',
          (moreData || []).concat(resData || []),
        );
        pipeline.data(data.concat(resData || []));
      } catch (ex) {
        console.warn('load Data error', ex);
      }
      pipeline.setStateAtKey(stateKey, false);
    };
    pipeline.data(data.concat(moreData || []));
    pipeline.appendTableProps('onEndReached', handleEndReached);
    pipeline.appendTableProps('footerRenderer', renderFooter);
    pipeline.appendTableProps(
      'onEndReachedThreshold',
      option.onEndReachedThreshold || 300,
    );
    pipeline.appendTableProps(
      'footerHeight',
      loadingMore ? option.footerHeight || 50 : 0,
    );
    // pipeline.appendTableProps('', option.onEndReachedThreshold || 300);
    pipeline.appendTableProps('virtual', true);

    return pipeline;
  };
}
