/* eslint-disable react/prop-types */
import { MyImage } from "../Image"
import downIcon from "@/assets/down.png"
import formatAudioTime from "@/utils/formatAudioTime"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { rootSlice } from "@/store"
import {
  CSSProperties,
  FC,
  memo,
  MouseEventHandler,
  MutableRefObject,
  TouchEventHandler,
  useCallback,
  useRef,
} from "react"

import playIcon from "@/assets/play.png"
import pauseIcon from "@/assets/pause.png"
import preIcon from "@/assets/pre.png"
import nextIcon from "@/assets/next.png"
import listIcon from "@/assets/list.png"

import type { PlayState } from "./PlayBar"
import type Song from "@/interfaces/song"

const IconImg: FC<{
  large?: boolean
  small?: boolean
  src: string
  onClick: MouseEventHandler
  style?: CSSProperties
}> = ({ large, small, src, onClick, style }) => {
  return (
    <img
      onClick={onClick}
      src={src}
      style={{
        width: large ? 47 : small ? 20 : 32,
        height: large ? 47 : small ? 20 : 32,
        ...(style ?? {}),
      }}
    />
  )
}

const PlayPageBottomPart: FC<{
  playState: PlayState
  handlePlayIconClick: () => void
  onModalOpen: () => void
  onNextOrPrePlay: (b: boolean, mode: "prev" | "next") => void
}> = memo(
  ({ playState, handlePlayIconClick, onModalOpen, onNextOrPrePlay }) => {
    const onPrePlay = useCallback(() => {
      onNextOrPrePlay(true, "prev")
    }, [onNextOrPrePlay])
    const nextSong = useCallback(() => {
      onNextOrPrePlay(true, "next")
    }, [onNextOrPrePlay])
    return (
      <div className=" absolute py-0 px-2 bottom-10 left-0 my-4 w-full ">
        <div className=" w-full h-full flex justify-between items-center px-16 relative">
          <IconImg src={preIcon} onClick={onPrePlay} />
          <IconImg
            src={
              playState === "playing" || playState === "loaded"
                ? pauseIcon
                : playIcon
            }
            large
            onClick={handlePlayIconClick}
          />
          <IconImg src={nextIcon} onClick={nextSong} />
          <IconImg
            src={listIcon}
            onClick={onModalOpen}
            small
            style={{ right: 20, position: "absolute" }}
          />
        </div>
      </div>
    )
  },
)

PlayPageBottomPart.displayName = "PlayPageBottomPart"

const PlayModal: FC<{
  playState: PlayState
  songDetail?: Song | null
  audioRef: MutableRefObject<HTMLAudioElement | null>
  audioCurTime: number
  handlePlayIconClick: () => void
  onModalOpen: () => void
  onNextOrPrePlay: (_b: boolean, mode: "prev" | "next") => void
}> = ({
  songDetail,
  audioRef,
  audioCurTime,
  playState,
  handlePlayIconClick,
  onModalOpen,
  onNextOrPrePlay,
}) => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const isProgressBarActived = useRef(false)
  const getProgress = useCallback(() => {
    if (Number.isNaN(audioRef.current!.duration)) {
      return 0
    }
    return audioRef.current!.currentTime / audioRef.current!.duration
  }, [audioRef])

  const audioSeek = useCallback(
    (per: number) => {
      audioRef.current!.currentTime = audioRef.current!.duration * per
      if (!isProgressBarActived.current) {
        audioRef.current!.play()
      }
    },
    [audioRef],
  )

  const onProgressBarClick: MouseEventHandler = useCallback(
    (e) => {
      const { left, width } = e.currentTarget.getBoundingClientRect()
      const clickedX = e.clientX
      if (clickedX > left && clickedX < width + left) {
        const offset = clickedX - left
        audioSeek(offset / width)
      }
    },
    [audioSeek],
  )
  const onProgressBarTouchMoving = useCallback(
    (touchPointX: number) => {
      const { left, width } = progressBarRef.current!.getBoundingClientRect()
      const offset = touchPointX - left
      if (offset >= width) {
        audioSeek(0.99)
      } else if (!Number.isNaN(offset)) {
        audioSeek(offset / width)
      }
    },
    [audioSeek],
  )

  const onMouseDown = useCallback(() => {
    isProgressBarActived.current = true
    audioRef.current!.pause()
  }, [audioRef])

  const onTouchStart = useCallback(() => {
    audioRef.current!.pause()
    isProgressBarActived.current = true
  }, [audioRef])

  const onTouchEnd: TouchEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      const touchPointX = e.changedTouches[0].pageX
      isProgressBarActived.current = false
      onProgressBarTouchMoving(touchPointX)
    },
    [onProgressBarTouchMoving],
  )

  const onTouchMove: TouchEventHandler = useCallback(
    (e) => {
      const touchPointX = e.changedTouches[0].pageX
      onProgressBarTouchMoving(touchPointX)
    },
    [onProgressBarTouchMoving],
  )

  const onProgressBarMouseEnd: MouseEventHandler = useCallback(
    (e) => {
      if (!isProgressBarActived.current) {
        return false
      }

      isProgressBarActived.current = false

      const clickedPointX = e.clientX
      onProgressBarTouchMoving(clickedPointX)
    },
    [onProgressBarTouchMoving],
  )

  const onProgressBarMouseMove: MouseEventHandler = useCallback(
    (e) => {
      if (!isProgressBarActived.current) {
        return false
      }

      const clickedPointX = e.clientX
      onProgressBarTouchMoving(clickedPointX)
    },
    [onProgressBarTouchMoving],
  )

  return (
    <>
      <img
        src={downIcon}
        alt=""
        className=" w-8 h-8 opacity-60 block "
        onClick={(e) => {
          e.stopPropagation()
          dispatch(rootSlice.actions.setShowPlayModal(false))
        }}
      />
      <div className="relative w-[65%] pb-[65%] rounded-md overflow-hidden mx-auto mt-[20%]">
        <MyImage
          url={songDetail?.imgUrl ?? ""}
          className="absolute w-full h-full"
        />
      </div>
      <div className=" px-6">
        <div className=" text-fg font-medium text-2xl mt-8">
          {songDetail?.title}
        </div>

        <div
          className=" text-dg font-medium text-base mt-3"
          onClick={() => {
            dispatch(rootSlice.actions.setShowPlayModal(false))
            setTimeout(() => {
              nav(`/artist/${songDetail?.artistId}`)
            }, 400)
          }}
        >
          {songDetail?.artistName}
        </div>
      </div>
      <div className=" absolute left-1/2 -translate-x-1/2 bottom-40 w-[85%] h-1">
        <div
          style={{
            backgroundImage: `linear-gradient(
        90deg, rgb(254, 221, 39) 0, rgb(254, 221, 39) ${
          getProgress() * 100
        }%, rgb(245,245,245) ${getProgress() * 100}%
      )`,
          }}
          className="h-1 relative w-full rounded-[200px] text-fg"
          onClick={onProgressBarClick}
          onMouseUp={onProgressBarMouseEnd}
          onMouseLeave={onProgressBarMouseEnd}
          onMouseMove={onProgressBarMouseMove}
          ref={progressBarRef}
        >
          <div
            className=" absolute w-2 h-2 rounded-[50%] bg-secondary will-change-auto top-1/2 -translate-y-1/2 after:absolute after:-top-[10px] after:-left-[10px] after:w-7 after:h-7"
            style={{
              left: `${getProgress() * 100}%`,
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
          />
        </div>
        <div className=" absolute text-dg opacity-80 text-sm top-3 left-0">
          {formatAudioTime(audioCurTime)}
        </div>
        <div className=" absolute text-dg opacity-80 text-sm top-3 right-0">
          {formatAudioTime(audioRef.current!.duration ?? 0)}
        </div>
      </div>

      <PlayPageBottomPart
        playState={playState}
        handlePlayIconClick={handlePlayIconClick}
        onModalOpen={onModalOpen}
        onNextOrPrePlay={onNextOrPrePlay}
      />
    </>
  )
}

export default PlayModal
