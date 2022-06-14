import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const ArtistLazy = lazy(() => import("./Artist"))

const Artist = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <ArtistLazy {...props} />
    </Suspense>
  )
}

export default Artist
