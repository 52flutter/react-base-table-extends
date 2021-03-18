"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var INVALID_VALUE = null; // copied from https://github.com/mzabriskie/react-draggable/blob/master/lib/utils/domFns.js

function addUserSelectStyles(doc) {
  if (!doc) return;
  var styleEl = doc.getElementById('react-draggable-style-el');

  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }

  if (doc.body) (0, _utils.addClassName)(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc) {
  if (!doc) return;

  try {
    if (doc.body) (0, _utils.removeClassName)(doc.body, 'react-draggable-transparent-selection');

    if (doc.selection) {
      doc.selection.empty();
    } else {
      // Remove selection caused by scroll, unless it's a focused input
      // (we use doc.defaultView in case we're in an iframe)
      var selection = (doc.defaultView || window).getSelection();

      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {// probably IE
  }
}

var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};
var dragEventFor = eventsFor.mouse;
/**
 * ColumnResizer for BaseTable
 */

var ColumnResizer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ColumnResizer, _React$PureComponent);

  var _super = _createSuper(ColumnResizer);

  function ColumnResizer(props) {
    var _this;

    _classCallCheck(this, ColumnResizer);

    _this = _super.call(this, props);
    _this.isDragging = false;
    _this.lastX = INVALID_VALUE;
    _this.width = 0;
    _this._setHandleRef = _this._setHandleRef.bind(_assertThisInitialized(_this));
    _this._handleClick = _this._handleClick.bind(_assertThisInitialized(_this));
    _this._handleMouseDown = _this._handleMouseDown.bind(_assertThisInitialized(_this));
    _this._handleMouseUp = _this._handleMouseUp.bind(_assertThisInitialized(_this));
    _this._handleTouchStart = _this._handleTouchStart.bind(_assertThisInitialized(_this));
    _this._handleTouchEnd = _this._handleTouchEnd.bind(_assertThisInitialized(_this));
    _this._handleDragStart = _this._handleDragStart.bind(_assertThisInitialized(_this));
    _this._handleDragStop = _this._handleDragStop.bind(_assertThisInitialized(_this));
    _this._handleDrag = _this._handleDrag.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ColumnResizer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.handleRef) {
        var ownerDocument = this.handleRef.ownerDocument;
        ownerDocument.removeEventListener(eventsFor.mouse.move, this._handleDrag);
        ownerDocument.removeEventListener(eventsFor.mouse.stop, this._handleDragStop);
        ownerDocument.removeEventListener(eventsFor.touch.move, this._handleDrag);
        ownerDocument.removeEventListener(eventsFor.touch.stop, this._handleDragStop);
        removeUserSelectStyles(ownerDocument);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          column = _this$props.column,
          onResizeStart = _this$props.onResizeStart,
          onResize = _this$props.onResize,
          onResizeStop = _this$props.onResizeStop,
          minWidth = _this$props.minWidth,
          rest = _objectWithoutProperties(_this$props, ["style", "column", "onResizeStart", "onResize", "onResizeStop", "minWidth"]);

      return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
        ref: this._setHandleRef,
        onClick: this._handleClick,
        onMouseDown: this._handleMouseDown,
        onMouseUp: this._handleMouseUp,
        onTouchStart: this._handleTouchStart,
        onTouchEnd: this._handleTouchEnd,
        style: _objectSpread({
          userSelect: 'none',
          touchAction: 'none',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          cursor: 'col-resize'
        }, style)
      }));
    }
  }, {
    key: "_setHandleRef",
    value: function _setHandleRef(ref) {
      this.handleRef = ref;
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      e.stopPropagation();
    }
  }, {
    key: "_handleMouseDown",
    value: function _handleMouseDown(e) {
      dragEventFor = eventsFor.mouse;

      this._handleDragStart(e);
    }
  }, {
    key: "_handleMouseUp",
    value: function _handleMouseUp(e) {
      dragEventFor = eventsFor.mouse;

      this._handleDragStop(e);
    }
  }, {
    key: "_handleTouchStart",
    value: function _handleTouchStart(e) {
      dragEventFor = eventsFor.touch;

      this._handleDragStart(e);
    }
  }, {
    key: "_handleTouchEnd",
    value: function _handleTouchEnd(e) {
      dragEventFor = eventsFor.touch;

      this._handleDragStop(e);
    }
  }, {
    key: "_handleDragStart",
    value: function _handleDragStart(e) {
      if (typeof e.button === 'number' && e.button !== 0) return;
      this.isDragging = true;
      this.lastX = INVALID_VALUE;
      this.width = this.props.column.width;
      this.props.onResizeStart(this.props.column);
      var ownerDocument = this.handleRef.ownerDocument;
      addUserSelectStyles(ownerDocument);
      ownerDocument.addEventListener(dragEventFor.move, this._handleDrag);
      ownerDocument.addEventListener(dragEventFor.stop, this._handleDragStop);
    }
  }, {
    key: "_handleDragStop",
    value: function _handleDragStop(e) {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.props.onResizeStop(this.props.column);
      var ownerDocument = this.handleRef.ownerDocument;
      removeUserSelectStyles(ownerDocument);
      ownerDocument.removeEventListener(dragEventFor.move, this._handleDrag);
      ownerDocument.removeEventListener(dragEventFor.stop, this._handleDragStop);
    }
  }, {
    key: "_handleDrag",
    value: function _handleDrag(e) {
      var clientX = e.clientX;

      if (e.type === eventsFor.touch.move) {
        e.preventDefault();
        if (e.targetTouches && e.targetTouches[0]) clientX = e.targetTouches[0].clientX;
      }

      var offsetParent = this.handleRef.offsetParent;
      var offsetParentRect = offsetParent.getBoundingClientRect();
      var x = clientX + offsetParent.scrollLeft - offsetParentRect.left;

      if (this.lastX === INVALID_VALUE) {
        this.lastX = x;
        return;
      }

      var _this$props2 = this.props,
          column = _this$props2.column,
          MIN_WIDTH = _this$props2.minWidth;
      var width = column.width,
          maxWidth = column.maxWidth,
          _column$minWidth = column.minWidth,
          minWidth = _column$minWidth === void 0 ? MIN_WIDTH : _column$minWidth;
      var movedX = x - this.lastX;
      if (!movedX) return;
      this.width = this.width + movedX;
      this.lastX = x;
      var newWidth = this.width;

      if (maxWidth && newWidth > maxWidth) {
        newWidth = maxWidth;
      } else if (newWidth < minWidth) {
        newWidth = minWidth;
      }

      if (newWidth === width) return;
      this.props.onResize(column, newWidth);
    }
  }]);

  return ColumnResizer;
}(_react.default.PureComponent);

ColumnResizer.defaultProps = {
  onResizeStart: _utils.noop,
  onResize: _utils.noop,
  onResizeStop: _utils.noop,
  minWidth: 30
};
ColumnResizer.propTypes = {
  /**
   * Custom style for the drag handler
   */
  style: _propTypes.default.object,

  /**
   * The column object to be dragged
   */
  column: _propTypes.default.object,

  /**
   * A callback function when resizing started
   * The callback is of the shape of `(column) => *`
   */
  onResizeStart: _propTypes.default.func,

  /**
   * A callback function when resizing the column
   * The callback is of the shape of `(column, width) => *`
   */
  onResize: _propTypes.default.func,

  /**
   * A callback function when resizing stopped
   * The callback is of the shape of `(column) => *`
   */
  onResizeStop: _propTypes.default.func,

  /**
   * Minimum width of the column could be resized to if the column's `minWidth` is not set
   */
  minWidth: _propTypes.default.number
};
var _default = ColumnResizer;
exports.default = _default;