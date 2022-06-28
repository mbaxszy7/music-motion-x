import App from "../../src/App"
import renderWithRoot from "../test-utils/renderWithModalRoot"
import getReduxStore from "../../src/store"
import { render, screen, waitFor } from "@testing-library/react"

describe("client ", () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  it.skip("render CSR well", () => {
    jest.mock("../../src/routes", () => ({
      __esModule: true,
      default: [],
    }))
    const { asFragment } = renderWithRoot(
      <App store={getReduxStore({})} isServer={false} preloadedState={{}} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it.skip("render SSR well", async () => {
    jest.useFakeTimers()
    const { renderToString } = await import("react-dom/server")

    jest.mock("../../src/routes", () => ({
      __esModule: true,
      default: [],
    }))

    const container = document.createElement("div")
    container.id = "root"
    container.innerHTML = renderToString(
      <App
        store={getReduxStore({})}
        preloadedState={{}}
        location={"/"}
        isServer
        dehydratedState={undefined}
      />,
    )

    document.body.appendChild(container)

    const { asFragment } = render(
      <App
        store={getReduxStore({})}
        preloadedState={{}}
        location={"/"}
        isServer={false}
        dehydratedState={undefined}
      />,
      { container, hydrate: true },
    )

    await waitFor(() => screen.findByText("00:00"))

    expect(asFragment()).toMatchSnapshot()
  })
})
