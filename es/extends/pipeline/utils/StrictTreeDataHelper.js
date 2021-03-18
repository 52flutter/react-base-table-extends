function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @ts-nocheck
import { arrayUtils, isLeafNode } from './utils';

var Wrapper = function Wrapper(input) {
  _classCallCheck(this, Wrapper);

  Object.assign(this, input);
};

var StrictTreeDataHelper = /*#__PURE__*/function () {
  function StrictTreeDataHelper(opts) {
    _classCallCheck(this, StrictTreeDataHelper);

    this.opts = opts;
    this.valueSet = new Set(opts.value);
    this.initWrapperTree();
  }

  _createClass(StrictTreeDataHelper, [{
    key: "initWrapperTree",
    value: function initWrapperTree() {
      var _this = this;

      var getNodeValue = this.opts.getNodeValue;
      this.rootWrapper = new Wrapper({
        root: true,
        children: []
      });
      this.wrapperMap = new Map();

      var dfs = function dfs(parentWrapper, nodes) {
        var _iterator = _createForOfIteratorHelper(nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            var wrapper = new Wrapper({
              parent: parentWrapper,
              node: node,
              checked: _this.valueSet.has(getNodeValue(node))
            });

            _this.wrapperMap.set(getNodeValue(node), wrapper);

            parentWrapper.children.push(wrapper);

            if (!isLeafNode(node)) {
              wrapper.children = [];
              dfs(wrapper, node.children);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      dfs(this.rootWrapper, this.opts.tree);
    }
  }, {
    key: "value",
    get: function get() {
      return this.opts.value;
    }
  }, {
    key: "isIndeterminate",
    value: function isIndeterminate(nodeValue) {
      return false;
    }
  }, {
    key: "isChecked",
    value: function isChecked(nodeValue) {
      return this.valueSet.has(nodeValue);
    }
  }, {
    key: "getValueAfterCheck",
    value: function getValueAfterCheck(nodeValue) {
      if (!this.isChecked(nodeValue)) {
        return arrayUtils.merge(this.value, [nodeValue]);
      }

      return this.value;
    }
  }, {
    key: "getValueAfterUncheck",
    value: function getValueAfterUncheck(nodeValue) {
      if (this.isChecked(nodeValue)) {
        return arrayUtils.diff(this.value, [nodeValue]);
      }

      return this.value;
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
      return this.value;
    }
  }]);

  return StrictTreeDataHelper;
}();

export { StrictTreeDataHelper as default };