/* eslint-disable react/prop-types */
import React, { FC, memo, useCallback } from "react"
import css from "./PlayBar.module.css"
const PlaySongsBar: FC<{
  songsCount: number
  withoutBar?: boolean
  onPlayIconClick: () => void
}> = memo(({ songsCount, withoutBar, onPlayIconClick }) => {
  const handlePlayIconClick = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof onPlayIconClick === "function" && onPlayIconClick()
  }, [onPlayIconClick])

  return (
    <div className=" flex items-center">
      {!withoutBar && (
        <div
          onClick={handlePlayIconClick}
          className={`bg-secondary w-[70px] h-8 rounded-[200px] play_icon ${css.play_icon}`}
        />
      )}
      <span className=" text-dg text-base font-bold ml-4">{songsCount}</span>
    </div>
  )
})

PlaySongsBar.displayName = "PlaySongsBar"

export default PlaySongsBar
