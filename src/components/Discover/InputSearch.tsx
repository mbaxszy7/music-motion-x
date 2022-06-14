/* eslint-disable react/prop-types */
import cx from "classNames"
import {
  useState,
  useRef,
  useCallback,
  ChangeEventHandler,
  FC,
  CompositionEventHandler,
  memo,
  startTransition,
} from "react"
import { Artist } from "@/interfaces/artist"
import { NormalAlbum } from "@/interfaces/album"
import searchIcon from "@/assets/searchIcon.png"
import { useQuery } from "react-query"
import fetcher from "@/fetcher"
import Spinner from "@/components/Spinner"
import { MediaItemTitle } from "@/components/MediaItemList"

import SearchResultList from "./SearchResultList"
import BestMatchSearchResult from "./BestMatchSearchResult"
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect"

type BextMatchKey = "artist" | "album"

const BEST_SEARCH_SELECTOR: {
  [K in BextMatchKey]: {
    selector: (data: any) => K extends "album" ? NormalAlbum : Artist
  }
} = {
  artist: {
    selector: (data: any) => {
      return {
        type: "artist",
        id: data.id,
        artistName: data.name,
        imgUrl: data.img1v1Url || data.picUrl,
        title: `艺人：${data.name}`,
        desc: `歌曲：${data.musicSize} 专辑：${data.albumSize}`,
      }
    },
  },

  album: {
    selector: (data: any) => {
      return {
        type: "album",
        id: data.id,
        imgUrl: data.picUrl,
        title: `专辑：${data.name}`,
        desc: `歌手：${data.artist.name}`,
      }
    },
  },
}

const SEARCH_RESULT_SELECTOR = {
  playlist: {
    desc: "歌单",
    selector: (data: any) => {
      return {
        id: data.id,
        imgUrl: data.coverImgUrl,
        title: `${data.name}`,
        desc: `${data.trackCount}首`,
      }
    },
  },
  song: {
    desc: "歌曲",
    selector: (data: any) => {
      const artistNames = data.ar.length
        ? [...data.ar].reverse().reduce((ac, a) => `${a.name} ${ac}`, "")
        : ""
      return {
        imgUrl: data.al.picUrl,
        title: `${data.name}`,
        desc: `${artistNames} · ${data.al.name}`,
        artistId: data.ar[0].id,
        albumId: data.al.id,
        artistName: artistNames,
        albumName: data.al.name,
        id: data.id,
      }
    },
  },
  artist: {
    desc: "艺人",
    selector: (data: any) => {
      return {
        id: data.id,
        artistName: data.name,
        imgUrl: data.img1v1Url || data.picUrl,
        title: `艺人：${data.name}`,
        desc: `mv:${data.mvSize}  专辑:${data.albumSize}`,
      }
    },
  },
  mv: {
    desc: "MV",
    selector: (data: any) => {
      return {
        id: data.id,
        imgUrl: data.cover,
        title: `${data.name}`,
        desc: `${data.artistName}`,
      }
    },
  },
  album: {
    desc: "专辑",
    selector: (data: any) => {
      return {
        id: data.id,
        imgUrl: data.picUrl,
        title: data.name,
        desc: data.artist.name,
      }
    },
  },
}

interface BestMatchRes {
  artist?: any[]
  mv?: any[]
  album?: any[]
  orders?: BextMatchKey[]
}

const InputSearch: FC<{
  setIsFocus: (i: boolean) => void
  isFocus: boolean
}> = memo(({ setIsFocus, isFocus }) => {
  InputSearch.displayName = "InputSearch"
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isComposing = useRef(false)
  const [value, setValue] = useState("")
  const [isLoading, setLoading] = useState(false)

  const onFocus = useCallback(async () => {
    setIsFocus(true)
  }, [setIsFocus])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (isComposing.current) return

    startTransition(() => {
      setValue(e.target.value)
    })
  }, [])

  const onCompositionStart: CompositionEventHandler<HTMLInputElement> = () => {
    isComposing.current = true
  }
  const onCompositionEnd: CompositionEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      // Transition: Show the results
      setValue(e.currentTarget.value)
    })

    isComposing.current = false
  }

  const manumalSetValue = (value: string) => {
    if (inputRef.current) inputRef.current.value = value
    setValue(value)
  }

  const onBlur = useCallback(() => {
    setIsFocus(false)
    manumalSetValue("")
  }, [setIsFocus])

  const { data: bestMatch, isLoading: bestMatchLoading } = useQuery(
    value ? `/api/search/multimatch?keywords=${value}` : "",
    () =>
      value
        ? fetcher
            .get<{
              result: BestMatchRes
            }>(`/api/search/multimatch?keywords=${value}`)
            .then((res) => {
              if (res.data.result.orders?.length) {
                const type = res.data.result.orders[0]
                return BEST_SEARCH_SELECTOR[type]?.selector?.(
                  res.data.result[type]?.[0],
                )
              }
            })
        : null,
    { refetchOnWindowFocus: false, suspense: false },
  )

  const { data: searchSuggest } = useQuery(
    value ? `/api/search/suggest?keywords=${value}&type=mobile` : "",
    () =>
      value
        ? fetcher
            .get<{ result: { allMatch?: { keyword: string }[] } }>(
              `/api/search/suggest?keywords=${value}&type=mobile`,
            )
            .then(
              (res) => res.data.result.allMatch?.map((m) => m.keyword) ?? [],
            )
        : null,
    { refetchOnWindowFocus: false, suspense: false },
  )

  const { data: searchResultList, isLoading: searchResultLoading } = useQuery(
    value ? `/api/search?keywords=${value}&type=1004` : "",
    () =>
      value
        ? Promise.allSettled<any[]>([
            fetcher
              .get<{ result: any }>(`/api/search?keywords=${value}&type=1018`)
              .then((res) => res.data.result),
            fetcher
              .get<{ result: any }>(`/api/search?keywords=${value}&type=1004`)
              .then((res) => res.data.result),
          ]).then((result) => {
            const mainResult = result[0]
            const mvsResult = result[1]
            if (
              mainResult.status === "fulfilled" &&
              mvsResult.status === "fulfilled"
            ) {
              mainResult.value.mv = mvsResult.value
              if (mainResult.value.order?.length) {
                return [...mainResult.value.order, "mv"]
                  .map((type) => {
                    const lowerCaseType =
                      type.toLowerCase() as keyof typeof SEARCH_RESULT_SELECTOR
                    const typeData = SEARCH_RESULT_SELECTOR[lowerCaseType]
                    let dataList = mainResult.value?.[type]?.[`${type}s`]
                    if (lowerCaseType === "song") {
                      dataList = dataList.slice(0, 5)
                    }
                    if (typeData && dataList) {
                      return {
                        type: lowerCaseType,
                        title: typeData.desc,
                        getDesc: typeData.selector,
                        dataList,
                      }
                    }
                    return null
                  })
                  .filter((r) => !!r)
              }
            }
          })
        : null,
    { refetchOnWindowFocus: false, suspense: false },
  )

  const hasBestMatchData =
    !!bestMatch && ["artist", "album"].includes(bestMatch.type)
  const hasSearchData =
    !!searchResultList && searchResultList.length && !searchResultLoading

  const isShowSearchSuggest =
    !!searchSuggest &&
    !!searchSuggest.length &&
    !hasSearchData &&
    !searchResultLoading

  const noAnyResult =
    !bestMatch &&
    !bestMatchLoading &&
    value &&
    !hasSearchData &&
    !searchResultLoading

  const anyLoading =
    bestMatchLoading && searchResultLoading && isFocus && !!value

  useIsomorphicEffect(() => {
    startTransition(() => {
      setLoading(anyLoading)
    })
  }, [anyLoading])

  return (
    <>
      <div
        className={cx(" items-center bg-mg z-[99]", {
          "block mt-5": !isFocus,
          "flex mt-0": isFocus,
        })}
        style={{ transition: "all 0.3s ease-in-out" }}
        key="kepp"
      >
        <input
          className={` relative z-[1000] text-fg text-base border-none h-8 rounded-[200px] w-full bg- outline-none bg-black indent-8 transition-width duration-700 bg-[length:16px_16px] bg-no-repeat`}
          ref={inputRef}
          type="text"
          onFocus={onFocus}
          onChange={onChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          placeholder={isFocus ? "搜索" : ""}
          style={{
            backgroundImage: `url(${searchIcon})`,
            backgroundPosition: "9px center",
          }}
        />
        <span
          className={cx(
            " ml-3 text-fg text-base whitespace-nowrap relative z-[1000] ",
            {
              " visible": isFocus,
              invisible: !isFocus,
              " w-7": isFocus,
              " w-0": !isFocus,
            },
          )}
          style={{ transition: " width 0.6s" }}
          onClick={onBlur}
        >
          取消
        </span>
      </div>

      {isFocus && !value && (
        <p className=" text-dg text-center mt-20 text-sm">搜点什么吧</p>
      )}

      {hasBestMatchData && <BestMatchSearchResult bestMatch={bestMatch} />}

      {isShowSearchSuggest && (
        <div className=" px-3">
          <MediaItemTitle
            title="搜索建议"
            showMore={false}
            style={{ color: "grey" }}
          />
          {searchSuggest.map((item) => (
            <div
              key={item}
              className=" mt-3 text-base text-fg pl-1"
              onClick={() => manumalSetValue(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {hasSearchData && (
        <SearchResultList searchResultList={searchResultList} />
      )}

      {noAnyResult && <p className=" text-fg text-center mt-10">木有结果～</p>}

      {isLoading && <Spinner style={{ marginTop: 40 }} />}
    </>
  )
})
export default InputSearch
