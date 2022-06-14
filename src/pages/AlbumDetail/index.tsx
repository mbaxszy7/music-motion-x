import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const AlbumDetailLazy = lazy(() => import("./AlbumDetail"))

const AlbumDetail = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <AlbumDetailLazy {...props} />
    </Suspense>
  )
}

export default AlbumDetail
