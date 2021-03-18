function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SortOrder from './SortOrder';
/**
 * default SortIndicator for BaseTable
 */

var SortIndicator = function SortIndicator(_ref) {
  var sortOrder = _ref.sortOrder,
      className = _ref.className,
      style = _ref.style;
  var cls = cn('BaseTable__sort-indicator', className, {
    'BaseTable__sort-indicator--descending': sortOrder === SortOrder.DESC
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: _objectSpread({
      userSelect: 'none',
      width: '16px',
      height: '16px',
      lineHeight: '16px',
      textAlign: 'center'
    }, style)
  }, sortOrder === SortOrder.DESC ? "\u2193" : "\u2191");
};

SortIndicator.propTypes = {
  sortOrder: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
  className: PropTypes.string,
  style: PropTypes.object
};
export default SortIndicator;