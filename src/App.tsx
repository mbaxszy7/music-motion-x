/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { lazy, Suspense } from "react"

import type { RouteMatch } from "react-router"
import type { DehydratedState } from "react-query"
import type { StaticRouterProps } from "react-router-dom/server"

const PlayBar = lazy(() => import("@/components/PlayBar"))
const AppUpdateAvailable = lazy(() => import("@/components/AppUpdateAvailable"))
const ErrorFound = lazy(() => import("@/components/ErrorPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

const {
  QueryClient,
  useQueryErrorResetBoundary,
  Hydrate,
  QueryClientProvider,
} = await import("react-query")

const { ErrorBoundary } = await import("react-error-boundary")
const { HelmetProvider } = await import("react-helmet-async")
const { StaticRouter } = await import("react-router-dom/server")
const { Routes, Route } = await import("react-router")
const { BrowserRouter } = await import("react-router-dom")
const { Provider } = await import("react-redux")

const routes = await import("./routes").then((res) => res.default)

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
