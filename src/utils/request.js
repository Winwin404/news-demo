// 基于 axios 封装的请求模块
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

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

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('状态码异常')
  console.log(error.response)
  const status = error.response.status
  if (error.response && status == 401) {
    console.log('401');
    Message.error('登录状态无效，请重新登录！')
    router.push('/login')
  }

  return Promise.reject(error);
})

// 导出请求方法
export default request