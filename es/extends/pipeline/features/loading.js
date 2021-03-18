var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled, { keyframes } from 'styled-components';
var rotate = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var Loader = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  border-radius: 100%;\n  margin: 2px;\n  border: 2px solid #0696d7;\n  border-bottom-color: transparent;\n  margin: 2px;\n  width: ", "px;\n  height: ", "px;\n  animation: ", " 0.75s linear infinite;\n"])), function (props) {
  return props.small ? 12 : 22;
}, function (props) {
  return props.small ? 12 : 22;
}, rotate);
var LoadingLayer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.3);\n  margin: 0;\n  width: 100%;\n  height: 100%;\n"])));
export function loading(_ref) {
  var loading = _ref.loading;
  return function setup(pipeline) {
    var renderOverlay = function renderOverlay() {
      if (loading) {
        if (pipeline.ctx.components.loading) {
          return pipeline.ctx.components.loading;
        }

        return /*#__PURE__*/React.createElement(LoadingLayer, null, /*#__PURE__*/React.createElement(Loader, null));
      }

      return null;
    };

    pipeline.appendTableProps('overlayRenderer', renderOverlay);
    return pipeline;
  };
}