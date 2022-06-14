import axios from "axios"

const createAxiosInstance = () => {
  // [isDEV] in csr development means true
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://localhost:3000"

  return axios.create({
    baseURL,
  })
}

const axiosInstance = createAxiosInstance()

export default axiosInstance
