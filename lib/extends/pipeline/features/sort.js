"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = sort;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SortIcon(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 32 : _ref$size,
      style = _ref.style,
      className = _ref.className,
      order = _ref.order;
  return /*#__PURE__*/_react.default.createElement("svg", {
    style: style,
    className: className,
    focusable: "false",
    preserveAspectRatio: "xMidYMid meet",
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: order === 'asc' ? '#23A3FF' : '#bfbfbf',
    transform: "translate(0, 4)",
    d: "M8 8L16 0 24 8z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: order === 'desc' ? '#23A3FF' : '#bfbfbf',
    transform: "translate(0, -4)",
    d: "M24 24L16 32 8 24z "
  }));
}

function DefaultSortHeaderCell(_ref2) {
  var children = _ref2.children,
      column = _ref2.column,
      onToggle = _ref2.onToggle,
      sortOrder = _ref2.sortOrder,
      sortIndex = _ref2.sortIndex,
      sortOptions = _ref2.sortOptions;
  // 通过 justify-content 来与 col.align 保持对齐方向一致
  var justifyContent = column.align === 'right' ? 'flex-end' : column.align === 'center' ? 'center' : 'flex-start';
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: onToggle,
    style: {
      justifyContent: justifyContent,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none',
      width: '100%'
    }
  }, children, /*#__PURE__*/_react.default.createElement(SortIcon, {
    style: {
      userSelect: 'none',
      marginLeft: 2,
      flexShrink: 0
    },
    size: 16,
    order: sortOrder
  }), sortOptions.mode === 'multiple' && sortIndex != -1 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      userSelect: 'none',
      marginLeft: 2,
      color: '#666',
      flex: '0 0 auto',
      fontSize: 10,
      fontFamily: 'monospace'
    }
  }, sortIndex + 1));
}

var stateKey = 'sort';

function sort() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function sortStep(pipeline) {
    var _ref3, _ref4, _opts$sorts;

    var _opts$orders = opts.orders,
        orders = _opts$orders === void 0 ? ['desc', 'asc', 'none'] : _opts$orders,
        _opts$mode = opts.mode,
        mode = _opts$mode === void 0 ? 'multiple' : _opts$mode,
        _opts$SortHeaderCell = opts.SortHeaderCell,
        SortHeaderCell = _opts$SortHeaderCell === void 0 ? DefaultSortHeaderCell : _opts$SortHeaderCell,
        keepDataSource = opts.keepDataSource,
        highlightColumnWhenActive = opts.highlightColumnWhenActive,
        stopClickEventPropagation = opts.stopClickEventPropagation;
    var inputSorts = (_ref3 = (_ref4 = (_opts$sorts = opts.sorts) !== null && _opts$sorts !== void 0 ? _opts$sorts : pipeline.getStateAtKey(stateKey)) !== null && _ref4 !== void 0 ? _ref4 : opts.defaultSorts) !== null && _ref3 !== void 0 ? _ref3 : [];
    var activeSorts = inputSorts.filter(function (s) {
      return s.order !== 'none';
    }); // 单字段排序的情况下 sorts 中只有第一个排序字段才会生效

    var sorts = mode === 'multiple' ? activeSorts : activeSorts.slice(0, 1);

    var onChangeSortsInMultipleMode = function onChangeSortsInMultipleMode(nextSorts) {
      var _opts$onChangeSorts;

      (_opts$onChangeSorts = opts.onChangeSorts) === null || _opts$onChangeSorts === void 0 ? void 0 : _opts$onChangeSorts.call(opts, nextSorts);
      pipeline.setStateAtKey(stateKey, nextSorts);
    };

    var onChangeSorts = mode === 'multiple' ? onChangeSortsInMultipleMode : function (nextSorts) {
      // 单字段排序的情况下，nextSorts 中只有最后一个排序字段才会生效
      var len = nextSorts.length;
      onChangeSortsInMultipleMode(nextSorts.slice(len - 1));
    };
    var sortOptions = {
      sorts: sorts,
      onChangeSorts: onChangeSorts,
      orders: orders,
      mode: mode,
      keepDataSource: keepDataSource,
      highlightColumnWhenActive: highlightColumnWhenActive,
      stopClickEventPropagation: stopClickEventPropagation
    };
    var sortMap = new Map(sorts.map(function (sort, index) {
      return [sort.key, _objectSpread({
        index: index
      }, sort)];
    }));
    var dataSource = pipeline.getDataSource();
    var columns = pipeline.getColumns();
    pipeline.data(processDataSource(dataSource));
    pipeline.columns(processColumns(columns));
    return pipeline;

    function processDataSource(dataSource) {
      if (keepDataSource) {
        return dataSource;
      }

      var sortColumnsMap = new Map((0, _utils.collectNodes)(columns, 'leaf-only').filter(function (col) {
        var _col$features, _col$features2;

        return ((_col$features = col.features) === null || _col$features === void 0 ? void 0 : _col$features.sortable) !== false && ((_col$features2 = col.features) === null || _col$features2 === void 0 ? void 0 : _col$features2.sortable) != null;
      }).map(function (col) {
        return [col.key.toString(), col];
      }));
      return (0, _utils.layeredSort)(dataSource, function (x, y) {
        var _iterator = _createForOfIteratorHelper(sorts),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _column$features;

            var _step$value = _step.value,
                key = _step$value.key,
                order = _step$value.order;
            var column = sortColumnsMap.get(key); // 如果 code 对应的 column 不可排序，我们跳过该 code

            if (column == null) {
              continue;
            }

            var sortable = (_column$features = column.features) === null || _column$features === void 0 ? void 0 : _column$features.sortable;
            var compareFn = typeof sortable === 'function' ? sortable : _utils.smartCompare;
            var xValue = x[column.dataKey || column.key] || -1;
            var yValue = y[column.dataKey || column.key];
            var cmp = compareFn(xValue, yValue, x, y) || -1;

            if (cmp !== 0) {
              return cmp * (order === 'asc' ? 1 : -1);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return 0;
      });
    } // 在「升序 - 降序 - 不排序」之间不断切换


    function toggle(key) {
      var sort = sortMap.get(key);

      if (sort == null) {
        onChangeSorts(sorts.concat([{
          key: key,
          order: orders[0]
        }]));
      } else {
        var index = sorts.findIndex(function (s) {
          return s.key === key;
        });
        var nextSorts = sorts.slice(0, index + 1);
        var nextOrder = getNextOrder(sort.order);

        if (nextOrder === 'none') {
          nextSorts.pop();
        } else {
          nextSorts[index] = _objectSpread(_objectSpread({}, nextSorts[index]), {}, {
            order: nextOrder
          });
        }

        onChangeSorts(nextSorts);
      }
    }

    function processColumns(columns) {
      return columns.map(dfs);

      function dfs(col) {
        var _col$features3;

        var result = _objectSpread({}, col);

        var sortable = col.key && (((_col$features3 = col.features) === null || _col$features3 === void 0 ? void 0 : _col$features3.sortable) || sortMap.has(col.key.toString()));
        var active = sortable && sortMap.has(col.key.toString());

        if (sortable) {
          var sortIndex = -1;
          var sortOrder = 'none';

          if (active) {
            var _ref5 = sortMap.get(col.key.toString()) || {},
                order = _ref5.order,
                index = _ref5.index;

            if (order !== undefined && index !== undefined) {
              sortOrder = order;
              sortIndex = index;
            }
          }

          result.headerRenderer = function (arg) {
            return /*#__PURE__*/_react.default.createElement(SortHeaderCell, {
              onToggle: function onToggle(e) {
                if (stopClickEventPropagation) {
                  e.stopPropagation();
                }

                toggle(col.key.toString());
              },
              sortOrder: sortOrder,
              column: col,
              sortIndex: sortIndex,
              sortOptions: sortOptions
            }, (0, _utils.safeHeaderRender)(col, arg));
          };
        }

        if (highlightColumnWhenActive && active) {
          pipeline.appendTableProps('cellProps', function (args) {
            if (args.column.key === result.key) {
              return {
                style: {
                  background: 'var(--highlight-bgcolor)',
                  color: 'var(--highlight-color)'
                }
              };
            }

            return null;
          });
          pipeline.appendTableProps('headerCellProps', function (args) {
            if (args.column.key === result.key) {
              return {
                style: {
                  background: 'var(--highlight-bgcolor)',
                  color: 'var(--highlight-color)'
                }
              };
            }

            return null;
          });
        }

        if (!(0, _utils.isLeafNode)(col)) {
          var _col$children;

          result.children = col === null || col === void 0 ? void 0 : (_col$children = col.children) === null || _col$children === void 0 ? void 0 : _col$children.map(dfs);
        }

        return result;
      }
    }

    function getNextOrder(order) {
      var idx = orders.indexOf(order);
      return orders[idx === orders.length - 1 ? 0 : idx + 1];
    }
  };
}