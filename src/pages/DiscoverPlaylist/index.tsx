import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const PlaylistLazy = lazy(() => import("./Playlist"))

const Discover = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <PlaylistLazy {...props} />
    </Suspense>
  )
}

export default Discover
