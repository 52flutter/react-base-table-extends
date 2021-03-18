"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleSelect = singleSelect;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function singleSelect() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function singleSelectStep(pipeline) {
    var _opts$clickArea, _opts$isDisabled, _ref, _opts$value, _opts$radioPlacement;

    var Radio = pipeline.ctx.components.Radio;

    if (Radio == null) {
      throw new Error('使用 singleSelect 之前需要通过 pipeline context 设置 components.Radio');
    }

    var stateKey = 'singleSelect';
    var clickArea = (_opts$clickArea = opts.clickArea) !== null && _opts$clickArea !== void 0 ? _opts$clickArea : 'radio';
    var isDisabled = (_opts$isDisabled = opts.isDisabled) !== null && _opts$isDisabled !== void 0 ? _opts$isDisabled : (0, _utils.always)(false);
    var primaryKey = pipeline.ensurePrimaryKey('singleSelect');
    var value = (_ref = (_opts$value = opts.value) !== null && _opts$value !== void 0 ? _opts$value : pipeline.getStateAtKey(stateKey)) !== null && _ref !== void 0 ? _ref : opts.defaultValue;

    var onChange = function onChange(rowKey) {
      var _opts$onChange;

      (_opts$onChange = opts.onChange) === null || _opts$onChange === void 0 ? void 0 : _opts$onChange.call(opts, rowKey);
      pipeline.setStateAtKey(stateKey, rowKey);
    };

    var radioColumn = _objectSpread(_objectSpread({
      name: '',
      width: 50,
      key: '__singleSelectKey__',
      // maxWidth: 50,
      minWidth: 50,
      resizable: true,
      align: 'center'
    }, opts.radioColumn), {}, {
      cellRenderer: function cellRenderer(_ref2) {
        var rowData = _ref2.rowData,
            rowIndex = _ref2.rowIndex;
        var rowKey = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);
        return /*#__PURE__*/_react.default.createElement(Radio, {
          checked: value === rowKey,
          disabled: isDisabled(rowData, rowIndex),
          onChange: clickArea === 'radio' ? function (arg1, arg2) {
            var _arg2$nativeEvent;

            var nativeEvent = (_arg2$nativeEvent = arg2 === null || arg2 === void 0 ? void 0 : arg2.nativeEvent) !== null && _arg2$nativeEvent !== void 0 ? _arg2$nativeEvent : arg1 === null || arg1 === void 0 ? void 0 : arg1.nativeEvent;

            if (nativeEvent && opts.stopClickEventPropagation) {
              nativeEvent.stopPropagation();
            }

            onChange(rowKey);
          } : undefined
        });
      }
    });

    var nextColumns = pipeline.getColumns().slice();
    var radioPlacement = (_opts$radioPlacement = opts.radioPlacement) !== null && _opts$radioPlacement !== void 0 ? _opts$radioPlacement : 'start';

    if (radioPlacement === 'start') {
      nextColumns.unshift(radioColumn);
    } else {
      nextColumns.push(radioColumn);
    }

    pipeline.columns(nextColumns);

    if (opts.highlightRowWhenSelected) {
      pipeline.appendTableProps('rowClassName', function (args) {
        var rowKey = (0, _utils.safeGetRowKey)(primaryKey, args.rowData, args.rowIndex);

        if (value === rowKey) {
          return 'highlight';
        }

        return '';
      });
    }

    if (clickArea === 'cell') {
      pipeline.appendTableProps('cellProps', function (_ref3) {
        var rowData = _ref3.rowData,
            rowIndex = _ref3.rowIndex,
            column = _ref3.column;

        if (column.key === radioColumn.key) {
          var rowKey = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);
          var disabled = isDisabled(rowData, rowIndex);
          return {
            style: {
              cursor: disabled ? 'not-allowed' : 'pointer'
            },
            onClick: disabled ? undefined : function (e) {
              if (opts.stopClickEventPropagation) {
                e.stopPropagation();
              }

              onChange(rowKey);
            }
          };
        }

        return null;
      });
    }

    if (clickArea === 'row') {
      pipeline.appendRowEventHandlers('onClick', function (_ref4) {
        var rowData = _ref4.rowData,
            rowIndex = _ref4.rowIndex,
            event = _ref4.event;
        var rowKey = (0, _utils.safeGetRowKey)(primaryKey, rowData, rowIndex);

        if (opts.stopClickEventPropagation) {
          event.stopPropagation();
        }

        if (!isDisabled(rowData, rowIndex)) {}

        onChange(rowKey);
      });
    }

    return pipeline;
  };
}