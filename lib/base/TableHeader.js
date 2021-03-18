"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var TableHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TableHeader, _React$PureComponent);

  var _super = _createSuper(TableHeader);

  function TableHeader(props) {
    var _this;

    _classCallCheck(this, TableHeader);

    _this = _super.call(this, props);
    _this.renderHeaderRow = _this.renderHeaderRow.bind(_assertThisInitialized(_this));
    _this.renderFrozenRow = _this.renderFrozenRow.bind(_assertThisInitialized(_this));
    _this._setRef = _this._setRef.bind(_assertThisInitialized(_this));
    _this.scrollLeft = 0;
    return _this;
  }

  _createClass(TableHeader, [{
    key: "scrollTo",
    value: function scrollTo(offset) {
      if (this.headerRef && this.scrollLeft !== offset) {
        this.scrollLeft = offset;
        this.headerRef.scrollLeft = offset;
      }
    }
  }, {
    key: "renderHeaderRow",
    value: function renderHeaderRow(height, index) {
      var _this$props = this.props,
          columns = _this$props.columns,
          headerRenderer = _this$props.headerRenderer;
      if (height <= 0) return null;
      var style = {
        width: '100%',
        height: height
      };
      return headerRenderer({
        style: style,
        columns: columns,
        headerIndex: index
      });
    }
  }, {
    key: "renderFrozenRow",
    value: function renderFrozenRow(rowData, index) {
      var _this$props2 = this.props,
          columns = _this$props2.columns,
          rowHeight = _this$props2.rowHeight,
          rowRenderer = _this$props2.rowRenderer;
      var style = {
        width: '100%',
        height: rowHeight
      }; // for frozen row the `rowIndex` is negative

      var rowIndex = -index - 1;
      return rowRenderer({
        style: style,
        columns: columns,
        rowData: rowData,
        rowIndex: rowIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          width = _this$props3.width,
          height = _this$props3.height,
          rowWidth = _this$props3.rowWidth,
          headerHeight = _this$props3.headerHeight,
          frozenData = _this$props3.frozenData;
      if (height <= 0) return null;
      var style = {
        width: width,
        height: height,
        position: 'relative',
        overflow: 'hidden'
      };
      var innerStyle = {
        width: rowWidth,
        height: height
      };
      var rowHeights = Array.isArray(headerHeight) ? headerHeight : [headerHeight];
      return /*#__PURE__*/_react.default.createElement("div", {
        role: "grid",
        ref: this._setRef,
        className: className,
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        role: "rowgroup",
        style: innerStyle
      }, rowHeights.map(this.renderHeaderRow), frozenData.map(this.renderFrozenRow)));
    }
  }, {
    key: "_setRef",
    value: function _setRef(ref) {
      this.headerRef = ref;
    }
  }]);

  return TableHeader;
}(_react.default.PureComponent);

TableHeader.propTypes = {
  className: _propTypes.default.string,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  headerHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]).isRequired,
  rowWidth: _propTypes.default.number.isRequired,
  rowHeight: _propTypes.default.number.isRequired,
  columns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  data: _propTypes.default.array.isRequired,
  frozenData: _propTypes.default.array,
  headerRenderer: _propTypes.default.func.isRequired,
  rowRenderer: _propTypes.default.func.isRequired
};
var _default = TableHeader;
exports.default = _default;