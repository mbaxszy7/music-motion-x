import { render, screen, act } from "@testing-library/react"
import LazyShow from "../../src/components/LazyShow"

let handler = (_value: unknown) => {}

jest.mock("tti-polyfill", () => ({
  __esModule: true,
  default: {
    getFirstConsistentlyInteractive: () => {
      return {
        then: (fn: any) => {
          handler = fn
        },
      }
    },
  },
}))
it("worked with window scroll lazy show", async () => {
  render(<LazyShow mode="scroll">test</LazyShow>)
  const documentClickEvent = new Event("scroll")

  act(() => {
    window.dispatchEvent(documentClickEvent)
  })

  expect(screen.getByText("test")).toBeInTheDocument()
})

it("worked with root scroll lazy show", async () => {
  const div = document.createElement("div")
  document.body.appendChild(div)
  render(
    <LazyShow mode="scroll" root={() => div}>
      test
    </LazyShow>,
  )
  const documentClickEvent = new Event("scroll")

  act(() => {
    div.dispatchEvent(documentClickEvent)
  })

  expect(screen.getByText("test")).toBeInTheDocument()
})

it("worked with tti lazy show", async () => {
  render(<LazyShow mode="tti">test</LazyShow>)

  act(() => {
    handler("")
  })
  expect(screen.getByText("test")).toBeInTheDocument()
})
