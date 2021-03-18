"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiSelect = multiSelect;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function multiSelect() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function multiSelectStep(pipeline) {
    var _opts$isDisabled, _opts$clickArea, _ref, _ref2, _opts$value, _pipeline$getStateAtK, _ref3, _ref4, _opts$lastKey, _pipeline$getStateAtK2, _opts$checkboxPlaceme;

    var stateKey = 'multiSelect';
    var Checkbox = pipeline.ctx.components.Checkbox;

    if (Checkbox == null) {
      throw new Error('使用 multiSelect 之前需要设置 pipeline.ctx.components.Checkbox');
    }

    var primaryKey = pipeline.ensurePrimaryKey('multiSelect');
    var isDisabled = (_opts$isDisabled = opts.isDisabled) !== null && _opts$isDisabled !== void 0 ? _opts$isDisabled : (0, _utils.always)(false);
    var clickArea = (_opts$clickArea = opts.clickArea) !== null && _opts$clickArea !== void 0 ? _opts$clickArea : 'checkbox';
    var value = (_ref = (_ref2 = (_opts$value = opts.value) !== null && _opts$value !== void 0 ? _opts$value : (_pipeline$getStateAtK = pipeline.getStateAtKey(stateKey)) === null || _pipeline$getStateAtK === void 0 ? void 0 : _pipeline$getStateAtK.value) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultValue) !== null && _ref !== void 0 ? _ref : [];
    var lastKey = (_ref3 = (_ref4 = (_opts$lastKey = opts.lastKey) !== null && _opts$lastKey !== void 0 ? _opts$lastKey : (_pipeline$getStateAtK2 = pipeline.getStateAtKey(stateKey)) === null || _pipeline$getStateAtK2 === void 0 ? void 0 : _pipeline$getStateAtK2.lastKey) !== null && _ref4 !== void 0 ? _ref4 : opts.defaultLastKey) !== null && _ref3 !== void 0 ? _ref3 : '';

    var _onChange = function onChange(nextValue, key, keys, action) {
      var _opts$onChange;

      (_opts$onChange = opts.onChange) === null || _opts$onChange === void 0 ? void 0 : _opts$onChange.call(opts, nextValue, key, keys, action);
      pipeline.setStateAtKey(stateKey, {
        value: nextValue,
        lastKey: key
      }, {
        keys: keys,
        action: action
      });
    };

    var dataSource = pipeline.getDataSource();
    /** dataSource 中包含的所有 keys */

    var fullKeySet = new Set();
    /** 所有有效的 keys（disable 状态为 false） */

    var allKeys = [];
    dataSource.forEach(function (row, rowIndex) {
      var rowKey = (0, _utils.safeGetRowKey)(primaryKey, row, rowIndex);
      fullKeySet.add(rowKey); // 在 allKeys 中排除被禁用的 key

      if (!isDisabled(row, rowIndex)) {
        allKeys.push(rowKey);
      }
    });
    var set = new Set(value);
    var isAllChecked = allKeys.length > 0 && allKeys.every(function (key) {
      return set.has(key);
    });
    var isAnyChecked = allKeys.some(function (key) {
      return set.has(key);
    });

    var defaultCheckboxColumnTitle = /*#__PURE__*/_react.default.createElement(Checkbox, {
      checked: isAllChecked,
      indeterminate: !isAllChecked && isAnyChecked,
      onChange: function onChange(_) {
        if (isAllChecked) {
          _onChange(_utils.arrayUtils.diff(value, allKeys), '', allKeys, 'uncheck-all');
        } else {
          _onChange(_utils.arrayUtils.merge(value, allKeys), '', allKeys, 'check-all');
        }
      }
    });

    var checkboxColumn = _objectSpread(_objectSpread({
      name: '是否选中',
      headerRenderer: defaultCheckboxColumnTitle,
      width: 50,
      align: 'center',
      key: '_multiSelect_',
      minWidth: 50,
      resizable: true
    }, opts.checkboxColumn), {}, {
      cellRenderer: function cellRenderer(_ref5) {
        var rowData = _ref5.rowData,
            rowIndex = _ref5.rowIndex;
        var key = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);
        var checked = set.has(key);
        return /*#__PURE__*/_react.default.createElement(Checkbox, {
          checked: checked,
          disabled: isDisabled(rowData, rowIndex),
          onChange: clickArea === 'checkbox' ? function (arg1, arg2) {
            var _arg2$nativeEvent;

            // 这里要同时兼容 antd 和 fusion 的用法
            // fusion: arg2?.nativeEvent
            // antd: arg1.nativeEvent
            var nativeEvent = (_arg2$nativeEvent = arg2 === null || arg2 === void 0 ? void 0 : arg2.nativeEvent) !== null && _arg2$nativeEvent !== void 0 ? _arg2$nativeEvent : arg1.nativeEvent;

            if (nativeEvent) {
              if (opts.stopClickEventPropagation) {
                nativeEvent.stopPropagation();
              }

              onCheckboxChange(checked, key, nativeEvent.shiftKey);
            }
          } : undefined
        });
      }
    });

    var nextColumns = pipeline.getColumns().slice();
    var checkboxPlacement = (_opts$checkboxPlaceme = opts.checkboxPlacement) !== null && _opts$checkboxPlaceme !== void 0 ? _opts$checkboxPlaceme : 'start';

    if (checkboxPlacement === 'start') {
      nextColumns.unshift(checkboxColumn);
    } else {
      nextColumns.push(checkboxColumn);
    }

    pipeline.columns(nextColumns);

    if (opts.highlightRowWhenSelected) {
      pipeline.appendTableProps('rowClassName', function (args) {
        var rowKey = (0, _utils.safeGetRowKey)(primaryKey, args.rowData, args.rowIndex);

        if (!fullKeySet.has(rowKey)) {
          // rowKey 不在 fullKeySet 中说明这一行是在 multiSelect 之后才生成的，multiSelect 不对之后生成的行进行处理
          return '';
        }

        var checked = set.has(rowKey);

        if (checked) {
          return 'highlight';
        }

        return '';
      });
    }

    if (clickArea === 'cell') {
      pipeline.appendTableProps('cellProps', function (_ref6) {
        var rowData = _ref6.rowData,
            rowIndex = _ref6.rowIndex,
            column = _ref6.column;

        if (column.key === checkboxColumn.key) {
          var rowKey = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);

          if (fullKeySet.has(rowKey) && clickArea === 'cell') {
            var prevChecked = set.has(rowKey);
            var disabled = isDisabled(rowData, rowIndex);
            return {
              style: {
                cursor: disabled ? 'not-allowed' : 'pointer'
              },
              onClick: disabled ? undefined : function (e) {
                if (opts.stopClickEventPropagation) {
                  e.stopPropagation();
                }

                onCheckboxChange(prevChecked, rowKey, e.shiftKey);
              }
            };
          }
        }

        return null;
      });
    }

    if (clickArea === 'row') {
      pipeline.appendRowEventHandlers('onClick', function (_ref7) {
        var rowData = _ref7.rowData,
            rowIndex = _ref7.rowIndex,
            event = _ref7.event;
        var disabled = isDisabled(rowData, rowIndex);

        if (!disabled) {
          var rowKey = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);
          var checked = set.has(rowKey);

          if (opts.stopClickEventPropagation) {
            event.stopPropagation();
          }

          if (!isDisabled(rowData, rowIndex)) {}

          onCheckboxChange(checked, rowKey, event.shiftKey);
        }
      });
    } // pipeline.appendRowPropsGetter((row, rowIndex) => {
    //   const rowKey = safeGetRowKey(primaryKey, row, rowIndex);
    //   if (!fullKeySet.has(rowKey)) {
    //     // rowKey 不在 fullKeySet 中说明这一行是在 multiSelect 之后才生成的，multiSelect 不对之后生成的行进行处理
    //     return;
    //   }
    //   let style: any = {};
    //   let className: string;
    //   let onClick: any;
    //   const checked = set.has(rowKey);
    //   if (opts.highlightRowWhenSelected && checked) {
    //     className = 'highlight';
    //   }
    //   if (clickArea === 'row') {
    //     const disabled = isDisabled(row, rowIndex);
    //     if (!disabled) {
    //       style.cursor = 'pointer';
    //       onClick = (e: MouseEvent) => {
    //         if (opts.stopClickEventPropagation) {
    //           e.stopPropagation();
    //         }
    //         onCheckboxChange(checked, rowKey, e.shiftKey);
    //       };
    //     }
    //   }
    //   return { className, style, onClick };
    // });


    return pipeline;

    function onCheckboxChange(prevChecked, key, batch) {
      var batchKeys = [key];

      if (batch && lastKey) {
        var lastIdx = allKeys.indexOf(lastKey);
        var cntIdx = allKeys.indexOf(key);

        var _ref8 = lastIdx < cntIdx ? [lastIdx, cntIdx] : [cntIdx, lastIdx],
            _ref9 = _slicedToArray(_ref8, 2),
            start = _ref9[0],
            end = _ref9[1];

        batchKeys = allKeys.slice(start, end + 1);
      }

      if (_onChange) {
        if (prevChecked) {
          _onChange(_utils.arrayUtils.diff(value, batchKeys), key, batchKeys, 'uncheck');
        } else {
          _onChange(_utils.arrayUtils.merge(value, batchKeys), key, batchKeys, 'check');
        }
      }
    }
  };
}