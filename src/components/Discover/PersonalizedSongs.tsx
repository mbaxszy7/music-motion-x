import fetcher from "@/fetcher"
import { useQuery } from "react-query"
import type { PersonalizedSong } from "@/interfaces/song"
import css from "./PersonalizedSongs.module.css"
import { memo, useMemo } from "react"
import { MyImage } from "@/components/Image"
import { useDispatch } from "react-redux"
import { rootSlice } from "@/store"

const PersonalizedSongs = memo(() => {
  const dispatch = useDispatch()
  const { data } = useQuery("/api/personalized/newsong", () =>
    fetcher
      .get<{ result: any[] }>("/api/personalized/newsong")
      .then((res) => res.data.result)
      .then((ret) => {
        return ret.map((s) => {
          const song = s.song
          const names = song.artists.length
            ? [...song.artists]
                .reverse()
                .reduce((ac, a) => `${a.name} ${ac}`, "")
            : ""
          return {
            ...s,
            song: {
              imgUrl: song.album.picUrl,
              title: `${song.name}`,
              desc: names,
              artistId: song.artists[0].id,
              albumId: song.album.id,
              artistName: names,
              albumName: song.album.name,
              type: "song",
              id: song.id,
            },
          }
        }) as PersonalizedSong[]
      }),
  )

  // console.log(data)

  const threePersonalizedSongs = useMemo(
    () => data?.slice?.(0, 3).map((song) => song.picUrl),
    [data],
  )

  return (
    <div className=" mt-10  w-full bg-black rounded-l-3xl rounded-r-[200px]  items-center hidden md:flex min-h-[70px]">
      <div
        className={`${css.left_images} text-[0px] h-full relative min-w-[135px]`}
      >
        {threePersonalizedSongs?.map((pic, index) =>
          index === 2 ? (
            <MyImage
              key={index}
              url={pic ? `${pic}?param=67y67` : ""}
              className={css.center_image}
            />
          ) : (
            <MyImage
              key={index}
              url={pic ? `${pic}?param=76y76` : ""}
              className=""
            />
          ),
        )}
      </div>
      <p className="title text-center text-dg text-sm flex-1 tracking-widest">
        个性好歌推荐
      </p>
      <div
        className={`${css.right_play_bar} bg-secondary`}
        onClick={() => {
          dispatch(
            rootSlice.actions.playSongs(data?.map?.((ret) => ret.song) ?? []),
          )
        }}
      />
    </div>
  )
})

PersonalizedSongs.displayName = "PersonalizedSongs"

export default PersonalizedSongs
