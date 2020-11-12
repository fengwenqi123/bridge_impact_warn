import Cookies from 'js-cookie'

const tokenKey = 'Admin-Token'
const swi = 'swi'
const hangdao = 'hangdao'

export function getToken () {
  return Cookies.get(tokenKey)
}

export function setToken (token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken () {
  return Cookies.remove(tokenKey)
}
export function setSwi (obj) {
  return Cookies.set(swi, obj)
}

export function getSwi () {
  return Cookies.get(swi)
}

export function setHangDao (obj) {
  return Cookies.set(hangdao, obj)
}

export function getHangDao () {
  return Cookies.get(hangdao)
}
