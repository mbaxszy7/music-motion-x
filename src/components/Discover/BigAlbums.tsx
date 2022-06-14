import { useQuery } from "react-query"
import Album from "@/interfaces/album"
import dayjs from "dayjs"
import fetcher from "@/fetcher"
import { BigAlbumsList } from "@/components/MediaItemList"
import { memo } from "react"

const BigAlbums = memo(() => {
  const { data } = useQuery("/api/album/newest", () =>
    fetcher
      .get<{ albums: any[] }>("/api/album/newest")
      .then((res) => res.data.albums)
      .then((albums) => {
        return albums.map((album) => ({
          imgUrl: album.picUrl,
          title: album.name,
          publishTime: album.publishTime
            ? dayjs(new Date(album.publishTime), "YYYY-MM-DD").format(
                "YYYY-MM-DD",
              )
            : null,
          type: "bigAlbum",
          id: album.id,
          albumId: album.id,
        })) as Album[]
      }),
  )

  return (
    <div className=" flex max-w-full overflow-y-auto  ">
      <section className=" min-w-full whitespace-nowrap overflow-y-auto pb-7">
        <BigAlbumsList list={data} placeHolderCount={3} />
      </section>
    </div>
  )
})

BigAlbums.displayName = "BigAlbums"

export default BigAlbums
