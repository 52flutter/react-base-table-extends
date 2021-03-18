"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icons = exports.ExpansionCell = exports.InlineFlexCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InlineFlexCell = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: center;\n"])));

exports.InlineFlexCell = InlineFlexCell;
var ExpansionCell = (0, _styledComponents.default)(InlineFlexCell)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  &.leaf {\n    cursor: default;\n  }\n\n  .expansion-icon {\n    fill: #999;\n    flex: 0 0 16px;\n    transition: transform 200ms;\n\n    &.expanded {\n      transform-origin: center center;\n      transform: rotate(90deg);\n    }\n  }\n"])));
exports.ExpansionCell = ExpansionCell;

function CaretDownIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: "false",
    preserveAspectRatio: "xMidYMid meet",
    fill: "currentColor",
    width: "16",
    height: "16",
    viewBox: "0 0 32 32"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M24 12L16 22 8 12z"
  }));
}

function InfoIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: "false",
    preserveAspectRatio: "xMidYMid meet",
    fill: "currentColor",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.5 11L8.5 6.5 6.5 6.5 6.5 7.5 7.5 7.5 7.5 11 6 11 6 12 10 12 10 11zM8 3.5c-.4 0-.8.3-.8.8S7.6 5 8 5c.4 0 .8-.3.8-.8S8.4 3.5 8 3.5z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S11.9,15,8,15z M8,2C4.7,2,2,4.7,2,8s2.7,6,6,6s6-2.7,6-6S11.3,2,8,2z"
  }));
}

function CaretRightIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: "false",
    preserveAspectRatio: "xMidYMid meet",
    fill: "currentColor",
    width: "16",
    height: "16",
    viewBox: "0 0 32 32"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 8L22 16 12 24z"
  }));
}

function LoadingIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    width: "16",
    height: "16",
    fill: "currentColor",
    viewBox: "0 0 1024 1024"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M512 74.667c-17.067 0-32 14.933-32 32V256c0 17.067 14.933 32 32 32s32-14.933 32-32V106.667c0-17.067-14.933-32-32-32zm181.333 288c8.534 0 17.067-2.134 23.467-8.534L821.333 249.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L672 309.333c-12.8 12.8-12.8 32 0 44.8 4.267 6.4 12.8 8.534 21.333 8.534zm224 117.333H768c-17.067 0-32 14.933-32 32s14.933 32 32 32h149.333c17.067 0 32-14.933 32-32s-14.933-32-32-32zM714.667 669.867c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8L774.4 819.2c6.4 6.4 14.933 8.533 23.467 8.533s17.066-2.133 23.466-8.533c12.8-12.8 12.8-32 0-44.8L714.667 669.867zM512 736c-17.067 0-32 14.933-32 32v149.333c0 17.067 14.933 32 32 32s32-14.933 32-32V768c0-17.067-14.933-32-32-32zm-202.667-66.133L204.8 774.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933 8.533 23.467 8.533s17.066-2.133 23.466-8.533l104.534-104.533c12.8-12.8 12.8-32 0-44.8s-36.267-12.8-46.934 0zM288 512c0-17.067-14.933-32-32-32H106.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H256c17.067 0 32-14.933 32-32zm-40.533-309.333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8L307.2 352c6.4 6.4 14.933 8.533 23.467 8.533s17.066-2.133 23.466-8.533c12.8-12.8 12.8-32 0-44.8L247.467 202.667z"
  }));
}

var icons = {
  Loading: LoadingIcon,
  CaretDown: CaretDownIcon,
  CaretRight: CaretRightIcon,
  Info: InfoIcon
};
exports.icons = icons;