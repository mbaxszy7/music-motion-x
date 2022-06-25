## 项目简介

此项目是我两年前的[pika-music](https://github.com/mbaxszy7/pika-music)的重构项目, 所用到的技术栈也是全面的更新：

1. 项目全面使用 Typescript。
2. React 18。依托 React 18 的 SSR Suspense 架构，结合 react-query，本项目的 SSR 架构实现比上一个简单明了。
3. TailwindCSS。比起 css-in-js 方案的在运行时的性能消耗，TailwindCSS 基本在构建时完成大量工作，而且可以有效避免 css 文件的膨胀，同时对于 SSR 项目没有额外的配置
4. React-query。使用 React-query 管理数据请求，支持 React 18 的 Suspense 架构，开箱即用的完成了 Render-as-you-fetch 数据请求方案。

此外还用到了最新的 react-router v6，React Redux 8 和 webpack5。

## React SSR 架构实现

### React18 之前的 SSR 实现（上一个项目）

### React18 的 SSR 实现（本项目）

### 对比两个实现，解决了什么问题？

## 项目其他技术特点

1. PWA 支持。支持 PWA 的浏览器可以安装到桌面（IOS 15 已经支持 PWA 应用 audio 的后台播放）
2. 使用最少的代码实现全站图片懒加载
3. 支持 http2

## 代码目录结构

```
music-motion-x
├─.eslintrc.js
├─.gitignore
├─.prettierrc
├─ecosystem.config.js
├─index.html
├─package-lock.json
├─package.json
├─postcss.config.js
├─tailwind.config.js
├─tsconfig-for-webpack-config.json
├─tsconfig.json
├─types.d.ts
├─webpack.common.ts：webpack 的公共配置项
├─webpack.config.ts：打包客户端代码
├─webpack.server.ts：打包服务端代码
├─src
| ├─App.tsx：App 入口文件
| ├─fetcher.ts：axios 的封装
| ├─routes.tsx：路由文件z
| ├─src-service-worker.js
| ├─store.ts：redux store
| ├─utils：工具代码
| ├─server：服务端代码
| ├─pages：页面
| ├─interfaces：ts 接口
| ├─hooks：react 自定义 hooks
| ├─components：组件代码
| ├─client：客户端代码
| ├─assets：静态文件
```

## production 打包

- npm run build
- npm run build:start

## SSR development 运行 SSR 开发环境

- npm run dev:client
- npm run dev:server
- npm run dev:start

## CSR development 运行 CSR 开发环境

- npm run dev:csr
