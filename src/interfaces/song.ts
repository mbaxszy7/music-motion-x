export interface PersonalizedSong {
  picUrl: string
  id: number
  name: string
}

export default interface Song {
  imgUrl: string
  title: string
  desc: string
  artistId: number
  albumId: number
  artistName: string
  albumName: string
  type: "song"
  id: number
}
