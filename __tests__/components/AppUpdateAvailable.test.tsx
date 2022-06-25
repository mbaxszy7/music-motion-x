import { render, act, screen, fireEvent } from "@testing-library/react"

import AppUpdateAvailable from "../../src/components/AppUpdateAvailable"
// const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000))
describe("AppUpdateAvailable", () => {
  it("trigger update available when on load", async () => {
    let handler = (_x: boolean) => {}
    // @ts-ignore
    window.isUpdateAvailable = {
      then: (fn: any) => {
        handler = fn
      },
    }
    const modalRoot = document.createElement("div")
    modalRoot.id = "modal_root"
    render(<AppUpdateAvailable />, {
      container: document.body.appendChild(modalRoot),
    })
    expect(screen.queryByText("有新版本可用，是否更新？")).toBeFalsy()
    const load = new Event("load")
    window.dispatchEvent(load)

    act(() => {
      handler(true)
    })
    // handle cancel-dialog
    expect(screen.getByText("有新版本可用，是否更新？")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("cancel-dialog"))
    expect(screen.queryByText("有新版本可用，是否更新？")).toBeFalsy()
    // @ts-ignore
    window.isUpdateAvailable = null
  })

  it("will reload when click confirm", () => {
    let handler = (_x: boolean) => {}
    // @ts-ignore
    window.isUpdateAvailable = {
      then: (fn: any) => {
        handler = fn
      },
    }
    // handle confirm-dialog
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    })
    const modalRootOne = document.createElement("div")
    modalRootOne.id = "modal_root"
    render(<AppUpdateAvailable />, {
      container: document.body.appendChild(modalRootOne),
    })
    expect(screen.queryByText("有新版本可用，是否更新？")).toBeFalsy()

    window.dispatchEvent(new Event("load"))
    act(() => {
      handler(true)
    })
    expect(screen.getByText("有新版本可用，是否更新？")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("confirm-dialog"))
    expect(window.location.reload).toBeCalledTimes(1)
    // @ts-ignore
    window.isUpdateAvailable = null
  })

  it("trigger force sw update when visibility  not hidden", async () => {
    const modalRoot = document.createElement("div")
    modalRoot.id = "modal_root"
    const update = jest.fn()
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    })
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: {
        ready: {
          then: (fn: any) => {
            fn({
              update,
            })
          },
        },
      },
    })
    render(<AppUpdateAvailable />, {
      container: document.body.appendChild(modalRoot),
    })

    window.dispatchEvent(new Event("visibilitychange"))
    expect(update).toBeCalledTimes(1)
  })

  it("not trigger force sw update when visibility hidden", async () => {
    const modalRoot = document.createElement("div")
    modalRoot.id = "modal_root"
    const update = jest.fn()
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    })
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: {
        ready: {
          then: (fn: any) => {
            fn({
              update,
            })
          },
        },
      },
    })
    render(<AppUpdateAvailable />, {
      container: document.body.appendChild(modalRoot),
    })

    window.dispatchEvent(new Event("visibilitychange"))
    expect(update).toBeCalledTimes(0)
  })

  it("not trigger force sw update when none serviceWorker ", async () => {
    const modalRoot = document.createElement("div")
    modalRoot.id = "modal_root"
    const update = jest.fn()
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    })
    const originalserviceWorker = navigator.serviceWorker
    // @ts-ignore
    delete navigator.serviceWorker

    render(<AppUpdateAvailable />, {
      container: document.body.appendChild(modalRoot),
    })

    window.dispatchEvent(new Event("visibilitychange"))
    expect(update).toBeCalledTimes(0)
    // @ts-ignore
    navigator.serviceWorker = originalserviceWorker
  })
})
