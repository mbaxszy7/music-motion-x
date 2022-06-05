/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from "react"
import { StaticRouter, StaticRouterProps } from "react-router-dom/server"
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Provider } from "react-redux"
import { RouteMatch, Routes, Route } from "react-router"
import Header from "./components/Header"
import routes from "./routes"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

const App = ({
  store,
  isServer,
  location,
  preloadedState,
}: {
  store: any
  isServer: boolean
  matchedRoutes?: RouteMatch[]
  location?: StaticRouterProps["location"]
  preloadedState: { [x: string]: any }
}) => {
  const { reset } = useQueryErrorResetBoundary()
  const content = (
    <>
      <Header />
      <Routes>
        {routes.map((r) => (
          <Route element={r.element} path={r.path} key={r.path} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )

  const IsomophicRouter = isServer ? (
    <StaticRouter location={location || ""}>{content}</StaticRouter>
  ) : (
    <BrowserRouter>{content}</BrowserRouter>
  )

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}
    >
      <Provider store={store} serverState={preloadedState || {}}>
        <QueryClientProvider client={queryClient}>
          {IsomophicRouter}
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
