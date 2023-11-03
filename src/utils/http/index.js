import axios from 'axios'


let instance = axios.create({
  baseURL: '/api',
  timeout: 1e4,
  withCredentials: true
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    // TODO： todo anything....
    return config
  },
  error => {
    Promise.reject(error)
  }
)

/**
 * 相应拦截器
 */
instance.interceptors.response.use(
  response => {
    return response?.data || {}
  },
  error => {
    console.log("请求出错了: ", error)
    return Promise.reject(error)
  }
)

export default instance