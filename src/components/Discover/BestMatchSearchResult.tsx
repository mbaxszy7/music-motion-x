import {
  ArtistItem,
  MediaItemTitle,
  AlbumItem,
} from "@/components/MediaItemList"
import { FC } from "react"
import { Artist } from "@/interfaces/artist"
import { NormalAlbum } from "@/interfaces/album"

const BestMatchSearchResult: FC<{ bestMatch: Artist | NormalAlbum }> = ({
  bestMatch,
}) => {
  return (
    <div className=" px-3">
      <MediaItemTitle
        title="最佳匹配"
        showMore={false}
        style={{ color: "grey" }}
      />
      {bestMatch.type === "artist" && <ArtistItem {...bestMatch} lazyLoading />}
      {bestMatch.type === "album" && <AlbumItem {...bestMatch} lazyLoading />}
    </div>
  )
}

export default BestMatchSearchResult
