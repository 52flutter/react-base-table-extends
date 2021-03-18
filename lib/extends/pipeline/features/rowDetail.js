"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowDetail = rowDetail;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _commonView = require("../utils/common-view");

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var rowDetailSymbol = Symbol('row-detail');

var fallbackRenderDetail = function fallbackRenderDetail() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '8px 24px'
    }
  }, /*#__PURE__*/_react.default.createElement("b", {
    style: {
      color: 'indianred'
    }
  }, "\u8BBE\u7F6E ", /*#__PURE__*/_react.default.createElement("code", null, "rowDetail.renderDetail"), " \u6765\u81EA\u5B9A\u4E49\u8BE6\u60C5\u5185\u5BB9"));
};
/** rowDetail 不能使用 frozen */


function rowDetail() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function rowDetailStep(pipeline) {
    var _opts$rowDetailMetaKe, _opts$clickArea, _opts$getDetailKey, _opts$renderDetail, _opts$hasDetail, _ref, _ref2, _opts$openKeys;

    var stateKey = 'rowDetail';
    var primaryKey = pipeline.ensurePrimaryKey('rowDetail');

    if (typeof primaryKey !== 'string') {
      throw new Error('rowDetail 仅支持字符串作为 primaryKey');
    }

    var rowDetailMetaKey = (_opts$rowDetailMetaKe = opts.rowDetailMetaKey) !== null && _opts$rowDetailMetaKe !== void 0 ? _opts$rowDetailMetaKe : rowDetailSymbol;
    var indents = pipeline.ctx.indents;
    var textOffset = indents.iconIndent + indents.iconWidth + indents.iconGap;
    var clickArea = (_opts$clickArea = opts.clickArea) !== null && _opts$clickArea !== void 0 ? _opts$clickArea : 'icon';
    var getDetailKey = (_opts$getDetailKey = opts.getDetailKey) !== null && _opts$getDetailKey !== void 0 ? _opts$getDetailKey : function (row) {
      return row[primaryKey] + '_detail';
    };
    var renderDetail = (_opts$renderDetail = opts.renderDetail) !== null && _opts$renderDetail !== void 0 ? _opts$renderDetail : fallbackRenderDetail;
    var hasDetail = (_opts$hasDetail = opts.hasDetail) !== null && _opts$hasDetail !== void 0 ? _opts$hasDetail : (0, _utils.always)(true);
    var openKeys = (_ref = (_ref2 = (_opts$openKeys = opts.openKeys) !== null && _opts$openKeys !== void 0 ? _opts$openKeys : pipeline.getStateAtKey(stateKey)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultOpenAll ? pipeline.getDataSource().filter(hasDetail).map(function (row) {
      return row[primaryKey];
    }) : opts.defaultOpenKeys) !== null && _ref !== void 0 ? _ref : [];

    var onChangeOpenKeys = function onChangeOpenKeys(nextKeys, key, action) {
      var _opts$onChangeOpenKey;

      (_opts$onChangeOpenKey = opts.onChangeOpenKeys) === null || _opts$onChangeOpenKey === void 0 ? void 0 : _opts$onChangeOpenKey.call(opts, nextKeys, key, action);
      pipeline.setStateAtKey(stateKey, nextKeys, {
        key: key,
        action: action
      });
    };

    var openKeySet = new Set(openKeys);

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

    pipeline.appendTableProps('estimatedRowHeight', pipeline.getRowHeight() + 1);
    pipeline.appendTableProps('virtual', true);
    return pipeline.data((0, _utils.flatMap)(pipeline.getDataSource(), function (row, rowIndex) {
      if (openKeySet.has(row[primaryKey])) {
        return [row, _objectSpread(_objectSpread(_defineProperty({}, rowDetailMetaKey, true), row), {}, _defineProperty({}, primaryKey, getDetailKey(row, rowIndex)))];
      } else {
        return [row];
      }
    })).columns(processColumns(pipeline.getColumns()));

    function processColumns(columns) {
      if (columns.length === 0) {
        return columns;
      } // 将frozen置空


      columns.forEach(function (p) {
        return p.frozen = undefined;
      });

      var _columns = _toArray(columns),
          firstCol = _columns[0],
          others = _columns.slice(1);

      if (clickArea === 'cell') {
        pipeline.appendTableProps('cellProps', function (args) {
          if (args.column.key === firstCol.key) {
            return {
              onClick: function onClick(e) {
                if (opts.stopClickEventPropagation) {
                  e.stopPropagation();
                }

                toggle(args.rowData[primaryKey]);
              },
              style: {
                cursor: 'pointer'
              }
            };
          }

          return {};
        });
      }

      var cellRenderer = function cellRenderer(args) {
        var row = args.rowData,
            rowIndex = args.rowIndex;

        if (row[rowDetailMetaKey]) {
          return renderDetail(row, rowIndex);
        }

        var content = (0, _utils.safeRender)(firstCol, args);

        if (!hasDetail(row, rowIndex)) {
          return /*#__PURE__*/_react.default.createElement(_commonView.InlineFlexCell, {
            style: {
              marginLeft: textOffset
            }
          }, content);
        }

        var rowKey = row[primaryKey];
        var expanded = openKeySet.has(rowKey);

        var onClick = function onClick(e) {
          if (opts.stopClickEventPropagation) {
            e.stopPropagation();
          }

          toggle(rowKey);
        };

        var expandCls = expanded ? 'expanded' : 'collapsed';
        return /*#__PURE__*/_react.default.createElement(_commonView.ExpansionCell, {
          className: (0, _classnames.default)('expansion-cell', expandCls),
          style: {
            cursor: clickArea === 'content' ? 'pointer' : undefined,
            height: pipeline.getRowHeight()
          },
          onClick: clickArea === 'content' ? onClick : undefined
        }, /*#__PURE__*/_react.default.createElement(_commonView.icons.CaretRight, {
          style: {
            cursor: clickArea === 'icon' ? 'pointer' : undefined,
            marginLeft: indents.iconIndent,
            marginRight: indents.iconGap
          },
          className: (0, _classnames.default)('expansion-icon', expandCls),
          onClick: clickArea === 'icon' ? onClick : undefined
        }), content);
      };

      pipeline.appendTableProps('rowRenderer', function (args) {
        var rowData = args.rowData,
            cells = args.cells,
            columns = args.columns;

        if (rowData[rowDetailMetaKey]) {
          return cellRenderer(args);
        }

        return cells; // return <div style={{ height: pipeline.getRowHeight(), display: 'flex' }}>{cells}</div>;
      });
      return [_objectSpread(_objectSpread({}, firstCol), {}, {
        headerRenderer: function headerRenderer(args) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: {
              display: 'inline-block',
              marginLeft: textOffset
            }
          }, (0, _utils.safeHeaderRender)(firstCol, args));
        },
        cellRenderer: cellRenderer
      })].concat(_toConsumableArray(others));
    }
  };
}