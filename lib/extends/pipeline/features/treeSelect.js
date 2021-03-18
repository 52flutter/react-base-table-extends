"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treeSelect = treeSelect;

var _react = _interopRequireDefault(require("react"));

var _StrictTreeDataHelper = _interopRequireDefault(require("../utils/StrictTreeDataHelper"));

var _TreeDataHelper = _interopRequireDefault(require("../utils/TreeDataHelper"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STATE_KEY = 'treeSelect';

function treeSelect(opts) {
  return function treeSelectStep(pipeline) {
    var _opts$clickArea, _opts$isDisabled, _opts$idDetached, _ref, _ref2, _opts$value, _ref3, _opts$checkedStrategy, _opts$checkboxPlaceme;

    var Checkbox = pipeline.ctx.components.Checkbox;

    if (Checkbox == null) {
      throw new Error('使用 treeSelect 之前需要通过 pipeline context 设置 components.Checkbox');
    }

    var primaryKey = pipeline.ensurePrimaryKey('treeSelect');

    if (typeof primaryKey !== 'string') {
      throw new Error('treeSelect 仅支持字符串作为 primaryKey');
    }

    var clickArea = (_opts$clickArea = opts.clickArea) !== null && _opts$clickArea !== void 0 ? _opts$clickArea : 'checkbox';
    var isDisabled = (_opts$isDisabled = opts.isDisabled) !== null && _opts$isDisabled !== void 0 ? _opts$isDisabled : (0, _utils.always)(false);
    var isDetached = (_opts$idDetached = opts.idDetached) !== null && _opts$idDetached !== void 0 ? _opts$idDetached : (0, _utils.always)(false);
    var value = (_ref = (_ref2 = (_opts$value = opts.value) !== null && _opts$value !== void 0 ? _opts$value : pipeline.getStateAtKey(STATE_KEY)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultValue) !== null && _ref !== void 0 ? _ref : [];
    var tree = opts.rootKey != null ? [(_ref3 = {}, _defineProperty(_ref3, primaryKey, opts.rootKey), _defineProperty(_ref3, "children", opts.tree), _ref3)] : opts.tree;

    var getNodeValue = function getNodeValue(node) {
      return node[primaryKey];
    };

    var treeDataHelper = opts.checkStrictly ? new _StrictTreeDataHelper.default({
      value: value,
      getNodeValue: getNodeValue,
      tree: tree
    }) : new _TreeDataHelper.default({
      value: value,
      getNodeValue: getNodeValue,
      isDetached: isDetached,
      tree: tree,
      checkedStrategy: (_opts$checkedStrategy = opts.checkedStrategy) !== null && _opts$checkedStrategy !== void 0 ? _opts$checkedStrategy : 'parent'
    });

    var onToggleKey = function onToggleKey(key) {
      var _opts$onChange;

      var nextValue = treeDataHelper.getValueAfterToggle(key);
      pipeline.setStateAtKey(STATE_KEY, nextValue);
      (_opts$onChange = opts.onChange) === null || _opts$onChange === void 0 ? void 0 : _opts$onChange.call(opts, nextValue);
    };

    var makeCheckbox = function makeCheckbox(key, root, row) {
      return /*#__PURE__*/_react.default.createElement(Checkbox, {
        checked: treeDataHelper.isChecked(key),
        indeterminate: treeDataHelper.isIndeterminate(key),
        disabled: !root && isDisabled(row),
        onChange: clickArea === 'checkbox' || root ? function () {
          return onToggleKey(key);
        } : undefined
      });
    };

    var checkboxColumn = _objectSpread(_objectSpread({
      width: 50,
      key: '__treeSelect__',
      align: 'center',
      headerRenderer: opts.rootKey != null ? makeCheckbox(opts.rootKey, true) : undefined
    }, opts.checkboxColumn), {}, {
      cellRenderer: function cellRenderer(arg) {
        var record = arg.rowData;
        return makeCheckbox(record[primaryKey], false, record);
      }
    });

    pipeline.appendTableProps('cellProps', function (args) {
      var rowData = args.rowData,
          column = args.column;

      if (column.key === checkboxColumn.key) {
        var rowKey = rowData[primaryKey];

        if (clickArea !== 'cell') {
          return null;
        }

        var disabled = isDisabled(rowData);

        if (disabled) {
          return {
            style: {
              cursor: 'not-allowed'
            }
          };
        }

        return {
          style: {
            cursor: 'pointer'
          },
          onClick: function onClick(e) {
            if (opts.stopClickEventPropagation) {
              e.stopPropagation();
            }

            onToggleKey(rowKey);
          }
        };
      }

      return null;
    });
    var nextColumns = pipeline.getColumns().slice();
    var checkboxPlacement = (_opts$checkboxPlaceme = opts.checkboxPlacement) !== null && _opts$checkboxPlaceme !== void 0 ? _opts$checkboxPlaceme : 'start';

    if (checkboxPlacement === 'start') {
      nextColumns.unshift(checkboxColumn);
    } else {
      nextColumns.push(checkboxColumn);
    }

    pipeline.columns(nextColumns);

    if (clickArea === 'row') {
      pipeline.appendRowEventHandlers('onClick', function (_ref4) {
        var rowData = _ref4.rowData,
            rowIndex = _ref4.rowIndex,
            event = _ref4.event;
        var disabled = isDisabled(rowData);

        if (!disabled) {
          if (opts.stopClickEventPropagation) {
            event.stopPropagation();
          }

          onToggleKey(rowData[primaryKey]);
        }
      });
    }

    if (opts.highlightRowWhenSelected) {
      pipeline.appendTableProps('rowClassName', function (args) {
        if (treeDataHelper.isChecked(args.rowData[primaryKey])) {
          return 'highlight';
        }

        return '';
      });
    }

    return pipeline;
  };
}