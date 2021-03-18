"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupHeader = groupHeader;
exports.TreeUtils = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var padding = window['table-cell-padding'] || 7.5;

var getAllChildren = function getAllChildren(item) {
  var _item$children;

  var children = [];

  function deepChild(node) {
    if (node.hidden !== true) {
      children.push(node);
    }

    if (node.children) {
      node.children.forEach(function (p) {
        deepChild(p);
      });
    }
  }

  item === null || item === void 0 ? void 0 : (_item$children = item.children) === null || _item$children === void 0 ? void 0 : _item$children.forEach(function (p) {
    deepChild(p);
  });
  return children;
};

var getWidth = function getWidth(leafColumns, item, cells) {
  var _column = leafColumns.filter(function (p) {
    return p.key === item.key;
  });

  if ((_column === null || _column === void 0 ? void 0 : _column.length) > 0) {
    return _column[0].width;
  }

  var children = getAllChildren(item);
  var width = 0;
  children.forEach(function (c) {
    if (c.hidden !== true) {
      var columnIndex = leafColumns.findIndex(function (p) {
        return p.key === c.key;
      });

      if (columnIndex >= 0) {
        var _cells$columnIndex, _cells$columnIndex$pr, _cells$columnIndex$pr2;

        if ((_cells$columnIndex = cells[columnIndex]) === null || _cells$columnIndex === void 0 ? void 0 : (_cells$columnIndex$pr = _cells$columnIndex.props) === null || _cells$columnIndex$pr === void 0 ? void 0 : (_cells$columnIndex$pr2 = _cells$columnIndex$pr.style) === null || _cells$columnIndex$pr2 === void 0 ? void 0 : _cells$columnIndex$pr2.width) width += cells[columnIndex].props.style.width;
      }
    }
  });
  return width;
};

var geLeafNode = function geLeafNode(leafColumns, item) {
  // 如果参数本身就是叶子节点
  var _column = leafColumns.filter(function (p) {
    return p.key === item.key;
  });

  if ((_column === null || _column === void 0 ? void 0 : _column.length) > 0) {
    return _column;
  }

  var children = getAllChildren(item);
  var resData = [];
  children.forEach(function (c) {
    if (c.hidden !== true) {
      var columnIndex = leafColumns.findIndex(function (p) {
        return p.key === c.key;
      });

      if (columnIndex >= 0) {
        resData.push(c);
      }
    }
  });
  return children;
};

var getMinWidth = function getMinWidth(columns, item, cells) {
  var _column = columns.filter(function (p) {
    return p.key === item.key;
  });

  if ((_column === null || _column === void 0 ? void 0 : _column.length) > 0) {
    return _column[0].minWidth;
  }

  var children = getAllChildren(item);
  var width = 0;
  children.forEach(function (c) {
    if (c.hidden !== true) {
      var columnIndex = columns.findIndex(function (p) {
        return p.key === c.key;
      });

      if (columnIndex >= 0) {
        var _cells$columnIndex2, _cells$columnIndex2$p;

        if ((_cells$columnIndex2 = cells[columnIndex]) === null || _cells$columnIndex2 === void 0 ? void 0 : (_cells$columnIndex2$p = _cells$columnIndex2.props) === null || _cells$columnIndex2$p === void 0 ? void 0 : _cells$columnIndex2$p.style.minWidth) {
          width += cells[columnIndex].props.style.minWidth;
        }
      }
    }
  });
  return width;
};

var isFixed = function isFixed(style) {
  // fixed 等于true的时候是不铺满的按固定宽度来
  if (style.flex) {
    var flexStr = style.flex;
    var flexArr = flexStr.split(' ');
    var flexNum = Number(flexArr[0]);

    if (flexNum !== 0 && flexNum.toString() !== 'NaN') {
      return false;
    }

    return true;
  }

  return true;
};

var TreeUtils = /*#__PURE__*/function () {
  function TreeUtils() {
    _classCallCheck(this, TreeUtils);
  }

  _createClass(TreeUtils, null, [{
    key: "deepChild",
    value: function deepChild(node) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var callBack = arguments.length > 2 ? arguments[2] : undefined;
      callBack && callBack(node, deep);

      if (node && node.children) {
        node.children.forEach(function (p) {
          TreeUtils.deepChild(p, deep + 1, callBack);
        });
      }
    }
  }, {
    key: "getTreeNodeLevel",
    value: function getTreeNodeLevel(root, item) {
      var max = 0;
      root.map(function (p) {
        TreeUtils.deepChild(p, 0, function (node, deep) {
          if (node.key === item.key) {
            max = deep;
          }
        });
      });
      return max;
    }
  }, {
    key: "getTreeMaxLevel",
    value: function getTreeMaxLevel(root) {
      var max = 0;
      root.map(function (p) {
        TreeUtils.deepChild(p, 0, function (node, deep) {
          if (max < deep) {
            max = deep;
          }
        });
      });
      return max;
    }
  }, {
    key: "getTreeNodeByLevel",
    value: function getTreeNodeByLevel(root, level) {
      var res = [];
      root.map(function (p) {
        TreeUtils.deepChild(p, 0, function (node, deep) {
          if (level === deep && node.hidden !== true) {
            res.push(node);
          }
        });
      });
      return res;
    }
  }]);

  return TreeUtils;
}();

exports.TreeUtils = TreeUtils;

function groupHeader(opts) {
  return function (pipeline) {
    var columns = pipeline.getColumns();

    if (columns.find(function (p) {
      return p.children !== null && p.children !== undefined;
    })) {
      var flatColumns = (0, _utils.collectNodes)(columns);

      var _padding = (opts === null || opts === void 0 ? void 0 : opts.cellPadding) || 7.5;

      var colTreeInfo = {};
      pipeline.mapColumns((0, _utils.makeRecursiveMapper)(function (col, args) {
        // const range = { start: startIndex, end: endIndex };
        colTreeInfo[col.key] = args;
        return _objectSpread({}, col);
      }));
      var maxLevel = 0;
      var rootColumns = [];
      Object.keys(colTreeInfo).map(function (key) {
        var level = colTreeInfo[key].path.length;

        if (level > maxLevel) {
          maxLevel = level;
        }

        if (level === 1) {
          rootColumns.push(flatColumns.find(function (p) {
            return p.key === key;
          }));
        }
      });
      var headerHead = (opts === null || opts === void 0 ? void 0 : opts.headHeight) ? opts.headHeight : pipeline.getHeaderHeight();
      var headHeight = Array.isArray(headerHead) ? headerHead[0] : headerHead;

      var headerRenderer = function headerRenderer(_ref) {
        var cells = _ref.cells,
            columns = _ref.columns,
            headerIndex = _ref.headerIndex;

        if (maxLevel === 0) {
          return cells;
        }

        var groupCells = [];
        var renderEndMap = {};
        console.log('cells', cells);

        var renderTreeLevel = function renderTreeLevel(tree, level, maxLevel, columnIndex, headerIndex) {
          var column = columns[columnIndex];
          var columnLevel = TreeUtils.getTreeNodeLevel([tree], column);

          if (columnLevel < headerIndex) {
            if (renderEndMap[column.key.toString() + headerIndex]) {
              return;
            }

            renderEndMap[column.key.toString() + headerIndex] = true;
            var width = getWidth(columns, column, cells); //补充固定的宽度 否则会错位

            var leafNodes = geLeafNode(columns, column);
            var paddingStyle = {
              borderLeft: "".concat(leafNodes.length, "px solid transparent"),
              padding: "0 ".concat(leafNodes.length * _padding, "px")
            };
            groupCells.push( /*#__PURE__*/_react.default.createElement("div", {
              key: column.key,
              className: "BaseTable__header-cell",
              style: _objectSpread(_objectSpread({}, cells[columnIndex].props.style), {}, {
                width: width,
                minWidth: getMinWidth(flatColumns, column, cells),
                height: 0,
                flexGrow: !isFixed(cells[columnIndex].props.style) ? width : 0,
                display: 'flex',
                justifyContent: 'center'
              }, paddingStyle)
            }));
            return;
          } // 寻找对应层次的节点


          var nodes = TreeUtils.getTreeNodeByLevel([tree], headerIndex);
          nodes.map(function (item) {
            var _item$children2;

            if (renderEndMap[item.key.toString() + headerIndex]) {
              return;
            } // let treeMaxLevel = TreeUtils.getTreeMaxLevel([item]);


            if ((_item$children2 = item.children) === null || _item$children2 === void 0 ? void 0 : _item$children2.length) {
              var _width = getWidth(columns, item, cells); //补充固定的宽度 左右边距 边框等 否则会错位


              var _leafNodes = geLeafNode(columns, item);

              console.log('leafNodes', _leafNodes, item);
              var _paddingStyle = {
                borderLeft: "".concat(_leafNodes.length, "px solid transparent"),
                padding: "0 ".concat(_leafNodes.length * _padding, "px")
              };
              groupCells.push( /*#__PURE__*/_react.default.createElement("div", {
                key: item.key,
                className: "BaseTable__header-cell",
                style: _objectSpread(_objectSpread({}, cells[columnIndex].props.style), {}, {
                  width: _width,
                  minWidth: getMinWidth(columns, item, cells),
                  flexGrow: !isFixed(cells[columnIndex].props.style) ? _width : 0,
                  display: 'flex',
                  justifyContent: 'center',
                  height: headHeight - 1,
                  lineHeight: "".concat(headHeight - 1, "px")
                }, _paddingStyle)
              }, item.title));
              renderEndMap[item.key.toString() + headerIndex] = true;
            } else {
              var realColumnIndex = columns.findIndex(function (p) {
                return p.key === item.key;
              });
              groupCells.push( /*#__PURE__*/_react.default.cloneElement(cells[realColumnIndex], {
                style: _objectSpread(_objectSpread({}, cells[realColumnIndex].props.style), {}, {
                  flexGrow: !isFixed(cells[realColumnIndex].props.style) ? getWidth(columns, item, cells) : cells[realColumnIndex].props.style.flexGrow,
                  marginTop: (maxLevel - level) * headHeight,
                  lineHeight: "".concat((maxLevel - level + 1) * headHeight, "px"),
                  height: (maxLevel - level + 1) * headHeight
                })
              }));
              renderEndMap[item.key.toString() + headerIndex] = true;
            }
          });
        };

        columns.forEach(function (column, columnIndex) {
          if (column['__placeholder__']) {
            groupCells.push(cells[columnIndex]);
            return;
          }

          var root = colTreeInfo[column.key].path[0];
          var tree = root;
          var rootMaxLevel = colTreeInfo[column.key].path.length;
          renderTreeLevel(tree, headerIndex, maxLevel, columnIndex, headerIndex);
        });
        return groupCells;
      };

      pipeline.appendTableProps('headerRenderer', headerRenderer);
      pipeline.appendTableProps('headerHeight', Array.from(Array(maxLevel + 1), function (v, k) {
        return headHeight;
      }));
      pipeline.columns((0, _utils.collectNodes)(columns, 'leaf-only')); // headerHeight: Array.from(Array(maxLevel + 1), (v, k) => headHeight),
      // columns: allColumns.filter(p => !p.children), console.log('maxLevel', maxLevel, colTreeInfo, flatColumns, rootColumns, maxLevel);
    }

    return pipeline;
  };
}