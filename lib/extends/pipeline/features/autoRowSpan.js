"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoRowSpan = autoRowSpan;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isIdentity(x, y) {
  return x === y;
}

function autoRowSpan() {
  return function autoRowSpanStep(pipeline) {
    var dataSource = pipeline.getDataSource();
    pipeline.mapColumns((0, _utils.makeRecursiveMapper)(function (col, _ref) {
      var _col$features;

      var startIndex = _ref.startIndex,
          endIndex = _ref.endIndex;

      if (!((_col$features = col.features) === null || _col$features === void 0 ? void 0 : _col$features.autoRowSpan)) {
        return col;
      }

      if (!(0, _utils.isLeafNode)(col)) {
        return col;
      }

      var isFunc = typeof col.features.autoRowSpan === 'function';
      var shouldMergeCell = isFunc ? col.features.autoRowSpan : isIdentity;
      var spanRects = [];
      var lastBottom = 0;
      var prevValue = null;
      var prevRow = null;

      for (var rowIndex = 0; rowIndex < dataSource.length; rowIndex++) {
        var row = dataSource[rowIndex];
        var value = (0, _utils.safeGetValue)(col, row, rowIndex);

        if (rowIndex === 0 || !shouldMergeCell(prevValue, value, prevRow, row)) {
          var spanRect = {
            top: lastBottom,
            bottom: rowIndex,
            left: startIndex,
            right: endIndex
          };
          var j = 0;

          for (var i = lastBottom; i < rowIndex; i++) {
            if (lastBottom === i) {
              spanRects.push(spanRect);
            } else {
              spanRects.push(_objectSpread(_objectSpread({}, spanRect), {}, {
                top: lastBottom + j,
                bottom: lastBottom + 1 + j
              }));
            }

            j++;
          }

          lastBottom = rowIndex;
        }

        prevValue = value;
        prevRow = row;
      }

      for (var _i = lastBottom; _i < dataSource.length; _i++) {
        spanRects.push({
          top: lastBottom,
          bottom: dataSource.length,
          left: startIndex,
          right: endIndex
        });
      } // console.log('spanRects', spanRects);


      return _objectSpread(_objectSpread({}, col), {}, {
        getSpanRect: function getSpanRect(rowIndex) {
          return spanRects[rowIndex];
        }
      });
    }));
    pipeline.appendTableProps('rowRenderer', function (_ref2) {
      var rowData = _ref2.rowData,
          rowIndex = _ref2.rowIndex,
          cells = _ref2.cells,
          columns = _ref2.columns;
      columns.map(function (col, spanIndex) {
        if (col === null || col === void 0 ? void 0 : col.getSpanRect) {
          var _ref3 = col.getSpanRect(rowIndex) || {},
              _ref3$top = _ref3.top,
              top = _ref3$top === void 0 ? 0 : _ref3$top,
              _ref3$bottom = _ref3.bottom,
              bottom = _ref3$bottom === void 0 ? 0 : _ref3$bottom; // const colSpan = right - left;
          // if (colSpan > 1 && cells[spanIndex]) {
          //   let width = cells[spanIndex].props.style.width;
          //   for (let i = 1; i < colSpan; i++) {
          //     width += cells[spanIndex + i].props.style.width;
          //     cells[spanIndex + i] = null;
          //   }
          //   const style = {
          //     ...cells[spanIndex].props.style,
          //     width,
          //   };
          //   cells[spanIndex] = React.cloneElement(cells[spanIndex], { style, className: cx(cells[spanIndex].props?.className, 'table-span-cell') });
          // }


          var rowSpan = bottom - top;

          if (rowSpan > 1 && cells[spanIndex]) {
            var _cell$props, _cell$props2;

            var cell = cells[spanIndex];

            var style = _objectSpread(_objectSpread({}, cell === null || cell === void 0 ? void 0 : (_cell$props = cell.props) === null || _cell$props === void 0 ? void 0 : _cell$props.style), {}, {
              height: rowSpan * pipeline.getRowHeight() - 1,
              alignSelf: 'flex-start',
              zIndex: 1
            });

            cells[spanIndex] = /*#__PURE__*/_react.default.cloneElement(cell, {
              style: style,
              className: (0, _classnames.default)(cell === null || cell === void 0 ? void 0 : (_cell$props2 = cell.props) === null || _cell$props2 === void 0 ? void 0 : _cell$props2.className, 'table-span-cell')
            });
          }
        }
      });
      return cells;
    });
    return pipeline;
  };
}