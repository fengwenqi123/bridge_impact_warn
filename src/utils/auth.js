import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userName = 'userName'
const passWord = 'passWord'
const signal = 'signal'
const yaoshu = 'yaoshu'
const ship = 'ship'
const swi = 'swi'
const hangdao = 'hangdao'
const UserObj = 'UserObj'
const ssd = 'ssd'
const xhxq = 'xhxq'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setuser (token) {
  return Cookies.set(userName, token)
}

export function setpassword (token) {
  return Cookies.set(passWord, token)
}

export function getuser () {
  return Cookies.get(userName)
}

export function getpassword () {
  return Cookies.get(passWord)
}

export function removeuser () {
  return Cookies.remove(userName)
}

export function removepassword () {
  return Cookies.remove(passWord)
}

export function setSignal (obj) {
  return Cookies.set(signal, obj)
}

export function getSignal () {
  return Cookies.get(signal)
}

export function setYaoshu (obj) {
  return Cookies.set(yaoshu, obj)
}

export function getYaoshu () {
  return Cookies.get(yaoshu)
}

export function setShip (obj) {
  return Cookies.set(ship, obj)
}

export function getShip () {
  return Cookies.get(ship)
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

export function setUserObj (obj) {
  return Cookies.set(UserObj, obj)
}

export function getUserObj () {
  return Cookies.get(UserObj)
}

export function setSsd (obj) {
  return Cookies.set(ssd, obj)
}

export function getSsd () {
  return Cookies.get(ssd)
}
export function setXhxq (obj) {
  return Cookies.set(xhxq, obj)
}

export function getXhxq () {
  return Cookies.get(xhxq)
}
