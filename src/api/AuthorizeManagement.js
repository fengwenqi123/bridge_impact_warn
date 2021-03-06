import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, status, keyword) {
  return request({
    url: '/generico-service/authorize',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      status,
      keyword
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/generico-service/authorize',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/generico-service/authorize/remove',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
}

export function enable (id) {
  return request({
    url: '/generico-service/authorize/enable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
}

export function disable (id) {
  return request({
    url: '/generico-service/authorize/disable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
}

export function findAuthorize () {
  return request({
    url: '/generico-service/authorize',
    method: 'GET',
    params: {
      pageNum: 1,
      pageSize: 5000,
      order: 'layer',
      status: 1
    }
  })
}
