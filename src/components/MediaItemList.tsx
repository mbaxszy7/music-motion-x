/* eslint-disable react/prop-types */
// import cx from "classNames"
import React, { FC, CSSProperties, memo } from "react"
import moreIcon from "@/assets/more.png"
// import { Link, useNavigate } from "react-router-dom"
import type PlayList from "@/interfaces/playlist"
import type Song from "@/interfaces/song"
import type Album from "@/interfaces/album"
import type { SearchPlayList } from "@/interfaces/playlist"
import type { NormalAlbum } from "@/interfaces/album"
import type { Artist } from "@/interfaces/artist"
import type MV from "@/interfaces/mv"
import type { NormalMV } from "@/interfaces/mv"
import { MyImage } from "./Image"
import SongMore from "./SongMore"
// import playBarPage from "../pages/Root/connectPlayBarReducer"
import Label from "@/components/Label"
import { Link } from "react-router-dom"

import MyPlaceholder from "@/components/MyPlaceholder"
import VirtualizedList from "./VScrollList"

export const MediaItemTitle: FC<{
  title: string
  showMore?: boolean
  style?: CSSProperties
}> = ({ title, showMore, style = {} }) => {
  return (
    <p
      className=" h-4 leading-4 font-bold mt-10 mb-5 text-sm text-dg"
      style={
        showMore
          ? {
              backgroundImage: `url(${moreIcon})`,
              backgroundSize: "16px 16px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100% center",
              ...style,
            }
          : style
      }
    >
      {title}
    </p>
  )
}

export const MediaItemTypes = {
  ALBUM: "album",
  PLAY_LIST: "playlist",
  SONG: "song",
  MV: "mv",
  ARTIST: "artist",
  BIG_ALBUM: "bigAlbum",
  BIG_MV: "bigMV",
  BIGGER_MV: "biggerMV",
  BIG_PLAY_LIST: "big_playlist",
  PRIVATE_MV: "privateMV",
}

const BigPlayItem: FC<{
  tag: string
  url: string
  title: string
  lazyLoading: boolean
  id: number
}> = ({ tag, url, title, lazyLoading, id }) => {
  return (
    <Link to={`/playlist/${id}`}>
      <div className=" w-[48%] mb-3 inline-flex flex-col items-start align-top relative">
        <div className="w-[85%] pb-[85%] rounded-[4px] mr-4 relative">
          {lazyLoading ? (
            <MyImage
              url={url}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          ) : (
            <img
              src={url}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          )}

          <Label
            text={tag}
            style={{ bottom: "0", right: "inherit", left: -5, zIndex: 4 }}
          ></Label>
        </div>

        <MyPlaceholder ready={!!title} rows={2} type="textBlock">
          <span className="two_lines text-fg text-base mr-4 leading-tight mt-3">
            {title}
          </span>
        </MyPlaceholder>
      </div>
    </Link>
  )
}

const SongItem: FC<{
  artist: string
  picUrl: string
  title: string
  lazyLoading: boolean
  more?: boolean
  indexedPic?: boolean
  index: number
  albumName: string
  artistId: number
  albumId: number
  songId: number
}> = memo(
  ({
    artist,
    picUrl,
    title,
    lazyLoading,
    more,
    indexedPic,
    index,
    albumName,
    artistId,
    albumId,
    songId,
  }) => {
    return (
      <div className=" flex items-center mb-5">
        {indexedPic ? (
          <div className=" font-bold mr-6 text-fg">
            {(index + "").padStart(2, "0")}
          </div>
        ) : (
          <div className=" w-[44px] h-[44px] rounded-[4px] overflow-hidden relative mr-4">
            {lazyLoading ? (
              <MyImage
                url={picUrl}
                className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
              />
            ) : (
              <img
                src={picUrl}
                className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
              />
            )}
          </div>
        )}

        <div className=" flex flex-col w-[70%] max-w-[70%]">
          <MyPlaceholder ready={!!title && !!artist} rows={2} type="textBlock">
            <p className=" text-fg single_line">{title}</p>
            <p className=" text-dg text-sm single_line">{artist}</p>
          </MyPlaceholder>
        </div>

        {(!!picUrl || more) && (
          <SongMore
            artistName={artist}
            albumName={albumName}
            artistId={artistId}
            songName={title}
            albumId={albumId}
            songId={songId}
          />
        )}
      </div>
    )
  },
)

SongItem.displayName = "SongItem"

const PrivateMV: FC<{ imgUrl: string; title: string }> = ({
  imgUrl,
  title,
}) => {
  return (
    <div className=" flex items-center mb-5 flex-col">
      <div className=" text-[0px] w-full relative pb-[37%] rounded-[4px] mb-3 overflow-hidden">
        <MyImage
          url={imgUrl}
          className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
        />
      </div>
      <p className=" text-fg two_lines">{title}</p>
    </div>
  )
}

const MVItem: FC<{ imgUrl: string; title: string }> = ({ imgUrl, title }) => {
  return (
    <div className=" flex items-center mb-5 flex-col w-[48%]">
      <div className=" text-[0px] w-full relative pb-[63.9%] rounded-[4px] mb-3 overflow-hidden">
        <MyImage
          url={imgUrl}
          className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
        />
      </div>
      <p className=" text-fg two_lines">{title}</p>
    </div>
  )
}

const SmallMVItem: FC<
  NormalMV & {
    lazyLoading: boolean
  }
> = ({ imgUrl, title, lazyLoading, desc }) => {
  return (
    <div className=" flex items-center mb-5">
      <div className=" w-[44px] h-[44px] rounded-[4px] overflow-hidden relative mr-4">
        {lazyLoading ? (
          <MyImage
            url={imgUrl}
            className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
          />
        ) : (
          <img
            src={imgUrl}
            className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
          />
        )}
      </div>

      <div className=" flex flex-col w-[70%] max-w-[70%]">
        <p className=" text-fg single_line">{title}</p>
        <p className=" text-dg text-sm single_line">{desc}</p>
      </div>
    </div>
  )
}

const BigAlbum: FC<{
  imgUrl: string
  time: string
  title: string
  id: number
}> = ({ time, imgUrl, title, id }) => {
  return (
    <Link to={`/album/${id}`}>
      <div className=" w-[48%] relative align-top flex-col inline-flex mt-3">
        <div className=" text-[0px] pb-[85%] rounded-[4px] mb-[10px] mr-4 relative">
          <MyImage
            url={imgUrl}
            className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
          />
        </div>
        <p className=" text-fg single_line pr-4">{title}</p>
        <p className=" text-dg text-sm single_line pr-4">{time}</p>
      </div>
    </Link>
  )
}

type BestMatchArtistProp = Artist & { lazyLoading: true }

export const ArtistItem: FC<Partial<BestMatchArtistProp>> = ({
  lazyLoading,
  imgUrl,
  desc,
  artistName,
  id,
}) => {
  return (
    <Link to={`/artist/${id}`}>
      <div className=" flex items-center mb-5">
        <div className=" w-[44px] h-[44px] rounded-[50%] overflow-hidden relative mr-4">
          {lazyLoading ? (
            <MyImage
              url={imgUrl ?? ""}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          ) : (
            <img
              src={imgUrl}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          )}
        </div>

        <div className=" flex flex-col w-[70%] max-w-[70%]">
          <p className=" text-fg single_line">{artistName}</p>
          {!!desc && <p className=" text-dg text-sm single_line">{desc}</p>}
        </div>
      </div>
    </Link>
  )
}

export const PlayListItem: FC<SearchPlayList & { lazyLoading: boolean }> = ({
  lazyLoading,
  imgUrl,
  desc,
  title,
  id,
}) => {
  return (
    <Link to={`/playlist/${id}`}>
      <div className=" flex items-center mb-5">
        <div className=" w-[44px] h-[44px] overflow-hidden relative mr-4">
          {lazyLoading ? (
            <MyImage
              url={imgUrl}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          ) : (
            <img
              src={imgUrl}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          )}
        </div>

        <div className=" flex flex-col w-[70%] max-w-[70%]">
          <MyPlaceholder ready={!!title && !!desc} rows={2} type="textBlock">
            <p className=" text-fg single_line">{title}</p>
            <p className=" text-dg text-sm single_line">{desc}</p>
          </MyPlaceholder>
        </div>
      </div>
    </Link>
  )
}

export const AlbumItem: FC<NormalAlbum & { lazyLoading: true }> = ({
  lazyLoading,
  imgUrl,
  desc,
  title,
  id,
}) => {
  return (
    <Link to={`/album/${id}`}>
      <div className=" flex items-center mb-5">
        <div className=" w-[48px] h-[48px] rounded-[4px] overflow-hidden relative mr-4">
          {lazyLoading ? (
            <MyImage
              url={imgUrl}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          ) : (
            <img
              src={imgUrl}
              className=" w-full h-full absolute top-0 left-0 rounded-[4px]"
            />
          )}
        </div>

        <div className=" flex flex-col w-[70%] max-w-[70%]">
          <p className=" text-fg single_line">{title}</p>
          <p className=" text-dg text-sm single_line">{desc}</p>
        </div>
      </div>
    </Link>
  )
}

export const BigPlaylist: FC<{
  list?: PlayList[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: PlayList, index: number) => {
          return (
            <BigPlayItem
              url={item.coverImgUrl}
              key={`${item.id}-${index}`}
              tag={item.tag}
              lazyLoading={index > 2}
              title={item.name}
              id={item.id}
            />
          )
        },
      )}
    </>
  )
}

export const SongList: FC<{
  list?: Song[]
  placeHolderCount: number
  lazyAll?: boolean
  indexedPic?: boolean
  more?: boolean
  isVlist?: boolean
}> = ({ list, placeHolderCount, lazyAll, indexedPic, more, isVlist }) => {
  if (isVlist)
    return (
      <VirtualizedList<Song>
        rowHeight={64}
        list={list || new Array(placeHolderCount || 1).fill({})}
        renderItem={(item, index) => (
          <SongItem
            artistId={item.artistId}
            albumId={item.albumId}
            albumName={item.albumName}
            songId={item.id}
            picUrl={item.imgUrl}
            key={`${item.id}-${index}`}
            artist={item.artistName}
            title={item.title}
            lazyLoading={lazyAll ? true : index > 3}
            indexedPic={indexedPic}
            index={index + 1}
            more={more}
          />
        )}
      />
    )
  return (
    <div
      className=" w-full"
      // @ts-ignore
      style={{ contentVisibility: "auto" }}
    >
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: Song, index: number) => {
          return (
            <SongItem
              artistId={item.artistId}
              albumId={item.albumId}
              albumName={item.albumName}
              songId={item.id}
              picUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              artist={item.artistName}
              title={item.title}
              lazyLoading={lazyAll ? true : index > 3}
              indexedPic={indexedPic}
              index={index + 1}
              more={more}
            />
          )
        },
      )}
    </div>
  )
}

export const BigAlbumsList: FC<{
  list?: Album[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: Album, index: number) => {
          return (
            <BigAlbum
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              time={item.publishTime}
              title={item.title}
              id={item.id}
            />
          )
        },
      )}
    </>
  )
}

export const AlbumsList: FC<{
  list?: NormalAlbum[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: NormalAlbum, index: number) => {
          return (
            <AlbumItem
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              type={item.type}
              desc={item.desc}
              id={item.id}
              lazyLoading
              title={item.title}
            />
          )
        },
      )}
    </>
  )
}

export const PrivateMVList: FC<{
  list?: MV[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: MV, index: number) => {
          return (
            <PrivateMV
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              title={item.title}
            />
          )
        },
      )}
    </>
  )
}

export const MVList: FC<{
  list?: NormalMV[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: MV, index: number) => {
          return (
            <MVItem
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              title={item.title}
            />
          )
        },
      )}
    </>
  )
}

export const SmallMVList: FC<{
  list?: NormalMV[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: NormalMV, index: number) => {
          return (
            <SmallMVItem
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              title={item.title}
              id={item.id}
              desc={item.desc}
              type={item.type}
              lazyLoading
            />
          )
        },
      )}
    </>
  )
}

export const ArtistList: FC<{
  list?: Artist[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: Artist, index: number) => {
          return (
            <ArtistItem
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              title={item.title}
              id={item.id}
              desc={item.desc}
              type={item.type}
              artistName={item.artistName}
              lazyLoading
            />
          )
        },
      )}
    </>
  )
}

export const SearchPlaylist: FC<{
  list?: SearchPlayList[]
  placeHolderCount: number
}> = ({ list, placeHolderCount }) => {
  return (
    <>
      {(list || new Array(placeHolderCount || 1).fill({})).map(
        (item: SearchPlayList, index: number) => {
          return (
            <PlayListItem
              imgUrl={item.imgUrl}
              key={`${item.id}-${index}`}
              title={item.title}
              id={item.id}
              type={"playlist"}
              desc={item.desc}
              lazyLoading
            />
          )
        },
      )}
    </>
  )
}
