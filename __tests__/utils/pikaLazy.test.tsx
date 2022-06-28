import pikaLazy from "../../src/utils/pikaLazy"
const IntersectionObserver = window.IntersectionObserver
describe("pikaLazy", () => {
  afterAll(() => {
    window.IntersectionObserver = IntersectionObserver
  })
  it("can work with native image lazyLoading", () => {
    const img = document.createElement("img")
    img.setAttribute("data-src", "test")
    HTMLImageElement.prototype.loading = "true"
    const { lazyObserver } = pikaLazy({
      imgRef: img,
    })

    lazyObserver(img)

    expect(img.loading).toBe("lazy")
    expect(img.src).toBe("http://localhost/test")
    expect(img.getAttribute("data-loaded")).toBe("true")
  })

  it("can work with IntersectionObserver", () => {
    const img = document.createElement("img")
    img.setAttribute("data-src", "test")
    // @ts-ignore
    window.IntersectionObserver = function (fn: any, opts: any) {
      return {
        observe: () => {
          fn([{ intersectionRatio: 1, target: img }], {
            unobserve: (ele: HTMLElement) => {},
          })
        },
        unobserve: (ele: HTMLElement) => {},
      }
    }
    const proto = HTMLImageElement.prototype
    delete proto.loading

    const { lazyObserver } = pikaLazy({
      imgRef: img,
    })

    const observer = lazyObserver(img)
    expect(img.loading).toBe(undefined)
    expect(img.src).toBe("http://localhost/test")
    expect(img.getAttribute("data-loaded")).toBe("true")

    observer?.observe(img)
    img.setAttribute("data-loaded", "false")
    img.setAttribute("data-src", "")
    observer?.observe(img)
    expect(img.getAttribute("data-loaded")).toBe("false")

    const imgOther = document.createElement("img")
    imgOther.setAttribute("data-src", "test")
    // @ts-ignore
    window.IntersectionObserver = function (fn: any, opts: any) {
      return {
        observe: () => {
          fn([{ intersectionRatio: 0, target: img }], {
            unobserve: (ele: HTMLElement) => {},
          })
        },
        unobserve: (ele: HTMLElement) => {
          imgOther.setAttribute("data-loaded", "false")
        },
      }
    }

    const { lazyObserver: lazyObserverOther } = pikaLazy({
      imgRef: imgOther,
    })

    lazyObserverOther(imgOther)
    expect(imgOther.loading).toBe(undefined)
    expect(imgOther.src).toBe("")
    expect(imgOther.getAttribute("data-loaded")).toBe(null)
  })

  it("IntersectionObserver will not trigger lazy load when is loaded", () => {
    const img = document.createElement("img")
    img.setAttribute("data-src", "test")
    img.src = "test-loaded"
    // @ts-ignore
    window.IntersectionObserver = function (fn: any, opts: any) {
      return {
        observe: () => {
          fn([{ intersectionRatio: 1, target: img }], {
            unobserve: (ele: HTMLElement) => {},
          })
        },
        unobserve: (ele: HTMLElement) => {},
      }
    }
    const proto = HTMLImageElement.prototype
    delete proto.loading
    img.setAttribute("data-loaded", "true")
    const { lazyObserver } = pikaLazy({
      imgRef: img,
    })

    lazyObserver(img)
    expect(img.src).toBe("http://localhost/test-loaded")
  })
  it("can work when IntersectionObserver not worked", () => {
    const img = document.createElement("img")
    img.setAttribute("data-src", "test")

    // @ts-ignore
    window.IntersectionObserver = null
    const proto = HTMLImageElement.prototype
    delete proto.loading

    const { lazyObserver } = pikaLazy({
      imgRef: img,
    })

    lazyObserver(img)
    expect(img.src).toBe("http://localhost/test")
    expect(img.getAttribute("data-loaded")).toBe("true")
  })
})
