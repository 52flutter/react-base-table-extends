import React from 'react';
import { ArtColumn } from '../interfaces';
import { TablePipeline } from '../pipeline';
import {
  collectNodes,
  makeRecursiveMapper,
  RecursiveFlatMapInfo,
} from '../utils/utils';

type ITreeItem = ArtColumn;

const getAllChildren = (item: ArtColumn) => {
  let children: ArtColumn[] = [];
  function deepChild(node: ArtColumn) {
    if (node.hidden !== true) {
      children.push(node);
    }
    if (node.children) {
      node.children.forEach(p => {
        deepChild(p);
      });
    }
  }
  item?.children?.forEach(p => {
    deepChild(p);
  });

  return children;
};

const getWidth = (leafColumns: ITreeItem[], item: ArtColumn, cells: any[]) => {
  const _column = leafColumns.filter(p => p.key === item.key);
  if (_column?.length > 0) {
    return _column[0].width;
  }

  const children = getAllChildren(item);
  let width = 0;
  children.forEach(c => {
    if (c.hidden !== true) {
      const columnIndex = leafColumns.findIndex(p => p.key === c.key);
      if (columnIndex >= 0) {
        if (cells[columnIndex]?.props?.style?.width)
          if (cells[columnIndex]?.props?.style?.width)
            width += cells[columnIndex].props.style.width;
      }
    }
  });

  return width;
};

const geLeafNode = (leafColumns: ArtColumn[], item: ArtColumn) => {
  // 如果参数本身就是叶子节点
  const _column = leafColumns.filter(p => p.key === item.key);
  if (_column?.length > 0) {
    return _column;
  }

  const children = getAllChildren(item);
  let resData = [];
  children.forEach(c => {
    if (c.hidden !== true) {
      const columnIndex = leafColumns.findIndex(p => p.key === c.key);
      if (columnIndex >= 0) {
        resData.push(c);
      }
    }
  });

  return children;
};

const getMinWidth = (columns: ArtColumn[], item: ArtColumn, cells: any[]) => {
  const _column = columns.filter(p => p.key === item.key);
  if (_column?.length > 0) {
    return _column[0].minWidth;
  }
  const children = getAllChildren(item);
  let width = 0;
  children.forEach(c => {
    if (c.hidden !== true) {
      const columnIndex = columns.findIndex(p => p.key === c.key);
      if (columnIndex >= 0) {
        if (cells[columnIndex]?.props?.style.minWidth) {
          width += cells[columnIndex].props.style.minWidth;
        }
      }
    }
  });

  return width;
};

const isFixed = (style: any) => {
  // fixed 等于true的时候是不铺满的按固定宽度来
  if (style.flex) {
    const flexStr = style.flex;
    const flexArr = flexStr.split(' ');
    const flexNum = Number(flexArr[0]);
    if (flexNum !== 0 && flexNum.toString() !== 'NaN') {
      return false;
    }
    return true;
  }
  return true;
};

export class TreeUtils {
  static deepChild(
    node: ITreeItem,
    deep = 0,
    callBack?: (item: ITreeItem, level: number) => void,
  ) {
    callBack && callBack(node, deep);
    if (node && node.children) {
      node.children.forEach(p => {
        TreeUtils.deepChild(p as any, deep + 1, callBack);
      });
    }
  }
  static getTreeNodeLevel<T extends ITreeItem>(root: T[], item: T) {
    let max = 0;
    root.map(p => {
      TreeUtils.deepChild(p, 0, (node, deep) => {
        if (node.key === item.key) {
          max = deep;
        }
      });
    });
    return max;
  }
  static getTreeMaxLevel<T extends ITreeItem>(root: T[]) {
    let max = 0;
    root.map(p => {
      TreeUtils.deepChild(p, 0, (node, deep) => {
        if (max < deep) {
          max = deep;
        }
      });
    });
    return max;
  }
  static getTreeNodeByLevel<T extends ITreeItem>(root: T[], level: number) {
    let res: T[] = [];
    root.map(p => {
      TreeUtils.deepChild(p, 0, (node: any, deep) => {
        if (level === deep && node.hidden !== true) {
          res.push(node as T);
        }
      });
    });
    return res;
  }
}

export function groupHeader(opts: {
  headHeight?: number;
  cellPadding?: number;
}) {
  return (pipeline: TablePipeline) => {
    const columns = pipeline.getColumns();
    if (columns.find(p => p.children !== null && p.children !== undefined)) {
      let flatColumns = collectNodes(columns);
      const padding = opts?.cellPadding || 7.5;
      let colTreeInfo: Record<string, RecursiveFlatMapInfo<ArtColumn>> = {};
      pipeline.mapColumns(
        makeRecursiveMapper((col, args) => {
          // const range = { start: startIndex, end: endIndex };
          colTreeInfo[col.key] = args;
          return {
            ...col,
          };
        }),
      );
      let maxLevel = 0;
      let rootColumns: ArtColumn[] = [];
      Object.keys(colTreeInfo).map(key => {
        const level = colTreeInfo[key].path.length;
        if (level > maxLevel) {
          maxLevel = level;
        }
        if (level === 1) {
          rootColumns.push(flatColumns.find(p => p.key === key));
        }
      });
      const headerHead = opts?.headHeight
        ? opts.headHeight
        : pipeline.getHeaderHeight();
      const headHeight: number = Array.isArray(headerHead)
        ? headerHead[0]
        : headerHead;

      const headerRenderer = ({
        cells,
        columns,
        headerIndex,
      }: {
        cells: any;
        columns: ArtColumn[];
        headerIndex: number;
      }) => {
        if (maxLevel === 0) {
          return cells;
        }
        const groupCells: any[] = [];

        const renderEndMap: Record<string, string | boolean> = {};
        // console.log('cells', cells);

        const renderTreeLevel = (
          tree: ITreeItem,
          level: number,
          maxLevel: number,
          columnIndex: number,
          headerIndex: number,
        ) => {
          const column = columns[columnIndex];
          let columnLevel = TreeUtils.getTreeNodeLevel([tree], column);

          if (columnLevel < headerIndex) {
            if (renderEndMap[column.key.toString() + headerIndex]) {
              return;
            }
            renderEndMap[column.key.toString() + headerIndex] = true;

            const width = getWidth(columns, column, cells);

            //补充固定的宽度 否则会错位
            const leafNodes = geLeafNode(columns, column);
            const paddingStyle = {
              borderLeft: `${leafNodes.length}px solid transparent`,
              padding: `0 ${leafNodes.length * padding}px`,
            };

            groupCells.push(
              <div
                key={column.key}
                className="BaseTable__header-cell"
                style={{
                  ...cells[columnIndex].props.style,
                  width: width,
                  minWidth: getMinWidth(flatColumns, column, cells),
                  height: 0,
                  flexGrow: !isFixed(cells[columnIndex].props.style)
                    ? width
                    : 0,
                  display: 'flex',
                  justifyContent: 'center',
                  ...paddingStyle,
                }}
              />,
            );
            return;
          }

          // 寻找对应层次的节点
          const nodes = TreeUtils.getTreeNodeByLevel([tree], headerIndex);
          nodes.map(item => {
            if (renderEndMap[item.key.toString() + headerIndex]) {
              return;
            }
            // let treeMaxLevel = TreeUtils.getTreeMaxLevel([item]);

            if (item.children?.length) {
              const width = getWidth(columns, item, cells);
              //补充固定的宽度 左右边距 边框等 否则会错位
              const leafNodes = geLeafNode(columns, item);
              // console.log('leafNodes', leafNodes, item);
              const paddingStyle = {
                borderLeft: `${leafNodes.length}px solid transparent`,
                padding: `0 ${leafNodes.length * padding}px`,
              };
              groupCells.push(
                <div
                  key={item.key}
                  className="BaseTable__header-cell"
                  style={{
                    ...cells[columnIndex].props.style,
                    width: width,
                    minWidth: getMinWidth(columns, item, cells),
                    flexGrow: !isFixed(cells[columnIndex].props.style)
                      ? width
                      : 0,
                    display: 'flex',
                    justifyContent: 'center',

                    height: headHeight - 1,
                    lineHeight: `${headHeight - 1}px`,
                    ...paddingStyle,
                  }}
                >
                  {item.title}
                </div>,
              );
              renderEndMap[item.key.toString() + headerIndex] = true;
            } else {
              const realColumnIndex = columns.findIndex(
                (p: any) => p.key === item.key,
              );

              groupCells.push(
                React.cloneElement(cells[realColumnIndex], {
                  style: {
                    ...cells[realColumnIndex].props.style,
                    flexGrow: !isFixed(cells[realColumnIndex].props.style)
                      ? getWidth(columns, item, cells)
                      : cells[realColumnIndex].props.style.flexGrow,
                    marginTop: (maxLevel - level - 1) * headHeight,
                    lineHeight: `${(maxLevel - level) * headHeight}px`,
                    height: (maxLevel - level) * headHeight,
                  },
                }),
              );
              renderEndMap[item.key.toString() + headerIndex] = true;
            }
          });
        };

        columns.forEach((column: ArtColumn, columnIndex: number) => {
          if (column['__placeholder__']) {
            groupCells.push(cells[columnIndex]);
            return;
          }
          const root = colTreeInfo[column.key].path[0];
          const tree = root;
          let rootMaxLevel = colTreeInfo[column.key].path.length;
          renderTreeLevel(
            tree,
            headerIndex,
            maxLevel,
            columnIndex,
            headerIndex,
          );
        });
        return groupCells;
      };

      pipeline.appendTableProps('headerRenderer', headerRenderer);
      pipeline.appendTableProps(
        'headerHeight',
        Array.from(Array(maxLevel), (v, k) => headHeight),
      );
      pipeline.columns(collectNodes(columns, 'leaf-only'));
    }
    return pipeline;
  };
}
