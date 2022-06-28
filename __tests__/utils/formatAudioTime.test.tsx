import formatAudioTime from "../../src/utils/formatAudioTime"

describe("formatAudioTime", () => {
  it("can work", () => {
    expect(formatAudioTime(100)).toBe("01:40")
    expect(formatAudioTime(0)).toBe("00:00")
  })
})
