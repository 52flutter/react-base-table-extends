import { TablePipeline } from '../pipeline';
import { flatMap } from '../utils/utils';

type WithChildren<T> = T & { children?: WithChildren<T>[] };

function _buildTree<
  ID extends string,
  PID extends string,
  T extends { [key in ID | PID]: string }
>(idProp: ID, parentIdProp: PID, items: T[]): WithChildren<T>[] {
  type Wrapper = {
    id: string;
    children: Wrapper[];
    item?: T | null;
    parent?: Wrapper | null;
  };

  const wrapperMap = new Map<string, Wrapper>();
  const ensure = (id: string) => {
    if (wrapperMap.has(id)) {
      return wrapperMap.get(id);
    }
    const wrapper: Wrapper = { id, parent: null, item: null, children: [] };
    wrapperMap.set(id, wrapper);
    return wrapper;
  };
  for (const item of items) {
    const parentWrapper = ensure(item[parentIdProp]);
    const itemWrapper = ensure(item[idProp]);
    if (itemWrapper && parentWrapper) {
      itemWrapper.parent = parentWrapper;
      parentWrapper.children.push(itemWrapper);
      itemWrapper.item = item;
    }
  }
  const topLevelWrappers = flatMap(
    Array.from(wrapperMap.values()).filter(wrapper => wrapper.parent == null),
    wrapper => wrapper.children,
  );

  return unwrapRecursively(topLevelWrappers);

  // todo 可能存在无线递归的情况
  function unwrapRecursively(wrapperArray: Wrapper[]) {
    const result: WithChildren<T>[] = [];
    for (const wrapper of wrapperArray) {
      if (wrapper.children.length === 0) {
        if (wrapper?.item) {
          result.push(wrapper?.item);
        }
      } else {
        result.push({
          ...(wrapper?.item || {}),
          children: unwrapRecursively(wrapper?.children),
        } as any);
      }
    }
    return result;
  }
}

export function buildTree(idProp: string, parentIdProp: string) {
  return (pipeline: TablePipeline) =>
    pipeline.mapDataSource(rows => _buildTree(idProp, parentIdProp, rows));
}
