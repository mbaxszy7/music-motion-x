import { Tabs, TabPane } from "@/components/Tab"
import type Song from "@/interfaces/song"
import { useCallback, useState, startTransition } from "react"
import cx from "classnames"
import PageBack from "@/components/AppBack"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import { SongList } from "@/components/MediaItemList"
import useScrollTop from "@/hooks/useScrollTop"

const SONGS_TYPE = [
  { area: "全部", id: 0 },
  { area: "华语", id: 7 },
  { area: "欧美", id: 96 },
  { area: "日本", id: 8 },
  { area: "韩国", id: 16 },
]

const Songs = () => {
  const [tabId, setTabId] = useState(0)
  const onTabChange = useCallback((tabKey: number) => {
    startTransition(() => {
      setTabId(SONGS_TYPE[tabKey].id)
    })
  }, [])

  const { data: songList } = useQuery(
    `/api/top/song?type=${tabId}`,
    () =>
      fetcher
        .get<{ data: any[] }>(`/api/top/song?type=${tabId}`)
        .then((res) => {
          return res.data.data.map((song) => {
            const artistNames = song.artists.length
              ? [...song.artists]
                  .reverse()
                  .reduce((ac, a) => `${a.name} ${ac}`, "")
              : ""
            return {
              imgUrl: song.album.picUrl,
              title: `${song.name}`,
              desc: `${artistNames} · ${song.album.name}`,
              artistId: song.artists[0]?.id,
              albumId: song.album.id,
              artistName: artistNames,
              albumName: song.album.name,
              type: "song",
              id: song.id,
            }
          }) as Song[]
        }),
    { suspense: false },
  )

  useScrollTop()

  return (
    <div className=" px-4">
      <PageBack isBlack={false} title="Track_新歌" />
      <Tabs
        onChange={onTabChange}
        defaultActiveKey="0"
        activeTabKey="0"
        className=" w-full whitespace-nowrap overflow-x-auto h-[60px] sticky top-0 z-[999] bg-mg mt-5"
      >
        {SONGS_TYPE.map((area, index) => (
          <TabPane
            tab={area.area}
            forceRender
            tabKey={`${index}`}
            key={area.id}
            className={cx(
              " w-[100px] text-base font-bold text-center inline-block align-top h-[60px] leading-[60px] ",
              {
                " text-secondary": tabId === area.id,
                " text-white": tabId !== area.id,
              },
            )}
          >
            <div className=" mt-8">
              <SongList list={songList} placeHolderCount={6} lazyAll />
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default Songs
