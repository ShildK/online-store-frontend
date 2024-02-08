"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./ProductCard.css");
var _io = require("react-icons/io5");
var _others = require("../../types/others");
var _cartService = require("../../services/cartService");
var _App = require("../App/App");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ProductCard = function ProductCard(_ref) {
  var product = _ref.product;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showMessage = _useState2[0],
    setShowMessage = _useState2[1];
  var handler = function handler() {
    window.location.assign(_App.FRONTEND_URL + "/products/item/".concat(product.id));
  };
  var addProductToCart = function addProductToCart() {
    var addProducts = new _cartService.CartService().addProduct(product);
    setShowMessage(true);
    setTimeout(function () {
      setShowMessage(false);
    }, 1000);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "product"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "product__handler",
    onClick: handler
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "product__image",
    src: product.image,
    alt: ""
  }), /*#__PURE__*/_react.default.createElement("h3", {
    className: "product__name"
  }, product.name)), /*#__PURE__*/_react.default.createElement("div", {
    className: "product__buy"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
    className: "product__price-for-one"
  }, product.price, "\u20B8/\u0448\u0442."), /*#__PURE__*/_react.default.createElement("p", {
    className: "product__price"
  }, product.price, "\u20B8")), /*#__PURE__*/_react.default.createElement("button", {
    onClick: addProductToCart,
    className: "product__buy-btn"
  }, /*#__PURE__*/_react.default.createElement(_io.IoCart, null))), showMessage && /*#__PURE__*/_react.default.createElement("p", {
    className: "product__message"
  }, "\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D"));
};
var _default = exports.default = ProductCard;