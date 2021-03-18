var _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
import { makeRecursiveMapper, safeHeaderRender, safeRender } from '../utils/utils';
var HeaderCellWithTips = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n\n  .tip-icon-wrapper {\n    margin-left: 2px;\n    margin-right: 1px;\n  }\n\n  .tip-icon {\n    display: flex;\n    fill: currentColor;\n  }\n"])));
export function tips() {
  return function tipsSetup(pipeline) {
    return pipeline.mapColumns(makeRecursiveMapper(function (col) {
      var _col$features;

      if (!((_col$features = col.features) === null || _col$features === void 0 ? void 0 : _col$features.tips)) {
        return col;
      } // const Balloon = pipeline.ctx.components.Balloon;


      var Tooltip = pipeline.ctx.components.Tooltip;

      if (Tooltip == null) {
        throw new Error('使用 tips 之前需要通过 pipeline context 设置 components.Tooltip');
      }

      var justifyContent = col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start';
      return _objectSpread(_objectSpread({}, col), {}, {
        headerRenderer: function headerRenderer(args) {
          return /*#__PURE__*/React.createElement(Tooltip, null, safeHeaderRender(col, args)); // if (typeof col.features.tips !== 'string') {
          //   return <Tooltip>{safeHeaderRender(col, args)}</Tooltip>;
          // }
          // return (
          //   <Tooltip>
          //     <HeaderCellWithTips style={{ justifyContent }}>
          //       <>
          //         {safeHeaderRender(col, args)}
          //         <Tooltip style={{ width: 'auto' }} auto={false} tooltip={col.features.tips}>
          //           <div className="tip-icon-wrapper">
          //             <icons.Info className="tip-icon" />
          //           </div>
          //         </Tooltip>
          //       </>
          //     </HeaderCellWithTips>
          //   </Tooltip>
          // );
        },
        cellRenderer: function cellRenderer(args) {
          return /*#__PURE__*/React.createElement(Tooltip, null, safeRender(col, args));
        }
      });
    }));
  };
}