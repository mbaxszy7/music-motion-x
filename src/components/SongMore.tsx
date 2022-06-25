import InnerModal, { ModalMask } from "@/components/InnerModal"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import { MouseEventHandler, useCallback, memo, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import type Song from "@/interfaces/song"
import nextSong from "@/assets/nextSong.png"
import attention from "@/assets/attention.png"
import artist from "@/assets/artist.png"
import album from "@/assets/album.png"
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"
import { useDispatch } from "react-redux"
import { rootSlice } from "@/store"

const SongMore = memo(
  ({
    albumName,
    artistName,
    artistId,
    songName,
    albumId,
    songId,
    imgUrl,
  }: {
    artistName: string
    albumName: string
    artistId: number
    albumId: number
    songName: string
    songId: number
    imgUrl: string
  }) => {
    const dispatch = useDispatch()
    const ele = useRef<HTMLDivElement | null>(null)
    const [fetch, setFetch] = useState(false)
    const {
      isShowModal,
      isShowContent,
      onModalOpen: onMoreClick,
      onModalClose: onClose,
    } = useEffectShowModal()

    const nav = useNavigate()
    const handleMoreClick: MouseEventHandler = useCallback(
      (e) => {
        e.stopPropagation()
        onMoreClick()
      },
      [onMoreClick],
    )
    const handleModalClose: MouseEventHandler = useCallback(
      (e) => {
        e.stopPropagation()
        onClose()
      },
      [onClose],
    )

    const { data } = useQuery(
      fetch ? `/api/check/music?id=${songId}` : "",
      () =>
        fetch
          ? fetcher
              .get<{ success: boolean }>(`/api/check/music?id=${songId}`)
              .then((res) => res.data)
          : null,
      {
        refetchOnWindowFocus: false,
        suspense: false,
      },
    )

    useIsomorphicEffect(() => {
      let observer: IntersectionObserver
      ;(async () => {
        if (!window.IntersectionObserver) {
          await import("intersection-observer")
        }

        // if (ele.current) {
        observer = new IntersectionObserver(
          (entries, originalObserver) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio > 0 || entry.isIntersecting) {
                setFetch(true)
                originalObserver.unobserve(entry.target)
              }
            })
          },
          {
            // ...options,
            rootMargin: "0px",
            threshold: 0,
          },
        )

        observer.observe(ele.current!)
        // }
      })()
      return () => {
        ele.current && observer && observer.unobserve(ele.current)
      }
    }, [])

    const isValid = data?.success

    // console.log("isValid", isValid)

    return (
      <>
        <div
          className=" flex ml-auto relative after:absolute after:w-[40px] after:h-[30px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
          onClick={handleMoreClick}
          ref={ele}
          data-testid="song-more"
        >
          <span className=" w-1 h-1 rounded-[50%] bg-dg" />
          <span className=" w-1 h-1 rounded-[50%] bg-dg mx-1" />
          <span className=" w-1 h-1 rounded-[50%] bg-dg " />
        </div>
        {isShowModal && (
          <InnerModal isDynamic={false}>
            <ModalMask onClick={handleModalClose}>
              <div
                className=" bg-mg absolute bottom-0 pt-6 px-4 pb-36 transition-transform duration-200 w-full"
                style={{
                  borderRadius: "12px 12px 0 0",
                  transform: isShowContent
                    ? "translate3d(0, 0,0)"
                    : "translate3d(0, 100%,0)",
                }}
              >
                <div className="song_name text-fg text-base single_line">
                  {songName}
                </div>
                <ul className="contents min-h-[200px] max-h-[55vh] overflow-y-auto">
                  <li
                    className="next_song text-fg pl-11 mr-0 mb-0 ml-1 text-sm h-[30px] leading-[30px] mt-10"
                    onClick={() => {
                      if (isValid) {
                        dispatch(
                          rootSlice.actions.playAtNext({
                            title: songName,
                            artistName,
                            albumName,
                            id: songId,
                            artistId,
                            albumId,
                            imgUrl,
                          } as Song),
                        )
                      }
                    }}
                    style={{
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "23px 23px",
                      backgroundImage: isValid
                        ? `url(${nextSong})`
                        : `url(${attention})`,
                    }}
                  >
                    {isValid ? "下一首播放" : "暂无版权"}
                  </li>

                  <li
                    className="artist text-fg pl-11 mt-7 mr-0 mb-0 ml-1 text-sm h-[30px] leading-[30px] single_line"
                    style={{
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "23px 23px",
                      backgroundImage: `url(${artist})`,
                    }}
                    onClick={(e) => {
                      dispatch(rootSlice.actions.setShowPlayModal(false))
                      handleModalClose(e)
                      setTimeout(() => {
                        nav(`/artist/${artistId}`)
                      }, 400)
                    }}
                  >
                    {`歌手 ${artistName}`}
                  </li>

                  <li
                    className="album text-fg pl-11 mt-7 mr-0 mb-0 ml-1 text-sm h-[30px] leading-[30px] single_line"
                    style={{
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "23px 23px",
                      backgroundImage: `url(${album})`,
                    }}
                    onClick={(e) => {
                      dispatch(rootSlice.actions.setShowPlayModal(false))
                      handleModalClose(e)
                      setTimeout(() => {
                        nav(`/album/${albumId}`)
                      }, 400)
                    }}
                  >
                    {`专辑 ${albumName}`}
                  </li>
                </ul>
                <div
                  className="close absolute bottom-10 text-fg text-center text-3xl w-full left-0"
                  data-close="true"
                  onClick={handleModalClose}
                >
                  &times;
                </div>
              </div>
            </ModalMask>
          </InnerModal>
        )}
      </>
    )
  },
)
SongMore.displayName = "SongMore"
export default SongMore
