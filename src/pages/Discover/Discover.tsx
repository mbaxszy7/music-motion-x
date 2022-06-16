import { lazy, Suspense, useState } from "react"
import cx from "classnames"
import LazyShow from "@/components/LazyShow"
import Spinner from "@/components/Spinner"
import { MediaItemTitle } from "@/components/MediaItemList"
import { Link } from "react-router-dom"

const InputSearch = lazy(() => import("@/components/Discover/InputSearch"))
const Banners = lazy(() => import("@/components/Discover/Banners"))
const PersonalizedSongs = lazy(
  () => import("@/components/Discover/PersonalizedSongs"),
)
const PlayList = lazy(() => import("@/components/Discover/PlayList"))
const NewSongs = lazy(() => import("@/components/Discover/NewSongs"))
const BigAlbums = lazy(() => import("@/components/Discover/BigAlbums"))
const PrivateMVs = lazy(() => import("@/components/Discover/PrivateMVs"))

const Discover = () => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <main className=" p-4 relative overflow-hidden bg-mg">
      <Suspense>
        <InputSearch isFocus={isFocus} setIsFocus={setIsFocus} />
      </Suspense>

      <div
        className={cx({
          hidden: isFocus,
          block: !isFocus,
        })}
      >
        <Suspense>
          <Banners />
        </Suspense>

        <Suspense>
          <PersonalizedSongs />
        </Suspense>

        <Suspense>
          <Link to="/discover/playlist">
            <MediaItemTitle title="Playlist_歌单" showMore />
          </Link>

          <PlayList />
        </Suspense>

        <Suspense>
          <Link to="/discover/songs">
            <MediaItemTitle
              title="Track_新歌"
              showMore
              style={{ marginTop: 48 }}
            />
          </Link>
          <NewSongs />
        </Suspense>

        <LazyShow mode="scroll" root={() => document.getElementById("root")!}>
          <Suspense fallback={<Spinner style={{ marginTop: 48 }} />}>
            <MediaItemTitle
              title="Album_专辑"
              style={{ marginTop: 48, marginBottom: 8 }}
            />
            <BigAlbums />
          </Suspense>

          <Suspense>
            <MediaItemTitle title="MV_独家放送" style={{ marginTop: 16 }} />
            <PrivateMVs />
          </Suspense>
        </LazyShow>
      </div>
    </main>
  )
}

export default Discover
