import { fireEvent, render, screen } from "@testing-library/react"
import { TabPane, Tabs } from "../../src/components/Tab"

describe("Tab", () => {
  it("can change tab ", () => {
    const onChange = jest.fn()
    render(
      <Tabs defaultActiveKey="1" onChange={onChange} activeTabKey="1">
        <TabPane tabKey="1" forceRender tab={"one"}>
          tab 1
        </TabPane>
        <TabPane tabKey="2" forceRender tab={"two"}>
          tab 2
        </TabPane>
      </Tabs>,
    )

    expect(screen.getByText("tab 1")).toBeInTheDocument()

    fireEvent.click(screen.getByText("two"))

    expect(onChange).toBeCalled()
  })

  it("can cache Tab content ", () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <Tabs defaultActiveKey="1" onChange={onChange} activeTabKey="1">
        <TabPane tabKey="1" forceRender tab={"one"}>
          tab 1
        </TabPane>
        <TabPane tabKey="2" tab={"two"}>
          tab 2
        </TabPane>
      </Tabs>,
    )

    expect(screen.getByText("tab 1")).toBeInTheDocument()
    fireEvent.click(screen.getByText("two"))
    expect(screen.getByText("tab 2")).toBeInTheDocument()

    rerender(
      <Tabs defaultActiveKey="2" onChange={onChange} activeTabKey="2">
        <TabPane tabKey="1" forceRender tab={"one"}>
          tab 1
        </TabPane>
        <TabPane tabKey="2" tab={"two"}>
          tab 3
        </TabPane>
      </Tabs>,
    )

    expect(screen.getByText("tab 2")).toBeInTheDocument()
  })
})
