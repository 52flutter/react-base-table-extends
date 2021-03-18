"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnRangeHover = columnRangeHover;

var _utils = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EMPTY_RANGE = {
  start: -1,
  end: -1
};

function columnRangeHover() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var stateKey = 'columnHover';
  return function columnRangeHoverStep(pipeline) {
    var _ref, _ref2, _opts$hoverRange, _opts$hoverColor, _opts$headerHoverColo;

    var hoverRange = (_ref = (_ref2 = (_opts$hoverRange = opts.hoverRange) !== null && _opts$hoverRange !== void 0 ? _opts$hoverRange : pipeline.getStateAtKey(stateKey)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultHoverRange) !== null && _ref !== void 0 ? _ref : EMPTY_RANGE;
    var hoverColor = (_opts$hoverColor = opts.hoverColor) !== null && _opts$hoverColor !== void 0 ? _opts$hoverColor : 'var(--hover-bgcolor)';
    var headerHoverColor = (_opts$headerHoverColo = opts.headerHoverColor) !== null && _opts$headerHoverColo !== void 0 ? _opts$headerHoverColo : 'var(--header-hover-bgcolor)';

    var onChangeHoverRange = function onChangeHoverRange(nextColIndexRange) {
      var _opts$onChangeHoverRa;

      pipeline.setStateAtKey(stateKey, nextColIndexRange);
      (_opts$onChangeHoverRa = opts.onChangeHoverRange) === null || _opts$onChangeHoverRa === void 0 ? void 0 : _opts$onChangeHoverRa.call(opts, nextColIndexRange);
    };

    return pipeline.mapColumns((0, _utils.makeRecursiveMapper)(function (col, _ref3) {
      var startIndex = _ref3.startIndex,
          endIndex = _ref3.endIndex;
      var colRange = {
        start: startIndex,
        end: endIndex
      };
      var match = colRange.end > hoverRange.start && hoverRange.end > colRange.start;

      if (!(0, _utils.isLeafNode)(col)) {
        if (headerHoverColor == null) {
          return col;
        }

        pipeline.appendTableProps('headerCellProps', function (args) {
          var column = args.column;

          if (column.key === col.key) {
            return {
              onMouseEnter: function onMouseEnter() {
                onChangeHoverRange(colRange);
              },
              onMouseLeave: function onMouseLeave() {
                onChangeHoverRange(EMPTY_RANGE);
              },
              style: {
                backgroundColor: match ? headerHoverColor : undefined
              }
            };
          }

          return null;
        });
        return _objectSpread({}, col);
      }

      pipeline.appendTableProps('headerCellProps', function (args) {
        var column = args.column;

        if (column.key === col.key) {
          return {
            onMouseEnter: function onMouseEnter() {
              onChangeHoverRange(colRange);
            },
            onMouseLeave: function onMouseLeave() {
              onChangeHoverRange(EMPTY_RANGE);
            },
            style: {
              backgroundColor: match ? headerHoverColor : undefined
            }
          };
        }

        return null;
      });
      pipeline.appendTableProps('cellProps', function (args) {
        var column = args.column;

        if (column.key === col.key) {
          return {
            onMouseEnter: function onMouseEnter() {
              onChangeHoverRange(colRange);
            },
            onMouseLeave: function onMouseLeave() {
              onChangeHoverRange(EMPTY_RANGE);
            },
            style: {
              backgroundColor: match ? hoverColor : undefined
            }
          };
        }

        return null;
      });
      return _objectSpread({}, col);
    }));
  };
}