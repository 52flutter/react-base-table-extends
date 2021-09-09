// @ts-nocheck
import React from 'react';
export const generateColumns = (count = 10, prefix = 'column-', props = {}) =>
  new Array(count).fill(0).map((column, columnIndex) =>
    columnIndex === 3 || columnIndex === 4 || columnIndex === 5
      ? {
          ...props,
          key: `${prefix}${columnIndex}`,
          dataKey: `${prefix}${columnIndex}`,
          title: `Column ${columnIndex}`,
          width: 150,
          // 列宽拖动
          resizable: true,

          // 表头筛选 内部支持 number select string datetime ,扩展通过registedTableHeadFilter方法注册
          filterType: 'string',
          frozen: 'left',
          // getValue:()=>{
          //   return "222"
          // },
          features: {
            sortable: true,
            tips: true,
            autoRowSpan: true,
          },
        }
      : {
          ...props,
          key: `${prefix}${columnIndex}`,
          dataKey: `${prefix}${columnIndex}`,
          title: `Column ${columnIndex}`,
          width: 150,
          resizable: true,
          features: { tips: true },
          // cellRenderer: ({ cellData, rowData }) => {
          //   return <div style={{ color: 'red' }}>{cellData}1111</div>;
          // },

          // sortable: columnIndex === 1,
        },
  );

export const generateData = (
  columns: any,
  count = 200,
  prefix = 'row-',
  startIndex = 0,
) =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData: any, column: any, columnIndex: any) => {
        let index = columnIndex;
        // if(index===2 || index===3){
        //     index=2;
        // }
        let _rowIndex = rowIndex + startIndex;
        if (_rowIndex === 1 || _rowIndex === 2 || _rowIndex === 3) {
          _rowIndex = 1;
        }
        if (_rowIndex >= 7 && _rowIndex <= 17) {
          _rowIndex = 9;
        }

        // if (_rowIndex >= count - 4) {
        //   _rowIndex = count - 4;
        // }
        rowData[column.dataKey] = `Row ${_rowIndex} - Col ${index}`;
        // rowData.groupTitle=`Row ${_rowIndex} `
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      },
    );
  });

export function unflatten(
  array,
  rootId = null,
  dataKey = 'id',
  parentKey = 'parentId',
) {
  const tree = [];
  const childrenMap = {};

  const length = array.length;
  for (let i = 0; i < length; i++) {
    const item = { ...array[i] };
    const id = item[dataKey];
    const parentId = item[parentKey];

    if (Array.isArray(item.children)) {
      childrenMap[id] = item.children.concat(childrenMap[id] || []);
    } else if (!childrenMap[id]) {
      childrenMap[id] = [];
    }
    item.children = childrenMap[id];

    if (parentId !== undefined && parentId !== rootId) {
      if (!childrenMap[parentId]) childrenMap[parentId] = [];
      childrenMap[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}
const expandColumnKey = 'column-0';
export const getTreeData = columns => {
  const data = generateData(columns, 200);
  for (let i = 0; i < 200; i++) {
    data.push({
      ...data[0],
      id: `${data[0].id}-sub-${i}`,
      parentId: data[0].id,
      [expandColumnKey]: `Sub ${i}`,
    });
    data.push({
      ...data[2],
      id: `${data[2].id}-sub-${i}`,
      parentId: data[2].id,
      [expandColumnKey]: `Sub ${i}`,
    });
    data.push({
      ...data[2],
      id: `${data[2].id}-sub-sub-${i}`,
      parentId: `${data[2].id}-sub-${i}`,
      [expandColumnKey]: `Sub-Sub ${i}`,
    });
  }

  const treeData = unflatten(data);
  return treeData;
};
