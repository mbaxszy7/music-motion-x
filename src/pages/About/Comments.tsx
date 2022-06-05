import { useQuery } from "react-query"
import { axiosInstance } from "../../client-utils/axios"

const Comments = () => {
  const newest = useQuery("todos", () => axiosInstance.get("/api/album/newest"))

  return (
    <>
      {newest?.data?.data?.albums.map((comment: any, i: any) => (
        <p className="comment" key={i}>
          {comment.name}
        </p>
      ))}
    </>
  )
}

export default Comments
