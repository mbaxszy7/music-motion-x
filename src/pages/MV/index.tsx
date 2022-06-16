import { Suspense, lazy } from "react"
import Spinner from "@/components/Spinner"

const MVLazy = lazy(() => import("./MV"))

const Home = (props: any) => {
  return (
    <Suspense fallback={<Spinner style={{ marginTop: "30vh" }} />}>
      <MVLazy {...props} />
    </Suspense>
  )
}

export default Home
