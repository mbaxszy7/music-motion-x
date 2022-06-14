import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const SongsLazy = lazy(() => import("./Songs"))

const Discover = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <SongsLazy {...props} />
    </Suspense>
  )
}

export default Discover
