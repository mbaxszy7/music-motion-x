import fetcher from "@/fetcher"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import type Song from "@/interfaces/song"
import type Album from "@/interfaces/album"
import PageBack from "@/components/AppBack"
import { BigAlbumsList, SongList } from "@/components/MediaItemList"
import dayjs from "dayjs"

const ArtistMedia = () => {
  const { artistid, type } = useParams()
  const { data: songs } = useQuery(
    type === "song" ? [`/api/artists?id=${artistid}`, type] : "",
    () =>
      type === "song"
        ? fetcher
            .get<{ hotSongs: any[] }>(`/api/artists?id=${artistid}`)
            .then((res) => res.data)
            .then((res) => {
              const { hotSongs } = res
              return hotSongs.map((song) => ({
                imgUrl: song.al.picUrl,
                title: song.name,
                desc: song.al.name,
                artistId: song.ar[0].id,
                albumId: song.al.id,
                artistName: song.ar.length
                  ? [...song.ar]
                      .reverse()
                      .reduce((ac, a) => `${a.name} ${ac}`, "")
                  : "",
                albumName: song.al.name,
                type: "song",
                id: song.id,
              })) as Song[]
            })
        : null,
  )

  const { data: albums } = useQuery(
    type === "album"
      ? [`/api/artist/album?id=${artistid}&offset=0&limit=200`, type]
      : "",
    () =>
      type === "album"
        ? fetcher
            .get<{ hotAlbums: any[] }>(
              `/api/artist/album?id=${artistid}&offset=0&limit=200`,
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
            })
        : null,
  )

  return (
    <div className=" ">
      <div className=" fixed top-0 w-full z-[100]">
        <PageBack
          title={type === "song" ? "热曲" : type === "album" ? "热门专辑" : ""}
          isBlack={false}
          style={{ paddingTop: 16, paddingBottom: 16 }}
        />
      </div>
      {type === "song" && (
        <div className="  mt-24 px-4">
          <SongList list={songs ?? undefined} placeHolderCount={10} />
        </div>
      )}
      {type === "album" && (
        <div className="  mt-24 px-4">
          <BigAlbumsList list={albums ?? undefined} placeHolderCount={4} />
        </div>
      )}
    </div>
  )
}

export default ArtistMedia
