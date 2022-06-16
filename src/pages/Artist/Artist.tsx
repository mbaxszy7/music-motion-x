import { useParams, Link } from "react-router-dom"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import cx from "classnames"
import type { Artist } from "@/interfaces/artist"
import { NormalMV } from "@/interfaces/mv"
import type Album from "@/interfaces/album"
import type Song from "@/interfaces/song"
import PageBack from "@/components/AppBack"
import dayjs from "dayjs"
import useEleScrollValue from "@/hooks/useEleScrollValue"
import clamp from "@/utils/clamp"
import InnerModal from "@/components/InnerModal"
import useEffectShowModal from "@/hooks/useEffectShowModal"
import { useCallback, useRef } from "react"
import useRootScrollTop from "@/hooks/useScrollTop"
import { MyImage } from "@/components/Image"
import {
  BigAlbumsList,
  MediaItemTitle,
  MVList,
  SongList,
} from "@/components/MediaItemList"

const ArtistDetails = () => {
  const { artistid } = useParams()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const { isShowModal, isShowContent, onModalOpen, onModalClose } =
    useEffectShowModal()
  const { data } = useQuery(`/api/artists?id=${artistid}`, () =>
    fetcher
      .get<{ artist: any; hotSongs: any[] }>(`/api/artists?id=${artistid}`)
      .then((res) => res.data)
      .then((res) => {
        const { artist, hotSongs } = res
        return {
          artist: {
            imgUrl: artist.picUrl,
            title: artist?.alias?.[0] ?? "",
            id: artist.id,
            artistName: artist.name,
            type: "artist",
            desc: artist.briefDesc,
          },
          songs: hotSongs.map((song) => ({
            imgUrl: song.al.picUrl,
            title: song.name,
            desc: song.al.name,
            artistId: song.ar[0].id,
            albumId: song.al.id,
            artistName: song.ar.length
              ? [...song.ar].reverse().reduce((ac, a) => `${a.name} ${ac}`, "")
              : "",
            albumName: song.al.name,
            type: "song",
            id: song.id,
          })),
        } as {
          artist: Artist
          songs: Song[]
        }
      }),
  )

  const { data: albums } = useQuery(
    `/api/artist/album?id=${artistid}&offset=0&limit=4`,
    () =>
      fetcher
        .get<{ hotAlbums: any[] }>(
          `/api/artist/album?id=${artistid}&offset=0&limit=4`,
        )
        .then((res) => res.data)
        .then((res) => {
          const { hotAlbums } = res
          return hotAlbums.map((album: any) => {
            return {
              imgUrl: album.picUrl,
              title: album.name,
              publishTime: album.publishTime
                ? dayjs(new Date(album.publishTime), "YYYY-MM-DD").format(
                    "YYYY-MM-DD",
                  )
                : null,
              type: "bigAlbum",
              albumId: album.id,
              id: album.id,
            }
          }) as Album[]
        }),
  )

  const { data: mvs } = useQuery(
    `/api/artist/mv?id=${artistid}&offset=0&limit=4`,
    () =>
      fetcher
        .get<{ mvs: any[] }>(`/api/artist/mv?id=${artistid}&offset=0&limit=4`)
        .then((res) => res.data)
        .then((res) => {
          const { mvs } = res
          return mvs.map((mv) => ({
            imgUrl: mv.imgurl,
            title: mv.name,
            id: mv.id,
            desc: mv.description,
            type: "mv",
          })) as NormalMV[]
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

  useRootScrollTop()
  console.log(mvs)
  return (
    <div className=" pt-8 px-4 pb-10">
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
            <div className=" min-h-[20px] max-h-[80%] overflow-y-auto mt-4 text-base leading-normal text-dg ">
              {data?.artist?.desc}
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
      <div
        className=" fixed pt-6 px-4 pb-4 top-0 left-0 w-full z-[501] bg-mg"
        style={{ opacity: headerOpacity }}
      >
        <PageBack
          isBlack={false}
          title={data?.artist?.artistName ?? ""}
          style={{ padding: 0 }}
        />
      </div>
      <div className=" mt-16 sticky z-0 top-4 flex justify-center">
        <MyImage
          url={data?.artist?.imgUrl || ""}
          className=" w-[134px] h-[134px] rounded-[50%]"
        />
      </div>
      <div
        className=" sticky py-8 bg-mg z-[5] overflow-hidden"
        ref={scrollContainerRef}
      >
        <div className=" mt-3 text-xl text-fg single_line w-full">
          {`${data?.artist?.artistName} (${data?.artist?.title})`}
        </div>

        <div
          className=" min-h-[20px] max-h-[86%] overflow-y-auto mt-5 text-base leading-snug text-dg two_lines "
          onClick={onModalOpen}
        >
          {data?.artist?.desc}
        </div>
        <Link to={`/artist/media/${artistid}/song`}>
          <MediaItemTitle title="热曲" showMore />
        </Link>

        <SongList
          list={data?.songs?.slice?.(0, 5) ?? undefined}
          placeHolderCount={5}
          lazyAll
        />
        <Link to={`/artist/media/${artistid}/album`}>
          <MediaItemTitle title="热门专辑" showMore />
        </Link>
        <BigAlbumsList list={albums ?? undefined} placeHolderCount={4} />

        {!!mvs && mvs?.length > 0 && (
          <>
            <MediaItemTitle title="热门MV" />
            <div className="flex flex-wrap  justify-between">
              <MVList list={mvs ?? undefined} placeHolderCount={4} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ArtistDetails
