// import { useDispatch } from "react-redux"
// import { rootSlice } from "@/store"
import cx from "classnames"
import { useQuery } from "react-query"
// import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"
import fetcher from "@/fetcher"
import Label from "@/components/Label"
import type { SearchPlayList } from "@/interfaces/playlist"
import { useState } from "react"
import { SearchPlaylist } from "@/components/MediaItemList"
import PageBack from "@/components/AppBack"

const Playlist = () => {
  const [catClicked, setCatClicked] = useState("")
  // const dispatch = useDispatch()

  const { data: cats } = useQuery("/api/playlist/catlist", () =>
    fetcher
      .get<{ sub: any[] }>("/api/playlist/catlist")
      .then((res) =>
        res.data.sub.filter((cat) => cat.hot).map((cat) => cat.name),
      ),
  )

  const { data: playlist } = useQuery(
    catClicked || cats?.[0]
      ? `/api/top/playlist?limit=200&order=hot&cat=${catClicked || cats?.[0]}`
      : "",
    () =>
      catClicked || cats?.[0]
        ? fetcher
            .get<{ playlists: any[] }>(
              `/api/top/playlist?limit=200&order=hot&cat=${
                catClicked || cats?.[0]
              }`,
            )
            .then(
              (res) =>
                res.data.playlists.map((play) => ({
                  imgUrl: play.coverImgUrl,
                  title: play.name,
                  desc: `${play.trackCount}首`,
                  type: "playlist",
                  id: play.id,
                })) as SearchPlayList[],
            )
        : null,
    { suspense: false },
  )

  // useIsomorphicEffect(() => {
  //   dispatch(rootSlice.actions.setShowPageBack(true))
  //   return () => {
  //     dispatch(rootSlice.actions.setShowPageBack(false))
  //   }
  // }, [])

  return (
    <div className=" px-4">
      <PageBack
        isBlack={false}
        style={{ paddingLeft: 0 }}
        title="playlist_歌单"
      />
      <div className=" flex flex-wrap mt-4">
        {cats?.map((cat) => (
          <div
            key={cat}
            className={cx("transition-all duration-300 mt-4 mr-3", {
              " scale-125 mr-4 ": catClicked === cat,
            })}
            onClick={() => setCatClicked(cat)}
          >
            <Label
              text={cat}
              style={{
                position: "static",
              }}
            />
          </div>
        ))}
      </div>

      <div className=" mt-8">
        <SearchPlaylist list={playlist ?? undefined} placeHolderCount={8} />
      </div>
    </div>
  )
}

export default Playlist
