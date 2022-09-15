const load = (element: HTMLImageElement) => {
  if (element.getAttribute("data-src")) {
    element.src = element.getAttribute("data-src") as string
    element.setAttribute("data-loaded", "true")
  }
}

const isLoaded = (element: HTMLImageElement) =>
  element.getAttribute("data-loaded") === "true"

const pikaLazy: (options: { imgRef: HTMLImageElement }) => {
  lazyObserver: (imgRef: HTMLImageElement) => IntersectionObserver | null
} = (options) => {
  if ("loading" in HTMLImageElement.prototype) {
    options.imgRef.loading = "lazy"
    return {
      lazyObserver: (imgRef: HTMLImageElement) => {
        load(imgRef)
        return null
      },
    }
  }
  let observer: IntersectionObserver
  if (typeof window !== "undefined" && window.IntersectionObserver) {
    observer = new IntersectionObserver(
      (entries, originalObserver) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            originalObserver.unobserve(entry.target)
            if (!isLoaded(entry.target as HTMLImageElement)) {
              load(entry.target as HTMLImageElement)
            }
          }
        })
      },
      {
        // ...options,
        rootMargin: "0px",
        threshold: 0,
      },
    )
  }

  return {
    lazyObserver: (imgRef: HTMLImageElement) => {
      if (isLoaded(imgRef)) {
        return null
      }
      if (observer) {
        observer.observe(imgRef)
        return observer
      }

      load(imgRef)
      return null
    },
  }
}

export default pikaLazy
