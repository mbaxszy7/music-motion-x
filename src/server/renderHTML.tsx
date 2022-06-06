import React, { ReactNode } from "react"

import { Context } from "koa"
import { matchRoutes, RouteMatch } from "react-router"

import routes from "../routes"
import getReduxStore from "../store"
import Html from "./HTML"
import App from "../App"

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
        <App
          store={store}
          isServer
          location={ctx.request.path}
          preloadedState={store.getState()}
        />
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
