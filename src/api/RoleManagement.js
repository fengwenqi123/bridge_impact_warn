import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, status, keyword) {
  return request({
    url: '/role',
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
    url: '/role',
    method: 'POST',
    data
  })
}

export function delt (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/role/remove', data)
}

export function enable (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/role/enable', data)
}

export function disable (id) {
  const data = qs.stringify({
    id: id.join(',')
  })
  return request.put('/role/disable', data)
}

export function findRole () {
  return request({
    url: '/authorize/findAllListWithPid',
    method: 'GET'
  })
}

export function findRoleById (roleId) {
  return request({
    url: '/authorize/findListByRole',
    method: 'GET',
    params: {
      roleId
    }
  })
}
