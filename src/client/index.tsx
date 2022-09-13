import React from "react"

import { hydrateRoot, createRoot } from "react-dom/client"

import App from "../App"
import getReduxStore from "../store"
import "./index.css"

console.info("process.env.SSR", process.env.SSR)

// @ts-ignore
window.isUpdateAvailable = new Promise(function (resolve, reject) {
  navigator.serviceWorker
    .register("/public/service-worker.js", { scope: "/" })
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker)
          installingWorker.onstatechange = (e) => {
            console.log("/public/service-worker.js")
            console.log(installingWorker, e)
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  // new update available
                  resolve(true)
                } else {
                  // no update available
                  resolve(false)
                }
                break
            }
          }
      }
    })
    .catch((registrationError) => {
      console.info(registrationError)
      // eslint-disable-next-line prefer-promise-reject-errors
      reject("service-worker registration failed")
    })
})

if (process.env.SSR === "true") {
  let payloadData = {}
  let dehydratedState = null
  try {
    const eleOne: HTMLTextAreaElement | null = document.getElementById(
      "data-context",
    ) as HTMLTextAreaElement
    const eleTwo: HTMLTextAreaElement | null = document.getElementById(
      "data-dehydrated",
    ) as HTMLTextAreaElement
    payloadData = JSON.parse(eleOne?.value?.trim?.() ? eleOne?.value : "{}")
    dehydratedState = JSON.parse(eleTwo?.value?.trim?.() ? eleTwo?.value : "{}")
  } catch (e) {
    console.log(e)
  }

  const store = getReduxStore(payloadData)
  hydrateRoot(
    document.getElementById("root")!,
    <App
      store={store}
      isServer={false}
      preloadedState={payloadData}
      dehydratedState={dehydratedState ?? undefined}
      helmetContext={{}}
    />,
  )
} else {
  const store = getReduxStore({})
  createRoot(document.getElementById("root")!).render(
    <App
      store={store}
      isServer={false}
      preloadedState={{}}
      helmetContext={{}}
    />,
  )
}
