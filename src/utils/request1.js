import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/cache'
import { showFullScreenLoading, tryHideFullScreenLoading } from './load.js'
const timeout = 10000
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://10.100.70.226:80/api', // api的base_url
  // baseURL: '/api/alerta-service', // api的base_url
  baseURL: 'http://192.168.1.120:83/api/alerta-service', // api的base_url
  timeout
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers.accessToken = getToken() || null
  showFullScreenLoading()
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    const res = response.data
    if (res.code !== 200) {
      if (res.msg) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

export default service
