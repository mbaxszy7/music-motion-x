/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { lazy, Suspense } from "react"
import { StaticRouter, StaticRouterProps } from "react-router-dom/server"
import {
  QueryClient,
  useQueryErrorResetBoundary,
  Hydrate,
  DehydratedState,
  QueryClientProvider,
} from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Provider } from "react-redux"
import { RouteMatch, Routes, Route } from "react-router"
import routes from "./routes"

const PlayBar = lazy(() => import("@/components/PlayBar"))
const AppUpdateAvailable = lazy(() => import("@/components/AppUpdateAvailable"))
const ErrorFound = lazy(() => import("@/components/ErrorPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

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
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
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
        <Suspense>
          <ErrorFound resetErrorBoundary={resetErrorBoundary} error={error} />
        </Suspense>
      )}
    >
      <Provider store={store} serverState={preloadedState || {}}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Hydrate state={dehydratedState}>{IsomophicRouter}</Hydrate>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
