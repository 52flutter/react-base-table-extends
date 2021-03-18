"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = loading;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rotate = (0, _styledComponents.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n"])));

var Loader = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  border-radius: 100%;\n  margin: 2px;\n  border: 2px solid #0696d7;\n  border-bottom-color: transparent;\n  margin: 2px;\n  width: ", "px;\n  height: ", "px;\n  animation: ", " 0.75s linear infinite;\n"])), function (props) {
  return props.small ? 12 : 22;
}, function (props) {
  return props.small ? 12 : 22;
}, rotate);

var LoadingLayer = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.3);\n  margin: 0;\n  width: 100%;\n  height: 100%;\n"])));

function loading(_ref) {
  var loading = _ref.loading;
  return function setup(pipeline) {
    var renderOverlay = function renderOverlay() {
      if (loading) {
        if (pipeline.ctx.components.loading) {
          return pipeline.ctx.components.loading;
        }

        return /*#__PURE__*/_react.default.createElement(LoadingLayer, null, /*#__PURE__*/_react.default.createElement(Loader, null));
      }

      return null;
    };

    pipeline.appendTableProps('overlayRenderer', renderOverlay);
    return pipeline;
  };
}