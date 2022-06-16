import {
  MediaItemTitle,
  SongList,
  AlbumsList,
  SmallMVList,
  ArtistList,
  SearchPlaylist,
} from "@/components/MediaItemList"
import { FC, Fragment } from "react"

const SearchResultList: FC<{ searchResultList: any[] }> = ({
  searchResultList,
}) => {
  return (
    <div className=" px-3 ">
      {searchResultList.map((result: any, index: number) => {
        if (result?.type === "song") {
          return (
            <Fragment key={`${index}-song`}>
              <MediaItemTitle
                title="歌曲"
                showMore={false}
                style={{ color: "grey" }}
              />
              <SongList
                placeHolderCount={2}
                list={result.dataList.map((data: any) => {
                  const media = result.getDesc(data)
                  return { ...media, type: "song" }
                })}
                lazyAll
              />
            </Fragment>
          )
        }
        if (result?.type === "album") {
          return (
            <Fragment key={`${index}-album`}>
              <MediaItemTitle
                title="专辑"
                showMore={false}
                style={{ color: "grey" }}
              />
              <AlbumsList
                placeHolderCount={2}
                list={result.dataList.map((data: any) => {
                  const media = result.getDesc(data)
                  return { ...media, type: "album" }
                })}
              />
            </Fragment>
          )
        }
        if (result?.type === "mv") {
          return (
            <Fragment key={`${index}-mv`}>
              <MediaItemTitle
                title="MV"
                showMore={false}
                style={{ color: "grey" }}
              />
              <SmallMVList
                placeHolderCount={2}
                list={result.dataList.map((data: any) => {
                  const media = result.getDesc(data)
                  return { ...media, type: "mv" }
                })}
              />
            </Fragment>
          )
        }
        if (result?.type === "artist") {
          return (
            <Fragment key={`${index}-artist`}>
              <MediaItemTitle
                title="艺人"
                showMore={false}
                style={{ color: "grey" }}
              />
              <ArtistList
                placeHolderCount={2}
                list={result.dataList.map((data: any) => {
                  const media = result.getDesc(data)
                  return { ...media, type: "artist" }
                })}
              />
            </Fragment>
          )
        }
        if (result?.type === "playlist") {
          return (
            <Fragment key={`${index}-playlist`}>
              <MediaItemTitle
                title="歌单"
                showMore={false}
                style={{ color: "grey" }}
              />
              <SearchPlaylist
                placeHolderCount={2}
                list={result.dataList.map((data: any) => {
                  const media = result.getDesc(data)
                  return { ...media, type: "playlist" }
                })}
              />
            </Fragment>
          )
        }
        return <div key={index}></div>
      })}
    </div>
  )
}

export default SearchResultList
