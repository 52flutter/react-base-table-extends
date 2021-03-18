"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderElement = renderElement;
exports.normalizeColumns = normalizeColumns;
exports.isObjectEqual = isObjectEqual;
exports.callOrReturn = callOrReturn;
exports.hasChildren = hasChildren;
exports.unflatten = unflatten;
exports.flattenOnKeys = flattenOnKeys;
exports.cloneArray = cloneArray;
exports.noop = noop;
exports.toString = toString;
exports.getValue = getValue;
exports.getScrollbarSize = getScrollbarSize;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;
exports.getEstimatedTotalRowsHeight = getEstimatedTotalRowsHeight;
exports.throttle = exports.debounce = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderElement(renderer, props) {
  if ( /*#__PURE__*/_react.default.isValidElement(renderer)) {
    if (!props) return renderer;
    return /*#__PURE__*/_react.default.cloneElement(renderer, props);
  } else if (typeof renderer === 'function') {
    if (renderer.prototype && renderer.prototype.isReactComponent) {
      return /*#__PURE__*/_react.default.createElement(renderer, props);
    } else if (renderer.defaultProps) {
      return renderer(_objectSpread(_objectSpread({}, renderer.defaultProps), props));
    }

    return renderer(props);
  } else {
    return null;
  }
}

function normalizeColumns(elements) {
  var columns = [];

  _react.default.Children.forEach(elements, function (element) {
    if ( /*#__PURE__*/_react.default.isValidElement(element) && element.key) {
      var column = _objectSpread(_objectSpread({}, element.props), {}, {
        key: element.key
      });

      columns.push(column);
    }
  });

  return columns;
}

function isObjectEqual(objA, objB) {
  var ignoreFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (objA === objB) return true;
  if (objA === null && objB === null) return true;
  if (objA === null || objB === null) return false;
  if (_typeof(objA) !== 'object' || _typeof(objB) !== 'object') return false;
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    var key = keysA[i];

    if (key === '_owner' && objA.$$typeof) {
      // React-specific: avoid traversing React elements' _owner.
      //  _owner contains circular references
      // and is not needed when comparing the actual elements (and not their owners)
      continue;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    var valueAType = _typeof(valueA);

    if (valueAType !== _typeof(valueB)) return false;
    if (valueAType === 'function' && ignoreFunction) continue;

    if (valueAType === 'object') {
      if (!isObjectEqual(valueA, valueB, ignoreFunction)) return false;else continue;
    }

    if (valueA !== valueB) return false;
  }

  return true;
}

function callOrReturn(funcOrValue) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof funcOrValue === 'function' ? funcOrValue.apply(void 0, args) : funcOrValue;
}

function hasChildren(data) {
  return Array.isArray(data.children) && data.children.length > 0;
}

function unflatten(array) {
  var rootId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parentId';
  var tree = [];
  var childrenMap = {};
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var item = _objectSpread({}, array[i]);

    var id = item[dataKey];
    var parentId = item[parentKey];

    if (Array.isArray(item.children)) {
      childrenMap[id] = item.children.concat(childrenMap[id] || []);
    } else if (!childrenMap[id]) {
      childrenMap[id] = [];
    }

    item.children = childrenMap[id];

    if (parentId !== undefined && parentId !== rootId) {
      if (!childrenMap[parentId]) childrenMap[parentId] = [];
      childrenMap[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

function flattenOnKeys(tree, keys) {
  var depthMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var dataKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'id';
  if (!keys || !keys.length) return tree;
  var array = [];
  var keysSet = new Set();
  keys.forEach(function (x) {
    return keysSet.add(x);
  });
  var stack = [].concat(tree);
  stack.forEach(function (x) {
    return depthMap[x[dataKey]] = 0;
  });

  var _loop = function _loop() {
    var item = stack.shift();
    array.push(item);

    if (keysSet.has(item[dataKey]) && Array.isArray(item.children) && item.children.length > 0) {
      stack = [].concat(item.children, stack);
      item.children.forEach(function (x) {
        return depthMap[x[dataKey]] = depthMap[item[dataKey]] + 1;
      });
    }
  };

  while (stack.length > 0) {
    _loop();
  }

  return array;
} // Babel7 changed the behavior of @babel/plugin-transform-spread in https://github.com/babel/babel/pull/6763
// [...array] is transpiled to array.concat() while it was [].concat(array) before
// this change breaks immutable array(seamless-immutable), [...array] should always return mutable array


function cloneArray(array) {
  if (!Array.isArray(array)) return [];
  return [].concat(array);
}

function noop() {}

function toString(value) {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return value.toString ? value.toString() : '';
}

function getPathSegments(path) {
  var pathArray = path.split('.');
  var parts = [];

  for (var i = 0; i < pathArray.length; i++) {
    var p = pathArray[i];

    while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.';
      p += pathArray[++i];
    }

    parts.push(p);
  }

  return parts;
} // changed from https://github.com/sindresorhus/dot-prop/blob/master/index.js


function getValue(object, path, defaultValue) {
  if (object === null || _typeof(object) !== 'object' || typeof path !== 'string') {
    return defaultValue;
  }

  var pathArray = getPathSegments(path);

  for (var i = 0; i < pathArray.length; i++) {
    if (!Object.prototype.propertyIsEnumerable.call(object, pathArray[i])) {
      return defaultValue;
    }

    object = object[pathArray[i]];

    if (object === undefined || object === null) {
      if (i !== pathArray.length - 1) {
        return defaultValue;
      }

      break;
    }
  }

  return object;
} // copied from https://www.30secondsofcode.org/js/s/debounce


var debounce = function debounce(fn) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timeoutId;
  return function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      return fn.apply(_this, args);
    }, ms);
  };
}; // copied from https://www.30secondsofcode.org/js/s/throttle


exports.debounce = debounce;

var throttle = function throttle(fn, wait) {
  var inThrottle, lastFn, lastTime;
  return function () {
    var context = this,
        args = arguments;

    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
}; // copied from https://github.com/react-bootstrap/dom-helpers


exports.throttle = throttle;
var scrollbarSize;

function getScrollbarSize(recalculate) {
  if (!scrollbarSize && scrollbarSize !== 0 || recalculate) {
    if (typeof window !== 'undefined' && window.document && window.document.createElement) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return scrollbarSize;
}

function addClassName(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
      el.className += " ".concat(className);
    }
  }
}

function removeClassName(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), 'g'), '');
  }
}

function getEstimatedTotalRowsHeight(data, estimatedRowHeight) {
  return typeof estimatedRowHeight === 'function' ? data.reduce(function (height, rowData, rowIndex) {
    return height + estimatedRowHeight({
      rowData: rowData,
      rowIndex: rowIndex
    });
  }, 0) : data.length * estimatedRowHeight;
}