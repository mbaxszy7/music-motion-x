import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const ArtistMediaLazy = lazy(() => import("./ArtistMedia"))

const ArtistMedia = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <ArtistMediaLazy {...props} />
    </Suspense>
  )
}

export default ArtistMedia
