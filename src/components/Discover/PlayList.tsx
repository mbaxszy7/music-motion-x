import { BigPlaylist } from "@/components/MediaItemList"
import fetcher from "@/fetcher"
import type PlayList from "@/interfaces/playlist"
import { memo } from "react"
import { useQuery } from "react-query"

const Playlist = memo(() => {
  const { data: playlists } = useQuery(
    "/api/top/playlist?limit=8&order=hot",
    () =>
      fetcher
        .get<{ playlists: PlayList[] }>("/api/top/playlist?limit=8&order=hot")
        .then(
          (res) =>
            res.data.playlists.map((list) => ({
              id: list.id,
              description: list.description,
              coverImgUrl: list.coverImgUrl,
              name: list.name,
              tags: list.tags,
              tag: list.tags[0],
              type: "big_playlist",
            })) as PlayList[],
        ),
  )

  return (
    <div className=" flex max-w-full overflow-y-auto  ">
      <section className=" min-w-full whitespace-nowrap overflow-y-auto pl-2">
        <BigPlaylist list={playlists} placeHolderCount={1} />
      </section>
    </div>
  )
})
Playlist.displayName = "Playlist"
export default Playlist
