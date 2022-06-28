import clamp from "../../src/utils/clamp"

describe("clamp", () => {
  it("can work", () => {
    expect(clamp(8, 9, 10)).toBe(9)
    expect(clamp(12, 9, 11)).toBe(11)
    expect(clamp(9, 9, 91)).toBe(9)
  })
})
