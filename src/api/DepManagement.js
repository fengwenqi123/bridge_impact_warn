import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, order, sort, status, keyword, parentId) {
  return request({
    url: '/generico-service/department',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      status,
      keyword,
      parentId
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/generico-service/department',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/generico-service/department/remove',
    method: 'PUT',
    params: {
      id: id.join(',')
    }
  })
}

export function findDep () {
  return request({
    url: '/generico-service/department',
    method: 'GET',
    params: {
      pageNum: 1,
      pageSize: 5000,
      order: 'layer',
      sort: '',
      status: 1
    }
  })
}

export function findDepName (id) {
  return request({
    url: '/generico-service/department/' + id,
    method: 'GET'
  })
}

export function findDepartmentsByPersonnel (id) {
  return request({
    url: '/generico-service/department/findDepartmentsByPersonnel',
    method: 'GET',
    params: {
      id
    }
  })
}

export function findListByLayer (layer) {
  return request({
    url: '/generico-service/department/findListByLayer',
    method: 'GET',
    params: {
      layer
    }
  })
}
