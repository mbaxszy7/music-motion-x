// @ts-nocheck

import React, {
  memo,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react"

import { useSpring } from "react-spring"

export const Tabs = memo(function Tabs({
  onChange,
  defaultActiveKey,
  activeTabKey,
  children,
  className,
}: any) {
  const tabKeys = useRef([])
  const tabsContainerRef = useRef()

  const [, setY] = useSpring(() => ({ y: 0 }))

  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const tabContents = useRef([])
  const activeContent = useRef(null)

  const centerTab = useCallback(
    (tab: any) => {
      const activeTabIndex = tabKeys.current.findIndex((key) => key === tab)
      const tabElements = document.getElementsByClassName("my_tab_pane")

      const tabArr = [].slice.call(tabElements, 0)

      tabsContainerRef.current.scrollLeft = 0
      const offset = tabArr[0].getBoundingClientRect().x
      const activeTabRect = tabArr[activeTabIndex].getBoundingClientRect()

      const scroll =
        activeTabRect.x +
        activeTabRect.width / 2 -
        tabsContainerRef.current.offsetWidth / 2 -
        offset

      setY({
        x: scroll,
        from: { x: tabsContainerRef.current.scrollLeft },
        onFrame: ({ x }) => {
          tabsContainerRef.current.scrollLeft = x
        },
      })
    },
    [setY],
  )

  const onTabClick = useCallback(
    (clickedTabKey) => {
      setActiveTab(clickedTabKey)
      centerTab(clickedTabKey)
      onChange && onChange(clickedTabKey)
    },
    [centerTab, onChange],
  )

  useEffect(() => {
    setActiveTab(activeTabKey)
    centerTab(activeTabKey)
    onChange && onChange(activeTabKey)
  }, [activeTabKey, centerTab, onChange])

  const tabPanes = useMemo(() => {
    tabKeys.current = []
    return React.Children.map(children, (child) => {
      let isActive = false

      tabKeys.current.push(child.props.tabKey)

      if (child.props.tabKey === activeTab) {
        isActive = true
        const cachedContent = tabContents.current[child.props.tabKey]
        if (child.props.forceRender) {
          activeContent.current = child.props.children
        } else if (!cachedContent && !child.props.forceRender) {
          tabContents.current[child.props.tabKey] = child.props.children
          activeContent.current = child.props.children
        } else if (cachedContent && !child.props.forceRender) {
          activeContent.current = cachedContent
        }
      }
      return React.cloneElement(child, {
        onTabClick,
        isActive,
      })
    })
  }, [activeTab, children, onTabClick])
  return (
    <>
      <ul className={className} ref={tabsContainerRef}>
        {tabPanes}
      </ul>
      {activeContent.current}
    </>
  )
})

// @ts-nocheck
export const TabPane = memo(function TabPane({
  tab,
  className,
  onTabClick,
  tabKey,
}: any) {
  const onClick = useCallback(
    // eslint-disable-next-line no-useless-call
    (e) => onTabClick.call(null, tabKey, e),
    [onTabClick, tabKey],
  )
  return (
    <li className={`my_tab_pane ${className}`} onClick={onClick}>
      {tab}
    </li>
  )
})
