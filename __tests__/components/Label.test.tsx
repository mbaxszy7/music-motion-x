import { render, screen } from "@testing-library/react"
import Label from "../../src/components/Label"

it("worked", () => {
  const { asFragment, rerender } = render(
    <Label text="test" style={{ color: "red" }} />,
  )

  expect(screen.getByText("#test")).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  rerender(<Label text="test" />)
  expect(asFragment()).toMatchSnapshot()
})
