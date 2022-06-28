## 项目简介

此项目是我两年前的[pika-music](https://github.com/mbaxszy7/pika-music)的重构项目, 所用到的技术栈也是全面的更新。项目重在实践 React 下的 SSR 架构实现和 React 相关的最新技术栈。对比上一次项目，本次重构：

1. 全面使用 Typescript。
2. React 18。依托 React 18 的 SSR Suspense 架构，结合 react-query，本项目的 SSR 架构实现比上一个简单明了。
3. TailwindCSS。比起 css-in-js 方案的在运行时的性能消耗，TailwindCSS 基本在构建时完成大量工作，而且可以有效避免 css 文件的膨胀，同时对于 SSR 项目没有额外的配置。
4. React-query。使用 React-query 管理数据请求，支持 React 18 的 Suspense 架构，开箱即用的完成了 Render-as-you-fetch 数据请求方案。

此外还用到了最新的 react-router v6，React Redux 8 和 webpack5。

## 聊一聊 CSR 客户端渲染和传统的 SSR（Server Side Rendering）

- CSR 客户端渲染
  其实就是前端利用 history api 自己控制页面路由的 SPA 应用。路由变化后，前端页面都是 JS 渲染完成的。客户端渲染的问题是首次访问页面需要加载较多的 js 文件，然后再去获取页面数据，导致首屏响应比较慢。还有一个就是 SEO 的问题，客户端渲染产出的 HTML body 内容是 script 脚本，不利于搜索引擎的内容爬取。针对第一个问题其实我们可以通过合适的静态资源缓、静态资源预取和动态 import 解决一部分问题；第二个 SEO 问题，国外的 google 搜索引擎已经支持。

- 传统的 SSR
  传统的服务端渲染就是利用后端的模板引擎输出一个 HTML。前端每次访问一个路由都是请求服务器，重新加载资源，渲染页面。传统的 SSR 缺点就是不能和现在流行的前端框架或者库很好的融合。还有就是访问一个应用的每个页面都需要访问服务器，用户体验比前端单页面应用（SPA）稍差。

那么 React SSR 渲染有什么优势呢？
说白了它就是解决了客户端渲染带来的首屏问题和 SEO 问题（SSR 带来的 HTML 直出）和传统的 SSR 的页面跳转问题（首次访问页面是 HTML 直出，后续的路由变化都是客户端 JS 渲染）。但是凡事都有银弹，实现 React SSR 带来的项目复杂度也比客户端渲染和传统的 SSR 渲染高出许多。

为了实现这些优势，我们需要怎么实现自己的 React SSR 架构？

## React 同构 SSR 实现

React 同构应用，就是同一套 React 代码在服务器上运行一遍，到达浏览器又运行一遍。 React 在服务端渲染（使用 ReactDOMServer.renderToPipeableStream 或者 ReactDOMServe.renderToNodeStream）产出 HTML，客户端注水(ReactDOM.hydrate)绑定事件使页面可交互。

### React18 之前的 SSR 实现（上一个项目）

项目架构主要解决的问题如下：

- 如何在服务端获取**当前页面**需要的数据，然后产出 html 给客户端？

  首先项目中每一个页面级的组件如果需要在服务端获取数据，都需要给当前组件挂载一个 getInitialProps(store)方法，该方法参数是一个 redux store 对象。然后我们利用 react-router-config 提供的 matchRoutes 方法，结合服务端的 request 请求路径 ctx.request.path，得到当前匹配的页面组件。之后执行当前页面组件的 getInitialProps 方法获取页面数据，把数据储存到 redux store 中，随后在组件中从 redux store 中获取数据，把数据注入 swr 的 initialData 中。最后利用 react-router-dom 的 StaticRouter 产出首屏 React App，利用 ReactDOMServer.renderToNodeStream 吐出 html 给浏览器。

- redux Store 的 states 如何做到 server 端和 client 端同步？

  在上一个问题中，我们说到把页面数据都储存到了 redux store 中，那接下来如何同步给客户端？
  首先我们要准备如下的 html 模版：

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
    ...
    <body>
      <div id="root"><!--clientContent--></div>
      <textarea id="data-context" style="display: none;">
      <!--state-->
      </textarea>
    </body>
  </html>
  ```

  占位`<!--state-->` 就是需要我们在服务端把 html 放送给客户端前，用`store.getState()`替换的。如此这般在客户端 hydrate 的时候就可以把这段 state 取出来同步到客户端的 redux store：

  ```javascript
  let payloadData = {}
  try {
    const ele = document.getElementById("data-context")
    payloadData = JSON.parse(ele?.value?.trim?.() ? ele?.value : "{}")
  } catch (e) {
    console.log(e)
  }

  const store = getReduxStore(payloadData)
  ```

- 如何实现支持 SSR 的页面级 dynamic import

  项目自行实现了 Loadable 组件，用于动态加载组件：

  ```jsx
  class Loadable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        Comp: null,
        error: null,
        isTimeout: false,
      }
    }

    // eslint-disable-next-line react/sort-comp
    raceLoading = () => {
      const { pastDelay } = this.props
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("timeout")), pastDelay || 200)
      })
    }

    load = async () => {
      const { loader } = this.props
      try {
        this.setState({
          error: null,
        })
        const loadedComp = await Promise.race([this.raceLoading(), loader()])
        this.setState({
          isTimeout: false,
          Comp:
            loadedComp && loadedComp.__esModule
              ? loadedComp.default
              : loadedComp,
        })
      } catch (e) {
        if (e.message === "timeout") {
          this.setState({
            isTimeout: true,
          })
          this.load()
        } else {
          this.setState({
            error: e,
          })
        }
      }
    }

    componentDidMount() {
      this.load()
    }

    render() {
      const { error, isTimeout, Comp } = this.state
      const { loading } = this.props
      if (error) return loading({ error, retry: this.load })
      if (isTimeout) return loading({ pastDelay: true })

      if (Comp) return <Comp {...this.props} />
      return null
    }
  }

  ;<Loadable
    loader={() =>
      import(
        /* webpackChunkName: 'discover',  webpackPrefetch:true  */ "../client/pages/Discover/Discover.jsx"
      )
    }
    loading={loading}
  />
  ```

  但是封装好页面的动态加载后需要考虑两点：

  1.  ssr 的时候需要主动去执行动态路由的组件，不然服务端不会渲染组件本身的内容。
      为此我们需要实现一个动态组件加载器，用于标记该组件是 dynamic import 的组件，方便服务端匹配路由后主动执行动态路由的组件

      ```javascript
      const asyncLoader = ({ loader, loading, pastDelay }) => {
        const importable = (props) => (
          <Loadable
            loader={loader}
            loading={loading}
            pastDelay={pastDelay}
            {...props}
          />
        )
        importable.isAsyncComp = true

        return importable
      }
      ```

  2.  在浏览器端不先去加载动态 import 的组件的话，会导致组件的 loading 状态闪现。所以，要先加载好动态路由组件，再去渲染页面。
      为此我们需要在浏览器端 hydrate 前，先去加载动态 import 的组件：

      ```javascript
      const clientPreloadReady = async (routes) => {
        try {
          const matchedRoutes = matchRoutes(routes, window.location.pathname)
          // console.warn(route.route.component())
          if (matchedRoutes && matchedRoutes.length) {
            await Promise.allSettled(
              matchedRoutes.map(async (route) => {
                if (
                  // 当前路由对应的组件是动态导出的
                  route?.route?.component?.isAsyncComp
                ) {
                  try {
                    await route.route.component().props.loader()
                  } catch (e) {
                    await Promise.reject(e)
                  }
                }
              }),
            )
          }
        } catch (e) {
          console.error(e)
        }
      }

      clientPreloadReady(routes).then(() => {
        ReactDOM.hydrate(<App store={store} />, document.getElementById("root"))
      })
      ```

从这三个问题中我们可以看出项目的架构主要为了解决服务端页面数据的预取和实现结合 SSR 的 Dynamic Import

### React18 的 SSR 实现（本项目）

- 如何在服务端获取当前页面需要的数据，然后产出 html 给客户端？

  我们利用 react-router v6 提供的 matchRoutes 方法，结合服务端的 request 请求路径 ctx.request.path，得到当前匹配的页面组件。
  在 React 18 中，当我们使用 Suspense 包裹一个组件的时候，可以使用一种叫 Render-as-you-fetch 数据请求方案（即取即渲染）,结合 React 18 SSR 提供的能力，在当前页面所有数据被获取之前，使用流式 HTML：

  ```jsx
  const Index = (props: any) => {
    return (
      <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
        <Discover {...props} />
      </Suspense>
    )
  }
  ```

  通过将 `<Discover>` 包装成 `<Suspense>`，我们告诉 React，它不需要等待 Discover 页面的数据准备好就可以开始为页面的其他部分传输 HTML。当服务器上的 Discover 页面数据准备好后，React 会将额外的 HTML 发送到同一个流中，然后替换 Suspense 中的 Spinner 占位。甚至在 React 本身加载到客户端之前，迟来的 Discover 页面的 HTML 就会完成渲染。

  为了利用 React 18 的这种 Suspense 数据请求方案，项目采用了 React-query 管理数据请求，开箱即用的完成了 Render-as-you-fetch 数据请求方案：

  ```javascript
  // discover page的banner数据
  const { data } = useQuery("/api/banner?type=2", bannersfetch, {
    suspense: true,
  })
  ```

  当然为了兼容在服务器上预先获当前页面的数据，项目架构也支持了在导出的每个页面级组件上挂载 FetchServerSideProps 方法，该方法会在服务端执行

  ```typescript
  type FetchServerSideProps = ({
    store,
    ctx,
    queryClient,
  }: {
    // react-query client实例
    queryClient: QueryClient
    // redux store实例
    store: Store
    // Koa ctx
    ctx: Context
  }) => void
  ```

  这样我们既可以结合 react-query 的 prefetch，也可以把状态 dispatch 到 redux store

  ```js
  const fetchServerSideProps = async ({
  queryClient,
  store
  ctx,
  }) => {
    console.log(ctx.url)
    await Promise.all([
      queryClient.prefetchQuery("/api/banner?type=2", bannersfetch),
      queryClient.prefetchQuery(
        "/api/personalized/newsong",
        personalizedSongsFetch,
      ),
    ])
    store.dispatch(...)
  }
  ```

- redux Store 的 states 如何同步？
  
  同上一个项目的实现方式，只是 React Redux 8 的 Provider 多了一个 serverState

- 如何实现支持 SSR 的页面级 dynamic import
  
  React 18 中 React.lazy 可以实现 dynamic import，结合 Suspense，就是 React 原生级别的支持 SSR 的 dynamic import。

从这三个问题中可以看出，依托 React 18 的 SSR Suspense 架构，结合 react-query，本项目的 SSR 架构实现比上一个简单明了

### [对比两个实现，解决了什么问题？](https://github.com/reactwg/react-18/discussions/37)

在 React 18 之前的 SSR 的流程如下：

- 在服务端上获取当前页面的数据。
- 然后在服务端上将当前页面渲染成 HTML 并在响应中返回。
- 然后在客户端加载当前页面的 JavaScript 代码。
- 然后在客户端将 JavaScript 逻辑绑定到服务端生成的 HTML（这个过程叫 “hydration”），该过程不可中断。

这个流程的问题在于每一步都必须在下一步开始之前一次性完成当前页面的工作，这样就会带导致服务端响应慢，页面可交互时间变长

React 18 为 SSR 提供了两个主要功能：

- 流式 HTML 响应。流式 HTML 响应可以让服务端尽快的产出 HTML 给客户端，加快了服务端的响应，让页面尽快的展现给用户。
- 选择性的 hyration。选择性的 hyration 可让应用在 HTML 和 JavaScript 代码的其余部分完全下载之前尽早开始为页面 hydrate。它还优先为用户正在与之交互的部分 hydrate，从而产生即时补水的错觉。如此种种都可以加快页面可交互时间。

这些功能解决了 React 中 SSR 的三个长期存在的问题：

- 不需要等待所有的数据在服务器上加载后再发送 HTML。相反，一旦有足够的数据来显示页面，就可以开始发送 HTML，其余的 HTML 在准备好后再进行流式传输。
- 不需要等待所有的 JavaScript 加载来开始 hydration。相反，可以使用结合服务器渲染的代码拆分。服务器 HTML 将被保留，React 将在相关代码加载时对其进行 hydration。
- 不需要等待所有的组件被 hydrated 后才开始可以与页面互动。相反，可以依靠选择性的 hyration，来优先考虑用户正在与之互动的组件，并尽早对它们进行 hydration。

### 关于 webpack 打包

由于 React 的代码不能直接在服务端运行，所以需要 webpack 打包 server 端的代码。在 webpack.server 打包配置的时候需要注意：

```javascript
import nodeExternals from "webpack-node-externals"
{
 externalsPresets: { node: true },
 externals: [nodeExternals()],
}
```

`@babel/preset-env`的 targets 要设置为 node。

MiniCssExtractPlugin 的 linkType 和 runtime 都需要设置为 false，防止 MiniCssExtractPlugin 在打包的代码中注入创建 style 标签的运行时代码，因为服务端没有 window 和 document 对象。

## 项目其他技术特点

1. PWA 支持。支持 PWA 的浏览器可以安装到桌面（IOS 15 已经支持 PWA 应用 audio 的后台播放和 APP 主题色）
2. 使用最少的代码实现全站图片懒加载
   图片懒加载的实现使用的是 IntersectionObserver 和浏览器原生支持的[image lazy loading](https://web.dev/browser-level-image-lazy-loading/)

   ```typescript
   const load = (element: HTMLImageElement) => {
     if (element.getAttribute("data-src")) {
       element.src = element.getAttribute("data-src") as string
       element.setAttribute("data-loaded", "true")
     }
   }

   const isLoaded = (element: HTMLImageElement) =>
     element.getAttribute("data-loaded") === "true"

   const pikaLazy: (options: { imgRef: HTMLImageElement }) => {
     lazyObserver: (imgRef: HTMLImageElement) => IntersectionObserver | null
   } = (options) => {
     // 浏览器原生支持 lazy loading
     if ("loading" in HTMLImageElement.prototype) {
       options.imgRef.loading = "lazy"
       return {
         lazyObserver: (imgRef: HTMLImageElement) => {
           load(imgRef)
           return null
         },
       }
     }
     let observer: IntersectionObserver
     if (typeof window !== "undefined" && window.IntersectionObserver) {
       observer = new IntersectionObserver(
         (entries, originalObserver) => {
           entries.forEach((entry) => {
             if (entry.intersectionRatio > 0 || entry.isIntersecting) {
               originalObserver.unobserve(entry.target)
               if (!isLoaded(entry.target as HTMLImageElement)) {
                 load(entry.target as HTMLImageElement)
               }
             }
           })
         },
         {
           // ...options,
           rootMargin: "0px",
           threshold: 0,
         },
       )
     }

     return {
       lazyObserver: (imgRef: HTMLImageElement) => {
         if (isLoaded(imgRef)) {
           return null
         }
         if (observer) {
           observer.observe(imgRef)
           return observer
         }

         load(imgRef)
         return null
       },
     }
   }
   ```

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
| ├─routes.tsx：路由文件 z
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
-
## ToDo

- [ ] 项目单元测试补充完整
- [ ] react server components实践

