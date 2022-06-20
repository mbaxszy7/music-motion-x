/* eslint-disable react/prop-types */
import fetcher from "@/fetcher"
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"
import cx from "classnames"
import { RootState, rootSlice } from "@/store"
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import Dialog from "@/components/Dialog"

import type Song from "@/interfaces/song"
import css from "./PlayBar.module.css"

import PlayFixedBar from "./PlayFixedBar"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import InnerModal, { ModalMask } from "../InnerModal"
import { SongList } from "../MediaItemList"
import { useLocation } from "react-router-dom"

const PlayModal = lazy(() => import("./PlayModal"))

export type PlayState =
  | "loading"
  | "stopped"
  | "paused"
  | "loaded"
  | "playing"
  | ""

const PlayBar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playState, setPlayState] = useState<PlayState>("")
  const [isShowDialog, setShowDialog] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)

  const [audioCurTime, setAudioCurTime] = useState(0)
  const dispatch = useDispatch()
  const location = useLocation()

  const isShowPlayModal = useSelector<RootState>(
    (state) => state.root.isShowPlayModal,
  )
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

  useIsomorphicEffect(() => {
    if (audioRef.current && src?.url) {
      audioRef.current.src = src.url?.replace?.(/https?/, "https")
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        setShowDialog(true)
      })
    } else if (src && !src?.url && currentPlayId) {
      setShowDialog(true)
    }
  }, [src])

  useIsomorphicEffect(() => {
    dispatch(rootSlice.actions.setShowPlayModal(false))
  }, [location.pathname])

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

  if (!showPlayBar) return <></>
  return (
    <>
      {isShowDialog && (
        <Dialog
          title="播放出错，请重试"
          onCancelClick={() => setShowDialog(false)}
          onConfirmClick={() => {
            dispatch(rootSlice.actions.playSong({} as Song))
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
          <PlayFixedBar
            playState={playState}
            handlePlayIconClick={handlePlayIconClick}
            hasSong={!!songDetail}
            audioCurTime={audioCurTime}
          />
        ) : (
          <Suspense>
            <PlayModal
              playState={playState}
              songDetail={songDetail}
              audioRef={audioRef}
              audioCurTime={audioCurTime}
              handlePlayIconClick={handlePlayIconClick}
              onModalOpen={onModalOpen}
              onNextOrPrePlay={onNextOrPrePlay}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default PlayBar
