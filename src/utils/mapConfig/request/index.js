import axios from 'axios'
import { Message } from 'element-ui'
const timeout = 10000
// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.1.120:83/api/alerta-service/', // 视频的base_url
  timeout
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
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
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
