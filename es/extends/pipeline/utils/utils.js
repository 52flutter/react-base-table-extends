function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import cx from 'classnames';

function composeEventHandler(handler1, handler2) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // 先执行原有的事件回调函数
    handler1(args);
    handler2(args); // 事件回调函数没有返回值，故这里不进行 return
  };
}
/** 合并两个 cellProps（单元格属性）对象，返回一个合并后的全新对象。
 *
 * mergeCellProps 会按照以下规则来合并两个对象：
 * * 对于 数字、字符串、布尔值类型的字段，extra 中的字段值将直接覆盖 base 中的字段值（className 是个特例，会进行字符串拼接）
 * * 对于函数/方法类型的字段（对应单元格的事件回调函数），mergeCellProps 将生成一个新的函数，新函数将按序调用 base 和 extra 中的方法
 * * 对于普通对象类型的字段（对应单元格的样式），mergeCellProps 将合并两个对象
 * */


export function mergeCellProps(base, extra) {
  if (base == null) {
    return extra;
  }

  if (extra == null) {
    return base;
  }

  var result = Object.assign({}, base);

  for (var _i = 0, _Object$keys = Object.keys(extra); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var value = extra[key];

    var type = _typeof(value);

    if (value === null) {
      // value=null 时 覆盖原来的值
      result[key] = null;
    } else if (value === undefined) {// value=undefined 时 保留原来的值
    } else if (type === 'number' || type === 'string' || type === 'boolean') {
      if (key === 'className') {
        result[key] = cx(result[key], value);
      } else {
        result[key] = value;
      }
    } else if (type === 'function') {
      var prev = result[key];

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
export function isLeafNode(node) {
  return node.children == null || node.children.length === 0;
}
/** 遍历所有节点，并将节点收集到一个数组中.
 * order 参数可用于指定遍历规则：
 * * `pre` 前序遍历 （默认）
 * * `post` 后续遍历
 * * `leaf-only` 忽略内部节点，只收集叶子节点
 * */

export function collectNodes(nodes) {
  var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pre';
  var result = [];
  dfs(nodes);
  return result;

  function dfs(nodes) {
    if (nodes == null) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(nodes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;

        if (isLeafNode(node)) {
          result.push(node);
        } else {
          if (order === 'pre') {
            result.push(node);
            dfs(node.children);
          } else if (order === 'post') {
            dfs(node.children);
            result.push(node);
          } else {
            dfs(node.children);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
}
/** 对树状结构的数据进行排序.
 * layeredSort 是一个递归的过程，针对树上的每一个父节点，该函数都会重新对其子节点数组（children) 进行排序.
 * */

export function layeredSort(array, compare) {
  return dfs(array);

  function dfs(rows) {
    if (!Array.isArray(array)) {
      return array;
    }

    return rows.map(function (row) {
      if (isLeafNode(row)) {
        return row;
      }

      return _objectSpread(_objectSpread({}, row), {}, {
        children: dfs(row.children)
      });
    }).sort(compare);
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

export function smartCompare(x, y) {
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
    var len = Math.min(x.length, y.length);

    for (var i = 0; i < len; i++) {
      var cmp = smartCompare(x[i], y[i]);

      if (cmp !== 0) {
        return cmp;
      }
    } // 数组长度不等时，元素少的字段放在前面


    return x.length - y.length;
  } // 对于不认识的数据类型，返回 0


  return 0;
}
export function makeRecursiveMapper(fn) {
  return function (tree) {
    return dfs(tree, 0, []).result;

    function dfs(nodes, parentStartIndex, path) {
      var flatCount = 0;
      var result = [];

      var _iterator2 = _createForOfIteratorHelper(nodes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;
          path.push(node);
          var startIndex = parentStartIndex + flatCount;
          var subResult = void 0;

          if (isLeafNode(node)) {
            subResult = fn(node, {
              startIndex: startIndex,
              endIndex: startIndex + 1,
              path: path.slice(),
              isLeaf: true
            });
            flatCount += 1;
          } else {
            var dfsResult = dfs(node.children, startIndex, path);
            subResult = fn(_objectSpread(_objectSpread({}, node), {}, {
              children: dfsResult.result
            }), {
              startIndex: startIndex,
              endIndex: startIndex + dfsResult.flatCount,
              path: path.slice(),
              isLeaf: false
            });
            flatCount += dfsResult.flatCount;
          }

          if (Array.isArray(subResult)) {
            result.push.apply(result, _toConsumableArray(subResult));
          } else if (subResult != null) {
            result.push(subResult);
          }

          path.pop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return {
        result: result,
        flatCount: flatCount
      };
    }
  };
}
export function always(value) {
  return function () {
    return value;
  };
}
export function safeGetRowKey(primaryKey, record, rowIndex) {
  var key;

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
export var arrayUtils = {
  diff: function diff(arr1, arr2) {
    var set = new Set(arr2);
    return arr1.filter(function (x) {
      return !set.has(x);
    });
  },
  merge: function merge(arr1, arr2) {
    var set = new Set(arr1);
    return arr1.concat(arr2.filter(function (x) {
      return !set.has(x);
    }));
  }
};
export function safeGetValue(column, record, rowIndex) {
  if (column.getValue) {
    return column.getValue(record, rowIndex);
  }

  return record[(column === null || column === void 0 ? void 0 : column.dataKey) || ''] || record[column.key];
}
export function flatMap(array, callback) {
  var result = [];
  array.forEach(function (value, index) {
    result.push.apply(result, _toConsumableArray(callback(value, index, array)));
  });
  return result;
}
export function safeRender(column, args) {
  var rowData = args.rowData,
      rowIndex = args.rowIndex;
  var value = safeGetValue(column, rowData, rowIndex);

  if (column.cellRenderer && typeof column.cellRenderer === 'function') {
    return column.cellRenderer(args);
  }

  if (column.render) {
    return column.render(value, rowData, rowIndex);
  }

  return value;
}
export function safeHeaderRender(column, args) {
  var value = column.title;

  if (column.headerRenderer && typeof column.headerRenderer === 'function') {
    return column.headerRenderer(args);
  }

  return value;
}