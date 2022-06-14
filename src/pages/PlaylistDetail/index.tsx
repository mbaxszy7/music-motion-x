import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const PlaylistDetailLazy = lazy(() => import("./PlaylistDetail"))

const Discover = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <PlaylistDetailLazy {...props} />
    </Suspense>
  )
}

export default Discover
