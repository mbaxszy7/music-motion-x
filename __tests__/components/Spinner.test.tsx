import { render } from "@testing-library/react"
import Spinner, { SpinnerLoading } from "../../src/components/Spinner"

describe("Spinner & SpinnerLoading", () => {
  it("spinner display well", () => {
    const { asFragment } = render(<Spinner style={{ color: "red" }} />)

    expect(asFragment()).toMatchSnapshot()

    const { asFragment: asFragmentOther } = render(<Spinner />)

    expect(asFragmentOther()).toMatchSnapshot()
  })

  it("SpinnerLoading", () => {
    const { asFragment } = render(
      <SpinnerLoading style={{ color: "red" }} color="red" />,
    )

    expect(asFragment()).toMatchSnapshot()

    const { asFragment: asFragmentOther } = render(
      <SpinnerLoading color="red" />,
    )
    expect(asFragmentOther()).toMatchSnapshot()
  })
})
