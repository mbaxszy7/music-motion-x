import { act, screen, fireEvent } from "@testing-library/react"
import { useCallback, useRef } from "react"
import useEleScrollValue from "../../src/hooks/useEleScrollValue"
import renderWithRoot from "../test-utils/renderWithRoot"

describe("useEleScrollValue", () => {
  it("worked when page scroll", () => {
    const fn = jest.fn()
    const formatter = (number: number) => {
      fn(number)
      return Number.isNaN(number) ? 0 : number
    }
    const App = ({ formatter }: { formatter: (num: number) => number }) => {
      const scrollContainerRef = useRef<HTMLDivElement | null>(null)
      const callScrollContainerRef = useCallback(
        () => scrollContainerRef.current!,
        [],
      )
      const headerOpacity = useEleScrollValue(callScrollContainerRef, formatter)

      return (
        <>
          <div style={{ opacity: headerOpacity }}>test</div>
          <div ref={scrollContainerRef} style={{ height: 800 }}>
            dedede
          </div>
        </>
      )
    }
    const { asFragment, rerender } = renderWithRoot(
      <App formatter={formatter} />,
    )
    const pageRef = screen.getAllByTestId("test-root")?.[0]

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.scroll(pageRef, { target: { scrollTop: 300 } })
    })

    expect(fn).toBeCalled()
    expect(asFragment()).toMatchSnapshot()

    const fn1 = jest.fn()
    const formatter1 = (number: number) => {
      fn1(number)
      return Number.isNaN(number) ? 0 : number
    }

    rerender(<App formatter={formatter1} />)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.scroll(pageRef, { target: { scrollTop: 300 } })
    })
  })
})
