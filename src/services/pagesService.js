"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var getPagesOffsetForCurrentPage = function getPagesOffsetForCurrentPage(currentPage, pagesCount, elementsCount) {
  var pagesNumbers = [];
  var offset = (elementsCount - (elementsCount % 2 === 0 ? 0 : 1)) / 2;
  var isCenter = currentPage > offset && currentPage <= pagesCount - offset;
  var isBeginning = currentPage - 1 < offset;
  var isEnd = pagesCount - currentPage < offset;
  var pagesStart = 1;
  var pagesEnd = pagesCount;
  if (isBeginning) {
    pagesStart = 1;
    pagesEnd = elementsCount;
  } else if (isEnd) {
    pagesStart = pagesCount - elementsCount + 1;
    pagesEnd = pagesCount;
  } else if (isCenter) {
    pagesStart = currentPage - offset;
    pagesEnd = currentPage + offset;
  }
  for (var i = pagesStart; i <= pagesEnd; i++) {
    pagesNumbers.push(i);
  }
  return pagesNumbers;
};
var _default = exports.default = getPagesOffsetForCurrentPage;