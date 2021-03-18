function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import memoize from 'memoize-one';
import GridTable from './GridTable';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import Column, { Alignment, FrozenDirection } from './Column';
import SortOrder from './SortOrder';
import ExpandIcon from './ExpandIcon';
import SortIndicator from './SortIndicator';
import ColumnResizer from './ColumnResizer';
import ColumnManager from './ColumnManager';
import { renderElement, normalizeColumns, getScrollbarSize as defaultGetScrollbarSize, getEstimatedTotalRowsHeight, isObjectEqual, callOrReturn, hasChildren, flattenOnKeys, cloneArray, getValue, throttle, debounce, noop } from './utils';
var getColumns = memoize(function (columns, children) {
  return columns || normalizeColumns(children);
});

var getContainerStyle = function getContainerStyle(width, maxWidth, height) {
  return {
    width: width,
    maxWidth: maxWidth,
    height: height,
    overflow: 'hidden'
  };
};

var DEFAULT_COMPONENTS = {
  TableCell: TableCell,
  TableHeaderCell: TableHeaderCell,
  ExpandIcon: ExpandIcon,
  SortIndicator: SortIndicator
};
var RESIZE_THROTTLE_WAIT = 50; // used for memoization

var EMPTY_ARRAY = [];
/**
 * React table component
 */

var BaseTable = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(BaseTable, _React$PureComponent);

  var _super = _createSuper(BaseTable);

  function BaseTable(props) {
    var _this;

    _classCallCheck(this, BaseTable);

    _this = _super.call(this, props);
    var columns = props.columns,
        children = props.children,
        defaultExpandedRowKeys = props.defaultExpandedRowKeys;
    _this.state = {
      scrollbarSize: 0,
      hoveredRowKey: null,
      resizingKey: null,
      resizingWidth: 0,
      expandedRowKeys: cloneArray(defaultExpandedRowKeys)
    };
    _this.columnManager = new ColumnManager(getColumns(columns, children), props.fixed);
    _this._setContainerRef = _this._setContainerRef.bind(_assertThisInitialized(_this));
    _this._setMainTableRef = _this._setMainTableRef.bind(_assertThisInitialized(_this));
    _this._setLeftTableRef = _this._setLeftTableRef.bind(_assertThisInitialized(_this));
    _this._setRightTableRef = _this._setRightTableRef.bind(_assertThisInitialized(_this));
    _this.renderExpandIcon = _this.renderExpandIcon.bind(_assertThisInitialized(_this));
    _this.renderRow = _this.renderRow.bind(_assertThisInitialized(_this));
    _this.renderRowCell = _this.renderRowCell.bind(_assertThisInitialized(_this));
    _this.renderHeader = _this.renderHeader.bind(_assertThisInitialized(_this));
    _this.renderHeaderCell = _this.renderHeaderCell.bind(_assertThisInitialized(_this));
    _this._handleScroll = _this._handleScroll.bind(_assertThisInitialized(_this));
    _this._handleVerticalScroll = _this._handleVerticalScroll.bind(_assertThisInitialized(_this));
    _this._handleRowsRendered = _this._handleRowsRendered.bind(_assertThisInitialized(_this));
    _this._handleRowHover = _this._handleRowHover.bind(_assertThisInitialized(_this));
    _this._handleRowExpand = _this._handleRowExpand.bind(_assertThisInitialized(_this));
    _this._handleColumnResize = throttle(_this._handleColumnResize.bind(_assertThisInitialized(_this)), RESIZE_THROTTLE_WAIT);
    _this._handleColumnResizeStart = _this._handleColumnResizeStart.bind(_assertThisInitialized(_this));
    _this._handleColumnResizeStop = _this._handleColumnResizeStop.bind(_assertThisInitialized(_this));
    _this._handleColumnSort = _this._handleColumnSort.bind(_assertThisInitialized(_this));
    _this._handleFrozenRowHeightChange = _this._handleFrozenRowHeightChange.bind(_assertThisInitialized(_this));
    _this._handleRowHeightChange = _this._handleRowHeightChange.bind(_assertThisInitialized(_this));
    _this._getLeftTableContainerStyle = memoize(getContainerStyle);
    _this._getRightTableContainerStyle = memoize(getContainerStyle);
    _this._flattenOnKeys = memoize(function (tree, keys, dataKey) {
      _this._depthMap = {};
      return flattenOnKeys(tree, keys, _this._depthMap, dataKey);
    });
    _this._resetColumnManager = memoize(function (columns, fixed) {
      _this.columnManager.reset(columns, fixed);

      if (_this.props.estimatedRowHeight && fixed) {
        if (!_this.columnManager.hasLeftFrozenColumns()) {
          _this._leftRowHeightMap = {};
        }

        if (!_this.columnManager.hasRightFrozenColumns()) {
          _this._rightRowHeightMap = {};
        }
      }
    }, function (newArgs, lastArgs) {
      return isObjectEqual(newArgs, lastArgs, _this.props.ignoreFunctionInColumnCompare);
    });
    _this._isResetting = false;
    _this._resetIndex = null;
    _this._rowHeightMap = {};
    _this._rowHeightMapBuffer = {};
    _this._mainRowHeightMap = {};
    _this._leftRowHeightMap = {};
    _this._rightRowHeightMap = {};
    _this._getEstimatedTotalRowsHeight = memoize(getEstimatedTotalRowsHeight);
    _this._getRowHeight = _this._getRowHeight.bind(_assertThisInitialized(_this));
    _this._updateRowHeights = debounce(function () {
      _this._isResetting = true;
      _this._rowHeightMap = _objectSpread(_objectSpread({}, _this._rowHeightMap), _this._rowHeightMapBuffer);

      _this.resetAfterRowIndex(_this._resetIndex, false);

      _this._rowHeightMapBuffer = {};
      _this._resetIndex = null;

      _this.forceUpdateTable();

      _this.forceUpdate();

      _this._isResetting = false;
    }, 0);
    _this._scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    _this._scrollHeight = 0;
    _this._lastScannedRowIndex = -1;
    _this._hasDataChangedSinceEndReached = true;
    _this._data = props.data;
    _this._depthMap = {};
    _this._horizontalScrollbarSize = 0;
    _this._verticalScrollbarSize = 0;
    _this._scrollbarPresenceChanged = false;
    return _this;
  }
  /**
   * Get the DOM node of the table
   */


  _createClass(BaseTable, [{
    key: "getDOMNode",
    value: function getDOMNode() {
      return this.tableNode;
    }
    /**
     * Get the column manager
     */

  }, {
    key: "getColumnManager",
    value: function getColumnManager() {
      return this.columnManager;
    }
    /**
     * Get internal `expandedRowKeys` state
     */

  }, {
    key: "getExpandedRowKeys",
    value: function getExpandedRowKeys() {
      var expandedRowKeys = this.props.expandedRowKeys;
      return expandedRowKeys !== undefined ? expandedRowKeys || EMPTY_ARRAY : this.state.expandedRowKeys;
    }
    /**
     * Get the expanded state, fallback to normal state if not expandable.
     */

  }, {
    key: "getExpandedState",
    value: function getExpandedState() {
      return {
        expandedData: this._data,
        expandedRowKeys: this.getExpandedRowKeys(),
        expandedDepthMap: this._depthMap
      };
    }
    /**
     * Get the total height of all rows, including expanded rows.
     */

  }, {
    key: "getTotalRowsHeight",
    value: function getTotalRowsHeight() {
      var _this$props = this.props,
          rowHeight = _this$props.rowHeight,
          estimatedRowHeight = _this$props.estimatedRowHeight;

      if (estimatedRowHeight) {
        return this.table ? this.table.getTotalRowsHeight() : this._getEstimatedTotalRowsHeight(this._data, estimatedRowHeight);
      }

      return this._data.length * rowHeight;
    }
    /**
     * Get the total width of all columns.
     */

  }, {
    key: "getTotalColumnsWidth",
    value: function getTotalColumnsWidth() {
      return this.columnManager.getColumnsWidth();
    }
    /**
     * Forcefully re-render the inner Grid component.
     *
     * Calling `forceUpdate` on `Table` may not re-render the inner Grid since it uses `shallowCompare` as a performance optimization.
     * Use this method if you want to manually trigger a re-render.
     * This may be appropriate if the underlying row data has changed but the row sizes themselves have not.
     */

  }, {
    key: "forceUpdateTable",
    value: function forceUpdateTable() {
      this.table && this.table.forceUpdateTable();
      this.leftTable && this.leftTable.forceUpdateTable();
      this.rightTable && this.rightTable.forceUpdateTable();
    }
    /**
     * Reset cached offsets for positioning after a specific rowIndex, should be used only in dynamic mode(estimatedRowHeight is provided)
     *
     * @param {number} rowIndex
     * @param {boolean} shouldForceUpdate
     */

  }, {
    key: "resetAfterRowIndex",
    value: function resetAfterRowIndex() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var shouldForceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.props.estimatedRowHeight) return;
      this.table && this.table.resetAfterRowIndex(rowIndex, shouldForceUpdate);
      this.leftTable && this.leftTable.resetAfterRowIndex(rowIndex, shouldForceUpdate);
      this.rightTable && this.rightTable.resetAfterRowIndex(rowIndex, shouldForceUpdate);
    }
    /**
     * Reset row height cache, useful if `data` changed entirely, should be used only in dynamic mode(estimatedRowHeight is provided)
     */

  }, {
    key: "resetRowHeightCache",
    value: function resetRowHeightCache() {
      if (!this.props.estimatedRowHeight) return;
      this._resetIndex = null;
      this._rowHeightMapBuffer = {};
      this._rowHeightMap = {};
      this._mainRowHeightMap = {};
      this._leftRowHeightMap = {};
      this._rightRowHeightMap = {};
    }
    /**
     * Scroll to the specified offset.
     * Useful for animating position changes.
     *
     * @param {object} offset
     */

  }, {
    key: "scrollToPosition",
    value: function scrollToPosition(offset) {
      this._scroll = offset;
      this.table && this.table.scrollToPosition(offset);
      this.leftTable && this.leftTable.scrollToTop(offset.scrollTop);
      this.rightTable && this.rightTable.scrollToTop(offset.scrollTop);
    }
    /**
     * Scroll to the specified offset vertically.
     *
     * @param {number} scrollTop
     */

  }, {
    key: "scrollToTop",
    value: function scrollToTop(scrollTop) {
      this._scroll.scrollTop = scrollTop;
      this.table && this.table.scrollToPosition(this._scroll);
      this.leftTable && this.leftTable.scrollToTop(scrollTop);
      this.rightTable && this.rightTable.scrollToTop(scrollTop);
    }
    /**
     * Scroll to the specified offset horizontally.
     *
     * @param {number} scrollLeft
     */

  }, {
    key: "scrollToLeft",
    value: function scrollToLeft(scrollLeft) {
      this._scroll.scrollLeft = scrollLeft;
      this.table && this.table.scrollToPosition(this._scroll);
    }
    /**
     * Scroll to the specified row.
     * By default, the table will scroll as little as possible to ensure the row is visible.
     * You can control the alignment of the row though by specifying an align property. Acceptable values are:
     *
     * - `auto` (default) - Scroll as little as possible to ensure the row is visible.
     * - `smart` - Same as `auto` if it is less than one viewport away, or it's the same as`center`.
     * - `center` - Center align the row within the table.
     * - `end` - Align the row to the bottom side of the table.
     * - `start` - Align the row to the top side of the table.
     *
     * @param {number} rowIndex
     * @param {string} align
     */

  }, {
    key: "scrollToRow",
    value: function scrollToRow() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
      this.table && this.table.scrollToRow(rowIndex, align);
      this.leftTable && this.leftTable.scrollToRow(rowIndex, align);
      this.rightTable && this.rightTable.scrollToRow(rowIndex, align);
    }
    /**
     * Set `expandedRowKeys` manually.
     * This method is available only if `expandedRowKeys` is uncontrolled.
     *
     * @param {array} expandedRowKeys
     */

  }, {
    key: "setExpandedRowKeys",
    value: function setExpandedRowKeys(expandedRowKeys) {
      // if `expandedRowKeys` is controlled
      if (this.props.expandedRowKeys !== undefined) return;
      this.setState({
        expandedRowKeys: cloneArray(expandedRowKeys)
      });
    }
  }, {
    key: "renderExpandIcon",
    value: function renderExpandIcon(_ref) {
      var rowData = _ref.rowData,
          rowIndex = _ref.rowIndex,
          depth = _ref.depth,
          onExpand = _ref.onExpand;
      var _this$props2 = this.props,
          rowKey = _this$props2.rowKey,
          expandColumnKey = _this$props2.expandColumnKey,
          expandIconProps = _this$props2.expandIconProps;
      if (!expandColumnKey) return null;
      var expandable = rowIndex >= 0 && hasChildren(rowData);
      var expanded = rowIndex >= 0 && this.getExpandedRowKeys().indexOf(rowData[rowKey]) >= 0;
      var extraProps = callOrReturn(expandIconProps, {
        rowData: rowData,
        rowIndex: rowIndex,
        depth: depth,
        expandable: expandable,
        expanded: expanded
      });

      var ExpandIcon = this._getComponent('ExpandIcon');

      return /*#__PURE__*/React.createElement(ExpandIcon, _extends({
        depth: depth,
        expandable: expandable,
        expanded: expanded
      }, extraProps, {
        onExpand: onExpand
      }));
    }
  }, {
    key: "renderRow",
    value: function renderRow(_ref2) {
      var _cn;

      var isScrolling = _ref2.isScrolling,
          columns = _ref2.columns,
          rowData = _ref2.rowData,
          rowIndex = _ref2.rowIndex,
          style = _ref2.style;
      var _this$props3 = this.props,
          rowClassName = _this$props3.rowClassName,
          rowRenderer = _this$props3.rowRenderer,
          rowEventHandlers = _this$props3.rowEventHandlers,
          expandColumnKey = _this$props3.expandColumnKey,
          estimatedRowHeight = _this$props3.estimatedRowHeight;
      var rowClass = callOrReturn(rowClassName, {
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var extraProps = callOrReturn(this.props.rowProps, {
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var rowKey = rowData[this.props.rowKey];
      var depth = this._depthMap[rowKey] || 0;
      var className = cn(this._prefixClass('row'), rowClass, (_cn = {}, _defineProperty(_cn, this._prefixClass("row--depth-".concat(depth)), !!expandColumnKey && rowIndex >= 0), _defineProperty(_cn, this._prefixClass('row--expanded'), !!expandColumnKey && this.getExpandedRowKeys().indexOf(rowKey) >= 0), _defineProperty(_cn, this._prefixClass('row--hovered'), !isScrolling && rowKey === this.state.hoveredRowKey), _defineProperty(_cn, this._prefixClass('row--frozen'), depth === 0 && rowIndex < 0), _defineProperty(_cn, this._prefixClass('row--customized'), rowRenderer), _cn));
      var hasFrozenColumns = this.columnManager.hasFrozenColumns();

      var rowProps = _objectSpread(_objectSpread({}, extraProps), {}, {
        role: 'row',
        key: "row-".concat(rowKey),
        isScrolling: isScrolling,
        className: className,
        style: style,
        columns: columns,
        rowIndex: rowIndex,
        rowData: rowData,
        rowKey: rowKey,
        expandColumnKey: expandColumnKey,
        depth: depth,
        rowEventHandlers: rowEventHandlers,
        rowRenderer: rowRenderer,
        // for frozen rows we use fixed rowHeight
        estimatedRowHeight: rowIndex >= 0 ? estimatedRowHeight : undefined,
        getIsResetting: this._getIsResetting,
        cellRenderer: this.renderRowCell,
        expandIconRenderer: this.renderExpandIcon,
        onRowExpand: this._handleRowExpand,
        // for fixed table, we need to sync the hover state across the inner tables
        onRowHover: hasFrozenColumns ? this._handleRowHover : null,
        onRowHeightChange: hasFrozenColumns ? this._handleFrozenRowHeightChange : this._handleRowHeightChange
      });

      return /*#__PURE__*/React.createElement(TableRow, rowProps);
    }
  }, {
    key: "renderRowCell",
    value: function renderRowCell(_ref3) {
      var _cn2;

      var isScrolling = _ref3.isScrolling,
          columns = _ref3.columns,
          column = _ref3.column,
          columnIndex = _ref3.columnIndex,
          rowData = _ref3.rowData,
          rowIndex = _ref3.rowIndex,
          expandIcon = _ref3.expandIcon;

      if (column[ColumnManager.PlaceholderKey]) {
        return /*#__PURE__*/React.createElement("div", {
          key: "row-".concat(rowData[this.props.rowKey], "-cell-").concat(column.key, "-placeholder"),
          className: this._prefixClass('row-cell-placeholder'),
          style: this.columnManager.getColumnStyle(column.key)
        });
      }

      var className = column.className,
          dataKey = column.dataKey,
          dataGetter = column.dataGetter,
          cellRenderer = column.cellRenderer;

      var TableCell = this._getComponent('TableCell');

      var cellData = dataGetter ? dataGetter({
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      }) : getValue(rowData, dataKey);
      var cellProps = {
        isScrolling: isScrolling,
        cellData: cellData,
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex,
        container: this
      };
      var cell = renderElement(cellRenderer || /*#__PURE__*/React.createElement(TableCell, {
        className: this._prefixClass('row-cell-text')
      }), cellProps);
      var cellCls = callOrReturn(className, {
        cellData: cellData,
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      });
      var cls = cn(this._prefixClass('row-cell'), cellCls, (_cn2 = {}, _defineProperty(_cn2, this._prefixClass('row-cell--align-center'), column.align === Alignment.CENTER), _defineProperty(_cn2, this._prefixClass('row-cell--align-right'), column.align === Alignment.RIGHT), _cn2));
      var extraProps = callOrReturn(this.props.cellProps, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        rowData: rowData,
        rowIndex: rowIndex
      });

      var _ref4 = extraProps || {},
          tagName = _ref4.tagName,
          rest = _objectWithoutProperties(_ref4, ["tagName"]);

      var Tag = tagName || 'div';
      return /*#__PURE__*/React.createElement(Tag, _extends({
        role: "gridcell",
        key: "row-".concat(rowData[this.props.rowKey], "-cell-").concat(column.key)
      }, rest, {
        className: cn(cls, (rest || {}).className),
        style: _objectSpread(_objectSpread({}, this.columnManager.getColumnStyle(column.key)), (rest || {}).style)
      }), expandIcon, cell);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(_ref5) {
      var _cn3;

      var columns = _ref5.columns,
          headerIndex = _ref5.headerIndex,
          style = _ref5.style;
      var _this$props4 = this.props,
          headerClassName = _this$props4.headerClassName,
          headerRenderer = _this$props4.headerRenderer;
      var headerClass = callOrReturn(headerClassName, {
        columns: columns,
        headerIndex: headerIndex
      });
      var extraProps = callOrReturn(this.props.headerProps, {
        columns: columns,
        headerIndex: headerIndex
      });
      var className = cn(this._prefixClass('header-row'), headerClass, (_cn3 = {}, _defineProperty(_cn3, this._prefixClass('header-row--resizing'), !!this.state.resizingKey), _defineProperty(_cn3, this._prefixClass('header-row--customized'), headerRenderer), _cn3));

      var headerProps = _objectSpread(_objectSpread({}, extraProps), {}, {
        role: 'row',
        key: "header-".concat(headerIndex),
        className: className,
        style: style,
        columns: columns,
        headerIndex: headerIndex,
        headerRenderer: headerRenderer,
        cellRenderer: this.renderHeaderCell,
        expandColumnKey: this.props.expandColumnKey,
        expandIcon: this._getComponent('ExpandIcon')
      });

      return /*#__PURE__*/React.createElement(TableHeaderRow, headerProps);
    }
  }, {
    key: "renderHeaderCell",
    value: function renderHeaderCell(_ref6) {
      var _cn4;

      var columns = _ref6.columns,
          column = _ref6.column,
          columnIndex = _ref6.columnIndex,
          headerIndex = _ref6.headerIndex,
          expandIcon = _ref6.expandIcon;

      if (column[ColumnManager.PlaceholderKey]) {
        return /*#__PURE__*/React.createElement("div", {
          key: "header-".concat(headerIndex, "-cell-").concat(column.key, "-placeholder"),
          className: this._prefixClass('header-cell-placeholder'),
          style: this.columnManager.getColumnStyle(column.key)
        });
      }

      var headerClassName = column.headerClassName,
          headerRenderer = column.headerRenderer;
      var _this$props5 = this.props,
          sortBy = _this$props5.sortBy,
          sortState = _this$props5.sortState,
          headerCellProps = _this$props5.headerCellProps;

      var TableHeaderCell = this._getComponent('TableHeaderCell');

      var SortIndicator = this._getComponent('SortIndicator');

      var cellProps = {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex,
        container: this
      };
      var cell = renderElement(headerRenderer || /*#__PURE__*/React.createElement(TableHeaderCell, {
        className: this._prefixClass('header-cell-text')
      }), cellProps);
      var sorting, sortOrder;

      if (sortState) {
        var order = sortState[column.key];
        sorting = order === SortOrder.ASC || order === SortOrder.DESC;
        sortOrder = sorting ? order : SortOrder.ASC;
      } else {
        sorting = column.key === sortBy.key;
        sortOrder = sorting ? sortBy.order : SortOrder.ASC;
      }

      var cellCls = callOrReturn(headerClassName, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex
      });
      var cls = cn(this._prefixClass('header-cell'), cellCls, (_cn4 = {}, _defineProperty(_cn4, this._prefixClass('header-cell--align-center'), column.align === Alignment.CENTER), _defineProperty(_cn4, this._prefixClass('header-cell--align-right'), column.align === Alignment.RIGHT), _defineProperty(_cn4, this._prefixClass('header-cell--sortable'), column.sortable), _defineProperty(_cn4, this._prefixClass('header-cell--sorting'), sorting), _defineProperty(_cn4, this._prefixClass('header-cell--resizing'), column.key === this.state.resizingKey), _cn4));
      var extraProps = callOrReturn(headerCellProps, {
        columns: columns,
        column: column,
        columnIndex: columnIndex,
        headerIndex: headerIndex
      });

      var _ref7 = extraProps || {},
          tagName = _ref7.tagName,
          rest = _objectWithoutProperties(_ref7, ["tagName"]);

      var Tag = tagName || 'div';
      return /*#__PURE__*/React.createElement(Tag, _extends({
        role: "gridcell",
        key: "header-".concat(headerIndex, "-cell-").concat(column.key),
        onClick: column.sortable ? this._handleColumnSort : null
      }, rest, {
        className: cn(cls, (rest || {}).className),
        style: _objectSpread(_objectSpread({}, this.columnManager.getColumnStyle(column.key)), (rest || {}).style),
        "data-key": column.key
      }), expandIcon, cell, column.sortable && /*#__PURE__*/React.createElement(SortIndicator, {
        sortOrder: sortOrder,
        className: cn(this._prefixClass('sort-indicator'), _defineProperty({}, this._prefixClass('sort-indicator--descending'), sortOrder === SortOrder.DESC))
      }), column.resizable && /*#__PURE__*/React.createElement(ColumnResizer, {
        className: this._prefixClass('column-resizer'),
        column: column,
        onResizeStart: this._handleColumnResizeStart,
        onResizeStop: this._handleColumnResizeStop,
        onResize: this._handleColumnResize
      }));
    }
  }, {
    key: "renderMainTable",
    value: function renderMainTable() {
      var _this$props6 = this.props,
          width = _this$props6.width,
          headerHeight = _this$props6.headerHeight,
          rowHeight = _this$props6.rowHeight,
          fixed = _this$props6.fixed,
          estimatedRowHeight = _this$props6.estimatedRowHeight,
          rest = _objectWithoutProperties(_this$props6, ["width", "headerHeight", "rowHeight", "fixed", "estimatedRowHeight"]);

      var height = this._getTableHeight();

      var tableWidth = width - this._verticalScrollbarSize;

      if (fixed) {
        var columnsWidth = this.columnManager.getColumnsWidth(); // make sure `scrollLeft` is always integer to fix a sync bug when scrolling to end horizontally

        tableWidth = Math.max(Math.round(columnsWidth), tableWidth);
      }

      return /*#__PURE__*/React.createElement(GridTable, _extends({}, rest, this.state, {
        className: this._prefixClass('table-main'),
        ref: this._setMainTableRef,
        data: this._data,
        columns: this.columnManager.getMainColumns(),
        width: width,
        height: height,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        estimatedRowHeight: estimatedRowHeight,
        getRowHeight: estimatedRowHeight ? this._getRowHeight : undefined,
        headerWidth: tableWidth + (fixed ? this._verticalScrollbarSize : 0),
        bodyWidth: tableWidth,
        headerRenderer: this.renderHeader,
        rowRenderer: this.renderRow,
        onScroll: this._handleScroll,
        onRowsRendered: this._handleRowsRendered
      }));
    }
  }, {
    key: "renderLeftTable",
    value: function renderLeftTable() {
      if (!this.columnManager.hasLeftFrozenColumns()) return null;

      var _this$props7 = this.props,
          width = _this$props7.width,
          headerHeight = _this$props7.headerHeight,
          rowHeight = _this$props7.rowHeight,
          estimatedRowHeight = _this$props7.estimatedRowHeight,
          rest = _objectWithoutProperties(_this$props7, ["width", "headerHeight", "rowHeight", "estimatedRowHeight"]);

      var containerHeight = this._getFrozenContainerHeight();

      var offset = this._verticalScrollbarSize || 20;
      var columnsWidth = this.columnManager.getLeftFrozenColumnsWidth();
      return /*#__PURE__*/React.createElement(GridTable, _extends({}, rest, this.state, {
        containerStyle: this._getLeftTableContainerStyle(columnsWidth, width, containerHeight),
        className: this._prefixClass('table-frozen-left'),
        ref: this._setLeftTableRef,
        data: this._data,
        columns: this.columnManager.getLeftFrozenColumns(),
        initialScrollTop: this._scroll.scrollTop,
        width: columnsWidth + offset,
        height: containerHeight,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        estimatedRowHeight: estimatedRowHeight,
        getRowHeight: estimatedRowHeight ? this._getRowHeight : undefined,
        headerWidth: columnsWidth + offset,
        bodyWidth: columnsWidth + offset,
        headerRenderer: this.renderHeader,
        rowRenderer: this.renderRow,
        onScroll: this._handleVerticalScroll,
        onRowsRendered: noop
      }));
    }
  }, {
    key: "renderRightTable",
    value: function renderRightTable() {
      if (!this.columnManager.hasRightFrozenColumns()) return null;

      var _this$props8 = this.props,
          width = _this$props8.width,
          headerHeight = _this$props8.headerHeight,
          rowHeight = _this$props8.rowHeight,
          estimatedRowHeight = _this$props8.estimatedRowHeight,
          rest = _objectWithoutProperties(_this$props8, ["width", "headerHeight", "rowHeight", "estimatedRowHeight"]);

      var containerHeight = this._getFrozenContainerHeight();

      var columnsWidth = this.columnManager.getRightFrozenColumnsWidth();
      var scrollbarWidth = this._verticalScrollbarSize;
      return /*#__PURE__*/React.createElement(GridTable, _extends({}, rest, this.state, {
        containerStyle: this._getLeftTableContainerStyle(columnsWidth + scrollbarWidth, width, containerHeight),
        className: this._prefixClass('table-frozen-right'),
        ref: this._setRightTableRef,
        data: this._data,
        columns: this.columnManager.getRightFrozenColumns(),
        initialScrollTop: this._scroll.scrollTop,
        width: columnsWidth + scrollbarWidth,
        height: containerHeight,
        headerHeight: headerHeight,
        rowHeight: rowHeight,
        estimatedRowHeight: estimatedRowHeight,
        getRowHeight: estimatedRowHeight ? this._getRowHeight : undefined,
        headerWidth: columnsWidth + scrollbarWidth,
        bodyWidth: columnsWidth,
        headerRenderer: this.renderHeader,
        rowRenderer: this.renderRow,
        onScroll: this._handleVerticalScroll,
        onRowsRendered: noop
      }));
    }
  }, {
    key: "renderResizingLine",
    value: function renderResizingLine() {
      var _this$props9 = this.props,
          width = _this$props9.width,
          fixed = _this$props9.fixed;
      var resizingKey = this.state.resizingKey;
      if (!fixed || !resizingKey) return null;
      var columns = this.columnManager.getMainColumns();
      var idx = columns.findIndex(function (column) {
        return column.key === resizingKey;
      });
      var column = columns[idx];
      var columnWidth = column.width,
          frozen = column.frozen;
      var leftWidth = this.columnManager.recomputeColumnsWidth(columns.slice(0, idx));
      var left = leftWidth + columnWidth;

      if (!frozen) {
        left -= this._scroll.scrollLeft;
      } else if (frozen === FrozenDirection.RIGHT) {
        var rightWidth = this.columnManager.recomputeColumnsWidth(columns.slice(idx + 1));

        if (rightWidth + columnWidth > width - this._verticalScrollbarSize) {
          left = columnWidth;
        } else {
          left = width - this._verticalScrollbarSize - rightWidth;
        }
      }

      var style = {
        left: left,
        height: this._getTableHeight() - this._horizontalScrollbarSize
      };
      return /*#__PURE__*/React.createElement("div", {
        className: this._prefixClass('resizing-line'),
        style: style
      });
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this$props10 = this.props,
          footerHeight = _this$props10.footerHeight,
          footerRenderer = _this$props10.footerRenderer;
      if (footerHeight === 0) return null;
      return /*#__PURE__*/React.createElement("div", {
        className: this._prefixClass('footer'),
        style: {
          height: footerHeight
        }
      }, renderElement(footerRenderer));
    }
  }, {
    key: "renderEmptyLayer",
    value: function renderEmptyLayer() {
      var _this$props11 = this.props,
          data = _this$props11.data,
          frozenData = _this$props11.frozenData,
          footerHeight = _this$props11.footerHeight,
          emptyRenderer = _this$props11.emptyRenderer;
      if (data && data.length || frozenData && frozenData.length) return null;

      var headerHeight = this._getHeaderHeight();

      return /*#__PURE__*/React.createElement("div", {
        className: this._prefixClass('empty-layer'),
        style: {
          top: headerHeight,
          bottom: footerHeight
        }
      }, renderElement(emptyRenderer));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var overlayRenderer = this.props.overlayRenderer;
      return /*#__PURE__*/React.createElement("div", {
        className: this._prefixClass('overlay')
      }, !!overlayRenderer && renderElement(overlayRenderer));
    }
  }, {
    key: "render",
    value: function render() {
      var _cn6;

      var _this$props12 = this.props,
          columns = _this$props12.columns,
          children = _this$props12.children,
          width = _this$props12.width,
          fixed = _this$props12.fixed,
          data = _this$props12.data,
          frozenData = _this$props12.frozenData,
          expandColumnKey = _this$props12.expandColumnKey,
          disabled = _this$props12.disabled,
          className = _this$props12.className,
          style = _this$props12.style,
          footerHeight = _this$props12.footerHeight,
          classPrefix = _this$props12.classPrefix,
          estimatedRowHeight = _this$props12.estimatedRowHeight;

      this._resetColumnManager(getColumns(columns, children), fixed);

      var _data = expandColumnKey ? this._flattenOnKeys(data, this.getExpandedRowKeys(), this.props.rowKey) : data;

      if (this._data !== _data) {
        this.resetAfterRowIndex(0, false);
        this._data = _data;
      } // should be after `this._data` assigned


      this._calcScrollbarSizes();

      this._totalRowsHeight = this.getTotalRowsHeight();

      var containerStyle = _objectSpread(_objectSpread({}, style), {}, {
        width: width,
        height: this._getTableHeight() + footerHeight,
        position: 'relative'
      });

      var cls = cn(classPrefix, className, (_cn6 = {}, _defineProperty(_cn6, "".concat(classPrefix, "--fixed"), fixed), _defineProperty(_cn6, "".concat(classPrefix, "--expandable"), !!expandColumnKey), _defineProperty(_cn6, "".concat(classPrefix, "--empty"), data.length === 0), _defineProperty(_cn6, "".concat(classPrefix, "--has-frozen-rows"), frozenData.length > 0), _defineProperty(_cn6, "".concat(classPrefix, "--has-frozen-columns"), this.columnManager.hasFrozenColumns()), _defineProperty(_cn6, "".concat(classPrefix, "--disabled"), disabled), _defineProperty(_cn6, "".concat(classPrefix, "--dynamic"), !!estimatedRowHeight), _cn6));
      return /*#__PURE__*/React.createElement("div", {
        ref: this._setContainerRef,
        className: cls,
        style: containerStyle
      }, this.renderFooter(), this.renderMainTable(), this.renderLeftTable(), this.renderRightTable(), this.renderResizingLine(), this.renderEmptyLayer(), this.renderOverlay());
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollbarSize = this.props.getScrollbarSize();

      if (scrollbarSize > 0) {
        this.setState({
          scrollbarSize: scrollbarSize
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props13 = this.props,
          data = _this$props13.data,
          height = _this$props13.height,
          maxHeight = _this$props13.maxHeight,
          estimatedRowHeight = _this$props13.estimatedRowHeight;

      if (data !== prevProps.data) {
        this._lastScannedRowIndex = -1;
        this._hasDataChangedSinceEndReached = true;
      }

      if (maxHeight !== prevProps.maxHeight || height !== prevProps.height) {
        this._maybeCallOnEndReached();
      }

      this._maybeScrollbarPresenceChange();

      if (estimatedRowHeight) {
        if (this.getTotalRowsHeight() !== this._totalRowsHeight) {
          this.forceUpdate();
        }
      }
    }
  }, {
    key: "_prefixClass",
    value: function _prefixClass(className) {
      return "".concat(this.props.classPrefix, "__").concat(className);
    }
  }, {
    key: "_setContainerRef",
    value: function _setContainerRef(ref) {
      this.tableNode = ref;
    }
  }, {
    key: "_setMainTableRef",
    value: function _setMainTableRef(ref) {
      this.table = ref;
    }
  }, {
    key: "_setLeftTableRef",
    value: function _setLeftTableRef(ref) {
      this.leftTable = ref;
    }
  }, {
    key: "_setRightTableRef",
    value: function _setRightTableRef(ref) {
      this.rightTable = ref;
    }
  }, {
    key: "_getComponent",
    value: function _getComponent(name) {
      if (this.props.components && this.props.components[name]) return this.props.components[name];
      return DEFAULT_COMPONENTS[name];
    } // for dynamic row height

  }, {
    key: "_getRowHeight",
    value: function _getRowHeight(rowIndex) {
      var _this$props14 = this.props,
          estimatedRowHeight = _this$props14.estimatedRowHeight,
          rowKey = _this$props14.rowKey;
      return this._rowHeightMap[this._data[rowIndex][rowKey]] || callOrReturn(estimatedRowHeight, {
        rowData: this._data[rowIndex],
        rowIndex: rowIndex
      });
    }
  }, {
    key: "_getIsResetting",
    value: function _getIsResetting() {
      return this._isResetting;
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
    key: "_getFrozenRowsHeight",
    value: function _getFrozenRowsHeight() {
      var _this$props15 = this.props,
          frozenData = _this$props15.frozenData,
          rowHeight = _this$props15.rowHeight;
      return frozenData.length * rowHeight;
    }
  }, {
    key: "_getTableHeight",
    value: function _getTableHeight() {
      var _this$props16 = this.props,
          height = _this$props16.height,
          maxHeight = _this$props16.maxHeight,
          footerHeight = _this$props16.footerHeight;
      var tableHeight = height - footerHeight;

      if (maxHeight > 0) {
        var frozenRowsHeight = this._getFrozenRowsHeight();

        var totalRowsHeight = this.getTotalRowsHeight();

        var headerHeight = this._getHeaderHeight();

        var totalHeight = headerHeight + frozenRowsHeight + totalRowsHeight + this._horizontalScrollbarSize;
        tableHeight = Math.min(totalHeight, maxHeight - footerHeight);
      }

      return tableHeight;
    }
  }, {
    key: "_getBodyHeight",
    value: function _getBodyHeight() {
      return this._getTableHeight() - this._getHeaderHeight() - this._getFrozenRowsHeight();
    }
  }, {
    key: "_getFrozenContainerHeight",
    value: function _getFrozenContainerHeight() {
      var maxHeight = this.props.maxHeight;
      var tableHeight = this._getTableHeight() - (this._data.length > 0 ? this._horizontalScrollbarSize : 0); // in auto height mode tableHeight = totalHeight

      if (maxHeight > 0) return tableHeight;

      var totalHeight = this.getTotalRowsHeight() + this._getHeaderHeight() + this._getFrozenRowsHeight();

      return Math.min(tableHeight, totalHeight);
    }
  }, {
    key: "_calcScrollbarSizes",
    value: function _calcScrollbarSizes() {
      var _this$props17 = this.props,
          fixed = _this$props17.fixed,
          width = _this$props17.width;
      var scrollbarSize = this.state.scrollbarSize;
      var totalRowsHeight = this.getTotalRowsHeight();
      var totalColumnsWidth = this.getTotalColumnsWidth();
      var prevHorizontalScrollbarSize = this._horizontalScrollbarSize;
      var prevVerticalScrollbarSize = this._verticalScrollbarSize;

      if (scrollbarSize === 0) {
        this._horizontalScrollbarSize = 0;
        this._verticalScrollbarSize = 0;
      } else {
        // we have to set `this._horizontalScrollbarSize` before calling `this._getBodyHeight`
        if (!fixed || totalColumnsWidth <= width - scrollbarSize) {
          this._horizontalScrollbarSize = 0;
          this._verticalScrollbarSize = totalRowsHeight > this._getBodyHeight() ? scrollbarSize : 0;
        } else {
          if (totalColumnsWidth > width) {
            this._horizontalScrollbarSize = scrollbarSize;
            this._verticalScrollbarSize = totalRowsHeight > this._getBodyHeight() - this._horizontalScrollbarSize ? scrollbarSize : 0;
          } else {
            this._horizontalScrollbarSize = 0;
            this._verticalScrollbarSize = 0;

            if (totalRowsHeight > this._getBodyHeight()) {
              this._horizontalScrollbarSize = scrollbarSize;
              this._verticalScrollbarSize = scrollbarSize;
            }
          }
        }
      }

      if (prevHorizontalScrollbarSize !== this._horizontalScrollbarSize || prevVerticalScrollbarSize !== this._verticalScrollbarSize) {
        this._scrollbarPresenceChanged = true;
      }
    }
  }, {
    key: "_maybeScrollbarPresenceChange",
    value: function _maybeScrollbarPresenceChange() {
      if (this._scrollbarPresenceChanged) {
        var onScrollbarPresenceChange = this.props.onScrollbarPresenceChange;
        this._scrollbarPresenceChanged = false;
        onScrollbarPresenceChange({
          size: this.state.scrollbarSize,
          horizontal: this._horizontalScrollbarSize > 0,
          vertical: this._verticalScrollbarSize > 0
        });
      }
    }
  }, {
    key: "_maybeCallOnEndReached",
    value: function _maybeCallOnEndReached() {
      var _this$props18 = this.props,
          onEndReached = _this$props18.onEndReached,
          onEndReachedThreshold = _this$props18.onEndReachedThreshold;
      var scrollTop = this._scroll.scrollTop;
      var scrollHeight = this.getTotalRowsHeight();

      var clientHeight = this._getBodyHeight();

      if (!onEndReached || !clientHeight || !scrollHeight) return;
      var distanceFromEnd = scrollHeight - scrollTop - clientHeight + this._horizontalScrollbarSize;

      if (this._lastScannedRowIndex >= 0 && distanceFromEnd <= onEndReachedThreshold && (this._hasDataChangedSinceEndReached || scrollHeight !== this._scrollHeight)) {
        this._hasDataChangedSinceEndReached = false;
        this._scrollHeight = scrollHeight;
        onEndReached({
          distanceFromEnd: distanceFromEnd
        });
      }
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(args) {
      var lastScrollTop = this._scroll.scrollTop;
      this.scrollToPosition(args);
      this.props.onScroll(args);
      if (args.scrollTop > lastScrollTop) this._maybeCallOnEndReached();
    }
  }, {
    key: "_handleVerticalScroll",
    value: function _handleVerticalScroll(_ref8) {
      var scrollTop = _ref8.scrollTop;
      var lastScrollTop = this._scroll.scrollTop;
      if (scrollTop !== lastScrollTop) this.scrollToTop(scrollTop);
      if (scrollTop > lastScrollTop) this._maybeCallOnEndReached();
    }
  }, {
    key: "_handleRowsRendered",
    value: function _handleRowsRendered(args) {
      this.props.onRowsRendered(args);

      if (args.overscanStopIndex > this._lastScannedRowIndex) {
        this._lastScannedRowIndex = args.overscanStopIndex;

        this._maybeCallOnEndReached();
      }
    }
  }, {
    key: "_handleRowHover",
    value: function _handleRowHover(_ref9) {
      var hovered = _ref9.hovered,
          rowKey = _ref9.rowKey;
      this.setState({
        hoveredRowKey: hovered ? rowKey : null
      });
    }
  }, {
    key: "_handleRowExpand",
    value: function _handleRowExpand(_ref10) {
      var expanded = _ref10.expanded,
          rowData = _ref10.rowData,
          rowIndex = _ref10.rowIndex,
          rowKey = _ref10.rowKey;
      var expandedRowKeys = cloneArray(this.getExpandedRowKeys());

      if (expanded) {
        if (!expandedRowKeys.indexOf(rowKey) >= 0) expandedRowKeys.push(rowKey);
      } else {
        var index = expandedRowKeys.indexOf(rowKey);

        if (index > -1) {
          expandedRowKeys.splice(index, 1);
        }
      } // if `expandedRowKeys` is uncontrolled, update internal state


      if (this.props.expandedRowKeys === undefined) {
        this.setState({
          expandedRowKeys: expandedRowKeys
        });
      }

      this.props.onRowExpand({
        expanded: expanded,
        rowData: rowData,
        rowIndex: rowIndex,
        rowKey: rowKey
      });
      this.props.onExpandedRowsChange(expandedRowKeys);
    }
  }, {
    key: "_handleColumnResize",
    value: function _handleColumnResize(_ref11, width) {
      var key = _ref11.key;
      this.columnManager.setColumnWidth(key, width);
      this.setState({
        resizingWidth: width
      });
      var column = this.columnManager.getColumn(key);
      this.props.onColumnResize({
        column: column,
        width: width
      });
    }
  }, {
    key: "_handleColumnResizeStart",
    value: function _handleColumnResizeStart(_ref12) {
      var key = _ref12.key;
      this.setState({
        resizingKey: key
      });
    }
  }, {
    key: "_handleColumnResizeStop",
    value: function _handleColumnResizeStop() {
      var _this$state = this.state,
          resizingKey = _this$state.resizingKey,
          resizingWidth = _this$state.resizingWidth;
      this.setState({
        resizingKey: null,
        resizingWidth: 0
      });
      if (!resizingKey || !resizingWidth) return;
      var column = this.columnManager.getColumn(resizingKey);
      this.props.onColumnResizeEnd({
        column: column,
        width: resizingWidth
      });
    }
  }, {
    key: "_handleColumnSort",
    value: function _handleColumnSort(event) {
      var key = event.currentTarget.dataset.key;
      var _this$props19 = this.props,
          sortBy = _this$props19.sortBy,
          sortState = _this$props19.sortState,
          onColumnSort = _this$props19.onColumnSort;
      var order = SortOrder.ASC;

      if (sortState) {
        order = sortState[key] === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
      } else if (key === sortBy.key) {
        order = sortBy.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
      }

      var column = this.columnManager.getColumn(key);
      onColumnSort({
        column: column,
        key: key,
        order: order
      });
    }
  }, {
    key: "_handleFrozenRowHeightChange",
    value: function _handleFrozenRowHeightChange(rowKey, size, rowIndex, frozen) {
      if (!frozen) {
        this._mainRowHeightMap[rowKey] = size;
      } else if (frozen === FrozenDirection.RIGHT) {
        this._rightRowHeightMap[rowKey] = size;
      } else {
        this._leftRowHeightMap[rowKey] = size;
      }

      var height = Math.max(this._mainRowHeightMap[rowKey] || 0, this._leftRowHeightMap[rowKey] || 0, this._rightRowHeightMap[rowKey] || 0);

      if (this._rowHeightMap[rowKey] !== height) {
        this._handleRowHeightChange(rowKey, height, rowIndex);
      }
    }
  }, {
    key: "_handleRowHeightChange",
    value: function _handleRowHeightChange(rowKey, size, rowIndex) {
      if (this._resetIndex === null) this._resetIndex = rowIndex;else if (this._resetIndex > rowIndex) this._resetIndex = rowIndex;
      this._rowHeightMapBuffer[rowKey] = size;

      this._updateRowHeights();
    }
  }]);

  return BaseTable;
}(React.PureComponent);

BaseTable.Column = Column;
BaseTable.PlaceholderKey = ColumnManager.PlaceholderKey;
BaseTable.defaultProps = {
  // 虚拟化
  // virtual: false,
  classPrefix: 'BaseTable',
  rowKey: 'id',
  data: [],
  frozenData: [],
  fixed: false,
  headerHeight: 50,
  rowHeight: 50,
  footerHeight: 0,
  defaultExpandedRowKeys: [],
  sortBy: {},
  useIsScrolling: false,
  overscanRowCount: 1,
  onEndReachedThreshold: 500,
  getScrollbarSize: defaultGetScrollbarSize,
  ignoreFunctionInColumnCompare: true,
  onScroll: noop,
  onRowsRendered: noop,
  onScrollbarPresenceChange: noop,
  onRowExpand: noop,
  onExpandedRowsChange: noop,
  onColumnSort: noop,
  onColumnResize: noop,
  onColumnResizeEnd: noop // getCellProps: noop,

};
BaseTable.propTypes = {
  /**
   * Prefix for table's inner className
   */
  classPrefix: PropTypes.string,

  /**
   * Class name for the table
   */
  className: PropTypes.string,

  /**
   * Custom style for the table
   */
  style: PropTypes.object,

  /**
   * A collection of Column
   */
  children: PropTypes.node,

  /**
   * Columns for the table
   */
  columns: PropTypes.arrayOf(PropTypes.shape(Column.propTypes)),

  /**
   * The data for the table
   */
  data: PropTypes.array.isRequired,

  /**
   * The data be frozen to top, `rowIndex` is negative and started from `-1`
   */
  frozenData: PropTypes.array,

  /**
   * The key field of each data item
   */
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * The width of the table
   */
  width: PropTypes.number.isRequired,

  /**
   * The height of the table, will be ignored if `maxHeight` is set
   */
  height: PropTypes.number,

  /**
   * The max height of the table, the table's height will auto change when data changes,
   * will turns to vertical scroll if reaches the max height
   */
  maxHeight: PropTypes.number,

  /**
   * The height of each table row, will be only used by frozen rows if `estimatedRowHeight` is set
   */
  rowHeight: PropTypes.number,

  /**
   * Estimated row height, the real height will be measure dynamically according to the content
   * The callback is of the shape of `({ rowData, rowIndex }) => number`
   */
  estimatedRowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

  /**
   * The height of the table header, set to 0 to hide the header, could be an array to render multi headers.
   */
  headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,

  /**
   * The height of the table footer
   */
  footerHeight: PropTypes.number,

  /**
   * Whether the width of the columns are fixed or flexible
   */
  fixed: PropTypes.bool,

  /**
   * Whether the table is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Custom renderer on top of the table component
   */
  overlayRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Custom renderer when the length of data is 0
   */
  emptyRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Custom footer renderer, available only if `footerHeight` is larger then 0
   */
  footerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Custom header renderer
   * The renderer receives props `{ cells, columns, headerIndex }`
   */
  headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Custom row renderer
   * The renderer receives props `{ isScrolling, cells, columns, rowData, rowIndex, depth }`
   */
  rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /**
   * Class name for the table header, could be a callback to return the class name
   * The callback is of the shape of `({ columns, headerIndex }) => string`
   */
  headerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Class name for the table row, could be a callback to return the class name
   * The callback is of the shape of `({ columns, rowData, rowIndex }) => string`
   */
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Extra props applied to header element
   * The handler is of the shape of `({ columns, headerIndex }) object`
   */
  headerProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Extra props applied to header cell element
   * The handler is of the shape of `({ columns, column, columnIndex, headerIndex }) => object`
   */
  headerCellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Extra props applied to row element
   * The handler is of the shape of `({ columns, rowData, rowIndex }) => object`
   */
  rowProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Extra props applied to row cell element
   * The handler is of the shape of `({ columns, column, columnIndex, rowData, rowIndex }) => object`
   */
  cellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Extra props applied to ExpandIcon component
   * The handler is of the shape of `({ rowData, rowIndex, depth, expandable, expanded }) => object`
   */
  expandIconProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * The key for the expand column which render the expand icon if the data is a tree
   */
  expandColumnKey: PropTypes.string,

  /**
   * Default expanded row keys when initialize the table
   */
  defaultExpandedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * Controlled expanded row keys
   */
  expandedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * A callback function when expand or collapse a tree node
   * The handler is of the shape of `({ expanded, rowData, rowIndex, rowKey }) => *`
   */
  onRowExpand: PropTypes.func,

  /**
   * A callback function when the expanded row keys changed
   * The handler is of the shape of `(expandedRowKeys) => *`
   */
  onExpandedRowsChange: PropTypes.func,

  /**
   * The sort state for the table, will be ignored if `sortState` is set
   */
  sortBy: PropTypes.shape({
    /**
     * Sort key
     */
    key: PropTypes.string,

    /**
     * Sort order
     */
    order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
  }),

  /**
   * Multiple columns sort state for the table
   *
   * example:
   * ```js
   * {
   *   'column-0': SortOrder.ASC,
   *   'column-1': SortOrder.DESC,
   * }
   * ```
   */
  sortState: PropTypes.object,

  /**
   * A callback function for the header cell click event
   * The handler is of the shape of `({ column, key, order }) => *`
   */
  onColumnSort: PropTypes.func,

  /**
   * A callback function when resizing the column width
   * The handler is of the shape of `({ column, width }) => *`
   */
  onColumnResize: PropTypes.func,

  /**
   * A callback function when resizing the column width ends
   * The handler is of the shape of `({ column, width }) => *`
   */
  onColumnResizeEnd: PropTypes.func,

  /**
   * Adds an additional isScrolling parameter to the row renderer.
   * This parameter can be used to show a placeholder row while scrolling.
   */
  useIsScrolling: PropTypes.bool,

  /**
   * Number of rows to render above/below the visible bounds of the list
   */
  overscanRowCount: PropTypes.number,

  /**
   * Custom scrollbar size measurement
   */
  getScrollbarSize: PropTypes.func,

  /**
   * A callback function when scrolling the table
   * The handler is of the shape of `({ scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested }) => *`
   *
   * `scrollLeft` and `scrollTop` are numbers.
   *
   * `horizontalDirection` and `verticalDirection` are either `forward` or `backward`.
   *
   * `scrollUpdateWasRequested` is a boolean. This value is true if the scroll was caused by `scrollTo*`,
   * and false if it was the result of a user interaction in the browser.
   */
  onScroll: PropTypes.func,

  /**
   * A callback function when scrolling the table within `onEndReachedThreshold` of the bottom
   * The handler is of the shape of `({ distanceFromEnd }) => *`
   */
  onEndReached: PropTypes.func,

  /**
   * Threshold in pixels for calling `onEndReached`.
   */
  onEndReachedThreshold: PropTypes.number,

  /**
   * A callback function with information about the slice of rows that were just rendered
   * The handler is of the shape of `({ overscanStartIndex, overscanStopIndex, startIndex， stopIndex }) => *`
   */
  onRowsRendered: PropTypes.func,

  /**
   * A callback function when the scrollbar presence state changed
   * The handler is of the shape of `({ size, vertical, horizontal }) => *`
   */
  onScrollbarPresenceChange: PropTypes.func,

  /**
   * A object for the row event handlers
   * Each of the keys is row event name, like `onClick`, `onDoubleClick` and etc.
   * Each of the handlers is of the shape of `({ rowData, rowIndex, rowKey, event }) => *`
   */
  rowEventHandlers: PropTypes.object,

  /**
   * whether to ignore function properties while comparing column definition
   */
  ignoreFunctionInColumnCompare: PropTypes.bool,

  /**
   * A object for the custom components, like `ExpandIcon` and `SortIndicator`
   */
  components: PropTypes.shape({
    TableCell: PropTypes.elementType,
    TableHeaderCell: PropTypes.elementType,
    ExpandIcon: PropTypes.elementType,
    SortIndicator: PropTypes.elementType
  })
};
export default BaseTable;