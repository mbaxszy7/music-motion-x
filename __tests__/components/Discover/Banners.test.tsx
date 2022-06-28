import Banners from "../../../src/components/Discover/Banners"
import nock from "nock"
import App, { queryClient } from "../../test-utils/StoreProvider"
import { render, waitFor, screen, fireEvent } from "@testing-library/react"

describe("Banners", () => {
  beforeAll(() => {
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
  })
  afterAll(() => {
    nock.enableNetConnect()
  })

  it("render well without images", async () => {
    nock("https://81.69.200.140").get(`/api/banner?type=2`).reply(200, {
      banners: [],
    })
    const { asFragment } = render(
      <App>
        <Banners />
      </App>,
    )
    await waitFor(() => screen.findByTestId("test-banners"))
    expect(asFragment()).toMatchSnapshot()
    queryClient.clear()
  })

  it("render well with images", async () => {
    queryClient.clear()
    nock("https://81.69.200.140")
      .get(`/api/banner?type=2`)
      .reply(200, {
        banners: [
          { pic: "http://image-one" },
          { pic: "http://image-two" },
          { pic: "" },
        ],
      })
    const { asFragment } = render(
      <App>
        <Banners />
      </App>,
    )

    await waitFor(() => screen.findAllByRole("img"))
    expect(asFragment()).toMatchSnapshot()
    fireEvent.click(screen.getAllByRole("listitem")[0])
    queryClient.clear()
  })
})
