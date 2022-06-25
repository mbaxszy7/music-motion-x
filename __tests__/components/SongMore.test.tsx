/* eslint-disable testing-library/no-unnecessary-act */
import nock from "nock"
import { fireEvent, screen, act, waitFor } from "@testing-library/react"
import SongMore from "../../src/components/SongMore"
import App from "../test-utils/StoreProvider"
import renderWithModalRoot from "../test-utils/renderWithModalRoot"
// const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const IntersectionObserver = window.IntersectionObserver
const songId = 3

describe("SongMore", () => {
  beforeAll(() => {
    nock.disableNetConnect()
  })

  afterAll(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    window.IntersectionObserver = IntersectionObserver
  })

  beforeEach(() => {
    // @ts-ignore
    window.IntersectionObserver = function (fn: any, opts: any) {
      return {
        observe: () => {
          act(() => {
            fn([{ intersectionRatio: 1 }], {
              unobserve: (ele: HTMLElement) => {},
            })
          })
        },
        unobserve: (ele: HTMLElement) => {},
      }
    }

    nock("https://81.69.200.140")
      .get(`/api/check/music?id=${songId}`)
      .reply(200, {
        success: true,
      })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("render well when in viewpoint", async () => {
    const { asFragment } = renderWithModalRoot(
      <App>
        <SongMore
          albumName="abc"
          artistName="cdf"
          artistId={1}
          songName="ghj"
          albumId={2}
          songId={songId}
          imgUrl={"fake-url"}
        />
      </App>,
    )

    expect(asFragment()).toMatchSnapshot()

    act(() => {
      fireEvent.click(screen.getByTestId("song-more"))
      jest.runOnlyPendingTimers()
    })
    await waitFor(() => {
      expect(screen.getByText("下一首播放")).toBeInTheDocument()
    })
    expect(asFragment()).toMatchSnapshot()
    fireEvent.click(screen.getByText("下一首播放"))

    act(() => {
      fireEvent.click(screen.getByTestId("modal-mask"))
    })
  })

  it("could work well with intersection-observer polyfill", () => {
    // @ts-ignore
    window.IntersectionObserver = null

    const songId = 3
    const outClick = jest.fn()
    renderWithModalRoot(
      <App>
        <div onClick={outClick}>
          <SongMore
            albumName="abc"
            artistName="cdf"
            artistId={1}
            songName="ghj"
            albumId={2}
            songId={songId}
            imgUrl={"fake-url"}
          />
        </div>
      </App>,
    )
  })

  it("not trigger fetch when not in viewpoint", async () => {
    // @ts-ignore
    window.IntersectionObserver = function (fn: any, opts: any) {
      return {
        observe: () => {
          act(() => {
            fn([{ intersectionRatio: -0.6 }], {
              unobserve: (ele: HTMLElement) => {},
            })
          })
        },
        unobserve: (ele: HTMLElement) => {},
      }
    }

    renderWithModalRoot(
      <App>
        <SongMore
          albumName="abc"
          artistName="cdf"
          artistId={1}
          songName="ghj"
          albumId={2}
          songId={songId}
          imgUrl={"fake-url"}
        />
      </App>,
    )

    act(() => {
      fireEvent.click(screen.getByTestId("song-more"))
      jest.runOnlyPendingTimers()
    })
    await waitFor(() => {
      expect(screen.getByText("暂无版权")).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText("暂无版权"))
  })

  it("can nav to artist page", async () => {
    renderWithModalRoot(
      <App>
        <SongMore
          albumName="abc"
          artistName="cdf"
          artistId={1}
          songName="ghj"
          albumId={2}
          songId={songId}
          imgUrl={"fake-url"}
        />
      </App>,
    )
    act(() => {
      fireEvent.click(screen.getByTestId("song-more"))
      jest.runAllTimers()
    })
    await waitFor(() => {
      expect(screen.getByText("下一首播放")).toBeInTheDocument()
    })

    act(() => {
      fireEvent.click(screen.getByText("歌手 cdf"))
      jest.runAllTimers()
    })
  })

  it("can nav to album page", async () => {
    // jest.useFakeTimers()
    renderWithModalRoot(
      <App>
        <SongMore
          albumName="abc"
          artistName="cdf"
          artistId={1}
          songName="ghj"
          albumId={2}
          songId={songId}
          imgUrl={"fake-url"}
        />
      </App>,
    )
    act(() => {
      fireEvent.click(screen.getByTestId("song-more"))
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => {
      expect(screen.getByText("下一首播放")).toBeInTheDocument()
    })
    act(() => {
      fireEvent.click(screen.getByText("专辑 abc"))
      jest.runAllTimers()
    })
  })
})
