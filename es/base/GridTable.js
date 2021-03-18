function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import cn from 'classnames';
import { FixedSizeGrid, VariableSizeGrid } from 'react-window';
import memoize from 'memoize-one';
import Header from './TableHeader';
import { getEstimatedTotalRowsHeight, isObjectEqual } from './utils';
/**
 * A wrapper of the Grid for internal only
 */

var GridTable = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(GridTable, _React$PureComponent);

  var _super = _createSuper(GridTable);

  function GridTable(props) {
    var _this;

    _classCallCheck(this, GridTable);

    _this = _super.call(this, props);

    _this.onDivScroll = function (event) {
      var _event$currentTarget = event.currentTarget,
          scrollLeft = _event$currentTarget.scrollLeft,
          scrollTop = _event$currentTarget.scrollTop; // console.log('onDivScroll', event, scrollWidth, scrollLeft, clientWidth);

      _this.props.onScroll && _this.props.onScroll({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      });
    };

    _this._setDivBodyRef = _this._setDivBodyRef.bind(_assertThisInitialized(_this));
    _this._setHeaderRef = _this._setHeaderRef.bind(_assertThisInitialized(_this));
    _this._setBodyRef = _this._setBodyRef.bind(_assertThisInitialized(_this));
    _this._setInnerRef = _this._setInnerRef.bind(_assertThisInitialized(_this));
    _this._itemKey = _this._itemKey.bind(_assertThisInitialized(_this));
    _this._getBodyWidth = _this._getBodyWidth.bind(_assertThisInitialized(_this));
    _this._handleItemsRendered = _this._handleItemsRendered.bind(_assertThisInitialized(_this));
    _this._resetColumnWidthCache = memoize(function (bodyWidth) {
      if (!_this.props.estimatedRowHeight) return;
      _this.bodyRef && _this.bodyRef.resetAfterColumnIndex(0, false);
    });
    _this._getEstimatedTotalRowsHeight = memoize(getEstimatedTotalRowsHeight);
    _this.renderRow = _this.renderRow.bind(_assertThisInitialized(_this));
    _this.lastScrollArgs = {};
    return _this;
  }

  _createClass(GridTable, [{
    key: "resetAfterRowIndex",
    value: function resetAfterRowIndex() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var shouldForceUpdate = arguments.length > 1 ? arguments[1] : undefined;
      if (!this.props.estimatedRowHeight) return;
      this.bodyRef && this.bodyRef.resetAfterRowIndex(rowIndex, shouldForceUpdate);
    }
  }, {
    key: "forceUpdateTable",
    value: function forceUpdateTable() {
      this.headerRef && this.headerRef.forceUpdate();
      this.bodyRef && this.bodyRef.forceUpdate();
    }
  }, {
    key: "scrollToPosition",
    value: function scrollToPosition(args) {
      this.headerRef && this.headerRef.scrollTo(args.scrollLeft);

      if (isObjectEqual(this.lastScrollArgs, args)) {
        return;
      }

      if (this.divBodyRef) {
        this.divBodyRef.scrollTop = args.scrollTop;
        this.divBodyRef.scrollLeft = args.scrollLeft;
      } else {
        this.bodyRef && this.bodyRef.scrollTo(args);
      }

      this.lastScrollArgs = _objectSpread(_objectSpread({}, this.lastScrollArgs), args);
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop(scrollTop) {
      if (this.lastScrollArgs && this.lastScrollArgs.scrollTop === scrollTop) {
        return;
      }

      this.lastScrollArgs = _objectSpread(_objectSpread({}, this.lastScrollArgs), {}, {
        scrollTop: scrollTop
      });

      if (this.divBodyRef) {
        this.divBodyRef.scrollTop = scrollTop;
      } else {
        this.bodyRef && this.bodyRef.scrollTo({
          scrollTop: scrollTop
        });
      }
    }
  }, {
    key: "scrollToLeft",
    value: function scrollToLeft(scrollLeft) {
      this.headerRef && this.headerRef.scrollTo(scrollLeft);

      if (this.lastScrollArgs && this.lastScrollArgs.scrollLeft === scrollLeft) {
        return;
      }

      this.lastScrollArgs = _objectSpread(_objectSpread({}, this.lastScrollArgs), {}, {
        scrollLeft: scrollLeft
      });

      if (this.divBodyRef) {
        this.divBodyRef.scrollLeft = scrollLeft;
      } else {
        this.bodyRef && this.bodyRef.scrollToPosition({
          scrollLeft: scrollLeft
        });
      }
    }
  }, {
    key: "scrollToRow",
    value: function scrollToRow() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';

      if (!this.divBodyRef) {
        this.bodyRef && this.bodyRef.scrollToItem({
          rowIndex: rowIndex,
          align: align
        });
      } else {
        var scrollTop = 0;
        var _this$props = this.props,
            _this$props$data = _this$props.data,
            data = _this$props$data === void 0 ? [] : _this$props$data,
            rowHeight = _this$props.rowHeight,
            estimatedRowHeight = _this$props.estimatedRowHeight,
            width = _this$props.width;
        var newData = data.concat([]).splice(0, rowIndex > data.length ? data.length - 1 : rowIndex);

        if (estimatedRowHeight) {
          scrollTop = this._getEstimatedTotalRowsHeight(newData, estimatedRowHeight);
        } else {
          scrollTop = newData.length * rowHeight;
        }

        console.log('scrollTop', scrollTop);
        this.divBodyRef.scrollTop = scrollTop;

        if (align === 'start') {
          this.divBodyRef.scrollLeft = 0;
        } else if (align === 'center') {
          this.divBodyRef.scrollLeft = width / 2;
        } else if (align === 'end') {
          this.divBodyRef.scrollLeft = width;
        }
      }
    }
  }, {
    key: "getTotalRowsHeight",
    value: function getTotalRowsHeight() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          rowHeight = _this$props2.rowHeight,
          estimatedRowHeight = _this$props2.estimatedRowHeight;

      if (estimatedRowHeight) {
        return this.innerRef && this.innerRef.clientHeight || this._getEstimatedTotalRowsHeight(data, estimatedRowHeight);
      }

      return data.length * rowHeight;
    }
  }, {
    key: "renderRow",
    value: function renderRow(args) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          columns = _this$props3.columns,
          rowRenderer = _this$props3.rowRenderer;
      var rowData = data[args.rowIndex];
      return rowRenderer(_objectSpread(_objectSpread({}, args), {}, {
        columns: columns,
        rowData: rowData
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          containerStyle = _this$props4.containerStyle,
          classPrefix = _this$props4.classPrefix,
          className = _this$props4.className,
          data = _this$props4.data,
          frozenData = _this$props4.frozenData,
          width = _this$props4.width,
          height = _this$props4.height,
          rowHeight = _this$props4.rowHeight,
          estimatedRowHeight = _this$props4.estimatedRowHeight,
          getRowHeight = _this$props4.getRowHeight,
          headerWidth = _this$props4.headerWidth,
          bodyWidth = _this$props4.bodyWidth,
          useIsScrolling = _this$props4.useIsScrolling,
          onScroll = _this$props4.onScroll,
          hoveredRowKey = _this$props4.hoveredRowKey,
          overscanRowCount = _this$props4.overscanRowCount,
          style = _this$props4.style,
          virtual = _this$props4.virtual,
          onScrollbarPresenceChange = _this$props4.onScrollbarPresenceChange,
          rest = _objectWithoutProperties(_this$props4, ["containerStyle", "classPrefix", "className", "data", "frozenData", "width", "height", "rowHeight", "estimatedRowHeight", "getRowHeight", "headerWidth", "bodyWidth", "useIsScrolling", "onScroll", "hoveredRowKey", "overscanRowCount", "style", "virtual", "onScrollbarPresenceChange"]);

      var headerHeight = this._getHeaderHeight();

      var frozenRowCount = frozenData.length;
      var frozenRowsHeight = rowHeight * frozenRowCount;
      var cls = cn("".concat(classPrefix, "__table"), className);
      var containerProps = containerStyle ? {
        style: containerStyle
      } : null;
      var Grid = estimatedRowHeight ? VariableSizeGrid : FixedSizeGrid;

      this._resetColumnWidthCache(bodyWidth);

      var isVirtual = virtual === undefined ? data.length > 100 ? true : false : virtual; // isVirtual = false;

      if (useIsScrolling === true || this.props.onEndReached) {
        isVirtual = true;
      }

      return /*#__PURE__*/React.createElement("div", _extends({
        role: "table",
        className: cls
      }, containerProps), isVirtual === false ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(classPrefix, "__body"),
        ref: this._setDivBodyRef,
        style: {
          width: width,
          height: Math.max(height - headerHeight - frozenRowsHeight, 0),
          overflowY: 'auto',
          overflowX: bodyWidth > width ? 'auto' : 'hidden'
        },
        onScroll: this.onDivScroll
      }, /*#__PURE__*/React.createElement(Grid, _extends({}, rest, {
        style: {
          overflow: 'hidden'
        },
        ref: this._setBodyRef,
        innerRef: this._setInnerRef,
        itemKey: this._itemKey,
        data: data,
        frozenData: frozenData,
        width: bodyWidth,
        height: this.getTotalRowsHeight(),
        rowHeight: estimatedRowHeight ? getRowHeight : rowHeight,
        estimatedRowHeight: typeof estimatedRowHeight === 'function' ? undefined : estimatedRowHeight,
        rowCount: data.length,
        overscanRowCount: overscanRowCount,
        columnWidth: estimatedRowHeight ? this._getBodyWidth : bodyWidth,
        columnCount: 1,
        overscanColumnCount: 0,
        useIsScrolling: useIsScrolling,
        hoveredRowKey: hoveredRowKey,
        onScroll: isVirtual === false ? undefined : onScroll,
        onItemsRendered: this._handleItemsRendered,
        children: this.renderRow
      }))) : /*#__PURE__*/React.createElement(Grid, _extends({}, rest, {
        className: "".concat(classPrefix, "__body"),
        ref: this._setBodyRef,
        innerRef: this._setInnerRef,
        itemKey: this._itemKey,
        data: data,
        frozenData: frozenData,
        width: width,
        height: Math.max(height - headerHeight - frozenRowsHeight, 0),
        rowHeight: estimatedRowHeight ? getRowHeight : rowHeight,
        estimatedRowHeight: typeof estimatedRowHeight === 'function' ? undefined : estimatedRowHeight,
        rowCount: data.length,
        overscanRowCount: overscanRowCount,
        columnWidth: estimatedRowHeight ? this._getBodyWidth : bodyWidth,
        columnCount: 1,
        overscanColumnCount: 0,
        useIsScrolling: useIsScrolling,
        hoveredRowKey: hoveredRowKey,
        onScroll: onScroll,
        onItemsRendered: this._handleItemsRendered,
        children: this.renderRow
      })), headerHeight + frozenRowsHeight > 0 &&
      /*#__PURE__*/
      // put header after body and reverse the display order via css
      // to prevent header's shadow being covered by body
      React.createElement(Header, _extends({}, rest, {
        className: "".concat(classPrefix, "__header"),
        ref: this._setHeaderRef,
        data: data,
        frozenData: frozenData,
        width: width,
        height: Math.min(headerHeight + frozenRowsHeight, height),
        rowWidth: headerWidth,
        rowHeight: rowHeight,
        headerHeight: this.props.headerHeight,
        headerRenderer: this.props.headerRenderer,
        rowRenderer: this.props.rowRenderer,
        hoveredRowKey: frozenRowCount > 0 ? hoveredRowKey : null
      })));
    }
  }, {
    key: "_setDivBodyRef",
    value: function _setDivBodyRef(ref) {
      this.divBodyRef = ref;
    }
  }, {
    key: "_setHeaderRef",
    value: function _setHeaderRef(ref) {
      this.headerRef = ref;
    }
  }, {
    key: "_setBodyRef",
    value: function _setBodyRef(ref) {
      this.bodyRef = ref;
    }
  }, {
    key: "_setInnerRef",
    value: function _setInnerRef(ref) {
      this.innerRef = ref;
    }
  }, {
    key: "_itemKey",
    value: function _itemKey(_ref) {
      var rowIndex = _ref.rowIndex;
      var _this$props5 = this.props,
          data = _this$props5.data,
          rowKey = _this$props5.rowKey;
      return data[rowIndex][rowKey];
    }
  }, {
    key: "_getHeaderHeight",
    value: function _getHeaderHeight() {
      var headerHeight = this.props.headerHeight;

      if (Array.isArray(headerHeight)) {
        return headerHeight.reduce(function (sum, height) {
          return sum + height;
        }, 0);
      }

      return headerHeight;
    }
  }, {
    key: "_getBodyWidth",
    value: function _getBodyWidth() {
      return this.props.bodyWidth;
    }
  }, {
    key: "_handleItemsRendered",
    value: function _handleItemsRendered(_ref2) {
      var overscanRowStartIndex = _ref2.overscanRowStartIndex,
          overscanRowStopIndex = _ref2.overscanRowStopIndex,
          visibleRowStartIndex = _ref2.visibleRowStartIndex,
          visibleRowStopIndex = _ref2.visibleRowStopIndex;
      this.props.onRowsRendered({
        overscanStartIndex: overscanRowStartIndex,
        overscanStopIndex: overscanRowStopIndex,
        startIndex: visibleRowStartIndex,
        stopIndex: visibleRowStopIndex
      });
    }
  }]);

  return GridTable;
}(React.PureComponent);

GridTable.propTypes = {
  containerStyle: PropTypes.object,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,
  headerWidth: PropTypes.number.isRequired,
  bodyWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  estimatedRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getRowHeight: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.array.isRequired,
  frozenData: PropTypes.array,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  useIsScrolling: PropTypes.bool,
  overscanRowCount: PropTypes.number,
  hoveredRowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  onScrollbarPresenceChange: PropTypes.func,
  onScroll: PropTypes.func,
  onRowsRendered: PropTypes.func,
  headerRenderer: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func.isRequired
};
export default GridTable;