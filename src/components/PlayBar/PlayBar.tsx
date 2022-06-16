/* eslint-disable react/prop-types */
import fetcher from "@/fetcher"
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"
import cx from "classnames"
import { RootState, rootSlice } from "@/store"
import {
  CSSProperties,
  FC,
  memo,
  MouseEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import Dialog from "@/components/Dialog"
import formatAudioTime from "@/utils/formatAudioTime"
import downIcon from "@/assets/down.png"
import { SpinnerLoading } from "@/components/Spinner"
import type Song from "@/interfaces/song"
import css from "./PlayBar.module.css"
import { MyImage } from "../Image"
import { useNavigate } from "react-router-dom"

import playIcon from "@/assets/play.png"
import pauseIcon from "@/assets/pause.png"
import preIcon from "@/assets/pre.png"
import nextIcon from "@/assets/next.png"
import listIcon from "@/assets/list.png"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import InnerModal, { ModalMask } from "../InnerModal"
import { SongList } from "../MediaItemList"

type PlayState = "loading" | "stopped" | "paused" | "loaded" | "playing" | ""

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
    // const playMode = useSelector<RootState>(state => state.root.playMode)

    const onPrePlay = useCallback(() => {
      onNextOrPrePlay(true, "prev")
    }, [onNextOrPrePlay])
    const nextSong = useCallback(() => {
      onNextOrPrePlay(true, "next")
    }, [onNextOrPrePlay])
    return (
      <div
        className=" absolute py-0 px-2 bottom-10 left-0 my-4 w-full "
        // style={{ width: "calc(100% - 30px)" }}
      >
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
            style={{ position: "absolute", right: 20 }}
          />
        </div>
      </div>
    )
  },
)

PlayPageBottomPart.displayName = "PlayPageBottomPart"

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

const PlayBar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playState, setPlayState] = useState<PlayState>("")
  const [isShowDialog, setShowDialog] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const isProgressBarActived = useRef(false)
  // const [isShowPlayModal, setShowPlayModal] = useState(false)
  const [audioCurTime, setAudioCurTime] = useState(0)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const isShowPlayModal = useSelector<RootState>(
    (state) => state.root.isShowPlayModal,
  )
  console.log("isShowPlayModal", isShowPlayModal)
  const currentPlayId = useSelector<RootState>(
    (state) => state.root.currentPlaySong.id,
  )
  const currentPlayList = useSelector<RootState>(
    (state) => state.root.currentPlaySongList,
  )
  const showPlayBar = useSelector<RootState>((state) => state.root.showPlayBar)

  const { data: src, isLoading: audioLoading } = useQuery(
    currentPlayId ? `/api/song/url?id=${currentPlayId}` : "",
    () =>
      currentPlayId
        ? fetcher
            .get(`/api/song/url?id=${currentPlayId}`)
            .then((res) => res.data.data[0])
        : null,
    { suspense: false, refetchOnWindowFocus: false },
  )
  const { data: songDetail } = useQuery(
    currentPlayId ? `/api/song/detail?ids=${currentPlayId}` : "",
    () =>
      currentPlayId
        ? fetcher
            .get<{ songs: any[] }>(`/api/song/detail?ids=${currentPlayId}`)
            .then((res) => res.data.songs)
            .then((songs) => {
              return songs.map((song) => {
                const names = song.ar.length
                  ? [...song.ar]
                      .reverse()
                      .reduce((ac, a) => `${a.name} ${ac}`, "")
                  : ""
                return {
                  imgUrl: song.al.picUrl
                    ? song.al.picUrl.replace(/https?/, "https")
                    : "",
                  title: `${song.name}`,
                  desc: names,
                  artistId: song.ar[0].id,
                  albumId: song.al.id,
                  artistName: names,
                  albumName: song.al.name,
                  type: "song",
                  id: song.id,
                }
              })[0] as Song
            })
        : null,
    { suspense: false, refetchOnWindowFocus: false },
  )

  useIsomorphicEffect(() => {
    if (audioRef.current && src?.url) {
      audioRef.current.src = src.url?.replace?.(/https?/, "https")
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else if (src && !src?.url && currentPlayId) {
      setShowDialog(true)
    }
  }, [src])

  const onAudioTimeUpdate = useCallback(() => {
    if (audioRef.current)
      setAudioCurTime(audioRef.current.duration - audioRef.current.currentTime)
  }, [])

  const onAudioLoadedData = useCallback(() => {
    setAudioCurTime(audioRef.current!.duration)
    setPlayState("loaded")
  }, [])

  const onAudioPlay = useCallback(() => {
    setPlayState("playing")
  }, [])

  const onAudioPause = useCallback(() => {
    setPlayState("paused")
  }, [])

  const handlePlayIconClick = useCallback(() => {
    if (playState === "paused" || playState === "stopped") {
      audioRef.current!.play()
    } else if (playState === "playing" || playState === "loaded") {
      audioRef.current!.pause()
    }
  }, [playState])

  const onNextOrPrePlay = useCallback(
    (_b: boolean, mode: "prev" | "next") => {
      if (mode === "prev") {
        dispatch(rootSlice.actions.playPrev())
      } else if (mode === "next") {
        dispatch(rootSlice.actions.playNext())
      }
    },
    [dispatch],
  )

  const onAudioEnd = useCallback(() => {
    setPlayState("stopped")
    onNextOrPrePlay(false, "next")
  }, [onNextOrPrePlay])

  // const setPlayBar = (show: boolean) => {
  //   dispatch(rootSlice.actions.setShowPlayBar(show))
  // }

  const getProgress = useCallback(() => {
    if (Number.isNaN(audioRef.current!.duration)) {
      return 0
    }
    return audioRef.current!.currentTime / audioRef.current!.duration
  }, [])

  const audioSeek = useCallback((per: number) => {
    audioRef.current!.currentTime = audioRef.current!.duration * per
    if (!isProgressBarActived.current) {
      audioRef.current!.play()
    }
  }, [])

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

  const onMouseDown = useCallback(() => {
    isProgressBarActived.current = true
    audioRef.current!.pause()
  }, [])

  const onTouchStart = useCallback(() => {
    audioRef.current!.pause()
    isProgressBarActived.current = true
  }, [])

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

  const { isShowModal, isShowContent, onModalOpen, onModalClose } =
    useEffectShowModal()

  useIsomorphicEffect(() => {
    console.log("barRef.current", barRef.current)
    if (barRef.current && isShowPlayModal) {
      barRef.current.style.height = window.innerHeight + "px"
    } else if (barRef.current && !isShowPlayModal) {
      barRef.current.style.height = 40 + "px"
      onModalClose()
    }
  }, [isShowPlayModal])

  useIsomorphicEffect(() => {
    if (audioLoading && currentPlayId) setPlayState("loading")
  }, [audioLoading])

  useEffect(() => {
    if ("mediaSession" in navigator && songDetail) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songDetail.title ?? "",
        artist: songDetail.artistName ?? "",
        album: songDetail.albumName ?? "",
        artwork: [{ src: songDetail.imgUrl ?? "" }],
      })
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        onNextOrPrePlay(true, "prev")
      })
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        onNextOrPrePlay(true, "next")
      })
    }
  }, [onNextOrPrePlay, songDetail])
  // console.log("songDetail", songDetail)

  if (!showPlayBar) return <></>
  return (
    <>
      {isShowDialog && (
        <Dialog
          title="播放出错"
          onCancelClick={() => setShowDialog(false)}
          onConfirmClick={() => {
            setShowDialog(false)
          }}
        />
      )}
      {isShowModal && (
        <InnerModal isDynamic={false}>
          <ModalMask onClick={onModalClose}>
            <div
              className={css.songlist}
              style={{
                transform: isShowContent
                  ? "translate3d(0, 0,0)"
                  : "translate3d(0, 100%,0)",
              }}
            >
              <div className={css.contents}>
                <SongList
                  list={(currentPlayList as Song[]) ?? undefined}
                  placeHolderCount={8}
                  lazyAll
                  indexedPic
                  more={false}
                />
              </div>
              <div className={css.close} data-close="true">
                &times;
              </div>
            </div>
          </ModalMask>
        </InnerModal>
      )}
      <audio
        src={src?.url ?? ""}
        ref={audioRef}
        preload="metadata"
        onLoadedData={onAudioLoadedData}
        onTimeUpdate={onAudioTimeUpdate}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        onEnded={onAudioEnd}
        onError={(e) => {
          console.log(
            e.currentTarget?.error?.code,
            e.currentTarget?.error?.message,
          )
        }}
      />
      <div
        className={cx(
          "fixed bg-black transition-all overflow-hidden duration-300",
          {
            "z-[9999] bottom-0 left-0 rounded-none h-screen w-screen bg-mg will-change-auto p-5":
              isShowPlayModal,
            "left-4 bottom-5 z-[1000] w-32 h-10 rounded-[500px]":
              !isShowPlayModal,
          },
        )}
        ref={barRef}
      >
        {!isShowPlayModal ? (
          <div className=" flex items-center justify-center">
            <PlayerStateIcon
              playState={playState}
              onClick={handlePlayIconClick}
            />
            <div
              className=" text-dg font-bold text-lg h-full leading-10 ml-3"
              onClick={() => {
                if (songDetail) {
                  dispatch(rootSlice.actions.setShowPlayModal(true))
                }
              }}
            >
              {formatAudioTime(audioCurTime)}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default PlayBar
