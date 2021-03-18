function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from 'react';
import PropTypes from 'prop-types';
export var Alignment = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
};
export var FrozenDirection = {
  LEFT: 'left',
  RIGHT: 'right',
  DEFAULT: true,
  NONE: false
};
/**
 * Column for BaseTable
 */

var Column = /*#__PURE__*/function (_React$Component) {
  _inherits(Column, _React$Component);

  var _super = _createSuper(Column);

  function Column() {
    _classCallCheck(this, Column);

    return _super.apply(this, arguments);
  }

  return Column;
}(React.Component);

Column.propTypes = {
  /**
   * Class name for the column cell, could be a callback to return the class name
   * The callback is of the shape of `({ cellData, columns, column, columnIndex, rowData, rowIndex }) => string`
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Class name for the column header, could be a callback to return the class name
   * The callback is of the shape of `({ columns, column, columnIndex, headerIndex }) => string`
   */
  headerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Custom style for the column cell, including the header cells
   */
  style: PropTypes.object,

  /**
   * Title for the column header
   */
  title: PropTypes.string,

  /**
   * Data key for the column cell, could be "a.b.c"
   */
  dataKey: PropTypes.string,

  /**
   * Custom cell data getter
   * The handler is of the shape of `({ columns, column, columnIndex, rowData, rowIndex }) => node`
   */
  dataGetter: PropTypes.func,

  /**
   * Alignment of the column cell
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * Flex grow style, defaults to 0
   */
  flexGrow: PropTypes.number,

  /**
   * Flex shrink style, defaults to 1 for flexible table and 0 for fixed table
   */
  flexShrink: PropTypes.number,

  /**
   * The width of the column, gutter width is not included
   */
  width: PropTypes.number.isRequired,

  /**
   * Maximum width of the column, used if the column is resizable
   */
  maxWidth: PropTypes.number,

  /**
   * Minimum width of the column, used if the column is resizable
   */
  minWidth: PropTypes.number,

  /**
   * Whether the column is frozen and what's the frozen side
   */
  frozen: PropTypes.oneOf(['left', 'right', true, false]),

  /**
   * Whether the column is hidden
   */
  hidden: PropTypes.bool,

  /**
   * Whether the column is resizable, defaults to false
   */
  resizable: PropTypes.bool,

  /**
   * Whether the column is sortable, defaults to false
   */
  sortable: PropTypes.bool,

  /**
   * Custom column cell renderer
   * The renderer receives props `{ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }`
   */
  cellRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Custom column header renderer
   * The renderer receives props `{ columns, column, columnIndex, headerIndex, container }`
   */
  headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
Column.Alignment = Alignment;
Column.FrozenDirection = FrozenDirection;
export default Column;