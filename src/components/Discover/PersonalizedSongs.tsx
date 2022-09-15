import { useQuery } from "react-query"

import css from "./PersonalizedSongs.module.css"
import { memo, useMemo } from "react"
import { MyImage } from "@/components/Image"
import { useDispatch } from "react-redux"
import { rootSlice } from "@/store"
import { personalizedSongsFetch } from "@/pages/Discover/fetches"

const PersonalizedSongs = memo(() => {
  const dispatch = useDispatch()
  const { data } = useQuery("/api/personalized/newsong", personalizedSongsFetch)

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
            <MyImage key={index} url={""} className={css.center_image} />
          ) : (
            <MyImage key={index} url={""} className="" />
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
