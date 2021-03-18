"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.isValidElement(cellData) ? cellData : (0, _utils.toString)(cellData));
};

TableCell.propTypes = {
  className: _propTypes.default.string,
  cellData: _propTypes.default.any,
  column: _propTypes.default.object,
  columnIndex: _propTypes.default.number,
  rowData: _propTypes.default.object,
  rowIndex: _propTypes.default.number
};
var _default = TableCell;
exports.default = _default;