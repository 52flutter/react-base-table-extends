function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import cx from 'classnames';
import React from 'react';
import { ExpansionCell, icons, InlineFlexCell } from '../utils/common-view';
import { isLeafNode as standardIsLeafNode, safeRender } from '../utils/utils';
export var treeMetaSymbol = Symbol('treeMetaSymbol');
export function treeMode() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function treeModeStep(pipeline) {
    var _ref, _ref2, _opts$openKeys, _opts$isLeafNode, _opts$clickArea, _opts$treeMetaKey, _opts$iconIndent, _opts$iconGap, _opts$indentSize;

    var stateKey = 'treeMode';
    var ctx = pipeline.ctx;
    var primaryKey = pipeline.ensurePrimaryKey('treeMode');

    if (typeof primaryKey !== 'string') {
      throw new Error('treeMode 仅支持字符串作为 primaryKey');
    }

    var openKeys = (_ref = (_ref2 = (_opts$openKeys = opts.openKeys) !== null && _opts$openKeys !== void 0 ? _opts$openKeys : pipeline.getStateAtKey(stateKey)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultOpenKeys) !== null && _ref !== void 0 ? _ref : [];
    var openKeySet = new Set(openKeys);

    var onChangeOpenKeys = function onChangeOpenKeys(nextKeys, key, action) {
      var _opts$onChangeOpenKey;

      (_opts$onChangeOpenKey = opts.onChangeOpenKeys) === null || _opts$onChangeOpenKey === void 0 ? void 0 : _opts$onChangeOpenKey.call(opts, nextKeys, key, action);
      pipeline.setStateAtKey(stateKey, nextKeys, {
        key: key,
        action: action
      });
    };

    var toggle = function toggle(rowKey) {
      var expanded = openKeySet.has(rowKey);

      if (expanded) {
        onChangeOpenKeys(openKeys.filter(function (key) {
          return key !== rowKey;
        }), rowKey, 'collapse');
      } else {
        onChangeOpenKeys([].concat(_toConsumableArray(openKeys), [rowKey]), rowKey, 'expand');
      }
    };

    var isLeafNode = (_opts$isLeafNode = opts.isLeafNode) !== null && _opts$isLeafNode !== void 0 ? _opts$isLeafNode : standardIsLeafNode;
    var clickArea = (_opts$clickArea = opts.clickArea) !== null && _opts$clickArea !== void 0 ? _opts$clickArea : 'cell';
    var treeMetaKey = (_opts$treeMetaKey = opts.treeMetaKey) !== null && _opts$treeMetaKey !== void 0 ? _opts$treeMetaKey : treeMetaSymbol;
    var stopClickEventPropagation = Boolean(opts.stopClickEventPropagation); // indents

    var iconWidth = ctx.indents.iconWidth;
    var iconIndent = (_opts$iconIndent = opts.iconIndent) !== null && _opts$iconIndent !== void 0 ? _opts$iconIndent : ctx.indents.iconIndent;
    var iconGap = (_opts$iconGap = opts.iconGap) !== null && _opts$iconGap !== void 0 ? _opts$iconGap : ctx.indents.iconGap;
    var indentSize = (_opts$indentSize = opts.indentSize) !== null && _opts$indentSize !== void 0 ? _opts$indentSize : ctx.indents.indentSize;

    var _pipeline$getColumns = pipeline.getColumns(),
        _pipeline$getColumns2 = _toArray(_pipeline$getColumns),
        firstCol = _pipeline$getColumns2[0],
        others = _pipeline$getColumns2.slice(1);

    pipeline.appendTableProps('cellProps', function (args) {
      var rowData = args.rowData,
          column = args.column;

      if (column.key === firstCol.key) {
        if (rowData[treeMetaKey] == null) {
          // 没有 treeMeta 信息的话，就返回原先的 cellProps
          return null;
        }

        var _rowData$treeMetaKey = rowData[treeMetaKey],
            isLeaf = _rowData$treeMetaKey.isLeaf,
            rowKey = _rowData$treeMetaKey.rowKey;

        if (isLeaf) {
          return null;
        }

        return {
          onClick: function onClick(e) {
            if (stopClickEventPropagation) {
              e.stopPropagation();
            }

            toggle(rowKey);
          },
          style: {
            cursor: 'pointer'
          }
        };
      }

      return null;
    });
    return pipeline.mapDataSource(processDataSource).mapColumns(processColumns);

    function processDataSource(input) {
      var result = [];
      dfs(input, 0);

      function dfs(nodes, depth) {
        if (nodes == null) {
          return;
        }

        var _iterator = _createForOfIteratorHelper(nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            var rowKey = node[primaryKey];
            var expanded = openKeySet.has(rowKey);
            var isLeaf = isLeafNode(node, {
              depth: depth,
              expanded: expanded,
              rowKey: rowKey
            });
            var treeMeta = {
              depth: depth,
              isLeaf: isLeaf,
              expanded: expanded,
              rowKey: rowKey
            };
            result.push(_objectSpread(_defineProperty({}, treeMetaKey, treeMeta), node));

            if (!isLeaf && expanded) {
              dfs(node.children, depth + 1);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return result;
    }

    function processColumns(columns) {
      if (columns.length === 0) {
        return columns;
      }

      var _columns = _toArray(columns),
          firstCol = _columns[0],
          others = _columns.slice(1);

      var cellRenderer = function cellRenderer(args) {
        var record = args.rowData;
        var content = safeRender(firstCol, args);

        if (record[treeMetaKey] == null) {
          // 没有 treeMeta 信息的话，就返回原先的渲染结果
          return content;
        }

        var _record$treeMetaKey = record[treeMetaKey],
            rowKey = _record$treeMetaKey.rowKey,
            depth = _record$treeMetaKey.depth,
            isLeaf = _record$treeMetaKey.isLeaf,
            expanded = _record$treeMetaKey.expanded;
        var indent = iconIndent + depth * indentSize;

        if (isLeaf) {
          return /*#__PURE__*/React.createElement(InlineFlexCell, {
            className: "expansion-cell leaf"
          }, /*#__PURE__*/React.createElement("span", {
            style: {
              marginLeft: indent + iconWidth + iconGap
            }
          }, content));
        }

        var onClick = function onClick(e) {
          if (stopClickEventPropagation) {
            e.stopPropagation();
          }

          toggle(rowKey);
        };

        var expandCls = expanded ? 'expanded' : 'collapsed';
        return /*#__PURE__*/React.createElement(ExpansionCell, {
          className: cx('expansion-cell', expandCls),
          style: {
            cursor: clickArea === 'content' ? 'pointer' : undefined
          },
          onClick: clickArea === 'content' ? onClick : undefined
        }, /*#__PURE__*/React.createElement(icons.CaretRight, {
          className: cx('expansion-icon', expandCls),
          style: {
            cursor: clickArea === 'icon' ? 'pointer' : undefined,
            marginLeft: indent,
            marginRight: iconGap
          },
          onClick: clickArea === 'icon' ? onClick : undefined
        }), content);
      };

      return [_objectSpread(_objectSpread({}, firstCol), {}, {
        name: /*#__PURE__*/React.createElement("span", {
          style: {
            marginLeft: iconIndent + iconWidth + iconGap
          }
        }, firstCol.name),
        cellRenderer: cellRenderer // getCellProps: clickArea === 'cell' ? getCellProps : firstCol.getCellProps,

      })].concat(_toConsumableArray(others));
    }
  };
}