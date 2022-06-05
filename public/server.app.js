/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom/server */ \"react-router-dom/server\");\n/* harmony import */ var react_router_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-query */ \"react-query\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-error-boundary */ \"react-error-boundary\");\n/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_error_boundary__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Header */ \"./src/components/Header.tsx\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes */ \"./src/routes.tsx\");\n/* harmony import */ var _pages_NotFound__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/NotFound */ \"./src/pages/NotFound/index.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);\n/* eslint-disable react/require-default-props */\n\n/* eslint-disable react/forbid-prop-types */\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst queryClient = new react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClient({\n  defaultOptions: {\n    queries: {\n      suspense: true\n    }\n  }\n});\n\nconst App = ({\n  store,\n  isServer,\n  location,\n  preloadedState\n}) => {\n  const {\n    reset\n  } = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryErrorResetBoundary)();\n\n  const content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Header__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_router__WEBPACK_IMPORTED_MODULE_6__.Routes, {\n      children: [_routes__WEBPACK_IMPORTED_MODULE_8__[\"default\"].map(r => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_6__.Route, {\n        element: r.element,\n        path: r.path\n      }, r.path)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_6__.Route, {\n        path: \"*\",\n        element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_pages_NotFound__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {})\n      })]\n    })]\n  });\n\n  const IsomophicRouter = isServer ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_router_dom_server__WEBPACK_IMPORTED_MODULE_1__.StaticRouter, {\n    location: location || \"\",\n    children: content\n  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, {\n    children: content\n  });\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_error_boundary__WEBPACK_IMPORTED_MODULE_4__.ErrorBoundary, {\n    onReset: reset,\n    fallbackRender: ({\n      resetErrorBoundary\n    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(\"div\", {\n      children: [\"There was an error!\", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(\"button\", {\n        onClick: () => resetErrorBoundary(),\n        children: \"Try again\"\n      })]\n    }),\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {\n      store: store,\n      serverState: preloadedState || {},\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider, {\n        client: queryClient,\n        children: IsomophicRouter\n      })\n    })\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n//# sourceURL=webpack://music-motion-x/./src/App.tsx?");

/***/ }),

/***/ "./src/Html.tsx":
/*!**********************!*\
  !*** ./src/Html.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Html)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Html({\n  assetsCSS,\n  assetsJS,\n  children,\n  title,\n  states\n}) {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"html\", {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"head\", {\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"meta\", {\n        charSet: \"utf-8\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"meta\", {\n        name: \"viewport\",\n        content: \"width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"meta\", {\n        httpEquiv: \"X-UA-Compatible\",\n        content: \"ie=edge\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n        rel: \"shortcut icon\",\n        href: \"favicon.ico\"\n      }), assetsCSS.map(css => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n        rel: \"preload\",\n        href: Object.values(css)[0],\n        as: \"style\"\n      }, Object.values(css)[0])), assetsCSS.map(css => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n        rel: \"stylesheet\",\n        href: Object.values(css)[0]\n      }, Object.values(css)[0])), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"title\", {\n        children: title\n      })]\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"body\", {\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"noscript\", {\n        dangerouslySetInnerHTML: {\n          __html: `<b>Enable JavaScript to run this app.</b>`\n        }\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n        id: \"root\",\n        children: children\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"textarea\", {\n        id: \"data-context\",\n        style: {\n          display: \"none\"\n        },\n        value: JSON.stringify(states),\n        readOnly: true\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"script\", {\n        dangerouslySetInnerHTML: {\n          __html: `assetManifest = ${JSON.stringify(assetsJS)};`\n        }\n      })]\n    })]\n  });\n}\n\n//# sourceURL=webpack://music-motion-x/./src/Html.tsx?");

/***/ }),

/***/ "./src/components/Header.tsx":
/*!***********************************!*\
  !*** ./src/components/Header.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst Header = () => {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"header\", {\n    className: \" bg-red-300\",\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \" bg-slate-400\",\n      onClick: () => {\n        console.log(\"header clicked!\");\n      },\n      children: \"header hello react deded\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Link, {\n      to: \"/\",\n      children: \"home\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Link, {\n      to: \"about\",\n      children: \"about\"\n    })]\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n\n//# sourceURL=webpack://music-motion-x/./src/components/Header.tsx?");

/***/ }),

/***/ "./src/createStore.ts":
/*!****************************!*\
  !*** ./src/createStore.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_Home_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Home/reducer */ \"./src/pages/Home/reducer.ts\");\n\n\n\nconst rootReducer = {\n  home: _pages_Home_reducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n};\n\nconst getReduxStore = defaultState => {\n  const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n    reducer: rootReducer,\n    middleware: [(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default())],\n    devTools: true,\n    preloadedState: defaultState\n  });\n  return store;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getReduxStore);\n\n//# sourceURL=webpack://music-motion-x/./src/createStore.ts?");

/***/ }),

/***/ "./src/pages/About/data-about.tsx":
/*!****************************************!*\
  !*** ./src/pages/About/data-about.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DataProvider\": () => (/* binding */ DataProvider),\n/* harmony export */   \"useData\": () => (/* binding */ useData)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n // Note: this file does not demonstrate a real data fetching strategy.\n// We only use this to simulate data fetching happening on the server\n// while the cache is populated on the client. In a real app, you would\n// instead use a data fetching library or Server Components for this.\n\n\nconst DataContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);\nfunction DataProvider({\n  children,\n  data\n}) {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DataContext.Provider, {\n    value: data,\n    children: children\n  });\n} // In a real implementation the data would be streamed with the HTML.\n// We haven't integrated this part yet, so we'll just use fake data.\n\nconst fakeData = [\"Wait, it doesn't wait for React to load?\", \"How does this even work?\", \"I like marshmallows\"];\nfunction useData() {\n  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DataContext);\n\n  if (ctx !== null) {\n    // This context is only provided on the server.\n    // It is here to simulate a suspending data fetch.\n    ctx.read();\n  }\n\n  return fakeData;\n}\n\n//# sourceURL=webpack://music-motion-x/./src/pages/About/data-about.tsx?");

/***/ }),

/***/ "./src/pages/About/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/About/index.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nconst Comments = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ \"src_pages_About_Comments_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! ./Comments */ \"./src/pages/About/Comments.tsx\")));\nconst Post = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ \"src_pages_About_Post_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! ./Post */ \"./src/pages/About/Post.tsx\")));\n\nconst About = () => {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n      fallback: \"loading\",\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Post, {})\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"h2\", {\n      children: \"Comments\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n      fallback: \"loading\",\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Comments, {})\n    })]\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://music-motion-x/./src/pages/About/index.tsx?");

/***/ }),

/***/ "./src/pages/Home/getServerSideProps.ts":
/*!**********************************************!*\
  !*** ./src/pages/Home/getServerSideProps.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ \"./src/pages/Home/reducer.ts\");\n\nconst getServerSideProps = async store => {\n  store.dispatch((0,_reducer__WEBPACK_IMPORTED_MODULE_0__.increment)());\n  console.log(\"store\", store.getState());\n};\n\n//# sourceURL=webpack://music-motion-x/./src/pages/Home/getServerSideProps.ts?");

/***/ }),

/***/ "./src/pages/Home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Home/index.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _getServerSideProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getServerSideProps */ \"./src/pages/Home/getServerSideProps.ts\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst HomeLazy = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ \"src_pages_Home_Home_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! ./Home */ \"./src/pages/Home/Home.tsx\")));\n\nconst Home = props => {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n    fallback: \"loading\",\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(HomeLazy, { ...props\n    })\n  });\n};\n\nHome.getServerSideProps = _getServerSideProps__WEBPACK_IMPORTED_MODULE_1__.getServerSideProps;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n//# sourceURL=webpack://music-motion-x/./src/pages/Home/index.tsx?");

/***/ }),

/***/ "./src/pages/Home/reducer.ts":
/*!***********************************!*\
  !*** ./src/pages/Home/reducer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"counterSlice\": () => (/* binding */ counterSlice),\n/* harmony export */   \"decrement\": () => (/* binding */ decrement),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"increment\": () => (/* binding */ increment),\n/* harmony export */   \"incrementByAmount\": () => (/* binding */ incrementByAmount)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst counterSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n  name: \"home\",\n  initialState: {\n    value: 0\n  },\n  reducers: {\n    increment: state => {\n      // Redux Toolkit allows us to write \"mutating\" logic in reducers. It\n      // doesn't actually mutate the state because it uses the Immer library,\n      // which detects changes to a \"draft state\" and produces a brand new\n      // immutable state based off those changes\n      state.value += 1;\n    },\n    decrement: state => {\n      state.value -= 1;\n    },\n    incrementByAmount: (state, action) => {\n      state.value += action.payload;\n    }\n  }\n}); // Action creators are generated for each case reducer function\n\nconst {\n  increment,\n  decrement,\n  incrementByAmount\n} = counterSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (counterSlice.reducer);\n\n//# sourceURL=webpack://music-motion-x/./src/pages/Home/reducer.ts?");

/***/ }),

/***/ "./src/pages/NotFound/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/NotFound/index.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst NotFound = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n  children: \"No found\"\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFound);\n\n//# sourceURL=webpack://music-motion-x/./src/pages/NotFound/index.tsx?");

/***/ }),

/***/ "./src/routes.tsx":
/*!************************!*\
  !*** ./src/routes.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _pages_About__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/About */ \"./src/pages/About/index.tsx\");\n/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/Home */ \"./src/pages/Home/index.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst ElementEnhance = Comp => {\n  const importable = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Comp, { ...props\n  });\n\n  importable.getServerSideProps = Comp.getServerSideProps;\n  return importable;\n};\n\nconst routes = [{\n  path: \"/\",\n  element: _pages_Home__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n}, {\n  path: \"/about\",\n  element: _pages_About__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n}].map(route => {\n  const Ele = ElementEnhance(route.element);\n  return {\n    path: route.path,\n    element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Ele, {})\n  };\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);\n\n//# sourceURL=webpack://music-motion-x/./src/routes.tsx?");

/***/ }),

/***/ "./src/server-utils/renderHTML.tsx":
/*!*****************************************!*\
  !*** ./src/server-utils/renderHTML.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes */ \"./src/routes.tsx\");\n/* harmony import */ var _createStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../createStore */ \"./src/createStore.ts\");\n/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Html */ \"./src/Html.tsx\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../App */ \"./src/App.tsx\");\n/* harmony import */ var _pages_About_data_about__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pages/About/data-about */ \"./src/pages/About/data-about.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nconst setInitialDataToStore = async (matchedRoutes, ctx) => {\n  const store = (0,_createStore__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({});\n  if (matchedRoutes) await Promise.allSettled(matchedRoutes.map(item => {\n    return Promise.resolve(item.route.element?.type?.getServerSideProps?.(store, ctx) ?? null);\n  }));\n  return store;\n};\n\nfunction createServerData() {\n  let done = false;\n  let promise = null;\n  return {\n    read() {\n      if (done) {\n        return;\n      }\n\n      if (promise) {\n        throw promise;\n      }\n\n      promise = new Promise(resolve => {\n        setTimeout(() => {\n          done = true;\n          promise = null;\n          resolve(\"\");\n        }, 2000);\n      });\n      throw promise;\n    }\n\n  };\n}\n\nconst renderHTML = async (ctx, staticContext, assetsCSS, assetsJS) => {\n  let markup = null;\n  const matchedRoutes = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes)(_routes__WEBPACK_IMPORTED_MODULE_2__[\"default\"], ctx.request.path);\n  const store = await setInitialDataToStore(matchedRoutes, ctx);\n  console.log(\"matchedRoutes\", matchedRoutes);\n  if (!matchedRoutes) staticContext.NOT_FOUND = true;\n\n  try {\n    markup = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Html__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      assetsCSS: assetsCSS,\n      assetsJS: assetsJS,\n      title: \"music-motion\",\n      states: store.getState(),\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_About_data_about__WEBPACK_IMPORTED_MODULE_6__.DataProvider, {\n        data: createServerData(),\n        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_App__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          store: store,\n          isServer: true,\n          location: ctx.request.path,\n          preloadedState: store.getState()\n        })\n      })\n    });\n  } catch (error) {\n    console.log(\"renderHTML 70,\", error);\n  }\n\n  return {\n    markup,\n    state: store.getState()\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderHTML);\n\n//# sourceURL=webpack://music-motion-x/./src/server-utils/renderHTML.tsx?");

/***/ }),

/***/ "./src/server.index.ts":
/*!*****************************!*\
  !*** ./src/server.index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var koa_mount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-mount */ \"koa-mount\");\n/* harmony import */ var koa_mount__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_mount__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-logger */ \"koa-logger\");\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_logger__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _server_utils_renderHTML__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./server-utils/renderHTML */ \"./src/server-utils/renderHTML.tsx\");\n/* eslint-disable import/no-named-as-default-member */\n\n/* eslint-disable import/no-named-as-default */\n\n\n\n\n\n\n\n\nconst isDEV = \"development\" === \"development\";\nconst statsData = isDEV ? {} : JSON.parse(fs__WEBPACK_IMPORTED_MODULE_5___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"./compilation-stats.json\"), \"utf-8\"));\nconst publicPath = statsData.publicPath || \"\"; // console.log(\n//   \"statsData.assets\",\n//   JSON.parse(\n//     fs.readFileSync(\n//       path.join(process.cwd(), \"./compilation-stats.json\"),\n//       \"utf-8\",\n//     ),\n//   )\n//     .assets.map((asset: { name: string; chunkNames: string[] }) => {\n//       if (asset.name.endsWith(\".js\") && asset.chunkNames.includes(\"main\"))\n//         return { \"main.js\": `${publicPath}${asset.name}` }\n//       else if (asset.name.endsWith(\".js\"))\n//         return { [asset.name]: `${publicPath}${asset.name}` }\n//     })\n//     .filter((p: any) => !!p),\n// )\n\nconst assetsJS = isDEV ? [{\n  \"main.js\": \"/public/main.js\"\n}] : statsData.assets.map(asset => {\n  if (asset.name.endsWith(\".js\") && asset.chunkNames.includes(\"main\")) return {\n    \"main.js\": `${publicPath}${asset.name}`\n  };else return {\n    [asset.name]: `${publicPath}${asset.name}`\n  };\n}).filter(p => !!p);\nconst assetsCSS = isDEV ? [{\n  \"main.css\": \"/public/main.css\"\n}] : statsData.assets.map(asset => {\n  if (asset.name.endsWith(\".css\") && asset.chunkNames.includes(\"main\")) return {\n    \"main.css\": `${publicPath}${asset.name}`\n  };else return null;\n}).filter(p => !!p);\nconst app = new (koa__WEBPACK_IMPORTED_MODULE_0___default())();\napp.use(async (ctx, next) => {\n  try {\n    await next();\n  } catch (err) {\n    ctx.status = err?.status || 500;\n    ctx.body = \"server error\";\n    ctx.app.emit(\"error\", err, ctx);\n  }\n});\napp.use(koa_logger__WEBPACK_IMPORTED_MODULE_6___default()());\napp.use(async (ctx, next) => {\n  if (ctx.path.includes(\"service-worker.js\")) {\n    ctx.set({\n      \"Service-Worker-Allowed\": \"/\"\n    });\n  }\n\n  await next();\n}); // const sleep = (time: number) =>\n//   new Promise((resolve) =>\n//     setTimeout(() => {\n//       resolve(\"\")\n//     }, time),\n//   )\n// app.use(async (ctx, next) => {\n//   console.log(\"ctx.req.url\", ctx.req.url)\n//   if (ctx.req.url?.endsWith(\".js\")) {\n//     await sleep(4000)\n//     await next()\n//   } else {\n//     await next()\n//   }\n// })\n\napp.use(koa_mount__WEBPACK_IMPORTED_MODULE_3___default()(\"/public\", koa_static__WEBPACK_IMPORTED_MODULE_2___default()(\"./public-client\")));\n\nconst response = (ctx, markup, staticContext) => {\n  return new Promise((resolve, reject) => {\n    let didError = false;\n    const mainJs = assetsJS.find(ass => Object.keys(ass).includes(\"main.js\"))?.[\"main.js\"] ?? \"\";\n    const {\n      pipe\n    } = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_4__.renderToPipeableStream)(markup, {\n      bootstrapScripts: [mainJs],\n\n      onShellReady() {\n        // The content above all Suspense boundaries is ready.\n        // If something errored before we started streaming, we set the error code appropriately.\n        ctx.res.setHeader(\"Content-type\", \"text/html\");\n        ctx.status = didError ? 500 : 200;\n\n        if (staticContext.NOT_FOUND) {\n          ctx.status = 404;\n        }\n\n        pipe(ctx.res).on(\"finish\", () => {\n          ctx.res.end();\n          resolve(\"ctx.resolve\");\n        });\n      },\n\n      onShellError() {\n        // Something errored before we could complete the shell so we emit an alternative shell.\n        ctx.status = 500;\n        ctx.res.end(\"server error\");\n      },\n\n      onError(err) {\n        didError = true;\n        reject(err);\n      }\n\n    });\n  });\n};\n\napp.use(async ctx => {\n  if (ctx.accepts(ctx.header.accept?.split(\",\") ?? []) === \"text/html\") {\n    const staticContext = {\n      NOT_FOUND: false\n    };\n    const {\n      markup\n    } = await (0,_server_utils_renderHTML__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(ctx, staticContext, assetsCSS, assetsJS);\n\n    if (markup) {\n      await response(ctx, markup, staticContext);\n    }\n  }\n});\napp.on(\"error\", err => {\n  console.error(\"server error\", err);\n});\napp.listen(5000, () => {\n  console.log(\"music-motion server is listening on 5000\");\n});\n\n//# sourceURL=webpack://music-motion-x/./src/server.index.ts?");

/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("koa");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("koa-logger");

/***/ }),

/***/ "koa-mount":
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("koa-mount");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("koa-static");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-error-boundary":
/*!***************************************!*\
  !*** external "react-error-boundary" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("react-error-boundary");

/***/ }),

/***/ "react-query":
/*!******************************!*\
  !*** external "react-query" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("react-router-dom/server");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("redux-thunk");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk prefetch function */
/******/ 	(() => {
/******/ 		__webpack_require__.F = {};
/******/ 		__webpack_require__.E = (chunkId) => {
/******/ 			Object.keys(__webpack_require__.F).map((key) => {
/******/ 				__webpack_require__.F[key](chunkId);
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".server.app.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup prefetch */
/******/ 	(() => {
/******/ 		__webpack_require__.O(0, ["main"], () => {
/******/ 			__webpack_require__.E("src_pages_About_Comments_tsx");
/******/ 			__webpack_require__.E("src_pages_About_Post_tsx");
/******/ 		}, 5);
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.index.ts");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;