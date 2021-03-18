function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { renderElement } from './utils';
/**
 * HeaderRow component for BaseTable
 */

var TableHeaderRow = function TableHeaderRow(_ref) {
  var className = _ref.className,
      style = _ref.style,
      columns = _ref.columns,
      headerIndex = _ref.headerIndex,
      cellRenderer = _ref.cellRenderer,
      headerRenderer = _ref.headerRenderer,
      expandColumnKey = _ref.expandColumnKey,
      ExpandIcon = _ref.expandIcon,
      Tag = _ref.tagName,
      rest = _objectWithoutProperties(_ref, ["className", "style", "columns", "headerIndex", "cellRenderer", "headerRenderer", "expandColumnKey", "expandIcon", "tagName"]);

  var cells = columns.map(function (column, columnIndex) {
    return cellRenderer({
      columns: columns,
      column: column,
      columnIndex: columnIndex,
      headerIndex: headerIndex,
      expandIcon: column.key === expandColumnKey && /*#__PURE__*/React.createElement(ExpandIcon, null)
    });
  });

  if (headerRenderer) {
    cells = renderElement(headerRenderer, {
      cells: cells,
      columns: columns,
      headerIndex: headerIndex
    });
  }

  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    className: className,
    style: style
  }), cells);
};

TableHeaderRow.defaultProps = {
  tagName: 'div'
};
TableHeaderRow.propTypes = {
  isScrolling: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerIndex: PropTypes.number,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  expandColumnKey: PropTypes.string,
  expandIcon: PropTypes.func,
  tagName: PropTypes.elementType
};
export default TableHeaderRow;