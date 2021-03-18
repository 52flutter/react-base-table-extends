// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import {
  useTablePipeline,
  BaseTable,
  features,
} from 'react-base-table-extends';
import { MockTreeDataService } from './MockService';
import 'antd/dist/antd.compact.css';
import { Spin } from 'antd';
import './index.less';
import { generateColumns, generateData, getTreeData } from './utils';

export default function Index() {
  const [state, setState] = useState<any>({ isLoading: true, data: [] });
  const dataServiceRef = useRef<any>();

  useEffect(() => {
    dataServiceRef.current = new MockTreeDataService();

    dataServiceRef.current.loadRootNodeData().then((rootNodeData: any) => {
      setState({ data: [rootNodeData], isLoading: false });
    });
  }, []);

  function loadNodeDataByParentKey(parentKey) {
    setState(prev => ({ isLoading: true, data: prev.data }));
    dataServiceRef.current.loadNodeDataByParentKey(parentKey).then(newData => {
      setState(prev => {
        return {
          isLoading: false,
          data: prev.data.concat(newData),
        };
      });
    });
  }

  const [openKeys, onChangeOpenKeys] = useState([]);

  const pipeline: any = useTablePipeline()
    .input({
      data: state.data,
      columns: [
        { title: '名称', key: 'name', width: 180 },
        {
          key: 'a',
          dataKey: 'a',
          title: '目标收入',
          align: 'right',
          width: 180,
        },
        {
          key: 'b',
          dataKey: 'b',
          title: '实际收入',
          align: 'right',
          width: 180,
        },
        {
          key: 'd',
          dataKey: 'd',
          title: '重点商品收入',
          align: 'right',
          width: 180,
        },
        {
          key: 'lfl',
          dataKey: 'lfl',
          title: '收入月环比',
          align: 'right',
          width: 180,
        },
        {
          key: 'rate',
          title: '重点商品收入占比',
          dataKey: 'rate',
          align: 'right',
          width: 180,
        },
      ],
    })
    .primaryKey('key')
    .mapColumns(([firstCol, ...rest]) => [
      firstCol,
      // 重复几次 columns，看起来更加丰满
      ...rest,
    ])
    .use(features.buildTree('key', 'parentKey'))
    .use(
      features.treeMode({
        openKeys,

        onChangeOpenKeys(nextKeys, key, action) {
          if (state.isLoading) {
            return;
          }
          onChangeOpenKeys(nextKeys);

          const needLoadData = state.data.every(d => d.parentKey !== key);
          if (action === 'expand' && needLoadData) {
            // 如果当前展开了某一个节点，且该节点的子节点数据尚未加载，
            //  则调用 loadNodeDataByParentKey 加载更多数据
            loadNodeDataByParentKey(key);
          }
        },

        // 提供一个自定义的 isLeafNode 方法，使得表格为父节点正确渲染收拢/展开按钮
        isLeafNode(node) {
          return node.childCount === 0;
        },
      }),
    );

  const renderOverlay = () => {
    // console.log('renderOverlay');
    const { isLoading } = state;
    if (isLoading)
      return (
        <div className="BaseTable__overlay__loading">
          <Spin spinning={true} />
        </div>
      );

    return null;
  };

  return (
    <BaseTable
      {...pipeline.getProps()}
      width={1000}
      height={400}
      overlayRenderer={renderOverlay}
    />
  );
}
