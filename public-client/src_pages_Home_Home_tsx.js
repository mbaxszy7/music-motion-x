"use strict";
(self["webpackChunkmusic_motion_x"] = self["webpackChunkmusic_motion_x"] || []).push([["src_pages_Home_Home_tsx"],{

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

/***/ "./src/pages/Home/Home.tsx":
/*!*********************************!*\
  !*** ./src/pages/Home/Home.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ "./node_modules/react-query/es/index.js");
/* harmony import */ var _client_utils_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../client-utils/axios */ "./src/client-utils/axios.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






const Home = () => {
  var _banners$data;

  const banners = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)("banners", () => _client_utils_axios__WEBPACK_IMPORTED_MODULE_2__.axiosInstance.get("/api/banner?type=2"));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: (_banners$data = banners.data) === null || _banners$data === void 0 ? void 0 : _banners$data.data.banners.map(banner => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
      src: banner.pic
    }, banner.pic))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ })

}]);
//# sourceMappingURL=src_pages_Home_Home_tsx.js.map