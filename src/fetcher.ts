import axios from "axios"

const createAxiosInstance = () => {
  // [isDEV] in csr development means true
  const baseURL = "https://81.69.200.140"
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://81.69.200.140"

  return axios.create({
    baseURL,
  })
}

const axiosInstance = createAxiosInstance()

export default axiosInstance
