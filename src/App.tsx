/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { Suspense } from "react"
import { StaticRouter, StaticRouterProps } from "react-router-dom/server"
import {
  QueryClient,
  useQueryErrorResetBoundary,
  Hydrate,
  DehydratedState,
  QueryClientProvider,
} from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Provider } from "react-redux"
import { RouteMatch, Routes, Route } from "react-router"
import ErrorFound from "@/components/ErrorPage"

import routes from "./routes"
import NotFound from "./pages/NotFound"
import PlayBar from "@/components/PlayBar"
import AppUpdateAvailable from "@/components/AppUpdateAvailable"

import { HelmetProvider } from "react-helmet-async"

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
  dehydratedState,
  helmetContext,
}: {
  store: any
  isServer: boolean
  matchedRoutes?: RouteMatch[]
  location?: StaticRouterProps["location"]
  dehydratedState?: DehydratedState
  preloadedState: { [x: string]: any }
  helmetContext: any
}) => {
  const { reset } = useQueryErrorResetBoundary()
  const content = (
    <HelmetProvider context={helmetContext}>
      <Suspense>
        <PlayBar />
      </Suspense>

      <Routes>
        {routes.map((r) => (
          <Route element={r.element} path={r.path} key={r.path}>
            {r.children &&
              r.children.length > 0 &&
              r.children.map((child) => (
                <Route
                  element={child.element}
                  path={child.path}
                  key={child.path}
                />
              ))}
          </Route>
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  )

  const IsomophicRouter = isServer ? (
    <StaticRouter location={location || ""}>{content}</StaticRouter>
  ) : (
    <BrowserRouter>
      <>
        <AppUpdateAvailable />
        {content}
      </>
    </BrowserRouter>
  )

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <ErrorFound resetErrorBoundary={resetErrorBoundary} error={error} />
      )}
    >
      <Provider store={store} serverState={preloadedState || {}}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={dehydratedState}>{IsomophicRouter}</Hydrate>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
