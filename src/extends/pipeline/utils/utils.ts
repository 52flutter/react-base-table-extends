import { getValue } from '../../../base';
import cx from 'classnames';
import React from 'react';
import isEqual from 'react-fast-compare';
import { ArtColumn } from '../interfaces';

export interface AbstractTreeNode {
  children?: AbstractTreeNode[];
}

type CellProps = any;
function composeEventHandler(handler1: Function, handler2: Function) {
  return (...args: any) => {
    // 先执行原有的事件回调函数
    handler1(args);
    handler2(args);
    // 事件回调函数没有返回值，故这里不进行 return
  };
}

/** 合并两个 cellProps（单元格属性）对象，返回一个合并后的全新对象。
 *
 * mergeCellProps 会按照以下规则来合并两个对象：
 * * 对于 数字、字符串、布尔值类型的字段，extra 中的字段值将直接覆盖 base 中的字段值（className 是个特例，会进行字符串拼接）
 * * 对于函数/方法类型的字段（对应单元格的事件回调函数），mergeCellProps 将生成一个新的函数，新函数将按序调用 base 和 extra 中的方法
 * * 对于普通对象类型的字段（对应单元格的样式），mergeCellProps 将合并两个对象
 * */
export function mergeCellProps(base: CellProps, extra: CellProps): CellProps {
  if (base == null) {
    return extra;
  }
  if (extra == null) {
    return base;
  }

  const result: any = Object.assign({}, base);

  for (const key of Object.keys(extra)) {
    const value = (extra as any)[key];
    const type = typeof value;

    if (value === null) {
      // value=null 时 覆盖原来的值
      result[key] = null;
    } else if (value === undefined) {
      // value=undefined 时 保留原来的值
    } else if (type === 'number' || type === 'string' || type === 'boolean') {
      if (key === 'className') {
        result[key] = cx(result[key], value);
      } else {
        result[key] = value;
      }
    } else if (type === 'function') {
      const prev = result[key];
      if (prev == null) {
        result[key] = value;
      } else {
        result[key] = composeEventHandler(prev, value);
      }
    } else if (type === 'object') {
      result[key] = Object.assign({}, result[key], value);
    }
  }

  return result;
}

export function isLeafNode(node: AbstractTreeNode) {
  return node.children == null || node.children.length === 0;
}

/** 遍历所有节点，并将节点收集到一个数组中.
 * order 参数可用于指定遍历规则：
 * * `pre` 前序遍历 （默认）
 * * `post` 后续遍历
 * * `leaf-only` 忽略内部节点，只收集叶子节点
 * */
export function collectNodes<T extends AbstractTreeNode>(
  nodes: T[],
  order: 'pre' | 'post' | 'leaf-only' = 'pre',
) {
  const result: T[] = [];
  dfs(nodes);
  return result;

  function dfs(nodes: T[]) {
    if (nodes == null) {
      return;
    }
    for (const node of nodes) {
      if (isLeafNode(node)) {
        result.push(node);
      } else {
        if (order === 'pre') {
          result.push(node);
          dfs(node.children as T[]);
        } else if (order === 'post') {
          dfs(node.children as T[]);
          result.push(node);
        } else {
          dfs(node.children as T[]);
        }
      }
    }
  }
}

/** 对树状结构的数据进行排序.
 * layeredSort 是一个递归的过程，针对树上的每一个父节点，该函数都会重新对其子节点数组（children) 进行排序.
 * */
export function layeredSort<T extends AbstractTreeNode>(
  array: T[],
  compare: (x: T, y: T) => number,
): T[] {
  return dfs(array);

  function dfs(rows: T[]): T[] {
    if (!Array.isArray(array)) {
      return array;
    }
    return rows
      .map((row) => {
        if (isLeafNode(row)) {
          return row;
        }
        return { ...row, children: dfs(row.children as T[]) };
      })
      .sort(compare);
  }
}

/** 比较函数，支持字符串、数字、数组和 null。
 * * 对于字符串将比较两者的字典序；
 * * 对数字将比较两者大小；
 * * null 值在比较时总是小于另一个值；
 * * 对于数组来说，将逐个比较数组中的元素，第一个不相等的比较结果将作为整个数组的比较结果
 *
 * 数组的比较可参考 python 中的元祖比较：
 * https://stackoverflow.com/questions/5292303/how-does-tuple-comparison-work-in-python */
export function smartCompare(x: any, y: any): number {
  // 将 null 排在最后面
  if (x == null) {
    return 1;
  }
  if (y == null) {
    return -1;
  }

  if (typeof x === 'number' && typeof y === 'number') {
    return x - y;
  }

  if (typeof x === 'string' && typeof y === 'string') {
    // 字符串使用 默认的字典序
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  }
  if (Array.isArray(x) && Array.isArray(y)) {
    const len = Math.min(x.length, y.length);
    for (let i = 0; i < len; i++) {
      const cmp = smartCompare(x[i], y[i]);
      if (cmp !== 0) {
        return cmp;
      }
    }

    // 数组长度不等时，元素少的字段放在前面
    return x.length - y.length;
  }

  // 对于不认识的数据类型，返回 0
  return 0;
}

export type RecursiveFlatMapInfo<T> = {
  startIndex: number;
  endIndex: number;
  path: T[];
  isLeaf: boolean;
};

export function makeRecursiveMapper<T extends AbstractTreeNode>(
  fn: (node: T, info: RecursiveFlatMapInfo<T>) => null | T | T[],
) {
  return (tree: T[]) => {
    return dfs(tree, 0, []).result;

    function dfs(
      nodes: T[],
      parentStartIndex: number,
      path: T[],
    ): { flatCount: number; result: T[] } {
      let flatCount = 0;
      const result: T[] = [];

      for (const node of nodes) {
        path.push(node);

        const startIndex = parentStartIndex + flatCount;

        let subResult;
        if (isLeafNode(node)) {
          subResult = fn(node, {
            startIndex,
            endIndex: startIndex + 1,
            path: path.slice(),
            isLeaf: true,
          });
          flatCount += 1;
        } else {
          const dfsResult = dfs(node.children as T[], startIndex, path);
          subResult = fn(
            { ...node, children: dfsResult.result },
            {
              startIndex,
              endIndex: startIndex + dfsResult.flatCount,
              path: path.slice(),
              isLeaf: false,
            },
          );
          flatCount += dfsResult.flatCount;
        }

        if (Array.isArray(subResult)) {
          result.push(...subResult);
        } else if (subResult != null) {
          result.push(subResult);
        }

        path.pop();
      }

      return { result, flatCount };
    }
  };
}

export function always<T>(value: T) {
  return (...args: any[]) => value;
}

export function safeGetRowKey(
  primaryKey: React.Key | ((record: any) => string),
  record: any,
  rowIndex: number,
): string {
  let key;
  if (typeof primaryKey === 'string') {
    key = record[primaryKey];
  } else if (typeof primaryKey === 'function') {
    key = primaryKey(record);
  }
  if (key == null) {
    key = String(rowIndex);
  }
  return key;
}

export const arrayUtils = {
  diff(arr1: string[], arr2: Iterable<string>) {
    const set = new Set(arr2);
    return arr1.filter((x) => !set.has(x));
  },
  merge(arr1: string[], arr2: string[]) {
    const set = new Set(arr1);
    return arr1.concat(arr2.filter((x) => !set.has(x)));
  },
} as const;

export function safeGetValue(column: ArtColumn, record: any, rowIndex: number) {
  if (column.getValue) {
    return column.getValue(record, rowIndex);
  }
  return getValue(
    record,
    column?.dataKey || column?.key?.toString() || '',
    undefined,
  );
  // return record[column?.dataKey || ''] || record[column.key];
}

export function flatMap<T, U>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => U[],
): U[] {
  const result: U[] = [];

  array.forEach((value, index) => {
    result.push(...callback(value, index, array));
  });

  return result;
}

export function safeRender(
  column: ArtColumn,
  args: {
    cellData: any;
    columns: ArtColumn[];
    column: ArtColumn;
    columnIndex: number;
    rowData: any;
    rowIndex: number;
    container: any;
    isScrolling?: boolean;
  },
) {
  const { rowData, rowIndex } = args;
  const value = safeGetValue(column, rowData, rowIndex);
  if (column.cellRenderer && typeof column.cellRenderer === 'function') {
    return column.cellRenderer(args);
  }
  if (column.render) {
    return column.render(value, rowData, rowIndex);
  }
  return value;
}
export function safeHeaderRender(
  column: ArtColumn,
  args: {
    columns: ArtColumn[];
    column: ArtColumn;
    columnIndex: number;
    headerIndex: number;
    container: any;
  },
) {
  const value = column.title;
  if (column.headerRenderer && typeof column.headerRenderer === 'function') {
    return column.headerRenderer(args);
  }

  return value;
}

type DeepIsEqualType<TDeps = React.DependencyList> = (
  newDeps: TDeps,
  oldDeps: TDeps,
) => boolean;

/** 解决数组对象等依赖 React默认useEffect 地址发现变化导致依赖变化 重复执行的问题  */
export function useDeepEqualEffect<TDeps = React.DependencyList>(
  effect: React.EffectCallback,
  deps: TDeps,
  compare: DeepIsEqualType<TDeps> = isEqual,
) {
  const oldDeps = React.useRef<TDeps | undefined>(undefined);
  if (!oldDeps.current || !compare(deps, oldDeps.current as TDeps)) {
    oldDeps.current = deps;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(effect, [oldDeps.current]);
}

export const requestAnimationFramePolyfill = (() => {
  const _window = window as any;
  const raf =
    _window.requestAnimationFrame ||
    _window.mozRequestAnimationFrame ||
    _window.webkitRequestAnimationFrame ||
    ((fn: any) => {
      return _window.setTimeout(fn, 20);
    });
  return (fn: any) => raf(fn);
})();

export function scrollTopAnimation(
  target: any,
  nextTop: number,
  animation = true,
  callback?: (top: number) => void,
) {
  if (!target) {
    return;
  }
  let top = target?._scroll?.scrollTop || 0;
  const step = () => {
    target.scrollToTop(top > nextTop ? nextTop : top);
    if (top <= nextTop) {
      top += 2;
      requestAnimationFramePolyfill(step);
    }
    callback?.(nextTop);
  };
  if (animation) {
    requestAnimationFramePolyfill(step);
  } else {
    target.scrollToTop(nextTop);
    callback?.(nextTop);
  }
}

/** 获取一棵树的高度/深度 (0-based) */
export function getTreeDepth(nodes: AbstractTreeNode[]) {
  let maxDepth = -1;
  dfs(nodes, 0);
  return maxDepth;

  function dfs(columns: AbstractTreeNode[], depth: number) {
    for (const column of columns) {
      if (isLeafNode(column)) {
        maxDepth = Math.max(maxDepth, depth);
      } else {
        dfs(column.children || [], depth + 1);
      }
    }
  }
}

/**
 * 树形结构展开成扁平数组
 *
 * @export
 * @template T
 * @param {T[]} data 原始的树形数据
 * @param {string} [children='children'] children的字段名称
 * @returns {T[]}
 */
export function flatten<T>(data: T[], children = 'children'): T[] {
  if (!data) {
    return [];
  }
  return data.reduce(
    (arr: T[], item: any) =>
      arr.concat([item], flatten((item[children] || []) as any, children)),
    [],
  );
}
