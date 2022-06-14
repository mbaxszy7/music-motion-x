/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, {
  memo,
  useMemo,
  useState,
  useRef,
  useCallback,
  FC,
  ReactNode,
  MouseEventHandler,
} from "react"

import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"

const defaultWidths = [97, 100, 94, 90, 98, 95, 98, 40]

export const TextRow: FC<{ onClick: MouseEventHandler }> = ({ onClick }) => (
  <span
    onClick={onClick}
    className=" w-full h-4 block animate-placeholder-loading"
    style={{
      backgroundColor: "#e0e0e0",
    }}
  />
)

export const TextBlock: FC<{ rows: number; widths: number[] }> = memo(
  ({ rows = 3, widths = defaultWidths }) => {
    TextBlock.displayName = "TextBlock"
    return (
      <>
        {Array(rows)
          .fill("")
          .map((_, i) => (
            <span
              key={i}
              className=" w-full  h-[10px] block animate-placeholder-loading"
              style={{
                width: widths[(i + widths.length) % widths.length] + "%",
                marginTop: "0.6em",
                backgroundColor: "#e0e0e0",
              }}
            />
          ))}
      </>
    )
  },
)

const MyPlaceholderType = {
  textRow: TextRow,
  textBlock: TextBlock,
}

const MyPlaceholder: FC<{
  rows: number
  isOnlyFirstLunched?: boolean
  customPlaceholder?: ReactNode
  ready: boolean
  delay?: number
  type: "textRow" | "textBlock"
  widths?: number[]
  children?: ReactNode
}> = memo(function MyPlaceholder({
  rows,
  isOnlyFirstLunched,
  customPlaceholder,
  ready,
  delay,
  type,
  widths,
  children,
}) {
  const [readProp, setReadyProp] = useState(() => ready)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const handleClick: MouseEventHandler = useCallback(
    (e) => e.stopPropagation(),
    [],
  )
  const placeholder = useMemo(() => {
    if (customPlaceholder && React.isValidElement(customPlaceholder)) {
      return customPlaceholder
    }
    const Holder = MyPlaceholderType[type]
    return (
      <Holder
        rows={rows}
        widths={widths ?? defaultWidths}
        onClick={handleClick}
      />
    )
  }, [customPlaceholder, rows, type, widths, handleClick])

  useIsomorphicEffect(() => {
    if (!isOnlyFirstLunched && readProp && !ready) {
      if (delay && delay > 0) {
        timeout.current = setTimeout(() => {
          setReadyProp(false)
        }, delay)
      } else {
        setReadyProp(false)
      }
    } else if (ready) {
      // 如果已经ready
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      if (!readProp) {
        setReadyProp(true)
      }
    }
  }, [delay, isOnlyFirstLunched, readProp, ready])

  useIsomorphicEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  return <>{readProp ? children : placeholder}</>
})

export default MyPlaceholder
