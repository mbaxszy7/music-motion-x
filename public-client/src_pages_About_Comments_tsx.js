"use strict";
(self["webpackChunkmusic_motion_x"] = self["webpackChunkmusic_motion_x"] || []).push([["src_pages_About_Comments_tsx"],{

/***/ "./src/client-utils/axios.ts":
/*!***********************************!*\
  !*** ./src/client-utils/axios.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "axiosInstance": () => (/* binding */ axiosInstance)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const createAxiosInstance = () => {
  // [isDEV] in csr development means true
  const baseURL =  true ? "http://localhost:3000" : 0;
  return axios__WEBPACK_IMPORTED_MODULE_0___default().create({
    baseURL
  });
};

const axiosInstance = createAxiosInstance();

/***/ }),

/***/ "./src/pages/About/Comments.tsx":
/*!**************************************!*\
  !*** ./src/pages/About/Comments.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-query */ "./node_modules/react-query/es/index.js");
/* harmony import */ var _client_utils_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../client-utils/axios */ "./src/client-utils/axios.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const Comments = () => {
  var _newest$data, _newest$data$data;

  const newest = (0,react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)("todos", () => _client_utils_axios__WEBPACK_IMPORTED_MODULE_1__.axiosInstance.get("/api/album/newest"));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: newest === null || newest === void 0 ? void 0 : (_newest$data = newest.data) === null || _newest$data === void 0 ? void 0 : (_newest$data$data = _newest$data.data) === null || _newest$data$data === void 0 ? void 0 : _newest$data$data.albums.map((comment, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "comment",
      children: comment.name
    }, i))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);

/***/ })

}]);
//# sourceMappingURL=src_pages_About_Comments_tsx.js.map