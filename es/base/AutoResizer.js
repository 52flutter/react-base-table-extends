import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
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
    return /*#__PURE__*/React.createElement("div", {
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

  return /*#__PURE__*/React.createElement(AutoSizer, {
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
  className: PropTypes.string,

  /**
   * the width of the component, will be the container's width if not set
   */
  width: PropTypes.number,

  /**
   * the height of the component, will be the container's width if not set
   */
  height: PropTypes.number,

  /**
   * A callback function to render the children component
   * The handler is of the shape of `({ width, height }) => node`
   */
  children: PropTypes.func.isRequired,

  /**
   * A callback function when the size of the table container changed if the width and height are not set
   * The handler is of the shape of `({ width, height }) => *`
   */
  onResize: PropTypes.func
};
export default AutoResizer;