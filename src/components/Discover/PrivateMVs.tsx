import fetcher from "@/fetcher"
import type MV from "@/interfaces/mv"
import { useQuery } from "react-query"
import { PrivateMVList } from "@/components/MediaItemList"
import { memo } from "react"

const NewSongs = memo(() => {
  const { data: mvs } = useQuery("/api/personalized/privatecontent", () =>
    fetcher
      .get<{ result: any[] }>("/api/personalized/privatecontent")
      .then((res) => {
        return res.data.result.map((mv) => ({
          imgUrl: mv.picUrl,
          title: mv.name,
          id: mv.id,
          type: "privateMV",
        })) as MV[]
      }),
  )

  return <PrivateMVList list={mvs?.slice?.(0, 5)} placeHolderCount={5} />
})

NewSongs.displayName = "NewSongs"

export default NewSongs
