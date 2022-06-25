import { fireEvent, render, screen, act } from "@testing-library/react"
import MyPlaceholder from "../../src/components/MyPlaceholder"

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000))

describe("MyPlaceholder", () => {
  it("worked for block placeholder", () => {
    const { asFragment, rerender } = render(
      <MyPlaceholder rows={2} type="textBlock" ready={false}>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.queryByText("test")).toBeFalsy()
    expect(asFragment()).toMatchSnapshot()

    rerender(
      <MyPlaceholder rows={2} type="textBlock" ready={true}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.getByText("test")).toBeInTheDocument()

    rerender(
      <MyPlaceholder type="textBlock" ready={false}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.queryByText("test")).toBeFalsy()
  })

  it("worked for row placeholder", () => {
    const { asFragment } = render(
      <MyPlaceholder rows={2} type="textRow" ready={false}>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.queryByText("test")).toBeFalsy()
    expect(asFragment()).toMatchSnapshot()

    render(
      <MyPlaceholder rows={2} type="textRow" ready={true}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.getByText("test")).toBeInTheDocument()
  })

  it("can only worked for first lunched", () => {
    const { rerender } = render(
      <MyPlaceholder rows={2} type="textRow" ready={false} isOnlyFirstLunched>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.queryByText("test")).toBeFalsy()

    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={true} isOnlyFirstLunched>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.getByText("test")).toBeInTheDocument()

    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={false} isOnlyFirstLunched>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.getByText("test")).toBeInTheDocument()
  })

  it("can delay when become not ready", async () => {
    const { rerender } = render(
      <MyPlaceholder rows={2} type="textRow" ready={false} delay={1000}>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.queryByText("test")).toBeFalsy()

    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={true} delay={1000}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.getByText("test")).toBeInTheDocument()

    let handler = () => {}
    const originalsetTimeout = setTimeout
    Object.defineProperty(window, "setTimeout", {
      value: (fn: any, _delay: number) => {
        handler = fn
      },
      configurable: true,
      writable: true,
    })

    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={false} delay={1000}>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.getByText("test")).toBeInTheDocument()
    act(() => {
      handler()
    })

    expect(screen.queryByText("test")).toBeFalsy()

    Object.defineProperty(window, "setTimeout", {
      value: originalsetTimeout,
      configurable: true,
      writable: true,
    })
    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={true}>
        <div>test</div>
      </MyPlaceholder>,
    )
    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={false} delay={2000}>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.getByText("test")).toBeInTheDocument()

    rerender(
      <MyPlaceholder rows={2} type="textRow" ready={true} isOnlyFirstLunched>
        <div>test</div>
      </MyPlaceholder>,
    )
    expect(screen.getByText("test")).toBeInTheDocument()
  })

  it("can not bubble event", () => {
    const pClick = jest.fn()
    render(
      <div onClick={pClick}>
        <MyPlaceholder rows={2} type="textRow" ready={false}>
          <div>test</div>
        </MyPlaceholder>
      </div>,
    )

    fireEvent.click(screen.getByTestId("placeholder"))
    expect(pClick).toBeCalledTimes(0)
  })

  it("can render width customPlaceholder", () => {
    const customPlaceholder = <div>customPlaceholder</div>
    render(
      <MyPlaceholder customPlaceholder={customPlaceholder} ready={false}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.getByText("customPlaceholder")).toBeInTheDocument()

    render(
      <MyPlaceholder ready={false}>
        <div>test</div>
      </MyPlaceholder>,
    )

    expect(screen.queryByText("test")).toBeFalsy()
  })
})
