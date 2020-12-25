import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, status, keyword) {
  return request({
    url: '/generico-service/role',
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
    url: '/generico-service/role',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/generico-service/role/remove',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/role/remove', data)
}

export function enable (id) {
  return request({
    url: '/generico-service/role/enable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/role/enable', data)
}

export function disable (id) {
  return request({
    url: '/generico-service/role/disable',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
  // const data = qs.stringify({
  //   id: id.join(',')
  // })
  // return request.put('/role/disable', data)
}

export function findRole () {
  return request({
    url: '/generico-service/authorize/findAllListWithPid',
    method: 'GET'
  })
}

export function findRoleById (roleId) {
  return request({
    url: '/generico-service/authorize/findListByRole',
    method: 'GET',
    params: {
      roleId
    }
  })
}
