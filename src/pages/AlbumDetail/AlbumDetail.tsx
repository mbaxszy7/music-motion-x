import fetcher from "@/fetcher"
import { FC, useCallback, useRef } from "react"
import dayjs from "dayjs"
import { useQuery } from "react-query"
import cx from "classnames"
import { useParams } from "react-router-dom"
import type { AlbumDetails } from "@/interfaces/album"
import PageBack from "@/components/AppBack"
import useRootScrollTop from "@/hooks/useScrollTop"
import useEleScrollValue from "@/hooks/useEleScrollValue"
import clamp from "@/utils/clamp"
import PlaySongsBar from "@/components/PlaySongsBar/PlaySongsBar"
import InnerModal from "@/components/InnerModal"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import { MyImage } from "@/components/Image"
import { ArtistItem, SongList } from "@/components/MediaItemList"
import { rootSlice } from "@/store"
import { useDispatch } from "react-redux"

const AlbumBrief: FC<Partial<AlbumDetails>> = ({
  shareCount,
  likedCount,
  desc,
  publishTime,
  name,
  artist,
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
                {shareCount}
              </div>
              <div className="text-center text-sm mt-2">播放</div>
            </div>

            <div className=" inline-block w-1/2 text-fg">
              <div className="count text-center text-2xl font-bold">
                {likedCount}
              </div>
              <div className="text-center text-sm mt-2">点赞</div>
            </div>

            <div className=" min-h-[20px] max-h-[80%] overflow-y-auto mt-4 text-base leading-normal text-dg ">
              {desc}
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
      <div className=" text-base text-dg font-bold single_line w-full text-left">
        {publishTime}
      </div>
      <div className=" mt-3 text-xl text-fg single_line w-full">{name}</div>

      <div className=" mt-5">
        <ArtistItem
          imgUrl={artist?.imgUrl ?? ""}
          lazyLoading
          artistName={artist?.artistName ?? ""}
          desc={artist?.desc ?? ""}
          id={artist?.id ?? 0}
        />
      </div>
      <div
        className=" min-h-[20px] max-h-[86%] overflow-y-auto mt-5 text-sm leading-snug text-dg single_line "
        onClick={onModalOpen}
      >
        {desc}
      </div>
    </div>
  )
}

const AlbumDetail = () => {
  const { albumid } = useParams()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const { data: albumDetails } = useQuery(`/api/album?id=${albumid}`, () =>
    fetcher
      .get<{ songs: any; album: any }>(`/api/album?id=${albumid}`)
      .then((res) => {
        const { album, songs } = res.data
        const { artist, description, alias, info } = album

        return {
          picUrl: album.picUrl,
          publishTime: dayjs(new Date(album.publishTime), "YYYY-MM-DD").format(
            "YYYY-MM-DD",
          ),
          name: `${album.name}${alias[0] ? `(${alias[0]})` : ""}`,
          artist: {
            imgUrl: album.artist.picUrl,
            artistName: `${artist.name}`,
            desc: artist.alias[0] ? `(${artist.alias[0]})` : "",
            id: artist.id,
          },
          shareCount: info.shareCount,
          likedCount: info.likedCount,
          desc: description ?? "",
          songs: songs.map((song: any) => ({
            title: song.name,
            id: song.id,
            desc: artist.name,
            artistName: artist.name,
            albumName: song.al.name,
            albumId: song.al.id,
            artistId: song.ar[0].id,
            type: "song",
            noImg: true,
          })),
        } as AlbumDetails
      }),
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

  console.log("albumDetails", albumDetails)
  return (
    <div className=" pt-8 px-4 pb-10">
      <div
        className=" fixed pt-6 px-4 pb-4 top-0 left-0 w-full z-[501] bg-mg"
        style={{ opacity: headerOpacity }}
      >
        <PageBack
          isBlack={false}
          title={albumDetails?.name ?? ""}
          style={{ padding: 0 }}
        />
      </div>
      <div className=" mt-12 sticky z-0 top-4 flex justify-center">
        <MyImage
          url={albumDetails?.picUrl || ""}
          className=" w-[180px] h-[180px] rounded"
        />
      </div>
      <div
        className=" sticky py-8 bg-mg z-[5] overflow-hidden"
        ref={scrollContainerRef}
      >
        <AlbumBrief
          publishTime={albumDetails?.publishTime}
          name={albumDetails?.name}
          artist={albumDetails?.artist}
          desc={albumDetails?.desc}
          shareCount={albumDetails?.shareCount}
          likedCount={albumDetails?.likedCount}
        />

        <div className=" mt-8">
          <PlaySongsBar
            songsCount={albumDetails?.songs?.length ?? 0}
            withoutBar={false}
            onPlayIconClick={() => {
              dispatch(rootSlice.actions.playSongs(albumDetails?.songs ?? []))
            }}
          />
          <div className=" mt-6 pl-1">
            <SongList
              list={albumDetails?.songs ?? undefined}
              placeHolderCount={8}
              lazyAll
              indexedPic
              more
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumDetail
