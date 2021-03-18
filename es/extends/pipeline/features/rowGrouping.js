function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import cx from 'classnames';
import React from 'react';
import { ExpansionCell, icons, InlineFlexCell } from '../utils/common-view';
import { flatMap, isLeafNode, safeHeaderRender, safeRender } from '../utils/utils';
var groupingMetaSymbol = Symbol('row-grouping-meta');

function attachGroupingMeta(row) {
  return _objectSpread(_defineProperty({}, groupingMetaSymbol, {
    expandable: !isLeafNode(row)
  }), row);
}

function getGroupingMeta(row) {
  if (row[groupingMetaSymbol] == null) {
    return {
      isGroupHeader: false,
      expandable: false
    };
  }

  return {
    isGroupHeader: true,
    expandable: row[groupingMetaSymbol].expandable
  };
}

function rowGroupingRowPropsGetter(row) {
  if (getGroupingMeta(row).isGroupHeader) {
    return {
      className: 'alternative'
    };
  }

  return null;
}

export function rowGrouping() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (pipeline) {
    var _ref, _ref2, _opts$openKeys;

    var stateKey = 'rowGrouping';
    var indents = pipeline.ctx.indents;
    var textOffset = indents.iconIndent + indents.iconWidth + indents.iconGap;
    var primaryKey = pipeline.ensurePrimaryKey('rowGrouping');

    if (typeof primaryKey !== 'string') {
      throw new Error('rowGrouping 仅支持字符串作为 primaryKey');
    }

    var openKeys = (_ref = (_ref2 = (_opts$openKeys = opts.openKeys) !== null && _opts$openKeys !== void 0 ? _opts$openKeys : pipeline.getStateAtKey(stateKey)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultOpenAll ? pipeline.getDataSource().map(function (row) {
      return row[primaryKey];
    }) : opts.defaultOpenKeys) !== null && _ref !== void 0 ? _ref : [];
    var openKeySet = new Set(openKeys);

    var onChangeOpenKeys = function onChangeOpenKeys(nextKeys, key, action) {
      var _opts$onChangeOpenKey;

      (_opts$onChangeOpenKey = opts.onChangeOpenKeys) === null || _opts$onChangeOpenKey === void 0 ? void 0 : _opts$onChangeOpenKey.call(opts, nextKeys, key, action);
      pipeline.setStateAtKey(stateKey, nextKeys, {
        key: key,
        action: action
      });
    };

    return pipeline.mapDataSource(processDataSource).mapColumns(processColumns).appendRowPropsGetter(rowGroupingRowPropsGetter);

    function processDataSource(input) {
      return flatMap(input, function (row) {
        var result = [attachGroupingMeta(row)];
        var expanded = openKeySet.has(row[primaryKey]);

        if (expanded) {
          if (Array.isArray(row.children)) {
            result = result.concat(row.children);
          }
        }

        return result;
      });
    }

    function processColumns(columns) {
      if (columns.length === 0) {
        return columns;
      } // const columnFlatCount = collectNodes(columns, 'leaf-only').length;


      var _columns2 = _toArray(columns),
          firstCol = _columns2[0],
          others = _columns2.slice(1);

      var colKey = opts.groupTitleColKey || firstCol.key;
      var column = columns.find(function (p) {
        return p.key === colKey;
      });

      if (!column) {
        return columns;
      }

      var cellRenderer = function cellRenderer(args) {
        var _row$groupTitle2;

        var row = args.rowData;
        var content = safeRender(column, args);
        var meta = getGroupingMeta(row);

        if (!meta.isGroupHeader || !meta.expandable) {
          var _row$groupTitle;

          var marginLeft = textOffset + (meta.isGroupHeader ? 0 : indents.indentSize);
          return /*#__PURE__*/React.createElement(InlineFlexCell, {
            style: {
              marginLeft: marginLeft
            }
          }, meta.isGroupHeader ? (_row$groupTitle = row.groupTitle) !== null && _row$groupTitle !== void 0 ? _row$groupTitle : content : content);
        }

        var expanded = openKeySet.has(row[primaryKey]);
        var expandCls = expanded ? 'expanded' : 'collapsed';
        return /*#__PURE__*/React.createElement(ExpansionCell, {
          className: cx('expansion-cell', expandCls)
        }, /*#__PURE__*/React.createElement(icons.CaretRight, {
          className: cx('expansion-icon', expandCls),
          style: {
            marginLeft: indents.iconIndent,
            marginRight: indents.iconGap
          }
        }), (_row$groupTitle2 = row.groupTitle) !== null && _row$groupTitle2 !== void 0 ? _row$groupTitle2 : content);
      };

      pipeline.appendTableProps('rowRenderer', function (args) {
        var rowData = args.rowData,
            cells = args.cells,
            columns = args.columns;

        if (getGroupingMeta(rowData).isGroupHeader) {
          var _cells$, _cells$$props;

          var colIndex = columns.findIndex(function (p) {
            return p.key === colKey;
          });

          if (colIndex < 0) {
            return cells;
          }

          if (columns[colIndex]['__placeholder__']) {
            colIndex = 0;
          }

          console.log('rowRenderer', columns, args);
          var totalWidth = 0;
          cells.forEach(function (c, index) {
            if (index >= colIndex) {
              var _c$props, _c$props$style;

              var width = (c === null || c === void 0 ? void 0 : (_c$props = c.props) === null || _c$props === void 0 ? void 0 : (_c$props$style = _c$props.style) === null || _c$props$style === void 0 ? void 0 : _c$props$style.width) || 0;
              totalWidth += width;
            }
          });

          var style = _objectSpread(_objectSpread({}, (_cells$ = cells[0]) === null || _cells$ === void 0 ? void 0 : (_cells$$props = _cells$.props) === null || _cells$$props === void 0 ? void 0 : _cells$$props.style), {}, {
            width: totalWidth
          });

          cells[colIndex] = /*#__PURE__*/React.cloneElement(cells[colIndex], {
            style: style
          });
          return cells.splice(0, colIndex + 1); // return cellRenderer(args as any);
        }

        return cells;
      });
      pipeline.appendTableProps('cellProps', function (args) {
        if (args.column.key === colKey) {
          var row = args.rowData;
          var meta = getGroupingMeta(row);

          if (!meta.isGroupHeader) {
            return null;
          }

          var expandable = meta.expandable;
          var rowKey = row[primaryKey];
          var expanded = openKeySet.has(rowKey);
          var onClick;

          if (expandable) {
            onClick = function onClick(e) {
              if (opts.stopClickEventPropagation) {
                e.stopPropagation();
              }

              if (onChangeOpenKeys) {
                if (expanded) {
                  onChangeOpenKeys(openKeys.filter(function (key) {
                    return key !== rowKey;
                  }), rowKey, 'collapse');
                } else {
                  onChangeOpenKeys([].concat(_toConsumableArray(openKeys), [rowKey]), rowKey, 'expand');
                }
              }
            };
          }

          return {
            onClick: onClick,
            style: {
              cursor: expandable ? 'pointer' : undefined
            }
          };
        }

        return null;
      });

      var _columns = _toConsumableArray(columns);

      return _columns.map(function (item) {
        if (item.key === colKey) {
          return _objectSpread(_objectSpread({}, item), {}, {
            cellRenderer: cellRenderer,
            headerRenderer: function headerRenderer(args) {
              return /*#__PURE__*/React.createElement("div", {
                style: {
                  display: 'inline-block',
                  marginLeft: textOffset
                }
              }, safeHeaderRender(column, args));
            }
          });
        }

        return item;
      }); // return [
      //   {
      //     ...firstCol,
      //     headerRenderer: (args: any) => {
      //       return <div style={{ display: 'inline-block', marginLeft: textOffset }}>{safeHeaderRender(firstCol, args)}</div>;
      //     },
      //     cellRenderer,
      //     // getSpanRect(value: any, row: any, rowIndex: number) {
      //     //   if (getGroupingMeta(row).isGroupHeader) {
      //     //     return { top: rowIndex, bottom: rowIndex + 1, left: 0, right: columnFlatCount };
      //     //   }
      //     // },
      //   },
      //   ...others,
      // ];
    }
  };
}