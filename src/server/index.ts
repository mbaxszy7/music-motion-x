/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { ReactNode } from "react"
import Koa, { Context } from "koa"
import path from "path"
import serve from "koa-static"
import mount from "koa-mount"

import { renderToPipeableStream } from "react-dom/server"
import fs from "fs"
import logger from "koa-logger"
import renderHTML from "./renderHTML"

const isDEV = process.env.NODE_ENV === "development"

const statsData = isDEV
  ? {}
  : JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "./compilation-stats.json"),
        "utf-8",
      ),
    )

const publicPath = statsData.publicPath || ""
// console.log(
//   "statsData.assets",
//   JSON.parse(
//     fs.readFileSync(
//       path.join(process.cwd(), "./compilation-stats.json"),
//       "utf-8",
//     ),
//   )
//     .assets.map((asset: { name: string; chunkNames: string[] }) => {
//       if (asset.name.endsWith(".js") && asset.chunkNames.includes("main"))
//         return { "main.js": `${publicPath}${asset.name}` }
//       else if (asset.name.endsWith(".js"))
//         return { [asset.name]: `${publicPath}${asset.name}` }
//     })
//     .filter((p: any) => !!p),
// )
const assetsJS: { [x: string]: string }[] = isDEV
  ? [{ "main.js": "/public/main.js" }]
  : statsData.assets
      .map((asset: { name: string; chunkNames: string[] }) => {
        if (asset.name.endsWith(".js") && asset.chunkNames.includes("main"))
          return { "main.js": `${publicPath}${asset.name}` }
        else return { [asset.name]: `${publicPath}${asset.name}` }
      })
      .filter((p: any) => !!p)

const assetsCSS = isDEV
  ? [{ "main.css": "/public/main.css" }]
  : statsData.assets
      .map((asset: { name: string; chunkNames: string[] }) => {
        if (asset.name.endsWith(".css") && asset.chunkNames.includes("main"))
          return { "main.css": `${publicPath}${asset.name}` }
        else return null
      })
      .filter((p: any) => !!p)

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = (err as any)?.status || 500
    ctx.body = "server error"
    ctx.app.emit("error", err, ctx)
  }
})

app.use(logger())
app.use(async (ctx, next) => {
  if (ctx.path.includes("service-worker.js")) {
    ctx.set({ "Service-Worker-Allowed": "/" })
  }
  await next()
})

// const sleep = (time: number) =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       resolve("")
//     }, time),
//   )

// app.use(async (ctx, next) => {
//   console.log("ctx.req.url", ctx.req.url)
//   if (ctx.req.url?.endsWith(".js")) {
//     await sleep(4000)
//     await next()
//   } else {
//     await next()
//   }
// })

app.use(mount("/public", serve("./public-client")))

const response = (
  ctx: Context,
  markup: ReactNode,

  staticContext: { NOT_FOUND: boolean },
) => {
  return new Promise((resolve, reject) => {
    let didError = false
    const mainJs =
      assetsJS.find((ass) => Object.keys(ass).includes("main.js"))?.[
        "main.js"
      ] ?? ""

    const { pipe } = renderToPipeableStream(markup, {
      bootstrapScripts: [mainJs],
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        ctx.res.setHeader("Content-type", "text/html")
        ctx.status = didError ? 500 : 200
        if (staticContext.NOT_FOUND) {
          ctx.status = 404
        }

        pipe(ctx.res).on("finish", () => {
          ctx.res.end()
          resolve("ctx.resolve")
        })
      },
      onShellError() {
        // Something errored before we could complete the shell so we emit an alternative shell.
        ctx.status = 500
        ctx.res.end("server error")
      },
      onError(err) {
        didError = true
        reject(err)
      },
    })
  })
}

app.use(async (ctx) => {
  if (ctx.accepts(ctx.header.accept?.split(",") ?? []) === "text/html") {
    const staticContext: { NOT_FOUND: boolean } = { NOT_FOUND: false }
    const { markup } = await renderHTML(ctx, staticContext, assetsCSS, assetsJS)

    if (markup) {
      await response(ctx, markup, staticContext)
    }
  }
})

app.on("error", (err) => {
  console.error("server error", err)
})

app.listen(5000, () => {
  console.log("music-motion server is listening on 5000")
})
