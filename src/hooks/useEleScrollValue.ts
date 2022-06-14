import { useEffect, useRef, useState } from "react"

const useEleScrollValue = (
  ele: () => HTMLElement,
  formatter: (m: number) => number,
) => {
  const [headerOpacity, setHeaderOpacity] = useState(0)
  const isScrolled = useRef({
    tag: false,
    value: 0,
  })

  useEffect(() => {
    const pageRef = document.getElementById("root")!
    const onWindowScroll = () => {
      const { top } = ele().getBoundingClientRect()
      if (!isScrolled.current.tag) {
        const scrolledValue = pageRef.scrollTop
        isScrolled.current.value = scrolledValue + top
        isScrolled.current.tag = true
      }
      const opacityV =
        (top - isScrolled.current.value) / -isScrolled.current.value
      setHeaderOpacity(opacityV)
    }

    pageRef.addEventListener("scroll", onWindowScroll)
    return () => pageRef.removeEventListener("scroll", onWindowScroll)
  }, [ele, formatter])

  return formatter(headerOpacity)
}

export default useEleScrollValue
