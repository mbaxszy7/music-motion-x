import {} from "react"
import { useQuery } from "react-query"
import axiosInstance from "@/fetcher"
import { Link } from "react-router-dom"

const Home = () => {
  const banners = useQuery("banners", () =>
    axiosInstance.get<{ banners: { pic: string }[] }>("/api/banner?type=2"),
  )

  return (
    <>
      <Link to="discover">discover</Link>
      {banners.data?.data.banners.map((banner) => (
        <img src={banner.pic} key={banner.pic} />
      ))}
    </>
  )
}

export default Home
