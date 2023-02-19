import { useParams } from "react-router-dom"
import PageBack from "@/components/AppBack"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import cx from "classnames"
import type { PlaylistDetails } from "@/interfaces/playlist"
import type Song from "@/interfaces/song"
import { MyImage } from "@/components/Image"
import { FC, useCallback, useRef } from "react"
import Label from "@/components/Label"
import PlaySongsBar from "@/components/PlaySongsBar/PlaySongsBar"
import { SongList } from "@/components/MediaItemList"
import useRootScrollTop from "@/hooks/useScrollTop"
import useEleScrollValue from "@/hooks/useEleScrollValue"
import clamp from "@/utils/clamp"
import InnerModal from "@/components/InnerModal"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import { useDispatch } from "react-redux"
import { rootSlice } from "@/store"
import { Helmet } from "react-helmet-async"

const PlaylistBrief: FC<Omit<PlaylistDetails, "coverImgUrl" | "trackIds">> = ({
  name,
  description,
  subscribedCount,
  playCount,
  tags,
}) => {
  const { isShowModal, isShowContent, onModalOpen, onModalClose } =
    useEffectShowModal()

  return (
    <div>
      {isShowModal && (
        <InnerModal isDynamic={false}>
          <div
            className={cx(
              " fixed left-0 top-0 p-9 text-base bg-mg text-fg pb-16 transition-opacity duration-300 z-[10000] w-full h-full",
              {
                " opacity-100": isShowContent,
                " opacity-0": !isShowContent,
              },
            )}
          >
            <div className=" inline-block w-1/2 text-fg">
              <div className="count text-center text-2xl font-bold">
                {playCount}
              </div>
              <div className="text-center text-sm mt-2">播放</div>
            </div>

            <div className=" inline-block w-1/2 text-fg">
              <div className="count text-center text-2xl font-bold">
                {subscribedCount}
              </div>
              <div className="text-center text-sm mt-2">订阅</div>
            </div>

            <div className=" min-h-[20px] max-h-[80%] overflow-y-auto mt-4 text-base leading-normal text-dg ">
              {description}
            </div>

            <div
              onClick={onModalClose}
              data-close="true"
              className=" absolute bottom-10 text-fg text-center text-4xl w-full left-0"
            >
              &times;
            </div>
          </div>
        </InnerModal>
      )}
      <div className=" leading-snug font-bold text-fg text-xl two_lines">
        {name}
      </div>
      <div
        className=" single_line text-sm leading-snug text-dg mt-5"
        onClick={onModalOpen}
      >
        {description}
      </div>

      <div className=" mt-5 flex flex-wrap">
        {tags.map((tag) => (
          <Label
            text={tag}
            key={tag}
            style={{
              position: "relative",
              top: "initial",
              bottom: "initial",
              left: "initial",
              right: "initial",
              marginTop: 10,
              marginRight: 8,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const PlaylistDetailLazy = () => {
  const { playlistid } = useParams()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const { data: playlistDetails } = useQuery(
    `/api/playlist/detail?id=${playlistid}`,
    () =>
      fetcher
        .get<{ playlist: any }>(`/api/playlist/detail?id=${playlistid}`)
        .then((res) => {
          const { playlist } = res.data
          const {
            coverImgUrl,
            tags,
            subscribedCount,
            playCount,
            name,
            description,
            trackIds,
          } = playlist
          return {
            coverImgUrl,
            tags,
            subscribedCount,
            playCount,
            name,
            description: description ?? "",
            trackIds: trackIds.map((track: any) => track.id),
          } as PlaylistDetails
        }),
  )

  const { data: playlistSongs } = useQuery(
    playlistDetails?.trackIds
      ? `/api/song/detail?ids=${playlistDetails.trackIds.slice(0, 100).join()}`
      : "",
    () =>
      playlistDetails
        ? fetcher
            .get<{ songs: any[] }>(
              `/api/song/detail?ids=${playlistDetails.trackIds
                .slice(0, 100)
                .join()}`,
            )
            .then((res) => {
              const { songs } = res.data
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
              }) as Song[]
            })
        : null,
  )
  const scrollValueFormatter = useCallback((scrollValue: number) => {
    const op = clamp(scrollValue, 0, 1)
    return op === 0 ? 2 : Number(op.toFixed(2))
  }, [])
  const callScrollContainerRef = useCallback(
    () => scrollContainerRef.current!,
    [],
  )
  const headerOpacity = useEleScrollValue(
    callScrollContainerRef,
    scrollValueFormatter,
  )
  const dispatch = useDispatch()
  useRootScrollTop()

  return (
    <>
      {playlistDetails?.name && (
        <Helmet>
          <title>Music-Motion | {playlistDetails?.name}</title>
        </Helmet>
      )}
      <div className=" pt-8 px-4 pb-10">
        <div
          className=" fixed pt-6 px-4 pb-4 top-0 left-0 w-full z-[501] bg-mg"
          style={{ opacity: headerOpacity }}
        >
          <PageBack
            isBlack={false}
            title={playlistDetails?.name ?? ""}
            style={{ padding: 0 }}
          />
        </div>
        <div className=" mt-12 sticky z-0 top-4 flex justify-center">
          <MyImage
            url={playlistDetails?.coverImgUrl || ""}
            className=" w-[180px] h-[180px] rounded"
          />
        </div>

        <div
          className=" sticky py-8 bg-mg z-[5] overflow-hidden"
          ref={scrollContainerRef}
        >
          <PlaylistBrief
            name={playlistDetails?.name ?? ""}
            description={playlistDetails?.description ?? ""}
            subscribedCount={playlistDetails?.subscribedCount ?? ""}
            playCount={playlistDetails?.playCount ?? 0}
            tags={playlistDetails?.tags ?? []}
          />

          <div className=" mt-8">
            <PlaySongsBar
              songsCount={playlistSongs?.length ?? 0}
              withoutBar={false}
              onPlayIconClick={() => {
                dispatch(rootSlice.actions.playSongs(playlistSongs ?? []))
              }}
            />
            <div className=" mt-6 pl-1">
              <SongList
                list={playlistSongs ?? undefined}
                placeHolderCount={8}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaylistDetailLazy
