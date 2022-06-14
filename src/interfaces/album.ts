import type { Artist } from "./artist"
import type Song from "./song"

export default interface Album {
  imgUrl: string
  title: string
  publishTime: string
  type: "bigAlbum"
  id: number
  albumId: number
}

export interface NormalAlbum {
  type: "album"
  id: number
  imgUrl: string
  title: string
  desc: string
}

export interface AlbumDetails {
  picUrl: string
  publishTime: string
  name: string
  artist: {
    imgUrl: Artist["imgUrl"]
    artistName: Artist["artistName"]
    desc: Artist["desc"]
    id: Artist["id"]
  }
  shareCount: number
  likedCount: number
  desc: string
  songs: Song[]
}
