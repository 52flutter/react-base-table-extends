"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = empty;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Empty = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  font-size: 16px;\n"])));

function empty() {
  return function setup(pipeline) {
    var component = pipeline.ctx.components.Empty || /*#__PURE__*/_react.default.createElement(Empty, null, "Table is empty");

    pipeline.appendTableProps('emptyRenderer', component);
    return pipeline;
  };
}