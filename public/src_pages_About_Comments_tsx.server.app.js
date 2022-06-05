"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_pages_About_Comments_tsx";
exports.ids = ["src_pages_About_Comments_tsx"];
exports.modules = {

/***/ "./src/client-utils/axios.ts":
/*!***********************************!*\
  !*** ./src/client-utils/axios.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"axiosInstance\": () => (/* binding */ axiosInstance)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst createAxiosInstance = () => {\n  // [isDEV] in csr development means true\n  const baseURL =  true ? \"http://localhost:3000\" : 0;\n  return axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n    baseURL\n  });\n};\n\nconst axiosInstance = createAxiosInstance();\n\n//# sourceURL=webpack://music-motion-x/./src/client-utils/axios.ts?");

/***/ }),

/***/ "./src/pages/About/Comments.tsx":
/*!**************************************!*\
  !*** ./src/pages/About/Comments.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-query */ \"react-query\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _client_utils_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../client-utils/axios */ \"./src/client-utils/axios.ts\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nconst Comments = () => {\n  const newest = (0,react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)(\"todos\", () => _client_utils_axios__WEBPACK_IMPORTED_MODULE_1__.axiosInstance.get(\"/api/album/newest\"));\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {\n    children: newest?.data?.data?.albums.map((comment, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(\"p\", {\n      className: \"comment\",\n      children: comment.name\n    }, i))\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);\n\n//# sourceURL=webpack://music-motion-x/./src/pages/About/Comments.tsx?");

/***/ })

};
;