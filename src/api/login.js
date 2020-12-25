import request from '@/utils/request'
import qs from 'qs'

export function login (loginName, password, loginType, loginSource) {
  const data = qs.stringify({
    loginName,
    password,
    loginType,
    loginSource
  })
  return request({
    url: '/generico-service/user/login',
    method: 'post',
    data
  })
}

export function out (service) {
  return request({
    url: 'http://220.189.207.21:8290/casZjgh/logout',
    method: 'get',
    params: {
      service
    }
  })
}

export function getInfo (token) {
  const data = qs.stringify({
    accessToken: token
  })
  return request({
    url: '/generico-service/user/online',
    method: 'POST',
    data
  })
}

export function logout () {
  return request({
    url: '/generico-service/user/logout',
    method: 'post'
  })
}
