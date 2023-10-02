import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 1000 * 120 // 超时时间120s
})

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    const { data } = res
    if (data.code != 200) {
      if (data.code === 401) {
        //登录状态已过期.处理路由重定向
        console.log('loginOut')
      }
      throw new Error(data.describe)
    }
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log(config)
    return config
  },
  (error) => {
    console.log(error)
  }
)

export default instance
