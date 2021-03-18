"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wrapper = function Wrapper(input) {
  _classCallCheck(this, Wrapper);

  Object.assign(this, input);
};

var TreeDataHelper = /*#__PURE__*/function () {
  function TreeDataHelper(opts) {
    var _this = this;

    _classCallCheck(this, TreeDataHelper);

    this.isDetached = function (node) {
      var _this$opts$isDetached, _this$opts$isDetached2, _this$opts;

      return (_this$opts$isDetached = (_this$opts$isDetached2 = (_this$opts = _this.opts).isDetached) === null || _this$opts$isDetached2 === void 0 ? void 0 : _this$opts$isDetached2.call(_this$opts, node)) !== null && _this$opts$isDetached !== void 0 ? _this$opts$isDetached : false;
    };

    this.opts = opts;
    this.valueSet = new Set(opts.value);
    this.initWrapperTree();
  }

  _createClass(TreeDataHelper, [{
    key: "value",
    get: function get() {
      return this.opts.value;
    }
  }, {
    key: "initWrapperTree",
    value: function initWrapperTree() {
      var valueSet = new Set(this.value);
      this.rootWrapper = new Wrapper({
        root: true,
        children: []
      });
      this.wrapperMap = new Map();
      var getNodeValue = this.opts.getNodeValue;
      var isDetached = this.isDetached,
          wrapperMap = this.wrapperMap;
      dfs(this.rootWrapper, this.opts.tree, false);

      function dfs(parentWrapper, nodes, inheritParentChecked) {
        // allChildrenChecked 先默认设置为 true
        // dfs 过程中可能会更新 allChildrenChecked
        parentWrapper.allChildrenChecked = true;

        if (process.env.NODE_ENV !== 'production') {
          if (nodes.every(isDetached)) {
            console.warn('TreeDataHelper 检测到部分节点的下所有子节点均为 detached 状态，这将导致该节点变为「无效节点」', parentWrapper.node);
          }
        }

        var _iterator = _createForOfIteratorHelper(nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            var detached = isDetached(node);
            var exactChecked = valueSet.has(getNodeValue(node));

            if (exactChecked && !detached) {
              parentWrapper.anyDescendentsChecked = true;
            }

            var parentChecked = !detached && inheritParentChecked;
            var checked = exactChecked || parentChecked;
            var wrapper = new Wrapper({
              parent: parentWrapper,
              node: node,
              checked: checked,
              exactChecked: exactChecked,
              parentChecked: parentChecked,
              anyDescendentsChecked: checked,
              detached: detached
            });
            wrapperMap.set(getNodeValue(node), wrapper);
            parentWrapper.children.push(wrapper);

            if (!(0, _utils.isLeafNode)(node)) {
              wrapper.children = [];
              dfs(wrapper, node.children, checked);

              if (wrapper.anyDescendentsChecked && !detached) {
                parentWrapper.anyDescendentsChecked = true;
              }

              if (wrapper.allChildrenChecked) {
                wrapper.checked = true; // 当一个节点因为「子节点被全选」而变为 checked 时，我们需要更新子节点的 parentChecked 字段

                var _iterator2 = _createForOfIteratorHelper(wrapper.children),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var child = _step2.value;

                    if (!child.detached) {
                      child.parentChecked = true;
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            }

            if (!wrapper.checked && !detached) {
              parentWrapper.allChildrenChecked = false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "isIndeterminate",
    value: function isIndeterminate(nodeValue) {
      var wrapper = this.wrapperMap.get(nodeValue);
      return !wrapper.checked && wrapper.anyDescendentsChecked;
    }
  }, {
    key: "isChecked",
    value: function isChecked(nodeValue) {
      var wrapper = this.wrapperMap.get(nodeValue);
      return wrapper.checked;
    }
  }, {
    key: "getValueAfterCheck",
    value: function getValueAfterCheck(nodeValue) {
      if (this.isChecked(nodeValue)) {
        return this.getCleanValue();
      }

      var nextValue = _utils.arrayUtils.merge(this.value, [nodeValue]);

      return new TreeDataHelper(_objectSpread(_objectSpread({}, this.opts), {}, {
        value: nextValue
      })).getCleanValue();
    }
  }, {
    key: "getValueAfterUncheck",
    value: function getValueAfterUncheck(nodeValue) {
      if (!this.isChecked(nodeValue)) {
        return this.getCleanValue();
      }

      var wrapper = this.wrapperMap.get(nodeValue);
      var getNodeValue = this.opts.getNodeValue;
      var appendArray = getAppendArray(wrapper);
      var removeSet = getRemoveSet(wrapper);

      var nextValue = _utils.arrayUtils.diff(this.value.concat(appendArray), removeSet);

      return new TreeDataHelper(_objectSpread(_objectSpread({}, this.opts), {}, {
        value: nextValue
      })).getCleanValue();

      function getAppendArray(startWrapper) {
        var result = [];
        var current = startWrapper;

        while (current.parentChecked && !current.detached) {
          var _iterator3 = _createForOfIteratorHelper(current.parent.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var sibling = _step3.value;

              if (sibling === current || sibling.exactChecked || sibling.detached) {
                continue;
              }

              result.push(getNodeValue(sibling.node));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          current = current.parent;
        }

        return result;
      }

      function getRemoveSet(startWrapper) {
        var result = new Set();
        var wrapper = startWrapper; // 不断向上收集选中的父节点

        while (true) {
          result.add(getNodeValue(wrapper.node));

          if (wrapper.detached || !wrapper.parentChecked) {
            break;
          }

          wrapper = wrapper.parent;
        }

        function dfs(wrappers) {
          if (wrappers == null) {
            return;
          }

          var _iterator4 = _createForOfIteratorHelper(wrappers),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _wrapper = _step4.value;

              if (_wrapper.detached || !_wrapper.checked) {
                continue;
              }

              result.add(getNodeValue(_wrapper.node));

              if (!(0, _utils.isLeafNode)(_wrapper) && _wrapper.anyDescendentsChecked) {
                dfs(_wrapper.children);
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } // 收集所有的子孙节点


        dfs(startWrapper.children);
        return result;
      }
    }
  }, {
    key: "getValueAfterToggle",
    value: function getValueAfterToggle(nodeValue) {
      if (this.isChecked(nodeValue)) {
        return this.getValueAfterUncheck(nodeValue);
      } else {
        return this.getValueAfterCheck(nodeValue);
      }
    }
  }, {
    key: "getNode",
    value: function getNode(nodeValue) {
      var _this$wrapperMap$get;

      return (_this$wrapperMap$get = this.wrapperMap.get(nodeValue)) === null || _this$wrapperMap$get === void 0 ? void 0 : _this$wrapperMap$get.node;
    }
  }, {
    key: "getCleanValue",
    value: function getCleanValue() {
      var _this2 = this;

      var _this$opts2 = this.opts,
          checkedStrategy = _this$opts2.checkedStrategy,
          getNodeValue = _this$opts2.getNodeValue;
      var result = this.value.filter(function (nodeValue) {
        return !_this2.wrapperMap.has(nodeValue);
      });
      dfs(this.rootWrapper.children);
      return result;

      function dfs(wrappers) {
        var _iterator5 = _createForOfIteratorHelper(wrappers),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var wrapper = _step5.value;

            if (wrapper.checked) {
              if (checkedStrategy === 'all') {
                result.push(getNodeValue(wrapper.node));
              } else if (checkedStrategy === 'parent') {
                if (!wrapper.parentChecked) {
                  result.push(getNodeValue(wrapper.node));
                }
              } else {
                // checkedStrategy === 'child'
                if ((0, _utils.isLeafNode)(wrapper)) {
                  result.push(getNodeValue(wrapper.node));
                }
              }
            }

            if (!(0, _utils.isLeafNode)(wrapper)) {
              dfs(wrapper.children);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  }]);

  return TreeDataHelper;
}();

exports.default = TreeDataHelper;