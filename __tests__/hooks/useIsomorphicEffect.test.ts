import { useEffect } from "react"

describe("useIsomorphicEffect", () => {
  it("worked on server", async () => {
    const windowSpy = jest.spyOn(global, "window", "get")
    // @ts-ignore
    windowSpy.mockImplementation(() => undefined)
    const ret = await import("../../src/hooks/useIsomorphicEffect")
    expect(ret.default === useEffect).toBeTruthy()
    windowSpy.mockRestore()
  })
})
