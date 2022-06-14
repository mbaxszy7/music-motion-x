/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  FC,
  CSSProperties,
} from "react"
import imagsCss from "./Image.module.css"
import pikaLazy from "@/utils/pikaLazy"

const MyImage: FC<{
  url: string
  styledCss?: CSSProperties
  className: string
}> = memo(({ url, styledCss, className }) => {
  MyImage.displayName = "MyImage"
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  const onImageLoaded = useCallback(() => setLoaded(true), [])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (url) {
      const lazy = pikaLazy({ imgRef: img! })
      observerRef.current = lazy.lazyObserver(img!)
    }
    return () => observerRef.current?.disconnect?.()
  }, [url])

  return (
    <img
      onMouseDown={(e) => e.preventDefault()}
      ref={imgRef}
      className={` bg-dg select-none  ${imagsCss.my_image} ${className} ${
        url ? "pika-lazy" : ""
      }`}
      data-src={url ? url.replace(/https?/, "https") : ""}
      style={styledCss ?? {}}
      data-settled={isLoaded}
      alt=""
      onLoad={onImageLoaded}
      draggable={false}
      // loading="lazy"
    />
  )
})

export { MyImage }
