import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  // baseURL: 'https://10.100.70.226/api', // api的base_url
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  // baseURL: 'https://10.100.70.215:81/api',
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.msg) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
