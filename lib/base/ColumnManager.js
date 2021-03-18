"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Column = require("./Column");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColumnManager = /*#__PURE__*/function () {
  function ColumnManager(columns, fixed) {
    _classCallCheck(this, ColumnManager);

    this._origColumns = [];
    this.reset(columns, fixed);
  }

  _createClass(ColumnManager, [{
    key: "_cache",
    value: function _cache(key, fn) {
      if (key in this._cached) return this._cached[key];
      this._cached[key] = fn();
      return this._cached[key];
    }
  }, {
    key: "reset",
    value: function reset(columns, fixed) {
      var _this = this;

      this._columns = columns.map(function (column) {
        var width = column.width;

        if (column.resizable) {
          // don't reset column's `width` if `width` prop doesn't change
          var idx = _this._origColumns.findIndex(function (x) {
            return x.key === column.key;
          });

          if (idx >= 0 && _this._origColumns[idx].width === column.width) {
            width = _this._columns[idx].width;
          }
        }

        return _objectSpread(_objectSpread({}, column), {}, {
          width: width
        });
      });
      this._origColumns = columns;
      this._fixed = fixed;
      this._cached = {};
      this._columnStyles = this.recomputeColumnStyles();
    }
  }, {
    key: "resetCache",
    value: function resetCache() {
      this._cached = {};
    }
  }, {
    key: "getOriginalColumns",
    value: function getOriginalColumns() {
      return this._origColumns;
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return this._columns;
    }
  }, {
    key: "getVisibleColumns",
    value: function getVisibleColumns() {
      var _this2 = this;

      return this._cache('visibleColumns', function () {
        return _this2._columns.filter(function (column) {
          return !column.hidden;
        });
      });
    }
  }, {
    key: "hasFrozenColumns",
    value: function hasFrozenColumns() {
      var _this3 = this;

      return this._cache('hasFrozenColumns', function () {
        return _this3._fixed && _this3.getVisibleColumns().some(function (column) {
          return !!column.frozen;
        });
      });
    }
  }, {
    key: "hasLeftFrozenColumns",
    value: function hasLeftFrozenColumns() {
      var _this4 = this;

      return this._cache('hasLeftFrozenColumns', function () {
        return _this4._fixed && _this4.getVisibleColumns().some(function (column) {
          return column.frozen === _Column.FrozenDirection.LEFT || column.frozen === true;
        });
      });
    }
  }, {
    key: "hasRightFrozenColumns",
    value: function hasRightFrozenColumns() {
      var _this5 = this;

      return this._cache('hasRightFrozenColumns', function () {
        return _this5._fixed && _this5.getVisibleColumns().some(function (column) {
          return column.frozen === _Column.FrozenDirection.RIGHT;
        });
      });
    }
  }, {
    key: "getMainColumns",
    value: function getMainColumns() {
      var _this6 = this;

      return this._cache('mainColumns', function () {
        var columns = _this6.getVisibleColumns();

        if (!_this6.hasFrozenColumns()) return columns;
        var mainColumns = [];

        _this6.getLeftFrozenColumns().forEach(function (column) {
          //columns placeholder for the fixed table above them
          mainColumns.push(_objectSpread(_objectSpread({}, column), {}, _defineProperty({}, ColumnManager.PlaceholderKey, true)));
        });

        _this6.getVisibleColumns().forEach(function (column) {
          if (!column.frozen) mainColumns.push(column);
        });

        _this6.getRightFrozenColumns().forEach(function (column) {
          mainColumns.push(_objectSpread(_objectSpread({}, column), {}, _defineProperty({}, ColumnManager.PlaceholderKey, true)));
        });

        return mainColumns;
      });
    }
  }, {
    key: "getLeftFrozenColumns",
    value: function getLeftFrozenColumns() {
      var _this7 = this;

      return this._cache('leftFrozenColumns', function () {
        if (!_this7._fixed) return [];
        return _this7.getVisibleColumns().filter(function (column) {
          return column.frozen === _Column.FrozenDirection.LEFT || column.frozen === true;
        });
      });
    }
  }, {
    key: "getRightFrozenColumns",
    value: function getRightFrozenColumns() {
      var _this8 = this;

      return this._cache('rightFrozenColumns', function () {
        if (!_this8._fixed) return [];
        return _this8.getVisibleColumns().filter(function (column) {
          return column.frozen === _Column.FrozenDirection.RIGHT;
        });
      });
    }
  }, {
    key: "getColumn",
    value: function getColumn(key) {
      var idx = this._columns.findIndex(function (column) {
        return column.key === key;
      });

      return this._columns[idx];
    }
  }, {
    key: "getColumnsWidth",
    value: function getColumnsWidth() {
      var _this9 = this;

      return this._cache('columnsWidth', function () {
        return _this9.recomputeColumnsWidth(_this9.getVisibleColumns());
      });
    }
  }, {
    key: "getLeftFrozenColumnsWidth",
    value: function getLeftFrozenColumnsWidth() {
      var _this10 = this;

      return this._cache('leftFrozenColumnsWidth', function () {
        return _this10.recomputeColumnsWidth(_this10.getLeftFrozenColumns());
      });
    }
  }, {
    key: "getRightFrozenColumnsWidth",
    value: function getRightFrozenColumnsWidth() {
      var _this11 = this;

      return this._cache('rightFrozenColumnsWidth', function () {
        return _this11.recomputeColumnsWidth(_this11.getRightFrozenColumns());
      });
    }
  }, {
    key: "recomputeColumnsWidth",
    value: function recomputeColumnsWidth(columns) {
      return columns.reduce(function (width, column) {
        return width + column.width;
      }, 0);
    }
  }, {
    key: "setColumnWidth",
    value: function setColumnWidth(key, width) {
      var column = this.getColumn(key);
      column.width = width;
      this._cached = {};
      this._columnStyles[column.key] = this.recomputeColumnStyle(column);
    }
  }, {
    key: "getColumnStyle",
    value: function getColumnStyle(key) {
      return this._columnStyles[key];
    }
  }, {
    key: "getColumnStyles",
    value: function getColumnStyles() {
      return this._columnStyles;
    }
  }, {
    key: "recomputeColumnStyle",
    value: function recomputeColumnStyle(column) {
      var flexGrow = 0;
      var flexShrink = 0;

      if (!this._fixed) {
        flexGrow = typeof column.flexGrow === 'number' ? column.flexGrow : 0;
        flexShrink = typeof column.flexShrink === 'number' ? column.flexShrink : 1;
      } // workaround for Flex bug on IE: https://github.com/philipwalton/flexbugs#flexbug-7


      var flexValue = "".concat(flexGrow, " ").concat(flexShrink, " auto");

      var style = _objectSpread(_objectSpread({}, column.style), {}, {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue,
        width: column.width,
        overflow: 'hidden'
      });

      if (!this._fixed && column.maxWidth) {
        style.maxWidth = column.maxWidth;
      }

      if (!this._fixed && column.minWidth) {
        style.minWidth = column.minWidth;
      }

      return style;
    }
  }, {
    key: "recomputeColumnStyles",
    value: function recomputeColumnStyles() {
      var _this12 = this;

      return this._columns.reduce(function (styles, column) {
        styles[column.key] = _this12.recomputeColumnStyle(column);
        return styles;
      }, {});
    }
  }]);

  return ColumnManager;
}();

exports.default = ColumnManager;
ColumnManager.PlaceholderKey = '__placeholder__';