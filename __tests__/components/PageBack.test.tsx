import { fireEvent, render, screen } from "@testing-library/react"
import AppBack from "../../src/components/AppBack"
import { BrowserRouter } from "react-router-dom"

describe("AppBack", () => {
  it("worked with full props", async () => {
    const back = jest.fn()
    const originalBack = window.history.back
    Object.defineProperty(window.history, "back", {
      value: back,
      configurable: true,
      writable: true,
    })
    const { asFragment } = render(
      <BrowserRouter>
        <AppBack title="test" style={{ color: "red" }} isBlack />
      </BrowserRouter>,
    )
    fireEvent.click(screen.getByTestId("back-icon"))

    expect(back).toHaveBeenCalledTimes(1)
    Object.defineProperty(window.history, "back", {
      value: originalBack,
      configurable: true,
      writable: true,
    })

    expect(asFragment()).toMatchSnapshot()
  })
  it("worked with none black style", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AppBack title="test" isBlack={false} />
      </BrowserRouter>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
