## 项目简介

此项目是我两年前的[pika-music](https://github.com/mbaxszy7/pika-music)的升级项目, 所用到的技术栈也是全面的更新：

1. 项目全面使用 Typescript。
1. React 18。依托 React 18 的 Suspense 架构，结合 react-query，项目的 SSR 实现比上一个项目简单明了。
1. TailwindCSS。比起 css-in-js 方案的在运行时的性能消耗，TailwindCSS 基本在构建时完成大量工作，而且可以有效避免 css 文件的膨胀，同时对于 SSR 项目没有额外的配置
1. React-query。使用 React-query 管理数据请求，支持 React 18 的 Suspense 架构，开箱即用的完成了 Render-as-you-fetch 数据请求方案。

此外还用到了最新的 react-router v6，React Redux 8 和 webpack5。

## React18 SSR 的实现

## 项目其他技术特点

1. PWA 支持。支持 PWA 的浏览器可以安装到桌面（IOS 15 已经支持 PWA 应用 audio 的后台播放）
2. 使用最少的代码实现全站图片懒加载
3. 支持 http2

## App Architecture

---------- src

-------------- client: client revelant

-------------- server: client revelant

-------------- utils: app utils

-------------- components: page components

-------------- hooks: react hooks

-------------- interfaces: ts interfaces

-------------- pages: app pages

## production

- npm run build
- npm run build:start

## ssr development

- npm run dev:client
- npm run dev:server
- npm run dev:start

## csr development

- npm run dev:csr

## husky setup

- npx husky install
- chmod 700 .husky/prepare-commit-msg
- chmod 700 .husky/pre-commit
