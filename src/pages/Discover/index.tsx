import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const DiscoverLazy = lazy(() => import("./Discover"))

const Discover = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <DiscoverLazy {...props} />
    </Suspense>
  )
}

export default Discover
