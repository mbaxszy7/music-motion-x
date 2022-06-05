import React, { ReactNode } from "react"

import { Context } from "koa"
import { matchRoutes, RouteMatch } from "react-router"

import routes from "../routes"
import getReduxStore from "../createStore"
import Html from "../Html"
import App from "../App"
import { DataProvider } from "../pages/About/data-about"

const setInitialDataToStore = async (
  matchedRoutes: RouteMatch[] | null,
  ctx: Context,
) => {
  const store = getReduxStore({})
  if (matchedRoutes)
    await Promise.allSettled(
      matchedRoutes.map((item) => {
        return Promise.resolve(
          (item.route.element as any)?.type?.getServerSideProps?.(store, ctx) ??
            null,
        )
      }),
    )

  return store
}

function createServerData() {
  let done = false
  let promise: Promise<unknown> | null = null
  return {
    read() {
      if (done) {
        return
      }
      if (promise) {
        throw promise
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true
          promise = null
          resolve("")
        }, 2000)
      })
      throw promise
    },
  }
}

const renderHTML = async (
  ctx: Context,
  staticContext: { NOT_FOUND: boolean },
  assetsCSS: { [x: string]: string }[],
  assetsJS: { [x: string]: string }[],
) => {
  let markup: null | ReactNode = null

  const matchedRoutes = matchRoutes(routes, ctx.request.path)

  const store = await setInitialDataToStore(matchedRoutes, ctx)
  console.log("matchedRoutes", matchedRoutes)
  if (!matchedRoutes) staticContext.NOT_FOUND = true
  try {
    markup = (
      <Html
        assetsCSS={assetsCSS}
        assetsJS={assetsJS}
        title="music-motion"
        states={store.getState()}
      >
        <DataProvider data={createServerData()}>
          <App
            store={store}
            isServer
            location={ctx.request.path}
            preloadedState={store.getState()}
          />
        </DataProvider>
      </Html>
    )
  } catch (error) {
    console.log("renderHTML 70,", error)
  }

  return {
    markup,
    state: store.getState(),
  }
}

export default renderHTML
