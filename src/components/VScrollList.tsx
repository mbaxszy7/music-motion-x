import { useState, useRef, useEffect, useCallback, ReactNode } from "react"

const ListItem = ({
  item,
  index,
  renderItem,
  fragmentSize,
  setItemHeight,
  itemH,
}: any) => {
  const eleRef = useRef<HTMLDivElement>(null)
  const h = useRef(0)
  useEffect(() => {
    if (h.current === itemH) {
      return
    }
    const item = eleRef.current!.childNodes[0] as HTMLDivElement
    const realHeight =
      item.offsetHeight +
      parseInt(getComputedStyle(item).marginTop) +
      parseInt(getComputedStyle(item).marginBottom)

    h.current = realHeight
    setItemHeight(realHeight)
  }, [setItemHeight, itemH])
  return <div ref={eleRef}>{renderItem(item, index, fragmentSize)}</div>
}

interface CacheItem {
  index: number
  top: number
  bottom: number
}

function VirtualizedList<T>({
  bufferSize = 3,
  list,
  renderItem,
  rowHeight,
}: {
  rowHeight?: number
  bufferSize?: number
  renderItem: (item: T, index: number, fragementSize: number) => ReactNode
  list: T[]
}) {
  const itemHeight = useRef(rowHeight ?? 200)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(0)
  const [visibleData, setVisibleData] = useState<T[]>([])
  const scrollTop = useRef(0)
  const container = useRef<HTMLDivElement>(null)

  const startIndex = useRef(0)
  const endIndex = useRef(0)
  const visibleCount = useRef(0)

  // 缓存锚点元素的位置信息, 滚动时减少计算
  const anchorItem = useRef<CacheItem>({
    index: 0, // 锚点元素的索引值
    top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
    bottom: 0, // 锚点元素的底部距离第一个元素的顶部的偏移量
  })

  // 计算 startIndex 和 endIndex
  const updateBoundaryIndex = useCallback(() => {
    anchorItem.current = {
      index: startIndex.current,
      top: startIndex.current * itemHeight.current,
      bottom: startIndex.current * itemHeight.current + itemHeight.current,
    }

    endIndex.current = Math.min(
      startIndex.current + visibleCount.current,
      list.length,
    )
  }, [list.length])

  const updateVisibleData = useCallback(() => {
    const visibleData = list.slice(
      Math.max(0, startIndex.current - bufferSize),
      Math.min(list.length, endIndex.current + bufferSize),
    )

    setStartOffset(
      Math.max(0, startIndex.current - bufferSize) * itemHeight.current,
    )
    setEndOffset((list.length - endIndex.current) * itemHeight.current)
    setVisibleData(visibleData)
  }, [bufferSize, list])

  // 滚动事件处理函数
  const handleScroll = useCallback(() => {
    const nowscrollTop = container.current!.scrollTop
    // 向下滚动
    if (nowscrollTop - scrollTop.current > 0) {
      if (nowscrollTop > anchorItem.current.bottom) {
        startIndex.current = Math.floor(nowscrollTop / itemHeight.current)
        updateBoundaryIndex()
        updateVisibleData()
      }
    }
    // 向上滚动
    else if (nowscrollTop - scrollTop.current < 0) {
      if (nowscrollTop < anchorItem.current.top) {
        startIndex.current = Math.floor(nowscrollTop / itemHeight.current)
        updateBoundaryIndex()
        updateVisibleData()
      }
    }

    scrollTop.current = nowscrollTop
  }, [updateBoundaryIndex, updateVisibleData])

  const setItemHeight = useCallback((h: number) => {
    if (!container.current) return
    const containerEle = container.current
    itemHeight.current = h
    visibleCount.current = Math.ceil(
      containerEle.clientHeight / itemHeight.current,
    )
  }, [])

  useEffect(() => {
    if (!container.current) return
    const containerEle = container.current
    visibleCount.current = Math.ceil(
      containerEle.clientHeight / itemHeight.current,
    )
    endIndex.current = startIndex.current + visibleCount.current

    updateVisibleData()
    containerEle.addEventListener("scroll", handleScroll, false)
    return () => {
      containerEle &&
        containerEle.removeEventListener("scroll", handleScroll, false)
    }
  }, [handleScroll, updateVisibleData])

  return (
    <div
      className="wrapper overflow-scroll"
      style={{ height: "100vh" }}
      ref={container}
    >
      <div
        style={{
          paddingTop: `${startOffset}px`,
          paddingBottom: `${endOffset}px`,
        }}
      >
        <div />
        {visibleData.map((_, index) => {
          return (
            <ListItem
              key={startIndex.current + index}
              item={_}
              itemH={itemHeight.current}
              index={index}
              renderItem={renderItem}
              setItemHeight={setItemHeight}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VirtualizedList
