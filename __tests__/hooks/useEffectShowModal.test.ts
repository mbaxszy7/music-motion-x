import { renderHook, act } from "@testing-library/react"
import useEffectShowModal from "../../src/hooks/useEffectShowModal"

describe("useEffectShowModal", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })
  it("worked with delay show content and delay close modal", async () => {
    const { result } = renderHook(() => useEffectShowModal())
    expect(result.current.isShowModal).toBeFalsy()

    act(() => {
      result.current.onModalOpen()
    })
    expect(result.current.isShowModal).toBeTruthy()
    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(result.current.isShowContent).toBeTruthy()

    act(() => {
      result.current.onModalClose()
    })
    expect(result.current.isShowContent).toBeFalsy()
    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(result.current.isShowModal).toBeFalsy()
  })
})
