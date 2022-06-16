import { Suspense, lazy } from "react"
import { getServerSideProps } from "./getServerSideProps"

const HomeLazy = lazy(() => import("./Home"))

const Home = (props: any) => {
  return (
    <Suspense fallback="loading">
      <HomeLazy {...props} />
    </Suspense>
  )
}

Home.getServerSideProps = getServerSideProps

export default Home
