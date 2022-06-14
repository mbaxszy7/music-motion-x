import fetcher from "@/fetcher"
import type song from "@/interfaces/song"
import { useQuery } from "react-query"
import { SongList } from "@/components/MediaItemList"
import { memo } from "react"

const NewSongs = memo(() => {
  const { data: songs } = useQuery("/api/top/song?type=0", () =>
    fetcher.get<{ data: any[] }>("/api/top/song?type=0").then((res) => {
      return res.data.data.map((song) => {
        const names = song.artists.length
          ? [...song.artists].reverse().reduce((ac, a) => `${a.name} ${ac}`, "")
          : ""

        return {
          imgUrl: song.album.picUrl,
          title: `${song.name}`,
          desc: names,
          artistId: song.artists[0].id,
          albumId: song.album.id,
          artistName: names,
          albumName: song.album.name,
          type: "song",
          id: song.id,
        }
      }) as song[]
    }),
  )

  return <SongList list={songs?.slice?.(0, 5)} placeHolderCount={5} />
})

NewSongs.displayName = "NewSongs"

export default NewSongs
