import { fireEvent, render, screen } from "@testing-library/react"
import ErrorPage from "../../src/components/ErrorPage"

it("worked when error", () => {
  const resetErrorBoundary = jest.fn()
  const original = window.console.log
  window.console.log = jest.fn()
  const { asFragment } = render(
    <ErrorPage
      resetErrorBoundary={resetErrorBoundary}
      error={new Error("test")}
    />,
  )

  fireEvent.click(screen.getByTestId("error-btn"))
  expect(window.console.log).toBeCalledTimes(1)
  expect(resetErrorBoundary).toHaveBeenCalledTimes(1)
  expect(asFragment()).toMatchSnapshot()
  window.console.log = original
})
