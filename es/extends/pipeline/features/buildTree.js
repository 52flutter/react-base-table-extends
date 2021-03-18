function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { flatMap } from '../utils/utils';

function _buildTree(idProp, parentIdProp, items) {
  var wrapperMap = new Map();

  var ensure = function ensure(id) {
    if (wrapperMap.has(id)) {
      return wrapperMap.get(id);
    }

    var wrapper = {
      id: id,
      parent: null,
      item: null,
      children: []
    };
    wrapperMap.set(id, wrapper);
    return wrapper;
  };

  var _iterator = _createForOfIteratorHelper(items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var parentWrapper = ensure(item[parentIdProp]);
      var itemWrapper = ensure(item[idProp]);

      if (itemWrapper && parentWrapper) {
        itemWrapper.parent = parentWrapper;
        parentWrapper.children.push(itemWrapper);
        itemWrapper.item = item;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var topLevelWrappers = flatMap(Array.from(wrapperMap.values()).filter(function (wrapper) {
    return wrapper.parent == null;
  }), function (wrapper) {
    return wrapper.children;
  });
  return unwrapRecursively(topLevelWrappers); // todo 可能存在无线递归的情况

  function unwrapRecursively(wrapperArray) {
    var result = [];

    var _iterator2 = _createForOfIteratorHelper(wrapperArray),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var wrapper = _step2.value;

        if (wrapper.children.length === 0) {
          if (wrapper === null || wrapper === void 0 ? void 0 : wrapper.item) {
            result.push(wrapper === null || wrapper === void 0 ? void 0 : wrapper.item);
          }
        } else {
          result.push(_objectSpread(_objectSpread({}, (wrapper === null || wrapper === void 0 ? void 0 : wrapper.item) || {}), {}, {
            children: unwrapRecursively(wrapper === null || wrapper === void 0 ? void 0 : wrapper.children)
          }));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return result;
  }
}

export function buildTree(idProp, parentIdProp) {
  return function (pipeline) {
    return pipeline.mapDataSource(function (rows) {
      return _buildTree(idProp, parentIdProp, rows);
    });
  };
}