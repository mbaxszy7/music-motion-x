/* eslint-disable react/prop-types */
import React, { useCallback, memo, CSSProperties, FC } from "react"
import pageBackIcon from "@/assets/pageBack.png"
import blackBackIcon from "@/assets/blackBack.png"
// import { RootState } from "@/store"
// import { useSelector } from "react-redux"

const PageBack: FC<{
  title?: string
  style?: CSSProperties
  isBlack: boolean
}> = memo(({ title, style, isBlack }) => {
  // const isShowPageBack = useSelector<RootState>(
  //   (state) => state.root.isShowPageBack,
  // )
  const onPageBack = useCallback(() => {
    window.history.back()
  }, [])

  // if (!isShowPageBack) return <></>

  return (
    <div style={style ?? {}} className="flex bg-mg pt-7 px-4 items-center">
      {isBlack ? (
        <img
          src={blackBackIcon}
          alt=""
          onClick={onPageBack}
          className=" w-4 h-4 mr-5"
        />
      ) : (
        <img
          src={pageBackIcon}
          alt=""
          onClick={onPageBack}
          className=" w-4 h-4 mr-5"
        />
      )}

      {!!title && (
        <p className="single_line text-base font-bold flex-1 text-fg text-center -indent-5 ">
          {title}
        </p>
      )}
    </div>
  )
})

PageBack.displayName = "PageBack"

export default PageBack
