import React from 'react';
import PropTypes from 'prop-types';
/**
 * HeaderCell component for BaseTable
 */

var TableHeaderCell = function TableHeaderCell(_ref) {
  var className = _ref.className,
      column = _ref.column,
      columnIndex = _ref.columnIndex;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, column.title);
};

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  column: PropTypes.object,
  columnIndex: PropTypes.number
};
export default TableHeaderCell;