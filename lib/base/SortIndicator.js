"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SortOrder = _interopRequireDefault(require("./SortOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * default SortIndicator for BaseTable
 */
var SortIndicator = function SortIndicator(_ref) {
  var sortOrder = _ref.sortOrder,
      className = _ref.className,
      style = _ref.style;
  var cls = (0, _classnames.default)('BaseTable__sort-indicator', className, {
    'BaseTable__sort-indicator--descending': sortOrder === _SortOrder.default.DESC
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: cls,
    style: _objectSpread({
      userSelect: 'none',
      width: '16px',
      height: '16px',
      lineHeight: '16px',
      textAlign: 'center'
    }, style)
  }, sortOrder === _SortOrder.default.DESC ? "\u2193" : "\u2191");
};

SortIndicator.propTypes = {
  sortOrder: _propTypes.default.oneOf([_SortOrder.default.ASC, _SortOrder.default.DESC]),
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
var _default = SortIndicator;
exports.default = _default;