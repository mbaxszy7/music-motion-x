import { render, screen } from "@testing-library/react"
import InnerModal from "../../src/components/InnerModal"
import renderWithModalRoot from "../test-utils/renderWithModalRoot"

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000))

describe("InnerModal", () => {
  it("worked with modal root", () => {
    const { asFragment } = renderWithModalRoot(
      <InnerModal isDynamic={false}>test</InnerModal>,
    )
    expect(screen.getByText("test")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it("worked without modal root", () => {
    const modalRoot = document.createElement("div")
    const { asFragment } = render(
      <InnerModal isDynamic={true}>test</InnerModal>,
      { container: document.body.appendChild(modalRoot) },
    )

    expect((document.body.childNodes[1] as HTMLDivElement).innerHTML).toEqual(
      "<div>test</div>",
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("will clear element when beforeunload", async () => {
    const modalRoot = document.createElement("div")
    modalRoot.id = "modal_root"
    const original = window.console.error
    window.console.error = jest.fn()

    const { unmount } = renderWithModalRoot(
      <InnerModal isDynamic={false}>test</InnerModal>,
    )

    expect(screen.getByText("test")).toBeInTheDocument()

    const beforeunload = new Event("beforeunload")

    window.dispatchEvent(beforeunload)
    expect(window.console.error).toBeCalledTimes(0)

    expect(screen.queryByText("test")).toBeFalsy()
    unmount()
    expect(window.console.error).toBeCalledTimes(1)

    window.console.error = original
  })
})
