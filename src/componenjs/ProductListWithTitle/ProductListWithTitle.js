"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./ProductListWithTitle.css");
var _react = require("react");
var _ProductCard = _interopRequireDefault(require("../ProductCard/ProductCard"));
var _product = require("../../types/product");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ProductListWithTitle = function ProductListWithTitle(_ref) {
  var title = _ref.title,
    products = _ref.products;
  console.log(products);
  return /*#__PURE__*/React.createElement("div", {
    className: "products-list"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "products-list__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "products-list__cards"
  }, products.map(function (product) {
    return /*#__PURE__*/React.createElement(_ProductCard.default, {
      key: product.id,
      product: product
    });
  })));
};
var _default = exports.default = ProductListWithTitle;