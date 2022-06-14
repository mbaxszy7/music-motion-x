import fetcher from "@/fetcher"
import { useQuery } from "react-query"
import type { PersonalizedSong } from "@/interfaces/song"
import css from "./PersonalizedSongs.module.css"
import { memo, useMemo } from "react"
import { MyImage } from "@/components/Image"

const PersonalizedSongs = memo(() => {
  const { data } = useQuery("/api/personalized/newsong", () =>
    fetcher
      .get<{ result: PersonalizedSong[] }>("/api/personalized/newsong")
      .then((res) => res.data),
  )

  const threePersonalizedSongs = useMemo(
    () => data?.result.slice?.(0, 3).map((song) => song.picUrl),
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
      <div className={`${css.right_play_bar} bg-secondary`} />
    </div>
  )
})

PersonalizedSongs.displayName = "PersonalizedSongs"

export default PersonalizedSongs
