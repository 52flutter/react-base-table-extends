"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnHover = columnHover;

var _utils = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function columnHover() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var stateKey = 'columnHover';
  return function (pipeline) {
    var _opts$hoverColor, _ref, _ref2, _opts$hoverColIndex;

    var hoverColor = (_opts$hoverColor = opts.hoverColor) !== null && _opts$hoverColor !== void 0 ? _opts$hoverColor : 'var(--hover-bgcolor)';
    var hoverColIndex = (_ref = (_ref2 = (_opts$hoverColIndex = opts.hoverColIndex) !== null && _opts$hoverColIndex !== void 0 ? _opts$hoverColIndex : pipeline.getStateAtKey(stateKey)) !== null && _ref2 !== void 0 ? _ref2 : opts.defaultHoverColIndex) !== null && _ref !== void 0 ? _ref : -1;

    var onChangeHoverColIndex = function onChangeHoverColIndex(nextColIndex) {
      var _opts$onChangeHoverCo;

      pipeline.setStateAtKey(stateKey, nextColIndex);
      (_opts$onChangeHoverCo = opts.onChangeHoverColIndex) === null || _opts$onChangeHoverCo === void 0 ? void 0 : _opts$onChangeHoverCo.call(opts, nextColIndex);
    };

    return pipeline.mapColumns((0, _utils.makeRecursiveMapper)(function (col, _ref3) {
      var startIndex = _ref3.startIndex,
          endIndex = _ref3.endIndex;
      var range = {
        start: startIndex,
        end: endIndex
      };

      if (!(0, _utils.isLeafNode)(col)) {
        return col;
      }

      var colIndexMatched = range.start <= hoverColIndex && hoverColIndex < range.end;
      pipeline.appendTableProps('cellProps', function (args) {
        var column = args.column;

        if (column.key === col.key) {
          return {
            style: {
              backgroundColor: colIndexMatched ? hoverColor : undefined
            },
            onMouseEnter: function onMouseEnter() {
              onChangeHoverColIndex(range.start);
            },
            onMouseLeave: function onMouseLeave() {
              onChangeHoverColIndex(-1);
            }
          };
        }

        return null;
      });
      return _objectSpread({}, col);
    }));
  };
}