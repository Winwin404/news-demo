// 基于 axios 封装的请求模块
import axios from 'axios'

const request = axios.create({
  // baseURL : 'http://ttapi.research.itcast.cn'
  baseURL : 'http://api-toutiao-web.itheima.net/'
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
  // Do something before request is sent
    const userinfo = JSON.parse(window.localStorage.getItem('user'))

    if (userinfo) {
      config.headers.Authorization = `Bearer ${userinfo.token}`
    }
    
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 导出请求方法
export default request