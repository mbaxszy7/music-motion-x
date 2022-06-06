import { FC } from "react"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
    <header className=" bg-red-300">
      <div
        className=" bg-slate-400"
        onClick={() => {
          console.log("header clicked!")
        }}
      >
        header hello react
      </div>
      <Link to="/">home</Link>
      <Link to="about">about</Link>
    </header>
  )
}

export default Header
