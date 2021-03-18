var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
var Empty = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  font-size: 16px;\n"])));
export function empty() {
  return function setup(pipeline) {
    var component = pipeline.ctx.components.Empty || /*#__PURE__*/React.createElement(Empty, null, "Table is empty");
    pipeline.appendTableProps('emptyRenderer', component);
    return pipeline;
  };
}