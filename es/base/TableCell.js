import React from 'react';
import PropTypes from 'prop-types';
import { toString } from './utils';
/**
 * Cell component for BaseTable
 */

var TableCell = function TableCell(_ref) {
  var className = _ref.className,
      cellData = _ref.cellData,
      column = _ref.column,
      columnIndex = _ref.columnIndex,
      rowData = _ref.rowData,
      rowIndex = _ref.rowIndex;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.isValidElement(cellData) ? cellData : toString(cellData));
};

TableCell.propTypes = {
  className: PropTypes.string,
  cellData: PropTypes.any,
  column: PropTypes.object,
  columnIndex: PropTypes.number,
  rowData: PropTypes.object,
  rowIndex: PropTypes.number
};
export default TableCell;