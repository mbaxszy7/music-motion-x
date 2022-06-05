import { FC } from "react"
import About from "./pages/About"
import Home from "./pages/Home"
import { RouteObject } from "react-router"

const ElementEnhance = (Comp: FC) => {
  const importable = (props: any) => <Comp {...props} />

  importable.getServerSideProps = (Comp as any).getServerSideProps
  return importable
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about",
    element: About,
  },
].map((route) => {
  const Ele = ElementEnhance(route.element)
  return {
    path: route.path,
    element: <Ele />,
  }
})

export default routes
