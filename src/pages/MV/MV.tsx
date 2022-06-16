import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import { rootSlice } from "@/store"
import { MVDetail, NormalMV } from "@/interfaces/mv"
import { MyImage } from "@/components/Image"
import { FC } from "react"
import { MediaItemTitle, MVList } from "@/components/MediaItemList"
import { useDispatch } from "react-redux"

const Player: FC<{ url?: string; cover?: string }> = ({ url, cover }) => {
  const dispatch = useDispatch()
  const setPlayBar = (show: boolean) => {
    dispatch(rootSlice.actions.setShowPlayBar(show))
  }
  return (
    <video
      // @ts-ignore
      allowFullScreen
      style={{
        width: "100%",
      }}
      onPlay={() => {
        setPlayBar(false)
      }}
      onEnded={() => {
        setPlayBar(true)
      }}
      onPause={() => {
        setPlayBar(true)
      }}
      className=" sticky top-0 z-[501]"
      src={url ?? ""}
      controls
      poster={cover}
      x5-video-player-type="h5"
      x5-video-orientation="landscape|portrait"
      playsInline
      webkit-playsinline="true"
    />
  )
}

const MV = () => {
  const { mvid } = useParams()
  const { data: details } = useQuery(`/api/mv/detail?mvid=${mvid}`, () =>
    fetcher
      .get<{ data: any }>(`/api/mv/detail?mvid=${mvid}`)
      .then((res) => res.data.data)
      .then((res) => {
        return {
          artistName: res.artistName,
          artistId: res.artistId,
          desc: res.desc,
          title: res.name,
          publicTime: res.publishTime,
          cover: res.cover,
        } as MVDetail
      }),
  )
  const { data: url } = useQuery(mvid ? `/api/mv/url?id=${mvid}` : "", () =>
    mvid
      ? fetcher
          .get<{ data: { url: string } }>(`/api/mv/url?id=${mvid}`)
          .then((res) => res.data.data.url.replace(/https?/, "https"))
      : null,
  )

  const { data: artistAvatar } = useQuery(
    details?.artistId
      ? [`/api/artists?id=${details?.artistId}`, details?.artistId]
      : "",
    () =>
      details?.artistId
        ? fetcher
            .get<{ artist: any; hotSongs: any[] }>(
              `/api/artists?id=${details.artistId}`,
            )
            .then((res) => res.data)
            .then((res) => {
              const { artist } = res
              return artist.picUrl as string
            })
        : null,
    { suspense: false },
  )

  const { data: sameMVs } = useQuery(`/api/simi/mv?mvid=${mvid}`, () =>
    fetcher
      .get<{ mvs: any[] }>(`/api/simi/mv?mvid=${mvid}`)
      .then((res) => res.data)
      .then((res) => {
        const { mvs } = res
        return mvs.map((mv) => ({
          desc: "",
          imgUrl: mv.cover ? mv.cover.replace(/https?/, "https") : "",
          title: mv.name,
          id: mv.id,
        })) as NormalMV[]
      }),
  )

  return (
    <>
      <Player url={url ?? undefined} cover={details?.cover} />
      <div className="px-4 mt-6">
        <div className=" text-fg text-xl font-bold leading-snug">
          {details?.title}
        </div>
        <Link to={`/artist/${details?.artistId}`}>
          <div className=" flex items-center mt-4">
            <MyImage
              url={artistAvatar || ""}
              className=" w-10 h-10 rounded-[50%]"
            />
            <p className=" text-fg text-sm ml-2">{details?.artistName}</p>
          </div>
        </Link>
        <div className=" flex flex-col mt-4">
          <p className=" text-dg text-sm">发布时间：{details?.publicTime}</p>
          <p className=" text-dg text-sm mt-3">{details?.desc}</p>
        </div>
        <MediaItemTitle title="相似MV" showMore={false} />
        <div className="flex flex-wrap  justify-between">
          <MVList list={sameMVs ?? undefined} placeHolderCount={4} />
        </div>
      </div>
    </>
  )
}

export default MV
