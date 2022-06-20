import React from "react"

import { hydrateRoot, createRoot } from "react-dom/client"

import App from "../App"
import getReduxStore from "../store"
import "./index.css"

console.info("process.env.SSR", process.env.SSR)

if (process.env.SSR === "true") {
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
  hydrateRoot(
    document.getElementById("root")!,
    <App store={store} isServer={false} preloadedState={payloadData} />,
  )
} else {
  const store = getReduxStore({})
  createRoot(document.getElementById("root")!).render(
    <App store={store} isServer={false} preloadedState={{}} />,
  )
}

window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("/public/service-worker.js", { scope: "/" })
    .then((registration) => {
      console.log("SW registered: ", registration)
    })
    .catch((registrationError) => {
      console.log("SW registration failed: ", registrationError)
    })
})
