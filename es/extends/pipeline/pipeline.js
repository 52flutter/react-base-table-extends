function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { useState } from 'react';
import { mergeCellProps } from './utils/utils';
/**
 * 表格数据处理流水线。TablePipeline 提供了表格数据处理过程中的一些上下方与工具方法，包括……
 *
 * 1. ctx：上下文环境对象，step（流水线上的一步）可以对 ctx 中的字段进行读写。
 * ctx 中部分字段名称有特定的含义（例如 primaryKey 表示行的主键），使用自定义的上下文信息时注意避开这些名称。
 *
 * 2. rowPropsGetters：getRowProps 回调队列，step 可以通过 pipeline.appendRowPropsGetter 向队列中追加回调函数，
 *   在调用 pipeline.props() 队列中的所有函数会组合形成最终的 getRowProps
 *
 * 3. 当前流水线的状态，包括 data, columns, rowPropsGetters 三个部分
 *
 * 4. snapshots，调用 pipeline.snapshot(name) 可以记录当前的状态，后续可以通过 name 来读取保存的状态
 * */

export var TablePipeline = /*#__PURE__*/function () {
  function TablePipeline(_ref) {
    var state = _ref.state,
        setState = _ref.setState,
        ctx = _ref.ctx;

    _classCallCheck(this, TablePipeline);

    this._snapshots = {};
    this._rowPropsGetters = []; // @ts-ignore

    this._data = null; // @ts-ignore

    this._columns = null;
    this.ctx = {
      components: {},
      indents: TablePipeline.defaultIndents
    };
    this._rowEventHandlers = {};
    this._tableProps = {};
    this.state = state;
    this.setState = setState;
    Object.assign(this.ctx, ctx);
  }

  _createClass(TablePipeline, [{
    key: "appendRowPropsGetter",
    value: function appendRowPropsGetter(getter) {
      this._rowPropsGetters.push(getter);

      return this;
    }
  }, {
    key: "getDataSource",
    value: function getDataSource(name) {
      if (name == null) {
        return this._data;
      } else {
        return this._snapshots[name].data;
      }
    }
  }, {
    key: "getColumns",
    value: function getColumns(name) {
      if (name == null) {
        return this._columns;
      } else {
        return this._snapshots[name].columns;
      }
    }
  }, {
    key: "getStateAtKey",
    value: function getStateAtKey(stateKey, defaultValue) {
      var _this$state$stateKey;

      return (_this$state$stateKey = this.state[stateKey]) !== null && _this$state$stateKey !== void 0 ? _this$state$stateKey : defaultValue;
    }
    /** 将 stateKey 对应的状态设置为 partialState  */

  }, {
    key: "setStateAtKey",
    value: function setStateAtKey(stateKey, partialState, extraInfo) {
      this.setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, stateKey, partialState));
      }, stateKey, partialState, extraInfo);
    }
    /** 确保 primaryKey 已被设置，并返回 primaryKey  */

  }, {
    key: "ensurePrimaryKey",
    value: function ensurePrimaryKey(hint) {
      if (this.ctx.primaryKey == null) {
        throw new Error(hint ? "\u4F7F\u7528 ".concat(hint, " \u4E4B\u524D\u5FC5\u987B\u5148\u8BBE\u7F6E primaryKey") : '必须先设置 primaryKey');
      }

      return this.ctx.primaryKey;
    }
  }, {
    key: "getRowHeight",
    value: function getRowHeight() {
      var _this$_otherProps;

      return ((_this$_otherProps = this._otherProps) === null || _this$_otherProps === void 0 ? void 0 : _this$_otherProps.rowHeight) || 30;
    }
  }, {
    key: "getHeaderHeight",
    value: function getHeaderHeight() {
      var _this$_otherProps2;

      return ((_this$_otherProps2 = this._otherProps) === null || _this$_otherProps2 === void 0 ? void 0 : _this$_otherProps2.headerHeight) || 40;
    }
  }, {
    key: "getFixed",
    value: function getFixed() {
      var _this$_otherProps3;

      return ((_this$_otherProps3 = this._otherProps) === null || _this$_otherProps3 === void 0 ? void 0 : _this$_otherProps3.fixed) || false;
    }
    /** 设置流水线的输入数据 */

  }, {
    key: "input",
    value: function input(_input, otherProps) {
      if (this._data != null || this._columns != null) {
        throw new Error('input不能调用两次');
      }

      this._data = _input.data;
      this._columns = _input.columns;
      this._otherProps = otherProps;
      this.snapshot('input');
      return this;
    }
    /** 设置 data */

  }, {
    key: "data",
    value: function data(rows) {
      this._data = rows;
      return this;
    }
    /** 设置 columns */

  }, {
    key: "columns",
    value: function columns(cols) {
      this._columns = cols;
      return this;
    }
    /** 设置主键 */

  }, {
    key: "primaryKey",
    value: function primaryKey(key) {
      this.ctx.primaryKey = key;
      return this;
    }
    /** 保存快照 */

  }, {
    key: "snapshot",
    value: function snapshot(name) {
      this._snapshots[name] = {
        data: this._data,
        columns: this._columns,
        rowPropsGetters: this._rowPropsGetters.slice()
      };
      return this;
    }
    /** 使用 pipeline 功能拓展 */

  }, {
    key: "use",
    value: function use(step) {
      return step(this);
    }
    /** 转换 data */

  }, {
    key: "mapDataSource",
    value: function mapDataSource(mapper) {
      return this.data(mapper(this.getDataSource()));
    }
    /** 转换 columns */

  }, {
    key: "mapColumns",
    value: function mapColumns(mapper) {
      return this.columns(mapper(this.getColumns()));
    }
    /** 获取 BaseTable 的 props，结果中包含 data/columns/primaryKey/getRowProps 四个字段 */

  }, {
    key: "getProps",
    value: function getProps() {
      var _this = this;

      var result = {
        data: this._data,
        columns: this._columns,
        ignoreFunctionInColumnCompare: false,
        rowHeight: this.getRowHeight(),
        headerHeight: this.getHeaderHeight()
      };

      if (this.ctx.primaryKey) {
        result.rowKey = this.ctx.primaryKey;
      }

      if (this._rowPropsGetters.length > 0) {
        result.rowProps = function (_ref2) {
          var columns = _ref2.columns,
              rowData = _ref2.rowData,
              rowIndex = _ref2.rowIndex;
          return _this._rowPropsGetters.reduce(function (res, get) {
            return mergeCellProps(res, get({
              columns: columns,
              rowData: rowData,
              rowIndex: rowIndex
            }));
          }, {});
        };
      }

      if (this._rowEventHandlers) {
        result.rowEventHandlers = this._rowEventHandlers;
      }

      Object.keys(this._tableProps || {}).map(function (key) {
        var _this$_tableProps$key;

        if ((_this$_tableProps$key = _this._tableProps[key]) === null || _this$_tableProps$key === void 0 ? void 0 : _this$_tableProps$key.length) {
          var first = _this._tableProps[key][0]; // 如果是方法 需要合并 否则取最后一个

          if (typeof first === 'function') {
            result[key] = function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // rowClassName 需要合并返回值
              if (key === 'rowClassName') {
                var _this$_tableProps$key2;

                var classNames = (_this$_tableProps$key2 = _this._tableProps[key]) === null || _this$_tableProps$key2 === void 0 ? void 0 : _this$_tableProps$key2.map(function (item, index) {
                  return item.apply(void 0, args);
                }).filter(function (p) {
                  return p;
                });
                return classNames.join(' ');
              }

              if (key === 'rowRenderer') {
                var _this$_tableProps$key3;

                var cells = args[0].cells;
                (_this$_tableProps$key3 = _this._tableProps[key]) === null || _this$_tableProps$key3 === void 0 ? void 0 : _this$_tableProps$key3.map(function (item) {
                  cells = item(_objectSpread(_objectSpread({}, args[0]), {}, {
                    cells: cells
                  }));
                });
                return cells;
              }

              var resData = _this._tableProps[key].reduce(function (res, get) {
                return mergeCellProps(res, get.apply(void 0, args));
              }, null); // key === 'cellProps' && console.log('res111', key, resData, args);


              return resData;
            };
          } else {
            result[key] = _this._tableProps[key][_this._tableProps[key].length - 1];
          }
        }
      });
      return result;
    }
  }, {
    key: "appendRowEventHandlers",
    value: function appendRowEventHandlers(eventName, func) {
      var _this2 = this;

      if (!this._rowEventHandlers[eventName]) {
        this._rowEventHandlers[eventName] = func;
      } else {
        this._rowEventHandlers[eventName] = function (args) {
          _this2._rowEventHandlers[eventName](args);

          func(args);
        };
      }
    }
  }, {
    key: "appendTableProps",
    value: function appendTableProps(name, value) {
      if (this._tableProps[name]) {
        this._tableProps[name].push(value);
      } else {
        this._tableProps[name] = [value];
      }
    }
  }]);

  return TablePipeline;
}();
TablePipeline.defaultIndents = {
  iconIndent: 0,
  iconWidth: 16,
  iconGap: 0,
  indentSize: 16
};
export function useTablePipeline(ctx) {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  return new TablePipeline({
    state: state,
    setState: setState,
    ctx: ctx
  });
}