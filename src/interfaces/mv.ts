export default interface MV {
  imgUrl: string
  title: string
  id: number
  type: "privateMV"
}

export interface NormalMV {
  imgUrl: string
  title: string
  id: number
  desc: string
  type: "mv"
}

export interface MVDetail {
  title: string
  artistName: string
  artistId: number
  cover: string
  publicTime: string
  desc: string
}
