"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./extends/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require("./base/index");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});