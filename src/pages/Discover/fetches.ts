import fetcher from "@/fetcher"
import type Banner from "@/interfaces/banner"
import type { PersonalizedSong } from "@/interfaces/song"

export const bannersfetch = () =>
  fetcher
    .get<{ banners: Banner[] }>("/api/banner?type=2")
    .then((res) => res.data.banners)
    .then((banners) => {
      return banners.map((banner) => ({
        pic: banner.pic,
      }))
    })

export const personalizedSongsFetch = () =>
  fetcher
    .get<{ result: any[] }>("/api/personalized/newsong")
    .then((res) => res.data.result)
    .then((ret) => {
      return ret.map((s) => {
        const song = s.song
        const names = song.artists.length
          ? [...song.artists].reverse().reduce((ac, a) => `${a.name} ${ac}`, "")
          : ""
        return {
          ...s,
          song: {
            imgUrl: song.album.picUrl,
            title: `${song.name}`,
            desc: names,
            artistId: song.artists[0].id,
            albumId: song.album.id,
            artistName: names,
            albumName: song.album.name,
            type: "song",
            id: song.id,
          },
        }
      }) as PersonalizedSong[]
    })
