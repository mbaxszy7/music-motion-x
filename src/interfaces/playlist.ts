export default interface PlayList {
  id: number
  name: string
  description: string
  coverImgUrl: string
  playCount?: number
  subscribedCount?: string
  trackIds?: number[]
  tags: string[]
  tag: string
  type: "big_playlist"
}

export interface SearchPlayList {
  id: number
  imgUrl: string
  title: string
  desc: string
  type: "playlist"
}

export interface PlaylistDetails {
  name: string
  description: string
  coverImgUrl: string
  playCount: number
  subscribedCount: string
  trackIds: number[]
  tags: string[]
}
