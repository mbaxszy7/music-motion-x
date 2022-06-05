import React from "react"

import { hydrateRoot, createRoot } from "react-dom/client"

import App from "./App"
import getReduxStore from "./createStore"
import "./input.css"

let payloadData = {}
try {
  const ele: HTMLTextAreaElement | null = document.getElementById(
    "data-context",
  ) as HTMLTextAreaElement

  payloadData = JSON.parse(ele?.value?.trim?.() ? ele?.value : "{}")
} catch (e) {
  console.log(e)
}

const store = getReduxStore(payloadData)
console.log("process.env.SSR", process.env.SSR)
if (process.env.SSR === "true")
  hydrateRoot(
    document.getElementById("root")!,
    <App store={store} isServer={false} preloadedState={payloadData} />,
  )
else {
  createRoot(document.getElementById("root")!).render(
    <App store={store} isServer={false} preloadedState={payloadData} />,
  )
}
