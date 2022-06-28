import { act, screen, fireEvent } from "@testing-library/react"
import { useLayoutEffect } from "react"
import useScrollTop from "../../src/hooks/useScrollTop"
import renderWithRoot from "../test-utils/renderWithRoot"

describe("useRootScrollTop", () => {
  it("can scroll to top when page mount", () => {
    const App = () => {
      useLayoutEffect(() => {
        const ele = screen.getByTestId("test-root")
        fireEvent.scroll(ele, { target: { scrollTop: 300 } })
        expect(ele.scrollTop === 300).toBeTruthy()
      }, [])
      useScrollTop()
      return (
        <div data-testid="test-app" style={{ height: 900 }}>
          test-apptest-app
        </div>
      )
    }

    Element.prototype.scrollTo = (obj: any) => {
      const ele = screen.getByTestId("test-root")
      fireEvent.scroll(ele, { target: { scrollTop: obj.top } })
    }
    renderWithRoot(<App />)
    const ele = screen.getByTestId("test-root")
    expect(ele.scrollTop === 0).toBeTruthy()
  })
})
