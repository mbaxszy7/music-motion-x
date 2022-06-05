import { Suspense, lazy } from "react"

const Comments = lazy(() => import(/* webpackPrefetch: true */ "./Comments"))
const Post = lazy(() => import(/* webpackPrefetch: true */ "./Post"))

const About = () => {
  return (
    <>
      <Suspense fallback={"loading"}>
        <Post />
      </Suspense>
      <h2>Comments</h2>
      <Suspense fallback={"loading"}>
        <Comments />
      </Suspense>
    </>
  )
}

export default About
