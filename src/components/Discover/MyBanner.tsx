/* eslint-disable react/prop-types */
import React, {
  memo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react"

import { MyImage } from "@/components/Image"
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"

const MyBanner = memo(
  forwardRef<
    { nextPic: (idx: number) => void },
    {
      banners: string[]
      onBannerChange: (index: number) => void
    }
  >((props, ref) => {
    const { banners, onBannerChange } = props

    const requestNextPicId = useRef<ReturnType<typeof setTimeout>>()
    const requestNextTick = useRef<ReturnType<typeof setTimeout>>()
    const root = useRef<HTMLDivElement | null>(null)
    const position = useRef(0)
    const startX = useRef(0)
    const scrollX = useRef<number>(0)

    const pause = useCallback(() => {
      clearTimeout(requestNextPicId.current)
      clearTimeout(requestNextTick.current)
    }, [])

    const goTo = useCallback(() => {
      const currentPosition = position.current
      const nextPosition = (currentPosition + 1) % banners.length
      const current: HTMLDivElement = root.current?.childNodes?.[
        currentPosition
      ] as HTMLDivElement
      const next: HTMLDivElement = root.current?.childNodes?.[
        nextPosition
      ] as HTMLDivElement
      if (!current || !next) return

      current.style.transition = "none"
      next.style.transition = "none"

      // current的position translate到position 0的位置
      current.style.transform = `translate3d(${-100 * currentPosition}%, 0, 0)`

      // current的position translate到position 1的位置
      next.style.transform = `translate3d(${100 - 100 * nextPosition}%, 0, 0)`
      next.style.transform = `${next.style.transform}scale(0.8)`

      const tick = () => {
        current.style.transition = ""
        next.style.transition = ""

        // current 向前（左）translate
        current.style.transform = `translate3d(${
          -100 - 100 * currentPosition
        }%, 0, 0)`
        current.style.transform = `${current.style.transform}scale(0.8)`

        // next到current的位置
        next.style.transform = `translate3d(${-100 * nextPosition}%, 0, 0)`
        position.current = nextPosition
        onBannerChange(position.current)
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            tick()
          } catch (e) {
            console.log(e)
          }
        })
      })
      requestNextTick.current = setTimeout(() => {
        try {
          goTo()
        } catch (e) {
          console.log(e)
        }
      }, 3000)
    }, [banners.length, onBannerChange])

    const nextPic = useCallback(
      (index?: number) => {
        if (index != null) {
          onBannerChange(index)
          pause()
          const cur = root.current?.childNodes?.[
            position.current
          ] as HTMLDivElement

          if (!cur) return
          cur.style.transition = "none"
          // 移走当前的position
          cur.style.transform = `translate3d(${
            (banners.length + 1) * 100
          }%, 0, 0)`

          const current = root.current?.childNodes?.[index] as HTMLDivElement
          current.style.transition = "none"
          // 移动指定的index到当前位置
          current.style.transform = `translate3d(${-100 * index}%, 0, 0)`

          position.current = index
        } else {
          onBannerChange(position.current)
        }

        requestNextPicId.current = setTimeout(() => {
          try {
            goTo()
          } catch (e) {
            console.log(e)
          }
        }, 3000)
      },
      [banners.length, goTo, onBannerChange, pause],
    )

    const start = useCallback(() => {
      clearTimeout(requestNextPicId.current)
      nextPic()
    }, [nextPic])

    const onEventStart = useCallback(
      (
        startXValue: number,
        current: HTMLDivElement,
        last: HTMLDivElement,
        next: HTMLDivElement,
        lastPosition: number,
        nextPosition: number,
      ) => {
        pause()
        startX.current = startXValue

        current.style.transition = "none"
        last.style.transition = "none"
        next.style.transition = "none"

        current.style.transform = `translate3d(${
          -scrollX.current * position.current
        }px, 0, 0)`
        last.style.transform = `translate3d(${
          -scrollX.current - scrollX.current * lastPosition
        }px, 0, 0)`
        next.style.transform = `translate3d(${
          scrollX.current - scrollX.current * nextPosition
        }px, 0, 0)`
      },
      [pause],
    )

    const onEventMove = useCallback(
      (
        moveX: number,
        current: HTMLDivElement,
        last: HTMLDivElement,
        next: HTMLDivElement,
        lastPosition: number,
        nextPosition: number,
      ) => {
        current.style.transform = `translate3d(${
          moveX - startX.current - scrollX.current * position.current
        }px, 0, 0)`
        current.style.transform = `${current.style.transform}scale(${
          1 - Math.abs((moveX - startX.current) / (scrollX.current * 2.5))
        })`

        last.style.transform = `translate3d(${
          moveX -
          startX.current -
          scrollX.current -
          scrollX.current * lastPosition
        }px, 0, 0)`
        last.style.transform = `${last.style.transform}scale(0.9)`

        next.style.transform = `translate3d(${
          moveX -
          startX.current +
          scrollX.current -
          scrollX.current * nextPosition
        }px, 0, 0)`
        next.style.transform = `${next.style.transform}scale(0.9)`
      },
      [],
    )

    const onEventEnd = useCallback(
      (
        endX: number,
        current: HTMLDivElement,
        last: HTMLDivElement,
        next: HTMLDivElement,
        lastPosition: number,
        nextPosition: number,
      ) => {
        let offset = 0

        if (endX - startX.current > scrollX.current * 0.3) {
          offset = 1
        } else if (endX - startX.current < -scrollX.current * 0.3) {
          offset = -1
        }

        current.style.transition = ""
        last.style.transition = ""
        next.style.transition = ""

        current.style.transform = `translate3d(${
          offset * scrollX.current - scrollX.current * position.current
        }px, 0, 0)`
        last.style.transform = `translate3d(${
          offset * scrollX.current -
          scrollX.current -
          scrollX.current * lastPosition
        }px, 0, 0)`
        next.style.transform = `translate3d(${
          offset * scrollX.current +
          scrollX.current -
          scrollX.current * nextPosition
        }px, 0, 0)`

        position.current =
          (position.current - offset + banners.length) % banners.length

        start()
      },
      [banners.length, start],
    )

    const mouseEvent = useCallback(
      (event: MouseEvent) => {
        const lastPosition =
          (position.current - 1 + banners.length) % banners.length
        const nextPosition = (position.current + 1) % banners.length

        const current = root.current?.childNodes?.[
          position.current
        ] as HTMLDivElement
        const last = root.current?.childNodes?.[lastPosition] as HTMLDivElement
        const next = root.current?.childNodes?.[nextPosition] as HTMLDivElement

        onEventStart(
          event.clientX,
          current,
          last,
          next,
          lastPosition,
          nextPosition,
        )

        const move = (e: MouseEvent) => {
          onEventMove(
            e.clientX,
            current,
            last,
            next,
            lastPosition,
            nextPosition,
          )
        }
        const up = (e: MouseEvent) => {
          onEventEnd(e.clientX, current, last, next, lastPosition, nextPosition)

          root.current!.removeEventListener("mousemove", move)
          root.current!.removeEventListener("mouseup", up)
          root.current!.removeEventListener("mouseleave", up)
        }
        root.current!.addEventListener("mousemove", move)
        root.current!.addEventListener("mouseup", up)
        root.current!.addEventListener("mouseleave", up)
      },
      [banners.length, onEventEnd, onEventMove, onEventStart],
    )

    const bind = useCallback(() => {
      root.current!.addEventListener("mousedown", mouseEvent)

      root.current!.addEventListener(
        "touchstart",
        (event) => {
          if (event.cancelable) {
            event.preventDefault()
          }
          const lastPosition =
            (position.current - 1 + banners.length) % banners.length
          const nextPosition = (position.current + 1) % banners.length

          const current = root.current?.childNodes?.[
            position.current
          ] as HTMLDivElement
          const last = root.current?.childNodes?.[
            lastPosition
          ] as HTMLDivElement
          const next = root.current?.childNodes?.[
            nextPosition
          ] as HTMLDivElement

          onEventStart(
            event.changedTouches[0].pageX,
            current,
            last,
            next,
            lastPosition,
            nextPosition,
          )

          const move = (e: TouchEvent) => {
            if (e.cancelable) {
              e.preventDefault()
            }
            onEventMove(
              e.changedTouches[0].pageX,
              current,
              last,
              next,
              lastPosition,
              nextPosition,
            )
          }
          const up = (e: TouchEvent) => {
            onEventEnd(
              e.changedTouches[0].pageX,
              current,
              last,
              next,
              lastPosition,
              nextPosition,
            )

            root.current!.removeEventListener("touchmove", move)
            root.current!.removeEventListener("touchend", up)
          }
          root.current!.addEventListener("touchmove", move, { passive: false })
          root.current!.addEventListener("touchend", up, { passive: true })
        },
        { passive: true },
      )
    }, [banners.length, mouseEvent, onEventEnd, onEventMove, onEventStart])

    useIsomorphicEffect(() => {
      nextPic()
      requestAnimationFrame(() => {
        scrollX.current = parseInt(getComputedStyle(root.current!).width, 10)
        bind()
      })
    }, [bind, nextPic])

    useImperativeHandle(ref, () => ({
      nextPic,
    }))

    return (
      <div
        ref={root}
        className=" absolute w-full top-0 left-0 whitespace-nowrap touch-pan-x"
      >
        {banners.map((b, index) => (
          <div
            className=" w-full inline-block transition-transform ease-in-out duration-700 scale-100 "
            key={index}
          >
            {index === 0 ? (
              <img
                className=" w-full rounded-[10px]"
                src={b}
                alt=""
                draggable={false}
              />
            ) : (
              <MyImage url={b} className=" w-full rounded-[10px]" />
            )}
          </div>
        ))}
      </div>
    )
  }),
)

MyBanner.displayName = "MyBanner"

export default MyBanner
