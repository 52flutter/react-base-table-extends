function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from 'react';
import PropTypes from 'prop-types';
import { renderElement } from './utils';
/**
 * Row component for BaseTable
 */

var TableRow = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableRow, _React$PureComponent);

  var _super = _createSuper(TableRow);

  function TableRow(props) {
    var _this;

    _classCallCheck(this, TableRow);

    _this = _super.call(this, props);
    _this.state = {
      measured: false
    };
    _this._setRef = _this._setRef.bind(_assertThisInitialized(_this));
    _this._handleExpand = _this._handleExpand.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableRow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.estimatedRowHeight && this.props.rowIndex >= 0 && this._measureHeight(true);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.props.estimatedRowHeight && this.props.rowIndex >= 0 && // should not re-measure if it's updated after measured and reset
      !this.props.getIsResetting() && this.state.measured && prevState.measured) {
        this.setState({
          measured: false
        }, function () {
          return _this2._measureHeight();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _this$props = this.props,
          isScrolling = _this$props.isScrolling,
          className = _this$props.className,
          style = _this$props.style,
          columns = _this$props.columns,
          rowIndex = _this$props.rowIndex,
          rowData = _this$props.rowData,
          expandColumnKey = _this$props.expandColumnKey,
          depth = _this$props.depth,
          rowEventHandlers = _this$props.rowEventHandlers,
          estimatedRowHeight = _this$props.estimatedRowHeight,
          rowRenderer = _this$props.rowRenderer,
          cellRenderer = _this$props.cellRenderer,
          expandIconRenderer = _this$props.expandIconRenderer,
          Tag = _this$props.tagName,
          rowKey = _this$props.rowKey,
          getIsResetting = _this$props.getIsResetting,
          onRowHover = _this$props.onRowHover,
          onRowExpand = _this$props.onRowExpand,
          onRowHeightChange = _this$props.onRowHeightChange,
          rest = _objectWithoutProperties(_this$props, ["isScrolling", "className", "style", "columns", "rowIndex", "rowData", "expandColumnKey", "depth", "rowEventHandlers", "estimatedRowHeight", "rowRenderer", "cellRenderer", "expandIconRenderer", "tagName", "rowKey", "getIsResetting", "onRowHover", "onRowExpand", "onRowHeightChange"]);
      /* eslint-enable no-unused-vars */


      var expandIcon = expandIconRenderer({
        rowData: rowData,
        rowIndex: rowIndex,
        depth: depth,
        onExpand: this._handleExpand
      });
      var cells = columns.map(function (column, columnIndex) {
        return cellRenderer({
          isScrolling: isScrolling,
          columns: columns,
          column: column,
          columnIndex: columnIndex,
          rowData: rowData,
          rowIndex: rowIndex,
          expandIcon: column.key === expandColumnKey && expandIcon
        });
      });

      if (rowRenderer) {
        cells = renderElement(rowRenderer, {
          isScrolling: isScrolling,
          cells: cells,
          columns: columns,
          rowData: rowData,
          rowIndex: rowIndex,
          depth: depth
        });
      }

      var eventHandlers = this._getEventHandlers(rowEventHandlers);

      if (estimatedRowHeight && rowIndex >= 0) {
        var height = style.height,
            otherStyles = _objectWithoutProperties(style, ["height"]);

        return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
          ref: this._setRef,
          className: className,
          style: this.state.measured ? style : otherStyles
        }, this.state.measured && eventHandlers), cells);
      }

      return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
        className: className,
        style: style
      }, eventHandlers), cells);
    }
  }, {
    key: "_setRef",
    value: function _setRef(ref) {
      this.ref = ref;
    }
  }, {
    key: "_handleExpand",
    value: function _handleExpand(expanded) {
      var _this$props2 = this.props,
          onRowExpand = _this$props2.onRowExpand,
          rowData = _this$props2.rowData,
          rowIndex = _this$props2.rowIndex,
          rowKey = _this$props2.rowKey;
      onRowExpand && onRowExpand({
        expanded: expanded,
        rowData: rowData,
        rowIndex: rowIndex,
        rowKey: rowKey
      });
    }
  }, {
    key: "_measureHeight",
    value: function _measureHeight(initialMeasure) {
      if (!this.ref) return;
      var _this$props3 = this.props,
          style = _this$props3.style,
          rowKey = _this$props3.rowKey,
          onRowHeightChange = _this$props3.onRowHeightChange,
          rowIndex = _this$props3.rowIndex,
          columns = _this$props3.columns;
      var height = this.ref.getBoundingClientRect().height;
      this.setState({
        measured: true
      }, function () {
        if (initialMeasure || height !== style.height) onRowHeightChange(rowKey, height, rowIndex, columns[0] && !columns[0].__placeholder__ && columns[0].frozen);
      });
    }
  }, {
    key: "_getEventHandlers",
    value: function _getEventHandlers() {
      var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props4 = this.props,
          rowData = _this$props4.rowData,
          rowIndex = _this$props4.rowIndex,
          rowKey = _this$props4.rowKey,
          onRowHover = _this$props4.onRowHover;
      var eventHandlers = {};
      Object.keys(handlers).forEach(function (eventKey) {
        var callback = handlers[eventKey];

        if (typeof callback === 'function') {
          eventHandlers[eventKey] = function (event) {
            callback({
              rowData: rowData,
              rowIndex: rowIndex,
              rowKey: rowKey,
              event: event
            });
          };
        }
      });

      if (onRowHover) {
        var mouseEnterHandler = eventHandlers['onMouseEnter'];

        eventHandlers['onMouseEnter'] = function (event) {
          onRowHover({
            hovered: true,
            rowData: rowData,
            rowIndex: rowIndex,
            rowKey: rowKey,
            event: event
          });
          mouseEnterHandler && mouseEnterHandler(event);
        };

        var mouseLeaveHandler = eventHandlers['onMouseLeave'];

        eventHandlers['onMouseLeave'] = function (event) {
          onRowHover({
            hovered: false,
            rowData: rowData,
            rowIndex: rowIndex,
            rowKey: rowKey,
            event: event
          });
          mouseLeaveHandler && mouseLeaveHandler(event);
        };
      }

      return eventHandlers;
    }
  }]);

  return TableRow;
}(React.PureComponent);

TableRow.defaultProps = {
  tagName: 'div'
};
TableRow.propTypes = {
  isScrolling: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expandColumnKey: PropTypes.string,
  depth: PropTypes.number,
  rowEventHandlers: PropTypes.object,
  rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  cellRenderer: PropTypes.func,
  expandIconRenderer: PropTypes.func,
  estimatedRowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  getIsResetting: PropTypes.func,
  onRowHover: PropTypes.func,
  onRowExpand: PropTypes.func,
  onRowHeightChange: PropTypes.func,
  tagName: PropTypes.elementType
};
export default TableRow;