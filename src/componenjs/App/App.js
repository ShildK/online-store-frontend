"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FRONTEND_URL = exports.BACKEND_URL = void 0;
require("./App.css");
var _react = _interopRequireDefault(require("react"));
var _Routes = _interopRequireDefault(require("../Routes/Routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { useEffect, useState, useRef } from "react";

var App = function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "app"
  }, /*#__PURE__*/_react.default.createElement(_Routes.default, null));
};
var BACKEND_URL = 'http://localhost:3500';
exports.BACKEND_URL = BACKEND_URL;
var FRONTEND_URL = 'http://localhost:3000';
exports.FRONTEND_URL = FRONTEND_URL;
var _default = App;
exports.default = _default;