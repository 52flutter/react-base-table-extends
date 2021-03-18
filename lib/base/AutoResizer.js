"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualizedAutoSizer = _interopRequireDefault(require("react-virtualized-auto-sizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Decorator component that automatically adjusts the width and height of a single child
 */
var AutoResizer = function AutoResizer(_ref) {
  var className = _ref.className,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children,
      onResize = _ref.onResize;
  var disableWidth = typeof width === 'number';
  var disableHeight = typeof height === 'number';

  if (disableWidth && disableHeight) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      style: {
        width: width,
        height: height,
        position: 'relative'
      }
    }, children({
      width: width,
      height: height
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_reactVirtualizedAutoSizer.default, {
    className: className,
    disableWidth: disableWidth,
    disableHeight: disableHeight,
    onResize: onResize
  }, function (size) {
    return children({
      width: disableWidth ? width : size.width,
      height: disableHeight ? height : size.height
    });
  });
};

AutoResizer.propTypes = {
  /**
   * Class name for the component
   */
  className: _propTypes.default.string,

  /**
   * the width of the component, will be the container's width if not set
   */
  width: _propTypes.default.number,

  /**
   * the height of the component, will be the container's width if not set
   */
  height: _propTypes.default.number,

  /**
   * A callback function to render the children component
   * The handler is of the shape of `({ width, height }) => node`
   */
  children: _propTypes.default.func.isRequired,

  /**
   * A callback function when the size of the table container changed if the width and height are not set
   * The handler is of the shape of `({ width, height }) => *`
   */
  onResize: _propTypes.default.func
};
var _default = AutoResizer;
exports.default = _default;