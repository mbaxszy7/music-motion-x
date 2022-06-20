import { FC } from "react"
import { useDispatch } from "react-redux"
import { SpinnerLoading } from "@/components/Spinner"
import css from "./PlayBar.module.css"
import type { PlayState } from "./PlayBar"
import { rootSlice } from "@/store"
import formatAudioTime from "@/utils/formatAudioTime"

const PlayerStateIcon: FC<{ playState: PlayState; onClick: () => void }> = ({
  playState,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      {playState === "loading" && (
        <SpinnerLoading
          color="rgb(254, 221, 39)"
          style={{ width: 16, height: 16 }}
        />
      )}
      {(playState === "playing" || playState === "loaded") && (
        <div className=" relative w-4 h-4 before:absolute  before:top-0 before:left-0 before:block before:w-[6px] before:h-4 before:bg-secondary before:rounded-[2px] after:top-0 after:left-1 after:block after:w-[6px] after:h-4 after:bg-secondary after:rounded-[2px] after:ml-[10px]" />
      )}
      {["stopped", "paused", ""].includes(playState) && (
        <div className={css.play} />
      )}
    </div>
  )
}

const PlayFixedBar: FC<{
  playState: PlayState
  handlePlayIconClick: () => void
  hasSong: boolean
  audioCurTime: number
}> = ({ playState, handlePlayIconClick, hasSong, audioCurTime }) => {
  const dispatch = useDispatch()
  return (
    <div className=" flex items-center justify-center">
      <PlayerStateIcon playState={playState} onClick={handlePlayIconClick} />
      <div
        className=" text-dg font-bold text-lg h-full leading-10 ml-3"
        onClick={() => {
          if (hasSong) {
            dispatch(rootSlice.actions.setShowPlayModal(true))
          }
        }}
      >
        {formatAudioTime(audioCurTime)}
      </div>
    </div>
  )
}

export default PlayFixedBar
