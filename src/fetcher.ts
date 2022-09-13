const createAxiosInstance = async () => {
  const axios = await import("axios")
  // [isDEV] in csr development means true
  const baseURL = "https://81.69.200.140"
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://81.69.200.140"

  return axios.default.create({
    baseURL,
  })
}

const axiosInstance = await createAxiosInstance()

export default axiosInstance
