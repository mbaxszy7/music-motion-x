import { useQuery } from "react-query"
import cx from "classnames"

import { memo, useCallback, useRef, useState } from "react"
import MyBanner from "./MyBanner"
import { bannersfetch } from "@/pages/Discover/fetches"

const Banners = memo(() => {
  const [activeBanner, setActiveBanner] = useState(0)

  const myBannerref = useRef<{ nextPic: (idx: number) => void }>({
    nextPic: (_id) => {},
  })

  const onBannerChange = useCallback((index: number) => {
    setActiveBanner(index)
  }, [])

  const { data } = useQuery("/api/banner?type=2", bannersfetch)
  return (
    <div
      className=" w-full relative overflow-hidden"
      style={{ padding: "39% 0 0" }}
    >
      <div className=" absolute bottom-1 left-1/2 -translate-x-1/2 z-20 will-change-transform">
        {data?.map((_, idx) => (
          <li
            className={cx(" mr-1 w-[6px] h-[6px] inline-block rounded-[50%]", {
              "bg-secondary": activeBanner === idx,
              " bg-white": activeBanner !== idx,
            })}
            key={idx}
            onClick={() => {
              myBannerref.current.nextPic(idx)
            }}
          />
        ))}
      </div>
      <MyBanner
        banners={
          data?.map((b) => (b.pic ? b.pic.replace(/https?/, "https") : "")) ??
          []
        }
        onBannerChange={onBannerChange}
        ref={myBannerref}
      />
    </div>
  )
})

Banners.displayName = "Banners"

export default Banners
