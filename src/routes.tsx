import { FC } from "react"
import Discover from "@/pages/Discover"
import DiscoverPlaylist from "@/pages/DiscoverPlaylist"
import DiscoverSongs from "@/pages/DiscoverSongs"
import PlaylistDetail from "@/pages/PlaylistDetail"
import AlbumDetail from "@/pages/AlbumDetail"
import ArtistMedia from "@/pages/ArtistMedia"
import Artist from "@/pages/Artist"
import MV from "@/pages/MV"
import { RouteObject } from "react-router"

const ElementEnhance = (Comp: FC) => {
  const importable = (props: any) => <Comp {...props} />

  importable.getServerSideProps = (Comp as any).getServerSideProps
  return importable
}

type IRoute = {
  path: RouteObject["path"]
  element: FC
  children?: IRoute[]
}

const routes: IRoute[] = [
  {
    path: "/",
    element: Discover,
  },
  {
    path: "/discover",
    element: Discover,
  },
  {
    path: "/discover/playlist",
    element: DiscoverPlaylist,
  },
  {
    path: "/discover/songs",
    element: DiscoverSongs,
  },
  {
    path: "/playlist/:playlistid",
    element: PlaylistDetail,
  },
  {
    path: "/album/:albumid",
    element: AlbumDetail,
  },
  {
    path: "/artist/:artistid",
    element: Artist,
  },
  {
    path: "/artist/media/:artistid/:type",
    element: ArtistMedia,
  },
  {
    path: "/mv/:mvid",
    element: MV,
  },
]

const mappedRoutes: RouteObject[] = routes.map((route) => {
  const Ele = ElementEnhance(route.element)
  const enhanceRoute: RouteObject = {
    path: route.path,
    element: <Ele />,
  }
  if (route.children) {
    enhanceRoute.children = route.children.map((child) => {
      const ChildEle = ElementEnhance(child.element)
      return { path: child.path, element: <ChildEle /> }
    })
  }
  return enhanceRoute
})

export default mappedRoutes
